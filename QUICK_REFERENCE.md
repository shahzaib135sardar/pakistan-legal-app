# ⚡ QUICK START REFERENCE CARD

## 🚀 Deploy in 5 Steps (30 minutes)

### Step 1: Get API Keys (10 min)
```
1. Visit: https://huggingface.co/settings/tokens
2. Create token → Copy (starts with hf_)
3. Visit: https://platform.openai.com/api-keys
4. Create key → Copy (starts with sk_)
5. Save both somewhere safe
```

### Step 2: Clone & Install (5 min)
```bash
git clone https://github.com/YOUR_USERNAME/pakistan-legal-app.git
cd pakistan-legal-app
npm install
```

### Step 3: Setup Environment (5 min)
```bash
cp .env.local.example .env.local
# Edit .env.local and paste your API keys
nano .env.local
```

### Step 4: Test Locally (5 min)
```bash
npm run dev
# Visit: http://localhost:3000
# Should see home page with 5 topics
```

### Step 5: Deploy to Vercel (5 min)
```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push

# Go to: https://vercel.com
# Import project
# Add environment variables
# Click Deploy ✓
```

---

## 📁 PROJECT FILES AT A GLANCE

| File | Purpose | Status |
|------|---------|--------|
| **Core Pages** | | |
| `app/page.tsx` | Home page | ✅ Ready |
| `app/(pages)/[topic]/page.tsx` | Chat pages | ✅ Ready |
| `app/(pages)/about/page.tsx` | About page | ✅ Ready |
| **Components** | | |
| `components/ChatInterface.tsx` | Q&A chat | ✅ Ready |
| `components/Header.tsx` | Navigation | ✅ Ready |
| `components/Footer.tsx` | Footer | ✅ Ready |
| **Backend** | | |
| `app/api/legal-qa/route.ts` | AI API | ✅ Ready |
| **Logic** | | |
| `lib/ai-service.ts` | HF + OpenAI | ✅ Ready |
| `lib/prompts.ts` | Legal prompts | ✅ Ready |
| `lib/constants.ts` | Content & config | ✅ Ready |
| **Config** | | |
| `package.json` | Dependencies | ✅ Ready |
| `.env.local` | API keys | ⏳ Add yours |

---

## 🎯 5 LEGAL TOPICS READY

| Topic | Route | Status |
|-------|-------|--------|
| Tenant Disputes | `/tenant-disputes` | ✅ |
| Salary Issues | `/salary-issues` | ✅ |
| FIR Process | `/fir-process` | ✅ |
| Loans | `/loans` | ✅ |
| Inheritance | `/inheritance` | ✅ |

---

## 🌍 3 LANGUAGES SUPPORTED

| Language | Key | Status |
|----------|-----|--------|
| اردو (Urdu) | `urdu` | ✅ |
| رومن اردو (Roman) | `roman-urdu` | ✅ |
| English | `english` | ✅ |

---

## 🤖 AI SERVICES

**Primary**: Hugging Face (Free, fast, unlimited)
```
Model: mistral-7b-instruct
Speed: 2-5 seconds
Cost: $0
```

**Fallback**: OpenAI GPT-3.5-turbo (Reliable)
```
Model: gpt-3.5-turbo
Speed: 3-10 seconds
Cost: ~$0.00025 per request
```

---

## 📊 WHAT YOU GET

✓ Complete Next.js 14 application
✓ 6 React components
✓ 3 AI-powered pages
✓ Multi-language support (3 languages)
✓ 5 legal topics covered
✓ Professional UI design
✓ Mobile responsive
✓ TypeScript strict mode
✓ Hugging Face + OpenAI integration
✓ Error handling & fallbacks
✓ Legal disclaimers
✓ Complete documentation
✓ Vercel ready
✓ Security configured

---

## 💡 CUSTOMIZATION POINTS

To make it your own:

1. **Change branding**
   ```
   app/layout.tsx - Title & metadata
   components/Header.tsx - Logo & name
   components/Footer.tsx - Contact info
   ```

2. **Update legal content**
   ```
   lib/constants.ts - Legal information
   lib/prompts.ts - AI prompts
   ```

3. **Add more languages**
   ```
   lib/constants.ts - Add new language
   components/LanguageToggle.tsx - Add button
   ```

4. **Modify styling**
   ```
   app/globals.css - Change colors
   tailwind.config.js - Extend theme
   ```

---

## 🔧 ESSENTIAL COMMANDS

```bash
# Development
npm run dev              # Start dev server
npm run build           # Create build
npm run start           # Run build

# Vercel
vercel login            # Login
vercel --prod           # Deploy
vercel logs             # Check logs

# Maintenance
npm install             # Install deps
npm update              # Update packages
npm audit fix           # Security fixes
```

---

## 🌐 IMPORTANT URLS

