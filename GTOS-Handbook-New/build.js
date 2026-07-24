#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   GTOS Handbook — Professional Site Builder
   Converts 856 Markdown files → beautiful HTML with design system
   ═══════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const SOURCE = process.argv[2] || 'C:/Users/masou/Downloads/GTOS-Enterprise-Engineering-Handbook-Final-Edition-1.0/GTOS-Enterprise-Engineering-Handbook-Final-Edition-1.0';
const OUTPUT = process.argv[3] || __dirname;
const PAGES_OUT = path.join(OUTPUT, 'pages');

// ── Config ──
const SITE_TITLE = 'GTOS Enterprise Engineering Handbook';
const SITE_ROOT = '..'; // relative path from pages/x/y/file.html to site root

// ── Collect all markdown files ──
function collectFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!['05-DIAGRAMS','07-PDF-EDITION','09-BUILD-AND-VALIDATION'].includes(e.name)) {
        collectFiles(full, files);
      }
    } else if (e.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// ── Parse markdown tables ──
function parseTable(lines) {
  const rows = [];
  for (const line of lines) {
    if (line.match(/^\|[- :|]+\|$/)) continue; // separator
    const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
    if (cells.length) rows.push(cells);
  }
  return rows;
}

// ── Simple Markdown → HTML (no dependency version) ──
function mdToHTML(md) {
  let html = md;
  const lines = html.split('\n');

  // Process in multiple passes
  let out = [];
  let inTable = false, tableLines = [];
  let inCode = false, codeLines = [], codeLang = '';
  let inMermaid = false, mermaidLines = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Mermaid blocks
    if (line.match(/^```mermaid/)) {
      inMermaid = true; mermaidLines = [];
      out.push('<div class="mermaid-block"><div class="mermaid-toolbar"><span>Mermaid Diagram</span><button class="mermaid-toggle-code">Show Code</button></div><div class="mermaid-content"><pre class="mermaid">');
      continue;
    }
    if (inMermaid) {
      if (line.match(/^```$/)) {
        out.push('</pre></div><div class="mermaid-code"><pre><code>');
        out.push(escapeHTML(mermaidLines.join('\n')));
        out.push('</code></pre></div></div>');
        inMermaid = false;
      } else { mermaidLines.push(line); out.push(line + '\n'); }
      continue;
    }

    // Code blocks
    if (line.match(/^```(\w*)/)) {
      if (inCode) {
        out.push('</code></pre>');
        inCode = false;
      } else {
        codeLang = line.match(/^```(\w*)/)[1] || '';
        out.push('<pre><code class="language-' + codeLang + '">');
        inCode = true;
      }
      continue;
    }
    if (inCode) { out.push(line + '\n'); continue; }

    // Tables
    if (line.match(/^\|.*\|$/) && !line.match(/^\|[- :|]+\|$/)) {
      if (!inTable) { inTable = true; tableLines = []; }
      tableLines.push(line);
      continue;
    }
    if (line.match(/^\|[- :|]+\|$/)) {
      tableLines.push(line);
      continue;
    }
    if (inTable && !line.match(/^\|.*\|$/)) {
      const rows = parseTable(tableLines);
      if (rows.length > 1) {
        out.push('<div class="table-wrap"><table><thead><tr>');
        rows[0].forEach(c => out.push('<th class="table-sort">' + processInline(c) + '</th>'));
        out.push('</tr></thead><tbody>');
        for (let r = 1; r < rows.length; r++) {
          out.push('<tr>');
          rows[r].forEach(c => out.push('<td>' + processInline(c) + '</td>'));
          out.push('</tr>');
        }
        out.push('</tbody></table></div>');
      }
      inTable = false; tableLines = [];
      // Process current line too
      out.push(processLine(line));
      continue;
    }

    out.push(processLine(line));
  }

  // Clean up unclosed blocks
  if (inTable) {
    const rows = parseTable(tableLines);
    if (rows.length > 1) {
      out.push('<div class="table-wrap"><table><thead><tr>');
      rows[0].forEach(c => out.push('<th class="table-sort">' + processInline(c) + '</th>'));
      out.push('</tr></thead><tbody>');
      for (let r = 1; r < rows.length; r++) {
        out.push('<tr>');
        rows[r].forEach(c => out.push('<td>' + processInline(c) + '</td>'));
        out.push('</tr>');
      }
      out.push('</tbody></table></div>');
    }
  }

  return out.join('\n');
}

