# Domain Dependency Matrix

| Domain | Depends On | Publishes To | Critical Coupling Rule |
|---|---|---|---|
| Party | external identity authorities | all domains | consumers reference Party identity; they do not edit it |
| Product | classification authorities | Order, Shipment, Compliance | product version and jurisdiction are explicit |
| Agreement | Party, Product | Order, Finance, Insurance | obligations preserve effective time |
| Order | Party, Product, Agreement | Shipment, Finance | allocation does not redefine product or agreement |
| Shipment | Order, Party, Product | Transport, Compliance, Risk | custody and cargo identity remain distinct |
| Transport | Party, Shipment | Shipment, Risk | schedule and actual movement are separate |
| Document | all relevant domains | Compliance, Finance, Evidence | versions and signatures are immutable |
| Compliance | Party, Product, Shipment, Document | Case, Shipment, Risk | legal decisions remain authority-owned |
| Finance | Agreement, Order, Document | Risk, Evidence | approval, execution, settlement are distinct |
| Decision | Evidence, Policy, Authority | all domains | Decision does not directly own domain state |
| Evidence | all domains | Decision, Audit | derived artifacts retain source lineage |
