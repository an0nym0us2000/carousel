'use client';

import { useAutosave } from '@/hooks/useAutosave';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enable autosave for editor
  useAutosave(10000); // Save every 10 seconds

  return <>{children}</>;
}
