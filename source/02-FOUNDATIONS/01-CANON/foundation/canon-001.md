# CANON-001 — Reality Precedes Representation

## Canon Statement

> **Trade reality exists independently of GTOS. GTOS SHALL represent reality and SHALL NOT redefine reality merely to simplify software.**

## Classification

| Property | Value |
|---|---|
| Canon ID | CANON-001 |
| Plane | Foundation |
| Priority | Absolute |
| Scope | Entire GTOS Ecosystem |
| Status | Normative |
| Depends On | None |

## Normative Statements

- Trade reality exists independently of GTOS. GTOS SHALL represent reality and SHALL NOT redefine reality merely to simplify software.
- Implementations SHALL preserve the distinctions defined by this Canon across APIs, data, events, AI behavior, security policy, and operations.
- A derived view SHALL NOT claim greater authority than its governed source.
- Conformance evidence SHALL be inspectable and reproducible.

## Historical Context

Enterprise platforms routinely convert technical constraints into supposed business truths. Required fields, fixed workflows, and database ownership are then mistaken for properties of trade itself.

The resulting failures are not merely data-quality issues. They create invalid authority, incorrect automation, misleading analytics, and brittle integration. This Canon establishes the conceptual boundary required to prevent those failures.

## Core Philosophy

Trade reality exists independently of GTOS. GTOS SHALL represent reality and SHALL NOT redefine reality merely to simplify software.

The Canon is independent of implementation style. A monolith, distributed platform, event-driven system, or agentic architecture may conform, but each must preserve the same semantic distinctions.

## Formal Definitions

### Reality

The trade world that exists independently of GTOS.

### Representation

A model, record, message, document, view, or computation describing reality.

### Model Error

A divergence between a representation and verified business reality.


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

A port may accept a cargo movement before a partner platform has created its local shipment record. The cargo movement is real; the absence of a record is a knowledge and integration problem.

## Failure Modes and Risks

- Software workflow becomes a hidden trade policy.
- Migration changes historical meaning.
- AI learns implementation artifacts as if they were trade laws.

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

- [ ] Can the domain expert reject the model without being told the business is wrong?
- [ ] Can the implementation be replaced without changing the represented business concept?
- [ ] Are missing records distinguished from non-existent business facts?

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
