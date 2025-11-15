'use client';

import { useState } from 'react';
import { Plus, Trash2, Circle, Square, Waves, Sparkles } from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { BackgroundElement } from '@/types';
import { generateId } from '@/lib/utils';

export function BackgroundPanel() {
  const { carousel, currentSlideIndex, updateSlide } = useCarouselStore();
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  if (!carousel) return null;

  const currentSlide = carousel.slides[currentSlideIndex];
  if (!currentSlide) return null;

  const addBackgroundElement = (type: BackgroundElement['type']) => {
    const newElement: BackgroundElement = {
      id: generateId('bg'),
      type,
      x: Math.random() * 800,
      y: Math.random() * 1000,
      width: type === 'dots' ? 1080 : 400,
      height: type === 'dots' ? 1350 : 400,
      scale: 1,
      opacity: 0.1,
      blur: type === 'blob' ? 40 : 0,
      rotation: Math.random() * 360,
      color: carousel.template.colorScheme.primary,
    };

    updateSlide(currentSlide.id, {
      backgroundElements: [...currentSlide.backgroundElements, newElement],
    });
  };

  const updateElement = (id: string, updates: Partial<BackgroundElement>) => {
    updateSlide(currentSlide.id, {
      backgroundElements: currentSlide.backgroundElements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    });
  };

  const deleteElement = (id: string) => {
    updateSlide(currentSlide.id, {
      backgroundElements: currentSlide.backgroundElements.filter(
        (el) => el.id !== id
      ),
    });
    setSelectedElement(null);
  };

  const selected = currentSlide.backgroundElements.find(
    (el) => el.id === selectedElement
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Background Elements
          </h2>
          <p className="text-sm text-gray-600">
            Add and customize background shapes
          </p>
        </div>

        {/* Add Elements */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Add Element
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addBackgroundElement('blob')}
              className="p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-500 rounded-lg transition-all flex items-center gap-2"
            >
              <Circle className="w-4 h-4" />
              <span className="text-sm font-medium">Blob</span>
            </button>

            <button
              onClick={() => addBackgroundElement('geometric')}
              className="p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-500 rounded-lg transition-all flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              <span className="text-sm font-medium">Shape</span>
            </button>

            <button
              onClick={() => addBackgroundElement('waves')}
              className="p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-500 rounded-lg transition-all flex items-center gap-2"
            >
              <Waves className="w-4 h-4" />
              <span className="text-sm font-medium">Waves</span>
            </button>

            <button
              onClick={() => addBackgroundElement('dots')}
              className="p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-500 rounded-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Dots</span>
            </button>

            <button
              onClick={() => addBackgroundElement('gradient')}
              className="col-span-2 p-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Gradient</span>
            </button>
          </div>
        </div>

        {/* Elements List */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Elements ({currentSlide.backgroundElements.length})
          </p>
          <div className="space-y-2">
            {currentSlide.backgroundElements.map((element) => (
              <button
                key={element.id}
                onClick={() => setSelectedElement(element.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedElement === element.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: element.color }}
                    />
                    <span className="text-sm font-medium capitalize">
                      {element.type}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(element.id);
                    }}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </button>
            ))}

            {currentSlide.backgroundElements.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No background elements yet
              </div>
            )}
          </div>
        </div>

        {/* Element Controls */}
        {selected && (
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Edit Element
            </h3>

            {/* Color */}
            {selected.type !== 'gradient' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="color"
                  value={selected.color}
                  onChange={(e) =>
                    updateElement(selected.id, { color: e.target.value })
                  }
                  className="w-full h-10 rounded-lg border border-gray-300"
                />
              </div>
            )}

            {/* Opacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opacity: {Math.round(selected.opacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={selected.opacity * 100}
                onChange={(e) =>
                  updateElement(selected.id, {
                    opacity: parseInt(e.target.value) / 100,
                  })
                }
                className="w-full"
              />
            </div>

            {/* Blur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blur: {selected.blur}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={selected.blur}
                onChange={(e) =>
                  updateElement(selected.id, { blur: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            {/* Rotation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rotation: {selected.rotation}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={selected.rotation}
                onChange={(e) =>
                  updateElement(selected.id, {
                    rotation: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            {/* Scale */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scale: {selected.scale.toFixed(1)}x
              </label>
              <input
                type="range"
                min="50"
                max="200"
                value={selected.scale * 100}
                onChange={(e) =>
                  updateElement(selected.id, {
                    scale: parseInt(e.target.value) / 100,
                  })
                }
                className="w-full"
              />
            </div>

            {/* Position */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  X: {Math.round(selected.x)}
                </label>
                <input
                  type="number"
                  value={Math.round(selected.x)}
                  onChange={(e) =>
                    updateElement(selected.id, { x: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Y: {Math.round(selected.y)}
                </label>
                <input
                  type="number"
                  value={Math.round(selected.y)}
                  onChange={(e) =>
                    updateElement(selected.id, { y: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
