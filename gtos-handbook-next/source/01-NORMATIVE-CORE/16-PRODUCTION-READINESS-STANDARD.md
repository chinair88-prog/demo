# Production Readiness Standard

A capability may enter production only when:

- ownership and on-call are assigned;
- threat model and privacy review are complete;
- authentication, authorization, tenant isolation, rate limiting, and audit are tested;
- migrations are upgrade-tested and rollback/backout is defined;
- idempotency and concurrency behavior are proven;
- Events and workflows survive duplicate, loss, delay, restart, and replay;
- dependencies have timeouts, circuit breakers, and fallback/reconciliation;
- SLOs, dashboards, alerts, runbooks, and capacity exist;
- backup and restore have been exercised;
- performance and failure tests meet thresholds;
- Portal E2E and accessibility pass;
- AI evaluations and kill switches pass where AI is used;
- release, rollback, and communication plans are approved;
- known risks and exceptions are recorded with expiry.

Production readiness is a joint Decision by the Domain owner, platform owner, security, SRE, and relevant business authority.
