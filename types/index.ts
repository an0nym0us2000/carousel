// Core Types for AI Carousel Maker

export type Tone = 'simple' | 'friendly' | 'expert' | 'emotional' | 'corporate';
export type IntroStyle = 'classic' | 'emoji' | 'portrait' | 'headshot';
export type ExportFormat = 'png' | 'jpg' | 'pdf' | 'zip';
export type AspectRatio = '4:5' | '1:1';

export interface CarouselInput {
  topic: string;
  description: string;
  targetAudience: string;
  tone: Tone;
  slideCount: number;
  templateId: string;
  colorPalette: ColorPalette;
  typography: Typography;
  introStyle: IntroStyle;
  addCTA: boolean;
  addHook: boolean;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  heading: string;
  body: string;
  size: {
    heading: number;
    body: number;
  };
}

export interface Slide {
  id: string;
  order: number;
  title: string;
  description: string;
  visualSuggestions?: string[];
  backgroundElements: BackgroundElement[];
  textBlocks: TextBlock[];
  images: ImageElement[];
  icons: IconElement[];
  showCounter: boolean;
  counterStyle: CounterStyle;
}

export interface TextBlock {
  id: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: number;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  locked: boolean;
  rotation: number;
  opacity: number;
}

export interface ImageElement {
  id: string;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  shadow?: ShadowEffect;
  glow?: GlowEffect;
  cropArea?: CropArea;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IconElement {
  id: string;
  name: string;
  svg: string;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  opacity: number;
  locked: boolean;
}

export interface BackgroundElement {
  id: string;
  type: 'blob' | 'gradient' | 'dots' | 'waves' | 'geometric' | 'texture';
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  opacity: number;
  blur: number;
  rotation: number;
  color?: string;
  gradient?: GradientConfig;
}

export interface GradientConfig {
  type: 'linear' | 'radial';
  colors: string[];
  angle?: number;
}

export interface ShadowEffect {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
}

export interface GlowEffect {
  blur: number;
  color: string;
  spread: number;
}

export type CounterStyle = 'circle' | 'square' | 'number' | 'dot';

export interface Template {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  category: 'aiCarousels' | 'contentDrips' | 'carouselMaker' | 'postNitro';
  fontPairing: {
    heading: string;
    body: string;
  };
  colorScheme: ColorPalette;
  spacing: {
    padding: number;
    gap: number;
  };
  layoutPreset: LayoutPreset;
  counterStyle: CounterStyle;
  iconStyle: 'outline' | 'filled' | 'duotone';
  backgroundPattern: BackgroundPattern;
}

export interface LayoutPreset {
  type: 'grid' | 'freeform' | 'centered' | 'split';
  columns?: number;
  rows?: number;
  alignment: 'left' | 'center' | 'right';
}

export interface BackgroundPattern {
  type: string;
  elements: BackgroundElement[];
}

export interface BrandKit {
  id: string;
  userId: string;
  name: string;
  logo?: string;
  colors: ColorPalette;
  fonts: Typography;
  profilePicture?: string;
  signatureTag?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Draft {
  id: string;
  userId: string;
  name: string;
  carousel: Carousel;
  createdAt: string;
  updatedAt: string;
}

export interface Carousel {
  id: string;
  title: string;
  slides: Slide[];
  template: Template;
  brandKit?: BrandKit;
  canvasWidth: number;
  canvasHeight: number;
  aspectRatio: AspectRatio;
}

export interface AIGenerationResponse {
  slides: {
    title: string;
    description: string;
    visualSuggestions: string[];
  }[];
  ctaSuggestion?: string;
  hookSuggestion?: string;
  recommendedIcons: string[];
  backgroundShapes: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface HistoryState {
  carousel: Carousel;
  timestamp: number;
}

export interface ExportOptions {
  format: ExportFormat;
  aspectRatio: AspectRatio;
  quality: number;
  includeAllSlides: boolean;
  slideIndexes?: number[];
}
