---
name: cut
description: Cut a conversation into release slices, each shippable on its own, named by the journey it serves
disable-model-invocation: true
---

## What a slice is

- **Shippable on its own.** The cut is right when the promise can be written, "after this slice, a user can ___", and wrong when it can't. A slice that ships against a mock says so: "…with sample data".
- **Vertical.** A slice cuts a narrow but complete path through every layer (schema, API, UI, tests) for one path a user takes.
- **Named by journey.** Scope and name each slice by what a user is trying to accomplish, so it is demoable and reads at a glance.

**Slice 1 is the walking skeleton**: the thinnest path through every layer the product will need, deployed. As simple as possible, but it touches every structural element for real (the auth, the data store, the boundary to each external dependency), each in its thinnest form. Its promise is often modest; its job is to make every later slice cheap.

## How slices are ordered

- **Mark each risk structural or local.** Structural: a decision every later slice sits on (the data model, identity, a core boundary). Local: something that can be fixed in place later (one screen, one export).
- **Simplicity first, structural pulled forward.** Order slices easiest-first, then move ahead any slice carrying an unresolved structural risk, and say on the slice why it moved. Local risks stay where they fall.
- **External dependencies are isolated, not waited on.** Knowing an integration is possible is enough to cut the slice; its details go behind a boundary and work continues against the mock.

## Steps

1. **Cut the skeleton.** List every structural element the product will need — the source's scope and dependencies, or the conversation — and cut the thinnest deployed path that touches each one for real. Write its promise.
2. **Cut the rest.** One slice per journey, until every path a user takes in the source lands in exactly one slice. Write each promise; a promise that can't be written honestly reshapes the slice until it can.
3. **Order.** Mark each slice's risk, sort easiest-first, pull structural forward, write the reason on the slice.
4. **Review.** Present the slices as a numbered list — name, promise, risk mark, order reason — and ask whether a promise is dishonest, a slice is horizontal, or the order is wrong. Iterate until the user approves. This is the one turn the skill waits on.
5. **Publish.**

**Done when:** every path in the source lands in exactly one slice; every promise reads "after this slice, a user can ___"; R1 builds on nothing and every later slice builds only on slices before it; every structural risk sits ahead of every slice that depends on it; the user has approved.

## Publishing

The issue tracker should have been provided to you. If not, tell the user to run `/setup-matt-pocock-skills`. Publish in order, R1 first, so each slice's **Builds on** can reference a real identifier; the slices are the same either way, only where they land changes:

- **Local files** → one file per slice at `.scratch/<product-slug>/slices/R<N>-<slug>.md`.
- **A real issue tracker (GitHub, Linear, …)** → one issue per slice, titled `R<N> — <journey name>`. Express **Builds on** as the platform's native blocking relationship where it has one; otherwise as a `Blocked by:` line per the tracker doc.

Close with every slice's link or path, in order.

Each slice is what `wayfinder` charts from, in a fresh session: the promise is its destination, the boundary its out of scope. Write the body for that session.

```
# R2 — <journey name>

**Promise:** After this slice, a user can <___> with sample data.
**Builds on:** R1 — <name>
**Risk:** structural — <why, and why it sits here>

## Journey
1. <step, in the user's words>
2. <step>

## Boundary
- In: <the one case that travels the path>
- Out: <case> → R3 · <case> → never

## Mocks
- <external dependency> — behind <boundary name>; sample data: <what>
```

R1's header ends at its risk line. A slice with nothing to mock omits that section.