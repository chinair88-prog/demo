# Security, Privacy, and Compliance

## Identity

GTOS recognizes human, organization, service, workload, device, provider, and AI Agent identities. Authentication uses standards-based federation, strong service identity, MFA for privileged users, and managed session lifecycles.

## Authorization

Authorization evaluates principal, represented party, tenant, organization, relationship, role, attributes, delegation, mandate, purpose, resource, action, jurisdiction, risk, and time. High-impact actions require separation of duties and step-up authentication.

## Tenant isolation

Tenant context is established at the trusted edge, cryptographically or operationally bound to identity, propagated through calls and Events, and enforced in every repository query, cache key, search index, object path, log, metric, and analytical dataset. Tests attempt cross-tenant access continuously.

## Data protection

Classify data, minimize collection, encrypt in transit and at rest, tokenize high-risk values, isolate keys and secrets, rotate credentials, prevent sensitive logs/prompts, and enforce purpose, consent, retention, residency, legal hold, export, and deletion rules.

## Application and integration security

Apply threat modeling, secure coding, dependency and container scanning, signed artifacts, SBOM, rate limits, abuse detection, webhook verification, SSRF protection, file scanning, browser sandboxing, prompt-injection defenses, and privileged tool controls.

## Audit and non-repudiation

Binding Decisions, document issuance, payments, customs submissions, quality release, custody, settlement, access-policy changes, AI tool execution, and emergency access require immutable audit with actor, authority, source, time, reason, before/after, and integrity evidence.
