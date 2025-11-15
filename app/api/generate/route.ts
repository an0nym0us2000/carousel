import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CarouselInput, AIGenerationResponse } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const input: CarouselInput = await request.json();

    const prompt = buildPrompt(input);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert LinkedIn carousel creator. Generate engaging, well-structured carousel content that captures attention and provides value. Return your response as valid JSON only, with no additional text or markdown formatting.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response from AI');
    }

    const result: AIGenerationResponse = JSON.parse(responseContent);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating carousel:', error);
    return NextResponse.json(
      { error: 'Failed to generate carousel' },
      { status: 500 }
    );
  }
}

function buildPrompt(input: CarouselInput): string {
  return `
Generate a LinkedIn carousel with the following specifications:

Topic: ${input.topic}
Description: ${input.description}
Target Audience: ${input.targetAudience}
Tone: ${input.tone}
Number of Slides: ${input.slideCount}
Add CTA Slide: ${input.addCTA}
Add Hook Slide: ${input.addHook}
Intro Style: ${input.introStyle}

Please generate:
1. A compelling title and description for each slide (${input.slideCount} slides total)
2. ${input.addHook ? 'A powerful hook for the first slide' : ''}
3. ${input.addCTA ? 'A clear call-to-action for the last slide' : ''}
4. Visual suggestions for each slide (describe what images, icons, or graphics would work well)
5. Recommended icons (list 5-10 icon names that would enhance the carousel)
6. Suggested background shapes (describe 3-5 abstract shapes or patterns)

The tone should be ${input.tone}. Make it engaging for ${input.targetAudience}.

Return ONLY a valid JSON object with this exact structure:
{
  "slides": [
    {
      "title": "Slide title here",
      "description": "Detailed slide content here",
      "visualSuggestions": ["suggestion 1", "suggestion 2"]
    }
  ],
  "ctaSuggestion": "Call to action text if applicable",
  "hookSuggestion": "Hook text if applicable",
  "recommendedIcons": ["icon1", "icon2", "icon3"],
  "backgroundShapes": ["shape description 1", "shape description 2"]
}
`;
}
