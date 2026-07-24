# Claim and Evidence Audit

## Concrete evidence found in the generated chapter corpus

| Evidence kind | Count |
|---|---:|
| concrete `backend/` paths | 1 |
| concrete frontend paths | 0 |
| Java implementation filenames | 0 |
| migration SQL filenames | 0 |
| commit SHAs | 0 |
| source line citations | 0 |
| concrete service ports | 0 |

The thousands of API-route matches are generated reference surfaces repeated across chapters, not inspected repository routes.

## Critical distinction

```text
Reference API proposed by the Handbook
    != route found in source
    != behavior verified by test
    != behavior observed at runtime
```

## Required upgrade evidence

A chapter may be upgraded from `TEMPLATE_DERIVED_REFERENCE_SKELETON` only after it identifies, at minimum:

- exact repository paths and verified commit;
- entities, aggregates, state fields, and lifecycle methods;
- controllers, route methods, request/response types, and authorization;
- migrations, table names, keys, indexes, and ownership;
- Events, outbox, consumers, replay, and workflow links;
- Portal routes and client contracts;
- tests proving positive, negative, concurrency, tenant, security, and recovery behavior;
- deployment and operational evidence where relevant;
- specific gaps and contradictions.
