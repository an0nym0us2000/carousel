'use client';

import {
  Type,
  Image,
  Shapes,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic
} from 'lucide-react';
import { useState } from 'react';

interface CanvasToolbarProps {
  canvas: fabric.Canvas | null;
}

export function CanvasToolbar({ canvas }: CanvasToolbarProps) {
  const [showRewrite, setShowRewrite] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);

  const handleTextAlign = (align: 'left' | 'center' | 'right') => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      (activeObject as fabric.Textbox).set({ textAlign: align });
      canvas.renderAll();
    }
  };

  const handleBold = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      const textbox = activeObject as fabric.Textbox;
      const currentWeight = textbox.fontWeight;
      textbox.set({ fontWeight: currentWeight === 'bold' ? 'normal' : 'bold' });
      canvas.renderAll();
    }
  };

  const handleRewrite = async (mode: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'textbox') {
      const textbox = activeObject as fabric.Textbox;
      const currentText = textbox.text || '';

      setIsRewriting(true);
      try {
        const response = await fetch('/api/rewrite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: currentText, mode }),
        });

        if (!response.ok) throw new Error('Failed to rewrite');

        const { text } = await response.json();
        textbox.set({ text });
        canvas.renderAll();
      } catch (error) {
        console.error('Error rewriting text:', error);
        alert('Failed to rewrite text');
      } finally {
        setIsRewriting(false);
      }
    }
  };

  const activeObject = canvas?.getActiveObject();
  const isTextSelected = activeObject?.type === 'textbox';

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-4">
        {/* Text Tools */}
        {isTextSelected && (
          <>
            <div className="flex items-center gap-1">
              <button
                onClick={handleBold}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>

              <button
                onClick={() => {/* Italic */}}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300" />

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleTextAlign('left')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleTextAlign('center')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Align Center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleTextAlign('right')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300" />

            {/* AI Rewrite */}
            <div className="relative">
              <button
                onClick={() => setShowRewrite(!showRewrite)}
                className="px-3 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Rewrite
              </button>

              {showRewrite && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-10 min-w-[200px]">
                  {['shorter', 'longer', 'simple', 'punchy', 'clearer', 'professional'].map(
                    (mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          handleRewrite(mode);
                          setShowRewrite(false);
                        }}
                        disabled={isRewriting}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors capitalize disabled:opacity-50"
                      >
                        {mode}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* General Tools */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Add Text"
          >
            <Type className="w-4 h-4" />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Add Image"
          >
            <Image className="w-4 h-4" />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Add Shape"
          >
            <Shapes className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
