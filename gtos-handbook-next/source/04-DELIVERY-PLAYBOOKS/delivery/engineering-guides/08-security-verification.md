# Security Verification Guide

## Verification Strategy

GTOS security verification combines design review, automated tests, abuse cases, adversarial exercises, penetration testing, policy simulation, access review, and incident drills. It covers business authority as well as technical exploitation.

## Identity Tests

Verify human, workload, partner, device, and Agent identity lifecycle. Test expired, revoked, duplicated, and compromised credentials. Confirm that authentication alone does not grant domain authority.

## Authorization Tests

Test positive and negative cases across role, Relationship, delegation, purpose, jurisdiction, classification, time, and risk. Confirm cached authorization expires no later than mandate validity. Test object-level and field-level access.

## Business Abuse Cases

Attempt duplicate settlement, unauthorized release, forged Event, replayed Command, ownership takeover, document substitution, evidence deletion, identifier merge abuse, and emergency-access misuse. Verify invariant and audit controls.

## AI Adversarial Tests

Test prompt injection, poisoned evidence, tool argument manipulation, secret extraction, cross-tenant context, mandate expansion, unsafe chaining, fabricated approval, and denial of wallet. Tool gateways SHALL deny unauthorized actions independent of model output.

## Resilience and Incident

Test credential revocation during active workflow, partner compromise, key rotation, audit-store degradation, policy-service failure, and emergency containment. Verify evidence remains available and response does not produce unauthorized default permit.

## Release Evidence

Findings include severity, exploit path, business impact, affected authority, evidence, remediation, owner, and verification. Critical findings block release. Approved residual risk has accountable authority and expiry.
