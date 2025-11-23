# 🚀 Single Web Service Deployment on Render

Deploy both frontend and backend together as one unified web service!

## ✨ What This Does

Your Flask backend will serve the built React frontend, so everything runs from one URL!

## � Deployment Steps

### 1. Go to Render Dashboard
- Visit: https://dashboard.render.com
- Click **"New +"** → **"Web Service"**

### 2. Connect GitHub Repository
- Select: `Abhigyan-Shekhar/india-sweet-house-analytics`
- Branch: `main`

### 3. Configure Web Service

**Basic Settings:**
- **Name**: `india-sweet-house` (or your choice)
- **Region**: Choose closest to your location
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Python 3`

**Build & Deploy Settings:**

#### Build Command:
```bash
./build.sh
```

#### Start Command:
```bash
gunicorn backend_api:app
```

**Instance Type:**
- **Free**: Good for testing (sleeps after 15 min)
- **Starter ($7/month)**: Always-on, recommended for production

### 4. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these (click "+ Add Environment Variable" for each):

```
VITE_SUPABASE_URL
https://fyjsmcofbuswelxvgtit.supabase.co

VITE_SUPABASE_PUBLISHABLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5anNtY29mYnVzd2VseHZndGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MzAzMDIsImV4cCI6MjA3MjMwNjMwMn0.if5qYSTUnLErPa0KfrN8KC1xmwElk8LAMZVHmuubgrk

VITE_SUPABASE_PROJECT_ID
fyjsmcofbuswelxvgtit
```

### 5. Deploy!

- Click **"Create Web Service"**
- Wait 5-10 minutes for build and deployment
- You'll get a URL like: `https://india-sweet-house.onrender.com`

---

## 🎯 How It Works

1. **Build Phase** (`./build.sh`):
   - Installs Node.js dependencies
   - Builds React app → creates `dist/` folder
   - Installs Python dependencies

2. **Runtime** (`gunicorn backend_api:app`):
   - Flask serves API endpoints (`/api/*`)
   - Flask serves React app from `dist/` folder
   - Everything accessible from one URL!

---

## 🧪 Testing Your Deployment

Once deployed, visit your Render URL:

### Test Homepage:
```
https://your-app.onrender.com
```
Should show the React dashboard

### Test Backend API:
```
https://your-app.onrender.com/health
```
Should return: `{"status": "healthy", "message": "Backend API is running"}`

### Upload a File:
1. Go to your deployed URL
2. Upload an Excel file
3. Data should save to Supabase
4. Refresh page - data persists!

---

## 🔄 Auto-Deploy

Render automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Render automatically rebuilds and deploys
```

---

## ⚡ Quick Commands Reference

### Build Command:
```bash
./build.sh
```

### Start Command:
```bash
gunicorn backend_api:app
```

### Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

---

## 🐛 Troubleshooting

### Build Fails
- Check Render logs for specific error
- Verify `build.sh` has execute permission
- Check all dependencies in `package.json` and `requirements.txt`

### Can't Access Frontend
- Check if `dist/` folder was created during build
- Verify static folder configuration in `backend_api.py`

### API Endpoints Not Working
- Check that routes start with `/` (e.g., `/health`, `/process-file`)
- Verify CORS is enabled in `backend_api.py`

### Database Connection Issues
- Verify all 3 Supabase environment variables are set
- Check Supabase project is active
- Test connection using `/health` endpoint

---

## 💰 Costs

**Free Tier:**
- ✅ 750 hours/month
- ✅ Automatic SSL
- ✅ Git-based deployment
- ⚠️ Service sleeps after 15 min (30-60s wake time)

**Starter Plan ($7/month):**
- ✅ Always-on (no sleeping)
- ✅ Faster builds
- ✅ Better for production

---

## ✅ Deployment Checklist

- [ ] GitHub repository connected
- [ ] Runtime: Python 3
- [ ] Build command: `./build.sh`
- [ ] Start command: `gunicorn backend_api:app`
- [ ] All 3 environment variables added
- [ ] Service deployed successfully
- [ ] Can access frontend at your Render URL
- [ ] `/health` endpoint returns success
- [ ] Can upload Excel files
- [ ] Data persists in Supabase

---

**That's it! Single deployment, single URL, everything works! 🎉**

Your live URL: `https://your-service-name.onrender.com`
