/**
 * Navigation Data Generator
 *
 * Walks the source/ directory tree, extracts titles from frontmatter,
 * and builds a hierarchical navigation JSON for the sidebar.
 */

const fs = require('fs');
const path = require('path');
const SOURCE_DIR = './source';
const OUTPUT = './public/nav-data.json';

function formatName(name) {
  return name
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Try frontmatter title first
    const fmMatch = content.match(/^---\s*\ntitle:\s*"(.+?)"/m);
    if (fmMatch) return fmMatch[1];
    // Fall back to first H1
    const h1Match = content.match(/^#\s+(.+)/m);
    if (h1Match) return h1Match[1];
    // Fall back to filename
    return formatName(path.basename(filePath, '.md'));
  } catch {
    return formatName(path.basename(filePath, '.md'));
  }
}

function walk(dir) {
  const result = { children: [], pages: [] };
  if (!fs.existsSync(dir)) return result;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));

  // Process files
  for (const f of files) {
    const fullPath = path.join(dir, f.name);
    const title = extractTitle(fullPath);
    const slug = path
      .relative(SOURCE_DIR, fullPath)
      .replace(/\.md$/, '')
      .replace(/\\/g, '/');
    result.pages.push({
      title,
      href: '/content/' + slug,
      section: '',
    });
  }

  // Process directories recursively
  for (const d of dirs) {
    const child = walk(path.join(dir, d.name));
    if (child.children.length > 0 || child.pages.length > 0) {
      child.name = formatName(d.name);
      child.path = path.relative(SOURCE_DIR, path.join(dir, d.name)).replace(/\\/g, '/');
      result.children.push(child);
    }
  }

  // Sort: children alphabetically, pages alphabetically
  result.children.sort((a, b) => a.name.localeCompare(b.name));
  result.pages.sort((a, b) => a.title.localeCompare(b.title));

  return result;
}

// ── Build ────────────────────────────────────────────────────

const tree = walk(SOURCE_DIR);
tree.name = 'Handbook';
tree.path = '';

fs.writeFileSync(OUTPUT, JSON.stringify(tree, null, 2));
console.log(`Nav data generated: ${tree.children.length} top-level sections`);

function count(n) {
  return n.pages.length + n.children.reduce((s, c) => s + count(c), 0);
}
console.log(`Total pages: ${count(tree)}`);
