/**
 * Comprehensive diagnostic test for India Sweet House Analytics
 * Run this in browser console (F12) to identify issues
 */

console.log('=== India Sweet House Analytics Diagnostics ===\n');

// Test 1: Check if Supabase is configured
console.log('1. Checking Supabase configuration...');
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
console.log('✓ Supabase URL:', supabaseUrl ? 'Configured' : '❌ MISSING');
console.log('✓ Supabase Key:', supabaseKey ? 'Configured' : '❌ MISSING');

// Test 2: Check if backend is reachable
console.log('\n2. Checking backend connectivity...');
fetch('http://localhost:5000/health')
    .then(res => res.json())
    .then(data => console.log('✓ Backend health:', data))
    .catch(err => console.error('❌ Backend not reachable:', err.message));

// Test 3: Check if there's data in Supabase
console.log('\n3. Checking Supabase data...');
import { supabase } from './integrations/supabase/client';

supabase
    .from('outlets')
    .select('*', { count: 'exact', head: true })
    .then(({ count, error }) => {
        if (error) {
            console.error('❌ Supabase query error:', error);
        } else {
            console.log(`✓ Outlets in database: ${count}`);
            if (count === 0) {
                console.warn(' ⚠️  No data in database! Upload a file first.');
            }
        }
    });

// Test 4: Check uploaded files
supabase
    .from('uploaded_files')
    .select('*', { count: 'exact' })
    .then(({ data, count, error }) => {
        if (error) {
            console.error('❌ Error fetching files:', error);
        } else {
            console.log(`✓ Uploaded files: ${count}`);
            if (data && data.length > 0) {
                console.log('Latest file:', data[0]);
            }
        }
    });

// Test 5: Check if StoreContext is available
console.log('\n4. Checking React Context...');
try {
    // This will work if running in React DevTools
    console.log('✓ Run this in React component to test StoreContext');
    console.log('  Example: const { stores } = useStoreContext()');
} catch (e) {
    console.log('  (Run in component context to test)');
}

// Test 6: Network requests
console.log('\n5. Monitoring network requests...');
console.log('Open Network tab in DevTools and:');
console.log('  - Filter by "Fetch/XHR"');
console.log('  - Look for failed requests (red)');
console.log('  - Check API endpoints: /process-file, /upload-to-supabase');

console.log('\n=== Diagnostic Complete ===');
console.log('\nCommon Issues:');
console.log('1. No data? Upload an Excel file first');
console.log('2. Backend errors? Check terminal running `npm run dev`');
console.log('3. Supabase errors? Verify credentials in .env file');
console.log('4. Still broken? Share browser console errors with developer');
