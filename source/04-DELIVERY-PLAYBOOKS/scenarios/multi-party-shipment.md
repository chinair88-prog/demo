# Scenario — Multi-Party Shipment Consolidation

## Context

Multiple orders from different sellers are consolidated into cargo units, transported across legs, deconsolidated, and delivered to multiple buyers.

## Modeling

Orders, shipments, consignments, cargo units, transport legs, and custody Relationships retain independent identity. A container is not the shipment, and a shipment is not the transport service.

## Events

`CargoUnitPacked`, `ShipmentConsolidated`, `CustodyTransferred`, `TransportDeparted`, `TransportArrived`, and `ShipmentDelivered` describe distinct facts. Schedule updates are not actual movement events.

## State

A consolidated shipment may contain one held consignment and several releasable consignments. State is scoped; one universal status would either block too much or release too much.

## Recovery

If a message is duplicated, domain invariants and event identity prevent duplicate custody transfer. If events arrive out of order, occurrence time and sequence scope permit reconstruction while preserving receipt order.

## Analytics

A control tower projects end-to-end progress but does not own order, customs, payment, or physical movement truth.
