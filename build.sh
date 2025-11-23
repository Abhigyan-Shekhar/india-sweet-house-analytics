#!/bin/bash
# Build script for Render deployment

echo "=== Installing Python dependencies ==="
pip install --upgrade pip
pip install -r requirements.txt

echo "=== Installing Node dependencies ==="
npm install

echo "=== Building React frontend ==="
npm run build

echo "=== Build complete! ==="
ls -la dist/
