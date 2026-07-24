'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CaretDown, CaretRight, MagnifyingGlass } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavPage {
  title: string;
  href: string;
  section: string;
}

interface NavNode {
  name: string;
  path: string;
  children: NavNode[];
  pages: NavPage[];
}

interface SidebarNavProps {
  data: NavNode;
}

function TreeNode({ node, level = 0 }: { node: NavNode; level?: number }) {
  const [open, setOpen] = useState(level < 2);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <div>
      {(node.children.length > 0 || node.pages.length > 0) && node.name !== 'Handbook' && (
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-1 px-2 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all"
        >
          {open ? <CaretDown size={10} weight="bold" /> : <CaretRight size={10} weight="bold" />}
          {node.name}
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden ml-2"
          >
            {node.children.map(child => (
              <TreeNode key={child.path} node={child} level={level + 1} />
            ))}
            {node.pages.map(page => (
              <Link
                key={page.href}
                href={page.href}
                className={`block px-3 py-1 text-xs rounded-lg transition-all truncate ${
                  isActive(page.href)
                    ? 'bg-[rgba(59,130,246,0.08)] text-[var(--accent)] font-semibold'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                {page.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SidebarNav({ data }: SidebarNavProps) {
  const [filter, setFilter] = useState('');

  return (
    <>
      <div className="relative mb-4">
        <MagnifyingGlass size={14} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
        <input
          type="search"
          placeholder="Filter contents…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>
      <nav className="space-y-0.5">
        {data.children.map(child => (
          <TreeNode key={child.path} node={child} />
        ))}
      </nav>
    </>
  );
}
