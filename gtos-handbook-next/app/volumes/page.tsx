'use client';

import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { ReadingProgress } from '@/components/ReadingProgress';
import { SearchModalWrapper } from '@/components/SearchModalWrapper';
import {
  Books, Globe, ShoppingCart, Truck, ChatCircle, Robot,
  Database, Plug, Monitor, Shield, HardDrive, Wrench,
  Gauge, TestTube, Swap, FileText, ClipboardText,
  IdentificationCard, ArrowRight,
} from '@phosphor-icons/react';

interface Volume {
  id: string;
  number: string;
  title: string;
  description: string;
  path: string;
  domains: number;
  pages: number;
  icon: React.ElementType;
  gradient: string;
}

const VOLUMES: Volume[] = [
  {
    id: 'volume--02',
    number: '02',
    title: 'Repository Evidence Atlas',
    description: 'Cross-repository evidence mapping, artifact inventory, and source-of-truth verification across all codebases.',
    path: '/content/03-DETAILED-VOLUMES/volume--02-repository-evidence-atlas',
    domains: 1, pages: 20,
    icon: FileText,
    gradient: 'from-slate-500 to-slate-700',
  },
  {
    id: 'volume-03',
    number: '03',
    title: 'End-to-End Global Trade Lifecycle',
    description: 'Complete 27-stage canonical trade lifecycle from supplier discovery through settlement and ESG reporting.',
    path: '/content/03-DETAILED-VOLUMES/volume-03-end-to-end-global-trade-lifecycle',
    domains: 1, pages: 20,
    icon: Globe,
    gradient: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'volume-04',
    number: '04',
    title: 'Portal & Experience Architecture',
    description: '13 portal experiences: Web Shop, Admin, Operator, Warehouse, Customer, Provider, Partner, Developer portals.',
    path: '/content/03-DETAILED-VOLUMES/volume-04-portal-and-experience-architecture',
    domains: 13, pages: 56,
    icon: Monitor,
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'volume-05',
    number: '05',
    title: 'Identity, Tenant & Organization',
    description: 'Identity architecture, tenant isolation, organization modeling, RBAC, and authentication patterns.',
    path: '/content/03-DETAILED-VOLUMES/volume-05-identity-tenant-organization',
    domains: 1, pages: 21,
    icon: IdentificationCard,
    gradient: 'from-purple-500 to-violet-700',
  },
  {
    id: 'volume-06',
    number: '06',
    title: 'Commerce Domain Architecture',
    description: '14 commerce domains: Product Catalog, Marketplace, Pricing, RFQ, Quotation, Contract, PO, Wallet, Billing, Finance, Returns, Manufacturing.',
    path: '/content/03-DETAILED-VOLUMES/volume-06-commerce-domain-architecture',
    domains: 14, pages: 71,
    icon: ShoppingCart,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'volume-07',
    number: '07',
    title: 'Fulfilment & Supply Chain',
    description: '13 supply chain domains: Supplier, Provider, CRM, Inventory, Warehouse, Shipping, Customs, Pick-Pack-Ship, Exceptions.',
    path: '/content/03-DETAILED-VOLUMES/volume-07-fulfilment-supply-chain-domain-architecture',
    domains: 13, pages: 66,
    icon: Truck,
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 'volume-08',
    number: '08',
    title: 'Engagement & Communication',
    description: '10 communication domains: Notification, WhatsApp, Instagram, Email, WebSocket, Conversation Ownership, Consent, Templates.',
    path: '/content/03-DETAILED-VOLUMES/volume-08-engagement-communication-architecture',
    domains: 10, pages: 41,
    icon: ChatCircle,
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 'volume-09',
    number: '09',
    title: 'AI Operating System',
    description: 'AI-native architecture: context assembly, retrieval, planning, tool execution, recommendation engines, governed autonomy.',
    path: '/content/03-DETAILED-VOLUMES/volume-09-ai-operating-system',
    domains: 1, pages: 46,
    icon: Robot,
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 'volume-10',
    number: '10',
    title: 'Data & Database Reference',
    description: 'Database-per-service architecture, schema ownership, table families, migrations, lineage, projections, reconciliation.',
    path: '/content/03-DETAILED-VOLUMES/volume-10-data-database-reference',
    domains: 1, pages: 36,
    icon: Database,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'volume-11',
    number: '11',
    title: 'API, Event & Workflow Contracts',
    description: 'REST/gRPC/BFF contracts, event schema registry, workflow definitions, MCP tool contracts, provider adapters.',
    path: '/content/03-DETAILED-VOLUMES/volume-11-api-event-workflow-tool-contracts',
    domains: 1, pages: 26,
    icon: Plug,
    gradient: 'from-indigo-500 to-blue-700',
  },
  {
    id: 'volume-12',
    number: '12',
    title: 'Platform Architecture',
    description: 'Identity, policy, secrets, observability, deployment pipelines, data infrastructure, developer platform.',
    path: '/content/03-DETAILED-VOLUMES/volume-12-platform-architecture',
    domains: 1, pages: 17,
    icon: HardDrive,
    gradient: 'from-gray-500 to-slate-700',
  },
  {
    id: 'volume-13',
    number: '13',
    title: 'Infrastructure & Deployment',
    description: 'Multi-region infrastructure, Kubernetes, service mesh, CI/CD pipelines, blue-green and canary deployments.',
    path: '/content/03-DETAILED-VOLUMES/volume-13-infrastructure-deployment',
    domains: 1, pages: 21,
    icon: HardDrive,
    gradient: 'from-slate-600 to-slate-800',
  },
  {
    id: 'volume-14',
    number: '14',
    title: 'Security, Privacy & Compliance',
    description: 'Zero-trust security, data privacy, regulatory compliance, audit logging, threat modeling, vulnerability management.',
    path: '/content/03-DETAILED-VOLUMES/volume-14-security-privacy-compliance',
    domains: 1, pages: 26,
    icon: Shield,
    gradient: 'from-red-500 to-rose-700',
  },
  {
    id: 'volume-15',
    number: '15',
    title: 'Engineering Handbook',
    description: 'Engineering standards, code review, architecture decision records, development workflows, quality gates.',
    path: '/content/03-DETAILED-VOLUMES/volume-15-engineering-handbook',
    domains: 1, pages: 21,
    icon: Wrench,
    gradient: 'from-emerald-500 to-green-700',
  },
  {
    id: 'volume-16',
    number: '16',
    title: 'Operations & SRE',
    description: 'SLO/SLI definitions, incident management, runbooks, disaster recovery, capacity planning, monitoring.',
    path: '/content/03-DETAILED-VOLUMES/volume-16-operations-sre',
    domains: 1, pages: 21,
    icon: Gauge,
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 'volume-17',
    number: '17',
    title: 'Testing & Conformance',
    description: 'Test strategies, conformance suites, integration testing, contract testing, performance testing, security testing.',
    path: '/content/03-DETAILED-VOLUMES/volume-17-testing-verification-conformance',
    domains: 1, pages: 21,
    icon: TestTube,
    gradient: 'from-lime-500 to-green-600',
  },
  {
    id: 'volume-18',
    number: '18',
    title: 'Migration & Evolution',
    description: 'Legacy system migration, strangler fig patterns, data migration, API versioning, evolutionary architecture.',
    path: '/content/03-DETAILED-VOLUMES/volume-18-migration-legacy-evolution',
    domains: 1, pages: 16,
    icon: Swap,
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    id: 'volume-19',
    number: '19',
    title: 'Implementation Profiles',
    description: '15 implementation profiles: Customer Portal, Provider Portal, High-Assurance Regulated, Mobile-First, and more.',
    path: '/content/03-DETAILED-VOLUMES/volume-19-implementation-profiles',
    domains: 15, pages: 45,
    icon: ClipboardText,
    gradient: 'from-sky-500 to-indigo-600',
  },
];

