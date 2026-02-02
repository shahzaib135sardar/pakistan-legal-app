// components/Disclaimer.tsx

'use client';

import { AlertCircle } from 'lucide-react';
import { Language } from '@/types';

interface DisclaimerProps {
  language: Language;
}

const disclaimerText = {
  urdu: {
    title: '⚠️ اہم نوٹ',
    text: 'یہ معلومات صرف تعلیمی مقاصد کے لیے ہے۔ یہ قانونی مشورہ (Legal Advice) نہیں ہے۔ کسی بھی قانونی معاملے میں براہ کرم کسی قابل اعتماد اور قابل لائسنس وکیل سے رابطہ کریں۔ ہم کسی بھی نقصان کی ذمہ داری نہیں لیتے۔',
  },
  'roman-urdu': {
    title: '⚠️ Aham Note',
    text: 'Yeh malumat sirf taleemi maqsad ke liye hai. Yeh qanuni mashwara nahi hai. Kisi bhi qanuni mamla mein brahe karam kisi qaabil itimad aur qaabil-e-license wakeel se rabta karen. Ham kisi bhi naqsan ki zimmedari nahi lete.',
  },
  english: {
    title: '⚠️ Important Notice',
    text: 'This information is for educational purposes only. This is not legal advice. Please consult with a qualified and licensed lawyer for any legal matter. We are not responsible for any damages.',
  },
};

export default function Disclaimer({ language }: DisclaimerProps) {
  const text = disclaimerText[language];

  return (
    <div className="disclaimer" role="alert">
      <div className="flex gap-3">
        <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-2">{text.title}</strong>
          <p className="text-sm">{text.text}</p>
        </div>
      </div>
    </div>
  );
}
