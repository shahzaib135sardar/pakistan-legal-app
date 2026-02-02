// components/Header.tsx

'use client';

import Link from 'next/link';
import { Scale } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { Language } from '@/types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const navLinks = {
  urdu: {
    home: 'ہوم',
    topics: 'موضوعات',
    about: 'تعارف',
    contact: 'رابطہ',
  },
  'roman-urdu': {
    home: 'Home',
    topics: 'Mausuat',
    about: 'Tarafu',
    contact: 'Rabta',
  },
  english: {
    home: 'Home',
    topics: 'Topics',
    about: 'About',
    contact: 'Contact',
  },
};

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const links = navLinks[language];

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Scale className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">پاک قانون</h1>
              <p className="text-sm text-blue-200">Pakistan Legal Info</p>
            </div>
          </Link>

          {/* Language Toggle */}
          <LanguageToggle currentLanguage={language} onLanguageChange={onLanguageChange} />
        </div>

        {/* Navigation */}
        <nav className="mt-6 border-t border-blue-800 pt-4">
          <ul className="flex gap-6 flex-wrap">
            <li>
              <Link href="/" className="hover:text-blue-200 transition-colors">
                {links.home}
              </Link>
            </li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-blue-200 transition-colors">
                {links.topics}
              </span>
              <ul className="absolute left-0 mt-2 bg-blue-800 rounded-md shadow-lg hidden group-hover:block min-w-max">
                <li>
                  <Link
                    href="/tenant-disputes"
                    className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  >
                    کرائے دار اختلافات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/salary-issues"
                    className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  >
                    تنخواہ کے مسائل
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fir-process"
                    className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  >
                    ایف آئی آر کا عمل
                  </Link>
                </li>
                <li>
                  <Link
                    href="/loans"
                    className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  >
                    قرضے اور ادائیگی
                  </Link>
                </li>
                <li>
                  <Link
                    href="/inheritance"
                    className="block px-4 py-2 hover:bg-blue-700 transition-colors"
                  >
                    وراثت کے قانون
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-200 transition-colors">
                {links.about}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
