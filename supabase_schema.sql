-- Create the files table to track uploaded files
CREATE TABLE IF NOT EXISTS public.files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    filename TEXT NOT NULL,
    upload_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    outlets_count INTEGER NOT NULL DEFAULT 0
);

-- Create the outlets table to store financial data
CREATE TABLE IF NOT EXISTS public.outlets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    file_id UUID REFERENCES public.files(id) ON DELETE CASCADE,
    outlet TEXT NOT NULL,
    outlet_manager TEXT,
    month TEXT NOT NULL,
    direct_income NUMERIC,
    total_revenue NUMERIC,
    cogs NUMERIC,
    outlet_expenses NUMERIC,
    ebidta NUMERIC,
    finance_cost NUMERIC,
    bank_charges NUMERIC,
    interest_on_borrowings NUMERIC,
    interest_on_vehicle_loan NUMERIC,
    mg NUMERIC,
    pbt NUMERIC,
    wastage NUMERIC
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_outlets_file_id ON public.outlets(file_id);
CREATE INDEX IF NOT EXISTS idx_outlets_outlet ON public.outlets(outlet);
CREATE INDEX IF NOT EXISTS idx_outlets_month ON public.outlets(month);
CREATE INDEX IF NOT EXISTS idx_files_filename ON public.files(filename);

-- Enable Row Level Security (RLS)
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outlets ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write access
-- Note: In production, you should restrict these policies based on authentication
CREATE POLICY "Allow public read access to files" 
    ON public.files FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access to files" 
    ON public.files FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public delete access to files" 
    ON public.files FOR DELETE 
    USING (true);

CREATE POLICY "Allow public read access to outlets" 
    ON public.outlets FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access to outlets" 
    ON public.outlets FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public delete access to outlets" 
    ON public.outlets FOR DELETE 
    USING (true);
