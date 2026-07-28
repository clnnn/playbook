---
name: setup-skills
description: Configure this repo's per-repo settings for the product and engineering skills.
disable-model-invocation: true
---

# Setup Skills

Scaffold the per-repo configuration the product and engineering skills assume. Each section below configures one skill's setup needs; the skill grows a new section whenever another skill needs one — for now there's just:

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### Section A — Docs storage

#### 1. Explore

Look at the current repo before asking anything:

- `git remote -v` — is this a GitHub repo? Which one?
- Is the `gh` CLI installed and authenticated (`gh auth status`)? The GitHub Discussion option needs both.
- `docs/product/` — sign that a local-markdown convention is already in use.
- `AGENTS.md` and `CLAUDE.md` at the repo root — does either exist? Is there already an `## Agent skills` section in either?
- `docs/agents/docs-storage.md` — does this skill's prior output already exist?

#### 2. Present findings and ask

Summarise what's present, then ask exactly one question:

> Where should product documents (PRDs, Lean Product Canvases, user story maps) be stored?

- **GitHub Discussion** — published as a Discussion in the **Product** category, via the `gh` CLI. Recommend this when `git remote -v` points at GitHub and `gh auth status` succeeds.
- **Local markdown** — published as a file under `docs/product/` in this repo. Recommend this when there's no GitHub remote, `gh` isn't authenticated, or `docs/product/` already holds files.

If the user picks **GitHub Discussion**, tell them up front that the **Product** category must already exist in the repo's Discussions settings — `gh` can file into a category but can't create one. Ask if it exists yet; if not, point them at **Settings → Discussions → pencil icon next to Categories → New category** and let them create it before or after this setup runs (it doesn't block writing the config).

If the user picks **Local markdown**, confirm the folder — default `docs/product/`.

#### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block to add to whichever of `CLAUDE.md` / `AGENTS.md` is being edited (see step 4 for selection rules)
- The contents of `docs/agents/docs-storage.md`

Let them edit before writing.

#### 4. Write

**Pick the file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask the user which one to create — don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa) — always edit the one that's already there.

If an `## Agent skills` block already exists in the chosen file, add or update the `### Docs storage` subsection in-place rather than appending a duplicate block. Don't overwrite unrelated sections.

The subsection:

```markdown
### Docs storage

[one-line summary — e.g. "GitHub Discussion, category **Product**" or "Local markdown under `docs/product/`"]. See `docs/agents/docs-storage.md`.
```

Then write `docs/agents/docs-storage.md` using the matching seed template in this skill folder as a starting point:

- [docs-storage-github-discussion.md](./docs-storage-github-discussion.md) — GitHub Discussion
- [docs-storage-local-markdown.md](./docs-storage-local-markdown.md) — local markdown

#### 5. Done

Tell the user this section is complete, and that `/prd`, `/lean-product-canvas`, and `/user-story-mapping-workshop` can now follow `docs/agents/docs-storage.md` when it's time to publish a finished document. Mention they can edit that file directly later — re-running this section is only necessary to switch storage backends.

### Other sections

None yet. When a skill needs its own per-repo setup (e.g. the issue tracker), it gets a new `### Section` here, following the same explore → ask → confirm → write shape as Section A.
