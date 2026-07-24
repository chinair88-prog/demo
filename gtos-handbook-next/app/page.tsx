'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Compass, ArrowRight, Download, ChartBar, GitFork, Storefront, Star, ArrowUpRight, FilePdf, ChartLine, SquaresFour, CheckCircle } from '@phosphor-icons/react';
import { TopBar } from '@/components/TopBar';
import { SearchModal } from '@/components/SearchModal';
import { ReadingProgress } from '@/components/ReadingProgress';

const STATS = [
  { value: '859', label: 'HTML Knowledge Pages', icon: BookOpen, color: 'from-blue-500/20 to-blue-600/10 text-blue-600' },
  { value: '1,323,669', label: 'Source Words', icon: ChartBar, color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-600' },
  { value: '19', label: 'Detailed Volumes', icon: Compass, color: 'from-purple-500/20 to-purple-600/10 text-purple-600' },
  { value: '37', label: 'Domain Packs', icon: SquaresFour, color: 'from-amber-500/20 to-amber-600/10 text-amber-600' },
  { value: '23', label: 'PDF Books', icon: FilePdf, color: 'from-rose-500/20 to-rose-600/10 text-rose-600' },
  { value: '4,825', label: 'PDF Pages', icon: ChartLine, color: 'from-teal-500/20 to-teal-600/10 text-teal-600' },
];

const ROADMAP = [
  { phase: '0', title: 'Governance & Foundations', desc: 'Canon, Constitution, ownership, identity, ADR, standards, catalogues', owner: 'Architecture Governance', priority: 'P0' },
  { phase: '1', title: 'Platform Paved Roads', desc: 'Gateway, identity, secrets, observability, Events, workflows, migrations', owner: 'Platform Teams', priority: 'P0' },
  { phase: '2', title: 'Core Commerce', desc: 'Product, Offer, Price, Cart, Checkout, Order, Payment, Inventory', owner: 'Commerce Teams', priority: 'P0' },
  { phase: '3', title: 'Trade & Supply Chain', desc: 'Procurement through warehouse and fulfilment', owner: 'Trade & Supply-Chain Teams', priority: 'P1' },
  { phase: '4', title: 'After-Sales & Finance', desc: 'Delivery evidence, returns, settlement, reporting, ESG', owner: 'Finance & After-Sales Teams', priority: 'P1' },
  { phase: '5', title: 'AI-Native Operations', desc: 'RAG, agents, tools, evaluation, safety, supervised autonomy', owner: 'AI Platform & Domain Teams', priority: 'P2' },
  { phase: '6', title: 'Global Scale & Certification', desc: 'Multi-region, jurisdictions, certification, cost and resilience', owner: 'Platform, Security, Compliance', priority: 'P2' },
];

const COLLECTIONS = [
  { icon: BookOpen, title: 'Normative Core', desc: 'Mandatory architectural principles, ownership, security, data, workflows.', tag: '17 chapters', href: '/content/01-NORMATIVE-CORE/00-SYSTEM-BLUEPRINT' },
  { icon: Storefront, title: 'Domain Architecture', desc: 'Commerce, trade, supply chain, engagement, AI, platform, security domain bibles.', tag: '37 domain packs', href: '/content/03-DETAILED-VOLUMES/volume-06-commerce-domain-architecture/01-PRODUCT-CATALOG/00-ORIENTATION-AND-EVIDENCE-BASELINE' },
  { icon: GitFork, title: 'Delivery Playbooks', desc: 'Implementation blueprints, ADRs, standards, scenarios, reference patterns.', tag: 'Execution-ready', href: '/content/04-DELIVERY-PLAYBOOKS/adr/index' },
  { icon: Compass, title: 'Architecture Atlas', desc: 'High-level system maps and workflow/state diagrams as scalable SVG.', tag: '27 diagram patterns', href: '/atlas' },
  { icon: FilePdf, title: 'PDF Library', desc: '23 professionally paginated books for review and controlled distribution.', tag: '4,825 pages', href: '/pdfs' },
  { icon: Star, title: 'Gap Analysis', desc: 'Repository observations and remediation evidence, separated from target architecture.', tag: 'Project reality', href: '/content/08-CURRENT-PROJECT-GAP-ANALYSIS' },
];

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const handler = () => setSearchOpen(true);
    document.addEventListener('open-search', handler);
    return () => document.removeEventListener('open-search', handler);
  }, []);

  return (
    <>
      <ReadingProgress />
      <TopBar onOpenSearch={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main className="overflow-hidden">
        {/* ═══ HERO ═══ */}
        <section className="chapter-hero relative min-h-[85vh] flex items-center">
          <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-16 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-block text-xs font-extrabold tracking-[0.2em] uppercase text-[#60a5fa] mb-6">Final Master Edition · 1.0</motion.span>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-hero text-white mb-6">GTOS Enterprise<br /><span className="text-gradient">Engineering Handbook</span></motion.h1>
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-lg text-[#94a3b8] max-w-xl leading-relaxed mb-8">The normative target architecture, implementation system, operating model, and delivery playbook for building GTOS as a secure, AI-native, globally scalable trade operating system.</motion.p>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-wrap gap-3">
                <Link href="/content/01-NORMATIVE-CORE/00-SYSTEM-BLUEPRINT" className="btn btn-primary"><BookOpen size={18} weight="bold" />System Blueprint<ArrowRight size={16} weight="bold" /></Link>
                <Link href="/atlas" className="btn btn-secondary"><Compass size={18} weight="bold" />Architecture Atlas</Link>
                <a href="/pdfs/00-MASTER-OVERVIEW.pdf" className="btn btn-ghost text-white/80 hover:text-white"><Download size={18} weight="bold" />Master Overview PDF</a>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 p-4 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} weight="bold" className="text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-[#94a3b8] leading-relaxed"><strong className="text-white/90">Publication scope:</strong> This site is the final 1.0 target-architecture and implementation guide.</p>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="relative glass-strong rounded-3xl p-8"><img src="/diagrams/architecture-overview.svg" alt="Architecture" className="w-full" /></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="relative -mt-16 z-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="card-glass group cursor-default">
                  <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}><Icon size={20} weight="bold" /></div>
                  <div className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">{stat.value}</div>
                  <div className="text-xs text-[var(--text-tertiary)] mt-1 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═══ ARCHITECTURE OVERVIEW ═══ */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-extrabold tracking-[0.15em] uppercase text-[var(--accent)]">Architecture</span>
            <h2 className="text-display text-[var(--text-primary)] mt-4 mb-4">One Implementation System, From Vision to Production</h2>
            <p className="text-lg text-[var(--text-secondary)]">The handbook connects Domain ownership, service boundaries, data contracts, workflows, security controls, AI governance, testing and operational readiness.</p>
          </div>
          <div className="glass-strong rounded-3xl p-6 md:p-10 overflow-hidden">
            <img src="/diagrams/global-lifecycle.svg" alt="Lifecycle" className="w-full" />
          </div>
        </section>

        <div className="section-divider max-w-[1400px] mx-auto" />

        {/* ═══ COLLECTIONS ═══ */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24">
          <div className="max-w-2xl mb-12"><span className="text-xs font-extrabold tracking-[0.15em] uppercase text-[var(--accent)]">Core Collections</span><h2 className="text-display text-[var(--text-primary)] mt-4">Navigate by Engineering Intent</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLLECTIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Link href={item.href} className="card-glass block h-full group">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-[var(--accent)] mb-4 group-hover:scale-110 transition-transform"><Icon size={22} weight="bold" /></div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{item.desc}</p>
                    <span className="text-xs font-semibold text-[var(--accent)]">{item.tag}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="section-divider max-w-[1400px] mx-auto" />

        {/* ═══ VOLUMES ═══ */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24">
          <div className="max-w-2xl mb-12"><span className="text-xs font-extrabold tracking-[0.15em] uppercase text-[var(--accent)]">Detailed Volumes</span><h2 className="text-display text-[var(--text-primary)] mt-4">Complete Reference Library</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {[
              { num: '00', title: 'Master Overview' }, { num: '01', title: 'Foundations' }, { num: '02', title: 'Repository Evidence Atlas' },
              { num: '03', title: 'Global Trade Lifecycle' }, { num: '04', title: 'Portal & Experience Architecture' }, { num: '05', title: 'Identity, Tenant & Organization' },
              { num: '06', title: 'Commerce Domain Architecture' }, { num: '07', title: 'Fulfilment & Supply Chain' }, { num: '08', title: 'Engagement & Communication' },
              { num: '09', title: 'AI Operating System' }, { num: '10', title: 'Data & Database Reference' }, { num: '11', title: 'API, Event & Workflow Contracts' },
              { num: '12', title: 'Platform Architecture' }, { num: '13', title: 'Infrastructure & Deployment' }, { num: '14', title: 'Security, Privacy & Compliance' },
              { num: '15', title: 'Engineering Handbook' }, { num: '16', title: 'Operations & SRE' }, { num: '17', title: 'Testing & Conformance' },
              { num: '18', title: 'Migration & Evolution' }, { num: '19', title: 'Implementation Profiles' }, { num: '20', title: 'Appendices & Reference' },
            ].map((vol, i) => (
              <motion.div key={vol.num} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} whileHover={{ y: -4 }} className="card-glass cursor-pointer group">
                <div className="flex items-start justify-between mb-3"><span className="text-[10px] font-extrabold text-[var(--text-tertiary)] tracking-widest">VOL {vol.num}</span><ArrowUpRight size={14} weight="bold" className="opacity-0 group-hover:opacity-100 transition-all" /></div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{vol.title}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="section-divider max-w-[1400px] mx-auto" />

        {/* ═══ ROADMAP ═══ */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24">
          <div className="max-w-2xl mb-12"><span className="text-xs font-extrabold tracking-[0.15em] uppercase text-[var(--accent)]">Implementation Roadmap</span><h2 className="text-display text-[var(--text-primary)] mt-4">Build in Governed Dependency Order</h2></div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              {ROADMAP.map((item, i) => (
                <motion.div key={item.phase} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex gap-4 group pb-5">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#7c3aed] flex items-center justify-center text-white font-extrabold text-sm">{item.phase}</div>
                    {i < ROADMAP.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-[var(--accent)]/30 to-transparent my-1" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><h4 className="font-bold text-[var(--text-primary)]">{item.title}</h4><span className={`badge ${item.priority === 'P0' ? 'badge-danger' : item.priority === 'P1' ? 'badge-warning' : 'badge-info'}`}>{item.priority}</span></div>
                    <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p><p className="text-xs text-[var(--text-tertiary)] mt-1">{item.owner}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="glass-strong rounded-3xl p-6 flex items-center justify-center"><img src="/diagrams/implementation-roadmap.svg" alt="Roadmap" className="w-full" /></div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--accent)] to-[#7c3aed] p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Use the Handbook as Your Implementation Authority</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">Start with the normative core, adopt the Domain implementation template, and use the conformance and production-readiness gates.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/content/01-NORMATIVE-CORE/00-SYSTEM-BLUEPRINT" className="btn bg-white text-[#1a2744] hover:bg-white/90 shadow-lg"><BookOpen size={18} weight="bold" />Open System Blueprint</Link>
              <Link href="/content/01-NORMATIVE-CORE/15-DOMAIN-IMPLEMENTATION-TEMPLATE" className="btn bg-white/10 text-white hover:bg-white/20 border border-white/20">Domain Implementation Template</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] flex items-center justify-center text-white font-black text-xs">G</div><span className="text-sm font-semibold text-[var(--text-primary)]">GTOS Enterprise Engineering Handbook</span></div>
          <div className="flex items-center gap-6 text-xs text-[var(--text-tertiary)]"><span>Edition 1.0 · Final Master Edition</span><span>Target Architecture & Implementation Guide</span></div>
        </div>
      </footer>
    </>
  );
}
