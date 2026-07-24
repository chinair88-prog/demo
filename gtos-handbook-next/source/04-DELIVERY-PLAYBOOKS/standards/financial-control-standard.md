# Financial Control Standard

## Separation of Duties

Creation of an obligation, approval of payment, execution of settlement, and reconciliation SHOULD be separable. Where automation combines steps, independent policy and audit controls are required.

## Monetary Semantics

Amounts include currency, precision, sign meaning, tax or fee treatment, exchange-rate source, and effective time. Floating-point representation SHALL not be used for authoritative monetary calculation.

## Payment Intent

Payment execution requires Intent containing beneficiary, account or instrument reference, amount, currency, purpose, authority, limits, validity, and idempotency.

## Fraud and Risk

Risk signals inform policy and Decisions but do not silently change obligations. High-risk or unusual transactions may require additional evidence or dual approval.

## Settlement

A provider acceptance is not settlement. Settlement state is owned by the recognized settlement authority. Reconciliation compares authoritative settlement facts to obligations and execution records.

## Correction

Financial corrections use adjustment, reversal, refund, chargeback, or compensating entry according to authority and accounting meaning. Historical entries are not simply edited.

## Audit

Records preserve decision authority, evidence, approval, execution, provider response, settlement, reconciliation, and exceptions.
