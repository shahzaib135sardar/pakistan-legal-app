'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scale, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

type Language = 'urdu' | 'roman-urdu' | 'english';

interface LegalTopic {
  id: string;
  urdu: string;
  romanUrdu: string;
  english: string;
  description: {
    urdu: string;
    romanUrdu: string;
    english: string;
  };
  icon: React.ReactNode;
}

interface ProvinceBanner {
  image: string;
  province: string;
  capital: string;
  description: string;
}

const provinceBanners: ProvinceBanner[] = [
  {
    image: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
    province: 'Punjab',
    capital: 'Lahore',
    description: 'Grand Badshahi Mosque and Lahore Fort',
  },
  {
    image: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    province: 'Sindh',
    capital: 'Karachi',
    description: 'Mazar-e-Quaid and Port City',
  },
  {
    image: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    province: 'Khyber Pakhtunkhwa',
    capital: 'Peshawar',
    description: 'Historic Bazaar and Peshawar Museum',
  },
  {
    image: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    province: 'Balochistan',
    capital: 'Quetta',
    description: 'Gateway to Central Asia',
  },
  {
    image: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    province: 'Gilgit-Baltistan',
    capital: 'Gilgit',
    description: 'Majestic Northern Mountains',
  },
];

const legalTopics: LegalTopic[] = [
  {
    id: 'tenant-disputes',
    urdu: 'کرائے دار کے تنازعات',
    romanUrdu: 'Kiraye Daar ke Tanazaat',
    english: 'Tenant Disputes',
    description: {
      urdu: 'مالک اور کرائے دار کے درمیان تنازعات، سیکیورٹی ڈپوزٹ، اور بیدخلی کے قوانین کی تفصیلات۔',
      romanUrdu: 'Malik aur kiraye daar ke darmiyaan tanazaat, security deposit, aur bedkhali ke qanoon.',
      english: 'Understand tenant rights, landlord obligations, security deposits, and eviction procedures.'
    },
    icon: <Scale className="w-12 h-12" />,
  },
  {
    id: 'salary-issues',
    urdu: 'تنخواہ اور ملازمت کے مسائل',
    romanUrdu: 'Tankhwaah aur Mulazmat ke Masail',
    english: 'Employment & Salary Rights',
    description: {
      urdu: 'اجرت، اوور ٹائم، ملازمت کی شرائط، اور کارکنوں کے حقوق کی جانکاری۔',
      romanUrdu: 'Ajrat, overtime, mulazmat ki sharait, aur karkino ke haqooq ki jaankari.',
      english: 'Learn about wages, overtime compensation, employment contracts, and worker protections.'
    },
    icon: <Scale className="w-12 h-12" />,
  },
  {
    id: 'fir-process',
    urdu: 'مقدمہ درج کرنا (FIR)',
    romanUrdu: 'Muqaddama Darj Karna (FIR)',
    english: 'Filing an FIR',
    description: {
      urdu: 'FIR درج کرنے کا صحیح طریقہ، تحقیق کے اصول، اور آپ کے قانونی حقوق کی تفہیم۔',
      romanUrdu: 'FIR darj karne ka sahi tariqa, tahqeeq ke usool, aur apke qanooni haqooq.',
      english: 'Guide on filing First Information Report (FIR), investigation procedures, and legal rights.'
    },
    icon: <Scale className="w-12 h-12" />,
  },
  {
    id: 'loans',
    urdu: 'قرضے اور ادائیگی',
    romanUrdu: 'Qarz aur Adaigi',
    english: 'Loan & Credit Issues',
    description: {
      urdu: 'قرض کی شرائط، ڈیفالٹ سے بچاؤ، اور قرض دار کے حقوق کے بارے میں معلومات۔',
      romanUrdu: 'Qarz ki sharait, default se bachao, aur qarz daar ke haqooq ke bare mein maalumat.',
      english: 'Information about loan agreements, default prevention, and borrower protection rights.'
    },
    icon: <Scale className="w-12 h-12" />,
  },
  {
    id: 'inheritance',
    urdu: 'وراثت اور ملکیت کے قوانین',
    romanUrdu: 'Wiraasat aur Malkiyat ke Qanoon',
    english: 'Inheritance & Property Law',
    description: {
      urdu: 'وصیت، ملکیت کی تقسیم، جانشینی، اور وراثت کے معاملات میں رہنمائی۔',
      romanUrdu: 'Wasiyat, malkiyat ki taaqseem, jananshini, aur wiraasat ke maamlaat mein rahnumai.',
      english: 'Understanding wills, property distribution, succession laws, and inheritance matters.'
    },
    icon: <Scale className="w-12 h-12" />,
  },
];

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('urdu');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % provinceBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getTitle = () => {
    switch (language) {
      case 'urdu':
        return 'قانون فورم';
      case 'roman-urdu':
        return 'Qanoon Forum';
      case 'english':
        return 'Law Forum';
      default:
        return 'Law Forum';
    }
  };

  const getSubtitle = () => {
    switch (language) {
      case 'urdu':
        return 'پاکستانی شہری کے لیے آن لائن قانونی معلومات';
      case 'roman-urdu':
        return 'Pakistani Shahri ke Liye Online Qanooni Maalumat';
      case 'english':
        return 'Online Legal Information for Pakistani Citizens';
      default:
        return 'Online Legal Information for Pakistani Citizens';
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'urdu':
        return 'اپنے قانونی سوالات کے جوابات حاصل کریں۔ معتبر قانونی معلومات اور رہنمائی۔';
      case 'roman-urdu':
        return 'Apne qanooni suwalo ke jawabat hasil karen. Muktebar qanooni maalumat aur rahnumai.';
      case 'english':
        return 'Get answers to your legal questions. Trusted legal information and guidance.';
      default:
        return 'Get answers to your legal questions. Trusted legal information and guidance.';
    }
  };

  const getTopicsTitle = () => {
    switch (language) {
      case 'urdu':
        return 'قانونی موضوعات';
      case 'roman-urdu':
        return 'Qanooni Mausaat';
      case 'english':
        return 'Legal Topics';
      default:
        return 'Legal Topics';
    }
  };

  const getLearnMore = () => {
    switch (language) {
      case 'urdu':
        return 'مزید معلومات';
      case 'roman-urdu':
        return 'Mazeed Maalumat';
      case 'english':
        return 'Learn More';
      default:
        return 'Learn More';
    }
  };

  const isUrdu = language === 'urdu';
  const currentBanner = provinceBanners[currentBannerIndex];

  return (
    <div className={`min-h-screen ${isUrdu ? 'rtl' : 'ltr'} bg-white`}>
      {/* Top Bar - Green accent */}
      <div className="h-1 bg-gradient-to-r from-green-700 via-green-600 to-green-700"></div>

      {/* Header */}
      <header className="bg-white border-b-2 border-green-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Title */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-700">
                  {getTitle()}
                </h1>
                <p className="text-xs text-green-600 font-medium">
                  {language === 'urdu' ? 'قانونی معلومات کا منبع' : language === 'roman-urdu' ? 'Qanooni Maalumat ka Mansba' : 'Legal Information Source'}
                </p>
              </div>
            </Link>

            {/* Language Selector */}
            <div className="flex gap-1 bg-green-50 p-1 rounded-lg border border-green-200">
              <button
                onClick={() => setLanguage('urdu')}
                className={`px-3 py-1.5 rounded font-bold text-sm transition-all duration-300 ${
                  language === 'urdu'
                    ? 'bg-green-700 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-100'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => setLanguage('roman-urdu')}
                className={`px-3 py-1.5 rounded font-bold text-sm transition-all duration-300 ${
                  language === 'roman-urdu'
                    ? 'bg-green-700 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-100'
                }`}
              >
                Urdu
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={`px-3 py-1.5 rounded font-bold text-sm transition-all duration-300 ${
                  language === 'english'
                    ? 'bg-green-700 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-100'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        {provinceBanners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ background: banner.image }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {getTitle()}
              </h2>
              <p className="text-xl md:text-2xl mb-2 drop-shadow-lg font-semibold">
                {banner.province} - {banner.capital}
              </p>
              <p className="text-lg drop-shadow-lg max-w-2xl">
                {banner.description}
              </p>
            </div>
          </div>
        ))}

        {/* Banner Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {provinceBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentBannerIndex
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50 w-3 hover:bg-opacity-75'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
            {getTitle()}
          </h2>
          <p className="text-lg text-green-700 font-semibold mb-3">
            {getSubtitle()}
          </p>
          <p className={`text-gray-700 leading-relaxed max-w-2xl mx-auto ${isUrdu ? 'text-lg' : 'text-base'}`}>
            {getDescription()}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
              {getTopicsTitle()}
            </h2>
            <div className="w-16 h-1 bg-green-700 mx-auto rounded-full"></div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/${topic.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-700 h-full flex flex-col overflow-hidden">
                  {/* Card Header */}
                  <div className="bg-green-50 p-6 flex items-center justify-center">
                    <div className="text-green-700 group-hover:scale-110 transition-transform duration-300">
                      {topic.icon}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className={`font-bold text-green-900 mb-2 group-hover:text-green-700 transition-colors duration-300 ${isUrdu ? 'text-xl' : 'text-lg'}`}>
                      {language === 'urdu' ? topic.urdu : language === 'roman-urdu' ? topic.romanUrdu : topic.english}
                    </h3>
                    
                    {language !== 'urdu' && (
                      <p className={`text-sm font-semibold text-green-700 mb-3 ${isUrdu ? 'text-base' : ''}`}>
                        {language === 'roman-urdu' ? topic.romanUrdu : topic.english}
                      </p>
                    )}
                    
                    <p className={`text-gray-700 flex-1 ${isUrdu ? 'text-base leading-relaxed' : 'text-sm'} mb-4`}>
                      {language === 'urdu'
                        ? topic.description.urdu
                        : language === 'roman-urdu'
                        ? topic.description.romanUrdu
                        : topic.description.english}
                    </p>
                    
                    <div className="flex items-center gap-2 text-green-700 font-bold group-hover:text-green-900 transition-colors duration-300 mt-auto">
                      {getLearnMore()}
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-green-50 border-t-2 border-b-2 border-green-200 py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-700 text-white font-bold">
                ⚖️
              </div>
            </div>
            <div className={isUrdu ? 'text-right' : 'text-left'}>
              <h3 className="text-lg font-bold text-green-900 mb-2">
                {language === 'urdu' ? 'اہم اطلاع' : language === 'roman-urdu' ? 'Aham Itlah' : 'Important Notice'}
              </h3>
              <p className={`text-green-900 font-medium ${isUrdu ? 'text-base leading-relaxed' : 'text-sm'}`}>
                {language === 'urdu'
                  ? 'یہ معلومات صرف تعلیمی مقصد کے لیے ہے اور قانونی مشورہ نہیں ہے۔ اہم قانونی معاملات میں ہمیشہ معتبر وکیل یا قانون دان سے رجوع کریں۔'
                  : language === 'roman-urdu'
                  ? 'Ye maalumat sirf talimi muqsad ke liye hai aur qanooni mushwara nahi hai. Aham qanooni maamlaat mein hamesha muktebar wakeel ya qanoon daan se rujoo karen.'
                  : 'This information is for educational purposes only and is not legal advice. Always consult a qualified lawyer or legal professional for important legal matters.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-green-900 text-center mb-8">
            {language === 'urdu' ? 'ہمسے رابطہ کریں' : language === 'roman-urdu' ? 'Hamse Rabta Karen' : 'Get in Touch'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
              <Mail className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-green-900 mb-1">
                  {language === 'urdu' ? 'ای میل' : language === 'roman-urdu' ? 'Email' : 'Email'}
                </h4>
                <p className="text-green-700 font-medium text-sm">info@qanoonforum.pk</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
              <Phone className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-green-900 mb-1">
                  {language === 'urdu' ? 'فون' : language === 'roman-urdu' ? 'Phone' : 'Phone'}
                </h4>
                <p className="text-green-700 font-medium text-sm">+92-21-111-000-001</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
              <MapPin className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-green-900 mb-1">
                  {language === 'urdu' ? 'مقام' : language === 'roman-urdu' ? 'Location' : 'Location'}
                </h4>
                <p className="text-green-700 font-medium text-sm">Karachi, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            {/* About */}
            <div className={isUrdu ? 'text-right' : ''}>
              <h4 className="font-bold text-lg text-white mb-3">
                {language === 'urdu' ? 'قانون فورم کے بارے میں' : language === 'roman-urdu' ? 'Qanoon Forum ke Bare Mein' : 'About Law Forum'}
              </h4>
              <p className={`text-green-100 ${isUrdu ? 'text-base leading-relaxed' : 'text-sm'}`}>
                {language === 'urdu'
                  ? 'قانون فورم پاکستانی شہری کو آن لائن قانونی معلومات فراہم کرتا ہے۔ ہمارا مقصد عام لوگوں کو ان کے حقوق اور ذمہ داریوں سے آگاہ کرنا ہے۔'
                  : language === 'roman-urdu'
                  ? 'Qanoon Forum Pakistani shahri ko online qanooni maalumat farham karta hai. Hamara muqsad aam logo ko unke haqooq aur zimmedariyon se aagah karna hai.'
                  : 'Law Forum provides online legal information to Pakistani citizens. Our mission is to educate people about their rights and responsibilities.'}
              </p>
            </div>

            {/* Quick Links */}
            <div className={isUrdu ? 'text-right' : ''}>
              <h4 className="font-bold text-lg text-white mb-3">
                {language === 'urdu' ? 'اہم لنکس' : language === 'roman-urdu' ? 'Aham Links' : 'Quick Links'}
              </h4>
              <ul className="space-y-2 text-green-100">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'urdu' ? 'بارے میں' : language === 'roman-urdu' ? 'About' : 'About Us'}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'urdu' ? 'رہنمائی' : language === 'roman-urdu' ? 'Guidance' : 'Legal Guidance'}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'urdu' ? 'نجی پالیسی' : language === 'roman-urdu' ? 'Privacy' : 'Privacy Policy'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-green-700 pt-8">
            <p className="text-center text-green-100 text-sm">
              {language === 'urdu'
                ? '© 2024 قانون فورم۔ تمام حقوق محفوظ ہیں۔ یہ صرف تعلیمی معلومات فراہم کرتا ہے۔'
                : language === 'roman-urdu'
                ? '© 2024 Qanoon Forum. Tamam haqooq mehfooz hain. Ye sirf talimi maalumat farham karta hai.'
                : '© 2024 Law Forum. All rights reserved. This platform provides educational information only.'}
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
