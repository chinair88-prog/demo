# End-to-End Global Trade Lifecycle

The canonical lifecycle contains 27 stages:

1. Organization identity and onboarding.
2. Demand and requirement definition.
3. Request for quotation.
4. Supplier discovery and qualification.
5. Quotation invitation and submission.
6. Comparison and normalization.
7. Negotiation and supplier selection.
8. Contract and accepted terms.
9. Proforma Invoice.
10. Payment and risk approval.
11. Purchase Order and acknowledgement.
12. Production planning and capacity commitment.
13. Production execution and milestones.
14. Quality inspection, nonconformance, and release.
15. Packing List and Commercial Invoice.
16. Export customs and legal release.
17. Transport planning and booking.
18. Pickup, custody, and handover.
19. International transport and tracking.
20. Import customs, duties, and legal release.
21. Delivery and warehouse receiving.
22. Inventory synchronization and availability.
23. Product publication and marketplace eligibility.
24. Checkout and customer order.
25. Allocation, fulfilment, and last-mile delivery.
26. Returns, claims, refunds, and disputes.
27. Settlement, reporting, ESG, and learning.

## Stage contract

Every stage must specify:

- owner and external authority;
- entry and exit criteria;
- canonical subjects and versions;
- state machines and invariants;
- Decisions, Commands, Events, and queries;
- evidence and documents;
- workflow, deadlines, retries, and compensation;
- APIs, database ownership, and Portal journeys;
- AI participation and autonomy;
- security, privacy, SLOs, tests, and recovery;
- correction and dispute behavior.

## Lifecycle orchestration

The lifecycle is not a single central transaction. Durable workflows coordinate independently owned aggregates. State is advanced only by verified facts. If an external outcome is unknown, the process enters an explicit reconciliation state rather than assuming success or repeating the action blindly.