function processLine(line) {
  // Headings
  let m;
  if ((m = line.match(/^#### (.+)/))) return '<h4 id="' + slugify(m[1]) + '">' + processInline(m[1]) + ' <a href="#' + slugify(m[1]) + '" class="heading-anchor">#</a></h4>';
  if ((m = line.match(/^### (.+)/))) return '<h3 id="' + slugify(m[1]) + '">' + processInline(m[1]) + ' <a href="#' + slugify(m[1]) + '" class="heading-anchor">#</a></h3>';
  if ((m = line.match(/^## (.+)/))) return '<h2 id="' + slugify(m[1]) + '">' + processInline(m[1]) + ' <a href="#' + slugify(m[1]) + '" class="heading-anchor">#</a></h2>';
  if ((m = line.match(/^# (.+)/))) return '<h1 id="' + slugify(m[1]) + '">' + processInline(m[1]) + '</h1>';
  // HR
  if (line.match(/^---+$/)) return '<hr>';
  // Blockquote
  if (line.startsWith('> ')) return '<blockquote><p>' + processInline(line.slice(2)) + '</p></blockquote>';
  // Callouts
  if (line.match(/^\*\*⚠️/)) return '<div class="callout warning"><strong>⚠️ Warning</strong><p>' + processInline(line.replace(/^\*\*⚠️\s*/, '')) + '</p></div>';
  if (line.match(/^\*\*✅/)) return '<div class="callout success"><strong>✅ Success</strong><p>' + processInline(line.replace(/^\*\*✅\s*/, '')) + '</p></div>';
  if (line.match(/^\*\*🚫/)) return '<div class="callout danger"><strong>🚫 Critical</strong><p>' + processInline(line.replace(/^\*\*🚫\s*/, '')) + '</p></div>';
  if (line.match(/^\*\*💡/)) return '<div class="callout"><strong>💡 Note</strong><p>' + processInline(line.replace(/^\*\*💡\s*/, '')) + '</p></div>';
  if (line.match(/^\*\*📌/)) return '<div class="callout success"><strong>📌 Key Point</strong><p>' + processInline(line.replace(/^\*\*📌\s*/, '')) + '</p></div>';
  // Checklist
  if (line.match(/^-\s*\[ \]/)) return '<li class="checklist-item"><input type="checkbox" disabled> ' + processInline(line.replace(/^-\s*\[ \]\s*/, '')) + '</li>';
  if (line.match(/^-\s*\[x\]/i)) return '<li class="checklist-item"><input type="checkbox" disabled checked> ' + processInline(line.replace(/^-\s*\[x\]\s*/i, '')) + '</li>';
  // List items
  if (line.match(/^-\s/)) return '<li>' + processInline(line.replace(/^-\s/, '')) + '</li>';
  if (line.match(/^\d+\.\s/)) return '<li>' + processInline(line.replace(/^\d+\.\s/, '')) + '</li>';
  // Empty
  if (!line.trim()) return '<br>';
  // Default
  return '<p>' + processInline(line) + '</p>';
}

function processInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      if (url.endsWith('.md')) url = url.replace(/\.md$/, '.html');
      if (url.endsWith('.pdf')) return `<a href="${url}" target="_blank" rel="noopener">${text} (PDF)</a>`;
      return `<a href="${url}">${text}</a>`;
    });
}

function slugify(text) {
  return text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function escapeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Extract headings for TOC ──
function extractHeadings(md) {
  const headings = [];
  const lines = md.split('\n');
  for (const line of lines) {
    let m;
    if ((m = line.match(/^## (.+)/))) headings.push({ level: 2, text: m[1], id: slugify(m[1]) });
    else if ((m = line.match(/^### (.+)/))) headings.push({ level: 3, text: m[1], id: slugify(m[1]) });
    else if ((m = line.match(/^#### (.+)/))) headings.push({ level: 4, text: m[1], id: slugify(m[1]) });
  }
  return headings;
}

// ── Extract title from first H1 ──
function extractTitle(md) {
  const m = md.match(/^# (.+)/m);
  return m ? m[1].replace(/\*/g, '') : 'Untitled';
}

// ── Extract plain text for search ──
function extractText(md) {
  return md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\|/g, ' ')
    .replace(/[-*_`#\[\]()>]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 3000);
}

// ── Determine section from path ──
function getSection(relPath) {
  const parts = relPath.split('/');
  if (parts[0] === '00-START-HERE') return 'Start Here';
  if (parts[0] === '01-NORMATIVE-CORE') return 'Normative Core';
  if (parts[0] === '02-FOUNDATIONS') return 'Foundations';
  if (parts[0] === '03-DETAILED-VOLUMES') return 'Detailed Volumes';
  if (parts[0] === '04-DELIVERY-PLAYBOOKS') return 'Delivery Playbooks';
  if (parts[0] === '06-CATALOGUES') return 'Catalogues';
  if (parts[0] === '08-CURRENT-PROJECT-GAP-ANALYSIS') return 'Gap Analysis';
  return parts[0] || 'Handbook';
}

// ── Page Template ──
function pageTemplate(title, content, headings, breadcrumbs, section, relPath, plainText) {
  const depth = relPath.split('/').length - 1;
  const root = '../'.repeat(Math.max(0, depth)) || './';
  const tocHTML = headings.length > 2 ? `
<div class="page-toc">
  <strong>📑 Table of Contents</strong>
  <ul>${headings.map(h => `<li class="toc-level-${h.level}"><a href="#${h.id}">${h.text}</a></li>`).join('')}</ul>
</div>` : '';

  const crumbsHTML = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) return `<span>${b.text}</span>`;
    return `<a href="${root}${b.href}">${b.text}</a> <span class="sep">›</span>`;
  }).join(' ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHTML(title)} · GTOS Handbook</title>
<meta name="description" content="${escapeHTML((plainText || title).slice(0, 160))}">
<link rel="stylesheet" href="${root}assets/css/site.css">
<script defer src="${root}assets/js/nav-data.js"></script>
<script defer src="${root}assets/js/app.js"></script>
</head>
<body>
<div class="reading-progress"><div class="bar"></div></div>
<header class="topbar">
  <button class="menu-toggle">☰</button>
  <a class="brand" href="${root}index.html">
    <span class="logo-icon">G</span>
    <span><strong>GTOS</strong><small>Engineering Handbook</small></span>
  </a>
  <button class="search-trigger" onclick="openSearch()">
    <span>Search architecture, domains, APIs…</span>
    <kbd>Ctrl K</kbd>
  </button>
  <div class="top-actions">
    <a href="${root}architecture-atlas.html">Atlas</a>
    <a href="${root}pdf-library.html">PDFs</a>
    <button class="theme-toggle" onclick="toggleTheme()" title="Toggle theme">◐</button>
  </div>
</header>

<div class="app-shell">
  <aside class="sidebar">
    <div class="sidebar-head">
      <strong>Contents</strong>
      <button class="sidebar-close">×</button>
    </div>
    <input class="nav-filter" type="search" placeholder="Filter contents…">
    <nav id="handbook-nav"></nav>
  </aside>

  <main class="main-content">
    <article class="page-container">
      <nav class="breadcrumbs">${crumbsHTML}</nav>
      <header class="page-header">
        <div class="status-row">
          <span class="status-badge info">${section}</span>
        </div>
        <h1>${title}</h1>
      </header>
      ${tocHTML}
      <div class="prose">
        ${content}
      </div>
      <nav class="page-nav">
        <a class="prev" href="${root}index.html"><span>←</span> <strong>Back to Home</strong></a>
        <a class="next" href="${root}architecture-atlas.html"><strong>Architecture Atlas</strong> <span>→</span></a>
      </nav>
    </article>
  </main>
</div>

<!-- Search Modal -->
<div class="search-modal" aria-hidden="true">
  <div class="search-panel">
    <div class="search-bar">
      <input type="search" placeholder="Search across the complete handbook…">
      <button class="search-close" onclick="closeSearch()">×</button>
    </div>
    <div class="search-meta">Type to search across all 850+ handbook pages.</div>
    <div class="search-results"></div>
  </div>
</div>

<!-- Diagram Modal -->
<div class="diagram-modal" aria-hidden="true">
  <button class="diagram-modal-close" onclick="closeDiagramModal()">×</button>
  <div class="diagram-modal-content"></div>
</div>

<footer class="site-footer">
  <span>GTOS Enterprise Engineering Handbook · Edition 1.0</span>
  <span>Target Architecture & Implementation Guide</span>
</footer>
</body>
</html>`;
}

// ── Build Navigation Tree ──
function buildNavTree(files, sourceDir) {
  const tree = { name: 'Handbook', path: '', children: [], pages: [] };
  const dirMap = { '': tree };

  for (const f of files.sort()) {
    const rel = path.relative(sourceDir, f).replace(/\\/g, '/');
    const parts = rel.split('/');
    const fileName = parts.pop();
    const dirPath = parts.join('/');

    // Ensure directory nodes exist
    let current = '';
    for (const part of parts) {
      const parent = current;
      current = current ? current + '/' + part : part;
      if (!dirMap[current]) {
        const node = { name: formatName(part), path: current, children: [], pages: [] };
        dirMap[current] = node;
        const parentNode = dirMap[parent];
        if (parentNode) {
          if (!parentNode.children.find(c => c.path === current)) {
            parentNode.children.push(node);
          }
        }
      }
    }

    const title = extractTitle(fs.readFileSync(f, 'utf-8'));
    const href = '/pages/' + rel.replace(/\.md$/, '.html');
    const page = { title, href, section: getSection(rel) };
    const parentNode = dirMap[dirPath];
    if (parentNode) parentNode.pages.push(page);
  }

  // Sort children and pages
  function sortNode(node) {
    node.children.sort((a, b) => a.name.localeCompare(b.name));
    node.pages.sort((a, b) => a.title.localeCompare(b.title));
    node.children.forEach(sortNode);
  }
  sortNode(tree);
  return tree;
}

function formatName(name) {
  return name
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Main Build ──
function build() {
  console.log('🔨 GTOS Handbook — Professional Site Builder\n');
  console.log('Source:', SOURCE);
  console.log('Output:', OUTPUT);

  // Collect files
  const allFiles = collectFiles(SOURCE);
  console.log(`\n📄 Found ${allFiles.length} Markdown files`);

  // Ensure output directories
  fs.mkdirSync(PAGES_OUT, { recursive: true });

  // Build nav tree
  console.log('🌳 Building navigation tree...');
  const navTree = buildNavTree(allFiles, SOURCE);
  const navJSON = JSON.stringify(navTree);

  // Build search index
  console.log('🔍 Building search index...');
  const searchIndex = [];

  // Process each file
  let processed = 0;
  const startTime = Date.now();

  for (const file of allFiles) {
    const rel = path.relative(SOURCE, file).replace(/\\/g, '/');
    const md = fs.readFileSync(file, 'utf-8');
    const title = extractTitle(md);
    const section = getSection(rel);
    const plainText = extractText(md);
    const htmlContent = mdToHTML(md);
    const headings = extractHeadings(md);

    // Build breadcrumbs
    const parts = rel.split('/');
    const fileName = parts.pop();
    const breadcrumbs = [{ text: 'Home', href: 'index.html' }];
    let accum = '';
    for (let i = 0; i < parts.length; i++) {
      accum += (accum ? '/' : '') + parts[i];
      breadcrumbs.push({ text: formatName(parts[i]), href: 'pages/' + accum + '/index.html' });
    }
    breadcrumbs.push({ text: title, href: 'pages/' + rel.replace(/\.md$/, '.html') });

    // Generate page
    const fullHTML = pageTemplate(title, htmlContent, headings, breadcrumbs, section, 'pages/' + rel, plainText);

    // Write file
    const outPath = path.join(PAGES_OUT, rel.replace(/\.md$/, '.html'));
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, fullHTML, 'utf-8');

    // Add to search index
    searchIndex.push({
      title,
      href: '/pages/' + rel.replace(/\.md$/, '.html'),
      section,
      text: extractText(md)
    });

    processed++;
    if (processed % 100 === 0) console.log(`  ${processed}/${allFiles.length} pages...`);
  }

  // Write nav data
  fs.writeFileSync(
    path.join(OUTPUT, 'assets/js/nav-data.js'),
    'window.GTOS_NAV=' + navJSON + ';',
    'utf-8'
  );

  // Write search index
  fs.writeFileSync(
    path.join(OUTPUT, 'assets/js/search-index.js'),
    'window.GTOS_SEARCH=' + JSON.stringify(searchIndex) + ';',
    'utf-8'
  );

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ Build complete: ${processed} pages in ${elapsed}s`);
  console.log(`📊 Search index: ${searchIndex.length} entries`);
  console.log(`🌳 Navigation: ${navJSON.length.toLocaleString()} bytes`);
  console.log(`\n📂 Output: ${OUTPUT}`);
  console.log('💡 Run: python -m http.server 8080');
}

// ── Run ──
build();
