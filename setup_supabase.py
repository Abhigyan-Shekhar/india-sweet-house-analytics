"""
Script to create Supabase database schema automatically
Run this script to create the tables and policies in your Supabase database
"""
import os
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
load_dotenv()

supabase_url = os.getenv('VITE_SUPABASE_URL')
supabase_key = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY')

if not supabase_url or not supabase_key:
    raise ValueError("Missing Supabase credentials. Please check your .env file.")

# Create Supabase client
supabase = create_client(supabase_url, supabase_key)

# Read SQL schema file
with open('supabase_schema.sql', 'r') as f:
    schema_sql = f.read()

print("Creating Supabase database schema...")
print("Note: This script uses the Supabase REST API to execute SQL.")
print("For best results, copy the contents of supabase_schema.sql and run it in the Supabase SQL Editor.")
print("\nSteps:")
print("1. Go to https://supabase.com/dashboard")
print("2. Select your project: fyjsmcofbuswelxvgtit")
print("3. Click on 'SQL Editor' in the left sidebar")
print("4. Click 'New Query'")
print("5. Paste the contents of supabase_schema.sql")
print("6. Click 'Run' to execute the SQL")
print("\nAlternatively, you can use the Supabase CLI:")
print("  supabase db push")

# Test connection
try:
    response = supabase.table('outlets').select('*').limit(1).execute()
    print("\n✓ Successfully connected to Supabase!")
    print(f"  Tables are {'READY' if response else 'NOT YET CREATED'}")
except Exception as e:
    print(f"\n⚠ Could not connect to outlets table: {str(e)}")
    print("  This is expected if the schema hasn't been created yet.")
    print("  Please run the SQL schema in the Supabase dashboard.")
