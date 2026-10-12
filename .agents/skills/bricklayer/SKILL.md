---
name: bricklayer
description: "Build a product brick by brick: release slices on the issue tracker, one slice at a time, each mould cast into a brick."
disable-model-invocation: true
---

A product idea has arrived, too big to build in one go. This skill keeps the **map** for building it **brick by brick**: it cuts the idea into **release slices** on the issue tracker, plans each slice as an ordered run of **moulds**, and hands the user one mould at a time to work in its own session, where it is **cast** into a **brick**. Every brick sits on the one before it; the product grows slice by slice.

The moulds themselves are HITL work done in other sessions with the user's own skills.

## Vocabulary
 
- **Release slice**: a thin but complete vertical cut through every layer that a user could ship on its own. Its **promise** is one sentence, "after this slice, a user can ___".
- **Mould**: one unit of figuring-out inside a slice, worked by the user in a fresh session. A mould has a **mode**, decided by what it must settle:
  - **grill**, the default: the user runs `/grill-with-docs` on the mould's question.
  - **prototype**, when the question is how something should _look_ or how it should _behave_: the user runs `/prototype`.
- **Brick**: a mould, cast and implemented in the working product within its release slice.

## The slice issue

Once issue per slice, labelled `release-slice:<slug>`, created in order so slice N can say it follows slice N-1. The body:

```markdown
## Promise
 
After this slice, a user can <___>.
 
## Journey
 
<the thing a user is trying to accomplish; names and scopes the slice>
 
## Risk
 
<`structural` if a later brick depends on this slice's decisions (data model, identity, a core boundary), else `local`; one line on why, and why this slice sits where it does in the order>
 
## Moulds
 
<!-- ordered -->
 
- <mould name> (grill|prototype): <the question it settles>
- <mould name> (grill|prototype): <the question it settles>
```

## Invocation

1. **Cut.** Draft the slices by the rules from [SLICING.md](SLICING.md) and present them as a numbered list: name, promise, risk mark, and the one-line reason for its place in the order. Ask whether a promise is dishonest, a slice is horizontal, or the order is wrong; iterate until the user approves, then create every slice issue in order with its Moulds section empty

2. **Shape.** On each slice, settle with the user what its moulds are. If its Moulds section is empty, walk the promise and journey until every question the slice must settle is named, then write the moulds in order on the issue by the rules in [MOULDS.md](MOULDS.md).
