# Playbook

## Development flows

### Frame the problem

_Not decided yet._

### Greenfield project

1. `/to-prd` writes the PRD to `docs/product/prd.md` and points `AGENTS.md` at it. Feed it whatever you have: lean canvas, discovery notes, call transcripts, sketches.
2. Set the technology stack from the PRD. Pressure-test the choices with `/grilling` and then `/to-tickets`, or settle them with the AI directly when they're small and obvious.
3. `/to-slices` lays out the activities people go through, cuts them into slices, and publishes one item per slice to your tracker (or markdown under `docs/product/slices/`).

## Installation

```sh
gh skill install clnnn/playbook --allow-hidden-dirs --all
```

[`gh skill install`](https://cli.github.com/manual/gh_skill_install) is a GitHub CLI preview command. No setup step: skills publish under `docs/product/` and record each path as a line under `## Product docs` in `AGENTS.md`. To publish slices to an issue tracker instead, name it there with a line of your own.

A few steps call skills from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT):

```sh
claude plugins install mattpocock-skills   # or: npx skills@latest add mattpocock/skills
/setup-matt-pocock-skills
```
