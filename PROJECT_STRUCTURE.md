# Pakistan Legal Information Web App - Project Structure

## Directory Layout

```
pakistan-legal-app/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   ├── api/
│   │   └── legal-qa/
│   │       └── route.ts        # AI API endpoint
│   ├── (pages)/
│   │   ├── tenant-disputes/
│   │   │   └── page.tsx
│   │   ├── salary-issues/
│   │   │   └── page.tsx
│   │   ├── fir-process/
│   │   │   └── page.tsx
│   │   ├── loans/
│   │   │   └── page.tsx
│   │   ├── inheritance/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Disclaimer.tsx
│   ├── ChatInterface.tsx
│   ├── LanguageToggle.tsx
│   └── LoadingSpinner.tsx
├── lib/
│   ├── ai-service.ts           # AI service with HF + OpenAI fallback
│   ├── prompts.ts              # Legal prompt templates
│   ├── translations.ts         # Urdu/Roman Urdu translations
│   └── constants.ts            # App constants
├── types/
│   └── index.ts                # TypeScript types
├── public/
│   ├── images/
│   └── favicon.ico
├── .env.local                  # Environment variables
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── package.json
└── README.md
```

## Installation Steps

1. Clone/create project
2. Install dependencies
3. Set up environment variables
4. Run development server
5. Deploy to Vercel

See DEPLOYMENT.md for detailed Vercel setup.
