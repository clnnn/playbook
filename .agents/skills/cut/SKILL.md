---
name: cut
description: Cut a conversation into release slices, each shippable on its own, named by the journey it serves, carrying its quality numbers
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

## Quality per slice

The journey holds what the slice does; **Quality** holds how well its path must behave, in numbers the slice is measured against before it ships. At most three per slice.

Read [`references/QUALITY.md`](references/QUALITY.md) on entering — it holds the attributes, the signals that raise them, the cut, and the anchoring.

- **Carry over** any requirement the source already pins whose workstream this slice's path touches; its ID and number stay.
- **Derive the rest** by walking the slice's journey, boundary and mocks against the signal table, and pin only what survives the cut.
- **The skeleton carries the structural ones** — the attributes every later slice inherits (`SEC` authentication, `DATA` restore, `OPS` alerting) — each in its thinnest measurable form.
- **Scale and anchor the number** to this slice's conditions with `napkin-math`; the verdict alone reaches the slice.
- **Name the measurement**: the concrete check run before the slice ships, from the reference's column, and the number it must show.

## Steps

1. **Cut the skeleton.** List every structural element the product will need — the source's scope and dependencies, or the conversation — and cut the thinnest deployed path that touches each one for real. Write its promise.
2. **Cut the rest.** One slice per journey, until every path a user takes in the source lands in exactly one slice. Write each promise; a promise that can't be written honestly reshapes the slice until it can.
3. **Order.** Mark each slice's risk, sort easiest-first, pull structural forward, write the reason on the slice.
4. **Pin quality** on each slice, as above.
5. **Review.** Present the slices as a numbered list — name, promise, risk mark, order reason — and ask whether a promise is dishonest, a slice is horizontal, or the order is wrong. Iterate until the user approves. This is the one turn the skill waits on.
6. **Publish.**

**Done when:** every path in the source lands in exactly one slice; every promise reads "after this slice, a user can ___"; R1 builds on nothing and every later slice builds only on slices before it; every structural risk sits ahead of every slice that depends on it; every quality line carries a number, a measurement and a source; the user has approved.

## Publishing

`AGENTS.md` names the issue tracker and how to publish to it. Without that line, the tracker is the repo: one file per slice in `docs/product/slices/`, named `R1-<slug>.md`, and a `Slices:` line under `## Product docs` in `AGENTS.md` pointing at the directory. Close with every slice's link or path, in order.

Each slice is what `wayfinder` charts from, in a fresh session: the promise is its destination, the boundary its out of scope, the open questions its fog. Write the body for that session.

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

## Quality
- PERF-01 — <number under condition> · measured by <check> · from <source | napkin-math | 🔶>
- not pinned: <attribute> — <why it can wait>

## Open questions
- <question> · candidate: <answer>
```

R1's header ends at its risk line. A slice with nothing to mock or ask omits that section.
