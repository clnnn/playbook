---
name: to-demos
argument-hint: "[slice to cut — pasted, or a file]"
description: Cut a release slice into demos — a two-day timebox each, the walking skeleton first — sorted into spike demos (prototype) and lo-fi demos (/grill-with-docs), published to the project's issue tracker.
disable-model-invocation: true
---

## Input

The slice to cut, plus the conversation so far. The slice is whatever is named at invocation — text after `/to-demos`, a pasted item, a referenced file. With nothing to read, ask for it. That is the only question the skill asks; from there it runs to published items on its own.

## Operating contract

Three stages in order: **Cut**, **Sort**, **Publish**. Finish one — **Done when** met — before opening the next. Report one line at each stage boundary.

A judgment the input cannot settle is made, not deferred: take the most likely answer and say so on the item where it is used.

---

## Stage 1/3 — Cut

A **demo** is a two-day **timebox** of work shown to the **domain owner**: the person who signs off the slice's case and does not read code. Each demo settles one **question** the domain owner answers by watching. The six criteria below govern every demo; each carries its **Check**.

1. **Skeleton.** D1 is the slice's **walking skeleton**: the whole flow end to end, every step present, a **stub** standing in for whatever is not yet real — hardcoded data, a placeholder page. Check: every step of the slice's flow is reached by D1, and the domain owner sees the case travel from first step to sign-off.
2. **Shown.** Check: the item names what the domain owner sees.
3. **Question.** Check: the question is one line, and the answers the domain owner can give are written beside it.
4. **Timebox.** Check: a demo over two days splits at a flow step; one under a day merges into the demo it feeds.
5. **Stub.** Every demo after D1 makes one of the skeleton's stubs real. A step the skeleton lacks belongs to another slice. Check: the item names the stub it replaces, and the skeleton still runs end to end afterwards.
6. **Fidelity.** A question of **form or feel** — *one long form or three pages?*, *how should this interaction feel?* — has no answer in words; only seeing and touching settles it. That demo is a **spike**: a throwaway prototype, shown, and the domain owner **picks**. A question of **rule, data, flow or wording** is settled by a **grill**; that demo is **lo-fi**, opened with `/grill-with-docs` before anything is built. Check: a spike's question cannot be put to the domain owner in words alone, and a lo-fi demo's question can.

**Cut D1**, the skeleton, against criterion 1.

**Cut the rest.** Walk the slice's flow step by step and write down every question the domain owner must answer before that step is real. One question is one demo. A step carrying both a form-or-feel question and a rule question yields two demos: the spike first, then the lo-fi demo that builds the pick for real, which is the one that replaces the stub.

**Done when:** D1 reaches every flow step; every demo has walked all six checks; every stub in D1 is replaced by exactly one later demo; every question raised on the flow lands in exactly one demo.

---

## Stage 2/3 — Sort

Tag every demo `spike` or `lo-fi` by criterion 6. D1 is always `lo-fi`: its question is *is this the story?*

Order: D1, then the flow's order, a spike always before the lo-fi demo that builds its pick. Each demo builds on the demos before it.

**Done when:** every demo carries exactly one tag; every spike precedes the demo that builds its pick, and that demo names it; numbering is `D1 … Dn` in the order set here.

---

## Stage 3/3 — Publish

Read `docs/agents/issue-tracker.md` for the tracker and how to publish to it. Without that file, the tracker is the repo: one markdown file per demo in `docs/product/demos/`, named `R1-D1-<slug>.md`, its title the `#` heading.

One item per demo, in order. Title `R1·D1 — <name>`, labelled `demo` plus `spike` or `lo-fi`. Body:

```
**D2 of 5 · R1 — <slice name> · replaces** <the stub in D1 this demo makes real>

**Shows:** <what the domain owner sees>

**Question:** <one line> — <the answers the domain owner can give>

**Fidelity:** spike · prototype, the domain owner picks
```

D1's header ends `· the skeleton`. A demo that builds a spike's pick adds `· after D2's pick` to its header. A lo-fi demo's last line reads `**Fidelity:** lo-fi · /grill-with-docs, then build`.

A part the tracker has no field for — the label, markdown, a reference to another item — goes in the nearest field it does have, named in the closing message.

Close with one message in two groups, each demo's link or path in order: **Spikes — prototype**, then **Lo-fi demos — /grill-with-docs**.
