# Observability Dashboard Design

## Audience Views

Executives need value-stream outcomes, risk, and benefit realization. Product and domain owners need flow, exceptions, decisions, and data quality. Engineers need service and dependency behavior. Security needs identity, policy, access, and threat signals. Operations needs actionable health and runbook context.

## Dashboard Layers

The first layer shows business journey success, volume, latency, blocked work, and SLO status. The second shows domain state, Command rejection, Event freshness, evidence gaps, decision outcomes, and correction backlog. The third shows technical resources, dependencies, releases, queues, and error detail.

## Required Dimensions

Metrics SHOULD support domain, tenant or participant, jurisdiction, version, environment, partner, value stream, decision type, and severity where classification permits. High-cardinality identifiers are searched through protected logs or traces rather than placed indiscriminately in metric labels.

## Causal Navigation

A user moves from an outcome metric to affected subjects, correlated workflows, policy evaluations, Events, traces, and deployment changes. Correlation assists investigation but does not prove causality.

## Alert Design

Alerts indicate owned impact: “customs release events are stale for EU imports” is stronger than “consumer lag above threshold.” Every alert has severity, user impact, owner, runbook, suppression rule, and completion signal.

## AI and Decision Monitoring

Dashboards show model route, evaluation status, evidence faithfulness, escalation, decision reversal, unsafe tool attempts, drift, and containment state. Quality decline can suspend automation before general service failure.

## Review

Dashboards are reviewed in production readiness and after incidents. Unused panels are removed. Missing signals become engineering work with owners and deadlines.
