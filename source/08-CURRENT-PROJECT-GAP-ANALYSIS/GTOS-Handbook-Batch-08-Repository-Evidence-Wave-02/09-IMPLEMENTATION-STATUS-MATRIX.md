# 09 — Implementation Status Matrix

| Area | Narrow verified behavior | Classification | Main blocker |
|---|---|---|---|
| Trade Quality Inspection | Mock inspection UI only | `REFERENCE_ARCHITECTURE` | Aggregate/API/Evidence missing |
| Software Quality Gates | Metrics, gates, reports | `VERIFIED_IMPLEMENTED` | Different Domain |
| Inventory QC Hold | Hold and disposition | `PARTIAL_IMPLEMENTATION` | Inspection Decision absent |
| Tajerestan Packing List | Entity, create/get/list/Event | `IMPLEMENTED_WITH_GAP` | identity, weights, versioning |
| Partner Packing List | list/get/patch/audit | `IMPLEMENTED_WITH_GAP` | create unavailable, duplicate owner |
| Commercial Invoice | table/list/get/patch | `PARTIAL_IMPLEMENTATION` | create/generate/issue missing |
| Export Declaration | table/create/list/update/submit | `IMPLEMENTED_WITH_GAP` | authority evidence/doc operations |
| PO Customs | mutable PO status and Event | `IMPLEMENTED_WITH_GAP` | not legal release |
| Import Declaration | full operational lifecycle | `IMPLEMENTED_WITH_GAP` | manual authority/state/migration gaps |
| Booking | table and real Portal/API | `IMPLEMENTED_WITH_GAP` | custody boundary |
| Trade Shipment | entity/API/tracking/Kafka | `IMPLEMENTED_WITH_GAP` | tenant and Event reliability |
| Custody Transfer | HANDED_OVER status only | `CLIENT_CONTRACT_PRESENT` | no bilateral evidence |
| Warehouse ASN/Dock | create/status/schedule/check-in | `IMPLEMENTED_WITH_GAP` | scoping, receipt evidence, Event |
| Provider WMS | tables and references | `VERIFIED_IMPLEMENTED` schema | competing owner/runtime verification |
| Inventory | balance/posting/QC/reservation | `IMPLEMENTED_WITH_GAP` | auth, idempotency, invariants |
