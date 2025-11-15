'use client';

import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export function CTA() {
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/editor`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Create Your First Carousel?
        </h2>
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Join thousands of creators using AI to generate stunning LinkedIn carousels in minutes
        </p>

        <button
          onClick={handleGoogleLogin}
          className="group px-10 py-5 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-2xl hover:shadow-3xl flex items-center gap-3 mx-auto"
        >
          Get Started Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="mt-6 text-primary-100 text-sm">
          No credit card required • Free forever • Start creating in 60 seconds
        </p>
      </div>
    </section>
  );
}
