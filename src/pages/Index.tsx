import React, { useState, useMemo } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { Dashboard } from '@/components/Dashboard';
import { DataTable } from '@/components/DataTable';
import { SimpleChartsSection } from '@/components/SimpleChartsSection';
import { InterestAnalysis } from '@/components/InterestAnalysis';
import { AdminConsole } from '@/components/AdminConsole';
import { useToast } from '@/hooks/use-toast';
import { useOutlets } from '@/hooks/useOutlets';
import { useFileUpload } from '@/hooks/useFileUpload';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const { outlets, isLoading } = useOutlets();
  const { uploadFile, isUploading } = useFileUpload();

  // Transform Supabase data to match the expected format
  const salesData = useMemo(() => {
    return outlets.map(outlet => ({
      'Outlet': outlet.outlet,
      'Outlet Manager': outlet.outlet_manager,
      'Month': outlet.month,
      'Direct Income': outlet.direct_income,
      'TOTAL REVENUE': outlet.total_revenue,
      'COGS': outlet.cogs,
      'Outlet Expenses': outlet.outlet_expenses,
      'EBIDTA': outlet.ebidta,
      'Finance Cost': outlet.finance_cost,
      '01-Bank Charges': outlet.bank_charges,
      '02-Interest on Borrowings': outlet.interest_on_borrowings,
      '03-Interest on Vehicle Loan': outlet.interest_on_vehicle_loan,
      '04-MG': outlet.mg,
      'PBT': outlet.pbt,
      'WASTAGE': outlet.wastage,
      // Compatibility fields for analytics
      'Product Name': 'Outlet Summary',
      'Category': 'Financial Summary',
      'Branch': outlet.outlet,
      'Cashier': outlet.outlet_manager,
      'Total Amount (₹)': outlet.total_revenue || 0,
      'Cluster Manager': outlet.outlet_manager,
      'Store Name': outlet.outlet,
      'Total Sales': outlet.total_revenue || 0,
      'Upload Filename': `File ID: ${outlet.file_id}`
    }));
  }, [outlets]);

  // Group data by file_id for file-based filtering
  const dataByFile = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    outlets.forEach(outlet => {
      const fileKey = `File ID: ${outlet.file_id}`;
      if (!grouped[fileKey]) {
        grouped[fileKey] = [];
      }
      grouped[fileKey].push({
        'Outlet': outlet.outlet,
        'Outlet Manager': outlet.outlet_manager,
        'Month': outlet.month,
        'TOTAL REVENUE': outlet.total_revenue,
        'PBT': outlet.pbt,
        'EBIDTA': outlet.ebidta,
        'Finance Cost': outlet.finance_cost,
        'Direct Income': outlet.direct_income,
        'COGS': outlet.cogs
      });
    });
    return grouped;
  }, [outlets]);

  const handleFileUpload = async (data: any[], filename: string) => {
    // This callback is called by FileUpload component after backend processes the file
    // The FileUpload component now handles everything internally via useFileUpload hook
    // Just log for debugging
    console.log(`File ${filename} uploaded with ${data.length} records`);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard data={salesData} />;
      case 'analytics':
        console.log('Index: Rendering analytics with data:', salesData.length, 'files:', Object.keys(dataByFile));
        return <SimpleChartsSection data={salesData} dataByFile={dataByFile} />;
      case 'interest':
        return <InterestAnalysis data={salesData} />;
      case 'table':
        return <DataTable data={salesData} dataByFile={dataByFile} />;
      case 'admin':
        return <AdminConsole />;
      default:
        return <Dashboard data={salesData} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hickory-600 mx-auto mb-4"></div>
          <p className="text-hickory-700 font-medium">Loading data from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Header with Navigation */}
      <header className="bg-gradient-header shadow-medium backdrop-blur-sm border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Title */}
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-white tracking-tight">
                  INDIA SWEET HOUSE
                </h1>
                <p className="text-sm lg:text-base text-white/90 font-medium">
                  Financial Analytics Dashboard
                </p>
              </div>
            </div>

            {/* Right side - Navigation Tabs */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
              {[
                { id: 'overview', label: 'Overview', icon: 'Home' },
                { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' },
                { id: 'interest', label: 'Interest Analysis', icon: 'Calculator' },
                { id: 'table', label: 'Data Table', icon: 'Table' },
                { id: 'admin', label: 'Admin Console', icon: 'Settings' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${isActive
                      ? 'bg-white text-hickory-800 shadow-soft hover:bg-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="space-y-8 animate-fadeIn">
          {/* File Upload Section - Only show on Overview tab */}
          {activeTab === 'overview' && (
            <div className="max-w-lg mx-auto">
              <FileUpload
                onFileUpload={handleFileUpload}
                className="animate-slideIn"
              />
            </div>
          )}

          {/* Main Content */}
          <div className="animate-fadeIn">
            {renderActiveTab()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
