# Scenario — Trade Finance and Settlement

## Context

A buyer, seller, bank, carrier, and insurer coordinate documentary obligations and payment.

## Separation of Concepts

An invoice is evidence of a claimed obligation, not proof of settlement. A bank recommendation is not payment approval. Payment approval is a Decision. Payment Intent authorizes execution. Settlement is an Event owned by the settlement authority.

## Workflow

Agreement terms define required documents and deadlines. Documents are presented with versions and signatures. Validation produces observations and findings. The bank decision uses an Evidence Set and policy. Approved payment produces Intent with amount, currency, beneficiary, limits, and idempotency key. The payment service executes and records settlement or failure.

## Duplicate Protection

A lost response does not imply failed settlement. Retrying with the same idempotency key queries or resumes execution. A second business payment requires new Intent and authority.

## Correction

If a document was fraudulent, investigation does not delete settlement history. New evidence may create fraud Decision, recovery Intent, insurance claim, or legal hold.
