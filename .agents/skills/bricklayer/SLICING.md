# Slicing

The rules for cutting an idea into release slices, consulted from the _Cut_ step of [`bricklayer`](SKILL.md).

## What a slice is

- **Shippable on its own.** The cut is right when the promise can be written, "after this slice, a user can ___", and wrong when it can't. A slice that ships against a mock says so: "…with sample data".
- **Vertical.** A slice cuts a narrow but complete path through every layer (schema, API, UI, tests) for one path a user takes.
- **Named by journey.** Scope and name each slice by what a user is trying to accomplish, so it is demoable and reads at a glance.

## Where slice 1 comes from

- **Slice 1 is the walking skeleton**: the thinnest path through every layer the product will need, deployed. As simple as possible, but it touches every structural element for real (the auth, the data store, the boundary to each external dependency), each in its thinnest form. Its promise is often modest; its job is to make every later slice cheap.

## How slices are ordered

- **Mark each risk structural or local.** Structural: a decision every later brick sits on (the data model, identity, a core boundary). Local: something that can be fixed in place later (one screen, one export).
- **Simplicity first, structural pulled forward.** Order slices easiest-first, then move ahead any slice carrying an unresolved structural risk, and say on the issue why it moved. Local risks stay where they fall; a prototype mould inside the slice handles them.
- **External dependencies are isolated, not waited on.** Knowing an integration is possible is enough to cut the slice; its details go behind a boundary mould (see [MOULDS.md](MOULDS.md)) and work continues against the mock. Only a dependency whose very possibility is unknown earns a prototype mould before the slice is cut.