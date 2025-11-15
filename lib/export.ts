import { Carousel } from '@/types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';

export async function exportSlideAsImage(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpg',
  quality = 1
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      `image/${format}`,
      quality
    );
  });
}

export async function exportAllSlidesAsPDF(
  canvases: HTMLCanvasElement[],
  filename: string
): Promise<void> {
  if (canvases.length === 0) return;

  const firstCanvas = canvases[0];
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [firstCanvas.width, firstCanvas.height],
  });

  for (let i = 0; i < canvases.length; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    const imgData = canvases[i].toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvases[i].width, canvases[i].height);
  }

  pdf.save(filename);
}

export async function exportAllSlidesAsZip(
  canvases: HTMLCanvasElement[],
  filename: string
): Promise<void> {
  const zip = new JSZip();

  for (let i = 0; i < canvases.length; i++) {
    const blob = await exportSlideAsImage(canvases[i], 'png', 1);
    zip.file(`slide-${i + 1}.png`, blob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(content);
  link.download = filename;
  link.click();
}
