---
name: setup-skills
description: Configure the per-repo settings the product and engineering skills depend on — currently, where product documents get published.
disable-model-invocation: true
---

# Setup Skills

Scaffold the per-repo configuration the product and engineering skills assume. Each section below covers one setup need and runs the same shape: **explore → ask → confirm → write**. Prompt-driven throughout — read the repo, show the user what you found, get their sign-off, then write.

## Docs storage

### 1. Explore

Read the repo before asking anything:

- `git remote -v` — is this a GitHub repo? Which one?
- `gh auth status` — is the `gh` CLI installed and authenticated? The GitHub Discussion option needs both.
- `docs/product/` — sign that a local-markdown convention is already in use.
- `AGENTS.md` at the repo root — does it exist? Does it already carry an `## Agent skills` section?
- `docs/agents/docs-storage.md` — has this section already run?

**Advance when:** all five are answered. If `docs/agents/docs-storage.md` already exists, read it, tell the user which backend it configures, and ask whether they're switching — if they aren't, stop here.

### 2. Present findings and ask

Summarise what's present, then put the storage question to the user:

> Where should the documents produced by `/prd`, `/lean-product-canvas`, `/nfr-elicitation`, and `/user-story-mapping-workshop` be stored?

- **GitHub Discussion** — published as a Discussion in the **Knowledge Base** category, via the `gh` CLI. Recommend this when `git remote -v` points at GitHub and `gh auth status` succeeds.
- **Local markdown** — published as a file under `docs/product/` in this repo. Recommend this when there's no GitHub remote, `gh` isn't authenticated, or `docs/product/` already holds files.

On **GitHub Discussion**, say up front that the **Knowledge Base** category must already exist in the repo's Discussions settings — `gh` files into a category but can't create one. Ask whether it exists; if not, point them at **Settings → Discussions → pencil icon next to Categories → New category**. They can create it before or after this setup runs — it doesn't block writing the config.

On **Local markdown**, confirm the folder — default `docs/product/`.

**Advance when:** the backend is chosen and its follow-up is settled — category confirmed, or folder confirmed.

### 3. Confirm and edit

Show the user a draft of both artifacts:

- The `## Agent skills` block to add to `AGENTS.md`
- The contents of `docs/agents/docs-storage.md`

While the draft is on screen, point out the naming convention: documents are named by type first — `[PRD] Checkout Redesign` as a discussion title, `prd-checkout-redesign.md` as a file. The seed template carries the full type list, so this is a mention rather than a question.

**Advance when:** the user has approved both drafts, with any edits they asked for folded in.

### 4. Write

Edit `AGENTS.md` at the repo root, creating it if it's absent. When an `## Agent skills` block is already there, update its `### Docs storage` subsection in place and leave every other section as it stands.

The subsection:

```markdown
### Docs storage

[one-line summary — e.g. "GitHub Discussion, category **Knowledge Base**" or "Local markdown under `docs/product/`"]. See `docs/agents/docs-storage.md`.
```

Then write `docs/agents/docs-storage.md` from the seed template matching the chosen backend:

- [docs-storage-github-discussion.md](./docs-storage-github-discussion.md) — GitHub Discussion
- [docs-storage-local-markdown.md](./docs-storage-local-markdown.md) — local markdown

**Advance when:** both files exist on disk, `AGENTS.md` holds exactly one `## Agent skills` block, and its `### Docs storage` summary names the same backend as `docs/agents/docs-storage.md`.

### 5. Done

Tell the user this section is complete: `docs/agents/docs-storage.md` is now the repo's standing answer to "where does a finished product document go", and `AGENTS.md` points every agent at it. They can edit that file directly — re-running this section is for switching backends.

## Adding a section

When another skill needs per-repo setup — an issue tracker, say — give it its own `##` section here, following the same explore → ask → confirm → write shape, with one seed template per option the user can choose.
