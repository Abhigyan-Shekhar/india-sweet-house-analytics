export interface Database {
    public: {
        Tables: {
            outlets: {
                Row: OutletRecord;
                Insert: Omit<OutletRecord, 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Omit<OutletRecord, 'id' | 'created_at' | 'updated_at'>>;
            };
            uploaded_files: {
                Row: UploadedFileRecord;
                Insert: Omit<UploadedFileRecord, 'id' | 'uploaded_at'>;
                Update: Partial<Omit<UploadedFileRecord, 'id' | 'uploaded_at'>>;
            };
        };
    };
}

export interface OutletRecord {
    id: string;
    created_at: string;
    updated_at: string;
    file_id: string | null;
    outlet: string;
    outlet_manager: string | null;
    month: string | null;
    direct_income: number | null;
    total_revenue: number | null;
    cogs: number | null;
    outlet_expenses: number | null;
    ebidta: number | null;
    finance_cost: number | null;
    bank_charges: number | null;
    interest_on_borrowings: number | null;
    interest_on_vehicle_loan: number | null;
    mg: number | null;
    pbt: number | null;
    wastage: number | null;
}

export interface UploadedFileRecord {
    id: string;
    file_name: string;
    file_path: string;
    file_size: number | null;
    uploaded_at: string;
    processed: boolean;
    uploaded_by: string | null;
    metadata: any;
}

// Legacy alias for backwards compatibility
export interface FileRecord extends UploadedFileRecord { }
