# Evidence Wave 01 Traceability Matrix

| Area | Entity/Table | Service | Controller/API | Events | Principal status |
|---|---|---|---|---|---|
| Proforma Invoice | `tb_proforma_invoice`, items, schedules | `ProformaInvoiceService` | `/api/v1/trade/proforma-invoices` | created/sent/accepted/converted | `IMPLEMENTED_WITH_GAP` |
| Payment | `payment_service_intents` and related payment tables | `PaymentIntentService` / application service | `/api/payments` | requires additional Event inspection | `IMPLEMENTED_WITH_GAP` |
| Purchase Order - Procurement | `procurement.purchase_orders` and items | Procurement `PurchaseOrderService` | `/api/procurement/purchase-orders` | none found in inspected service | `IMPLEMENTED_WITH_GAP` |
| Purchase Order - Tajerestan | `purchase_orders` and line items | Tajerestan `PurchaseOrderService` | Tajerestan API requires separate route profile | trade PO Events | `CONFLICT_REQUIRES_CANONICALIZATION` |
| Manufacturing | `manufacturing.tb_production_order`, materials, progress, schedules | `ProductionOrderService` | `/api/manufacturing/production-orders` | none found in inspected service | `PARTIAL_IMPLEMENTATION` |

## Next evidence targets

- migrations and indexes for all four areas;
- security configuration and method/route authorization;
- tests, tenant isolation, concurrency, and negative transitions;
- Portal pages and client contracts;
- EventPublisher implementation, topics, outbox, consumers, replay, and DLQ;
- provider/webhook verification and reconciliation;
- canonical ownership ADRs for PO and Production Order.
