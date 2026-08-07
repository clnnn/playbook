# GitHub structure, reconciliation, and application

The structure the skill builds, the reconciliation tests, every `gh` command, and the failure contract.

## Structure

**Milestones** — `Release 0 — Foundation`, `Release 1 — Walking Skeleton`, `Release 2 — Enhanced`, `Release 3 — Polish`. List what exists first (`gh api repos/{owner}/{repo}/milestones`); when milestones already exist, ask how to fit around them rather than colliding — the user may run milestones as sprints.

**Labels** — `context:<bounded-context>` (one per context on the map), `foundational`, `needs-refinement`. Bootstrap idempotently:

```bash
gh label create "context:ordering" --color 1D76DB --description "Ordering bounded context" --force
```

**Epics** — one parent issue per backbone activity, stories attached as native sub-issues. The epic body is short but real: the activity, its steps, the narrative sentence, and the child list.

**Dependencies** — native edges **plus** the mirrored body line of ISSUE-BODY.md §6.

**Titles** — short, user-value phrasing, no prefix: *"Apply a member discount at checkout"*. Slice, activity, and context live in the milestone, epic, and labels.

## Reconciliation

The read pass builds the marker inventory:

```bash
gh issue list --state all --json number,title,body,labels,milestone --limit 1000
```

Parse each body's last-line marker `<!-- backlog: <slug>/<story-id> · body-hash: <sha> -->` into `story-id → (issue number, recorded hash, current body)`.

Classify each derived story against the inventory:

| Test | Class | At the gate |
|---|---|---|
| story-id absent from inventory | **new** | create |
| recorded hash = hash(current body) and derived body = current body | **unchanged** | skip |
| recorded hash = hash(current body), derived body differs | **upstream changed** | propose the edit, show the diff |
| recorded hash ≠ hash(current body) | **human-edited** | collision — show the diff, the user picks overwrite / skip / merge |
| inventory id with no derived story | **orphan** | the user closes or keeps |

A human-edited body is never overwritten silently — the gate is the only place that conflict resolves.

## Apply order

Every body is written to a file under the session scratchpad directory first, one file per issue named `<story-id>.md`, and applied with `--body-file` — the repo working tree is never touched.

Strictly in sequence, each phase complete before the next:

1. **Labels and milestones** — create what's missing (`gh label create --force`, `gh api repos/{owner}/{repo}/milestones -f title=...`).
2. **Epics** — create or update the parent issues; capture their numbers.
3. **Stories** — for each *new*: `gh issue create --title "..." --body-file <file> --milestone "..." --label "..."`; for each approved *upstream changed* / *overwrite*: `gh issue edit <n> --body-file <file>`. Capture every number, recompute each marker's body-hash at write time.
4. **Relations pass** — now that every number exists: `gh issue edit <epic> --add-sub-issue <story>` for the hierarchy, `gh issue edit <story> --add-blocked-by <blocker>` for each dependency edge.

**Fail fast.** On any error: stop immediately, report every issue already created with its number, and state that re-running resumes for free — the markers make the next read pass classify what exists as unchanged and skip it. Half a dependency graph is worse than none.
