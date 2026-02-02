// app/(pages)/about/page.tsx

'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Disclaimer from '@/components/Disclaimer';
import { Language } from '@/types';
import { BookOpen, Shield, Zap } from 'lucide-react';

export default function About() {
  const [language, setLanguage] = useState<Language>('urdu');

  const content = {
    urdu: {
      title: 'ہمارے بارے میں',
      intro: 'پاک قانون ایک تعلیمی پلیٹ فارم ہے جو پاکستان میں قانونی معلومات فراہم کرتا ہے۔',
      mission: 'ہمارا مقصد',
      missionText:
        'پاکستانی شہری کو قانونی معلومات تک رسائی دینا تاکہ وہ اپنے قانونی حقوق کو سمجھ سکیں۔',
      features: 'خصوصیات',
      about: 'تعارف',
      aboutText: `ہمارا پلیٹ فارم جدید AI ٹیکنالوجی استعمال کرتے ہوئے معلومات فراہم کرتا ہے۔ ہم مختلف قانونی موضوعات پر معلومات دیتے ہیں جیسے:
      
      • کرائے دار کے حقوق اور اختلافات
      • تنخواہ اور ملازمت کے مسائل
      • ایف آئی آر اور پولیس کے معاملات
      • قرضے اور ڈیفالٹ
      • وراثت اور ملکیت کی تقسیم`,
      disclaimer: 'اہم رعایت',
      disclaimerText:
        'یہ پلیٹ فارم صرف تعلیمی معلومات فراہم کرتا ہے۔ یہ قانونی مشورہ نہیں ہے۔ کسی بھی قانونی معاملے میں براہ کرم کسی قابل اعتماد وکیل سے رابطہ کریں۔',
      contact: 'رابطہ',
      contactText: 'کسی بھی سوال یا تجویز کے لیے ہمیں info@paklegal.pk پر ای میل کریں۔',
    },
    'roman-urdu': {
      title: 'Hamara Baray Mein',
      intro: 'Pak Qanoon ek taleemi platform hai jo Pakistan mein qanuni malumat farham karta hai.',
      mission: 'Hamara Maqsad',
      missionText:
        'Pakistani shahri ko qanuni malumat tak rasai dena taka woh apne qanuni huqooq ko samjh saken.',
      features: 'Khasosiyaat',
      about: 'Tarafu',
      aboutText: `Hamara platform jadeed AI technology istemal karte hue malumat farham karta hai. Ham mukhtalif qanuni mausuat par malumat dete hain jaise:
      
      • Kiraye dar ke huqooq aur ikhtilafat
      • Tankhwah aur mulazmati ke masail
      • FIR aur police ke mamle
      • Qurzon aur default
      • Varsat aur milkiyat ki tafseem`,
      disclaimer: 'Aham Raayat',
      disclaimerText:
        'Yeh platform sirf taleemi malumat farham karta hai. Yeh qanuni mashwara nahi hai. Kisi bhi qanuni mamle mein brahe karam wakeel se rabta karen.',
      contact: 'Rabta',
      contactText: 'Kisi bhi sawaal ya tajweez ke liye hamein info@paklegal.pk par email karen.',
    },
    english: {
      title: 'About Us',
      intro: 'Pakistan Legal Info is an educational platform that provides legal information for Pakistan.',
      mission: 'Our Mission',
      missionText:
        'To provide Pakistani citizens with access to legal information so they can understand their legal rights.',
      features: 'Features',
      about: 'About',
      aboutText: `Our platform uses modern AI technology to provide information. We provide information on various legal topics such as:
      
      • Tenant rights and disputes
      • Salary and employment issues
      • FIR and police matters
      • Loans and defaults
      • Inheritance and property distribution`,
      disclaimer: 'Important Disclaimer',
      disclaimerText:
        'This platform only provides educational information. This is not legal advice. Please consult with a qualified lawyer for any legal matter.',
      contact: 'Contact',
      contactText: 'For any questions or suggestions, email us at info@paklegal.pk.',
    },
  };

  const text = content[language];

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{text.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{text.intro}</p>

        <Disclaimer language={language} />

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{text.mission}</h2>
          <p className="text-gray-600 mb-6">{text.missionText}</p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                urdu: 'تعلیمی',
                'roman-urdu': 'Taleemi',
                english: 'Educational',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                urdu: 'محفوظ',
                'roman-urdu': 'Mahfooz',
                english: 'Secure',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                urdu: 'تیز',
                'roman-urdu': 'Teez',
                english: 'Fast',
              },
            ].map((item, index) => (
              <div key={index} className="card text-center">
                <div className="text-blue-600 mb-3 flex justify-center">{item.icon}</div>
                <h4 className="font-bold text-blue-900">{item[language]}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{text.about}</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200 whitespace-pre-line">
            <p className="text-gray-600">{text.aboutText}</p>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{text.disclaimer}</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-gray-800">{text.disclaimerText}</p>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">{text.contact}</h2>
          <div className="card">
            <p className="text-gray-600 mb-4">{text.contactText}</p>
            <a
              href="mailto:info@paklegal.pk"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'urdu'
                ? 'ای میل بھیجیں'
                : language === 'roman-urdu'
                  ? 'Email Bhejen'
                  : 'Send Email'}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
