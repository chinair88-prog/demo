/**
 * GTOS Markdown Processing Pipeline
 *
 * Parses source markdown files into structured JSON sections,
 * which are then rendered by MarkdownRenderer into premium React components.
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { visit } from 'unist-util-visit';
import type { Root, Content } from 'mdast';

// ── Section types ────────────────────────────────────────────

export interface TableSection {
  type: 'table';
  headers: string[];
  rows: string[][];
  isMetadata?: boolean;
}

export interface CodeSection {
  type: 'code';
  language: string;
  code: string;
  filename?: string;
}

export interface HeadingSection {
  type: 'heading';
  depth: number; // 2 = h2, 3 = h3, 4 = h4
  id: string;
  text: string;
}

export interface ParagraphSection {
  type: 'paragraph';
  html: string;
}

export interface ListSection {
  type: 'list';
  ordered: boolean;
  items: string[];
}

export interface CalloutSection {
  type: 'callout';
  calloutType: 'info' | 'warning' | 'success' | 'danger' | 'tip';
  html: string;
}

export interface HRSection {
  type: 'hr';
}

export interface ImageSection {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export type MarkdownSection =
  | TableSection
  | CodeSection
  | HeadingSection
  | ParagraphSection
  | ListSection
  | CalloutSection
  | HRSection
  | ImageSection;

export interface ParsedMarkdown {
  title: string;
  section: string;
  metadata: Record<string, string>;
  sections: MarkdownSection[];
  wordCount: number;
}

// ── Slug generation ──────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s؀-ۿ-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ── Inline markdown → HTML ──────────────────────────────────

function processInline(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="code-inline">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="prose-link">$1</a>')
    // Images (inline)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" class="prose-image" />')
    .trim();
}

// ── Callout detection ────────────────────────────────────────

function detectCalloutType(text: string): CalloutSection['calloutType'] | null {
  const lower = text.toLowerCase();
  if (lower.includes('⚠') || lower.includes('warning') || lower.includes('caution') || lower.includes('important')) return 'warning';
  if (lower.includes('❌') || lower.includes('danger') || lower.includes('critical') || lower.includes('prohibited') || lower.includes('never')) return 'danger';
  if (lower.includes('✅') || lower.includes('success') || lower.includes('correct') || lower.includes('recommended')) return 'success';
  if (lower.includes('💡') || lower.includes('tip') || lower.includes('note:') || lower.includes('pro tip')) return 'tip';
  if (lower.includes('ℹ') || lower.includes('info') || lower.includes('note')) return 'info';
  return null;
}

// ── Main parser ──────────────────────────────────────────────

export function parseMarkdown(rawMd: string): ParsedMarkdown {
  // Parse frontmatter
  const { data, content } = matter(rawMd);
  const title = data.title || '';
  const section = data.section || 'Handbook';

  const sections: MarkdownSection[] = [];
  const metadata: Record<string, string> = {};

  // Parse markdown to AST
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(content);

  // Process each top-level node
  const children = tree.children;
  let i = 0;

  while (i < children.length) {
    const node = children[i];

    // ── Headings ──
    if (node.type === 'heading') {
      const text = extractText(node);
      // Skip h1 (title is in frontmatter)
      if (node.depth >= 2 && node.depth <= 4) {
        sections.push({
          type: 'heading',
          depth: node.depth,
          id: slugify(text),
          text,
        });
      }
      i++;
      continue;
    }

    // ── Tables ──
    if (node.type === 'table') {
      const tableData = extractTable(node);
      if (tableData) {
        // Detect metadata tables (two columns, first row often "Metadata" or similar)
        const isMetadata =
          tableData.headers.length === 2 &&
          tableData.rows.length > 0 &&
          (tableData.headers[0]?.toLowerCase().includes('metadata') ||
            tableData.headers[0]?.toLowerCase().includes('key') ||
            tableData.headers[0]?.toLowerCase().includes('field'));

        if (isMetadata) {
          // Store metadata for the header display
          for (const row of tableData.rows) {
            if (row.length >= 2) {
              metadata[row[0]] = row[1];
            }
          }
          // Also add as table section with metadata flag
          sections.push({ ...tableData, isMetadata: true });
        } else {
          sections.push(tableData);
        }
      }
      i++;
      continue;
    }

    // ── Code blocks ──
    if (node.type === 'code') {
      sections.push({
        type: 'code',
        language: node.lang || 'text',
        code: node.value,
      });
      i++;
      continue;
    }

    // ── Blockquotes → Callouts ──
    if (node.type === 'blockquote') {
      const html = extractHTML(node);
      const calloutType = detectCalloutType(html);
      sections.push({
        type: 'callout',
        calloutType: calloutType || 'info',
        html,
      });
      i++;
      continue;
    }

    // ── Lists ──
    if (node.type === 'list') {
      const items: string[] = [];
      for (const item of node.children) {
        const text = extractText(item);
        if (text) items.push(processInline(text));
      }
      sections.push({
        type: 'list',
        ordered: node.ordered || false,
        items,
      });
      i++;
      continue;
    }

    // ── Thematic break (hr) ──
    if (node.type === 'thematicBreak') {
      sections.push({ type: 'hr' });
      i++;
      continue;
    }

    // ── Paragraphs ──
    if (node.type === 'paragraph') {
      const html = processInline(extractHTML(node));
      if (html) {
        sections.push({ type: 'paragraph', html });
      }
      i++;
      continue;
    }

    // ── Images ──
    if (node.type === 'image') {
      sections.push({
        type: 'image',
        src: node.url,
        alt: node.alt || '',
        caption: node.title || undefined,
      });
      i++;
      continue;
    }

    // Default: skip unknown nodes
    i++;
  }

  // Calculate word count
  const allText = sections
    .map((s) => {
      if (s.type === 'paragraph') return s.html;
      if (s.type === 'heading') return s.text;
      if (s.type === 'list') return s.items.join(' ');
      if (s.type === 'code') return s.code;
      if (s.type === 'callout') return s.html;
      if (s.type === 'table') return [...s.headers, ...s.rows.flat()].join(' ');
      return '';
    })
    .join(' ');
  const wordCount = allText.split(/\s+/).filter(Boolean).length;

  return { title, section, metadata, sections, wordCount };
}

// ── AST helpers ──────────────────────────────────────────────

function extractText(node: Content): string {
  let text = '';
  visit(node as any, 'text', (n: any) => {
    text += n.value;
  });
  // Also handle inline code
  visit(node as any, 'inlineCode', (n: any) => {
    text += n.value;
  });
  return text.trim();
}

function extractHTML(node: Content): string {
  let html = '';

  function walk(n: any) {
    if (n.type === 'text') {
      html += n.value;
    } else if (n.type === 'inlineCode') {
      html += `<code class="code-inline">${escapeHTML(n.value)}</code>`;
    } else if (n.type === 'strong') {
      html += '<strong>';
      if (n.children) n.children.forEach(walk);
      html += '</strong>';
    } else if (n.type === 'emphasis') {
      html += '<em>';
      if (n.children) n.children.forEach(walk);
      html += '</em>';
    } else if (n.type === 'link') {
      html += `<a href="${n.url}" class="prose-link">`;
      if (n.children) n.children.forEach(walk);
      html += '</a>';
    } else if (n.type === 'image') {
      html += `<img src="${n.url}" alt="${n.alt || ''}" loading="lazy" class="prose-image" />`;
    } else if (n.type === 'delete') {
      html += '<del>';
      if (n.children) n.children.forEach(walk);
      html += '</del>';
    } else if (n.type === 'paragraph' || n.type === 'blockquote') {
      if (n.children) n.children.forEach(walk);
    } else if (n.type === 'break') {
      html += '<br />';
    } else if (n.type === 'list') {
      const tag = n.ordered ? 'ol' : 'ul';
      html += `<${tag}>`;
      if (n.children) n.children.forEach(walk);
      html += `</${tag}>`;
    } else if (n.type === 'listItem') {
      html += '<li>';
      if (n.children) n.children.forEach(walk);
      html += '</li>';
    } else if (n.type === 'html') {
      html += n.value;
    } else if (n.children) {
      n.children.forEach(walk);
    }
  }

  walk(node);
  return html;
}

function extractTable(node: any): { type: 'table'; headers: string[]; rows: string[][] } | null {
  try {
    const headers: string[] = [];
    const rows: string[][] = [];

    for (const row of node.children) {
      const cells: string[] = [];
      for (const cell of row.children) {
        cells.push(extractHTML(cell).replace(/<[^>]+>/g, '').trim());
      }
      if (headers.length === 0) {
        headers.push(...cells);
      } else {
        rows.push(cells);
      }
    }

    return { type: 'table', headers, rows };
  } catch {
    return null;
  }
}

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Utility: get reading time ────────────────────────────────

export function getReadingTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

// ── Section name formatter ───────────────────────────────────

export function formatSectionName(dirname: string): string {
  return dirname
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();
}
