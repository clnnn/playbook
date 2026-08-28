# Live whiteboard

One self-contained HTML file that renders the current map. Created at Q3 (backbone), refreshed after every map change for the rest of the session. It is a working artifact, not a deliverable — build it in the session scratchpad as `whiteboard.html`.

## Publish and refresh

Before writing the file, read [`PUBLISHING.md`](PUBLISHING.md) — it holds the page contract and the delivery path. Title `Story Map — <Subject>`, favicon `🗺️`.

## Data-driven render — the drift guard

The file has two parts:

1. **Map data** — a single `const MAP = {...}` between `// MAP-START` and `// MAP-END` markers.
2. **Render script + CSS** — written once at Q3, never edited again during the session.

Every refresh edits only the block between the markers. The data shape:

```js
const MAP = {
  subject: "…", persona: "…", narrative: "…",
  stage: "backbone",            // "backbone" | "steps" | "tasks" | "slices"
  slices: [                     // empty until Q6
    { id: "r1", name: "Release 1 — Walking Skeleton" },
    { id: "r2", name: "Release 2 — Enhanced" },
    { id: "r3", name: "Release 3 — Polish" },
  ],
  activities: [
    { name: "…", steps: [
      { name: "…",
        notes: [{ kind: "pain", text: "…" }],   // kind: "pain" | "opportunity"; the user's words, omitted when none
        tasks: [
          { name: "…", slice: "r1" },  // slice: null until Q6; array order = priority, top first
        ]},
    ]},
  ],
}
```

Render only the tiers that exist — at the backbone stage the board is a single row of activity cards; steps and tasks appear as the session reaches them.

## Visual grammar

Patton's 2D layout: workflow left→right, priority top→bottom.

- **Header** (sticky): subject, persona, one-line narrative, a stage badge (`Backbone` / `Steps` / `Tasks` / `Slices`), and — once slices exist — the slice chips.
- **Board:** one column per activity inside a single `overflow-x: auto` container (the page body never scrolls horizontally).
  - **Row 1 — activity cards:** numbered, bold, saturated accent color, `→` connector between columns.
  - **Row 2 — step cards:** side by side under their activity, lighter tint of the accent. A step's `notes` sit under its name, one compact line each — 🔴 for a pain, 💡 for an opportunity.
  - **Below each step — task cards:** stacked vertically in priority order. A step whose `tasks` array is empty renders one dashed placeholder card instead: per-activity generation fills the board column by column, and a finished step always carries tasks, so empty reads as *not yet*. Neutral until Q6; after slicing, each card gets a colored left border + small slice badge — `R1` emerald, `R2` amber, `R3` slate.
- **Slice chips (collapse control):** one chip per release in the header, colored to match, each showing its task count. Clicking a chip collapses that slice: its task cards across the whole board fold into a thin per-step count bar ("2 hidden · R2"). Collapsing two slices leaves one slice in clean view — the point of the control. Chip state is plain JS show/hide; no persistence needed.

Keep cards compact (task text may wrap to two lines), keep the board legible at 5–8 activities × ~4 steps × ~5 tasks without zooming.
