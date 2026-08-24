# Issue tracker: GitLab

Issues for this repo live as GitLab issues, driven by the [`glab`](https://gitlab.com/gitlab-org/cli) CLI. `glab` infers the project from `git remote -v` when run inside a clone. GitLab calls comments **notes** and pull requests **merge requests**.

## Operations

Every operation a skill names, and the command that performs it here. This table is the authority — a skill says "publish to the issue tracker", and this is where the `glab` invocation lives.

| A skill asks to | Run |
|---|---|
| **check auth** | `glab auth status`. Unauthenticated, hand the user `glab auth login` and hold. |
| **publish** an issue | `glab issue create --title "..." --description "..."` — heredoc for a multi-line description |
| **fetch** a ticket | `glab issue view <n> --comments`, or `-F json` for machine-readable output |
| **list** tickets | `glab issue list -F json`, with `--label` / `--state` filters |
| **edit** a ticket in place | `glab issue update <n> --description "..."` (or `--title`) |
| **comment** | `glab issue note <n> --message "..."` |
| **create a label** | `glab label create --name "<name>"`. Creating an existing label errors; treat "already exists" as success. |
| **apply / remove a label** | `glab issue update <n> --label "..."` / `--unlabel "..."` — comma-separated, or the flag repeated |
| **link A blocked by B** | GitLab's native blocking link, the canonical UI-visible edge, set with the `/blocked_by` quick action posted as a note: `glab issue note <A> --message "/blocked_by #<B>"`. Read edges back from `glab api projects/:id/issues/:iid/links`. |
| **close** | `glab issue note <n> --message "..."` first, then `glab issue close <n>` — `close` takes no closing comment |

**Where native blocking links are unavailable** — they are a Premium/Ultimate feature, absent on the free tier — the issue description's own prose becomes the single render of the edge: a `Blocked by: #<n>, #<n>` line, or the section a skill's format defines. State the fallback plainly when you take it. Any other failure is reported as the error it is.

## Merge requests

`glab mr ...` mirrors the table above: `glab mr view <n> --comments`, `glab mr diff <n>`, `glab mr note --message`, `glab mr update --label`, `glab mr close`.

GitLab numbers issues and MRs separately, so `#42` is unambiguous once you know which surface is meant.
