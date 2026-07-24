# Workflow, Saga, and Recovery Architecture

## Workflow responsibilities

A workflow coordinates time, dependencies, approvals, external calls, retries, and compensation. It does not own the business facts produced by Domain services.

## Required workflow state

- process ID and business correlation;
- participating subjects and exact versions;
- current step and deadlines;
- submitted Commands and idempotency keys;
- observed Events and external responses;
- approvals and authority;
- retry budget and next action;
- compensation status;
- operator interventions;
- final outcome and audit.

## Outcome Unknown

When a call times out after possible external execution, the workflow records Outcome Unknown. It queries the provider, waits for a verified callback, or opens reconciliation. It does not retry a financial, customs, custody, or irreversible physical action blindly.

## Compensation

Compensation creates a new authorized Intent: release reservation, cancel booking, reverse ledger entry, issue correction, or request refund. It never deletes the original completed fact.

## Operational requirements

Workflows must survive process restart, deployment, broker outage, duplicate Event, late Event, timer loss, and manual intervention. Stalled and orphaned instances are observable and recoverable.
