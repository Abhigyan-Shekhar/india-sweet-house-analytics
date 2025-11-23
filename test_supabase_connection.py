#!/usr/bin/env python3
"""
Test Supabase connection and data integrity
"""
import os
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
load_dotenv()

def test_supabase_connection():
    print("=" * 60)
    print("SUPABASE CONNECTION TEST")
    print("=" * 60)
    
    # Get credentials
    url = os.getenv('VITE_SUPABASE_URL')
    key = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY')
    
    print(f"\n1. Environment Variables:")
    print(f"   VITE_SUPABASE_URL: {url[:30]}..." if url else "   ❌ MISSING")
    print(f"   VITE_SUPABASE_PUBLISHABLE_KEY: {key[:20]}..." if key else "   ❌ MISSING")
    
    if not url or not key:
        print("\n❌ ERROR: Supabase credentials not found in .env file!")
        return False
    
    try:
        # Create client
        supabase = create_client(url, key)
        print("\n✓ Supabase client created successfully")
        
        # Test connection by querying outlets
        print("\n2. Testing database connection...")
        result = supabase.table('outlets').select('*', count='exact').limit(1).execute()
        
        print(f"✓ Connection successful!")
        print(f"✓ Total outlets in database: {result.count}")
        
        if result.count == 0:
            print("\n⚠️  WARNING: No data in outlets table!")
            print("   Upload an Excel file to populate the database")
        else:
            print(f"\nSample record:")
            if result.data:
                record = result.data[0]
                print(f"   Outlet: {record.get('outlet')}")
                print(f"   Month: {record.get('month')}")
                print(f"   Revenue: ₹{record.get('total_revenue', 0):,.2f}")
        
        # Check uploaded files
        print("\n3. Checking uploaded files...")
        files_result = supabase.table('uploaded_files').select('*', count='exact').execute()
        print(f"✓ Total files uploaded: {files_result.count}")
        
        if files_result.data:
            print(f"\nLatest file:")
            latest = files_result.data[0]
            print(f"   Name: {latest.get('file_name')}")
            print(f"   Uploaded: {latest.get('uploaded_at')}")
            print(f"   Processed: {latest.get('processed')}")
        
        print("\n" + "=" * 60)
        print("✅ ALL TESTS PASSED!")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        print("\nTroubleshooting:")
        print("1. Check .env file exists and has correct credentials")
        print("2. Verify Supabase project is active")
        print("3. Check network connectivity")
        print("4. Verify RLS policies allow read access")
        return False

if __name__ == "__main__":
    success = test_supabase_connection()
    exit(0 if success else 1)
