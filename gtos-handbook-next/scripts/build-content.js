#!/usr/bin/env node
/**
 * GTOS Handbook — Content Builder
 * Converts markdown source files → MDX content pages for Next.js
 */
const fs = require('fs');
const path = require('path');

const SOURCE = process.argv[2] || 'C:/Users/masou/Downloads/GTOS-Enterprise-Engineering-Handbook-Final-Edition-1.0/GTOS-Enterprise-Engineering-Handbook-Final-Edition-1.0';
const OUTPUT = process.argv[3] || './content';
const PUBLIC = process.argv[4] || './public';

// Ensure output dirs
fs.mkdirSync(OUTPUT, { recursive: true });

// Collect all markdown files
function collectFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name.startsWith('_')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!['05-DIAGRAMS', '07-PDF-EDITION', '09-BUILD-AND-VALIDATION', '06-CATALOGUES'].includes(e.name)) {
        collectFiles(full, files);
      }
    } else if (e.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// Extract title from first H1
function extractTitle(md) {
  const m = md.match(/^# (.+)/m);
  return m ? m[1].replace(/\*/g, '').trim() : 'Untitled';
}

// Get section
function getSection(relPath) {
  const parts = relPath.split('/');
  if (parts[0] === '00-START-HERE') return 'Start Here';
  if (parts[0] === '01-NORMATIVE-CORE') return 'Normative Core';
  if (parts[0] === '02-FOUNDATIONS') return 'Foundations';
  if (parts[0] === '03-DETAILED-VOLUMES') return 'Detailed Volumes';
  if (parts[0] === '04-DELIVERY-PLAYBOOKS') return 'Delivery Playbooks';
  if (parts[0] === '08-CURRENT-PROJECT-GAP-ANALYSIS') return 'Gap Analysis';
  return 'Handbook';
}

// Extract plain text for search
function extractText(md) {
  return md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\|/g, ' ')
    .replace(/[-*_`#\[\]()>]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Process markdown inline elements
function processInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="code-inline">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      if (url.endsWith('.md')) url = url.replace(/\.md$/, '');
      return `<a href="/content/${url}">${text}</a>`;
    });
}

// Convert markdown to HTML
function mdToHtml(md) {
  const lines = md.split('\n');
  let out = [];
  let inTable = false, tableLines = [];
  let inCode = false, codeLang = '', codeContent = [];
  let inMermaid = false, mermaidContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Mermaid
    if (line.match(/^```mermaid/)) { inMermaid = true; mermaidContent = []; continue; }
    if (inMermaid) {
      if (line.match(/^```$/)) {
        out.push(`<DiagramBlock src="/diagrams/architecture-overview.svg" alt="Mermaid Diagram" caption="Workflow / State Diagram" />`);
        inMermaid = false;
      }
      continue;
    }

    // Code block
    if (line.match(/^```(\w*)/)) {
      if (inCode) {
        out.push(`<CodeBlock code={${JSON.stringify(codeContent.join('\n'))}} language="${codeLang}" />`);
        inCode = false;
      } else {
        codeLang = line.match(/^```(\w*)/)[1] || '';
        codeContent = [];
        inCode = true;
      }
      continue;
    }
    if (inCode) { codeContent.push(line); continue; }

    // Skip metadata tables at the start
    if (line.match(/^\| Metadata \|/) || line.match(/^\| Volume \|/)) {
      let j = i;
      while (lines[j] && lines[j].match(/^\|/)) j++;
      i = j - 1;
      continue;
    }

    // Tables
    if (line.match(/^\|.*\|$/) && !line.match(/^\|[- :|]+\|$/)) {
      if (!inTable) { inTable = true; tableLines = []; }
      tableLines.push(line);
      continue;
    }
    if (line.match(/^\|[- :|]+\|$/)) { tableLines.push(line); continue; }
    if (inTable && !line.match(/^\|.*\|$/)) {
      const rows = parseTable(tableLines);
      if (rows.length > 1) {
        const columns = rows[0].map((label, i) => ({ key: `col${i}`, label, sortable: true }));
        const data = rows.slice(1).map(row => {
          const obj = {};
          row.forEach((cell, i) => obj[`col${i}`] = processInline(cell));
          return obj;
        });
        out.push(`<PremiumTable columns={${JSON.stringify(columns)}} data={${JSON.stringify(data)}} />`);
      }
      inTable = false; tableLines = [];
      out.push(processLine(line));
      continue;
    }

    out.push(processLine(line));
  }

  // Close unclosed code block
  if (inCode) {
    out.push(`<CodeBlock code={${JSON.stringify(codeContent.join('\n'))}} language="${codeLang}" />`);
  }

  return out.join('\n');
}

function parseTable(lines) {
  const rows = [];
  for (const line of lines) {
    if (line.match(/^\|[- :|]+\|$/)) continue;
    const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
    if (cells.length) rows.push(cells);
  }
  return rows;
}

function slugify(text) {
  return text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function processLine(line) {
  // Headings
  let m;
  if ((m = line.match(/^#### (.+)/))) return `<h4 id="${slugify(m[1])}">${processInline(m[1])}</h4>`;
  if ((m = line.match(/^### (.+)/))) return `<h3 id="${slugify(m[1])}">${processInline(m[1])}</h3>`;
  if ((m = line.match(/^## (.+)/))) return `<h2 id="${slugify(m[1])}">${processInline(m[1])}</h2>`;
  if ((m = line.match(/^# (.+)/))) return ''; // Skip H1 (rendered by ContentPage)

  // HR
  if (line.match(/^---+$/)) return '<hr className="section-divider" />';

  // Blockquote
  if (line.startsWith('> ')) return `<CalloutBlock type="info">${processInline(line.slice(2))}</CalloutBlock>`;
  if (line.startsWith('> **Note:**')) return `<CalloutBlock type="info" title="Note">${processInline(line.replace('> **Note:**', ''))}</CalloutBlock>`;
  if (line.startsWith('> **Warning:**')) return `<CalloutBlock type="warning" title="Warning">${processInline(line.replace('> **Warning:**', ''))}</CalloutBlock>`;

  // Empty
  if (!line.trim()) return '<br />';

  // Default paragraph
  return `<p>${processInline(line)}</p>`;
}

// Generate content page MDX
function generateMDX(md, title, section) {
  const html = mdToHtml(md);
  return `---
title: "${title.replace(/"/g, '\\"')}"
section: "${section}"
---

<ContentPage
  title="${title.replace(/"/g, '\\"')}"
  section="${section}"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "${section}", href: "/content" },
    { label: "${title.replace(/"/g, '\\"')}" }
  ]}
