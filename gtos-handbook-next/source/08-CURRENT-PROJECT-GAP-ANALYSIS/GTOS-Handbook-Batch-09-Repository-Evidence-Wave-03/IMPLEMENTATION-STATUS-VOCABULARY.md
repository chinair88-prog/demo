# Implementation and Evidence Status Vocabulary

| Status | Meaning |
|---|---|
| `VERIFIED_IMPLEMENTED` | Executable code or migration supports the narrow claim |
| `IMPLEMENTED_WITH_GAP` | Executable behavior exists with material gaps |
| `IMPLEMENTED_WITH_CRITICAL_GAPS` | Executable behavior exists but security or truth-integrity defects block safe use |
| `PARTIAL_IMPLEMENTATION` | Only a subset of the capability is executable |
| `DEPRECATED_IMPLEMENTATION` | Executable but explicitly deprecated or pending removal |
| `LOCAL_EVENT_ONLY` | In-process event exists without durable broker/outbox evidence |
| `SIMULATED_REFERENCE_IMPLEMENTATION` | Static, in-memory, or rule simulation; not a production external integration |
| `PLANNED_NOT_IMPLEMENTED` | Intent/comments/contracts exist without executable end-to-end behavior |
| `CONFLICT_REQUIRES_CANONICALIZATION` | Competing owners or Systems of Record exist |
| `REQUIRES_REPOSITORY_REVIEW` | Evidence remains insufficient |
| `TEST_FILE_DISCOVERED` | Test source exists; execution result is unverified |
