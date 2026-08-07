# The dependency graph render

The plan gate's second render: a published HTML page showing the planned backlog as a dependency graph beside the terminal table.

## Publishing

Build and publish the page per [`../../story-map/references/PUBLISHING.md`](../../story-map/references/PUBLISHING.md) — Artifact primary, Parcel fallback, one self-contained file, republished to the same path after every gate command so the user reloads one tab. That file is the single source of truth for how a render gets published; this one only says what the page shows.

## The page

- **Nodes** — one per planned issue, carrying the same `N` as its terminal-table row so `split 7` and the graph speak the same name. Colour by `context:` label; badge with the classification (new / unchanged / upstream changed / human-edited / orphan) and any self-check flag or boundary smell. The foundational node is visually distinct.
- **Grouping** — columns by milestone, Release 0 → 3 left to right; nodes clustered by epic (backbone activity) within a column.
- **Edges** — blocked-by arrows drawn blocker → blocked; hover or tap shows the dependency's reason line.

The page reads at a glance as the question the gate asks: does this build order make sense, and is anything flagged?
