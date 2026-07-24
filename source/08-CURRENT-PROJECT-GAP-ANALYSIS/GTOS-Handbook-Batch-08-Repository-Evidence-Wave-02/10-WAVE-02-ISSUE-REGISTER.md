# 10 — Wave 02 Issue Register

| ID | Severity | Area | Finding | Required action |
|---|---|---|---|---|
| W2-001 | Critical | Quality | Inspection page uses static mock records | Replace with real API or label as demo. |
| W2-002 | Critical | Quality | No canonical trade Inspection/Measurement/Release aggregate | Create Quality Domain and authority model. |
| W2-003 | High | Quality | Warehouse client claims /quality/status side effects; backend target not located | Resolve route and add integration tests. |
| W2-004 | Critical | Packing | Tajerestan and Partner packing lists compete | Declare System of Record and migration. |
| W2-005 | High | Packing | PackingListService calculates no net weight | Extend request model and validate totals. |
| W2-006 | Critical | Packing | Default UUID used as supplier and company | Use trusted tenant/organization context. |
| W2-007 | High | Documents | Commercial Invoice create/generate endpoints return 503 | Implement governed creation. |
| W2-008 | High | Documents | Issued document version/signature model absent | Add immutable versions and signing. |
| W2-009 | Critical | Customs | PO customs clear can be mistaken for legal release | Require authority evidence and rename internal action. |
| W2-010 | High | Export Customs | Customs document endpoints return 503 | Implement evidence attachment. |
| W2-011 | High | Export Customs | Partner predicate not visible in all SQL operations | Enforce ownership on every query/update. |
| W2-012 | Critical | Import Customs | Migration drops import_declarations | Add environment/data gate and non-destructive migration. |
| W2-013 | High | Import Customs | CLEARED may transition to DUTY_PAID | Correct state machine. |
| W2-014 | High | Import Customs | Zero duty/tax values only produce warnings | Require policy/exception approval. |
| W2-015 | Critical | Import Customs | Manual mark-cleared lacks authority adapter evidence | Store signed authority observation. |
| W2-016 | High | Shipping | Shipment item tenantId is assigned shipment UUID | Correct code and migrate data. |
| W2-017 | Critical | Shipping | Shipment reads/writes are not visibly tenant-scoped | Apply trusted tenant context and isolation tests. |
| W2-018 | High | Shipping | Kafka failure is swallowed after DB mutation | Use transactional outbox. |
| W2-019 | High | Shipping | eventType is not included in payload | Use governed Event envelope. |
| W2-020 | High | Shipping | Status is unrestricted string | Add typed transitions. |
| W2-021 | High | Shipping | Tracking history is mutable JSON | Create qualified observation journal. |
| W2-022 | Critical | Custody | HANDED_OVER status is not custody proof | Implement bilateral custody evidence. |
| W2-023 | Critical | Warehouse | ASN ID operations lack visible tenant scoping | Scope repository methods. |
| W2-024 | High | Warehouse | ASN status accepts arbitrary string | Use typed Commands and guards. |
| W2-025 | Medium | Warehouse | Receiving summary assumes ten dock doors | Model facility capacity. |
| W2-026 | Critical | Warehouse | Provider WMS and Warehouse Service overlap | Canonicalize ownership. |
| W2-027 | Critical | Inventory | Tenant/company/user are accepted via query parameters | Derive from auth context. |
| W2-028 | Critical | Inventory | Ledger endpoint appears globally unscoped | Add tenant/warehouse filtering and authorization. |
| W2-029 | High | Inventory | Idempotency key is stored but not checked first | Add duplicate guard before mutation. |
| W2-030 | High | Inventory | Transfer/adjustment can create negative stock | Add invariants and DB constraints. |
| W2-031 | High | Inventory | Receipt immediately increases available stock | Apply quarantine/quality policy. |
| W2-032 | Medium | Inventory | Reservation uses first matching balance | Define deterministic allocation policy. |
| W2-033 | High | Cross-domain | No transactional outbox found for reviewed flows | Standardize outbox/inbox. |
| W2-034 | Medium | Testing | Test-file existence is not execution evidence | Run CI and attach logs/results. |
