# 🔍 Troubleshooting Guide

## Quick Checks

### 1. Check if Services are Running

**Local Development:**
```bash
# Check if frontend is running
curl http://localhost:5173

# Check if backend is running  
curl http://localhost:5000/health
```

**If backend not running:**
```bash
cd /Users/abhigyanshekhar/Downloads/7
python backend_api.py
```

**If frontend not running:**
```bash
cd /Users/abhigyanshekhar/Downloads/7
npm run dev:frontend
```

### 2. Browser Console Errors

Open browser (F12 → Console). Common errors:

**"Failed to fetch"** or **"net::ERR_CONNECTION_REFUSED"**
- Backend not running
- Wrong backend URL
- CORS issue

**"Supabase client not initialized"**
- Missing `.env` file
- Wrong Supabase credentials

**"Cannot read property of undefined"**
- Data format mismatch
- Missing data from Supabase

### 3. File Upload Not Working

**Symptom:** Upload button does nothing

**Check:**
1. Browser console for errors
2. Network tab (F12 → Network) - look for failed requests
3. Backend terminal for error messages

**Symptom:** "Upload failed" toast message

**Possible causes:**
- Backend can't process file format
- Supabase credentials wrong
- Network connectivity issue

### 4. Data Not Showing

**Check:**
1. Supabase dashboard - are there records in `outlets` table?
2. Browser console - any fetch errors?
3. Network tab - is `/outlets` API call succeeding?

### 5. Page Won't Load

**Local:**
- Run `npm install` again
- Clear browser cache
- Check `npm run dev` terminal for build errors

**Render:**
- Check deployment logs
- Verify environment variables are set
- Check if build succeeded

## Common Fixes

### Reset Local Development

```bash
# Kill all node processes
killall node

# Reinstall dependencies
npm install

# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build

# Restart dev server
npm run dev
```

### Verify Supabase Connection

```bash
# Test backend connection
python -c "
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv('VITE_SUPABASE_URL')
key = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY')

client = create_client(url, key)
result = client.table('outlets').select('*').limit(1).execute()
print(f'✅ Connected! Found {len(result.data)} records')
"
```

### Check Render Deployment

1. Go to Render dashboard
2. Check "Events" tab for deployment status
3. Check "Logs" for runtime errors
4. Verify environment variables in "Environment" tab

## Still Not Working?

Share these details:
1. Exact error message from browser console
2. Screenshot of the issue
3. Backend terminal output (if local)
4. Render deployment logs (if deployed)
5. What you're trying to do when it fails
