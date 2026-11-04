# Playbook

## Development flows

### Frame the problem

_Not decided yet._

### Greenfield project

_Not decided yet._

## Installation

```sh
gh skill install clnnn/playbook --allow-hidden-dirs --all
```

[`gh skill install`](https://cli.github.com/manual/gh_skill_install) is a GitHub CLI preview command. No setup step: skills publish under `docs/product/` and record each path as a line under `## Product docs` in `AGENTS.md`.

A few steps call skills from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT):

```sh
claude plugins install mattpocock-skills   # or: npx skills@latest add mattpocock/skills
/setup-matt-pocock-skills
```
