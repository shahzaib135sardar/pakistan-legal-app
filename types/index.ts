// types/index.ts

export type Language = 'urdu' | 'roman-urdu' | 'english';

export type LegalTopic = 
  | 'tenant-disputes' 
  | 'salary-issues' 
  | 'fir-process' 
  | 'loans' 
  | 'inheritance';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: Language;
  timestamp: Date;
}

export interface AIResponse {
  content: string;
  source: 'huggingface' | 'openai';
  tokensUsed: number;
  language: Language;
}

export interface LegalQuestion {
  question: string;
  topic: LegalTopic;
  language: Language;
}

export interface APIRequest {
  question: string;
  topic: LegalTopic;
  language: Language;
  conversationHistory?: ChatMessage[];
}

export interface APIResponse {
  success: boolean;
  answer: string;
  source: 'huggingface' | 'openai';
  error?: string;
  language: Language;
}

export interface TranslationSet {
  urdu: string;
  romanUrdu: string;
  english: string;
}

export interface LegalContext {
  topic: LegalTopic;
  systemPrompt: string;
  context: string;
  disclaimerText: TranslationSet;
}
