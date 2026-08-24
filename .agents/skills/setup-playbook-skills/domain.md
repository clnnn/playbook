# Domain docs

How the skills consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — this repo's ubiquitous language. Most repos have exactly one.
- **`CONTEXT-MAP.md`** at the repo root, where it exists — its presence is what says the repo has more than one context. It lists each context and links the `CONTEXT.md` that holds it. Read the ones covering the area you're about to work in; the map is the truth about where those files sit.
- **`docs/adr/`** — the ADRs. Read the ones that touch the area you're about to work in, on demand; filenames are `NNNN-slug.md`, so the slugs are the index. In a multi-context repo, `docs/adr/` holds the system-wide decisions and each context keeps its own in `src/<context>/docs/adr/`.

A missing `CONTEXT.md`, no `adr/` — **proceed silently**. The `grill-with-docs` skill fills them lazily, when terms, boundaries or decisions actually get resolved.

## File structure

Single context, which is almost every repo:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
└── src/
```

Multiple contexts, signalled by the root `CONTEXT-MAP.md`:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                   ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/          ← context-specific decisions
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

Field-level formats live in the `domain-modeling` skill's folder — `CONTEXT-FORMAT.md` and `ADR-FORMAT.md`.

## Use the glossary's vocabulary

When your output names a domain concept — an issue title, a refactor proposal, a hypothesis, a test name — use the term as defined in `CONTEXT.md`. Where the glossary lists synonyms under `_Avoid_`, keep to the defined term.

If the concept you need is missing from the glossary, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `grill-with-docs`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_

Keep the repo's current context in the argument you make.
