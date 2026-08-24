# Craft bar

The bar a prototype's surface is judged against — pixels, words, and mocked data. Read it before the first line of CSS.

A page built from scratch — a walking skeleton, a logic demo — is judged against all of it. Variants living inside an existing app inherit identity, materials, type, and spacing from that app's design system; what still binds them is [States](#states) and [Words and data](#words-and-data).

Two words carry the file. A **tell** is a pattern reached for by reflex rather than chosen for this product; it is what makes an interface read as machine-assembled. **Earned familiarity** is the target: someone fluent in the category's best tools sits down, trusts the screen, and never pauses at an off-looking control. This is product UI — the interface disappears into the task, and the stakeholder's attention stays on the flow.

## Identity, derived from the scene

Write one concrete scene sentence from the persona and the setting they work in: who works here, where, under what ambient light, in what mood. Make it specific enough that light-versus-dark follows from the sentence instead of from habit.

Compose the palette in OKLCH from that scene: one primary, one accent, a neutral ramp tinted 0.005–0.015 chroma toward the primary's hue, and a second neutral layer for nav, sidebar, and toolbars. The accent appears on the primary action, the current selection, and state indicators; everything decorative uses neutrals.

Three palettes arrive by reflex and read as tells whatever the scene says: indigo or violet primary on near-white, a warm near-white body surface (L 0.84–0.97, C < 0.06, hue 40–100, whatever you name the token), and slate-blue dashboard chrome. Landing on one means the scene sentence was generic — rewrite it with more detail and recompose.

## Materials, fixed by the one-file contract

The page ships self-contained ([`PUBLISHING.md`](PUBLISHING.md)), which settles every asset question:

- **Type:** the system stack (`ui-sans-serif`, `-apple-system`, `Segoe UI`, `Roboto`), one family, hierarchy from size and weight.
- **Motion:** CSS transitions, keyframes, and Web Animations, 150–250 ms on an ease-out curve. Each animation reports a state change and carries a `prefers-reduced-motion` alternative that crossfades or lands instantly.
- **Icons:** hand-written inline SVG on one stroke width and one size grid.
- **Imagery:** monograms of initials on a tinted surface stand in for avatars; a labelled surface stands in for a thumbnail. Ship no illustration.

## Type, space, and surfaces

- Fixed rem scale, ratio ≥ 1.125 between steps. Product UI is read at consistent DPI, so headings stay fixed; fluid `clamp()` display type belongs to marketing surfaces.
- Body text and placeholder text reach ≥ 4.5:1 against the surface behind them, and 4.5:1 is computed from the two OKLCH values rather than judged by eye. Text on a colored surface takes a darker shade of that surface's own hue.
- Prose runs 65–75ch; tables and dense panels run wider.
- 1280px is the design target. Down to 768px the layout holds with nothing overflowing or overlapping; below that, no separate mobile layout is owed.
- Spacing comes off one scale, varied for rhythm between sections and tight within a control group. Edges align down the page.
- A card earns its place when the content is a genuinely separable object; a heading with a rule under it carries a section more often, and a card inside a card never does. Card edges get either one 1px border or one shadow at ≤ 8px blur, radius 10–14px, with pills reserved for tags and buttons.

## States

Every interactive control ships default, hover, focus-visible, active, and disabled, plus selected wherever selection exists. Every list ships both a populated state and an empty state that names the next action. Every screen has one unmistakable primary action, with secondary actions visibly quieter.

## Words and data

- Buttons and links read verb + object and name what happens: "Send invoice", "Add line item", "View payment history".
- Copy uses the domain's own nouns and the numbers that go with them. Punctuate with commas, colons, semicolons, periods, and parentheses.
- Mocked data reads like an export from one real account: amounts that are not round, dates clustered near today, proper nouns that vary in length and origin, and at least one record awkward in the way real records are — a company name too long for its column, a partial payment, a line item that came back rejected.

## Before publishing

Walk this list in one pass and fix what fails. Report only what could not be fixed.

1. Every screen has one unmistakable primary action.
2. Every interactive control has hover, focus-visible, active, and disabled styling.
3. Body and placeholder contrast computed at ≥ 4.5:1 on every surface used.
4. At 1280px and at 768px, no text overflows its container and no edge falls out of alignment.
5. Every tell named above — reflex palette, borrowed asset, both-border-and-shadow card, over-rounded corner, buzzword, round number — is absent.

## When feedback collides with this bar

The user's call wins. Name the tradeoff once, in one sentence, and offer the version that gets the same intent: a full border or a background tint where a side stripe was asked for, weight and size where a gradient headline was. If they restate the request, build exactly that and let it go.
