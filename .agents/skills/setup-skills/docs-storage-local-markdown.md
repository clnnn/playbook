# Docs storage: Local Markdown

Product documents (PRDs, Lean Product Canvases, user story maps) live as markdown files under `docs/product/` in this repo.

## Conventions

- One document per file: `docs/product/<slug>.md`, slug derived from the document's title (kebab-case).
- Don't overwrite an existing file for the same initiative without confirming with the user first — treat each publish as append-or-new, never a silent overwrite.
- Revision history rides on git — commit each publish/update as its own commit rather than tracking versions inside the file.

## When a skill says "publish the product document"

Write the completed markdown to `docs/product/<slug>.md`, creating the directory if it doesn't exist yet.

## When a skill says "fetch the product document"

Read the file at `docs/product/<slug>.md`. If only a title is known, grep `docs/product/` for a matching `# ` heading.
