# GTOS Meta-Model

## Dependency Chain

```text
Reality
 ├─ contains → Entities
 │   ├─ persist through → Identity
 │   ├─ exist within → Time
 │   ├─ exhibit → State
 │   └─ participate in → Relationships
 ├─ changes through → Events
 └─ is perceived through → Observations
      └─ support → Knowledge
           └─ supports → Decisions
                └─ authorizes → Intent
                     └─ initiates → Execution
                          └─ produces → Outcomes
```

History preserves Events, Observations, Decisions, Intent, Execution, Outcomes, and Corrections.

Authority constrains assertions, decisions, delegation, and execution.

Policy evaluates knowledge and context to produce permissions, obligations, or prohibitions.

## Meta-Model Invariants

1. No Relationship exists without independently identifiable participants.
2. No Event is meaningful without a subject, occurrence time, and transition semantics.
3. No historical Decision may be evaluated using information unavailable at decision time.
4. No Execution may claim legitimate business purpose without traceable Intent.
5. No derived view becomes authoritative merely through replication.
6. No correction erases the existence of the assertion being corrected.
7. No AI capability possesses authority unless authority has been explicitly delegated.

## Canon Admission Test

A candidate Canon is admissible only when it passes:

- **Independence:** the concept is not reducible to another Canon.
- **Necessity:** removing it creates incoherence or makes a required GTOS property impossible.
- **Derivation:** lower-level standards can be logically derived from it.
- **Placement:** it has a unique location in the Meta-Model.
- **Testability:** architectural consequences can be inspected.
