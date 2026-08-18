# Walking Skeleton

One self-contained page a stakeholder opens and clicks through an entire flow end to end — UI only, no backend, but it has to *feel* real. Use this when the question is about **scope and sequence**: is this the right set of steps, in the right order, and what falls out of the flow once someone actually walks it.

The skeleton is the thinnest version of the whole flow, not a finished version of part of it. Every step works in its simplest form; nothing beyond the current slice appears at all.

## When this is the right shape

- "Walk me through what we're actually building."
- "Is this the whole flow, or are we missing a step?"
- "I want to put this in front of a stakeholder before we commit."
- Anything where the risk is a **missing or misordered step**.

If the risk is that the state model itself is wrong — which transitions are legal, what the data can represent — that's [LOGIC.md](LOGIC.md). If one screen exists and the question is what it should look like, that's [UI.md](UI.md).

## Process

### 1. Read the flow and state it back

The flow arrives as a conversation, a written narrative, or a story-map slice issue. For an issue, `gh issue view <n> --json title,body,labels`: `## Who` carries the persona and narrative, `## Backbone` the screen sequence, `## Map` the steps under each activity.

Whatever the source, restate in one line what is being prototyped — subject, persona, and the number of steps — so a wrong reading surfaces before anything is built.

### 2. Build the page

**Screens follow the flow.** One screen (or wizard step) per activity, navigable in flow order behind a stepper, sidebar, or nav bar that mirrors the sequence. Screens are sections in the one file and navigation is JS show/hide, with the current position visibly marked. Each step of the flow appears as a working interaction on its activity's screen. The product's name and persona-appropriate chrome — nav, avatar, page titles — so a screenshot reads as a real product.

**Interactions run on mocked data.** Mocked data lives in named JS constants at the top of the script. Forms accept input and carry values to later screens, primary actions update visible state, lists add and remove rows, and the flow reaches a genuine end state: confirmation, summary, success. A full click-through of the narrative is possible with no dead ends.

**Built to the bar and published.** Read [CRAFT.md](CRAFT.md) before the first line of CSS — it holds the standard this page's visuals, copy, and mocked data are judged against, and the checklist that gates publishing. Publish per [`PUBLISHING.md`](PUBLISHING.md) with title `<Product name> — Walking Skeleton` and favicon 🦴. Walk the pre-publish checklist in one pass, fix what fails, and report only what could not be fixed.

### 3. Loop on feedback

Give the user the link and ask what they'd change.

- **Feedback about the page** — layout, copy, colors, widget choice — edits the page and republishes it; the link stays the same.
- **Feedback that changes the flow** — a missing step, wrong order, wrong scope — is reported as a finding against the source rather than absorbed silently. Where the source is a slice issue, recommend `/to-story-map` on that initiative, which owns the map and the slice issues. Build the skeleton to the flow as it stands: a prototype that quietly outruns its source leaves the two disagreeing with no record of which is right.

Loop until the user agrees the flow on screen is the flow they meant.

### 4. Capture the answer and the prototype

Capture the answer — what walking it corrected about the flow — then capture the prototype the way the [SKILL](SKILL.md) describes. The skeleton-specific mapping: there is no module to lift, so the whole page rides to the throwaway branch as the primary source, and the published link goes on the source issue beside the branch pointer.

## Anti-patterns

- **A polished slice of the flow instead of the whole thin flow.** Depth in one screen hides the missing step three screens later, which is the thing being hunted.
- **Later-slice features blended in.** When the user asks to preview one, put it behind an obvious toggle so the skeleton still reads as the skeleton.
- **A state panel beside the screens.** The screens are the state.
- **A real backend.** Mocked data, in memory. The question is whether the flow is right, not whether it works.
