# Architecture Documentation Standard

## Purpose

GTOS documentation is part of the control system. It communicates meaning, supports delivery, enables audit, and preserves decisions. Documents that cannot be maintained or verified create false confidence.

## Required Metadata

Normative documents declare title, purpose, owner, status, version, scope, dependencies, review date, and approval authority. Generated pages inherit repository version and source path. Machine-readable registries are used when structured ownership or traceability is required.

## Writing Rules

Use business terms from the glossary. Define new terms before use. Use SHALL only for objective conformance. Separate facts, assumptions, decisions, recommendations, examples, and open questions. Prefer tables for comparisons and matrices, diagrams for structure and flow, and scenarios for behavior.

## Diagram Rules

Every diagram has purpose, scope, legend where needed, and owned source. Logical diagrams SHALL not imply physical deployment accidentally. Arrows state meaning: data, Command, Event, authority, or dependency. Colors are not the sole carrier of information.

## Currency

Documentation changes with the implementation when meaning or operation changes. Broken links, obsolete owners, unsupported versions, and unresolved placeholders fail release validation. Generated site files are not edited directly.

## Decision Records

Consequential decisions use ADRs with context, options, decision, consequences, Canon traceability, and review trigger. Chat transcripts and presentation slides MAY support context but are not substitutes for the approved record.

## Operational Documentation

Runbooks contain triggers, authority, prerequisites, steps, evidence, rollback, escalation, and completion. During incidents, operators must be able to navigate from alert to runbook, dependency, owner, dashboard, and recent changes.

## Accessibility

Tables have clear headers, diagrams include text alternatives, language is direct, pages print cleanly, and UI supports keyboard navigation and responsive layouts.
