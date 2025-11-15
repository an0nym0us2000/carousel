'use client';

import { useState } from 'react';
import { templates } from '@/lib/templates';
import { Template } from '@/types';

const categories = [
  { id: 'all', label: 'All Templates' },
  { id: 'aiCarousels', label: 'AI Carousels Style' },
  { id: 'contentDrips', label: 'Content Drips Style' },
  { id: 'carouselMaker', label: 'Carousel Maker Style' },
  { id: 'postNitro', label: 'Post Nitro Style' },
] as const;

export function TemplatePreview() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTemplates =
    activeCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect
            <br />
            <span className="gradient-text">Template</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            12 professionally designed templates inspired by top carousel creators
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
      {/* Preview */}
      <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <div
          className="absolute inset-0 p-8 flex flex-col justify-between"
          style={{
            background: template.colorScheme.background,
            color: template.colorScheme.text,
          }}
        >
          {/* Header */}
          <div>
            <div
              className="w-12 h-12 rounded-lg mb-4"
              style={{ background: template.colorScheme.primary }}
            />
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: template.fontPairing.heading }}
            >
              Sample Title
            </h3>
            <p
              className="text-sm opacity-70"
              style={{ fontFamily: template.fontPairing.body }}
            >
              This is how your carousel will look with this template style.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div
              className={`w-8 h-8 rounded-${
                template.counterStyle === 'circle' ? 'full' : 'lg'
              } flex items-center justify-center text-sm font-bold`}
              style={{
                background: template.colorScheme.primary,
                color: template.colorScheme.background,
              }}
            >
              1
            </div>
          </div>

          {/* Background Pattern Preview */}
          {template.backgroundPattern.elements.map((element) => (
            <div
              key={element.id}
              className="absolute rounded-full blur-2xl"
              style={{
                width: element.width / 3,
                height: element.height / 3,
                top: element.y / 3,
                left: element.x / 3,
                background: element.color || template.colorScheme.primary,
                opacity: element.opacity,
                transform: `rotate(${element.rotation}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              {template.name}
            </h4>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        </div>

        {/* Color Palette */}
        <div className="flex gap-2 mb-3">
          {[
            template.colorScheme.primary,
            template.colorScheme.secondary,
            template.colorScheme.accent,
          ].map((color, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-lg border-2 border-gray-200"
              style={{ background: color }}
            />
          ))}
        </div>

        {/* Font Info */}
        <div className="text-xs text-gray-500">
          <span className="font-medium">{template.fontPairing.heading}</span>
          {' / '}
          <span>{template.fontPairing.body}</span>
        </div>
      </div>
    </div>
  );
}
