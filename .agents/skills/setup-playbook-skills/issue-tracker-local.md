# Issue tracker: Local markdown

Issues for this repo live as markdown files under `.scratch/`, one directory per feature: `.scratch/<feature-slug>/`. Tickets are one file each at `.scratch/<feature-slug>/NN-<slug>.md`, numbered from `01`, never a single combined file. A ticket is referred to by its number, so `#3` is `03-*.md` in the feature directory under discussion.

Every ticket opens with a header block, and the header carries what a hosted tracker would hold as metadata:

```markdown
# 03 — Send the invoice

Labels: map:freelancer-invoicing, release:r1
Blocked by: 01, 02
Status: open
```

`Status:` is `open` or `closed`. Omit `Blocked by:` when the ticket has no blockers, and `Labels:` when it has none.

## Operations

Every operation a skill names, and what it means here. This table is the authority — a skill says "publish to the issue tracker", and this is where that lands on disk.

| A skill asks to | Do |
|---|---|
| **check auth** | Nothing — the tracker is the filesystem. Continue. |
| **publish** an issue | Write `.scratch/<feature-slug>/NN-<slug>.md` with the header block and body, taking the next free `NN`. Report the path and the number. |
| **fetch** a ticket | Read the file. Its `## Comments` section is the conversation history. |
| **list** tickets | Glob the feature directory and read each header block; filter on `Labels:` and `Status:`. |
| **edit** a ticket in place | Rewrite the body, keeping the header block. |
| **comment** | Append under a `## Comments` heading at the bottom, creating the heading when absent. |
| **create a label** | Nothing — labels are strings in the header block, so they exist once written. |
| **apply / remove a label** | Add or drop the string on the ticket's `Labels:` line. |
| **link A blocked by B** | Add B's number to A's `Blocked by:` line. This prose line is the only render of the edge, so no fallback applies. A ticket is unblocked when every number it lists is `closed`. |
| **close** | Append the closing comment, then set `Status: closed`. |
