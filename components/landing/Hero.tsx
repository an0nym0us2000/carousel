'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase/client';

export function Hero() {
  const { setUser } = useAuthStore();

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
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">
            AI-Powered Carousel Generation
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          Create Stunning
          <br />
          <span className="gradient-text">LinkedIn Carousels</span>
          <br />
          in Minutes
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Transform your ideas into professional, engaging carousels with AI.
          Choose from 12 templates, customize everything, and export in any format.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoogleLogin}
            className="group px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Start Creating Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#templates"
            className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 border-2 border-gray-200"
          >
            View Templates
          </a>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-400 border-2 border-white"
                />
              ))}
            </div>
            <span>Trusted by creators</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300" />
          <div>No credit card required</div>
        </div>

        {/* Demo Preview */}
        <div className="mt-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8">
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/5] bg-gradient-to-br from-primary-100 to-purple-100 rounded-lg animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
