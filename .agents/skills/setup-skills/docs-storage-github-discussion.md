# Docs storage: GitHub Discussion

Product documents (PRDs, Lean Product Canvases, user story maps) live as GitHub Discussions in this repo, under the **Product** category. Use the `gh discussion` CLI (currently in preview, subject to change) for all operations.

## Conventions

- **Publish a document**: `gh discussion create --category "Product" --title "<document title>" --body-file <path-to-markdown>`.
- **Update a document**: `gh discussion edit <number> --body-file <path-to-markdown>` (title and category can be changed the same way).
- **Read a document**: `gh discussion view <number> --comments`.
- **List documents**: `gh discussion list --category "Product" --json number,title,url`.
- **Comment on a document**: `gh discussion comment <number> --body "..."`.

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

## The "Product" category must already exist

`gh discussion create` cannot create a category — it can only file into one that already exists. If this repo doesn't have a **Product** discussion category yet, create it once in the GitHub UI: **Settings → Discussions → pencil icon next to Categories → New category** (name it `Product`). `gh discussion create --category "Product" ...` fails with a clear error if the category is missing — create it and retry.

## When a skill says "publish the product document"

Run `gh discussion create --category "Product" --title "<document title>" --body-file <path>` and report back the discussion URL.

## When a skill says "fetch the product document"

Run `gh discussion view <number> --comments`. If only a title is known, find the number first with `gh discussion list --category "Product" --search "<title>"`.
