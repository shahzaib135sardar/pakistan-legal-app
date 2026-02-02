# 🚀 Complete Setup Guide - Pakistan Legal App

## Step 1: Get Required API Keys (10 minutes)

### Hugging Face API Key (Required)

1. Go to: https://huggingface.co/settings/tokens
2. Click "New token"
3. Give it a name: "pakistan-legal-app"
4. Select scope: "Read" (sufficient for inference)
5. Click "Create token"
6. Copy the token (starts with `hf_`)
7. Save it somewhere safe

### OpenAI API Key (Optional - for fallback)

1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Give it a name: "pakistan-legal-app"
4. Click "Create secret key"
5. Copy the key (starts with `sk-`)
6. Save it somewhere safe
7. (Add payment method for production)

---

## Step 2: Local Development Setup (15 minutes)

### 2.1 Clone Repository

```bash
# Option A: Using Git
git clone https://github.com/YOUR_USERNAME/pakistan-legal-app.git
cd pakistan-legal-app

# Option B: Create new from scratch
npx create-next-app@latest pakistan-legal-app
cd pakistan-legal-app
```

### 2.2 Install Dependencies

```bash
npm install
```

This will install:
- next (14.1.0)
- react & react-dom (18.2.0)
- typescript
- tailwindcss
- lucide-react
- @huggingface/inference
- openai

### 2.3 Create Environment File

```bash
# Copy example file
cp .env.local.example .env.local

# Edit with your editor
nano .env.local
# or
code .env.local
```

Add your API keys:

```env
NEXT_PUBLIC_HF_API_KEY=hf_YOUR_KEY_HERE
OPENAI_API_KEY=sk_YOUR_KEY_HERE
NEXT_PUBLIC_APP_URL=http://localhost:3000
MAX_RESPONSE_LENGTH=500
HF_MODEL_ID=mistral-7b-instruct
```

### 2.4 Verify Installation

```bash
# Check if everything is installed
npm list

# Should show:
# - next@14.1.0
# - react@18.2.0
# - typescript
# - tailwindcss
```

### 2.5 Run Development Server

```bash
npm run dev
```

**Output:**
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### 2.6 Open in Browser

Visit: http://localhost:3000

✅ You should see:
- Header with "پاک قانون" title
- 5 topic cards (Tenant, Salary, FIR, Loans, Inheritance)
- Language toggle (Urdu, Roman Urdu, English)
- Footer with contact info

---

## Step 3: Test the Application

### 3.1 Test Home Page

```bash
# Home page should load instantly
# http://localhost:3000
```

**Check:**
- [ ] Page loads < 2 seconds
- [ ] All 5 topic cards visible
- [ ] Language buttons work
- [ ] Mobile responsive

### 3.2 Test Chat Interface

1. Click any topic card (e.g., "Tenant Disputes")
2. Page should load chat interface
3. Select a language
4. Click one of the default questions
5. Type your question
6. Click send button

**Expected:**
- Question appears in chat (blue bubble, right-aligned)
- Loading spinner shows
- After 3-5 seconds, AI response appears
- Response includes disclaimer
- Mobile friendly

### 3.3 Test API Directly

```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/legal-qa \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What are tenant rights in Pakistan?",
    "topic": "tenant-disputes",
    "language": "english"
  }'

# Response:
{
  "success": true,
  "answer": "In Pakistan, tenants have several rights...",
  "source": "huggingface",
  "language": "english"
}
```

### 3.4 Test All Languages

For each language, test:
- [ ] Urdu (اردو) - proper Urdu script
- [ ] Roman Urdu (رومن اردو) - Latin script Urdu
- [ ] English - English responses

---

## Step 4: Build for Production

### 4.1 Create Production Build

```bash
npm run build
```

**Output:**
```
   ✓ Compiled successfully
   ✓ Linting and checking validity of types
   ✓ Next.js 14.1 collected all files
✓ Pages with static generation: 45 prerendered
✓ Pre-rendered as static HTML (uses ISR)
```

### 4.2 Test Production Build Locally

```bash
npm run start
```

Visit: http://localhost:3000

Should behave identically to development.

### 4.3 Check File Size

