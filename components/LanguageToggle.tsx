// components/LanguageToggle.tsx

'use client';

import { Language } from '@/types';
import { LANGUAGE_NAMES } from '@/lib/constants';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageToggle({
  currentLanguage,
  onLanguageChange,
}: LanguageToggleProps) {
  const languages: Language[] = ['urdu', 'roman-urdu', 'english'];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-4 py-2 rounded-md font-medium transition-all ${
            currentLanguage === lang
              ? 'bg-blue-900 text-white'
              : 'bg-white text-blue-900 border border-blue-900 hover:bg-blue-50'
          }`}
          title={`Switch to ${LANGUAGE_NAMES[lang]}`}
        >
          {LANGUAGE_NAMES[lang]}
        </button>
      ))}
    </div>
  );
}
