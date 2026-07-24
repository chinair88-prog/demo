# Engineering Standards

## Code structure

Use clear Domain, application, adapter, and infrastructure boundaries. Domain code must not depend on transport frameworks. Persistence models should not dictate business semantics.

## Quality gates

Every change passes formatting, static analysis, dependency rules, unit/property tests, integration tests, contract tests, security checks, migration checks, build reproducibility, and documentation validation.

## Git and review

Use small reviewable changes, protected branches, signed or attributable commits, mandatory review for critical areas, CODEOWNERS, semantic commit messages, and linked ADR/issue/test evidence.

## Configuration

Configuration is typed, validated, environment-specific, secret-free in source, and observable. Defaults must be safe. Runtime changes are audited.

## Error handling

Errors are typed and classified as validation, authorization, conflict, dependency, timeout, outcome unknown, business rejection, or internal defect. Do not expose secrets or implementation details.

## Documentation as code

Architecture, APIs, Events, migrations, operational procedures, diagrams, and conformance evidence live with version control and CI validation.
