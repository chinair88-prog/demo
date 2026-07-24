# Scenario — Pharmaceutical Cold Chain

## Context

A temperature-controlled pharmaceutical shipment moves from manufacturer to airport, airline, destination terminal, customs, and hospital distributor. Product stability, custody, temperature, documentation, release, and insurance are governed by different authorities.

## Flow

The Product Domain owns the regulated product identity and storage specification. The Agreement Domain owns service obligations. The Shipment Domain owns cargo grouping and custody milestones. Sensors publish Observations. The platform records occurrence, observation, and recording time separately.

At 14:02 the refrigeration unit fails. A sensor observes the condition at 14:05. Connectivity transmits it at 14:09. Risk produces a recommendation at 14:10. An authorized logistics Decision at 14:12 directs transfer to qualified cold storage. Intent is issued to the terminal operator, which executes and records the Outcome.

## Architectural Analysis

The sensor Observation is not automatically authoritative product damage. Product stability may require duration, temperature curve, and qualified assessment. The AI recommendation is not the Decision. The Decision Record includes the knowledge cutoff and evidence. Insurance and compliance consume the preserved chain.

## Failure Handling

If the sensor is later found miscalibrated, the original Observation remains. A correction and calibration evidence are added. Decisions are reviewed using what was knowable at the time. Remediation may be unnecessary, but the earlier emergency transfer remains a real Outcome.

## Canon Coverage

This scenario exercises all eleven Canons, particularly time, knowledge, decision, intent, and historical correction.
