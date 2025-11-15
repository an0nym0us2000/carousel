import { create } from 'zustand';
import { Carousel, Slide, Template, BrandKit, HistoryState } from '@/types';

interface CarouselStore {
  // Current carousel state
  carousel: Carousel | null;
  currentSlideIndex: number;
  selectedTemplate: Template | null;

  // History for undo/redo
  history: HistoryState[];
  historyIndex: number;
  maxHistorySize: number;

  // UI state
  isGenerating: boolean;
  isSaving: boolean;
  showBrandKit: boolean;
  showExportModal: boolean;

  // Actions
  setCarousel: (carousel: Carousel) => void;
  updateSlide: (slideId: string, updates: Partial<Slide>) => void;
  addSlide: (slide: Slide, index?: number) => void;
  deleteSlide: (slideId: string) => void;
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  duplicateSlide: (slideId: string) => void;
  setCurrentSlideIndex: (index: number) => void;
  setSelectedTemplate: (template: Template) => void;
  applyTemplate: (template: Template) => void;
  applyBrandKit: (brandKit: BrandKit) => void;

  // History actions
  addToHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // UI actions
  setIsGenerating: (value: boolean) => void;
  setIsSaving: (value: boolean) => void;
  setShowBrandKit: (value: boolean) => void;
  setShowExportModal: (value: boolean) => void;

  // Reset
  reset: () => void;
}

export const useCarouselStore = create<CarouselStore>((set, get) => ({
  // Initial state
  carousel: null,
  currentSlideIndex: 0,
  selectedTemplate: null,
  history: [],
  historyIndex: -1,
  maxHistorySize: 50,
  isGenerating: false,
  isSaving: false,
  showBrandKit: false,
  showExportModal: false,

  // Actions
  setCarousel: (carousel) => {
    set({ carousel, currentSlideIndex: 0 });
    get().addToHistory();
  },

  updateSlide: (slideId, updates) => {
    const { carousel } = get();
    if (!carousel) return;

    const updatedSlides = carousel.slides.map((slide) =>
      slide.id === slideId ? { ...slide, ...updates } : slide
    );

    set({
      carousel: {
        ...carousel,
        slides: updatedSlides,
      },
    });
    get().addToHistory();
  },

  addSlide: (slide, index) => {
    const { carousel } = get();
    if (!carousel) return;

    const newSlides = [...carousel.slides];
    const insertIndex = index !== undefined ? index : newSlides.length;
    newSlides.splice(insertIndex, 0, slide);

    // Update order for all slides
    const reorderedSlides = newSlides.map((s, i) => ({ ...s, order: i }));

    set({
      carousel: {
        ...carousel,
        slides: reorderedSlides,
      },
    });
    get().addToHistory();
  },

  deleteSlide: (slideId) => {
    const { carousel, currentSlideIndex } = get();
    if (!carousel || carousel.slides.length <= 1) return;

    const updatedSlides = carousel.slides
      .filter((slide) => slide.id !== slideId)
      .map((s, i) => ({ ...s, order: i }));

    const newIndex = Math.min(currentSlideIndex, updatedSlides.length - 1);

    set({
      carousel: {
        ...carousel,
        slides: updatedSlides,
      },
      currentSlideIndex: newIndex,
    });
    get().addToHistory();
  },

  reorderSlides: (fromIndex, toIndex) => {
    const { carousel } = get();
    if (!carousel) return;

    const slides = [...carousel.slides];
    const [movedSlide] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, movedSlide);

    const reorderedSlides = slides.map((s, i) => ({ ...s, order: i }));

    set({
      carousel: {
        ...carousel,
        slides: reorderedSlides,
      },
    });
    get().addToHistory();
  },

  duplicateSlide: (slideId) => {
    const { carousel } = get();
    if (!carousel) return;

    const slideIndex = carousel.slides.findIndex((s) => s.id === slideId);
    if (slideIndex === -1) return;

    const originalSlide = carousel.slides[slideIndex];
    const duplicatedSlide = {
      ...originalSlide,
      id: `slide-${Date.now()}`,
      order: slideIndex + 1,
    };

    get().addSlide(duplicatedSlide, slideIndex + 1);
  },

  setCurrentSlideIndex: (index) => {
    set({ currentSlideIndex: index });
  },

  setSelectedTemplate: (template) => {
    set({ selectedTemplate: template });
  },

  applyTemplate: (template) => {
    const { carousel } = get();
    if (!carousel) return;

    const updatedCarousel = {
      ...carousel,
      template,
    };

    set({ carousel: updatedCarousel, selectedTemplate: template });
    get().addToHistory();
  },

  applyBrandKit: (brandKit) => {
    const { carousel } = get();
    if (!carousel) return;

    set({
      carousel: {
        ...carousel,
        brandKit,
      },
    });
    get().addToHistory();
  },

  // History management
  addToHistory: () => {
    const { carousel, history, historyIndex, maxHistorySize } = get();
    if (!carousel) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      carousel: JSON.parse(JSON.stringify(carousel)),
      timestamp: Date.now(),
    });

    // Limit history size
    if (newHistory.length > maxHistorySize) {
      newHistory.shift();
    }

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex <= 0) return;

    const newIndex = historyIndex - 1;
    const previousState = history[newIndex];

    set({
      carousel: JSON.parse(JSON.stringify(previousState.carousel)),
      historyIndex: newIndex,
    });
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex >= history.length - 1) return;

    const newIndex = historyIndex + 1;
    const nextState = history[newIndex];

    set({
      carousel: JSON.parse(JSON.stringify(nextState.carousel)),
      historyIndex: newIndex,
    });
  },

  canUndo: () => {
    const { historyIndex } = get();
    return historyIndex > 0;
  },

  canRedo: () => {
    const { history, historyIndex } = get();
    return historyIndex < history.length - 1;
  },

  // UI actions
  setIsGenerating: (value) => set({ isGenerating: value }),
  setIsSaving: (value) => set({ isSaving: value }),
  setShowBrandKit: (value) => set({ showBrandKit: value }),
  setShowExportModal: (value) => set({ showExportModal: value }),

  // Reset
  reset: () => {
    set({
      carousel: null,
      currentSlideIndex: 0,
      selectedTemplate: null,
      history: [],
      historyIndex: -1,
      isGenerating: false,
      isSaving: false,
      showBrandKit: false,
      showExportModal: false,
    });
  },
}));
