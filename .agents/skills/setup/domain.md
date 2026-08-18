# Domain docs

How the skills consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`docs/CONTEXT-MAP.yaml`** — the system-wide map, and the entry point even when the repo has one context. Every context appears here with its `core` / `supporting` / `generic` tag and its relationships.
- **The `CONTEXT.yaml` each map entry's `path` points at** — one per context, at `docs/<slug>/CONTEXT.yaml`, holding that context's ubiquitous language. Read the ones covering the area you're about to work in. Follow the `path`; the map is the truth about where these files sit.
- **`docs/adr/`** — every ADR in the repo lives here, whatever it affects. Read the ones that touch the area you're about to work in, on demand; filenames are `NNNN-slug.md`, so the slugs are the index.

An empty map, a missing `CONTEXT.yaml`, no `adr/` — **proceed silently**. The `grill-and-align` skill fills them lazily, when terms, boundaries or decisions actually get resolved.

## File structure

```
/
└── docs/
    ├── CONTEXT-MAP.yaml       ← system-wide context map
    ├── adr/                   ← every ADR, whatever it affects
    ├── ordering/
    │   └── CONTEXT.yaml
    └── billing/
        └── CONTEXT.yaml
```

Field-level formats live in the `grill-and-align` skill's `references/` folder — `CONTEXT-MAP-FORMAT.md`, `CONTEXT-FORMAT.md` and `ADR-FORMAT.md`.

## Use the glossary's vocabulary

When your output names a domain concept — an issue title, a refactor proposal, a hypothesis, a test name — use the term as defined in `CONTEXT.yaml`. Where the glossary lists synonyms under `avoid`, keep to the defined term.

If the concept you need is missing from the glossary, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `grill-and-align`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_

Keep the repo's current context in the argument you make.
