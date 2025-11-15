import { useEffect, useRef } from 'react';
import { useCarouselStore } from '@/store/carouselStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase/client';
import { debounce } from '@/lib/utils';

export function useAutosave(interval = 10000) {
  const { carousel } = useCarouselStore();
  const { user } = useAuthStore();
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    if (!carousel || !user) return;

    const save = debounce(async () => {
      const currentState = JSON.stringify(carousel);

      // Only save if carousel has changed
      if (currentState === lastSavedRef.current) return;

      try {
        const { error } = await supabase.from('drafts').upsert({
          user_id: user.id,
          name: carousel.title,
          carousel_data: carousel,
          updated_at: new Date().toISOString(),
        });

        if (error) throw error;

        lastSavedRef.current = currentState;
        console.log('Autosaved at', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Autosave error:', error);
      }
    }, interval);

    save();

    const intervalId = setInterval(save, interval);

    return () => clearInterval(intervalId);
  }, [carousel, user, interval]);
}
