# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`docs/CONTEXT-MAP.yaml`** — the system-wide map, and the entry point even when the repo has one context. Every context appears here with its `core` / `supporting` / `generic` tag and its relationships.
- **The `CONTEXT.yaml` each map entry's `path` points at** — one per context, holding that context's ubiquitous language. Read the ones covering the area you're about to work in. Follow the `path`; don't guess the layout.
- **`docs/adr/`** — every ADR in the repo lives here, whatever it affects. Read the ones that touch the area you're about to work in; filenames are `NNNN-slug.md`, so the slugs are the index. Don't read every ADR upfront.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `grill-and-align` skill creates them lazily when terms, boundaries or decisions actually get resolved.

## File structure

The default layout, used from the first context onward:

```
/
├── docs/
│   ├── CONTEXT-MAP.yaml              ← system-wide context map
│   └── adr/                          ← every ADR, whatever it affects
├── packages/
│   ├── ordering/
│   │   └── docs/
│   │       └── CONTEXT.yaml
│   └── billing/
│       └── docs/
│           └── CONTEXT.yaml
└── apps/
    └── web/
        └── docs/
            └── CONTEXT.yaml
```

A repo can deviate — the map's `path` entries are the truth about where the `CONTEXT.yaml` files sit.

Field-level formats live in `.agents/skills/grill-and-align/references/` — `CONTEXT-MAP-FORMAT.md`, `CONTEXT-FORMAT.md` and `ADR-FORMAT.md`.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.yaml`. Don't drift to synonyms the glossary explicitly lists under `avoid`.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `grill-and-align`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_ but keep the current context of the repo
