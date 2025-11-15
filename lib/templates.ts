import { Template } from '@/types';

// 12 Starter Templates inspired by aiCarousels, ContentDrips, CarouselMaker, and PostNitro

export const templates: Template[] = [
  // aiCarousels Style (3 templates)
  {
    id: 'ai-carousel-1',
    name: 'Modern Curves',
    description: 'Clean design with curved shapes and abstract elements',
    previewUrl: '/templates/ai-carousel-1.png',
    category: 'aiCarousels',
    fontPairing: {
      heading: 'Inter',
      body: 'Inter',
    },
    colorScheme: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    spacing: {
      padding: 48,
      gap: 24,
    },
    layoutPreset: {
      type: 'centered',
      alignment: 'center',
    },
    counterStyle: 'circle',
    iconStyle: 'outline',
    backgroundPattern: {
      type: 'curves',
      elements: [
        {
          id: 'bg-1',
          type: 'blob',
          x: -50,
          y: -50,
          width: 400,
          height: 400,
          scale: 1,
          opacity: 0.1,
          blur: 0,
          rotation: 45,
          color: '#3B82F6',
        },
      ],
    },
  },
  {
    id: 'ai-carousel-2',
    name: 'Gradient Flow',
    description: 'Smooth gradients with flowing shapes',
    previewUrl: '/templates/ai-carousel-2.png',
    category: 'aiCarousels',
    fontPairing: {
      heading: 'Poppins',
      body: 'Inter',
    },
    colorScheme: {
      primary: '#06B6D4',
      secondary: '#3B82F6',
      accent: '#8B5CF6',
      background: '#F9FAFB',
      text: '#111827',
    },
    spacing: {
      padding: 56,
      gap: 28,
    },
    layoutPreset: {
      type: 'centered',
      alignment: 'center',
    },
    counterStyle: 'circle',
    iconStyle: 'filled',
    backgroundPattern: {
      type: 'gradient',
      elements: [
        {
          id: 'bg-1',
          type: 'gradient',
          x: 0,
          y: 0,
          width: 1080,
          height: 1350,
          scale: 1,
          opacity: 0.15,
          blur: 40,
          rotation: 0,
          gradient: {
            type: 'radial',
            colors: ['#06B6D4', '#3B82F6', '#8B5CF6'],
          },
        },
      ],
    },
  },
  {
    id: 'ai-carousel-3',
    name: 'Abstract Minimalist',
    description: 'Minimal design with abstract geometric shapes',
    previewUrl: '/templates/ai-carousel-3.png',
    category: 'aiCarousels',
    fontPairing: {
      heading: 'Outfit',
      body: 'Inter',
    },
    colorScheme: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      accent: '#10B981',
      background: '#FFFFFF',
      text: '#0F172A',
    },
    spacing: {
      padding: 40,
      gap: 20,
    },
    layoutPreset: {
      type: 'freeform',
      alignment: 'left',
    },
    counterStyle: 'square',
    iconStyle: 'outline',
    backgroundPattern: {
      type: 'geometric',
      elements: [
        {
          id: 'bg-1',
          type: 'geometric',
          x: 800,
          y: 100,
          width: 200,
          height: 200,
          scale: 1,
          opacity: 0.12,
          blur: 0,
          rotation: 30,
          color: '#F59E0B',
        },
      ],
    },
  },

  // ContentDrips Style (3 templates)
  {
    id: 'content-drips-1',
    name: 'Clean Minimal',
    description: 'Ultra-minimal design with maximum clarity',
    previewUrl: '/templates/content-drips-1.png',
    category: 'contentDrips',
    fontPairing: {
      heading: 'Inter',
      body: 'Inter',
    },
    colorScheme: {
      primary: '#000000',
      secondary: '#3B82F6',
      accent: '#3B82F6',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    spacing: {
      padding: 64,
      gap: 32,
    },
    layoutPreset: {
      type: 'centered',
      alignment: 'center',
    },
    counterStyle: 'number',
    iconStyle: 'outline',
    backgroundPattern: {
      type: 'none',
      elements: [],
    },
  },
  {
    id: 'content-drips-2',
    name: 'Simple Elegance',
    description: 'Elegant simplicity with subtle accents',
    previewUrl: '/templates/content-drips-2.png',
    category: 'contentDrips',
    fontPairing: {
      heading: 'Helvetica',
      body: 'Helvetica',
    },
    colorScheme: {
      primary: '#1F2937',
      secondary: '#6366F1',
      accent: '#EC4899',
      background: '#F9FAFB',
      text: '#111827',
    },
    spacing: {
      padding: 72,
      gap: 36,
    },
    layoutPreset: {
      type: 'centered',
      alignment: 'center',
    },
    counterStyle: 'dot',
    iconStyle: 'outline',
    backgroundPattern: {
      type: 'dots',
      elements: [
        {
          id: 'bg-1',
          type: 'dots',
          x: 0,
          y: 0,
          width: 1080,
          height: 1350,
          scale: 1,
          opacity: 0.05,
          blur: 0,
          rotation: 0,
        },
      ],
    },
  },
  {
    id: 'content-drips-3',
    name: 'Typography First',
    description: 'Strong typography with minimal distractions',
    previewUrl: '/templates/content-drips-3.png',
    category: 'contentDrips',
    fontPairing: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    colorScheme: {
      primary: '#0F172A',
      secondary: '#F59E0B',
      accent: '#F59E0B',
      background: '#FEFCE8',
      text: '#0F172A',
    },
    spacing: {
      padding: 60,
      gap: 30,
    },
    layoutPreset: {
      type: 'centered',
      alignment: 'left',
    },
    counterStyle: 'number',
    iconStyle: 'outline',
    backgroundPattern: {
      type: 'none',
      elements: [],
    },
  },

  // CarouselMaker Style (3 templates)
  {
    id: 'carousel-maker-1',
    name: 'Structured Grid',
    description: 'Organized grid layout with clear structure',
    previewUrl: '/templates/carousel-maker-1.png',
    category: 'carouselMaker',
    fontPairing: {
      heading: 'Montserrat',
      body: 'Open Sans',
    },
    colorScheme: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    spacing: {
      padding: 48,
      gap: 24,
    },
    layoutPreset: {
      type: 'grid',
      columns: 2,
      rows: 3,
      alignment: 'center',
    },
    counterStyle: 'square',
    iconStyle: 'filled',
    backgroundPattern: {
      type: 'geometric',
      elements: [
        {
          id: 'bg-1',
          type: 'geometric',
          x: 0,
          y: 0,
          width: 1080,
          height: 200,
          scale: 1,
          opacity: 0.08,
          blur: 0,
          rotation: 0,
          color: '#6366F1',
        },
      ],
    },
  },
  {
    id: 'carousel-maker-2',
    name: 'Professional Layout',
    description: 'Corporate-ready structured design',
    previewUrl: '/templates/carousel-maker-2.png',
    category: 'carouselMaker',
    fontPairing: {
      heading: 'Raleway',
      body: 'Lato',
    },
    colorScheme: {
      primary: '#0284C7',
      secondary: '#0EA5E9',
      accent: '#06B6D4',
      background: '#F0F9FF',
      text: '#0C4A6E',
    },
    spacing: {
      padding: 52,
      gap: 26,
    },
    layoutPreset: {
      type: 'grid',
      columns: 1,
      rows: 4,
      alignment: 'left',
    },
    counterStyle: 'circle',
    iconStyle: 'filled',
    backgroundPattern: {
      type: 'waves',
      elements: [
        {
          id: 'bg-1',
          type: 'waves',
          x: 0,
          y: 1100,
          width: 1080,
          height: 250,
          scale: 1,
          opacity: 0.1,
          blur: 0,
          rotation: 0,
          color: '#0284C7',
        },
      ],
    },
  },
  {
    id: 'carousel-maker-3',
    name: 'Organized Blocks',
    description: 'Block-based layout for clear information hierarchy',
    previewUrl: '/templates/carousel-maker-3.png',
    category: 'carouselMaker',
    fontPairing: {
      heading: 'Work Sans',
      body: 'Inter',
    },
    colorScheme: {
      primary: '#059669',
      secondary: '#10B981',
      accent: '#34D399',
      background: '#ECFDF5',
      text: '#064E3B',
    },
    spacing: {
      padding: 44,
      gap: 22,
    },
    layoutPreset: {
      type: 'grid',
      columns: 2,
      rows: 2,
      alignment: 'center',
    },
    counterStyle: 'square',
    iconStyle: 'outline',
    backgroundPattern: {
      type: 'geometric',
      elements: [],
    },
  },

  // PostNitro Style (3 templates)
  {
    id: 'post-nitro-1',
    name: 'Bold & Modern',
    description: 'Eye-catching bold design with strong colors',
    previewUrl: '/templates/post-nitro-1.png',
    category: 'postNitro',
    fontPairing: {
      heading: 'Space Grotesk',
      body: 'Inter',
    },
    colorScheme: {
      primary: '#DC2626',
      secondary: '#F59E0B',
      accent: '#FBBF24',
      background: '#18181B',
      text: '#FAFAFA',
    },
    spacing: {
      padding: 40,
      gap: 20,
    },
    layoutPreset: {
      type: 'freeform',
      alignment: 'left',
    },
    counterStyle: 'square',
    iconStyle: 'filled',
    backgroundPattern: {
      type: 'gradient',
      elements: [
        {
          id: 'bg-1',
          type: 'gradient',
          x: 0,
          y: 0,
          width: 1080,
          height: 1350,
          scale: 1,
          opacity: 0.2,
          blur: 60,
          rotation: 45,
          gradient: {
            type: 'linear',
            colors: ['#DC2626', '#F59E0B'],
            angle: 135,
          },
        },
      ],
    },
  },
  {
    id: 'post-nitro-2',
    name: 'Dynamic Energy',
    description: 'High-energy design with vibrant colors',
    previewUrl: '/templates/post-nitro-2.png',
    category: 'postNitro',
    fontPairing: {
      heading: 'Archivo Black',
      body: 'Inter',
    },
    colorScheme: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#F472B6',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    spacing: {
      padding: 36,
      gap: 18,
    },
    layoutPreset: {
      type: 'split',
      alignment: 'center',
    },
    counterStyle: 'circle',
    iconStyle: 'duotone',
    backgroundPattern: {
      type: 'blob',
      elements: [
        {
          id: 'bg-1',
          type: 'blob',
          x: 600,
          y: 200,
          width: 500,
          height: 500,
          scale: 1.2,
          opacity: 0.15,
          blur: 30,
          rotation: 20,
          color: '#8B5CF6',
        },
        {
          id: 'bg-2',
          type: 'blob',
          x: -100,
          y: 800,
          width: 450,
          height: 450,
          scale: 1.1,
          opacity: 0.12,
          blur: 25,
          rotation: -30,
          color: '#EC4899',
        },
      ],
    },
  },
  {
    id: 'post-nitro-3',
    name: 'Vibrant Impact',
    description: 'Maximum visual impact with bold typography',
    previewUrl: '/templates/post-nitro-3.png',
    category: 'postNitro',
    fontPairing: {
      heading: 'Bebas Neue',
      body: 'Roboto',
    },
    colorScheme: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      accent: '#22D3EE',
      background: '#0F172A',
      text: '#F8FAFC',
    },
    spacing: {
      padding: 42,
      gap: 21,
    },
    layoutPreset: {
      type: 'freeform',
      alignment: 'center',
    },
    counterStyle: 'number',
    iconStyle: 'filled',
    backgroundPattern: {
      type: 'geometric',
      elements: [
        {
          id: 'bg-1',
          type: 'geometric',
          x: 100,
          y: 100,
          width: 300,
          height: 300,
          scale: 1,
          opacity: 0.1,
          blur: 0,
          rotation: 45,
          color: '#0EA5E9',
        },
        {
          id: 'bg-2',
          type: 'geometric',
          x: 700,
          y: 900,
          width: 250,
          height: 250,
          scale: 1,
          opacity: 0.08,
          blur: 0,
          rotation: -15,
          color: '#06B6D4',
        },
      ],
    },
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

export const getTemplatesByCategory = (
  category: Template['category']
): Template[] => {
  return templates.filter((t) => t.category === category);
};
