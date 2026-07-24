'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X, MagnifyingGlass, Moon, Sun } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Architecture Atlas', href: '/atlas' },
  { label: 'Volumes', href: '/volumes' },
];

export function TopBar({ onOpenSearch, onToggleSidebar }: { onOpenSearch: () => void; onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const { isDark, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-16 glass-strong">
        <div className="h-full max-w-[1600px] mx-auto px-6 flex items-center gap-4">
          {/* Mobile menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          >
            <List size={22} weight="bold" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] flex items-center justify-center text-white font-black text-sm group-hover:scale-105 transition-transform">
              G
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-bold text-sm text-[var(--text-primary)] tracking-tight">GTOS</div>
              <div className="text-[10px] text-[var(--text-tertiary)] tracking-wide uppercase">Engineering Handbook</div>
            </div>
          </Link>

          {/* Search trigger */}
          <button
            onClick={onOpenSearch}
            className="flex-1 max-w-lg flex items-center justify-between px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)] transition-all text-sm"
          >
            <span className="flex items-center gap-2">
              <MagnifyingGlass size={16} weight="bold" />
              Search architecture, domains, APIs…
            </span>
            <kbd className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-tertiary)]">
              ⌘K
            </kbd>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-[rgba(59,130,246,0.08)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="p-2.5 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-[var(--bg-surface)] border-r border-[var(--border-default)] shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--border-default)]">
                <span className="font-bold text-sm">Contents</span>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-[var(--bg-secondary)]">
                  <X size={18} weight="bold" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {NAV_ITEMS.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
