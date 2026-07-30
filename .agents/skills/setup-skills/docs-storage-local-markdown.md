# Docs storage: Local Markdown

Product documents (PRDs, Lean Product Canvases, user story maps) live as markdown files under `docs/product/` in this repo.

## Naming

Every filename is `<type>-<subject>.md` — the document type first, then the initiative or subject it covers, all kebab-case:

```
docs/product/prd-checkout-redesign.md
docs/product/canvas-checkout-redesign.md
docs/product/story-map-checkout-redesign.md
docs/product/nfr-checkout-redesign.md
```

Types: `prd`, `canvas`, `story-map`, `nfr`, `domain`, `positioning`, `jtbd`, `persona`, `problem`, `ost`, `epic`. Use the same `<subject>` across every document for one initiative so they sort together. The file's `# ` heading uses the bracketed form — `# [PRD] Checkout Redesign`.

One document per file, one file per type-and-subject pair. Revision history rides on git — commit each publish as its own commit, so the body carries no version log.

## When a skill says "publish the product document"

Write the completed markdown to `docs/product/<type>-<subject>.md`, creating the directory if it isn't there yet. When that path already holds a file, show the user what's there and confirm the replacement before writing.

## When a skill says "fetch the product document"

Read `docs/product/<type>-<subject>.md`. When only a subject is known, glob `docs/product/*-<subject>.md` to find every document for that initiative.
