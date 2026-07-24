/* ═══════════════════════════════════════════════════════════════════
   GTOS Handbook — Interactive Application Shell
   Theme, Navigation, Search, Diagrams, Tables, Progress
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ── Theme Toggle ── */
  const savedTheme = localStorage.getItem('gtos-theme');
  if (savedTheme) document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  else if (matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');

  window.toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('gtos-theme', isDark ? 'dark' : 'light');
  };
  $$('.theme-toggle').forEach(b => b.addEventListener('click', toggleTheme));

  /* ── Mobile Menu ── */
  $('.menu-toggle')?.addEventListener('click', () => $('.sidebar')?.classList.add('open'));
  $('.sidebar-close')?.addEventListener('click', () => $('.sidebar')?.classList.remove('open'));
  document.addEventListener('click', e => {
    if (!e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
      $('.sidebar')?.classList.remove('open');
    }
  });

  /* ── Navigation Tree ── */
  function buildNav(node, parent) {
    const ul = document.createElement('ul');
    for (const child of (node.children || [])) {
      const li = document.createElement('li');
      const details = document.createElement('details');
      if (child.open) details.open = true;
      const summary = document.createElement('summary');
      summary.textContent = child.name;
      details.append(summary);
      details.append(buildNav(child));
      li.append(details);
      ul.append(li);
    }
    for (const page of (node.pages || [])) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = page.href.startsWith('/') ? page.href : '/' + page.href;
      a.textContent = page.title;
      a.dataset.search = page.title.toLowerCase();
      if (isCurrentPage(page.href)) a.classList.add('active');
      li.append(a);
      ul.append(li);
    }
    return ul;
  }

  function isCurrentPage(href) {
    const path = location.pathname;
    const cleanHref = href.replace(/^\//, '').replace(/\/$/, '');
    return path.endsWith(cleanHref) || path.endsWith(cleanHref + '.html');
  }

  const navContainer = $('#handbook-nav');
  if (navContainer && window.GTOS_NAV) {
    navContainer.append(buildNav(window.GTOS_NAV));
    // Auto-expand parent of active link
    setTimeout(() => {
      const active = navContainer.querySelector('a.active');
      if (active) {
        let el = active.parentElement;
        while (el) {
          if (el.tagName === 'DETAILS') el.open = true;
          el = el.parentElement;
        }
      }
    }, 0);
  }

  /* ── Nav Filter ── */
  const navFilter = $('.nav-filter');
  navFilter?.addEventListener('input', () => {
    const q = navFilter.value.toLowerCase().trim();
    $$('#handbook-nav a').forEach(a => {
      a.parentElement.style.display = !q || a.dataset.search?.includes(q) ? '' : 'none';
    });
    $$('#handbook-nav details').forEach(d => { if (q) d.open = true; });
  });

  /* ── Search ── */
  const searchModal = $('.search-modal');
  const searchInput = $('.search-modal input');
  const searchResults = $('.search-results');
  const searchMeta = $('.search-meta');

  window.openSearch = () => {
    searchModal?.classList.add('open');
    searchModal?.setAttribute('aria-hidden', 'false');
    setTimeout(() => searchInput?.focus(), 40);
    document.body.style.overflow = 'hidden';
  };
  window.closeSearch = () => {
    searchModal?.classList.remove('open');
    searchModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  $$('.search-trigger').forEach(b => b.addEventListener('click', openSearch));
  $('.search-close')?.addEventListener('click', closeSearch);
  searchModal?.addEventListener('click', e => { if (e.target === searchModal) closeSearch(); });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault(); openSearch();
    } else if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
      e.preventDefault(); openSearch();
    } else if (e.key === 'Escape') { closeSearch(); closeDiagramModal(); }
  });

  function escHTML(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  function highlight(s, terms) {
    let out = escHTML(s);
    for (const t of terms) {
      if (t.length < 2) continue;
      out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
    }
    return out;
  }

  let searchTimer;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(runSearch, 80);
  });

  function runSearch() {
    const q = searchInput.value.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    if (!q) { searchResults.innerHTML = ''; searchMeta.textContent = 'Type to search across the handbook.'; return; }
    const index = window.GTOS_SEARCH || [];
    const scored = [];
    for (const x of index) {
      const title = x.title.toLowerCase(), body = x.text.toLowerCase(), section = x.section.toLowerCase();
      let score = 0, ok = true;
      for (const t of terms) {
        const found = title.includes(t) || body.includes(t) || section.includes(t);
        if (!found) { ok = false; break; }
        score += (title.includes(t) ? 15 : 0) + (section.includes(t) ? 5 : 0) + Math.min(5, (body.split(t).length - 1));
      }
      if (ok) scored.push([score, x]);
    }
    scored.sort((a, b) => b[0] - a[0]);
    const top = scored.slice(0, 50);
    searchMeta.textContent = `${scored.length} matching pages`;
    searchResults.innerHTML = top.length ? top.map(([, x]) => {
      let snippet = x.text;
      const first = Math.min(...terms.map(t => { const i = snippet.toLowerCase().indexOf(t); return i < 0 ? 999999 : i; }));
      if (first < 999999) snippet = snippet.slice(Math.max(0, first - 80), first + 250);
      else snippet = snippet.slice(0, 300);
      const href = x.href.startsWith('/') ? x.href : '/' + x.href;
      return `<a class="search-result" href="${href}"><span class="section-tag">${escHTML(x.section)}</span><strong>${highlight(x.title, terms)}</strong><p>${highlight(snippet, terms)}</p></a>`;
    }).join('') : '<div style="padding:20px;color:var(--text-muted);text-align:center">No results found. Try broader terms.</div>';
  }

  /* ── Copy Code ── */
  $$('.copy-btn').forEach(b => b.addEventListener('click', async () => {
    const code = b.closest('pre')?.querySelector('code')?.innerText || '';
    await navigator.clipboard.writeText(code);
    const orig = b.textContent; b.textContent = 'Copied!';
    setTimeout(() => b.textContent = orig, 1500);
  }));

  /* ── Diagram Modal ── */
  const diagramModal = $('.diagram-modal'), diagramContent = $('.diagram-modal-content');
  window.closeDiagramModal = () => {
    diagramModal?.classList.remove('open');
    if (diagramContent) diagramContent.innerHTML = '';
    document.body.style.overflow = '';
  };
  $$('.diagram-expand').forEach(b => b.addEventListener('click', () => {
    const card = b.closest('.mermaid-block, .atlas-card, .diagram-feature');
    const img = card?.querySelector('img');
    if (!img || !diagramModal || !diagramContent) return;
    diagramContent.innerHTML = `<img src="${img.src}" alt="${escHTML(img.alt)}" style="width:100%">`;
    diagramModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }));
  $('.diagram-modal-close')?.addEventListener('click', closeDiagramModal);
  diagramModal?.addEventListener('click', e => { if (e.target === diagramModal) closeDiagramModal(); });

  /* ── Reading Progress ── */
  const progressBar = $('.reading-progress .bar');
  function updateProgress() {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
  }
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── Table Sorting ── */
  $$('.table-sort').forEach(th => {
    th.addEventListener('click', () => {
      const table = th.closest('table');
      const tbody = table?.querySelector('tbody');
      if (!tbody) return;
      const idx = [...th.parentElement.children].indexOf(th);
      const isAsc = th.classList.contains('asc');
      // Reset all headers
      $$('.table-sort', table).forEach(h => { h.classList.remove('asc', 'desc'); });
      th.classList.add(isAsc ? 'desc' : 'asc');
      const rows = [...tbody.querySelectorAll('tr')];
      rows.sort((a, b) => {
        const va = a.children[idx]?.textContent?.trim() || '';
        const vb = b.children[idx]?.textContent?.trim() || '';
        const na = parseFloat(va), nb = parseFloat(vb);
        if (!isNaN(na) && !isNaN(nb)) return isAsc ? nb - na : na - nb;
        return isAsc ? vb.localeCompare(va) : va.localeCompare(vb);
      });
      rows.forEach(r => tbody.append(r));
    });
  });

  /* ── TOC Active Tracking ── */
  const tocLinks = $$('.page-toc a[href^="#"]');
  if (tocLinks.length) {
    const map = new Map(tocLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const observer = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove('active'));
          map.get(e.target.id)?.classList.add('active');
        }
      }
    }, { rootMargin: '-15% 0px -75%' });
    for (const id of map.keys()) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  }

  /* ── Mermaid Toggle Code ── */
  $$('.mermaid-toggle-code').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.mermaid-block')?.classList.toggle('expanded');
      btn.textContent = btn.closest('.mermaid-block')?.classList.contains('expanded') ? 'Hide Code' : 'Show Code';
    });
  });

  /* ── Animate elements on scroll ── */
  const animateEls = $$('.animate-on-scroll');
  if (animateEls.length) {
    const animObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animate-in');
          animObserver.unobserve(e.target);
        }
      });
    }, { threshold: .1 });
    animateEls.forEach(el => animObserver.observe(el));
  }

  /* ── PWA Service Worker ── */
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  }

  console.log('%c GTOS Handbook %c v1.0 ',
    'background:linear-gradient(135deg,#0d9488,#2563eb);color:#fff;padding:6px 10px;border-radius:4px 0 0 4px;font-weight:700',
    'background:#1e293b;color:#fff;padding:6px 10px;border-radius:0 4px 4px 0');
})();