export default function VolumesPage() {
  const totalDomains = VOLUMES.reduce((s, v) => s + v.domains, 0);
  const totalPages = VOLUMES.reduce((s, v) => s + v.pages, 0);

  return (
    <>
      <ReadingProgress />
      <TopBar onOpenSearch={() => window.dispatchEvent(new CustomEvent('open-search'))} />
      <SearchModalWrapper />

      <main>
        {/* Hero */}
        <section className="chapter-hero">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
            <span className="inline-block text-xs font-extrabold tracking-[0.2em] uppercase text-[#60a5fa] mb-4">Detailed Architecture Volumes</span>
            <h1 className="text-hero text-white">Domain Architecture</h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mt-4">
              {VOLUMES.length} volumes · {totalDomains} domains · {totalPages}+ pages of detailed architecture,
              contracts, data models, workflows, security controls, and operational runbooks.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <div className="border-b border-[var(--border-default)] bg-[var(--bg-surface)] sticky top-16 z-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-4 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Books size={16} weight="bold" className="text-[var(--accent)]" />
              <span className="text-[var(--text-secondary)]"><strong>{VOLUMES.length}</strong> volumes</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} weight="bold" className="text-[var(--accent)]" />
              <span className="text-[var(--text-secondary)]"><strong>{totalDomains}</strong> domains</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={16} weight="bold" className="text-[var(--accent)]" />
              <span className="text-[var(--text-secondary)]"><strong>{totalPages}+</strong> architecture pages</span>
            </div>
          </div>
        </div>

        {/* Volume Grid */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {VOLUMES.map((vol) => {
              const Icon = vol.icon;
              return (
                <Link
                  key={vol.id}
                  href={vol.path}
                  className="card group flex flex-col hover:border-[var(--accent)]"
                >
                  {/* Icon + Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${vol.gradient} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon size={24} weight="bold" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold tracking-widest uppercase text-[var(--text-tertiary)]">Volume {vol.number}</span>
                      <h2 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mt-0.5">
                        {vol.title}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mb-4 flex-1">
                    {vol.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-default)]">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                      <span>{vol.domains} domain{vol.domains !== 1 ? 's' : ''}</span>
                      <span>{vol.pages} pages</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                      Browse <ArrowRight size={12} weight="bold" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Additional Collections */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-20">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Additional Collections</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Normative Core', desc: 'System blueprint, principles, TOM, domain map', path: '/content/01-NORMATIVE-CORE', pages: 17, gradient: 'from-blue-500 to-indigo-600' },
              { title: 'Foundations', desc: 'Theory, canon, constitution, vision, glossary', path: '/content/02-FOUNDATIONS', pages: 52, gradient: 'from-purple-500 to-violet-700' },
              { title: 'Delivery Playbooks', desc: 'ADRs, engineering guides, patterns, standards', path: '/content/04-DELIVERY-PLAYBOOKS', pages: 104, gradient: 'from-emerald-500 to-teal-600' },
              { title: 'Gap Analysis', desc: 'Audit evidence, canonicalization, wave reports', path: '/content/08-CURRENT-PROJECT-GAP-ANALYSIS', pages: 56, gradient: 'from-rose-500 to-pink-700' },
            ].map((col) => (
              <Link
                key={col.path}
                href={col.path}
                className="card-glass group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${col.gradient} flex items-center justify-center text-white mb-3`}>
                  <Books size={20} weight="bold" />
                </div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{col.title}</h3>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">{col.desc}</p>
                <span className="text-[11px] text-[var(--text-tertiary)] mt-2 block">{col.pages} pages</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
