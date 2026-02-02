// lib/constants.ts

import { LegalTopic, TranslationSet } from '@/types';

export const LEGAL_TOPICS: Record<LegalTopic, TranslationSet> = {
  'tenant-disputes': {
    urdu: 'کرائے دار اختلافات',
    romanUrdu: 'Kiraye Dar Ikhtilafat',
    english: 'Tenant Disputes',
  },
  'salary-issues': {
    urdu: 'تنخواہ کے مسائل',
    romanUrdu: 'Tankhwah Ke Masail',
    english: 'Salary Issues',
  },
  'fir-process': {
    urdu: 'ایف آئی آر کا عمل',
    romanUrdu: 'FIR Ka Amal',
    english: 'FIR Process',
  },
  'loans': {
    urdu: 'قرضے اور ادائیگی',
    romanUrdu: 'Qarz aur Adai',
    english: 'Loans & Repayment',
  },
  'inheritance': {
    urdu: 'وراثت کے قانون',
    romanUrdu: 'Varsat Ke Qanoon',
    english: 'Inheritance Law',
  },
};

export const DISCLAIMER: TranslationSet = {
  urdu: 'یہ معلومات صرف تعلیمی مقاصد کے لیے ہے۔ یہ قانونی مشورہ نہیں ہے۔ براہ کرم کسی قانونی معاملہ میں کسی قابل اعتماد وکیل سے رابطہ کریں۔',
  romanUrdu: 'Yeh malumat sirf taleemi maqsad ke liye hai. Yeh qanuni mashwara nahi hai. Brahe karam kisi qanuni mamla mein kisi qaabil itimad wakeel se rabta karen.',
  english: 'This information is for educational purposes only. This is not legal advice. Please consult with a qualified lawyer for any legal matter.',
};

export const MAX_RESPONSE_LENGTH = parseInt(process.env.MAX_RESPONSE_LENGTH || '500', 10);

export const HF_MODEL_ID = process.env.HF_MODEL_ID || 'mistral-7b-instruct';

export const LEGAL_CONTEXTS = {
  'tenant-disputes': `
    Pakistan has specific tenant protection laws under the Provincial Tenancy Laws. 
    Key areas: Security deposit regulations, eviction procedures, repair obligations, 
    rent increase limits, notice periods (usually 30 days for monthly tenancies).
  `,
  'salary-issues': `
    Pakistan's employment law is governed by the Employment Ordinance, 1968 and the 
    Workers' Compensation Act. Key areas: Minimum wage, overtime pay, benefits, gratuity, 
    wrongful termination, dispute resolution through labor courts.
  `,
  'fir-process': `
    FIR (First Information Report) is the formal registration of a crime with police in Pakistan.
    Governed by Pakistan Penal Code and Code of Criminal Procedure, 1898. 
    Key areas: Who can file, where to file, charges of false reporting, investigation stages, 
    bail procedures.
  `,
  'loans': `
    Loan regulations in Pakistan fall under the Dawood's Banking Law and the Protection 
    of Economic Interests Act. Key areas: Interest limits, defaulter's rights, recovery procedures,
    collateral law, secured vs unsecured loans, debt settlement options.
  `,
  'inheritance': `
    Islamic Law governs inheritance in Pakistan (with secular alternatives for minorities).
    Governed by the Succession Act, 1925 and Quran for Muslims. 
    Key areas: Legal heirs distribution, Will requirements, immovable property succession,
    dispute resolution, guardian and ward cases.
  `,
};

export const LANGUAGE_NAMES = {
  urdu: 'اردو',
  'roman-urdu': 'رومن اردو',
  english: 'English',
};
