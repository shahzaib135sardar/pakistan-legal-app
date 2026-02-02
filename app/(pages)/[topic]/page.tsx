// app/(pages)/[topic]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import { Language, LegalTopic } from '@/types';

const validTopics = ['tenant-disputes', 'salary-issues', 'fir-process', 'loans', 'inheritance'];

export default function TopicPage() {
  const params = useParams();
  const topic = params?.topic as string;
  const [language, setLanguage] = useState<Language>('urdu');
  const [isValidTopic, setIsValidTopic] = useState(true);

  useEffect(() => {
    setIsValidTopic(validTopics.includes(topic));
  }, [topic]);

  if (!isValidTopic) {
    return (
      <>
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">موضوع نہیں ملا</h1>
          <p className="text-gray-600 mb-8">یہ موضوع موجود نہیں ہے۔ براہ کرم ہوم پیج پر جائیں۔</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      <ChatInterface topic={topic as LegalTopic} language={language} />
    </>
  );
}
