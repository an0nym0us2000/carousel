'use client';

import { useEffect, useState } from 'react';
import { FileText, Trash2, Clock, X } from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase/client';
import { Draft } from '@/types';
import { formatDate } from '@/lib/utils';

interface DraftsPanelProps {
  onClose: () => void;
}

export function DraftsPanel({ onClose }: DraftsPanelProps) {
  const { setCarousel } = useCarouselStore();
  const { user } = useAuthStore();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDrafts();
  }, [user]);

  const loadDrafts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('drafts')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setDrafts(data || []);
    } catch (error) {
      console.error('Error loading drafts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDraft = (draft: Draft) => {
    setCarousel(draft.carousel);
    onClose();
  };

  const handleDeleteDraft = async (draftId: string) => {
    if (!confirm('Are you sure you want to delete this draft?')) return;

    try {
      const { error } = await supabase
        .from('drafts')
        .delete()
        .eq('id', draftId);

      if (error) throw error;

      setDrafts(drafts.filter((d) => d.id !== draftId));
    } catch (error) {
      console.error('Error deleting draft:', error);
      alert('Failed to delete draft');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your Drafts
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {drafts.length} saved drafts
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drafts List */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading drafts...</p>
            </div>
          ) : drafts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No drafts yet
              </h3>
              <p className="text-gray-600">
                Your saved carousels will appear here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-gray-50 rounded-xl p-4 border-2 border-transparent hover:border-primary-500 transition-all group"
                >
                  {/* Preview */}
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {draft.carousel.slides[0] && (
                      <div className="p-4">
                        <h3 className="text-sm font-bold line-clamp-2">
                          {draft.carousel.slides[0].title}
                        </h3>
                        <p className="text-xs mt-2 line-clamp-3 opacity-70">
                          {draft.carousel.slides[0].description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 mb-1 truncate">
                      {draft.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(draft.updatedAt)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {draft.carousel.slides.length} slides
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLoadDraft(draft)}
                      className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
