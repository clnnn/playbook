# Issue tracker: Local markdown

Issues for this repo live as markdown files under `.scratch/`, one directory per feature: `.scratch/<feature-slug>/`. Tickets are one file each at `.scratch/<feature-slug>/issues/NN-<slug>.md`, numbered from `01`. A ticket is referred to by its number, so `#3` is `03-*.md` in the feature directory under discussion.

Every ticket opens with a header block that carries what a hosted tracker would hold as metadata:

```markdown
# 03 — Send the invoice

Labels: story-map, R1
Status: open
```

`Status:` is `open` or `closed`. Omit `Labels:` when the ticket has none. Comments append to the bottom of the file under a `## Comments` heading.

## Conventions

- **Check auth**: nothing to check, the tracker is the filesystem.
- **Create an issue**: write `.scratch/<feature-slug>/issues/NN-<slug>.md` with the header block and body, taking the next free `NN` and creating directories as needed. Report the path and the number.
- **Create a label**: nothing to create, labels are strings on the `Labels:` line and exist once written.
- **Read an issue**: read the file.
- **List issues**: glob `.scratch/<feature-slug>/issues/` and read each header block; filter on `Labels:` and `Status:`.
- **Comment**: append under `## Comments`, creating the heading when absent.
- **Apply / remove labels**: add or drop the string on the `Labels:` line.
- **Close**: append the closing comment, then set `Status: closed`.

## When a skill says "publish to the issue tracker"

Create a ticket file under `.scratch/<feature-slug>/issues/`.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path or number.
