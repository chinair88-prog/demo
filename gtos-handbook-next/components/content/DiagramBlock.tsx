'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowsOut, X } from '@phosphor-icons/react';

interface DiagramBlockProps {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}

export function DiagramBlock({ src, alt, caption, wide }: DiagramBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <figure className={`diagram-card my-8 ${wide ? 'col-span-full' : ''}`}>
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-default)] bg-[var(--bg-secondary)]">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">{alt}</span>
          <button
            onClick={() => setExpanded(true)}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-all"
            title="Expand diagram"
          >
            <ArrowsOut size={16} weight="bold" />
          </button>
        </div>
        <div className="p-6 flex justify-center bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-secondary)]">
          <img src={src} alt={alt} className="max-w-full max-h-[500px] object-contain" loading="lazy" />
        </div>
        {caption && (
          <figcaption className="px-4 py-3 border-t border-[var(--border-default)] text-xs text-[var(--text-tertiary)]">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setExpanded(false)}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-6 right-6 p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X size={24} weight="bold" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="max-w-[95vw] max-h-[90vh] overflow-auto rounded-3xl bg-[var(--bg-surface)] p-8"
              onClick={e => e.stopPropagation()}
            >
              <img src={src} alt={alt} className="max-w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
