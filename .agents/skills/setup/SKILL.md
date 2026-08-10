---
name: setup
description: Configure this repo for the skills — the domain doc layout and the product knowledge base. Run once, before first use.
disable-model-invocation: true
---

# Setup

Scaffold the per-repo configuration the skills assume, and the pointers that route agents to it:

- **Domain docs** — where the context map, the `CONTEXT.yaml` files and the ADRs live, and the rules for reading them. Written by `grill-and-align`, read by every skill that explores the codebase.
- **Knowledge base** — the OKF bundle holding product documents, and the publish, discover and update convention. Read and written by `prd`, `lean-product-canvas` and `story-map`.

This is prompt-driven, not a script. Explore, present what you found, confirm with the user, then write.

## 1. Explore

Read the repo's starting state. Read what exists; assume nothing:

- `AGENTS.md` and `CLAUDE.md` at the root — which exists, and does either already carry a `## Domain docs` or `## Knowledge base` section?
- `docs/agents/` — did a previous run already write `domain.md` or `knowledge.md`?
- `docs/CONTEXT-MAP.yaml`, any `CONTEXT.yaml`, `docs/adr/` — are domain docs already in place?
- The code layout — `packages/`, `apps/`, `src/`, or a single root package. This is what a `CONTEXT.yaml` sits beside, so it drives the Section A default.
- An OKF bundle already here — `docs/knowledge/`, or any directory holding `.openknowledge.toml`.
- `okn version` — is the CLI installed?
- Which skills are installed (a skill folder alongside this one, or the name in your available skills). `grill-and-align` decides whether Section A runs; `prd`, `lean-product-canvas` and `story-map` decide whether Section B runs.

Done when you can state, for each section, whether it runs and what it defaults to.

## 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order — one section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Skip a section outright when no skill that reads it is installed.

### Section A — Domain doc layout

`grill-and-align` writes the map to `docs/CONTEXT-MAP.yaml` and every ADR to `docs/adr/`. Those two are fixed. The layout question is where the per-context `CONTEXT.yaml` files sit.

The default:

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

One `CONTEXT.yaml` per context, in a `docs/` folder beside the code it describes. Where exploration found a different code layout — a single `src/`, one package, some other root — propose that same shape mapped onto it. Ask one question: accept the proposal, or name the layout.

### Section B — Knowledge base

Default the bundle root to `docs/knowledge/`, and ask one question to accept it or name another path.

Then handle the CLI:

- **`okn` installed** — scaffold the bundle at the chosen path, deterministically and with no agent session:

  ```
  okn scaffold --name "<Repo> Knowledge" --bundle-name <repo-slug> \
    --bundle-purpose "<one line>" --no-agents --no-setup docs/knowledge
  ```

  `--no-agents` and `--no-setup` matter: without them, scaffold writes its own `AGENTS.md` and `SETUP.MD` into the bundle, which compete with the pointers this skill writes. The scaffold lays down `index.md`, `log.md`, `SPEC.md` and `.openknowledge.toml`. Where a bundle already sits at that path, leave it and say so.
- **`okn` missing** — give the user the install line, `curl -fsSL https://openknowledge.sh/install | bash`, and ask whether to pause while they install it or to continue and write the docs now. On continue, everything below still runs; only the scaffold waits.

## 3. Confirm

Show the user a draft of:

- The section blocks to add to the chosen root file (step 4 picks the file)
- The contents of `docs/agents/domain.md` and `docs/agents/knowledge.md`

Let them edit before anything is written.

## 4. Write

**Pick the root file:** edit `AGENTS.md` if it exists; otherwise `CLAUDE.md`; if neither exists, ask the user which to create. Edit the file that is already there, and leave the other alone.

Where a section below already exists in that file, update it in place. Keep the surrounding sections as the user wrote them.

```markdown
## Knowledge base

PRDs, Lean Product Canvases, and Story Maps live in the OKF bundle at `docs/knowledge/`. Publishing, discovery, and updates follow `docs/agents/knowledge.md`.

## Domain docs

Bounded contexts and their ubiquitous language live in `docs/CONTEXT-MAP.yaml` and the per-context `CONTEXT.yaml` files it points at. Before exploring the codebase, read them as described in `docs/agents/domain.md`.
```

Write only the sections whose skills are installed, and match each one's paths to the answers from step 2.

Then write the docs files from the seed templates in this skill folder:

- [domain.md](./domain.md) → `docs/agents/domain.md`, with the `<LAYOUT>` placeholder replaced by the layout the user settled in Section A.
- [knowledge.md](./knowledge.md) → `docs/agents/knowledge.md`, with `docs/knowledge` replaced throughout where the user chose another bundle root.

## 5. Done

Tell the user which skills now read from these files, and that `docs/agents/*.md` is theirs to edit directly — re-running this skill is for switching the layout or the bundle root, or starting over.
