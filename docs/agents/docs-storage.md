# Docs storage: GitHub Discussion

Product documents (PRDs, Lean Product Canvases, user story maps) live as GitHub Discussions in this repo, under the **Knowledge Base** category. Use the `gh discussion` CLI (currently in preview, subject to change) for all operations.

## Naming

Every discussion title is `[<Type>] <Subject>` — the document type in square brackets, then the initiative or subject it covers:

```
[PRD] Checkout Redesign
[Canvas] Checkout Redesign
[Story Map] Checkout Redesign
[NFR] Checkout Redesign
```

Types: `PRD`, `Canvas`, `Story Map`, `NFR`, `Domain`, `Positioning`, `JTBD`, `Persona`, `Problem`, `OST`, `Epic`. Use the same `<Subject>` across every document for one initiative so they group under a search.

One discussion per type-and-subject pair. Revisions ride on the discussion's own edit history, so the body carries no version log.

`gh` infers the repo from the clone it runs inside — pass `--repo OWNER/REPO` only when running outside one.

## When a skill says "publish the product document"

Check the category for an existing `[<Type>] <Subject>` first, then create or update accordingly:

```
gh discussion list --category "Knowledge Base" --json number,title,url
gh discussion create --category "Knowledge Base" --title "[<Type>] <Subject>" --body-file <path>
gh discussion edit <number> --body-file <path>          # when it's already there
```

Report back the discussion URL.

## When a skill says "fetch the product document"

```
gh discussion view <number> --comments
```

When only a subject is known, find the number first — search on the subject alone and match the `[<Type>]` prefix in the results, since the brackets themselves search poorly:

```
gh discussion list --category "Knowledge Base" --search "<Subject>" --json number,title,url
```

## Commenting

`gh discussion comment <number> --body "..."` adds a comment; `--edit` and `--delete` operate on an existing one.

## The "Knowledge Base" category must already exist

`gh discussion create` files into an existing category and can't create one. If this repo has no **Knowledge Base** category yet, add it once in the GitHub UI — **Settings → Discussions → pencil icon next to Categories → New category**, named `Knowledge Base`. Until then, `gh discussion create --category "Knowledge Base" ...` fails with a clear error.
