/**
 * Search Index Generator
 *
 * Walks the source/ directory, extracts text content from each markdown file,
 * and builds a JSON search index for client-side full-text search.
 */

const fs = require('fs');
const path = require('path');
const SOURCE_DIR = './source';
const OUTPUT = './public/search-index.json';

function extractText(md) {
  return md
    .replace(/^---[\s\S]*?---/, '') // remove frontmatter
    .replace(/^#\s+.*$/gm, '') // remove headings
    .replace(/\|/g, ' ') // remove table pipes
    .replace(/`{3}[\s\S]*?`{3}/g, ' ') // remove code blocks
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/[*#>_~-]+/g, ' ') // formatting chars
    .replace(/\s+/g, ' ')
    .trim();
}

function formatName(name) {
  return name.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim();
}

function walk(dir) {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      entries.push(...walk(path.join(dir, item.name)));
    } else if (item.name.endsWith('.md')) {
      const fullPath = path.join(dir, item.name);
      const content = fs.readFileSync(fullPath, 'utf-8');

      // Extract title
      const fmMatch = content.match(/^---\s*\ntitle:\s*"(.+?)"/m);
      let title = fmMatch ? fmMatch[1] : formatName(item.name.replace('.md', ''));

      // Extract section
      const sectionMatch = content.match(/section:\s*"(.+)"/m);
      const section = sectionMatch ? sectionMatch[1] : '';

      // Extract text for search
      const textContent = extractText(content);
      const excerpt = textContent.slice(0, 500);

      // Build slug
      const slug = path.relative(SOURCE_DIR, fullPath).replace(/\.md$/, '').replace(/\\/g, '/');

      entries.push({
        title,
        section,
        href: '/content/' + slug,
        excerpt,
      });
    }
  }

  return entries;
}

const index = walk(SOURCE_DIR);
fs.writeFileSync(OUTPUT, JSON.stringify(index));
console.log(`Search index generated: ${index.length} entries`);
console.log(`Output: ${OUTPUT} (${(fs.statSync(OUTPUT).size / 1024).toFixed(0)} KB)`);
