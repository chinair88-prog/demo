# Event Evolution Pattern

## Objective

Event schemas must evolve without changing the meaning of facts already published.

## Compatibility

Additive optional fields are generally compatible. Renaming, changing units, changing identifier scope, altering temporal meaning, or changing authority semantics are breaking even when JSON remains parseable.

## Rules

- Event identity and historical payload remain immutable.
- Producers publish a schema version.
- Consumers declare supported versions.
- Transformations preserve original event reference.
- A corrected business fact is a new Event, not a rewritten old Event.
- Deprecated versions have owners, consumers, sunset dates, and replay plans.

## Semantic Review

Reviewers SHALL ask whether a consumer built under the old meaning would reach a different business conclusion. If yes, the change is semantically breaking.

## Replay

Before replaying historical Events into new consumers, teams SHALL evaluate whether new code interprets old facts using historically appropriate semantics. Reprocessing with present-day rules may produce a new derived perspective but SHALL not masquerade as the original historical result.
