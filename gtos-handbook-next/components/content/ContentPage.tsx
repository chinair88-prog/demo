'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, List } from '@phosphor-icons/react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ContentPageProps {
  title: string;
  section: string;
  status?: string;
  breadcrumbs: { label: string; href?: string }[];
  toc?: TOCItem[];
  children: React.ReactNode;
  prevPage?: { title: string; href: string };
  nextPage?: { title: string; href: string };
}

export function ContentPage({
  title, section, status, breadcrumbs, toc, children, prevPage, nextPage
}: ContentPageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <article ref={ref} className="max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <motion.nav
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] mb-8 flex-wrap"
      >
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="opacity-30">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-[var(--accent)] transition-colors">{crumb.label}</Link>
            ) : (
              <span className="text-[var(--text-secondary)] font-medium">{crumb.label}</span>
            )}
          </span>
        ))}
      </motion.nav>

      {/* Chapter Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } }
        }}
        className="mb-12"
      >
        {status && (
          <motion.span
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            className={`badge mb-4 ${
              status === 'normative' ? 'badge-success' :
              status === 'reference' ? 'badge-info' :
              status === 'gap' ? 'badge-warning' : 'badge-purple'
            }`}
          >
            {status}
          </motion.span>
        )}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          className="text-chapter text-[var(--text-primary)]"
        >
          {title}
        </motion.h1>
        {section && (
          <motion.p
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            className="text-sm text-[var(--text-tertiary)] mt-3 font-medium"
          >
            {section}
          </motion.p>
        )}
      </motion.div>

      {/* Content Layout with TOC */}
      <div className={toc && toc.length > 2 ? 'lg:grid lg:grid-cols-[1fr_220px] lg:gap-16' : ''}>
        {/* Main Content */}
        <div className="prose-content min-w-0">
          {children}
        </div>

        {/* Floating TOC */}
        {toc && toc.length > 2 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <List size={14} weight="bold" className="text-[var(--text-tertiary)]" />
                <span className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-widest">On this page</span>
              </div>
              <nav className="space-y-0">
                {toc.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="toc-link"
                    style={{ paddingLeft: `${8 + (item.level - 2) * 12}px` }}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>

      {/* Page Navigation */}
      {(prevPage || nextPage) && (
        <nav className="flex justify-between gap-4 mt-20 pt-8 border-t border-[var(--border-default)]">
          {prevPage ? (
            <Link href={prevPage.href} className="flex-1 group p-4 rounded-2xl border border-[var(--border-default)] hover:border-[var(--accent)] hover:shadow-md transition-all">
              <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)] mb-1">
                <ArrowLeft size={12} weight="bold" /> Previous
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {prevPage.title}
              </span>
            </Link>
          ) : <div />}
          {nextPage ? (
            <Link href={nextPage.href} className="flex-1 text-right group p-4 rounded-2xl border border-[var(--border-default)] hover:border-[var(--accent)] hover:shadow-md transition-all">
              <span className="flex items-center justify-end gap-1 text-xs text-[var(--text-tertiary)] mb-1">
                Next <ArrowRight size={12} weight="bold" />
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {nextPage.title}
              </span>
            </Link>
          ) : <div />}
        </nav>
      )}
    </article>
  );
}
