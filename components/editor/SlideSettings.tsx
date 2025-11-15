'use client';

import { useCarouselStore } from '@/store/carouselStore';
import { CounterStyle } from '@/types';

export function SlideSettings() {
  const { carousel, currentSlideIndex, updateSlide } = useCarouselStore();

  if (!carousel) return null;

  const currentSlide = carousel.slides[currentSlideIndex];
  if (!currentSlide) return null;

  const counterStyles: { value: CounterStyle; label: string }[] = [
    { value: 'circle', label: 'Circle' },
    { value: 'square', label: 'Square' },
    { value: 'number', label: 'Number' },
    { value: 'dot', label: 'Dot' },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Slide Settings
          </h2>
          <p className="text-sm text-gray-600">
            Customize this slide's appearance
          </p>
        </div>

        {/* Slide Counter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">
              Show Slide Counter
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={currentSlide.showCounter}
                onChange={(e) =>
                  updateSlide(currentSlide.id, { showCounter: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          {currentSlide.showCounter && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Counter Style
              </p>
              <div className="grid grid-cols-2 gap-2">
                {counterStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() =>
                      updateSlide(currentSlide.id, {
                        counterStyle: style.value,
                      })
                    }
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      currentSlide.counterStyle === style.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">
                  Preview
                </p>
                <div className="flex items-center gap-3">
                  {currentSlide.counterStyle === 'circle' && (
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{
                        backgroundColor: carousel.template.colorScheme.primary,
                      }}
                    >
                      {currentSlideIndex + 1}
                    </div>
                  )}
                  {currentSlide.counterStyle === 'square' && (
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{
                        backgroundColor: carousel.template.colorScheme.primary,
                      }}
                    >
                      {currentSlideIndex + 1}
                    </div>
                  )}
                  {currentSlide.counterStyle === 'number' && (
                    <div
                      className="text-2xl font-bold"
                      style={{ color: carousel.template.colorScheme.primary }}
                    >
                      {currentSlideIndex + 1}
                    </div>
                  )}
                  {currentSlide.counterStyle === 'dot' && (
                    <div className="flex gap-1">
                      {carousel.slides.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i === currentSlideIndex
                              ? 'w-6'
                              : ''
                          }`}
                          style={{
                            backgroundColor:
                              i === currentSlideIndex
                                ? carousel.template.colorScheme.primary
                                : '#D1D5DB',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <input
            type="color"
            value={carousel.template.colorScheme.background}
            onChange={(e) => {
              // Update template color scheme
              const updatedTemplate = {
                ...carousel.template,
                colorScheme: {
                  ...carousel.template.colorScheme,
                  background: e.target.value,
                },
              };
              // Apply to all slides
              carousel.slides.forEach((slide) => {
                updateSlide(slide.id, {});
              });
            }}
            className="w-full h-12 rounded-lg border border-gray-300"
          />
        </div>

        {/* Slide Info */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Slide Information
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Slide Number:</span>
              <span className="font-medium">
                {currentSlideIndex + 1} of {carousel.slides.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Text Blocks:</span>
              <span className="font-medium">
                {currentSlide.textBlocks.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Images:</span>
              <span className="font-medium">{currentSlide.images.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Icons:</span>
              <span className="font-medium">{currentSlide.icons.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Background Elements:</span>
              <span className="font-medium">
                {currentSlide.backgroundElements.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
