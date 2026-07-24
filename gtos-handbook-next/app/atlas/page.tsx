'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TopBar } from '@/components/TopBar';
import { SearchModal } from '@/components/SearchModal';
import { ReadingProgress } from '@/components/ReadingProgress';

const DIAGRAMS = [
  { src: '/diagrams/architecture-overview.svg', title: 'Architecture Overview', desc: 'Normative high-level architecture view — system planes and foundational truth distinctions.' },
  { src: '/diagrams/domain-map.svg', title: 'Domain Map', desc: 'Complete domain ownership map across commerce, trade, fulfilment, and supporting domains.' },
  { src: '/diagrams/global-lifecycle.svg', title: 'Global Lifecycle', desc: 'End-to-end global trade lifecycle — 27 canonical stages from onboarding through settlement.' },
  { src: '/diagrams/event-reliability.svg', title: 'Event Reliability', desc: 'Event-driven architecture reliability patterns — idempotency, ordering, and delivery guarantees.' },
  { src: '/diagrams/implementation-roadmap.svg', title: 'Implementation Roadmap', desc: 'Seven-phase implementation roadmap with governed dependency ordering.' },
  { src: '/diagrams/8696dd0768fde255.svg', title: 'State Lifecycle Pattern', desc: 'PROPOSED → VALIDATION_PENDING → APPROVAL_PENDING state transition.' },
  { src: '/diagrams/eba6ecf488a87c42.svg', title: 'Decision & Execution Workflow', desc: 'Validate identity → Collect evidence → Policy gates → Open exception or request correction.' },
  { src: '/diagrams/f31218542ccf5955.svg', title: 'Document State Lifecycle', desc: 'PREPARATION → DOCUMENT_PENDING → SUBMITTED lifecycle.' },
  { src: '/diagrams/17015648cdfbcfe3.svg', title: 'Evidence & Policy Workflow', desc: 'Validate identity → Collect evidence → Policy gates pass? → Exception handling.' },
  { src: '/diagrams/e257bd22f50b5fe2.svg', title: 'Content Eligibility State', desc: 'DRAFT → CONTENT_PENDING → ELIGIBILITY_PENDING state machine.' },
  { src: '/diagrams/c1e30beb04869c21.svg', title: 'Checkout State Machine', desc: 'CART_ACTIVE → CHECKOUT_STARTED → VALIDATION_PENDING states.' },
  { src: '/diagrams/0a00075123ae8d07.svg', title: 'Planning & Readiness State', desc: 'PLANNED → READY → IN_PROGRESS lifecycle phases.' },
  { src: '/diagrams/ced375f507011c37.svg', title: 'Allocation & Picking State', desc: 'PENDING_ALLOCATION → ALLOCATED → PICKING warehouse flow.' },
  { src: '/diagrams/5f5806072ba59741.svg', title: 'Receipt & Inventory State', desc: 'PENDING_RECEIPT → QUARANTINED → AVAILABLE warehouse states.' },
  { src: '/diagrams/b660338f6c080247.svg', title: 'Execution State Machine', desc: 'NOT_STARTED → STARTED → IN_PROGRESS workflow states.' },
  { src: '/diagrams/d2ab7136ed93c675.svg', title: 'Shipment Lifecycle', desc: 'BOOKED → PICKED_UP → DEPARTED transport states.' },
  { src: '/diagrams/978657d536b3fa24.svg', title: 'Obligation State Machine', desc: 'OBLIGATION_OPEN → CALCULATION_PENDING → APPROVAL_PENDING.' },
  { src: '/diagrams/a91450bef3e398ee.svg', title: 'Submission Preparation', desc: 'PREPARATION → VALIDATION_PENDING → READY_TO_SUBMIT.' },
  { src: '/diagrams/9348fd8624d52ac0.svg', title: 'Feasibility State', desc: 'PROPOSED → FEASIBILITY_CHECK → MATERIAL_CHECK.' },
  { src: '/diagrams/718c1b02d276f004.svg', title: 'Request & Risk State', desc: 'REQUESTED → RISK_ASSESSMENT → APPROVAL_PENDING.' },
  { src: '/diagrams/2d3570c59de4c451.svg', title: 'Eligibility & Authorization', desc: 'REQUESTED → ELIGIBILITY_REVIEW → AUTHORIZED.' },
  { src: '/diagrams/a3a5b43ae498841a.svg', title: 'Requirement & Options State', desc: 'REQUIREMENT_READY → OPTIONS_REQUESTED → OPTIONS_RECEIVED.' },
  { src: '/diagrams/cb54dd3d7d647e79.svg', title: 'Validation & Approval', desc: 'DRAFT → VALIDATION_PENDING → APPROVAL_PENDING.' },
  { src: '/diagrams/7a8835d439f8340f.svg', title: 'Appointment State', desc: 'SCHEDULED → ARRIVED → IDENTITY_CHECK.' },
  { src: '/diagrams/e8b3ea2bbd8a8786.svg', title: 'Appointment Lifecycle', desc: 'APPOINTMENT_PENDING → SCHEDULED → ARRIVED.' },
  { src: '/diagrams/0716594c7e0c4554.svg', title: 'Draft Validation State', desc: 'DRAFT → VALIDATION_PENDING → APPROVAL_PENDING.' },
  { src: '/diagrams/c401e19f4126717e.svg', title: 'Approval State Machine', desc: 'DRAFT → APPROVAL_PENDING → APPROVED.' },
];

export default function AtlasPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <ReadingProgress />
      <TopBar onOpenSearch={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main>
        <section className="chapter-hero">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-xs font-extrabold tracking-[0.2em] uppercase text-[#60a5fa] mb-4">Visual Reference</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-hero text-white">Architecture Atlas</motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-[#94a3b8] max-w-2xl mt-4">Scalable system, domain, lifecycle, reliability and workflow diagrams — {DIAGRAMS.length} patterns extracted from the complete handbook.</motion.p>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16">
          <div className="grid md:grid-cols-2 gap-6">
            {DIAGRAMS.map((d, i) => (
              <motion.figure
                key={d.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="diagram-card group"
              >
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-default)] bg-[var(--bg-secondary)]">
                  <strong className="text-sm text-[var(--text-primary)]">{d.title}</strong>
                  <span className="text-[10px] text-[var(--text-tertiary)] font-medium">Click to expand</span>
                </div>
                <div className="p-5 bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-secondary)] flex justify-center">
                  <img src={d.src} alt={d.title} loading="lazy" className="max-h-[400px] object-contain group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
                <figcaption className="px-4 py-3 border-t border-[var(--border-default)] text-xs text-[var(--text-tertiary)]">{d.desc}</figcaption>
              </motion.figure>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-8 flex justify-between items-center gap-4">
          <span className="text-sm text-[var(--text-tertiary)]">GTOS Enterprise Engineering Handbook · Edition 1.0</span>
          <span className="text-xs text-[var(--text-tertiary)]">Architecture Atlas · {DIAGRAMS.length} Diagrams</span>
        </div>
      </footer>
    </>
  );
}