>
${html}
</ContentPage>
`;
}

// ── Main Build ──
function build() {
  console.log('🔨 GTOS Handbook — Content Builder\n');

  const files = collectFiles(SOURCE);
  console.log(`📄 Found ${files.length} Markdown files`);

  // Build search index
  const searchIndex = [];

  let processed = 0;
  for (const file of files) {
    const rel = path.relative(SOURCE, file).replace(/\\/g, '/');
    const md = fs.readFileSync(file, 'utf-8');
    const title = extractTitle(md);
    const section = getSection(rel);

    // Write MDX content file
    const mdx = generateMDX(md, title, section);
    const outFile = path.join(OUTPUT, rel.replace(/\.md$/, '.mdx'));
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, mdx, 'utf-8');

    // Add to search index
    searchIndex.push({
      title,
      section,
      href: `/content/${rel.replace(/\.md$/, '')}`,
      text: extractText(md).slice(0, 500),
    });

    processed++;
    if (processed % 200 === 0) console.log(`  ${processed}/${files.length}...`);
  }

  // Write search index
  const searchPath = path.join(PUBLIC, 'search-index.json');
  fs.writeFileSync(searchPath, JSON.stringify(searchIndex), 'utf-8');

  console.log(`\n✅ Built ${processed} MDX content pages`);
  console.log(`🔍 Search index: ${searchIndex.length} entries (${(JSON.stringify(searchIndex).length / 1024).toFixed(0)} KB)`);
  console.log(`📂 Output: ${OUTPUT}`);
}

build();
