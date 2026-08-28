# Whiteboard

One self-contained HTML file rendering the finished map, written once at the end of the session from the final map data. It is the session's visual record — build it in the session scratchpad as `whiteboard.html`.

Before writing the file, read [`PUBLISHING.md`](PUBLISHING.md) — it holds the page contract and the delivery path. Title `Story Map — <Subject>`, favicon `🗺️`.

## Map data

The map arrives in this shape, embedded in the page as a single `const MAP = {...}` the render reads:

```js
const MAP = {
  subject: "…", persona: "…", narrative: "…",
  slices: [
    { id: "r1", name: "Release 1 — Walking Skeleton" },
    { id: "r2", name: "Release 2 — Enhanced" },
    { id: "r3", name: "Release 3 — Polish" },
  ],
  activities: [
    { name: "…", steps: [
      { name: "…",
        notes: [{ kind: "pain", text: "…" }],   // kind: "pain" | "opportunity"; the user's words, omitted when none
        tasks: [
          { name: "…", slice: "r1" },  // array order = priority, top first
        ]},
    ]},
  ],
}
```

## Visual grammar

Patton's 2D layout: workflow left→right, priority top→bottom.

- **Header** (sticky): subject, persona, one-line narrative, and the slice chips.
- **Board:** one column per activity inside a single `overflow-x: auto` container (the page body never scrolls horizontally).
  - **Row 1 — activity cards:** numbered, bold, saturated accent color, `→` connector between columns.
  - **Row 2 — step cards:** side by side under their activity, lighter tint of the accent. A step's `notes` sit under its name, one compact line each — 🔴 for a pain, 💡 for an opportunity.
  - **Below each step — task cards:** stacked vertically in priority order, each with a colored left border + small slice badge — `R1` emerald, `R2` amber, `R3` slate.
- **Slice chips (collapse control):** one chip per release in the header, colored to match, each showing its task count. Clicking a chip collapses that slice: its task cards across the whole board fold into a thin per-step count bar ("2 hidden · R2"). Collapsing two slices leaves one slice in clean view — the point of the control. Chip state is plain JS show/hide; no persistence needed.

Keep cards compact (task text may wrap to two lines), keep the board legible at 5–8 activities × ~4 steps × ~5 tasks without zooming.
