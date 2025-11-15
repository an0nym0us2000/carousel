'use client';

import { useState } from 'react';
import { X, Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { IconElement } from '@/types';
import { generateId } from '@/lib/utils';

interface IconLibraryProps {
  onClose: () => void;
}

// Popular icons for carousel design
const popularIcons = [
  'Heart',
  'Star',
  'Check',
  'X',
  'ArrowRight',
  'ArrowLeft',
  'ChevronRight',
  'ChevronLeft',
  'TrendingUp',
  'TrendingDown',
  'Target',
  'Award',
  'Zap',
  'Sparkles',
  'Users',
  'User',
  'Mail',
  'Phone',
  'MapPin',
  'Calendar',
  'Clock',
  'DollarSign',
  'ShoppingCart',
  'Package',
  'Truck',
  'Home',
  'Building',
  'Briefcase',
  'Laptop',
  'Smartphone',
  'MessageCircle',
  'Send',
  'Share2',
  'ThumbsUp',
  'Eye',
  'BarChart',
  'PieChart',
  'TrendingUp',
  'Rocket',
  'Lightbulb',
  'Shield',
  'Lock',
  'Key',
];

export function IconLibrary({ onClose }: IconLibraryProps) {
  const { carousel, currentSlideIndex, updateSlide } = useCarouselStore();
  const [search, setSearch] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  const filteredIcons = popularIcons.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const addIconToCanvas = (iconName: string) => {
    if (!carousel) return;

    const currentSlide = carousel.slides[currentSlideIndex];
    if (!currentSlide) return;

    const IconComponent = Icons[iconName as keyof typeof Icons] as any;
    if (!IconComponent) return;

    const newIcon: IconElement = {
      id: generateId('icon'),
      name: iconName,
      svg: iconName, // Store icon name, render using lucide-react
      x: 540, // Center
      y: 675,
      size: 64,
      color: selectedColor,
      rotation: 0,
      opacity: 1,
      locked: false,
    };

    updateSlide(currentSlide.id, {
      icons: [...currentSlide.icons, newIcon],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Icon Library</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Color Picker */}
          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Icon Color:
            </label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="h-10 w-20 rounded-lg border border-gray-300"
            />
            <div className="flex gap-2">
              {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#000000'].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-lg border-2 ${
                      selectedColor === color
                        ? 'border-gray-900'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-6 gap-4">
            {filteredIcons.map((iconName) => {
              const IconComponent = Icons[iconName as keyof typeof Icons] as any;
              if (!IconComponent) return null;

              return (
                <button
                  key={iconName}
                  onClick={() => addIconToCanvas(iconName)}
                  className="p-4 bg-gray-50 hover:bg-primary-50 rounded-lg border-2 border-transparent hover:border-primary-500 transition-all flex flex-col items-center gap-2 group"
                  title={iconName}
                >
                  <IconComponent
                    className="w-8 h-8"
                    style={{ color: selectedColor }}
                  />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 truncate w-full text-center">
                    {iconName}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No icons found matching "{search}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center text-sm text-gray-600">
          Click any icon to add it to your canvas
        </div>
      </div>
    </div>
  );
}
