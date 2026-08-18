# Publishing a render

How a prototype's standalone page reaches the user — the logic demo and the walking skeleton. Each branch file names its own file, title, and favicon; this file holds the page contract and the delivery path.

## The page

One self-contained `<!DOCTYPE html>` document: hand-written CSS, inline vanilla JS, no external assets — no CDN scripts, remote fonts, or remote images. Support light and dark (`prefers-color-scheme`, plus `:root[data-theme]` overrides for viewers that stamp a theme toggle on the root element).

## Primary — Artifact

Take this path whenever the Artifact tool is available.

1. **Load the `artifact-design` skill before writing the page.** It calibrates how much design investment the page warrants, and a logic demo and a skeleton sit at different points on that scale.
2. Write the file, then publish it with the Artifact tool, following that tool's own publishing requirements.
3. Every refresh republishes the **same file path**, so the URL never changes and the user reloads one open tab.

## Fallback — Parcel dev server

Take this path when the agent has no Artifact tool.

1. Start one dev server in the background, once per session, with build output kept out of the repo:

   ```bash
   npx --yes parcel <dir>/<file>.html --port 4321 \
     --dist-dir <scratchpad>/.parcel-dist --cache-dir <scratchpad>/.parcel-cache
   ```

2. Give the user `http://localhost:4321/<file>.html`. Parcel rebuilds on save, so the tab live-reloads after every refresh with no manual step. If the port is taken, pick another and report the one you used.

If Parcel won't start at all, hand over the file path and ask the user to open it in a browser and reload after each update.
