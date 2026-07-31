# Walking-skeleton prototype

Built only after the review gate passes. One file, `prototype.html`, that a stakeholder can open in a browser and click through the entire walking skeleton — UI only, no backend, but it must *feel* real.

## Constraints

- **One HTML file:** full `<!DOCTYPE html>` document with `<script src="https://cdn.tailwindcss.com"></script>`, all styling via Tailwind classes, all behavior in inline vanilla JS. No other external assets, no build step.
- **Delivered as a file the user opens locally.** Never publish it with the Artifact tool — the Artifact CSP blocks the Tailwind CDN and the page would render unstyled.
- **Walking skeleton by default:** the prototype implements every Release 1 task in its simplest form and nothing from Release 2/3. If the user asks to preview a later-slice feature, add it behind an obvious toggle rather than blending it into the skeleton.

## Structure — the map drives the screens

- One screen (or wizard step) per backbone activity, navigable in backbone order — a stepper, sidebar, or nav bar that mirrors the whiteboard's top row.
- Each Release 1 task appears as a working interaction on its activity's screen.
- Screens are sections in the one file; navigation is JS show/hide with the current position visibly marked.

## Interactive with mocked data

- Mocked data lives in named JS constants at the top of the script, with persona-plausible domain values — real-looking names, amounts, dates. Never `Lorem ipsum` or `Item 1`.
- Interactions work in memory: forms accept input and carry values to later screens, primary actions update visible state, lists add/remove rows, and the flow reaches a genuine end state (confirmation, summary, success). A full click-through of the narrative must be possible without dead ends.

## High fidelity

It should look like a designed product, not a wireframe:

- One accent color plus a neutral gray scale, applied consistently; a deliberate type scale (page title > section heading > body > caption) instead of default sizes everywhere.
- Real visual hierarchy — the primary action on each screen is unmistakable; secondary actions are visually quieter.
- Generous, even spacing on a consistent scale; aligned edges; content constrained to a comfortable reading width.
- Sensible states: empty states say what to do next, success states confirm what happened, buttons and inputs have hover/focus styles.
- The product's name and persona-appropriate chrome (nav, avatar, page titles) so screenshots read as a real product.

## Feedback loop

Present the file path, tell the user to open it in a browser, and ask what they'd change. Then:

- **UI-only feedback** (layout, copy, colors, widget choice) → edit `prototype.html`, tell them to reload.
- **Feedback that changes the map** (missing task, wrong order, wrong scope) → update the map first, refresh the whiteboard, then the prototype. The map stays the single source of truth.

Loop until the user agrees the prototype flow matches the map — that agreement triggers the Close step in `SKILL.md`.
