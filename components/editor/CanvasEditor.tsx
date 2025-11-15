'use client';

import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import * as Icons from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { SlideNavigation } from './SlideNavigation';
import { CanvasToolbar } from './CanvasToolbar';
import { ImageUpload } from './ImageUpload';
import { IconLibrary } from './IconLibrary';
import { BackgroundPanel } from './BackgroundPanel';
import { SlideSettings } from './SlideSettings';

export function CanvasEditor() {
  const { carousel, currentSlideIndex, updateSlide } = useCarouselStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showIconLibrary, setShowIconLibrary] = useState(false);
  const [showBackgroundPanel, setShowBackgroundPanel] = useState(false);
  const [showSlideSettings, setShowSlideSettings] = useState(false);

  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current || !carousel) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: carousel.canvasWidth,
      height: carousel.canvasHeight,
      backgroundColor: carousel.template.colorScheme.background,
      preserveObjectStacking: true,
    });

    fabricCanvasRef.current = canvas;
    setIsReady(true);

    return () => {
      canvas.dispose();
    };
  }, [carousel]);

  // Render current slide
  useEffect(() => {
    if (!fabricCanvasRef.current || !carousel || !isReady) return;

    const canvas = fabricCanvasRef.current;
    const currentSlide = carousel.slides[currentSlideIndex];

    if (!currentSlide) return;

    // Clear canvas
    canvas.clear();
    canvas.backgroundColor = carousel.template.colorScheme.background;

    // Render background elements
    currentSlide.backgroundElements.forEach((element) => {
      if (element.type === 'blob') {
        const circle = new fabric.Circle({
          radius: (element.width * element.scale) / 2,
          fill: element.color,
          left: element.x,
          top: element.y,
          opacity: element.opacity,
          selectable: false,
          shadow: element.blur
            ? new fabric.Shadow({
                color: element.color || '#000',
                blur: element.blur,
              })
            : undefined,
        });
        circle.rotate(element.rotation);
        canvas.add(circle);
      } else if (element.type === 'geometric') {
        const rect = new fabric.Rect({
          width: element.width * element.scale,
          height: element.height * element.scale,
          fill: element.color,
          left: element.x,
          top: element.y,
          opacity: element.opacity,
          selectable: false,
        });
        rect.rotate(element.rotation);
        canvas.add(rect);
      } else if (element.type === 'gradient') {
        const rect = new fabric.Rect({
          width: element.width,
          height: element.height,
          left: element.x,
          top: element.y,
          opacity: element.opacity,
          selectable: false,
          fill: new fabric.Gradient({
            type: element.gradient?.type || 'linear',
            coords: {
              x1: 0,
              y1: 0,
              x2: element.width,
              y2: element.height,
            },
            colorStops:
              element.gradient?.colors.map((color, i) => ({
                offset: i / ((element.gradient?.colors.length || 1) - 1),
                color,
              })) || [],
          }),
        });
        canvas.add(rect);
      }
    });

    // Render text blocks
    currentSlide.textBlocks.forEach((textBlock) => {
      const text = new fabric.Textbox(textBlock.content, {
        left: textBlock.x,
        top: textBlock.y,
        width: textBlock.width,
        fontSize: textBlock.fontSize,
        fontFamily: textBlock.fontFamily,
        fill: textBlock.color,
        fontWeight: textBlock.fontWeight,
        textAlign: textBlock.textAlign,
        lineHeight: textBlock.lineHeight,
        editable: true,
        selectable: !textBlock.locked,
      });

      text.on('modified', () => {
        updateSlide(currentSlide.id, {
          textBlocks: currentSlide.textBlocks.map((tb) =>
            tb.id === textBlock.id
              ? {
                  ...tb,
                  content: text.text || '',
                  x: text.left || tb.x,
                  y: text.top || tb.y,
                  width: text.width || tb.width,
                }
              : tb
          ),
        });
      });

      canvas.add(text);
    });

    // Render images
    currentSlide.images.forEach((image) => {
      fabric.Image.fromURL(
        image.url,
        (img) => {
          img.set({
            left: image.x,
            top: image.y,
            scaleX: image.width / (img.width || 1),
            scaleY: image.height / (img.height || 1),
            opacity: image.opacity,
            selectable: !image.locked,
            shadow: image.shadow
              ? new fabric.Shadow({
                  offsetX: image.shadow.offsetX,
                  offsetY: image.shadow.offsetY,
                  blur: image.shadow.blur,
                  color: image.shadow.color,
                })
              : undefined,
          });
          canvas.add(img);
        },
        { crossOrigin: 'anonymous' }
      );
    });

    // Render icons using SVG
    currentSlide.icons.forEach((icon) => {
      const IconComponent = Icons[icon.name as keyof typeof Icons] as any;
      if (!IconComponent) return;

      // Create SVG string for the icon
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${icon.size}" height="${icon.size}" viewBox="0 0 24 24" fill="none" stroke="${icon.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      `;

      fabric.loadSVGFromString(svgString, (objects, options) => {
        const svg = fabric.util.groupSVGElements(objects, options);
        svg.set({
          left: icon.x,
          top: icon.y,
          scaleX: icon.size / 24,
          scaleY: icon.size / 24,
          opacity: icon.opacity,
          selectable: !icon.locked,
        });
        svg.rotate(icon.rotation);
        canvas.add(svg);
      });
    });

    // Render slide counter
    if (currentSlide.showCounter) {
      const counterText = new fabric.Text(`${currentSlideIndex + 1}`, {
        left: 60,
        top: carousel.canvasHeight - 100,
        fontSize: 24,
        fontFamily: carousel.template.fontPairing.body,
        fill: carousel.template.colorScheme.text,
        selectable: false,
      });

      let counterBg: fabric.Object | null = null;

      if (currentSlide.counterStyle === 'circle') {
        counterBg = new fabric.Circle({
          radius: 30,
          fill: carousel.template.colorScheme.primary,
          left: 45,
          top: carousel.canvasHeight - 115,
          selectable: false,
        });
      } else if (currentSlide.counterStyle === 'square') {
        counterBg = new fabric.Rect({
          width: 60,
          height: 60,
          fill: carousel.template.colorScheme.primary,
          left: 45,
          top: carousel.canvasHeight - 115,
          rx: 8,
          ry: 8,
          selectable: false,
        });
      }

      if (counterBg) {
        canvas.add(counterBg);
        counterText.set({ fill: '#FFFFFF' });
      }
      canvas.add(counterText);
    }

    canvas.renderAll();
  }, [carousel, currentSlideIndex, isReady]);

  if (!carousel) {
    return null;
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <CanvasToolbar
        canvas={fabricCanvasRef.current}
        onShowImageUpload={() => setShowImageUpload(true)}
        onShowIconLibrary={() => setShowIconLibrary(true)}
        onShowBackgroundPanel={() => setShowBackgroundPanel(!showBackgroundPanel)}
        onShowSlideSettings={() => setShowSlideSettings(!showSlideSettings)}
      />

      <div className="flex-1 flex">
        {/* Canvas Container */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <div className="relative">
            <canvas ref={canvasRef} className="shadow-2xl rounded-lg" />
          </div>
        </div>

        {/* Side Panels */}
        {showBackgroundPanel && <BackgroundPanel />}
        {showSlideSettings && <SlideSettings />}
      </div>

      {/* Slide Navigation */}
      <SlideNavigation />

      {/* Modals */}
      {showImageUpload && (
        <ImageUpload onClose={() => setShowImageUpload(false)} />
      )}
      {showIconLibrary && (
        <IconLibrary onClose={() => setShowIconLibrary(false)} />
      )}
    </div>
  );
}
