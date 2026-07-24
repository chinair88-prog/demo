# Structure, Numbering, and Canonicalization Audit

## Findings

1. The canonical lifecycle contains 27 stages, while the publication contains 28 numbered stage chapters because invitation/submission and negotiation/selection were split.
2. The publication-to-canonical map created in Batch 01 is necessary and remains valid as a transitional mapping.
3. Earlier Reference Theory and Canon directories contain alternate or duplicate filenames that require a canonical index and deprecation redirects.
4. Purchase Order, RFQ, Quotation, Production Order, AI/MCP, service catalogues, ports, and database ownership contain repository-level contradictions.
5. Volume-level chapter counts are not completion evidence.

## Decision

- Preserve canonical lifecycle IDs independently from publication chapter numbers.
- Preserve duplicate source artifacts until a canonicalization decision records their disposition.
- Add `canonical_owner`, `implementation_owner`, `compatibility_owner`, and `retirement_status` to registries.
- Never merge similarly named concepts solely by filename similarity.
