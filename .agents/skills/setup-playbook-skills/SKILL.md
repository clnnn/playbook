---
name: setup-playbook-skills
description: "Configure this repo for the playbook skills: set up its issue tracker, domain doc layout, and knowledge base. Run once before first use of the other playbook skills."
disable-model-invocation: true
---

# Setup Playbook Skills

Scaffold the per-repo configuration that the playbook skills assume:

- **Issue tracker**: where issues live (GitHub by default; GitLab and local markdown are also supported out of the box)
- **Domain docs**: where `CONTEXT.md` and ADRs live, and the consumer rules for reading them
- **Knowledge base**: where the OKF bundle holding PRDs and Lean Product Canvases lives, and the publish, discover and update convention

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config`: is this a GitHub repo? A GitLab one? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root: does either exist? Is there already an `## Agent skills` section in either?
- `CONTEXT.md` and `CONTEXT-MAP.md` at the repo root
- `docs/adr/` and any `src/*/docs/adr/` directories
- `docs/agents/`: does this skill's prior output already exist?
- `.scratch/`: a sign that a local-markdown issue tracker convention is already in use
- An OKF bundle: `docs/knowledge/`, or any directory holding `.openknowledge.toml`. And `okn version`: is the CLI installed?
- Which skills are installed (a skill folder alongside this one, or the name in your available skills). `to-story-map`, `to-user-stories` and `prototype` decide whether Section A runs at all; `grill-with-docs` decides Section B; `to-prd` and `lean-product-canvas` decide Section C.
- Monorepo signals: a `pnpm-workspace.yaml`, a `workspaces` field in `package.json`, or a populated `packages/*` with its own `src/`. These are present only in a genuinely large multi-package repo; their absence means single-context, which is almost every repo.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order. One section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Give a one-line explainer only when the choice genuinely branches; skip the section entirely when exploration already settled it (any section whose skills aren't installed, and Section B's second question when there's no monorepo).

**Section A: Issue tracker.**

> Explainer: The "issue tracker" is where issues live for this repo. Skills like `to-story-map`, `to-user-stories`, and `prototype` read from and write to it. They need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. If a `git remote` points at GitLab (`gitlab.com` or a self-hosted host), propose GitLab. Otherwise (or if the user prefers), offer:

- **GitHub**: issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab**: issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown**: issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Linear, etc.): ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

Record the choice in `docs/agents/issue-tracker.md`.

**Section B: Domain docs.** Default to **single-context** (one `CONTEXT.md` + `docs/adr/` at the repo root). This fits almost every repo; write it without asking.

Offer **multi-context** (a root `CONTEXT-MAP.md` pointing to per-context `CONTEXT.md` files) only when exploration found monorepo signals. Then confirm which layout they want.

`grill-with-docs` creates those files lazily, from the first resolved term or decision onward, so this section writes the consumer rules and nothing else.

**Section C: Knowledge base.** Default the bundle root to `docs/knowledge/`, and ask exactly one question:

> Do you want the OKF bundle at `docs/knowledge/`? (recommended: **yes**)

Then handle the CLI. With `okn` installed, scaffold the bundle at the chosen path, deterministically and with no agent session:

```
okn scaffold --name "<Repo> Knowledge" --bundle-name <repo-slug> \
  --bundle-purpose "<one line>" --no-agents --no-setup docs/knowledge
```

`--no-agents` and `--no-setup` matter: without them, scaffold writes its own `AGENTS.md` and `SETUP.MD` into the bundle, which compete with the pointers this skill writes. The scaffold lays down `index.md`, `log.md`, `SPEC.md` and `.openknowledge.toml`. Where a bundle already sits at that path, leave it and say so.

With `okn` missing, give the user the install line, `curl -fsSL https://openknowledge.sh/install | bash`, and ask whether to pause while they install it or to continue and write the docs now. On continue, everything below still runs; only the scaffold waits.

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block to add to whichever of `CLAUDE.md` / `AGENTS.md` is being edited (see step 4 for selection rules)
- The contents of `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, and `docs/agents/knowledge.md` (each only when its section ran)
- The OKF bundle the scaffold creates at the chosen root

Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask the user which one to create; don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa); always edit the one that's already there.

If an `## Agent skills` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Domain docs

[one-line summary of layout: "single-context" or "multi-context"]. See `docs/agents/domain.md`.

### Knowledge base

[one-line summary of where product documents live]. See `docs/agents/knowledge.md`.
```

Include a sub-block, and write its docs file, only when that section ran. When a section is skipped, both are omitted.

Then write the docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-github.md](./issue-tracker-github.md): GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md): GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md): local-markdown issue tracker
- [domain.md](./domain.md): domain doc consumer rules + layout
- [knowledge.md](./knowledge.md): knowledge base publish, discover and update rules, with `docs/knowledge` replaced throughout where the user chose another bundle root

For "other" issue trackers, write `docs/agents/issue-tracker.md` from scratch using the user's description, covering every operation the seed templates' table lists.

### 5. Done

Tell the user the setup is complete and which playbook skills will now read from these files. Mention they can edit `docs/agents/*.md` directly later; re-running this skill is only necessary if they want to switch issue trackers or bundle roots, or restart from scratch.
