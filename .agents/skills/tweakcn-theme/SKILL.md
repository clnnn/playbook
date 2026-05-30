---
name: tweakcn-theme
description: Customize the shadcn/ui theme using tweakcn.com editor. Opens the theme editor in a browser, waits for the developer to share a theme URL, then applies it to packages/ui using bunx shadcn add.
user-invocable: true
allowed-tools: Bash(xdg-open *), Bash(bunx shadcn*), Bash(ls *), Bash(cat *)
---

# tweakcn Theme Customizer

This skill opens the tweakcn.com theme editor so the developer can visually customize their shadcn/ui theme, then applies the chosen theme to `packages/ui`.

## Steps

### 1. Open the theme editor

Open `https://tweakcn.com/editor/theme` in the developer's browser.

Detect the environment and open accordingly:

```bash
# Try xdg-open first (works in most Linux environments including devcontainers with display forwarding)
xdg-open https://tweakcn.com/editor/theme 2>/dev/null || \
  # Fallback: print the URL for the developer to open manually
  echo "Please open this URL in your browser: https://tweakcn.com/editor/theme"
```

After running the open command, tell the developer:

> **Browser opened:** https://tweakcn.com/editor/theme
>
> Customize your theme there. When you're done, share any of the following:
> - A predefined theme URL or name, e.g. `https://tweakcn.com/r/themes/bubblegum.json` or just `bubblegum`
> - A custom theme URL or ID, e.g. `https://tweakcn.com/themes/cmpsfc0j3000304ld215uhwj7` or just `cmpsfc0j3000304ld215uhwj7`
> - A `bunx shadcn add` command copied from the site
>
> **Paste it here when ready.**

### 2. Wait for the developer to provide the URL

Do NOT proceed until the developer pastes a URL or identifier. The input can take several forms:

**Predefined themes** (tweakcn built-in presets):
- Full URL: `https://tweakcn.com/r/themes/bubblegum.json`
- Filename only: `bubblegum.json` → construct `https://tweakcn.com/r/themes/bubblegum.json`
- Slug only: `bubblegum` → construct `https://tweakcn.com/r/themes/bubblegum.json`

**Custom themes** (user-created in the editor):
- Full URL: `https://tweakcn.com/themes/cmpsfc0j3000304ld215uhwj7`
- ID only: `cmpsfc0j3000304ld215uhwj7` → construct `https://tweakcn.com/themes/cmpsfc0j3000304ld215uhwj7`

If they paste a `bunx shadcn add` command, extract the URL or slug from it directly.

### 3. Apply the theme to packages/ui

Construct the full URL if needed (see above), then run:

```bash
bunx shadcn add <full-url> --cwd packages/ui -y
```

Examples:
```bash
# Predefined theme
bunx shadcn add https://tweakcn.com/r/themes/bubblegum.json --cwd packages/ui -y 

# Custom theme
bunx shadcn add https://tweakcn.com/themes/cmpsfc0j3000304ld215uhwj7 --cwd packages/ui -y
```

If the `bunx shadcn add` command asks to overwrite existing files, answer **yes** to apply the new theme CSS variables.

### 4. Confirm success

After the command completes:
- Show the developer which files were modified (typically `src/styles/globals.css`).
- Remind them to restart the dev server if it's running so the new theme takes effect.

## Notes

- The `packages/ui` directory contains the shared UI package with `components.json` pointing to `src/styles/globals.css` as the Tailwind CSS file.
- Theme changes are applied as CSS custom properties in that globals file.
- If the developer is in a devcontainer without display forwarding, `xdg-open` will silently fail — in that case, print the URL clearly so they can open it in the host browser.
- Always run `bunx shadcn add` from inside `packages/ui` so the CLI picks up the correct `components.json`.
