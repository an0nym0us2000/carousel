'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '@/components/landing/Hero';
import { TemplatePreview } from '@/components/landing/TemplatePreview';
import { Features } from '@/components/landing/Features';
import { CTA } from '@/components/landing/CTA';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Redirect to editor if already authenticated
    if (!isLoading && isAuthenticated) {
      router.push('/editor');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <Features />
      <TemplatePreview />
      <CTA />
    </main>
  );
}
