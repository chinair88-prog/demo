# Critical Findings and Issue Register

| ID | Severity | Finding | Required action |
|---|---|---|---|
| AUD-001 | Critical | Batches 02-06 were labelled `Draft Complete` despite being template-derived | use Audited-v2 packages and expand subject-specific content |
| AUD-002 | Critical | repository evidence in generated corpus is near zero | perform code-by-code evidence enrichment |
| AUD-003 | Critical | word and file counts were used in ways that could imply completion | use semantic completion gates instead |
| AUD-004 | High | original Master is nested packaging, not merged source | publish an expanded canonical source tree later |
| AUD-005 | High | XLSX zero-addition classification is unreliable | rebuild catalogue from direct file reads |
| AUD-006 | High | canonical lifecycle and publication numbering differ | retain explicit mapping and stable IDs |
| AUD-007 | High | generic reference APIs and tables are repeated as if chapter-specific | replace with verified or clearly target-specific contracts |
| AUD-008 | High | major Domain ownership conflicts remain | create canonicalization ADRs and ownership matrices |
| AUD-009 | Medium | prior compact edition is only 42,939 Markdown words across 258 files | retain as legacy reference, not final edition |
| AUD-010 | Medium | no current PDF exists for the expanded corpus | defer PDF until content review and deduplication |

## Gate

No new mass template generation is permitted until the current subject family is enriched with concrete repository evidence and reviewed for ownership, duplication, and correctness.
