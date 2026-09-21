# PRD

PRDs for this repo live one per initiative at `docs/prd/<slug>.md`. The slug is the subject in kebab-case, `Freelancer invoicing` → `freelancer-invoicing`, and it is the slug `/to-story-map` uses for `docs/story-map/<slug>/`, so one initiative's documents share a name.

## When a skill says "publish the PRD"

Slugify the subject and write `docs/prd/<slug>.md`, creating the directory if needed. When the file already exists, show the user a diff and confirm before replacing it.

## When a skill says "read the PRD"

Read `docs/prd/<slug>.md` for the subject at hand. With no subject given, list `docs/prd/` and ask which one. A missing file means no PRD has been written yet: say so and continue with what the user supplied.
