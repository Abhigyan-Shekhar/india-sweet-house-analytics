# 🏦 India Sweet House Analytics - Complete System

## 🎉 System Status: FULLY WORKING!

Both data formats are now working perfectly:
- ✅ **data4.xlsx** - Raw format (complex layout with "PARTICULARS" column)
- ✅ **data5.xlsx** - Clean format (outlets as rows, metrics as columns)

## 🚀 Quick Start

### Option 1: Automatic Startup (Recommended)
```bash
# Start everything automatically
python start_all.py

# OR using npm
npm run start
```

### Option 2: Manual Startup
```bash
# Terminal 1: Start Backend
python backend_api.py

# Terminal 2: Start Frontend  
npm run dev
```

## 📊 What You Get

When you upload files, the system will:

1. **Detect Format Automatically**
   - Clean format (data5.xlsx) → Direct processing
   - Raw format (data4.xlsx) → Complex processing using data_backend.py logic

2. **Extract All Data**
   - Outlet names and managers
   - Financial metrics (Revenue, COGS, EBITDA, PBT, etc.)
   - Month information
   - All outlet-specific data

3. **Display Results**
   - Analytics dashboard
   - Charts and visualizations
   - Data tables
   - File comparison tools

## 🧪 Testing

Test both formats:
```bash
python test_both_formats.py
```

## 📁 File Formats Supported

### data4.xlsx (Raw Format)
- Complex Excel layout with "PARTICULARS" column
- Uses sophisticated data_backend.py processing logic
- Automatically detects headers and outlet information
- Processes 40+ outlet records

### data5.xlsx (Clean Format)  
- Simple layout with outlets as rows
- Direct processing for faster results
- Processes 43+ outlet records

## 🔧 Technical Details

### Backend API (Python Flask)
- **URL**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Process File**: POST http://localhost:5000/process-file

### Frontend (React + Vite)
- **URL**: http://localhost:5173 (or check terminal for actual port)
- **Features**: File upload, analytics, charts, data tables

### Key Features
- ✅ Automatic format detection
- ✅ Robust error handling
- ✅ Fallback processing
- ✅ Real-time feedback
- ✅ Both formats supported
- ✅ Easy startup scripts

## 🛠️ Troubleshooting

### Backend Issues
```bash
# Check if backend is running
python -c "import requests; print(requests.get('http://localhost:5000/health').json())"

# Restart backend
python backend_api.py
```

### Frontend Issues
```bash
# Check if frontend is running
npm run dev
```

### Test Both Formats
```bash
python test_both_formats.py
```

## 📋 Available Commands

```bash
# Start everything
python start_all.py
npm run start

# Start individual services
python backend_api.py
npm run dev

# Test formats
python test_both_formats.py
npm run test:formats

# Install dependencies
pip install -r requirements.txt
npm install
```

## 🎯 Usage Instructions

1. **Start the system**: `python start_all.py`
2. **Open browser**: http://localhost:5173
3. **Upload files**: Drag and drop your Excel files
4. **View results**: Analytics dashboard with charts and data

## 📊 Sample Results

### Clean Format (data5.xlsx)
- 43 outlet records processed
- Direct outlet data extraction
- Fast processing

### Raw Format (data4.xlsx)  
- 40 outlet records processed
- Complex header detection
- Sophisticated data extraction using data_backend.py logic

## 🏆 Success!

Your system now supports both data formats and provides accurate financial analytics for all your outlets. The backend uses your proven data_backend.py logic while providing a user-friendly web interface.

**Ready to use! Upload your files and start analyzing your outlet data! 🚀**
