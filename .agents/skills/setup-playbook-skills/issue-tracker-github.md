# Issue tracker: GitHub

Issues for this repo live as GitHub issues, driven by the `gh` CLI. `gh` infers the repo from `git remote -v` when run inside a clone; `gh repo view --json nameWithOwner` names it explicitly.

## Operations

Every operation a skill names, and the command that performs it here. This table is the authority — a skill says "publish to the issue tracker", and this is where the `gh` invocation lives.

| A skill asks to | Run |
|---|---|
| **check auth** | `gh auth status`. Unauthenticated, hand the user `gh auth login` and hold. |
| **publish** an issue | `gh issue create --title "..." --body "..."` — heredoc for a multi-line body. Returns the URL; the trailing path segment is the number. |
| **fetch** a ticket | `gh issue view <n> --comments --json number,title,body,labels` |
| **list** tickets | `gh issue list --state all --json number,title,body,labels --jq '[.[] \| {number, title, body, labels: [.labels[].name]}]'`, with `--label` / `--state` filters |
| **edit** a ticket in place | `gh issue edit <n> --body "..."` (or `--title`) |
| **comment** | `gh issue comment <n> --body "..."` |
| **create a label** | `gh label create "<name>" --force` — `--force` makes it idempotent, so creating an existing label is not an error |
| **apply / remove a label** | `gh issue edit <n> --add-label "..."` / `--remove-label "..."` |
| **link A blocked by B** | GitHub's native issue dependencies, the canonical UI-visible edge. Fetch B's numeric **database id** (`gh api repos/{owner}/{repo}/issues/<B> --jq .id` — not the `#number`, not the `node_id`), then `gh api --method POST repos/{owner}/{repo}/issues/<A>/dependencies/blocked_by -F issue_id=<db-id>`. Read edges back from `issue_dependencies_summary.blocked_by`, which counts open blockers only and is the live gate. |
| **close** | `gh issue close <n> --comment "..."` |

**Where the dependencies endpoint is unavailable** on this repo, the issue body's own prose — a `Blocked by: #<n>, #<n>` line, or the section a skill's format defines — becomes the single render of the edge. State the fallback plainly when you take it. Any other failure is reported as the error it is.

## Pull requests

`gh pr ...` mirrors the table above: `gh pr view <n> --comments`, `gh pr diff <n>`, `gh pr comment`, `gh pr edit --add-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either: resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: an issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: the **link A blocked by B** row above. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children, drop any with an open blocker or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me`, the session's first write.
- **Resolve**: comment the answer, close the issue, then append a context pointer (gist + link) to the map's Decisions-so-far.
