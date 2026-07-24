'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { SearchModal } from '@/components/SearchModal';
import { ReadingProgress } from '@/components/ReadingProgress';
import { SidebarNav } from '@/components/SidebarNav';
import { List, X } from '@phosphor-icons/react';

interface NavNode {
  name: string;
  path: string;
  children: NavNode[];
  pages: { title: string; href: string; section: string }[];
}

const DEFAULT_NAV: NavNode = { name: 'Handbook', path: '', children: [], pages: [] };

export function ContentShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navData, setNavData] = useState<NavNode>(DEFAULT_NAV);

  // Load navigation data
  useEffect(() => {
    fetch('/nav-data.json')
      .then((res) => res.json())
      .then((data) => setNavData(data))
      .catch(() => {
        // Fallback to global variable
        if (typeof window !== 'undefined' && (window as any).__GTOS_NAV__) {
          setNavData((window as any).__GTOS_NAV__);
        }
      });
  }, []);

  // Listen for open-search event
  useEffect(() => {
    const handler = () => setSearchOpen(true);
    document.addEventListener('open-search', handler);
    return () => document.removeEventListener('open-search', handler);
  }, []);

  return (
    <>
      <ReadingProgress />
      <TopBar onOpenSearch={() => setSearchOpen(true)} onToggleSidebar={() => setSidebarOpen((s) => !s)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold tracking-widest uppercase text-[var(--text-tertiary)]">Contents</span>
          </div>
          <SidebarNav data={navData} />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-[var(--bg-surface)] border-r border-[var(--border-default)] shadow-xl overflow-y-auto p-4 lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold tracking-widest uppercase text-[var(--text-tertiary)]">Contents</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)]">
                  <X size={16} weight="bold" />
                </button>
              </div>
              <SidebarNav data={navData} />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-8 pb-20">
            {children}
          </div>
        </main>
      </div>

      <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] flex items-center justify-center text-white font-black text-xs">G</div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">GTOS Enterprise Engineering Handbook</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[var(--text-tertiary)]">
            <span>Edition 1.0 · Final Master Edition</span>
          </div>
        </div>
      </footer>
    </>
  );
}
