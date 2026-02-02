// components/ChatInterface.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import Disclaimer from './Disclaimer';
import { Language, LegalTopic, ChatMessage } from '@/types';
import { getDefaultQuestions } from '@/lib/prompts';

interface ChatInterfaceProps {
  topic: LegalTopic;
  language: Language;
}

export default function ChatInterface({ topic, language }: ChatInterfaceProps) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const defaultQuestions = getDefaultQuestions(topic);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError('براہ کرم ایک سوال درج کریں۔');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      language,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/legal-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          topic,
          language,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        language,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorText =
        language === 'urdu'
          ? 'معافی چاہتے ہیں، کوئی خرابی ہوئی۔ براہ کرم دوبارہ کوشش کریں۔'
          : language === 'roman-urdu'
            ? 'Maafi chahtay hain, koi khirabi hui. Brahe karam dobara koshish karen.'
            : 'Sorry, an error occurred. Please try again.';

      setError(errorText);
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = (defaultQuestion: string) => {
    setQuestion(defaultQuestion);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <Disclaimer language={language} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">سوال کریں</h2>
              <p className="text-gray-600 mb-6">
                {language === 'urdu'
                  ? 'اپنے قانونی سوالات پوچھیں یا نیچے کے سوالات میں سے ایک منتخب کریں۔'
                  : 'Ask your legal questions or select one from below.'}
              </p>
            </div>

            {/* Default Questions */}
            <div className="w-full max-w-md space-y-2">
              {Object.values(defaultQuestions).map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(q[language])}
                  className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <p className="font-medium text-blue-900">{q[language]}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl p-4 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs mt-2 opacity-70">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-4 rounded-lg rounded-bl-none">
              <LoadingSpinner />
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              language === 'urdu'
                ? 'اپنا سوال یہاں لکھیں...'
                : language === 'roman-urdu'
                  ? 'Apna sawaal yahan likhen...'
                  : 'Type your question here...'
            }
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          {language === 'urdu'
            ? 'یہ معلومات صرف تعلیمی ہے۔ قانونی سلاح مشورے کے لیے کسی وکیل سے رابطہ کریں۔'
            : 'Educational information only. Consult a lawyer for legal advice.'}
        </p>
      </div>
    </div>
  );
}
