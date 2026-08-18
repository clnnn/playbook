---
name: prototype
description: Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, explore what a UI should look like, or walk a stakeholder through a whole flow end to end.
argument-hint: "[the question, or a slice issue number or URL]"
---

# Prototype

A prototype is **throwaway code that answers a question**. The question decides the shape.

## Pick a branch

Identify which question is being answered — from the user's prompt, the surrounding code, or by asking if the user is around:

- **"Does this logic / state model feel right?"** → [LOGIC.md](LOGIC.md). Build a single shareable HTML file — free-play buttons plus tabbed guided walkthroughs — that pushes the state machine through cases that are hard to reason about on paper, and that a non-developer can drive.
- **"What should this look like?"** → [UI.md](UI.md). Generate several radically different UI variations on a single route, switchable via a URL search param and a floating bottom bar.
- **"Does this whole flow hang together?"** → [SKELETON.md](SKELETON.md). Build one shareable page a stakeholder can click through end to end — a screen per activity, every step of the flow working in its simplest form — to find the missing or misordered step before anything is built.

The branches produce very different artifacts — getting this wrong wastes the whole prototype. Each names the risk it hunts: a wrong state model, an unchosen design, a flow with a hole in it. If the question is genuinely ambiguous and the user isn't reachable, default to whichever branch better matches the surrounding code (a backend module → logic; an existing page or component → UI; a flow that isn't built yet → skeleton) and state the assumption at the top of the prototype.

## Rules that apply to all three

1. **Throwaway from day one, and clearly marked as such.** Locate the prototype code close to where it will actually be used (next to the module or page it's prototyping for) so context is obvious — but name it so a casual reader can see it's a prototype, not production. For throwaway UI routes, obey whatever routing convention the project already uses; don't invent a new top-level structure.
2. **Trivial to run.** Variants living inside the app start from one command in the project's task runner — `pnpm <name>`, `python <path>`, `bun <path>`, etc. A standalone page — a logic demo, a skeleton — ships as one self-contained file, delivered as a live link per [`PUBLISHING.md`](PUBLISHING.md) so a refresh reloads the tab the recipient already has open, and still openable by double-click when there's nowhere to publish. Either way, no thinking required to start it.
3. **No persistence by default.** State lives in memory. Persistence is the thing the prototype is _checking_, not something it should depend on. If the question explicitly involves a database, hit a scratch DB or a local file with a clear "PROTOTYPE — wipe me" name.
4. **Skip the engineering polish.** No tests, no error handling beyond what makes the prototype _runnable_, no abstractions. The point is to learn something fast. Craft on the *surface* is the opposite call: where a branch sends you to [CRAFT.md](CRAFT.md), that bar holds, because a screen that looks unfinished gets feedback about the screen instead of about the question.
5. **Make every change visible.** A logic demo re-renders the full state in a labelled panel after each action; a UI variant names the variant it switched to; a skeleton carries values forward so the next screen shows them, because there the screens _are_ the state and a debug readout beside them breaks the illusion the walk-through depends on.
6. **Capture it when done.** Fold any validated decision into the real code, then capture the prototype itself as a **primary source**: commit it to a throwaway branch, out of main, and leave a context pointer on the issue it was built from — that branch, plus the published link where there is one, so the issue records the prototype that was actually driven. Capture the answer too — the verdict and the question it settled — in the issue or a commit. The main branch keeps only the validated decision.
