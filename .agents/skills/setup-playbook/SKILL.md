---
name: setup-playbook
description: "Configure this repo for the playbook skills: where /to-prd publishes the PRD, and whether the repo holds one PRD or one per initiative. Run once before first use."
disable-model-invocation: true
---

# Setup Playbook

Scaffold the per-repo configuration `/to-prd` reads before it publishes: the path it writes to, and whether that path is one PRD for the whole repo or one per initiative.

The decision lands in `docs/agents/prd.md`, and an `## Agent skills` block in `CLAUDE.md` or `AGENTS.md` points at it. `/to-prd` reads that file at publish time, so moving the PRD later is a one-file edit.

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Read the repo's starting state. Every finding settles or skips the question in step 2:

- `CLAUDE.md` and `AGENTS.md` at the repo root: which exists, whether one is a symlink to the other, and whether either already carries an `## Agent skills` section
- `docs/agents/prd.md`: prior output of this skill
- Existing PRDs: `prd.md`, `docs/product/prd.md`, `docs/product/prd/*.md`, and any `docs/**/prd*.md`. One file means a single-PRD repo; several means the repo hosts several initiatives

Done when every bullet has an answer you can quote back.

### 2. Present findings and ask

Summarise what's present and what's missing in a few lines, then ask. Lead with the recommended answer so the user can accept it in a word. Add the explainer only when the choice genuinely branches; skip the question outright when exploration already settled it.

> Explainer: `/to-prd` ends by writing a markdown file. It needs the path, and whether that path is one file for the whole repo or one file per initiative.

Recommend from the evidence: an existing PRD's path when one was found, else `docs/product/prd.md`. Offer:

- **Single file**: `docs/product/prd.md`, the repo builds one product
- **Per initiative**: `docs/product/prd/<slug>.md`, one file per subject, sharing its slug with the subject's story map
- **Other** (Notion, Confluence, a separate docs repo): ask the user to describe where the PRD lives and how to write it, in one paragraph, and record it as freeform prose

The user may name a different path for either shape. The shape is the decision; the path is a detail.

### 3. Confirm and edit

Show the user a draft of the `## Agent skills` block for whichever of `CLAUDE.md` / `AGENTS.md` step 4 selects, and of `docs/agents/prd.md`. Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- `CLAUDE.md` exists: edit it. A symlink is edited through to its target.
- Else `AGENTS.md` exists: edit it.
- Neither exists: ask the user which one to create.

The file that already exists is always the one edited, so the repo keeps a single agent-instructions file.

An existing `## Agent skills` block is updated in place: rewrite `### PRD`, and leave every other sub-block and the surrounding sections as the user wrote them. Otherwise append the block:

```markdown
## Agent skills

### PRD

[one-line summary: shape and path]. See `docs/agents/prd.md`.
```

Then write `docs/agents/prd.md` from the seed template in this skill folder:

- [prd-single.md](./prd-single.md): one PRD for the repo
- [prd-per-initiative.md](./prd-per-initiative.md): one PRD per subject

Replace the template's path with the user's where they named one. For an "other" answer, write the file from scratch using the user's description, keeping the template's headings so `/to-prd` finds the same sections.

Done when `docs/agents/prd.md` exists and the block points at it.

### 5. Done

Tell the user the setup is complete: `/to-prd` now publishes per `docs/agents/prd.md`. They can edit that file directly later; re-running this skill is only needed to change the PRD's shape or start over.
