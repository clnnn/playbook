# AI-First App Development

## Development flows

### Frame the problem

_Not decided yet._

### Greenfield project

1. **`/to-prd`** → the PRD, at the path you set with `/setup-playbook`. Feed it whatever you have: lean canvas, discovery notes, call transcripts, sketches.
2. **Set the technology stack**, from the PRD. Pressure-test the choices with **`/grilling`** → **`/to-tickets`**, or settle them with the AI directly when they're small and obvious.
3. **`/to-release-slices`** lays out the activities people go through, cuts them into slices, and publishes one item per slice to your tracker (or markdown under `docs/product/release-slices/`). Details in the [skill](.agents/skills/to-release-slices/SKILL.md).
4. **`/grill-with-docs`** → the *how*, scoped to R1. The slices go broad first, then the grill goes deep.

   > /grill-with-docs the prd settled the what and why, and the release slices settled the activities and the R1 slice. Grill the how for R1: settle the ubiquitous language from the activities' names, and the hard, irreversible decisions

5. **`/to-demos`** cuts R1 into demos — a two-day timebox each, shown to the domain owner, the walking skeleton first — and publishes one item per demo, sorted by fidelity. A **spike** settles a form-or-feel question (*one long form or three pages?*) with a throwaway prototype; a **lo-fi demo** settles a rule, data or flow question. Details in the [skill](.agents/skills/to-demos/SKILL.md).
6. **Per demo:** prototype the spikes and let the domain owner pick; open each lo-fi demo with **`/grill-with-docs`**, then build it.

## Installation

```sh
gh skill install clnnn/playbook --allow-hidden-dirs --all
```

[`gh skill install`](https://cli.github.com/manual/gh_skill_install) is a GitHub CLI preview command. Then run **`/setup-playbook`** once per repo to pick where the PRD lives.

A few steps call skills from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT):

```sh
claude plugins install mattpocock-skills   # or: npx skills@latest add mattpocock/skills
/setup-matt-pocock-skills
```
