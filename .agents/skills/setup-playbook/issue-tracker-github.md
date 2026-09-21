# Issue tracker: GitHub

Issues for this repo live as GitHub issues. Use the `gh` CLI for all operations; it infers the repo from `git remote -v` when run inside a clone.

## Conventions

- **Check auth**: `gh auth status`. Unauthenticated, hand the user `gh auth login` and hold.
- **Create an issue**: `gh issue create --title "..." --body "..." --label "..."`. Use a heredoc for a multi-line body. The URL it returns ends in the issue number.
- **Create a label**: `gh label create "<name>" --force`. `--force` makes it idempotent, so an existing label is not an error.
- **Read an issue**: `gh issue view <number> --comments`.
- **List issues**: `gh issue list --state open --json number,title,labels`, with `--label` and `--state` filters.
- **Comment**: `gh issue comment <number> --body "..."`.
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- **Close**: `gh issue close <number> --comment "..."`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue, creating any label it names first.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
