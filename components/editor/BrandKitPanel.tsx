'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Check } from 'lucide-react';
import { useCarouselStore } from '@/store/carouselStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase/client';
import { BrandKit } from '@/types';

export function BrandKitPanel() {
  const { carousel, applyBrandKit } = useCarouselStore();
  const { user } = useAuthStore();
  const [brandKits, setBrandKits] = useState<BrandKit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newKit, setNewKit] = useState({
    name: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#EC4899',
  });

  useEffect(() => {
    loadBrandKits();
  }, [user]);

  const loadBrandKits = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('brand_kits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBrandKits(data || []);
    } catch (error) {
      console.error('Error loading brand kits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCurrentBrand = async () => {
    if (!carousel || !user) return;

    const name = prompt('Enter a name for this brand kit:');
    if (!name) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from('brand_kits').insert({
        user_id: user.id,
        name,
        colors: carousel.template.colorScheme,
        fonts: {
          heading: carousel.template.fontPairing.heading,
          body: carousel.template.fontPairing.body,
          size: { heading: 48, body: 24 },
        },
      });

      if (error) throw error;

      await loadBrandKits();
      alert('Brand kit saved successfully!');
    } catch (error) {
      console.error('Error saving brand kit:', error);
      alert('Failed to save brand kit');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateKit = async () => {
    if (!user || !newKit.name.trim()) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from('brand_kits').insert({
        user_id: user.id,
        name: newKit.name,
        colors: {
          primary: newKit.primaryColor,
          secondary: newKit.secondaryColor,
          accent: newKit.accentColor,
          background: '#FFFFFF',
          text: '#1F2937',
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
          size: { heading: 48, body: 24 },
        },
      });

      if (error) throw error;

      await loadBrandKits();
      setShowCreateForm(false);
      setNewKit({
        name: '',
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6',
        accentColor: '#EC4899',
      });
    } catch (error) {
      console.error('Error creating brand kit:', error);
      alert('Failed to create brand kit');
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplyKit = (kit: BrandKit) => {
    applyBrandKit(kit);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Brand Kit</h2>
        <p className="text-sm text-gray-600">
          Save and apply your brand colors and fonts
        </p>
      </div>

      {/* Save Current Brand */}
      <button
        onClick={handleSaveCurrentBrand}
        disabled={isSaving || !carousel}
        className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        Save Current Brand
      </button>

      <div className="border-t border-gray-200 pt-6">
        {/* Create New Kit */}
        {showCreateForm ? (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={newKit.name}
              onChange={(e) => setNewKit({ ...newKit, name: e.target.value })}
              placeholder="Brand kit name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <input
                type="color"
                value={newKit.primaryColor}
                onChange={(e) => setNewKit({ ...newKit, primaryColor: e.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Secondary Color
              </label>
              <input
                type="color"
                value={newKit.secondaryColor}
                onChange={(e) => setNewKit({ ...newKit, secondaryColor: e.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Accent Color
              </label>
              <input
                type="color"
                value={newKit.accentColor}
                onChange={(e) => setNewKit({ ...newKit, accentColor: e.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreateKit}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600"
          >
            <Plus className="w-4 h-4" />
            Create New Brand Kit
          </button>
        )}
      </div>

      {/* Saved Brand Kits */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Saved Brand Kits</h3>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : brandKits.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No brand kits saved yet
          </div>
        ) : (
          <div className="space-y-2">
            {brandKits.map((kit) => (
              <button
                key={kit.id}
                onClick={() => handleApplyKit(kit)}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{kit.name}</h4>
                  <Check className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex gap-2">
                  {[kit.colors.primary, kit.colors.secondary, kit.colors.accent].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-lg border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  {kit.fonts.heading} / {kit.fonts.body}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
