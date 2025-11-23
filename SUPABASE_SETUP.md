# Supabase Database Setup Instructions

## Quick Setup (5 minutes)

Since you're already at the Supabase login page, follow these steps:

### Step 1: Login to Supabase
1. Complete the login process at https://supabase.com/dashboard/sign-in
2. You should see your project dashboard

### Step 2: Open SQL Editor
1. In the left sidebar, click on **"SQL Editor"**
2. Click the **"New Query"** button

### Step 3: Copy and Run the Schema
1. Open the file `supabase_schema.sql` (in this project folder)
2. Copy ALL the contents
3. Paste into the SQL Editor
4. Click **"Run"** (or press Cmd+Enter)

### Step 4: Verify Success
You should see a success message like:
```
Success. No rows returned
```

This creates:
- `files` table - tracks uploaded Excel files
- `outlets` table - stores financial data for each outlet
- Indexes for better performance
- Row Level Security policies for data access

### What the Schema Creates

**Files Table:**
- Tracks each uploaded Excel file
- Stores filename, upload date, and outlet count

**Outlets Table:**
- Stores financial metrics for each outlet
- Includes: revenue, expenses, EBITDA, PBT, interest costs, etc.
- Links to the file it was uploaded from

### After Running the Schema

Once you've run the SQL:
1. The application will automatically connect to Supabase
2. File uploads will persist data to the database
3. Dashboards will load data from Supabase
4. Data will survive page refreshes

### Troubleshooting

**If you get an error:**
- Make sure you're in the correct project (fyjsmcofbuswelxvgtit)
- Try running the SQL a second time (the IF NOT EXISTS clauses make it safe to rerun)
- Check that you copied the entire SQL file

**To verify tables were created:**
1. Go to **"Table Editor"** in the left sidebar
2. You should see `files` and `outlets` tables listed

---

**Ready to proceed?** Once you've run the SQL schema, the application will be fully connected to Supabase!
