# Domain docs

How skills consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`docs/CONTEXT-MAP.yaml`** — the system-wide map: every bounded context, its `core` / `supporting` / `generic` tag, and the relationships between them. Start here.
- **The `CONTEXT.yaml` each map entry's `path` points at** — one per context, holding that context's ubiquitous language. Read the ones covering the area you're about to work in. Follow the `path`; don't guess the layout.

If these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `grill-and-map` skill creates them lazily, as terms and boundaries actually get resolved.

Default layout:

```
/
├── docs/
│   └── CONTEXT-MAP.yaml           ← system-wide map
└── packages/ (or apps/, libs/, …)
    ├── ordering/
    │   └── docs/CONTEXT.yaml
    └── billing/
        └── docs/CONTEXT.yaml
```

Field-level formats live in `.agents/skills/grill-and-map/references/` — `CONTEXT-MAP-FORMAT.md` and `CONTEXT-FORMAT.md`.

## Use the glossary's vocabulary

When your output names a domain concept — an issue title, a story, a refactor proposal, a hypothesis, a test name, a type or function name — use the term as its `CONTEXT.yaml` defines it, and never a synonym the entry lists under `avoid`.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `grill-and-map`).

## Flag conflicts with the map

The map records decisions already made. When your output contradicts one, surface it explicitly rather than silently overriding:

- work that crosses a boundary the map draws
- work that breaks a relationship's `implication` — e.g. reaching past an ACL into the upstream model
- a term used against its definition, or redefined

> _Contradicts the Fulfillment → Billing ACL — this has Billing reading Fulfillment's model directly. Worth reopening because…_

One line, then carry on; the user decides. Rewriting the map belongs to `grill-and-map`, not to the skill that hit the conflict.
