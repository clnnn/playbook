---
name: prototype
description: Build an interactive walking-skeleton HTML prototype from a release slice issue.
argument-hint: "[slice issue number or URL]"
disable-model-invocation: true
---

# Prototype

Turn a Release 1 slice issue into a high-fidelity HTML click-through of the walking skeleton — one file a stakeholder can open and drive end to end. The issue holds everything the prototype needs: the persona and narrative it is built for, the backbone that becomes its screens, and the Release 1 tasks that become its interactions.

## Input

A slice issue, given as a number or URL: `gh issue view <n> --json title,body,labels`. Read it and restate in one line what is being prototyped — subject, persona, and the count of Release 1 tasks — so a wrong issue is caught before anything is built.

Release 1 is the slice this skill builds. A later slice given instead is reported, with Release 1's issue offered in its place: the skeleton is what a prototype is for.

The issue's own sections carry everything the build needs — `## Who` for the persona and narrative, `## Backbone` for the screen sequence, `## Map` for the tasks under each activity and step.

**Done when** the issue is read and the subject, persona, and Release 1 task count are stated back.

## Build

Read [`references/PROTOTYPE.md`](references/PROTOTYPE.md) for the build and [`references/PROTOTYPE-UI.md`](references/PROTOTYPE-UI.md) for the craft bar it has to clear, then build and publish `prototype.html`.

**Done when** the page is published, its link given, and `PROTOTYPE-UI.md`'s pre-publish checklist walked with anything unfixable reported.

## Feedback

Loop on the user's feedback per `PROTOTYPE.md`'s feedback loop: UI feedback edits the prototype, and feedback that reveals a map change is reported as a finding for `/to-story-map` rather than absorbed silently.

**Done when** the user agrees the prototype flow matches the slice.

## Close

Save `prototype.html` in the repo (default `docs/prototypes/<subject-slug>.html`), then report its repo path, its published link, and the slice issue it was built from.
