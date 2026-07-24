import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/ContentShell';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { parseMarkdown, getReadingTime, formatSectionName } from '@/lib/markdown';

const SOURCE_DIR = path.join(process.cwd(), 'source');

// ── Collect all slugs for static generation ──────────────────

function getAllSlugs(): string[][] {
  const results: string[][] = [];

  function walk(dir: string, parts: string[] = []) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...parts, entry.name]);
      } else if (entry.name.endsWith('.md')) {
        results.push([...parts, entry.name.replace(/\.md$/, '')]);
      }
    }
  }

  walk(SOURCE_DIR);
  return results;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ── Find source file from slug ───────────────────────────────

function findSourceFile(slug: string[]): string | null {
  const slugPath = slug.join('/');
  const directPath = path.join(SOURCE_DIR, `${slugPath}.md`);

  if (fs.existsSync(directPath)) return directPath;

  // Try case-insensitive match
  const dir = path.dirname(directPath);
  const base = path.basename(directPath);

  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    const match = files.find(
      (f) => f.toLowerCase() === base.toLowerCase() && f.endsWith('.md')
    );
    if (match) return path.join(dir, match);
  }

  return null;
}

// ── Generate breadcrumbs from slug ───────────────────────────

function generateBreadcrumbs(slug: string[]): { label: string; href?: string }[] {
  const crumbs: { label: string; href?: string }[] = [
    { label: 'Home', href: '/' },
  ];

  let accumulated = '';
  for (let i = 0; i < slug.length; i++) {
    accumulated += '/' + slug[i];
    crumbs.push({
      label: formatSectionName(slug[i]),
      href: i < slug.length - 1 ? `/content${accumulated}` : undefined,
    });
  }

  return crumbs;
}

// ── Get adjacent pages for prev/next ─────────────────────────

function getAdjacentPages(
  currentSlug: string[]
): {
  prevPage?: { title: string; href: string };
  nextPage?: { title: string; href: string };
} {
  const allSlugs = getAllSlugs();
  const currentPath = currentSlug.join('/');

  const flatList = allSlugs.map((s) => ({
    slug: s,
    path: s.join('/'),
  }));

  // Sort by path for logical ordering
  flatList.sort((a, b) => a.path.localeCompare(b.path));

  const idx = flatList.findIndex((item) => item.path === currentPath);

  if (idx === -1) return {};

  const result: any = {};

  if (idx > 0) {
    const prev = flatList[idx - 1];
    result.prevPage = {
      title: formatSectionName(prev.slug[prev.slug.length - 1]),
      href: `/content/${prev.path}`,
    };
  }

  if (idx < flatList.length - 1) {
    const next = flatList[idx + 1];
    result.nextPage = {
      title: formatSectionName(next.slug[next.slug.length - 1]),
      href: `/content/${next.path}`,
    };
  }

  return result;
}

// ── Page component ───────────────────────────────────────────

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Find the source file
  const filePath = findSourceFile(slug);
  if (!filePath) return notFound();

  // Read and parse the markdown
  const rawMd = fs.readFileSync(filePath, 'utf-8');
  const parsed = parseMarkdown(rawMd);

  const breadcrumbs = generateBreadcrumbs(slug);
  const { prevPage, nextPage } = getAdjacentPages(slug);
  const readingTime = getReadingTime(parsed.wordCount);

  // Determine the section name from the first slug segment
  const sectionName = slug.length > 0 ? formatSectionName(slug[0]) : 'Handbook';

  return (
    <ContentShell>
      <article className="max-w-3xl mx-auto">
        {/* ── Page Hero ── */}
        <header className="chapter-hero mb-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 mb-4 text-xs text-[var(--text-tertiary)] overflow-x-auto" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 shrink-0">
                {i > 0 && <span className="text-[var(--border-default)]">›</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[var(--text-primary)] font-medium">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Title */}
          <h1 className="text-chapter text-[var(--text-primary)] mb-3 tracking-tight">
            {parsed.title}
          </h1>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-tertiary)]">
            <span className="font-semibold px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)]">
              {sectionName}
            </span>
            <span>{parsed.wordCount.toLocaleString()} words</span>
            <span>{readingTime}</span>
            {parsed.metadata?.['Status'] && (
              <span className="px-2.5 py-1 rounded-full bg-[rgba(59,130,246,0.08)] text-[var(--accent)] font-medium">
                {parsed.metadata['Status'].replace(/`/g, '')}
              </span>
            )}
          </div>
        </header>

        {/* ── Main Content ── */}
        <div className="prose prose-slate max-w-none">
          <MarkdownRenderer
            sections={parsed.sections}
            metadata={parsed.metadata}
          />
        </div>

        {/* ── Content Preview Note ── */}
        <div className="mt-16 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            GTOS Enterprise Engineering Handbook · {parsed.wordCount.toLocaleString()} words · {parsed.sections.length} sections
          </p>
        </div>

        {/* ── Previous / Next Navigation ── */}
        {(prevPage || nextPage) && (
          <nav className="mt-12 grid grid-cols-2 gap-4" aria-label="Page navigation">
            {prevPage ? (
              <a
                href={prevPage.href}
                className="group p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--accent)] hover:bg-[rgba(59,130,246,0.02)] transition-all"
              >
                <span className="text-xs text-[var(--text-tertiary)]">← Previous</span>
                <span className="block mt-1 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {prevPage.title}
                </span>
              </a>
            ) : (
              <div />
            )}
            {nextPage ? (
              <a
                href={nextPage.href}
                className="group p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--accent)] hover:bg-[rgba(59,130,246,0.02)] transition-all text-right"
              >
                <span className="text-xs text-[var(--text-tertiary)]">Next →</span>
                <span className="block mt-1 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {nextPage.title}
                </span>
              </a>
            ) : (
              <div />
            )}
          </nav>
        )}
      </article>
    </ContentShell>
  );
}

// ── Revalidation config ──────────────────────────────────────

export const revalidate = false; // static pages only
