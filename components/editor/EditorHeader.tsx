'use client';

import { useState } from 'react';
import {
  Save,
  Download,
  Undo,
  Redo,
  Palette,
  Menu,
  LogOut,
  FolderOpen,
} from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase/client';
import { DraftsPanel } from './DraftsPanel';

interface EditorHeaderProps {
  onShowInput: () => void;
}

export function EditorHeader({ onShowInput }: EditorHeaderProps) {
  const {
    carousel,
    canUndo,
    canRedo,
    undo,
    redo,
    setShowBrandKit,
    setShowExportModal,
    showBrandKit,
  } = useCarouselStore();
  const { user, logout } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);

  const handleSave = async () => {
    if (!carousel || !user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from('drafts').upsert({
        user_id: user.id,
        name: carousel.title,
        carousel_data: carousel,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    window.location.href = '/';
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onShowInput}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Toggle Input Panel"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {carousel?.title || 'Untitled Carousel'}
          </h1>
          <p className="text-xs text-gray-500">
            {carousel?.slides.length || 0} slides
          </p>
        </div>
      </div>

      {/* Center - Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => undo()}
          disabled={!canUndo()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>

        <button
          onClick={() => redo()}
          disabled={!canRedo()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => setShowBrandKit(!showBrandKit)}
          className={`p-2 rounded-lg transition-colors ${
            showBrandKit ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
          }`}
          title="Brand Kit"
        >
          <Palette className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowDrafts(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Open Drafts"
        >
          <FolderOpen className="w-5 h-5" />
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving || !carousel}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save'}
        </button>

        <button
          onClick={() => setShowExportModal(true)}
          disabled={!carousel}
          className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Right - User */}
      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Drafts Modal */}
      {showDrafts && <DraftsPanel onClose={() => setShowDrafts(false)} />}
    </header>
  );
}
