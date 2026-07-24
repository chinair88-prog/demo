# Repository Evidence Wave 01 - Payment

## Evidence baseline

Inspected files:

- `backend/domain/commerce/payment-service/src/main/java/com/allinb2c/commerce/payment/entity/PaymentIntentEntity.java`
- `backend/domain/commerce/payment-service/src/main/java/com/allinb2c/commerce/payment/service/PaymentIntentService.java`
- `backend/domain/commerce/payment-service/src/main/java/com/allinb2c/commerce/payment/api/PaymentController.java`

## Verified implementation

`PaymentIntentEntity` maps to `payment_service_intents` and defines indexes for order, status, provider, customer, creation, expiry, and tenant. It records amount, currency, capture mode, status, provider, provider reference, customer, description, expiry, errors, metadata, a unique idempotency key, and a JPA optimistic-lock version.

Lifecycle methods support captured, partially captured, cancelled, expired, and failed states. Captured intents cannot be cancelled.

`PaymentIntentService` implements creation, idempotency lookup, tenant-aware queries, pagination, provider/customer/status filters, and cancellation. The service obtains tenant context from a gateway-injected header and uses unscoped behavior when the context is absent for internal flows.

`PaymentController` exposes payment intents, capture, refund, settlement, payout, webhook, dispute, summary, and provider information under `/api/payments`.

## Verified gaps and risks

- Legacy/internal unscoped access is deliberately preserved and requires strong trusted-caller controls.
- Tenant context depends on a gateway-injected header; direct-service access must be prevented or independently authenticated.
- Idempotency lookup is by idempotency key without an inspected tenant predicate; a global unique key may cause cross-tenant behavior unless keys are globally namespaced and responses are protected.
- The inspected payment-intent status model starts at `REQUIRES_CAPTURE`; separate authorization, risk approval, and Outcome Unknown states are not part of this Entity.
- No formal PI risk-approval Decision aggregate was established in the inspected files.
- Webhook signature verification and provider-outcome reconciliation require inspection of additional classes.

## Status decision

| Capability | Status |
|---|---|
| payment-intent entity, indexes, expiry and lifecycle methods | `VERIFIED_IMPLEMENTED` |
| idempotency key and optimistic locking | `VERIFIED_IMPLEMENTED` |
| tenant-aware intent reads | `VERIFIED_IMPLEMENTED` with legacy unscoped path |
| intent/capture/refund/settlement/payout/webhook API surface | `VERIFIED_IMPLEMENTED` |
| trusted gateway and direct-access enforcement | `REQUIRES_REPOSITORY_REVIEW` |
| PI payment-risk approval workflow | `PARTIAL_IMPLEMENTATION` / separate capability not verified |
| provider signature and Outcome Unknown reconciliation | `REQUIRES_REPOSITORY_REVIEW` |
