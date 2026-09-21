# Issue tracker: GitLab

Issues for this repo live as GitLab issues. Use the [`glab`](https://gitlab.com/gitlab-org/cli) CLI for all operations; it infers the project from `git remote -v` when run inside a clone. GitLab calls comments **notes** and pull requests **merge requests**.

## Conventions

- **Check auth**: `glab auth status`. Unauthenticated, hand the user `glab auth login` and hold.
- **Create an issue**: `glab issue create --title "..." --description "..." --label "..."`. Use a heredoc for a multi-line description.
- **Create a label**: `glab label create --name "<name>"`. Creating an existing label errors; treat "already exists" as success.
- **Read an issue**: `glab issue view <number> --comments`, or `-F json` for machine-readable output.
- **List issues**: `glab issue list -F json`, with `--label` and `--state` filters.
- **Comment**: `glab issue note <number> --message "..."`.
- **Apply / remove labels**: `glab issue update <number> --label "..."` / `--unlabel "..."`, comma-separated or the flag repeated.
- **Close**: `glab issue note <number> --message "..."` first, then `glab issue close <number>`; `close` takes no closing comment.

## When a skill says "publish to the issue tracker"

Create a GitLab issue, creating any label it names first.

## When a skill says "fetch the relevant ticket"

Run `glab issue view <number> --comments`.
