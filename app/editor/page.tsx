'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useCarouselStore } from '@/store/carouselStore';
import { InputPanel } from '@/components/editor/InputPanel';
import { CanvasEditor } from '@/components/editor/CanvasEditor';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { BrandKitPanel } from '@/components/editor/BrandKitPanel';
import { ExportModal } from '@/components/editor/ExportModal';

export default function EditorPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const { carousel, showBrandKit, showExportModal } = useCarouselStore();
  const [showInput, setShowInput] = useState(!carousel);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <EditorHeader onShowInput={() => setShowInput(!showInput)} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - AI Input */}
        {showInput && (
          <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
            <InputPanel onGenerate={() => setShowInput(false)} />
          </div>
        )}

        {/* Center - Canvas Editor */}
        <div className="flex-1 overflow-auto">
          {carousel ? (
            <CanvasEditor />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No carousel loaded
                </h2>
                <p className="text-gray-600 mb-4">
                  Generate a new carousel to get started
                </p>
                <button
                  onClick={() => setShowInput(true)}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Generate Carousel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Brand Kit (conditionally shown) */}
        {showBrandKit && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <BrandKitPanel />
          </div>
        )}
      </div>

      {/* Modals */}
      {showExportModal && <ExportModal />}
    </div>
  );
}
