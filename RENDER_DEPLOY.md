# 🚀 Deploying to Render

Complete guide to deploy India Sweet House Analytics on Render.

## 📋 Overview

You'll deploy:
1. **Backend (Python/Flask)** - As a Web Service
2. **Frontend (React/Vite)** - As a Static Site

## 🔧 Backend Deployment

### Step 1: Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `india-sweet-house-analytics`

### Step 2: Configure Backend Service

**Basic Settings:**
- **Name**: `india-sweet-house-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave blank (or set to `/`)
- **Runtime**: `Python 3`

**Build & Deploy:**
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn backend_api:app`

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:
```
VITE_SUPABASE_URL=https://fyjsmcofbuswelxvgtit.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key_here
VITE_SUPABASE_PROJECT_ID=fyjsmcofbuswelxvgtit
```

### Step 4: Deploy

- **Instance Type**: Free tier is fine for testing
- Click **"Create Web Service"**
- Wait for deployment (takes ~5 minutes)
- You'll get a URL like: `https://india-sweet-house-backend.onrender.com`

---

## 🎨 Frontend Deployment

### Step 1: Create Static Site

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Static Site"**
3. Connect the same GitHub repository

### Step 2: Configure Frontend

**Basic Settings:**
- **Name**: `india-sweet-house-frontend`
- **Branch**: `main`
- **Root Directory**: Leave blank

**Build & Deploy:**
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Step 3: Add Environment Variables

Add these variables:
```
VITE_SUPABASE_URL=https://fyjsmcofbuswelxvgtit.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key_here
VITE_SUPABASE_PROJECT_ID=fyjsmcofbuswelxvgtit
```

### Step 4: Update Backend URL

After backend is deployed, add:
```
VITE_BACKEND_URL=https://india-sweet-house-backend.onrender.com
```

### Step 5: Deploy

- Click **"Create Static Site"**
- Wait for build (~3-5 minutes)
- You'll get a URL like: `https://india-sweet-house-frontend.onrender.com`

---

## 🔗 Connect Frontend to Backend

Update the backend URL in your frontend code:

**Option 1: Using Environment Variable (Recommended)**

In `src/hooks/useFileUpload.ts`, update line 6:
```typescript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
```

In `src/components/FileUpload.tsx`, update line 21:
```typescript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
```

Then add to Render environment variables:
```
VITE_BACKEND_URL=https://india-sweet-house-backend.onrender.com
```

**Option 2: Hardcode (Quick Fix)**

Replace `http://localhost:5000` with your backend URL in:
- `src/hooks/useFileUpload.ts`
- `src/components/FileUpload.tsx`

---

## ⚡ Important Notes

### Free Tier Limitations
- **Cold starts**: Services sleep after 15 min of inactivity
- **First request**: May take 30-60 seconds to wake up
- **Solution**: Upgrade to paid tier ($7/month) for always-on

### CORS Configuration
Your backend already has CORS enabled in `backend_api.py`:
```python
CORS(app)  # ✅ Already configured
```

### Custom Domain (Optional)
- Go to your service → Settings → Custom Domain
- Add your domain and follow DNS instructions

---

## 🧪 Testing Your Deployment

1. **Test Backend**: 
   ```bash
   curl https://india-sweet-house-backend.onrender.com/health
   ```
   Should return: `{"status": "healthy"}`

2. **Test Frontend**:
   - Visit: `https://india-sweet-house-frontend.onrender.com`
   - Upload a test Excel file
   - Check data appears in Supabase

---

## 🔄 Auto-Deploy Setup

Render automatically deploys when you push to GitHub!

```bash
git add .
git commit -m "Update feature"
git push origin main
# Render automatically deploys both services
```

---

## 📊 Monitoring

**Backend Logs:**
- Render Dashboard → Backend Service → Logs
- Monitor API requests and errors

**Frontend:**
- Static sites don't have server logs
- Use browser console for errors
- Check Supabase logs for database issues

---

## 💰 Pricing

**Free Tier (Current):**
- ✅ 750 hours/month (limited to services)
- ✅ Automatic SSL
- ✅ Continuous deployment
- ⚠️ Services sleep after 15 min inactivity

**Starter Plan ($7/month per service):**
- ✅ Always-on services (no sleeping)
- ✅ Faster builds
- ✅ Priority support

---

## 🐛 Troubleshooting

### Backend won't start
- Check logs in Render Dashboard
- Verify all environment variables are set
- Ensure `requirements.txt` is complete

### Frontend can't connect to backend
- Check CORS in `backend_api.py`
- Verify `VITE_BACKEND_URL` is set correctly
- Check browser console for errors

### Database connection fails
- Verify Supabase credentials in environment variables
- Check Supabase project is active
- Test connection locally first

---

## ✅ Deployment Checklist

Backend:
- [ ] Repository connected
- [ ] Python 3 runtime selected
- [ ] Build command: `pip install -r requirements.txt`
- [ ] Start command: `gunicorn backend_api:app`
- [ ] Environment variables added
- [ ] Health check passing

Frontend:
- [ ] Repository connected
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variables added
- [ ] Backend URL configured
- [ ] Can upload files successfully

---

**Your app is ready for production! 🎉**

URLs:
- Backend: `https://india-sweet-house-backend.onrender.com`
- Frontend: `https://india-sweet-house-frontend.onrender.com`
