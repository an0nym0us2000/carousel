'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { templates } from '@/lib/templates';
import { useCarouselStore } from '@/store/carouselStore';
import { CarouselInput, Tone, IntroStyle, Slide } from '@/types';
import { generateId, CANVAS_DIMENSIONS } from '@/lib/utils';

const tones: { value: Tone; label: string }[] = [
  { value: 'simple', label: 'Simple' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'expert', label: 'Expert' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'corporate', label: 'Corporate' },
];

const introStyles: { value: IntroStyle; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'emoji', label: 'Emoji' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'headshot', label: 'Headshot' },
];

interface InputPanelProps {
  onGenerate?: () => void;
}

export function InputPanel({ onGenerate }: InputPanelProps) {
  const { setCarousel, setIsGenerating, isGenerating } = useCarouselStore();
  const [input, setInput] = useState<CarouselInput>({
    topic: '',
    description: '',
    targetAudience: '',
    tone: 'friendly',
    slideCount: 8,
    templateId: templates[0].id,
    colorPalette: templates[0].colorScheme,
    typography: {
      heading: templates[0].fontPairing.heading,
      body: templates[0].fontPairing.body,
      size: { heading: 48, body: 24 },
    },
    introStyle: 'classic',
    addCTA: true,
    addHook: true,
  });

  const selectedTemplate = templates.find((t) => t.id === input.templateId) || templates[0];

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    setInput({
      ...input,
      templateId,
      colorPalette: template.colorScheme,
      typography: {
        heading: template.fontPairing.heading,
        body: template.fontPairing.body,
        size: { heading: 48, body: 24 },
      },
    });
  };

  const handleGenerate = async () => {
    if (!input.topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Failed to generate carousel');

      const aiResponse = await response.json();

      // Create slides from AI response
      const slides: Slide[] = aiResponse.slides.map((slideData: any, index: number) => ({
        id: generateId('slide'),
        order: index,
        title: slideData.title,
        description: slideData.description,
        visualSuggestions: slideData.visualSuggestions,
        backgroundElements: selectedTemplate.backgroundPattern.elements,
        textBlocks: [
          {
            id: generateId('text'),
            content: slideData.title,
            x: 60,
            y: 80,
            width: 960,
            height: 200,
            fontSize: input.typography.size.heading,
            fontFamily: input.typography.heading,
            color: input.colorPalette.text,
            fontWeight: 700,
            textAlign: 'left' as const,
            lineHeight: 1.2,
            locked: false,
            rotation: 0,
            opacity: 1,
          },
          {
            id: generateId('text'),
            content: slideData.description,
            x: 60,
            y: 320,
            width: 960,
            height: 800,
            fontSize: input.typography.size.body,
            fontFamily: input.typography.body,
            color: input.colorPalette.text,
            fontWeight: 400,
            textAlign: 'left' as const,
            lineHeight: 1.5,
            locked: false,
            rotation: 0,
            opacity: 0.9,
          },
        ],
        images: [],
        icons: [],
        showCounter: true,
        counterStyle: selectedTemplate.counterStyle,
      }));

      const carousel = {
        id: generateId('carousel'),
        title: input.topic,
        slides,
        template: selectedTemplate,
        canvasWidth: CANVAS_DIMENSIONS['4:5'].width,
        canvasHeight: CANVAS_DIMENSIONS['4:5'].height,
        aspectRatio: '4:5' as const,
      };

      setCarousel(carousel);
      onGenerate?.();
    } catch (error) {
      console.error('Error generating carousel:', error);
      alert('Failed to generate carousel. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Carousel Generator</h2>
        <p className="text-gray-600">Fill in the details to generate your carousel</p>
      </div>

      {/* Topic */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Topic *
        </label>
        <input
          type="text"
          value={input.topic}
          onChange={(e) => setInput({ ...input, topic: e.target.value })}
          placeholder="e.g., 10 Tips for Better Productivity"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Description
        </label>
        <textarea
          value={input.description}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
          placeholder="Provide additional context or key points to cover..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Audience
        </label>
        <input
          type="text"
          value={input.targetAudience}
          onChange={(e) => setInput({ ...input, targetAudience: e.target.value })}
          placeholder="e.g., Entrepreneurs, Designers, Developers"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Tone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
        <div className="grid grid-cols-2 gap-2">
          {tones.map((tone) => (
            <button
              key={tone.value}
              onClick={() => setInput({ ...input, tone: tone.value })}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                input.tone === tone.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slide Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Slides: {input.slideCount}
        </label>
        <input
          type="range"
          min="6"
          max="10"
          value={input.slideCount}
          onChange={(e) => setInput({ ...input, slideCount: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>6</span>
          <span>10</span>
        </div>
      </div>

      {/* Template Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Template
        </label>
        <select
          value={input.templateId}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Intro Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Intro Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {introStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => setInput({ ...input, introStyle: style.value })}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                input.introStyle === style.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Add Hook Slide</span>
          <input
            type="checkbox"
            checked={input.addHook}
            onChange={(e) => setInput({ ...input, addHook: e.target.checked })}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
        </label>

        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Add CTA Slide</span>
          <input
            type="checkbox"
            checked={input.addCTA}
            onChange={(e) => setInput({ ...input, addCTA: e.target.checked })}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !input.topic.trim()}
        className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Carousel
          </>
        )}
      </button>
    </div>
  );
}
