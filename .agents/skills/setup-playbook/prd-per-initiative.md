# PRD

PRDs for this repo live one per initiative at `docs/product/prd/<slug>.md`. The slug is the subject in kebab-case, `Freelancer invoicing` → `freelancer-invoicing`, and `/to-story-map` slugifies the same subject the same way, so the PRD sits beside the map at `docs/product/story-map/<slug>/map.json`.

## When a skill says "publish the PRD"

Slugify the subject and write `docs/product/prd/<slug>.md`, creating the directory if needed. When the file already exists, show the user a diff and confirm before replacing it.

## When a skill says "read the PRD"

Read `docs/product/prd/<slug>.md` for the subject at hand. With no subject given, list `docs/product/prd/` and ask which one. A missing file means no PRD has been written yet: say so and continue with what the user supplied.
