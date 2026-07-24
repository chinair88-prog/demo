'use client';

import { TopBar } from '@/components/TopBar';
import { ReadingProgress } from '@/components/ReadingProgress';
import { SearchModalWrapper } from '@/components/SearchModalWrapper';
import { BookOpen, Download, FileText } from '@phosphor-icons/react';
import Link from 'next/link';

const PDFS = [
  { title: 'Master Overview', file: '00-MASTER-OVERVIEW.pdf', pages: 45, size: '182 KB', volume: '00' },
  { title: 'Foundations', file: '01-FOUNDATIONS.pdf', pages: 89, size: '225 KB', volume: '01' },
  { title: 'Repository Evidence Atlas', file: '02-volume--02-repository-evidence-atlas.pdf', pages: 141, size: '442 KB', volume: '02' },
  { title: 'Global Trade Lifecycle', file: '03-volume-03-end-to-end-global-trade-lifecycle.pdf', pages: 193, size: '587 KB', volume: '03' },
  { title: 'Portal & Experience Architecture', file: '04-volume-04-portal-and-experience-architecture.pdf', pages: 373, size: '1.1 MB', volume: '04' },
  { title: 'Identity, Tenant & Organization', file: '05-volume-05-identity-tenant-organization.pdf', pages: 148, size: '463 KB', volume: '05' },
  { title: 'Commerce Domain Architecture', file: '06-volume-06-commerce-domain-architecture.pdf', pages: 500, size: '1.5 MB', volume: '06' },
  { title: 'Fulfilment & Supply Chain', file: '07-volume-07-fulfilment-supply-chain-domain-architecture.pdf', pages: 466, size: '1.4 MB', volume: '07' },
  { title: 'Engagement & Communication', file: '08-volume-08-engagement-communication-architecture.pdf', pages: 300, size: '859 KB', volume: '08' },
  { title: 'AI Operating System', file: '09-volume-09-ai-operating-system.pdf', pages: 324, size: '952 KB', volume: '09' },
  { title: 'Data & Database Reference', file: '10-volume-10-data-database-reference.pdf', pages: 254, size: '757 KB', volume: '10' },
  { title: 'API, Event & Workflow Contracts', file: '11-volume-11-api-event-workflow-tool-contracts.pdf', pages: 183, size: '562 KB', volume: '11' },
  { title: 'Platform Architecture', file: '12-volume-12-platform-architecture.pdf', pages: 120, size: '385 KB', volume: '12' },
  { title: 'Infrastructure & Deployment', file: '13-volume-13-infrastructure-deployment.pdf', pages: 148, size: '463 KB', volume: '13' },
  { title: 'Security, Privacy & Compliance', file: '14-volume-14-security-privacy-compliance.pdf', pages: 183, size: '560 KB', volume: '14' },
  { title: 'Engineering Handbook', file: '15-volume-15-engineering-handbook.pdf', pages: 148, size: '462 KB', volume: '15' },
  { title: 'Operations & SRE', file: '16-volume-16-operations-sre.pdf', pages: 148, size: '462 KB', volume: '16' },
  { title: 'Testing & Conformance', file: '17-volume-17-testing-verification-conformance.pdf', pages: 148, size: '464 KB', volume: '17' },
  { title: 'Migration & Evolution', file: '18-volume-18-migration-legacy-evolution.pdf', pages: 113, size: '366 KB', volume: '18' },
  { title: 'Implementation Profiles', file: '19-volume-19-implementation-profiles.pdf', pages: 323, size: '933 KB', volume: '19' },
  { title: 'Appendices & Reference', file: '20-volume-20-appendices-generated-reference.pdf', pages: 212, size: '635 KB', volume: '20' },
  { title: 'Delivery Playbooks', file: '21-DELIVERY-PLAYBOOKS.pdf', pages: 129, size: '278 KB', volume: '21' },
  { title: 'Current Project Gap Analysis', file: '22-CURRENT-PROJECT-GAP-ANALYSIS.pdf', pages: 137, size: '324 KB', volume: '22' },
];

export default function PDFsPage() {
  const totalPages = PDFS.reduce((sum, p) => sum + p.pages, 0);

  return (
    <>
      <ReadingProgress />
      <TopBar onOpenSearch={() => window.dispatchEvent(new CustomEvent('open-search'))} />
      <SearchModalWrapper />

      <main>
        {/* Hero */}
        <section className="chapter-hero">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
            <span className="inline-block text-xs font-extrabold tracking-[0.2em] uppercase text-[#60a5fa] mb-4">Controlled Publication Set</span>
            <h1 className="text-hero text-white">PDF Edition Library</h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mt-4">
              The complete handbook collection — {PDFS.length} books, {totalPages.toLocaleString()} pages — available
              for online reading and controlled distribution.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <div className="border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-4 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FileText size={16} weight="bold" className="text-[var(--accent)]" />
              <span className="text-[var(--text-secondary)]">{PDFS.length} books</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} weight="bold" className="text-[var(--accent)]" />
              <span className="text-[var(--text-secondary)]">{totalPages.toLocaleString()} pages</span>
            </div>
            <div className="flex items-center gap-2">
              <Download size={16} weight="bold" className="text-[var(--accent)]" />
              <span className="text-[var(--text-secondary)]">~14 MB total</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PDFS.map((pdf) => (
              <div key={pdf.file} className="card group flex flex-col">
                {/* PDF Icon */}
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-14 rounded-lg bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center text-white font-black text-[10px] shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    PDF
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                      {pdf.title}
                    </h3>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-1">
                      Vol {pdf.volume} · {pdf.pages} pages · {pdf.size}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-3 border-t border-[var(--border-default)]">
                  <Link
                    href={`/pdfs/view/${pdf.file.replace('.pdf', '')}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors"
                  >
                    <BookOpen size={14} weight="bold" />
                    Read Online
                  </Link>
                  <a
                    href={`/pdfs/${pdf.file}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-default)] text-[var(--text-secondary)] text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors"
                    target="_blank"
                    rel="noopener"
                  >
                    <Download size={14} weight="bold" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
