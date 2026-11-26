---
name: cut
description: Cut a conversation into release slices, each shippable on its own, named by the journey it serves
disable-model-invocation: true
---

## What a slice is

- **Shippable on its own.** The cut is right when the promise can be written, "after this slice, a user can ___", and wrong when it can't. A slice that ships against a mock says so: "…with sample data".
- **Vertical.** A slice cuts a narrow but complete path through every layer (schema, API, UI, tests) for one path a user takes.
- **Named by journey.** Scope and name each slice by what a user is trying to accomplish, so it reads at a glance. Its **id** is that name in kebab-case, chosen once and never renamed: a slice moves in the order and keeps its id, so everything downstream selects it by id.

**The walking skeleton** is the first slice: the thinnest path through every layer the product will need, deployed. As simple as possible, but it touches every inventory element for real, each in its thinnest form. Its promise is often modest; its job is to make every later slice cheap.

## The inventory

Every **structural element** the product will need: the thing later slices sit on, drawn from the source's scope and dependencies, or from the conversation. Name each one's thinnest real form.

| Element  | Thinnest real form     |
| -------- | ---------------------- |
| identity | one provider, one role |

The inventory is the skeleton's checklist, never a build order; a row no slice ever touches is scope nobody asked for.

## How slices are ordered

- **Mark each risk structural or local.** Structural: an unresolved decision about an inventory element. Local: something that can be fixed in place later (one screen, one export).
- **Simplicity first, structural pulled forward.** Order slices easiest-first, then move ahead any slice carrying an unresolved structural risk, and say on the slice why it moved. Local risks stay where they fall.
- **External dependencies are isolated, not waited on.** Knowing an integration is possible is enough to cut the slice; its details go behind a boundary and work continues against the mock.
- **Builds-on edges point one way.** An edge records what a slice genuinely needs, not the slice that happens to precede it, so slices with no edge between them can run at once. Two slices that each build on the other are one slice.

## Steps

1. **Check there is a cut to make.** One honest promise covering the whole source means this is one build, not a release plan: say so and stop. Cut when the source carries journeys that travel apart: any one could be dropped or replaced without rewriting the rest.
2. **Take the inventory.** Name every structural element and its thinnest real form.
3. **Cut the skeleton.** The thinnest deployed path that touches every inventory row for real. Write its promise.
4. **Cut the rest.** One slice per journey, until every path a user takes in the source lands in exactly one slice. Write each promise; a promise that can't be written honestly reshapes the slice until it can.
5. **Order.** Mark each slice's risk, sort easiest-first, pull structural forward, write the reason on the slice.
6. **Review.** Present the inventory, then the slices as a numbered list — id, name, promise, builds-on, risk mark, order reason — and ask whether a row is missing, a promise is dishonest, a slice is horizontal, or an edge or the order is wrong. Iterate until the user approves. This is the one turn the skill waits on, and it is the cheap one: a page read now against a wrong skeleton and every slice cut on top of it.
7. **Publish.** Follow Publishing below.

**Done when:** every structural element is named in the inventory and touched for real by the skeleton; every path in the source lands in exactly one slice; every promise reads "after this slice, a user can ___"; the skeleton builds on nothing and every later slice builds only on slices before it; every structural risk sits ahead of every slice that depends on it; the user has approved; every slice is published, the skeleton first, and its link or path reported.

## Publishing

The issue tracker should have been provided to you. If not, tell the user to run `/setup-playbook`.

Each slice is what `wayfinder` charts from, in a fresh session: the promise is its destination, the boundary its out of scope. Write the body for that session.

```
# <slice-id> — <journey name>

**Promise:** After this slice, a user can <___> with sample data.
**Builds on:** <slice-id>, <slice-id>
**Risk:** structural — <why, and why it sits here>

## Journey
1. <step, in the user's words>
2. <step>

## Boundary
- In: <the one case that travels the path>
- Out: <case> → <slice-id> · <case> → never

## Mocks
- <external dependency> — behind <boundary name>; sample data: <what>
```

The skeleton omits the Builds on line. A slice with nothing to mock omits that section.

Close with every slice's link or path, in order.
