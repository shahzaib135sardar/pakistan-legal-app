// app/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Disclaimer from '@/components/Disclaimer';
import { Language, LegalTopic } from '@/types';
import { LEGAL_TOPICS } from '@/lib/constants';
import { BookOpen, Users, FileText, DollarSign, Home } from 'lucide-react';

const iconMap: Record<LegalTopic, React.ReactNode> = {
  'tenant-disputes': <Home className="w-8 h-8" />,
  'salary-issues': <DollarSign className="w-8 h-8" />,
  'fir-process': <FileText className="w-8 h-8" />,
  'loans': <DollarSign className="w-8 h-8" />,
  'inheritance': <Users className="w-8 h-8" />,
};

const topicDescriptions: Record<Language, Record<LegalTopic, string>> = {
  urdu: {
    'tenant-disputes':
      'کرائے دار اور مالک کے درمیان اختلافات، سیکیورٹی ڈپوزٹ، اور بے دخلی کے بارے میں معلومات۔',
    'salary-issues':
      'تنخواہ، اوور ٹائم، ملازمت کی شرائط، اور محنت کش حقوق کے بارے میں۔',
    'fir-process':
      'ایف آئی آر درج کرنے کا طریقہ، جانچ کی کارروائی، اور قانونی حقوق۔',
    'loans': 'قرضوں کی شرائط، ڈیفالٹ، ضمانت، اور قرض دہندگی کے قانون۔',
    'inheritance':
      'وصیت، وارثین کی تقسیم، املاک کی ترتیب، اور ترکے کے معاملات۔',
  },
  'romanUrdu': {
    'tenant-disputes':
      'Kiraye dar aur malik ke darmiyaan ikhtilafaat, security deposit, aur be-dakhal ke baare mein.',
    'salary-issues':
      'Tankhwah, overtime, mulazmati ki sharait, aur mehnat kash huqooq ke baare mein.',
    'fir-process':
      'FIR darj karne ka tarika, janch ki karwai, aur qanuni huqooq.',
    'loans': 'Qurzon ki sharait, default, zaman, aur qarz dehndgi ke qanoon.',
    'inheritance':
      'Wasiyt, warishin ki tafseem, amlak ki tartib, aur tarika ke mamle.',
  },
  english: {
    'tenant-disputes':
      'Information about disputes between tenants and landlords, security deposits, and eviction laws.',
    'salary-issues':
      'Information about wages, overtime, employment conditions, and workers rights.',
    'fir-process':
      'Information about filing FIRs, investigation procedures, and legal rights.',
    'loans': 'Information about loan terms, default procedures, collateral, and lending laws.',
    'inheritance':
      'Information about wills, legal heirs, property distribution, and succession matters.',
  },
};

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('urdu');

  const titles: Record<Language, { main: string; subtitle: string }> = {
    urdu: {
      main: 'پاکستان میں قانونی معلومات',
      subtitle: 'مختلف قانونی موضوعات کے بارے میں تعلیمی معلومات حاصل کریں',
    },
    'romanUrdu': {
      main: 'Pakistan Mein Qanuni Malumat',
      subtitle: 'Mukhtalif qanuni mausuat ke baare mein taleemi malumat hasil karen',
    },
    english: {
      main: 'Legal Information for Pakistan',
      subtitle: 'Get educational information about various legal topics',
    },
  };

  const title = titles[language];

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title.main}</h1>
            <p className="text-xl text-blue-100 mb-8">{title.subtitle}</p>
            <Disclaimer language={language} />
          </div>
        </section>

        {/* Topics Grid */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Object.entries(LEGAL_TOPICS) as [LegalTopic, any][]).map(([topic, names]) => (
              <Link key={topic} href={`/${topic}`}>
                <div className="card cursor-pointer h-full">
                  <div className="text-4xl text-blue-600 mb-4">{iconMap[topic]}</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{names[language]}</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {topicDescriptions[language][topic]}
                  </p>
                  <span className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                    {language === 'urdu' ? 'شروع کریں' : language === 'romanUrdu' ? 'Shuru Karen' : 'Get Started'}
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
              {language === 'urdu'
                ? 'یہ پلیٹ فارم کیسے کام کرتا ہے'
                : language === 'romanUrdu'
                  ? 'Yeh Platform Kaise Kaam Karta Hai'
                  : 'How This Platform Works'}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  urdu: 'اپنا سوال پوچھیں',
                  'romanUrdu': 'Apna Sawaal Pochen',
                  english: 'Ask Your Question',
                  desc: {
                    urdu: 'کسی بھی قانونی موضوع کے بارے میں اپنا سوال لکھیں۔',
                    'romanUrdu': 'Kisi bhi qanuni mausua ke baare mein apna sawaal likhen.',
                    english: 'Write your question about any legal topic.',
                  },
                },
                {
                  urdu: 'AI جواب حاصل کریں',
                  'romanUrdu': 'AI Jawab Hasil Karen',
                  english: 'Get AI Answer',
                  desc: {
                    urdu: 'جدید AI آپ کے سوال کا جواب فوری دیتا ہے۔',
                    'romanUrdu': 'Jadeed AI apke sawaal ka jawab fori deta hai.',
                    english: 'Modern AI instantly answers your question.',
                  },
                },
                {
                  urdu: 'وکیل سے رابطہ کریں',
                  'romanUrdu': 'Wakeel Se Rabta Karen',
                  english: 'Consult a Lawyer',
                  desc: {
                    urdu: 'حساس معاملوں میں ہمیشہ کسی قابل اعتماد وکیل سے رابطہ کریں۔',
                    'romanUrdu': 'Hassas mamlon mein hamesha wakeel se rabta karen.',
                    english: 'Always consult a lawyer for sensitive matters.',
                  },
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-blue-900 mb-4 opacity-20">{index + 1}</div>
                  <h4 className="text-xl font-bold mb-3 text-blue-900">{step[language]}</h4>
                  <p className="text-gray-600">{step.desc[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'urdu'
                ? 'اب شروع کریں'
                : language === 'romanUrdu'
                  ? 'Ab Shuru Karen'
                  : 'Get Started Now'}
            </h2>
            <p className="text-blue-100 mb-8">
              {language === 'urdu'
                ? 'اپنے قانونی سوالات کے جوابات حاصل کریں'
                : language === 'romanUrdu'
                  ? 'Apne qanuni sawaalon ke joabat hasil karen'
                  : 'Get answers to your legal questions'}
            </p>
            <Link href="/tenant-disputes" className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              {language === 'urdu'
                ? 'سوال کریں'
                : language === 'romanUrdu'
                  ? 'Sawaal Karen'
                  : 'Ask a Question'}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
