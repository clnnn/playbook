# Walking-skeleton prototype

Built only after the review gate passes. One file, `prototype.html`, that a stakeholder can open in a browser and click through the entire walking skeleton — UI only, no backend, but it must *feel* real.

## Constraints

- **Published like the whiteboard:** before writing the file, read [`PUBLISHING.md`](PUBLISHING.md) — it holds the page contract and the delivery path. Title `<Product name> — Walking Skeleton`, favicon `🦴`.
- **Built to the craft bar:** read [`PROTOTYPE-UI.md`](PROTOTYPE-UI.md) before the first line of CSS. It holds the standard this prototype's visuals, copy, and mocked data are judged against, and the checklist that gates publishing.
- **Walking skeleton by default:** the prototype implements every Release 1 task in its simplest form and nothing from Release 2/3. If the user asks to preview a later-slice feature, add it behind an obvious toggle rather than blending it into the skeleton.

## Structure — the map drives the screens

- One screen (or wizard step) per backbone activity, navigable in backbone order — a stepper, sidebar, or nav bar that mirrors the whiteboard's top row.
- Each Release 1 task appears as a working interaction on its activity's screen.
- Screens are sections in the one file; navigation is JS show/hide with the current position visibly marked.
- The product's name and persona-appropriate chrome (nav, avatar, page titles) so screenshots read as a real product.

## Interactive with mocked data

- Mocked data lives in named JS constants at the top of the script; `PROTOTYPE-UI.md` sets the bar those values have to clear.
- Interactions work in memory: forms accept input and carry values to later screens, primary actions update visible state, lists add/remove rows, and the flow reaches a genuine end state (confirmation, summary, success). A full click-through of the narrative must be possible without dead ends.

## Feedback loop

Give the user the prototype's link and ask what they'd change. Then:

- **UI-only feedback** (layout, copy, colors, widget choice) → edit `prototype.html` and refresh it; the link stays the same.
- **Feedback that changes the map** (missing task, wrong order, wrong scope) → update the map first, refresh the whiteboard, then the prototype. The map stays the single source of truth.

Loop until the user agrees the prototype flow matches the map — that agreement triggers the Close step in `SKILL.md`.
