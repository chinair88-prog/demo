import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ContentMeta {
  title: string;
  section: string;
  status?: string;
  slug: string;
  href: string;
  excerpt: string;
}

// Get all content pages metadata
export function getAllContent(): ContentMeta[] {
  const results: ContentMeta[] = [];
  walkDir(CONTENT_DIR, results);
  return results;
}

function walkDir(dir: string, results: ContentMeta[]) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, results);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const raw = fs.readFileSync(full, 'utf-8');
      const title = extractTitle(raw);
      const relativePath = path.relative(CONTENT_DIR, full).replace(/\\/g, '/');
      results.push({
        title,
        section: getSection(relativePath),
        slug: relativePath.replace(/\.(md|mdx)$/, ''),
        href: `/content/${relativePath.replace(/\.(md|mdx)$/, '')}`,
        excerpt: extractExcerpt(raw),
      });
    }
  }
}

function extractTitle(md: string): string {
  const match = md.match(/^# (.+)/m);
  return match ? match[1].replace(/\*/g, '').trim() : 'Untitled';
}

function extractExcerpt(md: string): string {
  return md
    .replace(/^#.*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#*`\[\]()>|_-]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 200);
}

function getSection(relPath: string): string {
  const parts = relPath.split('/');
  if (parts[0] === '00-START-HERE') return 'Start Here';
  if (parts[0] === '01-NORMATIVE-CORE') return 'Normative Core';
  if (parts[0] === '02-FOUNDATIONS') return 'Foundations';
  if (parts[0] === '03-DETAILED-VOLUMES') return 'Detailed Volumes';
  if (parts[0] === '04-DELIVERY-PLAYBOOKS') return 'Delivery Playbooks';
  if (parts[0] === '08-CURRENT-PROJECT-GAP-ANALYSIS') return 'Gap Analysis';
  return 'Handbook';
}
