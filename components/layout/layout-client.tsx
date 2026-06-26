'use client';

import { usePathname } from 'next/navigation';
import { Nav } from '@/components/chrome/nav';
import { Chatbot } from '@/components/chrome/chatbot';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <Nav isAdmin={isAdmin} />
      <div className="relative z-10">{children}</div>
      {!isAdmin && <Chatbot />}
    </>
  );
}
