'use client';

import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useCarouselStore } from '@/store/carouselStore';
import { Slide } from '@/types';
import { SlideNavigation } from './SlideNavigation';
import { CanvasToolbar } from './CanvasToolbar';

export function CanvasEditor() {
  const { carousel, currentSlideIndex, setCurrentSlideIndex, updateSlide } =
    useCarouselStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isReady, setIsReady] = useState(false);

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
          radius: element.width / 2,
          fill: element.color,
          left: element.x,
          top: element.y,
          opacity: element.opacity,
          selectable: false,
        });
        canvas.add(circle);
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
            colorStops: element.gradient?.colors.map((color, i) => ({
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
      fabric.Image.fromURL(image.url, (img) => {
        img.set({
          left: image.x,
          top: image.y,
          scaleX: image.width / (img.width || 1),
          scaleY: image.height / (img.height || 1),
          opacity: image.opacity,
          selectable: !image.locked,
        });
        canvas.add(img);
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

      let counterBg: fabric.Object;

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

      if (counterBg!) {
        canvas.add(counterBg);
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
      <CanvasToolbar canvas={fabricCanvasRef.current} />

      {/* Canvas Container */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="relative">
          <canvas ref={canvasRef} className="shadow-2xl rounded-lg" />
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation />
    </div>
  );
}
