# CANON-005 — State Is the Observable Condition of Reality

## Canon Statement

> **State SHALL describe the scoped condition of an identified subject at a defined time and SHALL distinguish recorded, derived, projected, and disputed state.**

## Classification

| Property | Value |
|---|---|
| Canon ID | CANON-005 |
| Plane | Ontology |
| Priority | Absolute |
| Scope | Entire GTOS Ecosystem |
| Status | Normative |
| Depends On | CANON-001, CANON-003, CANON-004 |

## Normative Statements

- State SHALL describe the scoped condition of an identified subject at a defined time and SHALL distinguish recorded, derived, projected, and disputed state.
- Implementations SHALL preserve the distinctions defined by this Canon across APIs, data, events, AI behavior, security policy, and operations.
- A derived view SHALL NOT claim greater authority than its governed source.
- Conformance evidence SHALL be inspectable and reproducible.

## Historical Context

Status fields compress complex business conditions into ambiguous labels and often conceal who owns the state or how it was derived.

The resulting failures are not merely data-quality issues. They create invalid authority, incorrect automation, misleading analytics, and brittle integration. This Canon establishes the conceptual boundary required to prevent those failures.

## Core Philosophy

State SHALL describe the scoped condition of an identified subject at a defined time and SHALL distinguish recorded, derived, projected, and disputed state.

The Canon is independent of implementation style. A monolith, distributed platform, event-driven system, or agentic architecture may conform, but each must preserve the same semantic distinctions.

## Formal Definitions

### State

A set of propositions describing a subject under scope and time.

### Invariant

A condition that must hold across valid transitions.

### Derived State

State computed from facts and rules.

### Projected State

A purpose-specific view of state.


## Formal Invariants

1. The concept defined by this Canon SHALL have explicit ownership and scope.
2. Its identity and temporal meaning SHALL remain stable across representation changes.
3. Any derived assertion SHALL retain provenance to its inputs.
4. Corrections SHALL preserve historical evidence.
5. Authority SHALL NOT be inferred from technical possession or processing.

## Engineering Interpretation

The Canon affects aggregate design, data contracts, event envelopes, authorization policy, observability, AI prompts and tools, audit records, and migration procedures.

Engineering teams SHALL encode the required distinctions in types and contracts rather than relying only on prose. Invalid states and invalid transitions SHOULD be rejected as early as practical.

## Business Interpretation

Business language remains authoritative for meaning. Technical teams SHALL demonstrate that domain experts can recognize the represented concept, its owner, its lifecycle, and its exceptions.

A business rule that changes by jurisdiction, agreement, commodity, participant, or time SHALL be modeled as governed policy rather than hidden application logic.

## AI Interpretation

AI systems SHALL classify outputs as retrieval, inference, prediction, recommendation, decision, or execution request. Evidence, confidence, authority, and knowledge-time boundaries SHALL remain explicit.

An AI-generated statement does not become a fact, authoritative truth, or decision merely because it is fluent or highly probable.

## Architectural Consequences

- Domain boundaries must reflect authority boundaries.
- APIs and events must preserve semantic types and temporal meaning.
- Data lineage must connect projections to authoritative claims.
- Security must distinguish access, authority, delegation, and purpose.
- Operations must preserve evidence during failure and recovery.
- Architecture reviews must demonstrate Canon traceability.

## Trade Example

A shipment can be physically at a terminal, commercially on hold, customs-cleared, financially unpaid, and operationally delayed at the same moment. These are scoped states, not one universal status.

## Failure Modes and Risks

- One status field controls unrelated decisions.
- Derived state is mistaken for authority.
- Invalid transitions bypass invariants.

## Design Rules

1. Model the business concept before choosing storage or messaging technology.
2. Record identity, owner, source, scope, and time.
3. Separate authoritative claims from observations and projections.
4. Preserve corrections and contradictions.
5. Test business invariants at domain boundaries.
6. Require explicit authority before decision or execution.
7. Make conformance observable.

## Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| Database-as-reality | Confuses persistence with existence |
| Status-field compression | Erases scope, owner, and transition semantics |
| Silent overwrite | Destroys history |
| Message-name ambiguity | Confuses request, event, and outcome |
| AI answer as authority | Collapses knowledge, recommendation, and decision |
| Shared table ownership | Creates competing truth owners |
| Implementation-defined policy | Hides business governance |

## Compliance Requirements

A conforming implementation SHALL provide:

- a model or contract expressing this Canon;
- accountable ownership;
- temporal and provenance metadata;
- testable invariants;
- audit or lineage evidence;
- documented exceptions;
- traceability to affected services, schemas, policies, and runbooks.

## Conformance Tests

- [ ] Is state scoped by domain and owner?
- [ ] Are invariants testable?
- [ ] Can derived state be recomputed from evidence?

## Traceability

| Derived Volume | Primary Derivation |
|---|---|
| Constitution | Authority, ownership, amendment, and conformance |
| Business Architecture | Capabilities, decision rights, value streams |
| Domain Architecture | Boundaries, aggregates, commands, events, invariants |
| AI Architecture | Evidence, uncertainty, authority, decision discipline |
| Data Architecture | Temporal modeling, lineage, quality, retention |
| Security Architecture | Identity, delegation, authorization, audit |
| Engineering | Contract tests and architecture evidence |
| Operations | Reconstruction, recovery, and incident evidence |

## Architect's Notes

### Architectural Observation

This Canon is valuable only when it changes design behavior. Repeating the statement without encoding ownership, data semantics, policy, and verification is non-conformance.

### Rejected Alternatives

- Treating the distinction as documentation-only.
- Allowing every service to redefine the concept.
- Inferring authority from possession of data.
- Removing inconvenient history during correction.
- Deferring semantic validation to analytics.

### Related Canons

Dependencies are listed in Classification. Downstream relationships are published in the Traceability Registry.

## Review Checklist

- [ ] Does the Canon remain independent?
- [ ] Would removing it make GTOS incoherent?
- [ ] Are definitions non-circular?
- [ ] Are invariants testable?
- [ ] Are examples specific to trade?
- [ ] Are AI and authority consequences explicit?
- [ ] Is implementation traceability available?
