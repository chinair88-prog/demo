'use client';

import React from 'react';
import type { MarkdownSection } from '@/lib/markdown';
import { PremiumTable } from '@/components/tables/PremiumTable';
import { CodeBlock } from '@/components/content/CodeBlock';
import { CalloutBlock } from '@/components/content/CalloutBlock';
import { DiagramBlock } from '@/components/content/DiagramBlock';

interface MarkdownRendererProps {
  sections: MarkdownSection[];
  metadata?: Record<string, string>;
}

export function MarkdownRenderer({ sections, metadata }: MarkdownRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-20 text-[var(--text-tertiary)]">
        <p className="text-lg">No content available for this page.</p>
      </div>
    );
  }

  return (
    <div className="prose-content">
      {metadata && Object.keys(metadata).length > 0 && (
        <div className="mb-12 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)]">
          <h3 className="text-xs font-extrabold tracking-widest uppercase text-[var(--text-tertiary)] mb-4">
            Page Metadata
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="flex gap-2 text-sm">
                <dt className="font-semibold text-[var(--text-secondary)] shrink-0">{key}:</dt>
                <dd className="text-[var(--text-tertiary)] truncate" title={value}>
                  {value.startsWith('`') && value.endsWith('`') ? (
                    <code className="code-inline">{value.replace(/`/g, '')}</code>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {sections.map((section, idx) => (
        <SectionRenderer key={idx} section={section} />
      ))}
    </div>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function SectionRenderer({ section }: { section: MarkdownSection }) {
  const { type } = section;

  if (type === 'heading') {
    const sizeClasses: Record<number, string> = {
      2: 'text-chapter text-[var(--text-primary)] mt-16 mb-4 pb-3 border-b border-[var(--border-default)]',
      3: 'text-2xl font-bold text-[var(--text-primary)] mt-10 mb-3',
      4: 'text-lg font-semibold text-[var(--text-primary)] mt-8 mb-2',
    };
    const cls = sizeClasses[section.depth] || sizeClasses[4];
    return (
      <div className="heading-group">
        {section.depth === 2 && (
          <h2 id={section.id} className={`${cls} scroll-mt-20 group`}>
            <span>{section.text}</span>
            <a href={`#${section.id}`} className="heading-anchor ml-2 opacity-0 group-hover:opacity-100 text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-all text-sm no-underline" aria-label={`Link to ${section.text}`}>#</a>
          </h2>
        )}
        {section.depth === 3 && (
          <h3 id={section.id} className={`${cls} scroll-mt-20 group`}>
            <span>{section.text}</span>
            <a href={`#${section.id}`} className="heading-anchor ml-2 opacity-0 group-hover:opacity-100 text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-all text-sm no-underline" aria-label={`Link to ${section.text}`}>#</a>
          </h3>
        )}
        {section.depth === 4 && (
          <h4 id={section.id} className={`${cls} scroll-mt-20 group`}>
            <span>{section.text}</span>
            <a href={`#${section.id}`} className="heading-anchor ml-2 opacity-0 group-hover:opacity-100 text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-all text-sm no-underline" aria-label={`Link to ${section.text}`}>#</a>
          </h4>
        )}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="my-8">
        <PremiumTable
          columns={section.headers.map((h) => ({ key: slugify(h), label: h }))}
          data={section.rows.map((row) => {
            const obj: Record<string, any> = {};
            section.headers.forEach((h, i) => {
              obj[slugify(h)] = row[i] || '';
            });
            return obj;
          })}
          caption={section.isMetadata ? 'Metadata' : undefined}
        />
      </div>
    );
  }

  if (type === 'code') {
    return (
      <div className="my-8">
        <CodeBlock code={section.code} language={section.language || 'text'} filename={section.filename} />
      </div>
    );
  }

  if (type === 'callout') {
    return (
      <div className="my-6">
        <CalloutBlock type={section.calloutType}>
          <div dangerouslySetInnerHTML={{ __html: section.html }} />
        </CalloutBlock>
      </div>
    );
  }

  if (type === 'list') {
    const ListTag = section.ordered ? 'ol' : 'ul';
    const listClass = section.ordered
      ? 'my-4 pl-6 space-y-1.5 list-decimal text-[var(--text-secondary)]'
      : 'my-4 pl-6 space-y-1.5 list-disc text-[var(--text-secondary)]';
    return (
      <ListTag className={listClass}>
        {section.items.map((item, i) => (
          <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ListTag>
    );
  }

  if (type === 'hr') {
    return <hr className="section-divider my-12" />;
  }

  if (type === 'image') {
    return (
      <div className="my-8">
        <DiagramBlock src={section.src} alt={section.alt} caption={section.caption} />
      </div>
    );
  }

  if (type === 'paragraph') {
    return (
      <p
        className="my-3 text-[var(--text-secondary)] leading-relaxed text-[15px]"
        dangerouslySetInnerHTML={{ __html: section.html }}
      />
    );
  }

  return null;
}
