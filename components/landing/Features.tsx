'use client';

import {
  Sparkles,
  Palette,
  Download,
  Zap,
  Layers,
  RefreshCw,
  Save,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description:
      'Enter your topic and let AI create compelling carousel content with titles, descriptions, and visual suggestions.',
  },
  {
    icon: Palette,
    title: '12 Premium Templates',
    description:
      'Choose from professionally designed templates inspired by top carousel creators.',
  },
  {
    icon: Layers,
    title: 'Live Canvas Editor',
    description:
      'Edit everything in real-time with drag-and-drop, inline text editing, and full customization.',
  },
  {
    icon: RefreshCw,
    title: 'AI Rewrite Tools',
    description:
      'Instantly refine your text to be shorter, longer, punchier, or more professional.',
  },
  {
    icon: Users,
    title: 'Brand Kit',
    description:
      'Save your colors, fonts, and logo. Apply your brand consistently across all carousels.',
  },
  {
    icon: Download,
    title: 'Multiple Export Formats',
    description:
      'Export as PNG, JPG, PDF, or ZIP. Choose between 4:5 and 1:1 aspect ratios.',
  },
  {
    icon: Save,
    title: 'Auto-Save & Drafts',
    description:
      'Never lose your work. Auto-saves every 10 seconds with full version history.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized for performance. Handle up to 15 slides without any lag.',
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Create
            <br />
            <span className="gradient-text">Amazing Carousels</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make carousel creation effortless and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary-200"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
