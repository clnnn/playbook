---
name: setup-playbook
description: "Configure this repo for the playbook skills: where /to-prd publishes the PRD and where /to-story-map opens its release-slice issues. Run once before first use of either."
disable-model-invocation: true
---

# Setup Playbook

Scaffold the per-repo configuration the playbook skills read before they publish:

- **PRD**: the path `/to-prd` writes to, and whether the repo holds one PRD or one per initiative
- **Issue tracker**: where `/to-story-map` opens its R1, R2, R3 issues (GitHub by default; GitLab and local markdown are also supported out of the box)

Each decision lands in one file under `docs/agents/`, and an `## Agent skills` block in `CLAUDE.md` or `AGENTS.md` points at it. The consuming skills read the file at publish time, so switching later is a one-file edit.

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Read the repo's starting state. Every finding settles or skips a question in step 2:

- `git remote -v`: GitHub, GitLab (`gitlab.com` or self-hosted), or no remote
- `CLAUDE.md` and `AGENTS.md` at the repo root: which exists, whether one is a symlink to the other, and whether either already carries an `## Agent skills` section
- `docs/agents/prd.md` and `docs/agents/issue-tracker.md`: prior output of this skill, or of `/setup-matt-pocock-skills`, which writes the same `issue-tracker.md`
- Existing PRDs: `prd.md`, `docs/prd.md`, `docs/prd/*.md`, and any `docs/**/prd*.md`. One file means a single-PRD repo; several, or more than one `docs/story-map/*/`, means the repo hosts several initiatives
- `.scratch/`: a local-markdown issue tracker convention already in use
- `gh auth status` or `glab auth status`, whichever matches the remote: is the CLI installed and signed in?

Done when every bullet has an answer you can quote back.

### 2. Present findings and ask

Summarise what's present and what's missing in a few lines. Then take the sections in order. One section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Add the explainer only when the choice genuinely branches; skip a section outright when exploration already settled it.

**Section A: PRD.**

> Explainer: `/to-prd` ends by writing a markdown file. It needs the path, and whether that path is one file for the whole repo or one file per initiative.

Recommend from the evidence: an existing PRD's path when one was found, else `docs/prd.md`. Offer:

- **Single file**: `docs/prd.md`, the repo builds one product
- **Per initiative**: `docs/prd/<slug>.md`, one file per subject, sharing its slug with `docs/story-map/<slug>/`
- **Other** (Notion, Confluence, a separate docs repo): ask the user to describe where the PRD lives and how to write it, in one paragraph, and record it as freeform prose

The user may name a different path for either shape. The shape is the decision; the path is a detail. Record the choice in `docs/agents/prd.md`.

**Section B: Issue tracker.**

When `docs/agents/issue-tracker.md` already exists, the question is settled: say so, name the tracker it records, and confirm in one line that `/to-story-map`'s slice issues go there too. The file stays as it is.

> Explainer: `/to-story-map` ends by opening three issues, one per release slice. It needs to know whether to call `gh issue create`, `glab issue create`, write a markdown file, or follow a workflow you describe.

Recommend from the remote: GitHub when the remote is GitHub, GitLab when it is GitLab, local markdown when there is none. Offer:

- **GitHub**: the repo's GitHub Issues, via the `gh` CLI
- **GitLab**: the repo's GitLab Issues, via the [`glab`](https://gitlab.com/gitlab-org/cli) CLI
- **Local markdown**: files under `.scratch/<feature>/issues/` in this repo, for solo projects or repos without a remote
- **Other** (Jira, Linear, etc.): ask the user to describe the workflow in one paragraph, and record it as freeform prose

Record the choice in `docs/agents/issue-tracker.md`.

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block for whichever of `CLAUDE.md` / `AGENTS.md` step 4 selects
- The contents of `docs/agents/prd.md` and, when Section B asked its question, `docs/agents/issue-tracker.md`

Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- `CLAUDE.md` exists: edit it. A symlink is edited through to its target.
- Else `AGENTS.md` exists: edit it.
- Neither exists: ask the user which one to create.

The file that already exists is always the one edited, so the repo keeps a single agent-instructions file.

An existing `## Agent skills` block is updated in place, sub-block by sub-block: rewrite `### PRD` and `### Issue tracker`, and leave every other sub-block and the surrounding sections as the user wrote them. Otherwise append the block:

```markdown
## Agent skills

### PRD

[one-line summary: shape and path]. See `docs/agents/prd.md`.

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.
```

Then write the docs files from the seed templates in this skill folder:

- [prd-single.md](./prd-single.md): one PRD for the repo
- [prd-per-initiative.md](./prd-per-initiative.md): one PRD per subject
- [issue-tracker-github.md](./issue-tracker-github.md): GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md): GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md): local-markdown issue tracker

Replace the template's path with the user's where they named one. For "other" answers, write the file from scratch using the user's description, keeping the template's headings so the consuming skills find the same sections.

Done when both files exist and the block points at both.

### 5. Done

Tell the user the setup is complete: `/to-prd` now publishes per `docs/agents/prd.md`, and `/to-story-map` per `docs/agents/issue-tracker.md`. They can edit either file directly later; re-running this skill is only needed to switch trackers or start over.
