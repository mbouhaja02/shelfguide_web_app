'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ background: 'linear-gradient(165deg, #f4f7fb 0%, #eef3f9 40%, #f6f3ef 100%)' }}>
      {/* Demo Banner */}
      <div className="flex h-8 items-center justify-center gap-2 text-[11px] font-medium tracking-wide shrink-0" style={{ background: '#1a2332' }}>
        <span className="inline-flex h-[18px] items-center rounded-md bg-white/10 px-2 text-[9px] font-bold uppercase tracking-widest text-white/70">Démo</span>
        <span className="text-white/60">ShelfGuide — Plateforme de supervision merchandising · Maroc</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader onMenuToggle={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto bg-grain">
            <div className="relative mx-auto max-w-[1360px] px-5 py-6 lg:px-8 lg:py-7">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
