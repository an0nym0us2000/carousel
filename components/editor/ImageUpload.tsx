'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { ImageElement } from '@/types';
import { generateId } from '@/lib/utils';

interface ImageUploadProps {
  onClose: () => void;
}

export function ImageUpload({ onClose }: ImageUploadProps) {
  const { carousel, currentSlideIndex, updateSlide } = useCarouselStore();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // In production, upload to Supabase Storage
      // For now, use the data URL
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      setPreviewUrl(dataUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddToCanvas = () => {
    if (!carousel || !previewUrl) return;

    const currentSlide = carousel.slides[currentSlideIndex];
    if (!currentSlide) return;

    const newImage: ImageElement = {
      id: generateId('image'),
      url: previewUrl,
      x: 100,
      y: 100,
      width: 300,
      height: 300,
      rotation: 0,
      opacity: 1,
      locked: false,
      shadow: {
        offsetX: 0,
        offsetY: 4,
        blur: 8,
        color: 'rgba(0, 0, 0, 0.1)',
      },
    };

    updateSlide(currentSlide.id, {
      images: [...currentSlide.images, newImage],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Upload Image</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Area */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-contain bg-gray-50 rounded-lg"
              />
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
                  <span className="text-gray-600">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div className="text-center">
                    <p className="font-medium text-gray-900">
                      Click to upload image
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </>
              )}
            </button>
          )}
        </div>

        {/* Stock Images */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Or use stock images
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
              'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400',
              'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400',
            ].map((url, i) => (
              <button
                key={i}
                onClick={() => setPreviewUrl(url)}
                className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary-500 transition-all"
              >
                <img
                  src={url}
                  alt={`Stock ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCanvas}
            disabled={!previewUrl}
            className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Add to Canvas
          </button>
        </div>
      </div>
    </div>
  );
}
