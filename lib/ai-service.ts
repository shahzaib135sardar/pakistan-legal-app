// lib/ai-service.ts

import { generateSystemPrompt, generateUserPrompt } from './prompts';
import { APIRequest, APIResponse } from '@/types';
import { MAX_RESPONSE_LENGTH } from './constants';

const HF_API_KEY = process.env.NEXT_PUBLIC_HF_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Validate questions
export function validateQuestion(question: string): { valid: boolean; error?: string } {
  if (!question || question.trim().length === 0) {
    return { valid: false, error: 'Question cannot be empty' };
  }

  if (question.length > 1000) {
    return { valid: false, error: 'Question is too long' };
  }

  if (question.length < 3) {
    return { valid: false, error: 'Question is too short' };
  }

  return { valid: true };
}

// Generate legal answer with fallback
export async function generateLegalAnswer(
  request: APIRequest
): Promise<APIResponse> {
  try {
    if (!HF_API_KEY && !OPENAI_API_KEY) {
      console.error('[AI] No API keys configured');
      return {
        success: false,
        answer: language === 'urdu' 
          ? 'معافی چاہتے ہیں، سسٹم ابھی سیٹ اپ میں ہے۔'
          : language === 'roman-urdu'
          ? 'Maaafi chahte hain, sistem abhi setup mein hai.'
          : 'Sorry, system is not properly configured.',
        source: 'error',
        language: request.language,
      };
    }

    // Try Hugging Face first
    if (HF_API_KEY) {
      try {
        console.log('[AI] Trying Hugging Face...');
        const hfResponse = await queryHuggingFace(request);
        if (hfResponse.success) {
          return hfResponse;
        }
      } catch (hfError) {
        console.warn('[HF] Failed, trying OpenAI...');
      }
    }

    // Fallback to OpenAI
    if (OPENAI_API_KEY) {
      try {
        console.log('[AI] Trying OpenAI...');
        const openaiResponse = await queryOpenAI(request);
        return openaiResponse;
      } catch (openaiError) {
        console.error('[OpenAI] Failed:', openaiError);
      }
    }

    // If all fail
    return {
      success: false,
      answer: getErrorMessage(request.language),
      source: 'error',
      language: request.language,
    };
  } catch (error) {
    console.error('[AI Service Error]', error);
    return {
      success: false,
      answer: getErrorMessage(request.language),
      source: 'error',
      error: String(error),
      language: request.language,
    };
  }
}

// Query Hugging Face
async function queryHuggingFace(request: APIRequest): Promise<APIResponse> {
  try {
    const systemPrompt = generateSystemPrompt(request.topic, request.language);
    const userPrompt = generateUserPrompt(request.question, request.topic, request.language);

    const prompt = `${systemPrompt}\n\nUser: ${userPrompt}\n\nAssistant:`;

    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        headers: { Authorization: `Bearer ${HF_API_KEY}` },
        method: 'POST',
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: MAX_RESPONSE_LENGTH,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('[HF Response Error]', response.status, error);
      throw new Error(`HF API error: ${response.status}`);
    }

    const data = await response.json() as any[];
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid response from Hugging Face');
    }

    const generated = data[0]?.generated_text || '';
    
    if (!generated) {
      throw new Error('No generated text from Hugging Face');
    }

    // Extract assistant response
    const assistantIndex = generated.lastIndexOf('Assistant:');
    const answer = assistantIndex !== -1
      ? generated.substring(assistantIndex + 10).trim()
      : generated.trim();

    const cleanedAnswer = answer
      .split('\n\n')[0]
      .substring(0, MAX_RESPONSE_LENGTH)
      .trim();

    if (!cleanedAnswer) {
      throw new Error('Empty response after processing');
    }

    return {
      success: true,
      answer: cleanedAnswer,
      source: 'huggingface',
      language: request.language,
    };
  } catch (error) {
    console.error('[HF Error]', error);
    throw error;
  }
}

// Query OpenAI
async function queryOpenAI(request: APIRequest): Promise<APIResponse> {
  try {
    const systemPrompt = generateSystemPrompt(request.topic, request.language);
    const userPrompt = generateUserPrompt(request.question, request.topic, request.language);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
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
        temperature: 0.7,
        max_tokens: MAX_RESPONSE_LENGTH,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[OpenAI Response Error]', response.status, error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json() as any;
    
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      throw new Error('Invalid response structure from OpenAI');
    }

    const answer = data.choices[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error('Empty response from OpenAI');
    }

    return {
      success: true,
      answer: answer.substring(0, MAX_RESPONSE_LENGTH),
      source: 'openai',
      language: request.language,
    };
  } catch (error) {
    console.error('[OpenAI Error]', error);
    throw error;
  }
}

// Get error message in proper language
function getErrorMessage(language: string): string {
  switch (language) {
    case 'urdu':
      return 'معافی چاہتے ہیں، AI سروس فی الوقت دستیاب نہیں ہے۔ براہ کرم دوبارہ کوشش کریں۔';
    case 'roman-urdu':
      return 'Maaafi chahte hain, AI service abhi available nahi hai. Dobara koshish karen.';
    case 'english':
      return 'Sorry, the AI service is currently unavailable. Please try again later.';
    default:
      return 'Service temporarily unavailable. Please try again.';
  }
}
