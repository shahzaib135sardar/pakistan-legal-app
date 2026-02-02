// lib/prompts.ts

import { LegalTopic, Language, TranslationSet } from '@/types';
import { LEGAL_CONTEXTS, MAX_RESPONSE_LENGTH } from './constants';

export function generateSystemPrompt(
  topic: LegalTopic,
  language: Language
): string {
  const context = LEGAL_CONTEXTS[topic];
  
  const basePrompt = `You are a Pakistani legal information assistant providing factual information about ${topic}.
Your role is to:
1. Provide FACTUAL information only (NOT legal advice)
2. Cite relevant Pakistani laws and regulations
3. Keep responses under ${MAX_RESPONSE_LENGTH} words
4. Always include a disclaimer that this is not legal advice
5. Suggest consulting a qualified lawyer for specific cases

Legal Context:
${context}

IMPORTANT RULES:
- You MUST NOT give personalized legal advice
- You MUST NOT encourage specific legal actions
- You MUST clearly state you are providing information only
- You MUST mention consulting a lawyer for specific situations
- You MUST be neutral and factual`;

  const languageInstructions: Record<Language, string> = {
    urdu: `\n\nRespond in Urdu only. Use proper Urdu script. Format your response clearly with line breaks.`,
    'roman-urdu': `\n\nRespond in Roman Urdu (Urdu written in Latin script). Keep language simple and clear.`,
    english: `\n\nRespond in English. Use clear, simple English appropriate for general audience.`,
  };

  return basePrompt + languageInstructions[language];
}

export function generateUserPrompt(
  question: string,
  topic: LegalTopic,
  language: Language
): string {
  const disclaimerStart: Record<Language, string> = {
    urdu: 'براہ مہربانی یاد رکھیں: یہ قانونی مشورہ نہیں ہے۔',
    'roman-urdu': 'Brahe karam yaad rakhen: Yeh qanuni mashwara nahi hai.',
    english: 'Remember: This is not legal advice.',
  };

  return `Topic: ${topic}\nQuestion: ${question}\n\n${disclaimerStart[language]}`;
}

export function getDisclaimerText(language: Language): string {
  const disclaimers: Record<Language, string> = {
    urdu: `⚠️ اہم نوٹ: یہ معلومات صرف تعلیمی مقاصد کے لیے ہے۔ یہ قانونی مشورہ نہیں ہے۔ کسی بھی قانونی معاملے میں براہ کرم کسی قابل اعتماد وکیل سے رابطہ کریں۔`,
    'roman-urdu': `⚠️ Aham Note: Yeh malumat sirf taleemi maqsad ke liye hai. Yeh qanuni mashwara nahi hai. Kisi bhi qanuni mamla mein brahe karam kisi qaabil itimad wakeel se rabta karen.`,
    english: `⚠️ Important Notice: This information is for educational purposes only. This is not legal advice. Please consult with a qualified lawyer for any legal matter.`,
  };

  return disclaimers[language];
}

export function getDefaultQuestions(topic: LegalTopic): Record<string, TranslationSet> {
  const questions: Record<LegalTopic, Record<string, TranslationSet>> = {
    'tenant-disputes': {
      'deposit': {
        urdu: 'سیکیورٹی ڈپوزٹ کے کیا حقوق ہیں؟',
        romanUrdu: 'Security deposit ke kya huqooq hain?',
        english: 'What are tenant rights regarding security deposits?',
      },
      'eviction': {
        urdu: 'مالک مجھے بے دخل کر سکتا ہے؟',
        romanUrdu: 'Malik mujhe be-dakhal kar sakta hai?',
        english: 'Can my landlord evict me without notice?',
      },
      'repair': {
        urdu: 'مالک مرمت کی ذمہ داری کی ہے؟',
        romanUrdu: 'Malik marmamat ki zimmedari ki hai?',
        english: 'Is the landlord responsible for repairs?',
      },
    },
    'salary-issues': {
      'minimum': {
        urdu: 'پاکستان میں کم سے کم تنخواہ کیا ہے؟',
        romanUrdu: 'Pakistan mein kam se kam tankhwah kya hai?',
        english: 'What is the minimum wage in Pakistan?',
      },
      'overtime': {
        urdu: 'اوور ٹائم کی تنخواہ کیسے شمار ہوتی ہے؟',
        romanUrdu: 'Overtime ki tankhwah kaise shumar hoti hai?',
        english: 'How is overtime pay calculated?',
      },
      'termination': {
        urdu: 'غلط طریقے سے ملازمت سے نکالے جانے پر کیا کریں؟',
        romanUrdu: 'Ghalat tarike se mulazmati se nikale jane par kya karen?',
        english: 'What can I do if wrongfully terminated?',
      },
    },
    'fir-process': {
      'who-can-file': {
        urdu: 'ایف آئی آر کون درج کروا سکتا ہے؟',
        romanUrdu: 'FIR kaun darj krwa sakta hai?',
        english: 'Who can file an FIR?',
      },
      'where': {
        urdu: 'ایف آئی آر کہاں درج کی جاتی ہے؟',
        romanUrdu: 'FIR kahan darj ki jati hai?',
        english: 'Where is an FIR registered?',
      },
      'charges': {
        urdu: 'جھوٹی ایف آئی آر درج کرانے کا کیا نتیجہ ہے؟',
        romanUrdu: 'Jhooti FIR darj karane ka kya natija hai?',
        english: 'What are consequences of filing a false FIR?',
      },
    },
    'loans': {
      'interest': {
        urdu: 'سود کی شرح کے کیا حدود ہیں؟',
        romanUrdu: 'Sood ki shrah ke kya hadood hain?',
        english: 'What are the interest rate limits?',
      },
      'default': {
        urdu: 'قرض میں ڈیفالٹ کرنے کے کیا نتائج ہیں؟',
        romanUrdu: 'Qarz mein default karne ke kya nataij hain?',
        english: 'What happens if I default on a loan?',
      },
      'collateral': {
        urdu: 'ضمانت کے قانون کیا ہیں؟',
        romanUrdu: 'Zaman ke qanoon kya hain?',
        english: 'What are collateral laws?',
      },
    },
    'inheritance': {
      'heirs': {
        urdu: 'قانونی وارثین کون ہوتے ہیں؟',
        romanUrdu: 'Qanuni waristhin kaun hote hain?',
        english: 'Who are the legal heirs?',
      },
      'will': {
        urdu: 'وصیت بنانے کے لیے کیا شرائط ہیں؟',
        romanUrdu: 'Wasiyt banana ke liye kya sharait hain?',
        english: 'What are requirements for making a will?',
      },
      'share': {
        urdu: 'ملکیت کی تقسیم کیسے ہوتی ہے؟',
        romanUrdu: 'Milkiyat ki tafseem kaise hoti hai?',
        english: 'How is property divided among heirs?',
      },
    },
  };

  return questions[topic];
}
