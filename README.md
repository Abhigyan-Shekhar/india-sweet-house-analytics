# 🍬 India Sweet House - Financial Analytics Dashboard

A comprehensive financial analytics platform for India Sweet House restaurant chain, featuring real-time data processing, interactive visualizations, and Supabase database integration.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) 
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Python](https://img.shields.io/badge/Python-3.x-yellow)

## ✨ Features

- **📊 Financial Analytics** - Comprehensive outlet performance tracking
- **📈 Interactive Charts** - Real-time revenue, PBT, and EBITDA visualizations
- **📁 Excel Processing** - Automated data extraction from complex Excel files
- **💾 Supabase Integration** - Persistent cloud database storage
- **🔍 Interest Analysis** - Detailed cost breakdown and optimization insights
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Supabase account (free tier works great!)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd india-sweet-house-analytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   pip install supabase python-dotenv flask flask-cors pandas numpy openpyxl
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Supabase credentials
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

   This starts:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🗄️ Database Setup

Your Supabase database schema is already comprehensive and includes:

- **`uploaded_files`** - Tracks all uploaded Excel files
- **`outlets`** - Stores financial data for each outlet
- **Analytics views** - Pre-built aggregations for quick insights
- **Helper functions** - `get_outlets_count()`, `get_total_revenue()`, etc.
- **Storage buckets** - For Excel file storage

See `supabase_schema.sql` for the complete schema.

## 📦 Project Structure

```
├── src/
│   ├── components/         # React components
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── FileUpload.tsx  # File upload handler
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   │   ├── useOutlets.ts   # Fetch outlet data from Supabase
│   │   └── useFileUpload.ts # Handle file uploads
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Supabase client and types
│   └── pages/              # Application pages
├── backend_api.py          # Python Flask backend
├── supabase_schema.sql     # Database schema
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

## 📊 Usage

1. **Upload Excel File**
   - Drag and drop Excel file (Outlet PL format)
   - Backend automatically processes and extracts data
   - Data is saved to Supabase

2. **View Analytics**
   - Navigate between Overview, Analytics, and Data Table tabs
   - Filter by outlet, month, or file
   - Export data or generate reports

3. **Interest Analysis**
   - View detailed breakdown of finance costs
   - Compare interest rates across outlets
   - Identify optimization opportunities

## 🛠️ Development

### Available Scripts

```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only
npm run build            # Build for production
npm run preview          # Preview production build
```

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- Recharts for visualizations
- shadcn/ui components
- Tailwind CSS for styling

**Backend:**
- Flask (Python)
- Pandas for data processing
- Supabase for database
- OpenPyXL for Excel parsing

## 📝 Documentation

- [Quick Start Guide](QUICKSTART.md) - Get up and running in 5 minutes
- [Schema Compatibility](SCHEMA_COMPATIBILITY.md) - Database schema details
- [Backend Integration](BACKEND_INTEGRATION.md) - API documentation
- [Walkthrough](walkthrough.md) - Complete feature walkthrough

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to India Sweet House.

## 🙏 Acknowledgments

- Built with ❤️ for India Sweet House
- Powered by Supabase and React
- UI components from shadcn/ui

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for India Sweet House Analytics**
