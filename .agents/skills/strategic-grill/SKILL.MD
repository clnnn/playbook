---
name: strategic-grill
description: Grilling session that challenges your plan against the existing domain model, sharpens terminology, enforces domain categorisation, types every context-map relationship with a DDD pattern label and updates documentation (CONTEXT-MAP.md, CONTEXT.md, ADRs) inline as decisions crystallise. Use when user wants to stress-test a plan against their project's language and documented decisions.
---

<what-to-do>

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase, explore the codebase instead.

As you grill, drive toward these concrete outcomes:

1. **Challenge the plan** against the existing domain model and documented decisions.
2. **Sharpen terminology** — resolve fuzzy or conflicting terms into precise ubiquitous language, captured in `CONTEXT.md`.
3. **Categorise every context** as exactly one of `core`, `supporting`, or `generic`, and push back hard on weak `core` claims.
4. **Label every context-map relationship** with exactly one DDD pattern (e.g. `ACL`, `Customer-Supplier`, `Shared Kernel`) — never free-form prose.
5. **Capture decisions inline** in `CONTEXT.md`, `CONTEXT-MAP.md`, and ADRs as they crystallise, following the formats below.

</what-to-do>

<supporting-info>

## Domain awareness

During codebase exploration, also look for existing documentation:

### File structure

First, look for an existing documentation structure. Check whether the repo already has:

- A `CONTEXT-MAP.md` at the root, and
- Separate `CONTEXT.md` files for each context (typically alongside each package/lib).

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/ (or packages/, libs/, …)
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

**If neither a `CONTEXT-MAP.md` nor separate `CONTEXT.md` files exist, ask the user how the file structure should look before creating anything.** Don't assume a layout. For example, a monorepo will typically have one root `CONTEXT-MAP.md` plus a separate `CONTEXT.md` per package/lib. 

Create files lazily — only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately. 

> "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. 

> "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: 

> "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Subdomain alignment check

After establishing or changing context boundaries, always ask:

> "Does this boundary reflect a real business subdomain, or was it drawn for technical convenience?"

### Domain categorisation

When a context is established, ask the user to justify its tag (`core`, `supporting`, or `generic`)

| Tag | When to use |
|-----|-------------|
| `core` | Provides the competitive advantage that makes this product worth building. A `core` description must answer: *what specific capability would be lost if replaced with an off-the-shelf product?* |
| `supporting` | Necessary but not differentiating. Build lean or consider buying a component. |
| `generic` | Commodity solved problem. Default to buying off-the-shelf or using open source. |

**When a user labels something `core`, push back hard:**

> "What competitive advantage does this context provide, and to whom? If you replaced it with an off-the-shelf product tomorrow, what would you actually lose?"

A weak core-domain justification ("it's important") is not enough. A strong one names the specific capability no competitor can replicate. If the user can't name it, challenge whether it's really `core` or should be `supporting`.

When a context is tagged `generic`, probe whether it's actually being over-built:

> "This is classified as generic — is there an off-the-shelf solution you're not using? If so, why not?"

### Relationship labelling

Every relationship entry must carry exactly one label. Do not use free-form prose in place of a label.

  | Label | Team-autonomy implication |
  |-------|--------------------------|
  | `Shared Kernel` | Shared sub-model; both teams must sign off on changes |
  | `Customer-Supplier` | Upstream sets the interface; downstream adapts |
  | `Open Host Service` | Upstream publishes a stable versioned API; downstream consumes without negotiation |
  | `ACL` | Downstream owns translation; insulated from upstream model changes |
  | `Partnership` | Both teams must coordinate on interface changes; high coupling |
  | `Conformist` | Downstream enslaved to upstream model; use only when ACL cost exceeds benefit |
  | `Published Language` | OHS with a shareable documented format (JSON Schema, Avro, Protobuf) |
  | `Separate Ways` | No integration; teams fully independent |

  After the label, add a one-sentence implication note so the reader immediately understands the team-autonomy consequence.

### Update CONTEXT.md and CONTEXT-MAP.md inline

Write to these files the moment a decision crystallises — never batch them up, never wait until the end of the session:

- **As soon as a term is resolved**, update `CONTEXT.md` right there.
- **As soon as a context is established and tagged** (`core`, `supporting`, or `generic`), update `CONTEXT-MAP.md` right there.
- **As soon as a relationship is decided and labelled**, update `CONTEXT-MAP.md` right there.

Use the format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md) for `CONTEXT.md`, and the format in [CONTEXT-MAP-FORMAT.md](./CONTEXT-MAP-FORMAT.MD) for `CONTEXT-MAP.md`.

`CONTEXT.md` and `CONTEXT-MAP.md` should be totally devoid of implementation details. Do not treat them as a spec, a scratch pad, or a repository for implementation decisions. They are glossaries and nothing else.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).

</supporting-info>