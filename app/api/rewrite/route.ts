import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type RewriteMode = 'shorter' | 'longer' | 'simple' | 'punchy' | 'clearer' | 'professional';

export async function POST(request: NextRequest) {
  try {
    const { text, mode }: { text: string; mode: RewriteMode } = await request.json();

    const prompt = getRewritePrompt(mode, text);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a professional copywriter specializing in LinkedIn content. Rewrite the given text according to the specified mode. Return only the rewritten text, no explanations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const rewrittenText = completion.choices[0].message.content?.trim();

    if (!rewrittenText) {
      throw new Error('No response from AI');
    }

    return NextResponse.json({ text: rewrittenText });
  } catch (error) {
    console.error('Error rewriting text:', error);
    return NextResponse.json(
      { error: 'Failed to rewrite text' },
      { status: 500 }
    );
  }
}

function getRewritePrompt(mode: RewriteMode, text: string): string {
  const prompts: Record<RewriteMode, string> = {
    shorter: `Make this text more concise while keeping the key message:\n\n${text}`,
    longer: `Expand this text with more details and context:\n\n${text}`,
    simple: `Simplify this text to make it easier to understand:\n\n${text}`,
    punchy: `Make this text more punchy and impactful:\n\n${text}`,
    clearer: `Rewrite this text to be clearer and more direct:\n\n${text}`,
    professional: `Make this text more professional and polished:\n\n${text}`,
  };

  return prompts[mode];
}
