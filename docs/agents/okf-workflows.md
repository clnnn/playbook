# OKF workflows

Product documents live in an OKF v0.2 knowledge bundle rooted at `.okf/`, one directory per initiative under `.okf/product/`. The `okf` CLI queries and validates the bundle; it has no write command, so documents are written directly and validated afterwards.

Where `okf` falls short of the OKF v0.2 spec, documents follow the spec.

## Publish

Write the document to `.okf/product/<subject>/<file>.md`, where `<subject>` is the initiative's kebab-case slug — the same slug across every document for one initiative.

| Document | File | `type:` | `title:` |
|---|---|---|---|
| PRD | `prd.md` | `PRD` | `PRD: <Subject>` |
| Lean Product Canvas | `canvas.md` | `Lean Product Canvas` | `Lean Product Canvas: <Subject>` |
| Story map | `story-map.md` | `Story Map` | `Story Map: <Subject>` |

### Frontmatter

```yaml
---
type: Story Map
title: "Story Map: Checkout Redesign"
description: Release-sliced backbone of the checkout flow, from cart to confirmation.
tags: [checkout-redesign, product]
status: draft
generated: { by: story-map/claude-opus-5, at: 2026-08-04T09:12:00Z }
stale_after: 2027-02-04
sources:
  - id: prd
    resource: /product/checkout-redesign/prd.md
    title: "PRD: Checkout Redesign"
    author: prd/claude-opus-5
    last_modified: 2026-08-01
---
```

- `tags` carries the initiative slug.
- `status` is `draft` on first publish.
- `generated.by` is `<skill-name>/<model-id>` — the skill and model that wrote the text. `verified` records human review and is never written here.
- `stale_after` is asked before writing, offering "none" as an answer; omit the key when the answer is none.
- `sources` lists every document this one derives from. A source inside the bundle uses a bundle-relative path (`/product/<subject>/<file>.md`); an external source uses its URL.

### Citing a source in the body

Where the prose refers to a source, cite it with a footnote whose label is that source's `id`:

```markdown
The release slices follow the PRD's phasing.[^prd]

[^prd]: PRD: Checkout Redesign
```

The label is the join key into `sources`; the definition text is for the reader.

### Gate

```
okf validate .okf
okf index .okf
```

`okf validate` reports the whole bundle as JSON. Publishing stops on any finding with `"severity": "ERROR"`, and on any `WARN` whose `concept_id` is the document just written — those mean the frontmatter above is incomplete. Report warnings on other documents to the user without blocking.

`okf index` regenerates `index.md` in every directory. Those files are generated artifacts; leave them to the tool.

Then offer a commit covering the document and every regenerated `index.md`, e.g. `docs(product): publish Story Map for checkout-redesign`.

## Discover

Resolve the initiative before the interview begins, so existing documents shape the questions instead of being rediscovered:

```
okf list .okf                            # every concept, with type and title
okf search .okf --tag <subject>          # one initiative's documents
okf search .okf --type PRD               # every document of one type
okf search .okf --text "<query>"         # full-text
okf show .okf product/<subject>/<file>   # one document, full content as JSON
```

Show the user which initiatives exist, settle the slug — matching an existing one or proposing a new kebab-case slug — then `okf show` the upstream documents and open the session already knowing them.

`okf backlinks` and `okf graph` read only links written in a document body, not `sources`. To find what derives from a document, search by tag and read the `sources` of the results.

## Update

Republishing over an existing document replaces its body. Show the user a diff and confirm before writing.

| Field | On update |
|---|---|
| body | Replaced |
| `generated` | Rewritten — `by` the skill and model that just ran, `at` now |
| `verified` | Preserved untouched |
| `status` | Preserved |
| `tags` | Preserved, extended where the document gained a subject |
| `stale_after` | Re-asked, current value offered |
| `sources` | Rebuilt from what this run derived from |

The gate and the commit offer are the same as for Publish.
