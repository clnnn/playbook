# Actions — first turn (glossary-term-conflict / with_skill)

## Files read
- `.agents/skills/strategic-grill/SKILL.md`
- `.agents/skills/strategic-grill/references/QUESTION-FORMAT.md`
- `.agents/skills/strategic-grill/references/TECHNIQUES.md`
- `.agents/skills/strategic-grill/references/CONTEXT-FORMAT.md`
- `.agents/skills/strategic-grill/references/CONTEXT-MAP-FORMAT.md`
- `.agents/skills/strategic-grill/references/ADR-FORMAT.md`
- Project: `docs/CONTEXT-MAP.yaml`, `packages/orders/docs/CONTEXT.yaml`, `packages/suppliers/docs/CONTEXT.yaml`

## Codebase exploration
- Confirmed both `path:` entries in CONTEXT-MAP.yaml resolve to real files — no stale-path mismatch to flag.
- Existing contexts: Orders (core), Suppliers (supporting), related via `Separate Ways`.
- Key finding: Orders glossary defines **Order** as customer-inbound ("a customer's request to purchase"), and lists Purchase/Transaction under `avoid`. User's new concept (sending orders to suppliers to restock) is supplier-outbound — a direct term collision.

## Files created/modified
- Created `outputs/response.md` (first response).
- Created `outputs/actions.md` (this note).
- No project files (CONTEXT.yaml / CONTEXT-MAP.yaml / ADRs) written — per Between-Turn Protocol, held until the user confirms the term, to avoid writing a second clashing "Order" definition.
- Graph visualizer NOT started — CONTEXT-MAP.yaml already existed (not created this turn) and no long-running servers per instructions.

## Techniques applied
- Challenge against the glossary — surfaced the conflict with the existing "Order" definition.
- Sharpen fuzzy language — proposed canonical term "Purchase Order" / "Restock Order".

## Format adherence
- Used QUESTION-FORMAT.md: single sharp question + mandatory recommendation with a specific reason.
- Conducted in plain business language (no DDD jargon surfaced to user), per SKILL language-calibration table.
- One question only; deferred boundary/relationship questions to later turns.
