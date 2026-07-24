# Repository Evidence Wave 01 - Proforma Invoice

## Evidence baseline

Verified commit: `14cc83805e7386c3d5cdec6ad191b1078fd502ff`.

Inspected files:

- `backend/domain/commerce/tajerestan-services/src/main/java/com/allinb2c/commerce/tajerestan/entity/ProformaInvoiceEntity.java`
- `backend/domain/commerce/tajerestan-services/src/main/java/com/allinb2c/commerce/tajerestan/service/ProformaInvoiceService.java`
- `backend/domain/commerce/tajerestan-services/src/main/java/com/allinb2c/commerce/tajerestan/api/ProformaInvoiceController.java`

## Verified implementation

`ProformaInvoiceEntity` maps to `tb_proforma_invoice`. It records PI number, supplier, customer, quotation and purchase-order references, Incoterm, currency, payment terms, prepayment ratio, ports, country, shipping method, estimated ship date, expiry date, total amount, status, notes, company, timestamps, items, and payment schedules.

The documented status vocabulary in source is `DRAFT`, `SENT`, `ACCEPTED`, `CONVERTED`, and `CANCELLED`.

`ProformaInvoiceService` implements:

- create PI and line items;
- get and list;
- send;
- accept;
- convert to a Purchase Order reference;
- Events `trade.proforma-invoice.created`, `.sent`, `.accepted`, and `.converted`.

`ProformaInvoiceController` exposes:

- `POST /api/v1/trade/proforma-invoices`;
- `GET /api/v1/trade/proforma-invoices/{id}`;
- `GET /api/v1/trade/proforma-invoices`;
- `PUT /api/v1/trade/proforma-invoices/{id}/send`;
- `PUT /api/v1/trade/proforma-invoices/{id}/accept`;
- `POST /api/v1/trade/proforma-invoices/{id}/convert`.

## Verified gaps

- Service uses a constant `DEFAULT_COMPANY_ID` and also assigns it as customer ID.
- `supplierId` can become null through `safeUUID`, while the Entity declares it non-null.
- No immutable PI version entity or optimistic-lock field was found.
- Send, accept, and convert methods do not enforce explicit source-state guards.
- The `purchaseOrderId` parameter accepted by list service is not used in the inspected query selection.
- PI number generation is time/random based and not a governed numbering policy.
- The inspected code does not establish approval, signature, beneficiary verification, expiry enforcement, or payment-risk approval.

## Status decision

| Capability | Status |
|---|---|
| PI entity and persistence mapping | `VERIFIED_IMPLEMENTED` |
| create/get/list/send/accept/convert endpoints | `VERIFIED_IMPLEMENTED` |
| line items and payment-schedule relationships | `VERIFIED_IMPLEMENTED` |
| basic trade Events | `VERIFIED_IMPLEMENTED` |
| tenant-context enforcement | `IMPLEMENTED_WITH_GAP` |
| lifecycle guards | `IMPLEMENTED_WITH_GAP` |
| immutable commercial versioning | `PLANNED_NOT_IMPLEMENTED` in inspected source |
| formal approval/signature/risk workflow | `REQUIRES_REPOSITORY_REVIEW` |
