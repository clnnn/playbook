# ADR format

ADRs use [MADR](https://adr.github.io/madr/) (Markdown Architectural Decision Records).

Files live in `docs/adr/` and use sequential numbering: `0001-slug.md`, `0002-slug.md`, etc.

For system-wide decisions, use `docs/adr/` at the repo root.

Create the `docs/adr/` directory lazily — only when the first ADR is needed.

## Minimal template

Start here. Most ADRs need nothing more.

```markdown
# [Short title — decision and solution]

* Status: accepted
* Date: YYYY-MM-DD

## Context and Problem Statement

[Two or three sentences: what situation forced this decision?]

## Considered Options

* [Option A]
* [Option B]

## Decision Outcome

Chosen option: "[Option A]", because [why this option over the others].
```

## Optional sections

Only add these when they genuinely help a future reader. Most ADRs won't need them.

```markdown
## Decision Drivers

* [Force or concern that shaped the choice]

### Positive Consequences

* [What gets better]

### Negative Consequences

* [What gets worse or what debt is taken on]

## Pros and Cons of the Options

### [Option A]

* Good, because [argument]
* Bad, because [argument]

### [Option B]

* Good, because [argument]
* Bad, because [argument]

## Links

* Superseded by [ADR-0005](0005-example.md)
```

`Status` values: `proposed` | `accepted` | `deprecated` | `superseded by [ADR-XXXX](XXXX-slug.md)`

## Numbering

Scan `docs/adr/` for the highest existing number and increment by one.

## When to offer an ADR

All three of these must be true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR.

### What qualifies

**Architectural shape**
- "We're using a monorepo with independent deployable packages."
- "The write model is event-sourced, the read model is projected into Postgres."

**Integration patterns between contexts**
- "Ordering and Billing communicate via domain events, not synchronous HTTP."
- "Billing uses ACL against Ordering rather than being Conformist, because we anticipate replacing Ordering in 18 months."

**Technology choices that carry lock-in**
- Database, message bus, auth provider, deployment target. Not every library — just the ones that would take a quarter to swap out.

**Boundary and scope decisions**
- "Customer data is owned by the Customer context; other contexts reference it by ID only."

**Domain categorisation choices** _(DDD-specific)_
- "We classified Auth as `generic` and chose Clerk over building our own, accepting Clerk's session model as-is (Conformist)."

**Context map relationship type choices** _(DDD-specific)_
- "Billing uses ACL against Ordering rather than Conformist, because we anticipate replacing Ordering with a third-party OMS in 18 months."

**Deliberate deviations from the obvious path**
- "We're using manual SQL instead of an ORM because X."

**Constraints not visible in the code**
- "We can't use AWS because of compliance requirements."

**Rejected alternatives when the rejection is non-obvious**
- If you considered GraphQL and picked REST for subtle reasons, record it — otherwise someone will suggest GraphQL again in six months.
