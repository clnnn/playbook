# AI-First App Development

## Development flows

### Frame the problem

_Not decided yet._

### Greenfield project

1. **`/to-prd`** → the PRD path set by `/setup-playbook` (`docs/product/prd.md` by default). Captures what we're building and why. Feed it whatever raw material you have: lean product canvas, discovery notes, client call transcripts, sketches, whatever plans already exist.
2. **Set the technology stack**, working from the PRD:
   - **`/grilling`** → **`/to-tickets`**: have the AI pressure-test your stack choices, then turn that session into tickets.
   - **Ad hoc**: for something small and obvious, settle the stack with the AI directly.
3. **`/to-release-slices`**: from the PRD, lay out the activities people go through, cut the release slices against the eleven criteria in [`criteria.md`](.agents/skills/to-release-slices/criteria.md), have fresh subagents try to break each slice and the sequence, then publish one GitHub issue per slice (`R1 — <name>`, labelled `release-slice`). Each slice is five lines: header, case, flow, fence, assumption. It asks for the material once, then runs to published issues on its own; open questions land in an unknowns list with owners and candidate answers.
4. **Strategic alignment**: run **`/grill-with-docs`** to settle the *how*, scoped to the R1 slice.

   > /grill-with-docs the prd settled the what and why, and the release slices settled the activities and the R1 slice. Grill the how for R1: settle the ubiquitous language from the activities' names, and the hard, irreversible decisions

   The slices go broad first, so the grill knows where to go deep. A slice holds only its five parts, so everything else about R1 is left for the grill to settle. You only grill the decisions R1 actually takes, and you pull the glossary from concrete activity names instead of inventing terms in the abstract.

## Installation

Install the skills in this repo with [`gh skill install`](https://cli.github.com/manual/gh_skill_install), a GitHub CLI preview command:

```sh
gh skill install clnnn/playbook --allow-hidden-dirs --all
```

Then run **`/setup-playbook`** once per repo. It decides where `/to-prd` publishes the PRD, and records the choice under `docs/agents/`.

A few steps in the flow call skills from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). Install those too:

```sh
claude plugins install mattpocock-skills   # or: npx skills@latest add mattpocock/skills
/setup-matt-pocock-skills
```
