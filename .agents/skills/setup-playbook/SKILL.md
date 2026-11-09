---
name: setup-playbook
description: Configure this repo for the playbook: run setup-matt-pocock-skills, then wire in the playbook's extensions to those skills. Run once, and again after installing a new extension.
disable-model-invocation: true
---

# Setup Playbook

The playbook extends the vendored engineering skills without editing them: each extension is a skill of its own, and a pointer in `AGENTS.md` tells the agent when to load it. This skill writes those pointers.

Extensions, each with its `setup.md` in its own skill folder alongside this one:

- `property-testing`

## 1. Base setup

Call the Skill tool with "setup-matt-pocock-skills" and follow it through its "Done" step; when it asks which instructions file to create, recommend `AGENTS.md`. Done when its `## Agent skills` block and `docs/agents/*.md` are written. When `## Agent skills` already exists, ask whether to re-run it (recommended: **no**) and skip to step 2 on no.

If the Skill tool refuses the call, stop and tell the user to run `/setup-matt-pocock-skills`, then `/setup-playbook` again.

## 2. Instructions file

The playbook keeps one instructions file: `AGENTS.md`, which the playbook's other skills also write to. Claude Code reads it natively when no `CLAUDE.md` exists. When `CLAUDE.md` also exists, Claude Code reads only `CLAUDE.md`: tell the user, and offer to add an `@AGENTS.md` line to it.

## 3. Extensions

For each extension listed above, read its `setup.md` and draft:

- its sub-block in the `## Playbook extensions` block of `AGENTS.md`;
- the `docs/agents/*.md` file it names.

Show the drafts and let the user edit before writing. Then write: update the `## Playbook extensions` block and each sub-block in place when they exist, create them otherwise, and leave `## Agent skills` and every other section as they are. Done when every listed extension has its sub-block and doc file.

## 4. Done

Name each extension wired in, the skill it extends, and the doc file holding its rules. Those files can be edited directly later; re-run this skill after installing a new extension.
