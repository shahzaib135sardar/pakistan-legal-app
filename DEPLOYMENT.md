# Deployment Guide - Vercel

## Quick Start (5 minutes)

### 1. Prerequisites
- GitHub account
- Hugging Face API key
- OpenAI API key (optional fallback)

### 2. Get API Keys

#### Hugging Face API Key
1. Go to https://huggingface.co/settings/tokens
2. Create a new token with read access
3. Copy the token

#### OpenAI API Key (Optional)
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key

### 3. Push to GitHub

```bash
# Initialize git (if not already done)
cd pakistan-legal-app
git init
git add .
git commit -m "Initial commit: Pakistan Legal Info App"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/pakistan-legal-app.git
git branch -M main
git push -u origin main
```

### 4. Deploy to Vercel

#### Option A: Using Vercel Website (Easiest)

1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Paste your GitHub repo URL
5. Connect your GitHub account
6. Click "Import"
7. Vercel will auto-detect Next.js settings
8. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 5. Set Environment Variables

**In Vercel Dashboard:**

1. Go to your project settings
2. Click "Environment Variables"
3. Add these variables:

```
NEXT_PUBLIC_HF_API_KEY = your_huggingface_token
OPENAI_API_KEY = your_openai_key
NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
MAX_RESPONSE_LENGTH = 500
HF_MODEL_ID = mistral-7b-instruct
```

**Important:**
- `NEXT_PUBLIC_*` variables are visible in browser (safe for public keys)
- Other variables are server-side only
- Rebuild after adding environment variables

### 6. Verify Deployment

1. Visit your Vercel URL: https://YOUR_PROJECT.vercel.app
2. Test the chat interface
3. Ask a test question to verify AI integration

## Project Setup (Local Development)

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Local Environment Setup

```bash
# Copy example env file
cp .env.local.example .env.local

# Edit .env.local and add your keys
# NEXT_PUBLIC_HF_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Advanced Configuration

### Custom Domain

1. In Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., paklegal.pk)
4. Update DNS records with Vercel's nameservers
5. Wait for DNS propagation (5-48 hours)

### CI/CD Pipeline

Vercel automatically:
- Builds on push to main branch
- Runs tests if test script exists
- Deploys to production
- Creates preview deployments for PRs

### Performance Optimization

**Already configured:**
- Image optimization
- CSS minification
- JS minification
- Server-side rendering for SEO

**Additional tips:**
- Use `next/image` for images
- Enable Incremental Static Regeneration (ISR) for static pages
- Monitor with Vercel Analytics

## Troubleshooting

### Build Fails

**Check logs:**
```bash
vercel logs --prod
```

**Common issues:**
1. Missing environment variables → Add in Dashboard
2. API key errors → Verify keys are correct
3. TypeScript errors → Run `npm run build` locally first

### API Errors

**Test API endpoint:**
```bash
curl -X POST http://localhost:3000/api/legal-qa \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is a tenant?",
    "topic": "tenant-disputes",
    "language": "english"
  }'
```

### Slow Response Times

1. Hugging Face is free tier - slower responses expected
2. Consider upgrading to paid OpenAI API
3. Increase `MAX_RESPONSE_LENGTH` timeout in Vercel env

## Monitoring

### Vercel Analytics
- Automatic real user monitoring
- Check Dashboard → Analytics
- Monitor response times and errors

### Error Tracking
Errors automatically logged in:
- Vercel Dashboard → Logs
- Browser console (development)
- Server logs (production)

## Cost Estimates

**Vercel (Free Tier):**
- Unlimited deployments
- 100GB bandwidth/month
- Cold starts included

**Hugging Face (Free Tier):**
- Rate limited
- Good for low-traffic apps
- No cost

**OpenAI (Fallback):**
- Charged per token
- GPT-3.5-turbo: ~$0.0005 per 1K tokens
- Estimate: $1-10/month for moderate usage

## Security Checklist

- ✅ API keys in environment variables (not in code)
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ CORS headers configured
- ✅ Security headers added in next.config.js
- ✅ Input validation on backend
- ✅ No personal data collection
- ✅ Clear disclaimer on every page

## Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Security audit
npm audit fix
```

### Backup

GitHub automatically backs up your code. Regular commits ensure safety.

### Monitoring Health

1. Set up uptime monitoring (e.g., UptimeRobot)
2. Monitor error logs weekly
3. Check analytics for trends
4. Test API monthly

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Hugging Face:** https://huggingface.co/docs
- **OpenAI:** https://platform.openai.com/docs

## Scaling for Higher Traffic

### When to Upgrade

- More than 1000 daily users
- Response times > 3 seconds
- Vercel bandwidth approaching limit

### Solutions

1. Migrate to paid Hugging Face
2. Implement caching (Redis)
3. Use CDN for static assets
4. Consider database for conversation history
5. Implement rate limiting

## FAQ

**Q: Can I use free Hugging Face?**
A: Yes, but responses are slower. Upgrade to Hugging Face Pro for production use.

**Q: How much bandwidth does this use?**
A: ~100KB per chat interaction. Vercel free tier allows 100GB/month.

**Q: Can I add authentication?**
A: Yes, use NextAuth.js. Add to project and configure GitHub/Google provider.

**Q: How do I add database?**
A: Use Vercel Postgres, MongoDB, or Firebase. Update `.env.local` with connection string.

**Q: Can I monetize this?**
A: Yes, but comply with Hugging Face ToS (non-commercial free tier).

---

**Last Updated:** February 2026
**Next.js Version:** 14.1+
**Node Version:** 18+