```bash
# Check build output size
ls -lh .next/static/

# Typical sizes:
# - chunks/XXXX.js : 50-100KB
# - chunks/main.js : 100-200KB
# - css/app.css : 50KB
```

---

## Step 5: Deploy to Vercel

### 5.1 Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: Pakistan Legal Info App"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/pakistan-legal-app.git
git branch -M main
git push -u origin main
```

### 5.2 Deploy Using Vercel Web

1. Go to: https://vercel.com
2. Click "New Project"
3. Click "Import Git Repository"
4. Paste: `https://github.com/YOUR_USERNAME/pakistan-legal-app`
5. Click "Continue"
6. **Framework**: Select "Next.js"
7. **Root Directory**: Leave as `.`
8. **Environment Variables**: Add from `.env.local`

   ```
   NEXT_PUBLIC_HF_API_KEY = hf_...
   OPENAI_API_KEY = sk_...
   NEXT_PUBLIC_APP_URL = https://[your-project].vercel.app
   MAX_RESPONSE_LENGTH = 500
   HF_MODEL_ID = mistral-7b-instruct
   ```

9. Click "Deploy"

**Wait 2-5 minutes for deployment...**

### 5.3 Verify Deployment

Once deployed:

1. Vercel shows: "Congratulations!"
2. Your URL: https://pakistan-legal-app.vercel.app
3. Click "Visit" to open the live site
4. Test all features on live site

### 5.4 Set Custom Domain (Optional)

1. In Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain: `paklegal.pk`
4. Follow DNS instructions
5. Wait for DNS propagation (5-48 hours)

---

## Step 6: Monitoring & Maintenance

### 6.1 Monitor in Vercel Dashboard

```
Dashboard → Project Name → Analytics
- Real User Metrics
- Vitals
- Error Rate
- Response Times
```

### 6.2 Check Logs

```bash
# Live logs
vercel logs

# Production logs
vercel logs --prod

# Recent errors
vercel logs --error
```

### 6.3 Monitor API Usage

**Hugging Face:**
- Dashboard: https://huggingface.co/profile/usage
- Free tier includes 1000s of requests/day
- Monitor for rate limiting

**OpenAI (if used):**
- Dashboard: https://platform.openai.com/account/usage/overview
- Pay as you go
- ~$0.00025 per request (500 tokens)

### 6.4 Handle Errors

**If Hugging Face times out:**
```
Error: HF_REQUEST_TIMEOUT
→ OpenAI fallback activates
→ Response slower but reliable
```

**If both fail:**
```
Error: Both APIs failed
→ User sees: "معافی چاہتے ہیں، خرابی ہوئی"
→ Check:
   1. API keys valid?
   2. Rate limit exceeded?
   3. Internet connectivity?
```

---

## Troubleshooting

### Problem: "Cannot find module '@huggingface/inference'"

**Solution:**
```bash
npm install @huggingface/inference
npm install openai
npm install
```

### Problem: "HF API key not working"

**Check:**
1. Token format: Should start with `hf_`
2. Copy entire token (no spaces)
3. In .env.local: `NEXT_PUBLIC_HF_API_KEY=hf_...` (no quotes)
4. Restart dev server: `npm run dev`

### Problem: Responses are very slow

**Reasons:**
- Hugging Face free tier (rate limited)
- Model loading first time (slower)
- Network latency

**Solutions:**
1. Use OpenAI for faster responses
2. Increase `MAX_RESPONSE_LENGTH` timeout
3. Upgrade Hugging Face to Pro

### Problem: Build fails

**Check:**
```bash
# Test locally
npm run build

# TypeScript errors?
npx tsc --noEmit

# Lint errors?
npm run lint
```

### Problem: Images not loading

**Check:**
1. Files in `/public/images/` exist?
2. Import path correct?
3. File name matches exactly (case-sensitive)

---

## Performance Checklist

- [ ] Home page loads < 1 second
- [ ] Chat interface responsive < 3 seconds
- [ ] AI response received < 10 seconds
- [ ] Mobile works perfectly
- [ ] Language toggle instant
- [ ] No console errors
- [ ] No network errors
- [ ] Disclaimer always visible

---

## Security Checklist

