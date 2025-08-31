# 🚀 Deployment Guide - AI Study Assistant

This guide will help you deploy your AI Study Assistant to the internet for free!

## 🌟 **Recommended: Vercel (Frontend) + Render (Backend)**

### **Step 1: Deploy Backend to Render**

1. **Sign up at [render.com](https://render.com)**
2. **Create New Web Service**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `ai-study-assistant-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

5. **Add Environment Variables:**
   - `GEMINI_API_KEY`: Your actual Gemini API key
   - `PYTHON_VERSION`: `3.9.16`

6. **Deploy!** Render will give you a URL like: `https://your-app.onrender.com`

### **Step 2: Deploy Frontend to Vercel**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend folder:**
   ```bash
   cd frontend
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Project name: `ai-study-assistant`
   - Deploy to production

4. **Update API URL:**
   After deployment, update your frontend to use the Render backend URL instead of localhost.

## 🔧 **Alternative Deployment Options**

### **Option 2: Netlify + Railway**
- **Frontend**: Drag & drop to [netlify.com](https://netlify.com)
- **Backend**: Deploy to [railway.app](https://railway.app)

### **Option 3: GitHub Pages + Heroku**
- **Frontend**: GitHub Pages (free)
- **Backend**: Heroku (free tier discontinued, but still affordable)

### **Option 4: AWS Free Tier**
- **Frontend**: S3 + CloudFront
- **Backend**: EC2 or Lambda
- **Cost**: Free for 12 months, then ~$5-20/month

## 📝 **Pre-Deployment Checklist**

- [ ] Backend code updated to use environment variables
- [ ] Frontend can connect to external backend URLs
- [ ] API key is secure (not hardcoded)
- [ ] CORS is properly configured
- [ ] Error handling is robust

## 🔒 **Security Considerations**

1. **Never commit API keys to Git**
2. **Use environment variables**
3. **Enable HTTPS (automatic on Vercel/Render)**
4. **Set up proper CORS policies**

## 🚨 **Common Issues & Solutions**

### **CORS Errors**
- Ensure backend allows your frontend domain
- Check that CORS middleware is properly configured

### **API Key Issues**
- Verify environment variables are set correctly
- Check that the key has proper permissions

### **Build Failures**
- Ensure all dependencies are in requirements.txt
- Check Python version compatibility

## 💰 **Cost Breakdown (Free Tier)**

- **Vercel**: Free (100GB bandwidth/month)
- **Render**: Free (750 hours/month)
- **Total Cost**: $0/month

## 🎯 **Next Steps After Deployment**

1. **Test all functionality**
2. **Set up custom domain (optional)**
3. **Monitor performance**
4. **Set up analytics (optional)**
5. **Share your app with the world!**

## 📞 **Need Help?**

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **FastAPI Docs**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)

---

**Happy Deploying! 🚀**
