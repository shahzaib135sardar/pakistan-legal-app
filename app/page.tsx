'use client';

import { useState, useEffect } from 'react';
import { Scale, Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

type Language = 'urdu' | 'roman-urdu' | 'english';

// Hero banner images - Pakistani infrastructure
const heroBannerImages = [
  '/images/pakistan-1.jpg',
  '/images/pakistan-2.jpg', 
  '/images/pakistan-3.jpg',
  '/images/pakistan-4.jpg',
  '/images/pakistan-5.jpg',
];

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('english');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Auto-rotate hero banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getText = (key: string): string => {
    const texts: { [key: string]: { urdu: string; 'roman-urdu': string; english: string } } = {
      appName: { urdu: 'قانون فورم', 'roman-urdu': 'Qanoon Forum', english: 'Law Forum' },
      home: { urdu: 'ہوم', 'roman-urdu': 'Home', english: 'Home' },
      services: { urdu: 'خدمات', 'roman-urdu': 'Khidmat', english: 'Services' },
      lawyers: { urdu: 'وکیلوں کو تلاش کریں', 'roman-urdu': 'Wakelon Ko Taas Karen', english: 'Find Lawyers' },
      about: { urdu: 'ہمارے بارے میں', 'roman-urdu': 'Hamre Bare Main', english: 'About' },
      contact: { urdu: 'رابطہ', 'roman-urdu': 'Rabta', english: 'Contact' },
      getStarted: { urdu: 'شروع کریں', 'roman-urdu': 'Shuru Karen', english: 'Get Started' },
      heroTitle: { urdu: 'قانونی معلومات و وکیل کی تلاش', 'roman-urdu': 'Qanooni Maalumat wa Wakeel Ki Taas', english: 'Legal Information & Lawyer Finder' },
      heroSubtitle: { urdu: 'پاکستان میں اپنے قانونی معاملات کے لیے معتبر وکیلوں سے رابطہ کریں', 'roman-urdu': 'Pakistan Main Apne Qanooni Maamlat Ke Liye Muktebar Wakelon Se Rabta Karen', english: 'Connect with trusted lawyers for your legal matters in Pakistan' },
      register: { urdu: 'رجسٹر کریں', 'roman-urdu': 'Register Karen', english: 'Register' },
      login: { urdu: 'لاگ ان', 'roman-urdu': 'Log In', english: 'Log In' },
    };
    return texts[key]?.[language] || key;
  };

  const isUrdu = language === 'urdu';

  return (
    <div className={`${isUrdu ? 'rtl' : 'ltr'}`}>
      {/* NAVIGATION BAR - Fixed Top */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-lg border-b border-gray-100' 
            : 'bg-white bg-opacity-98'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-md">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-700">{getText('appName')}</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#home" className="text-gray-700 font-medium hover:text-green-700 transition">
                {getText('home')}
              </a>
              <a href="#services" className="text-gray-700 font-medium hover:text-green-700 transition">
                {getText('services')}
              </a>
              <a href="#lawyers" className="text-gray-700 font-medium hover:text-green-700 transition">
                {getText('lawyers')}
              </a>
              <a href="#about" className="text-gray-700 font-medium hover:text-green-700 transition">
                {getText('about')}
              </a>
              <a href="#contact" className="text-gray-700 font-medium hover:text-green-700 transition">
                {getText('contact')}
              </a>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="hidden sm:flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
                {(['english', 'roman-urdu', 'urdu'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                      language === lang
                        ? 'bg-green-700 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {lang === 'urdu' ? 'اردو' : lang === 'roman-urdu' ? 'اردو' : 'EN'}
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <button className="hidden sm:block bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-800 transition shadow-md">
                {getText('getStarted')}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-gray-700 p-2"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
              <a href="#home" className="block text-gray-700 font-medium hover:text-green-700 transition py-2">
                {getText('home')}
              </a>
              <a href="#services" className="block text-gray-700 font-medium hover:text-green-700 transition py-2">
                {getText('services')}
              </a>
              <a href="#lawyers" className="block text-gray-700 font-medium hover:text-green-700 transition py-2">
                {getText('lawyers')}
              </a>
              <a href="#about" className="block text-gray-700 font-medium hover:text-green-700 transition py-2">
                {getText('about')}
              </a>
              <a href="#contact" className="block text-gray-700 font-medium hover:text-green-700 transition py-2">
                {getText('contact')}
              </a>
              <button className="w-full bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-800 transition mt-2">
                {getText('getStarted')}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION - Full Screen with Animated Background */}
      <section id="home" className="relative w-full h-screen mt-20 overflow-hidden bg-gray-900">
        {/* Background Images with Fade Animation */}
        <div className="absolute inset-0">
          {/* Fallback gradient while images load */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-green-900 to-green-800" />
          
          {/* Image layers - would display Pakistani infrastructure photos */}
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: ['#1F2937', '#065F46', '#047857', '#059669', '#10B981'][index],
              }}
            >
              {/* Note: In production, replace with actual image URL */}
              {/* <img src={heroBannerImages[index]} alt="" className="w-full h-full object-cover" /> */}
            </div>
          ))}

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6 z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-xl animate-fade-in">
              {getText('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl drop-shadow-lg font-light max-w-3xl mx-auto animate-fade-in animation-delay-200">
              {getText('heroSubtitle')}
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-6 animate-fade-in animation-delay-400">
              <button className="bg-green-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-green-800 transition transform hover:scale-105 shadow-lg">
                {getText('getStarted')}
              </button>
              <button className="bg-white text-green-700 px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg">
                {getText('login')}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white w-10'
                  : 'bg-white bg-opacity-50 w-3 hover:bg-opacity-75'
              }`}
              aria-label={`Banner ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20 text-white">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {getText('services')}
            </h2>
            <div className="w-24 h-1 bg-green-700 mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'کرائے دار کے تنازعات', emoji: '🏠', desc: 'Tenant & Property Disputes' },
              { title: 'تنخواہ اور ملازمت', emoji: '💼', desc: 'Employment & Labor Rights' },
              { title: 'مقدمہ درج کرنا', emoji: '⚖️', desc: 'FIR Filing & Criminal Law' },
              { title: 'قرضے اور کریڈٹ', emoji: '💰', desc: 'Loans & Financial Issues' },
              { title: 'وراثت اور ملکیت', emoji: '📜', desc: 'Inheritance & Property' },
              { title: 'کاروبار اور ٹیکس', emoji: '📊', desc: 'Business & Tax Law' },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:border-green-200 transition transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-base">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAWYERS SECTION */}
      <section id="lawyers" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {getText('lawyers')}
            </h2>
            <div className="w-24 h-1 bg-green-700 mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ahmed Khan', spec: 'Property & Tenant Law', rating: '4.8' },
              { name: 'Fatima Ali', spec: 'Criminal & FIR Law', rating: '4.9' },
              { name: 'Muhammad Hassan', spec: 'Labor & Employment', rating: '4.7' },
            ].map((lawyer, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {lawyer.name[0]}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {lawyer.name}
                </h3>
                <p className="text-green-700 font-semibold text-center mb-4">
                  {lawyer.spec}
                </p>
                <div className="text-center">
                  <span className="text-xl text-yellow-500 font-bold">⭐ {lawyer.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {getText('about')}
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {language === 'urdu'
                  ? 'قانون فورم ایک جدید منصہ ہے جو پاکستانی شہری اور معتبر وکیلوں کو آپس میں جوڑتا ہے۔ ہم قانونی معاملات میں بروقت اور مؤثر مدد فراہم کرتے ہیں۔'
                  : language === 'roman-urdu'
                  ? 'Qanoon Forum aik jadeeda mansba hai jo Pakistani shahri aur muktebar wakelon ko aapas mein jodta hai.'
                  : 'Law Forum is a modern platform that connects Pakistani citizens with trusted lawyers. We provide timely and effective legal assistance.'}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {language === 'urdu'
                  ? 'ہمارا مقصد ہر شہری کو بہتر قانونی خدمات تک رسائی فراہم کرنا ہے۔'
                  : 'Our mission is to provide every citizen access to quality legal services.'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '500+', label: 'وکیلوں (Lawyers)' },
                { number: '10K+', label: 'خوش موکلوں (Clients)' },
                { number: '5+', label: 'شہروں (Cities)' },
                { number: '95%', label: 'اطمینان (Satisfaction)' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                  <h3 className="text-4xl font-bold text-green-700 mb-2">{stat.number}</h3>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {getText('contact')}
            </h2>
            <div className="w-24 h-1 bg-green-700 mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <Mail className="w-12 h-12 text-green-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'urdu' ? 'ای میل' : 'Email'}
              </h3>
              <p className="text-gray-700 font-medium">info@qanoonforum.pk</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <Phone className="w-12 h-12 text-green-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'urdu' ? 'فون' : 'Phone'}
              </h3>
              <p className="text-gray-700 font-medium">+92-21-111-0000</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <MapPin className="w-12 h-12 text-green-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'urdu' ? 'مقام' : 'Location'}
              </h3>
              <p className="text-gray-700 font-medium">Karachi, Pakistan</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{getText('appName')}</h3>
              <p className="text-gray-400">
                {language === 'urdu'
                  ? 'پاکستانی شہری کے لیے قانونی معلومات'
                  : 'Legal information for Pakistani citizens'}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#lawyers" className="hover:text-white transition">Lawyers</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400">
              {language === 'urdu'
                ? '© 2024 قانون فورم۔ تمام حقوق محفوظ ہیں۔ یہ صرف تعلیمی معلومات فراہم کرتا ہے۔'
                : '© 2024 Law Forum. All rights reserved. Educational platform only, not legal advice.'}
            </p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
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

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
