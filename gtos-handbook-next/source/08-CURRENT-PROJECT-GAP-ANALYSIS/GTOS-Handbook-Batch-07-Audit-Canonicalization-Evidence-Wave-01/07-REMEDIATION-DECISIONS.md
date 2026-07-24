# Remediation Decisions

## Completed in this Batch

- audited all available final Batch Markdown files line by line programmatically;
- verified ZIP CRC and Manifest hashes;
- inspected the prior PDF visually and structurally;
- inspected the XLSX workbook structure and formulas;
- created corrected `AUDITED-v2` packages for Batches 01-06;
- changed overstated maturity labels;
- created corrected Master `AUDITED-v2`;
- began repository evidence enrichment for PI, Payment, PO, and Manufacturing.

## Mandatory next actions

1. Enrich one Domain or lifecycle area at a time from executable evidence.
2. Calculate a chapter evidence score and template-residual score.
3. Replace generic aggregate/API/table sections with repository-specific and target-specific sections.
4. Resolve ownership conflicts through explicit ADRs.
5. Add exact tests, migrations, routes, schemas, Portals, and operational evidence.
6. Regenerate catalogues from direct source reads.
7. Build PDF only after deduplication and content review.
