#!/bin/bash

echo "🚀 AI Study Assistant Deployment Script"
echo "======================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
else
    echo "✅ Vercel CLI already installed"
fi

# Build the frontend
echo "🔨 Building frontend..."
cd frontend
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Frontend deployed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy backend to Render.com"
echo "2. Update frontend API URL to point to your Render backend"
echo "3. Test your deployed app!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
