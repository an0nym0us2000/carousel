'use client';

import { Plus, Trash2, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { generateId } from '@/lib/utils';
import { Slide } from '@/types';

export function SlideNavigation() {
  const {
    carousel,
    currentSlideIndex,
    setCurrentSlideIndex,
    addSlide,
    deleteSlide,
    duplicateSlide,
  } = useCarouselStore();

  if (!carousel) return null;

  const currentSlide = carousel.slides[currentSlideIndex];

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: generateId('slide'),
      order: carousel.slides.length,
      title: 'New Slide',
      description: '',
      backgroundElements: carousel.template.backgroundPattern.elements,
      textBlocks: [
        {
          id: generateId('text'),
          content: 'New Slide Title',
          x: 60,
          y: 80,
          width: 960,
          height: 200,
          fontSize: 48,
          fontFamily: carousel.template.fontPairing.heading,
          color: carousel.template.colorScheme.text,
          fontWeight: 700,
          textAlign: 'left',
          lineHeight: 1.2,
          locked: false,
          rotation: 0,
          opacity: 1,
        },
      ],
      images: [],
      icons: [],
      showCounter: true,
      counterStyle: carousel.template.counterStyle,
    };

    addSlide(newSlide);
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddSlide}
              className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Slide
            </button>

            <button
              onClick={() => currentSlide && duplicateSlide(currentSlide.id)}
              disabled={!currentSlide}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>

            <button
              onClick={() => currentSlide && deleteSlide(currentSlide.id)}
              disabled={!currentSlide || carousel.slides.length <= 1}
              className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-700 min-w-[80px] text-center">
              {currentSlideIndex + 1} / {carousel.slides.length}
            </span>

            <button
              onClick={() =>
                setCurrentSlideIndex(
                  Math.min(carousel.slides.length - 1, currentSlideIndex + 1)
                )
              }
              disabled={currentSlideIndex === carousel.slides.length - 1}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {carousel.slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(index)}
              className={`flex-shrink-0 relative w-32 h-40 rounded-lg border-2 transition-all overflow-hidden ${
                currentSlideIndex === index
                  ? 'border-primary-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ backgroundColor: carousel.template.colorScheme.background }}
            >
              {/* Simple thumbnail representation */}
              <div className="p-3 space-y-2">
                <div className="text-xs font-semibold truncate" style={{ color: carousel.template.colorScheme.text }}>
                  {slide.title}
                </div>
                <div className="text-[10px] opacity-60 line-clamp-3" style={{ color: carousel.template.colorScheme.text }}>
                  {slide.description}
                </div>
              </div>

              {/* Slide number */}
              <div className="absolute bottom-2 left-2 w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
