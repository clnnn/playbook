# The board

`map.json` is the map. The board is a browser window rendering it, running from the first question to the last, and re-reading the file about once a second — every edit lands on screen without a reload.

It renders at a fixed 1440×900 and scales to whatever window it is in, so it never scrolls: the whole map is on screen, or the part that does not fit is counted (`+4 more`) and read in a drill-in view.

## Running it

```bash
node <skill-dir>/board/serve.mjs docs/story-map/<slug>/map.json 4321 &
```

Then hand over `http://localhost:4321`. On a taken port, pick another and say which. The board reads whatever is at that path, so create `map.json` before serving — `board/map.example.json` is a filled-in map to copy the shape from.

## map.json

```json
{
  "subject": "Freelancer invoicing",
  "slug": "freelancer-invoicing",
  "segment": "freelance graphic designers billing 5–10 clients",
  "persona": "a solo designer running 5–10 client jobs at once",
  "narrative": "deliver a client project on time and get paid",
  "stamp": "reviewed 18 Sep 2026",
  "view": { "mode": "map" },
  "slices": [
    { "id": "r1", "name": "Release 1 — Walking Skeleton", "short": "walking skeleton" },
    { "id": "r2", "name": "Release 2 — Enhanced", "short": "enhanced" },
    { "id": "r3", "name": "Release 3 — Polish", "short": "polish" }
  ],
  "activities": [
    {
      "name": "Do the work",
      "steps": [
        {
          "name": "share progress",
          "notes": [{ "kind": "opportunity", "text": "a live link would beat the Friday email" }],
          "tasks": [{ "name": "share a progress link", "slice": "r2" }]
        }
      ]
    }
  ]
}
```

Array order carries meaning the board renders directly: activities run in narrative order left to right, steps in natural order top to bottom, tasks in priority order within their step. `notes` holds the user's own words — `kind` is `pain` or `opportunity` — and is left out where a step has none; the board calls them signals and gathers them into one panel. Every key above except `notes` and `stamp` is written at the question that settles it, so the file is partial until Q6 and the board shows exactly how far the map has got.

## Steering it

`view` decides which of the three views the board is showing, and the user can click to any of them. Set it to whatever the pending question is about, and the board is already there when they look:

| `view` | Shows |
|---|---|
| `{ "mode": "map" }` | the whole map — backbone, steps, and one band per release |
| `{ "mode": "activity", "activity": 2 }` | one activity (zero-based), full task text, its steps' signals |
| `{ "mode": "release", "release": "r1" }` | one release read end to end, the others collapsed to counts |

The whole map is the default and the view to return to. `activity` carries a question about one activity's steps or tasks; `release` carries a slice question, and marks every step whose R1 task is missing as a hole in the skeleton.
