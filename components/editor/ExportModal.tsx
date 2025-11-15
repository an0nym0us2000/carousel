'use client';

import { useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { ExportFormat, AspectRatio } from '@/types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function ExportModal() {
  const { carousel, setShowExportModal } = useCarouselStore();
  const [format, setFormat] = useState<ExportFormat>('png');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('4:5');
  const [quality, setQuality] = useState(100);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!carousel) return;

    setIsExporting(true);
    try {
      if (format === 'zip') {
        await exportAsZip();
      } else if (format === 'pdf') {
        await exportAsPDF();
      } else {
        await exportAsImage(format);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export carousel');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsImage = async (imageFormat: 'png' | 'jpg') => {
    if (!carousel) return;

    // Create a temporary canvas for each slide
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = carousel.canvasWidth;
    canvas.height = carousel.canvasHeight;

    // For simplicity, export the first slide as an example
    // In production, you'd iterate through all slides
    const slide = carousel.slides[0];

    // Draw background
    ctx.fillStyle = carousel.template.colorScheme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text blocks
    slide.textBlocks.forEach((textBlock) => {
      ctx.fillStyle = textBlock.color;
      ctx.font = `${textBlock.fontWeight} ${textBlock.fontSize}px ${textBlock.fontFamily}`;
      ctx.textAlign = textBlock.textAlign;
      ctx.fillText(textBlock.content, textBlock.x, textBlock.y + textBlock.fontSize);
    });

    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${carousel.title}-slide-1.${imageFormat}`);
      }
    }, `image/${imageFormat}`, quality / 100);
  };

  const exportAsPDF = async () => {
    if (!carousel) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [carousel.canvasWidth, carousel.canvasHeight],
    });

    // Add each slide as a page
    for (let i = 0; i < carousel.slides.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      canvas.width = carousel.canvasWidth;
      canvas.height = carousel.canvasHeight;

      const slide = carousel.slides[i];

      // Draw background
      ctx.fillStyle = carousel.template.colorScheme.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text blocks
      slide.textBlocks.forEach((textBlock) => {
        ctx.fillStyle = textBlock.color;
        ctx.font = `${textBlock.fontWeight} ${textBlock.fontSize}px ${textBlock.fontFamily}`;
        ctx.textAlign = textBlock.textAlign;
        ctx.fillText(textBlock.content, textBlock.x, textBlock.y + textBlock.fontSize);
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    }

    pdf.save(`${carousel.title}.pdf`);
  };

  const exportAsZip = async () => {
    if (!carousel) return;

    const zip = new JSZip();

    // Export each slide as PNG
    for (let i = 0; i < carousel.slides.length; i++) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      canvas.width = carousel.canvasWidth;
      canvas.height = carousel.canvasHeight;

      const slide = carousel.slides[i];

      // Draw background
      ctx.fillStyle = carousel.template.colorScheme.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text blocks
      slide.textBlocks.forEach((textBlock) => {
        ctx.fillStyle = textBlock.color;
        ctx.font = `${textBlock.fontWeight} ${textBlock.fontSize}px ${textBlock.fontFamily}`;
        ctx.textAlign = textBlock.textAlign;
        ctx.fillText(textBlock.content, textBlock.x, textBlock.y + textBlock.fontSize);
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });

      zip.file(`slide-${i + 1}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${carousel.title}.zip`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Export Carousel</h2>
          <button
            onClick={() => setShowExportModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['png', 'jpg', 'pdf', 'zip'] as ExportFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-all uppercase ${
                  format === fmt
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['4:5', '1:1'] as AspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                  aspectRatio === ratio
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Slider (for image formats) */}
        {(format === 'png' || format === 'jpg') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            {format === 'zip'
              ? `All ${carousel?.slides.length} slides will be exported as PNG files in a ZIP archive.`
              : format === 'pdf'
              ? `All ${carousel?.slides.length} slides will be exported as pages in a single PDF.`
              : `The first slide will be exported as a ${format.toUpperCase()} file.`}
          </p>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Export as {format.toUpperCase()}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
