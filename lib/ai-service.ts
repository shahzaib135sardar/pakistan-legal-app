// lib/ai-service.ts

import { HfInference } from '@huggingface/inference';
import { OpenAI } from 'openai';
import { generateSystemPrompt, generateUserPrompt } from './prompts';
import { APIRequest, APIResponse } from '@/types';
import { MAX_RESPONSE_LENGTH } from './constants';

const hf = new HfInference(process.env.NEXT_PUBLIC_HF_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface HFResponse {
  generated_text?: string;
  [key: string]: any;
}

export async function generateLegalAnswer(
  request: APIRequest
): Promise<APIResponse> {
  try {
    // Try Hugging Face first
    console.log(`[AI] Attempting Hugging Face for: ${request.question.substring(0, 50)}...`);
    
    const hfResponse = await queryHuggingFace(request);
    
    if (hfResponse.success) {
      return hfResponse;
    }

    console.log('[AI] Hugging Face failed, falling back to OpenAI');
    
    // Fallback to OpenAI
    const openaiResponse = await queryOpenAI(request);
    return openaiResponse;
  } catch (error) {
    console.error('[AI] Error in generateLegalAnswer:', error);
    return {
      success: false,
      answer: 'معافی چاہتے ہیں، کوئی تکنیکی خرابی ہوئی۔',
      source: 'huggingface',
      error: String(error),
      language: request.language,
    };
  }
}

async function queryHuggingFace(request: APIRequest): Promise<APIResponse> {
  try {
    const systemPrompt = generateSystemPrompt(request.topic, request.language);
    const userPrompt = generateUserPrompt(request.question, request.topic, request.language);

    // Use text generation pipeline
    const response = (await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.1',
      inputs: `${systemPrompt}\n\nUser: ${userPrompt}\n\nAssistant:`,
      parameters: {
        max_new_tokens: MAX_RESPONSE_LENGTH,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
      },
    })) as HFResponse;

    if (response?.generated_text) {
      // Extract only the assistant's response
      const fullText = response.generated_text;
      const assistantStart = fullText.lastIndexOf('Assistant:');
      const answer = assistantStart !== -1
        ? fullText.substring(assistantStart + 10).trim()
        : fullText.trim();

      const cleanedAnswer = answer
        .split('\n\n')[0] // Take only first paragraph
        .substring(0, MAX_RESPONSE_LENGTH)
        .trim();

      return {
        success: true,
        answer: cleanedAnswer || 'Unable to generate response',
        source: 'huggingface',
        language: request.language,
      };
    }

    throw new Error('Invalid response structure from Hugging Face');
  } catch (error) {
    console.error('[HF Error]', error);
    throw error;
  }
}

async function queryOpenAI(request: APIRequest): Promise<APIResponse> {
  try {
    const systemPrompt = generateSystemPrompt(request.topic, request.language);
    const userPrompt = generateUserPrompt(request.question, request.topic, request.language);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      max_tokens: MAX_RESPONSE_LENGTH,
      temperature: 0.7,
    });

    const answer = response.choices[0]?.message?.content || '';
    const cleanedAnswer = answer
      .substring(0, MAX_RESPONSE_LENGTH)
      .trim();

    return {
      success: true,
      answer: cleanedAnswer || 'Unable to generate response',
      source: 'openai',
      language: request.language,
    };
  } catch (error) {
    console.error('[OpenAI Error]', error);
    throw error;
  }
}

// Validate question before sending to AI
export function validateQuestion(question: string): {
  valid: boolean;
  error?: string;
} {
  if (!question || question.trim().length === 0) {
    return { valid: false, error: 'سوال خالی ہے۔' };
  }

  if (question.length > 1000) {
    return { valid: false, error: 'سوال بہت لمبا ہے۔ براہ کرم مختصر سوال پوچھیں۔' };
  }

  return { valid: true };
}

// Check if answer contains legal advice (red flags)
export function containsLegalAdvice(answer: string): boolean {
  const redFlags = [
    'you should',
    'you must',
    'i recommend',
    'i advise',
    'you need to',
    'the best option',
    'i suggest',
    'آپ کو چاہیے',
    'آپ لازمی',
    'میں سفارش',
    'میں مشورہ',
  ];

  return redFlags.some(flag => answer.toLowerCase().includes(flag));
}
