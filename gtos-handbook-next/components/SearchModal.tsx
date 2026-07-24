'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

interface SearchItem {
  title: string;
  section: string;
  href: string;
  excerpt: string;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [searchIndex, setSearchIndex] = useState<SearchItem[]>([]);

  // Load search index
  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => setSearchIndex(data))
      .catch(() => {
        // Fallback to global variable
        if (typeof window !== 'undefined' && (window as any).__GTOS_SEARCH__) {
          setSearchIndex((window as any).__GTOS_SEARCH__);
        }
      });
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open ? onClose() : document.dispatchEvent(new CustomEvent('open-search'));
      }
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Search
  useEffect(() => {
    if (!query.trim() || searchIndex.length === 0) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const q = query.toLowerCase().split(/\s+/).filter(Boolean);
      const filtered = searchIndex
        .filter((item) => {
          const haystack = `${item.title} ${item.section} ${item.excerpt}`.toLowerCase();
          return q.every((word) => haystack.includes(word));
        })
        .slice(0, 30);
      setResults(filtered);
    }, 150);
    return () => clearTimeout(timer);
  }, [query, searchIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="search-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="search-panel"
          >
            <div className="flex items-center border-b border-[var(--border-default)]">
              <MagnifyingGlass size={20} weight="bold" className="ml-5 text-[var(--text-tertiary)]" />
              <input
                className="search-input"
                placeholder="Search architecture, domains, APIs, workflows…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button onClick={onClose} className="p-4 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                <X size={20} weight="bold" />
              </button>
            </div>
            <div className="px-5 py-2 text-xs text-[var(--text-tertiary)]">
              {results.length
                ? `${results.length} result${results.length !== 1 ? 's' : ''}`
                : query
                  ? 'No results found'
                  : `Type to search across ${searchIndex.length.toLocaleString()}+ pages`}
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-3 pb-4">
              {results.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  {item.section && <span className="badge badge-info mb-1">{item.section}</span>}
                  <div className="font-semibold text-sm text-[var(--text-primary)]">{item.title}</div>
                  <div className="text-xs text-[var(--text-tertiary)] mt-0.5 line-clamp-2">
                    {highlightMatches(item.excerpt.slice(0, 200), query)}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function highlightMatches(text: string, query: string) {
  if (!query) return text;
  const words = query.split(/\s+/).filter(Boolean);
  let result = text;
  words.forEach((w) => {
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(
      new RegExp(`(${escaped})`, 'gi'),
      '<mark class="bg-[rgba(59,130,246,0.2)] text-[var(--accent)] rounded-sm px-0.5">$1</mark>',
    );
  });
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}
