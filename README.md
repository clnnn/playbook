# AI-First App Development

## Development flows

### Frame the problem

_Not decided yet._

### Greenfield project

1. **`/to-prd`** → `docs/prd.md`. Captures what we're building and why. Feed it whatever raw material you have: lean product canvas, discovery notes, client call transcripts, sketches, whatever plans already exist.
2. **Set the technology stack**, working from the PRD:
   - **`/grilling`** → **`/to-spec`**: have the AI pressure-test your stack choices, then turn that session into a spec.
   - **Ad hoc**: for something small and obvious, settle the stack with the AI directly.
3. **`/to-story-map`**: map the flows and cut the release slices (R1 - Walking Skeleton (MVP), R2 - Enhanced, R3 - Polish).
4. **Strategic alignment**: run **`/grill-with-docs`** to settle the *how*, scoped to the R1 slice.

   > /grill-with-docs the prd settled the what and why, and the story map settled the flows and the R1 slice. Grill the how for R1: settle the ubiquitous language from the map's task names, and the hard, irreversible decisions

   The map goes broad first, so the grill knows where to go deep. You only grill the decisions R1 actually takes, and you pull the glossary from concrete task names instead of inventing terms in the abstract.

## Installation

Install the skills in this repo with [`gh skill install`](https://cli.github.com/manual/gh_skill_install), a GitHub CLI preview command:

```sh
gh skill install clnnn/playbook --allow-hidden-dirs --all
```

A few steps in the flow call skills from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). Install those too:

```sh
claude plugins install mattpocock-skills   # or: npx skills@latest add mattpocock/skills
/setup-matt-pocock-skills
```
