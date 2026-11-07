---
name: cut
description: Cut a conversation into release slices, each shippable on its own, named by the journey it serves, modelled, gauged, and proven
disable-model-invocation: true
---

## What a slice is

- **Shippable on its own.** The cut is right when the promise can be written, "after this slice, a user can ___", and wrong when it can't. A slice that ships against a mock says so: "…with sample data".
- **Vertical.** A slice cuts a narrow but complete path through every layer (schema, API, UI, tests) for one path a user takes.
- **Named by journey.** Scope and name each slice by what a user is trying to accomplish, so it is demoable and reads at a glance.
- **Proven by gauges.** An engineer judges a slice the way a civil engineer judges a bridge: not by walking it, but by the numbers. Three parts, one meaning each:
  - The **model** translates the journey into quantities and the relations between them, in the journey's nouns ("invoices sent = rows accepted − rows rejected"), and derives a **predicted** value of each quantity for the one case in `Boundary: In`. The prediction is computed from the model before the slice is built; a value that can only be guessed means the model is missing a relation.
  - A **gauge** is one quantity of the model, measured by the deployed slice itself and **traced** to the site that emits it. A site the codebase already has is named as it is there; a site still to be built is named in the product's nouns (the ingest boundary, the score record, the score-viewed event), so the slice stays technology-neutral and the stack is chosen when the slice is built. Coverage is the engineer's confidence: at least one gauge per layer the slice touches and one per journey step, so a fault anywhere on the path moves a gauge. In service the same gauge reads real traffic, where there is no prediction, only a decision it names.
  - The **proof** is one command that loads the `In` case the way a user would, reads every gauge, and sets predicted beside measured within a **tolerance**; every relation of the model holds within tolerance or the proof fails. Evidence a user would have seen is attached, never described (the file, the screen, the email). The engineer reads the proof and nothing else; it reruns after every change and stays valid when the implementation is swapped, because the gauges hold still while the code behind them moves. A promise whose proof can't be built reshapes the slice until it can.

**Slice 1 is the walking skeleton**: the thinnest path through every layer the product will need, deployed. As simple as possible, but it touches every structural element for real (the auth, the data store, the boundary to each external dependency), each in its thinnest form. Its promise is often modest; its job is to make every later slice cheap.

## How slices are ordered

- **Mark each risk structural or local.** Structural: a decision every later slice sits on (the data model, identity, a core boundary). Local: something that can be fixed in place later (one screen, one export).
- **Simplicity first, structural pulled forward.** Order slices easiest-first, then move ahead any slice carrying an unresolved structural risk, and say on the slice why it moved. Local risks stay where they fall.
- **External dependencies are isolated, not waited on.** Knowing an integration is possible is enough to cut the slice; its details go behind a boundary and work continues against the mock.

## Steps

1. **Cut the skeleton.** List every structural element the product will need — the source's scope and dependencies, or the conversation — and cut the thinnest deployed path that touches each one for real. Write its promise.
2. **Cut the rest.** One slice per journey, until every path a user takes in the source lands in exactly one slice. Write each promise; a promise that can't be written honestly reshapes the slice until it can.
3. **Model.** On each slice, write the quantities and relations, derive the predicted value of each for the `In` case.
4. **Gauge.** Place one gauge on each quantity, trace it to its emitting site, and name the decision it informs in service. Check coverage: every layer and every journey step moves a gauge.
5. **Prove.** Write the one command, and the predicted-beside-measured table with its tolerances, one row per gauge, one line per relation.
6. **Order.** Mark each slice's risk, sort easiest-first, pull structural forward, write the reason on the slice.
7. **Review.** Present the slices as a numbered list — name, promise, model, gauges, proof command, risk mark, order reason — and ask whether a promise is dishonest, a prediction is guessed rather than derived, a gauge is untraced, a layer or step moves no gauge, a proof needs the code read or the feature watched, a slice is horizontal, or the order is wrong. Iterate until the user approves. This is the one turn the skill waits on.
8. **Publish.**

**Done when:** every path in the source lands in exactly one slice; every promise reads "after this slice, a user can ___"; every quantity in a model has a predicted value derived from the model's relations; every gauge traces to an emitting site and names its in-service decision; every layer and journey step of a slice moves at least one gauge; every proof is one command against the deployed slice setting predicted beside measured within tolerance for every gauge and every relation; R1 builds on nothing and every later slice builds only on slices before it; every structural risk sits ahead of every slice that depends on it; the user has approved.

## Publishing

`AGENTS.md` names the issue tracker and how to publish to it. Without that line, the tracker is the repo: one file per slice in `docs/product/slices/`, named `R1-<slug>.md`, and a `Slices:` line under `## Product docs` in `AGENTS.md` pointing at the directory. Close with every slice's link or path, in order.

Each slice is what `wayfinder` charts from, in a fresh session: the promise is its destination, the boundary its out of scope, the model its map of the terrain, the proof says when it has arrived, the gauges what it reports back. Write the body for that session.

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

## Model
- <quantity> = <relation, in journey nouns> · In: <predicted value>
- <quantity> = <relation> · In: <predicted value>

## Gauges
- <quantity> — emitted at <site, in the codebase's names or the product's nouns> · layer: <schema/API/UI> · step: <n> · in service decides <___>

## Proof
Run: `<one command, against the deployed slice>`
- Load: as <user>, <did ___>
- <quantity>: predicted <v> · measured <v> · tolerance <±> → PASS / FAIL
- <relation>: → HOLDS / BROKEN
- Evidence: <the file / screen / email a user would have seen>

## Mocks
- <external dependency> — behind <boundary name>; sample data: <what>
```

R1's header ends at its risk line. A slice with nothing to mock omits that section; Model, Gauges, and Proof are on every slice.