| Service | URL |
|---------|-----|
| **Hugging Face** | https://huggingface.co/settings/tokens |
| **OpenAI** | https://platform.openai.com/api-keys |
| **Vercel** | https://vercel.com |
| **GitHub** | https://github.com |
| **Docs** | README.md (in project) |

---

## 💾 FILE STRUCTURE OVERVIEW

```
pakistan-legal-app/
├── app/                    # Pages & API
│   ├── page.tsx           # Home
│   ├── api/legal-qa/route.ts # AI API
│   └── (pages)/           # Other pages
├── components/             # UI Components
├── lib/                    # Business logic
├── types/                  # TypeScript
├── public/                 # Static files
├── package.json            # Dependencies
├── .env.local              # API keys (CREATE THIS)
└── [config files]          # Next.js config
```

---

## ❌ DON'T FORGET

1. **❌ API Keys in code**
   ✅ Use .env.local instead

2. **❌ .env.local in Git**
   ✅ Already in .gitignore

3. **❌ Deploy without testing**
   ✅ Test locally first (npm run dev)

4. **❌ Skip environment vars on Vercel**
   ✅ Add in Dashboard → Settings → Environment

5. **❌ Hardcode API endpoints**
   ✅ Use environment variables

---

## 🆘 QUICK FIXES

| Issue | Fix |
|-------|-----|
| "Cannot find module" | `npm install` |
| "API key not working" | Check format in .env.local |
| "Build fails" | Run `npm run build` locally first |
| "Slow responses" | Use OpenAI instead of HF |
| "No response" | Check internet & API keys |

---

## ✅ DEPLOYMENT CHECKLIST

Before deploying:
- [ ] API keys obtained
- [ ] .env.local created and filled
- [ ] Local testing done (npm run dev)
- [ ] Build successful (npm run build)
- [ ] Git repo created and code pushed
- [ ] Vercel account ready
- [ ] All environment variables added to Vercel

---

## 📞 WHERE TO GET HELP

| Question | Resource |
|----------|----------|
| "How to setup?" | SETUP_GUIDE.md |
| "How to deploy?" | DEPLOYMENT.md |
| "How to use?" | README.md |
| "How does it work?" | Code comments |
| "API not working?" | README.md troubleshooting |

---

## 🎉 SUCCESS INDICATORS

✅ Your app is working if:
- Home page loads in < 2 seconds
- Can click on all 5 topics
- Language toggle works
- Can type a question
- Get AI response in < 10 seconds
- Disclaimer visible on every response
- Mobile looks good on phone

---

## 📱 FEATURES AT A GLANCE

| Feature | Included | Notes |
|---------|----------|-------|
| Home page | ✅ | Landing page with 5 topics |
| Chat interface | ✅ | Ask questions, get answers |
| AI Q&A | ✅ | HF + OpenAI |
| Multi-language | ✅ | Urdu, Roman, English |
| Mobile responsive | ✅ | Works on all devices |
| Legal topics | ✅ | 5 comprehensive topics |
| Disclaimers | ✅ | On every page |
| Authentication | ⏳ | Add with NextAuth.js |
| Database | ⏳ | Add with MongoDB/Postgres |

---

## 💰 COST BREAKDOWN

| What | Cost |
|-----|------|
| Vercel hosting | $0 (free tier) |
| Hugging Face | $0 (free tier) |
| OpenAI API | $0-10/month (optional) |
| **Total** | **$0-10/month** |

---

## 🚀 AFTER LAUNCH

Next things to do:
1. Monitor in Vercel Dashboard
2. Set up custom domain
3. Add Google Analytics
4. Share with users
5. Gather feedback
6. Improve based on usage

---

## 📚 DOCUMENTATION MAP

- **New to project?** → Start with README.md
- **Ready to setup?** → Follow SETUP_GUIDE.md
- **Deploying?** → Use DEPLOYMENT.md
- **All files?** → See DELIVERABLES.md
- **Need quick ref?** → This file (QUICK_REFERENCE.md)

---

## ⏱️ TIMELINE

| Task | Time |
|------|------|
| Get API keys | 10 min |
| Local setup | 15 min |
| Test locally | 10 min |
| Push to GitHub | 5 min |
| Deploy to Vercel | 10 min |
| Test live | 5 min |
| **TOTAL** | **55 min** |

---

## 🎯 QUICK GOALS

- [x] Build complete Next.js app ✅
- [x] Integrate AI (HF + OpenAI) ✅
- [x] Multi-language support ✅
- [x] Professional UI ✅
- [x] Mobile responsive ✅
- [x] Legal compliance ✅
- [x] Complete documentation ✅
- [ ] Deploy to Vercel (YOUR NEXT STEP!)

---

**You're ready to deploy! 🚀**

Next step: Follow SETUP_GUIDE.md for step-by-step instructions.

Questions? Check README.md or DEPLOYMENT.md.

---

*Quick Reference Card v1.0*
*Last Updated: February 2, 2026*
