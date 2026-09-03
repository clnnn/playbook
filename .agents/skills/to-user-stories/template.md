# Story template

The five sections, in this order. The bracketed notes are instructions to the writer — delete them from the finished story.

# [Story title — user-value-focused, verb first]

## 1. Story

**As a** [the persona this conversation names]
**I want to** [action]
**so that** [outcome]

## 2. Scope

**In**
- [what this story delivers — the one complete slice]

**Out**
- [the neighbouring work the next slices own]

## 3. Acceptance criteria

```gherkin
Scenario: [happy path]
  Given [precondition]
  When [single action]
  Then [observable outcome]

Scenario: [edge case]
  Given [precondition]
  When [single action]
  Then [observable outcome]

Scenario: [failure mode]
  Given [precondition]
  When [single action]
  Then [observable error state or message]
```

## 4. Implementation decisions

[The decisions already made — modules built or modified and the
interfaces that change, architectural calls and the ADRs they
follow, schema changes, API contracts, specific interactions,
clarifications the developer gave in conversation. Cite an ADR by
number rather than restating it.

Exception: a snippet that encodes a decision more precisely than
prose can — a state machine, a reducer, a schema, a type shape.
Inline it in its decision, trimmed to the decision-rich part, and
note where it came from.]

- **[module | interface | schema | contract | ADR-NNN]** — [the decision]

## 5. Testing decisions

[A good test exercises external behaviour through a seam — never
implementation details. Name the seams this story is tested
through, the modules under test, and the prior art: the tests
already in this repo that these should look like.]

- **Seam** — [where the test observes, existing or new]
- **Under test** — [modules]
- **Prior art** — [the existing tests of this shape]