- [ ] API keys in .env.local (not in code)
- [ ] .env.local in .gitignore
- [ ] No sensitive data in comments
- [ ] HTTPS enabled (Vercel automatic)
- [ ] Environment variables set on Vercel
- [ ] Input validation working
- [ ] Rate limiting ready to add
- [ ] No personal data collection

---

## File Checklist

After setup, should have:

```
pakistan-legal-app/
├── app/
│   ├── api/legal-qa/route.ts        ✓
│   ├── (pages)/[topic]/page.tsx      ✓
│   ├── (pages)/about/page.tsx        ✓
│   ├── page.tsx                      ✓
│   ├── layout.tsx                    ✓
│   └── globals.css                   ✓
├── components/                       ✓
│   ├── ChatInterface.tsx
│   ├── Disclaimer.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LanguageToggle.tsx
│   └── LoadingSpinner.tsx
├── lib/
│   ├── ai-service.ts                ✓
│   ├── constants.ts                 ✓
│   ├── prompts.ts                   ✓
│   └── translations.ts              ✓
├── types/index.ts                   ✓
├── public/
├── package.json                     ✓
├── .env.local                       ✓
├── .env.local.example               ✓
├── next.config.js                   ✓
├── tsconfig.json                    ✓
├── tailwind.config.js               ✓
├── postcss.config.js                ✓
├── README.md                        ✓
└── DEPLOYMENT.md                    ✓
```

---

## Next Steps After Setup

1. **Customize Content**
   - Edit legal information in `lib/constants.ts`
   - Add more default questions
   - Update footer contact info

2. **Add Features**
   - User authentication (NextAuth.js)
   - Save chat history (MongoDB)
   - Lawyer directory
   - Video tutorials

3. **Improve SEO**
   - Add Meta tags
   - Submit sitemap to Google
   - Optimize images
   - Add structured data

4. **Scale for Growth**
   - Set up analytics
   - Add rate limiting
   - Implement caching
   - Monitor performance

---

## Common Commands

```bash
# Development
npm run dev           # Start dev server
npm run build        # Create production build
npm run start        # Run production build

# Cleanup
npm run lint         # Check code quality
npm install          # Install dependencies
npm update           # Update packages
npm audit fix        # Fix vulnerabilities

# Vercel
vercel login         # Login to Vercel
vercel --prod        # Deploy to production
vercel logs          # Check logs
```

---

## Getting Help

1. **Documentation**
   - README.md (this file)
   - DEPLOYMENT.md (Vercel setup)
   - Code comments

2. **GitHub Issues**
   - Search existing issues
   - Create new issue with error details

3. **External Resources**
   - Next.js Docs: https://nextjs.org/docs
   - Hugging Face: https://huggingface.co/docs
   - OpenAI: https://platform.openai.com/docs

---

## Success Indicators

✅ Application is working perfectly if:

1. **Local Development**
   - `npm run dev` works
   - Home page loads at localhost:3000
   - Can ask questions in chat
   - Get AI responses in < 10 seconds
   - Disclaimer visible everywhere

2. **Production (Vercel)**
   - Live URL works
   - Same features as local
   - Responses faster (Vercel optimization)
   - No console errors
   - Works on mobile devices

3. **API Health**
   - Hugging Face responding
   - OpenAI fallback working
   - No rate limiting errors
   - Response times < 10 seconds

---

## Estimated Costs (Monthly)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | 100GB bandwidth | $0 |
| Hugging Face | Unlimited (rate limited) | $0 |
| OpenAI | — | $0-5 (depends on usage) |
| **Total** | — | **$0-5** |

---

## Timeline

| Task | Time | Status |
|------|------|--------|
| Get API Keys | 10 min | ✓ |
| Local Setup | 15 min | ✓ |
| Test Application | 20 min | ✓ |
| Build for Production | 5 min | ✓ |
| Deploy to Vercel | 10 min | ✓ |
| **Total** | **60 min** | ✓ |

---

**You're all set! 🎉**

Your Pakistan Legal Information App is ready to serve users with educational legal information in Urdu, Roman Urdu, and English.

For questions or issues, check:
- README.md
- DEPLOYMENT.md
- Code comments
- Vercel docs

---

**Last Updated**: February 2, 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
