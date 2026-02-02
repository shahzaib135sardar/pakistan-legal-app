// app/api/legal-qa/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateLegalAnswer, validateQuestion } from '@/lib/ai-service';
import { getDisclaimerText } from '@/lib/prompts';
import { APIRequest, APIResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: APIRequest = await request.json();

    // Validate input
    const { question, topic, language } = body;

    if (!question || !topic || !language) {
      return NextResponse.json(
        {
          success: false,
          answer: 'براہ کرم تمام معلومات فراہم کریں۔',
          error: 'Missing required fields',
        } as APIResponse,
        { status: 400 }
      );
    }

    // Validate question content
    const validation = validateQuestion(question);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          answer: validation.error || 'Invalid question',
          error: validation.error,
        } as APIResponse,
        { status: 400 }
      );
    }

    // Validate topic
    const validTopics = ['tenant-disputes', 'salary-issues', 'fir-process', 'loans', 'inheritance'];
    if (!validTopics.includes(topic)) {
      return NextResponse.json(
        {
          success: false,
          answer: 'غلط موضوع منتخب کیا گیا۔',
          error: `Invalid topic: ${topic}`,
        } as APIResponse,
        { status: 400 }
      );
    }

    // Validate language
    const validLanguages = ['urdu', 'roman-urdu', 'english'];
    if (!validLanguages.includes(language)) {
      return NextResponse.json(
        {
          success: false,
          answer: 'غلط زبان منتخب کی گئی۔',
          error: `Invalid language: ${language}`,
        } as APIResponse,
        { status: 400 }
      );
    }

    console.log(`[API] Processing: ${question.substring(0, 50)}... | Topic: ${topic} | Lang: ${language}`);

    // Generate answer using AI service
    const aiResponse = await generateLegalAnswer({
      question: question.trim(),
      topic: topic as any,
      language: language as any,
    });

    // Add disclaimer to answer
    const disclaimer = getDisclaimerText(language as any);
    const finalAnswer = `${aiResponse.answer}\n\n${disclaimer}`;

    return NextResponse.json(
      {
        success: aiResponse.success,
        answer: finalAnswer,
        source: aiResponse.source,
        language: aiResponse.language,
      } as APIResponse,
      { status: aiResponse.success ? 200 : 500 }
    );
  } catch (error) {
    console.error('[API Error]', error);

    return NextResponse.json(
      {
        success: false,
        answer: 'معافی چاہتے ہیں، کوئی خرابی ہوئی۔ براہ کرم دوبارہ کوشش کریں۔',
        error: String(error),
      } as APIResponse,
      { status: 500 }
    );
  }
}

// Add CORS headers
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
