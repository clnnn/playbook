# Knowledge base

Product documents — PRDs, Lean Product Canvases, Story Maps — live in an OKF bundle at `docs/knowledge/`, one directory per initiative under `docs/knowledge/product/`. The [`okn`](https://openknowledge.sh) CLI queries and validates the bundle; documents themselves are markdown you write directly, then validate.

`okn <command> --help` is the authority on syntax, and `docs/knowledge/SPEC.md` is the bundle's pinned copy of the OKF spec. Where `okn` falls short of the spec, documents follow the spec.

## Publish

Write the document to `docs/knowledge/product/<subject>/<file>.md`, where `<subject>` is the initiative's kebab-case slug — the same slug across every document for one initiative.

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

- `type` is the one field the spec requires. The rest are recommended, and the skills write them.
- `tags` carries the initiative slug.
- `status` is `draft` on first publish — `draft`, `stable` or `deprecated`.
- `generated.by` is `<skill-name>/<model-id>` — the skill and model that wrote the text. `verified` records human review, and stays out of what a skill writes.
- `stale_after` is an absolute date, asked before writing, offering "none" as an answer; omit the key when the answer is none.
- `sources` lists every document this one derives from. `resource` is required per entry — a bundle-relative path (`/product/<subject>/<file>.md`) inside the bundle, a URL outside it.

### Citing a source in the body

Where the prose refers to a source, cite it with a footnote whose label is that source's `id`:

```markdown
The release slices follow the PRD's phasing.[^prd]

[^prd]: PRD: Checkout Redesign
```

The label is the join key into `sources`; the definition text is for the reader.

### Reserved files

`okn` has no index command — the bundle's two reserved files are authored, and validation checks them:

- **`docs/knowledge/index.md`** — the entry point. Link the new document from it, under a `## Product` heading, with a one-line description. Index files carry no frontmatter; the bundle root's `okf_version` key is the one exception.
- **`docs/knowledge/log.md`** — the update history. Append a bullet under today's `## YYYY-MM-DD` heading, creating the heading where the day has none.

### Gate

```
okn validate docs/knowledge
okn list docs/knowledge
```

`validate` checks the bundle against the spec: frontmatter, reserved files, log dates, and whether every local markdown link resolves. Publishing stops on any failed check. `list` prints the tree with each document's type, title and trust state — confirm the new document appears where you expect, as `[unverified, draft]`.

Then offer a commit covering the document, `index.md` and `log.md`, e.g. `docs(product): publish Story Map for checkout-redesign`.

## Discover

Resolve the initiative before the interview begins, so existing documents shape the questions instead of being rediscovered:

```
okn list docs/knowledge                        # the tree, with type, title and status
okn search docs/knowledge "<query>"            # ranked context; the query is positional
okn get docs/knowledge product/<subject>/<file>.md   # one document, in full
```

`search` is lexical over frontmatter and body, so an initiative's slug works as the query. It packs context under a token budget by default; `--matches` prints ranked hits instead, and `--format json` makes either machine-readable.

Show the user which initiatives exist, settle the slug — matching an existing one or proposing a new kebab-case slug — then `okn get` the upstream documents and open the session already knowing them.

To find what derives from a document, search its slug and read the `sources` of the results.

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

`log.md` gains an entry for the update. The gate and the commit offer are the same as for Publish.
