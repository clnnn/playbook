---
name: strategic-grill
description: Grilling session that stress-tests a plan, idea, or requirements by asking sharp questions about ownership, language, and competitive advantage — then captures what crystallises as structured documentation (CONTEXT-MAP.yaml, CONTEXT.yaml, MADR ADRs). Use whenever the user shares an idea, plan, feature concept, or system design — even if they never mention DDD, bounded contexts, or domain modelling. Trigger on: "I'm building X", "I want to add a feature that...", "here's my plan", "how should we structure this?", "I'm designing a new service", "what do you think of this approach?", "help me think through this", or any time someone is making a structural decision about how their system works. This skill should trigger proactively — if someone describes what they're building, don't just answer; grill them.
---

## Strategic Grill workflow

### 1. Explore the context 

Before asking anything, read the codebase's existing context structure — `CONTEXT-MAP.yaml` at the root and any `CONTEXT.yaml` files you can find — so you know what's already been decided before your first question.

If neither a `CONTEXT-MAP.yaml` nor separate `CONTEXT.yaml` files exist, ask the user how the file structure should look before continuing. If the user doesn't have a preference, suggest the structure above as a starting point. Don't assume a layout and do not proceed until the user has confirmed a structure.

Example:
See `./references/CONTEXT-FILE-STRUCTURE-EXAMPLE.md` for a recommended file structure.

### 2. "Grill" the plan

Interview the user relentlessly in plain business language about every aspect of their plan until you reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. 

Each question MUST follow the structure and language from `./references/QUESTION-FORMAT.md`

After **every** user answer, before **every** next question, complete every item on this checklist in order. **Never skip an item. Never batch items across turns. Never ask the next question until all items are checked.**

**[ ] Item 1 — Check techniques**

Read `./references/TECHNIQUES.md` and evaluate whether any technique is triggered by this answer. Use judgment: don't force techniques that don't apply.

Triggers to watch for:

| What the user did | Technique to consider |
|---|---|
| Used a term that conflicts with or is absent from the glossary | **Sharpen fuzzy language** or **Challenge against the glossary** |
| Described a boundary between areas | **Subdomain alignment check** |
| Claimed something is their competitive differentiator | **Push back on weak core-domain claims** |
| Described how two parts interact | **Relationship labelling** |
| Stated a rule about the domain | **Discuss concrete scenarios** to stress-test it |
| Said something that contradicts the codebase | **Cross-reference with code** |

---

**[ ] Item 2 — Write to files**

Apply every decision that crystallised this turn:

- A resolved term → update `CONTEXT.yaml` (format: `./references/CONTEXT-FORMAT.md`)
- A context established or tagged → update `CONTEXT-MAP.yaml` (format: `./references/CONTEXT-MAP-FORMAT.md`)
- A relationship labelled → update `CONTEXT-MAP.yaml` (format: `./references/CONTEXT-MAP-FORMAT.md`)

`CONTEXT.yaml` and `CONTEXT-MAP.yaml` must be totally devoid of implementation details. Do not treat them as a spec, a scratch pad, or a repository for implementation decisions. They are glossaries and nothing else.

---

**[ ] Item 3 — Validate the files**

Run the validator on the context map:

```bash
node "$(git rev-parse --show-toplevel)/.agents/skills/strategic-grill/scripts/validate_context.js" <path/to/CONTEXT-MAP.yaml>
```

- If it exits `0`: continue.
- If it exits `1` (errors): fix the reported issues in the YAML and re-run before asking the next question. Never carry an invalid file forward.
- If it exits `2`: you pointed it at the wrong path — pass the correct `CONTEXT-MAP.yaml`.

---

**[ ] Item 4 — Start graph server (only if CONTEXT-MAP.yaml was just created this turn, or already exists)**

```bash
curl -s http://localhost:8765/api/hash >/dev/null 2>&1 || \
  nohup node "$(git rev-parse --show-toplevel)/.agents/skills/strategic-grill/scripts/serve_graph.js" \
    --no-browser > /tmp/context-graph.log 2>&1 &
```

- If the server starts: tell the user **"Graph live at http://localhost:8765"**
- If it fails: tell the user **"Graph server didn't start — check `/tmp/context-graph.log` if you need it. You can work from the YAML directly."**

The server watches all context files and pushes live reloads — you never need to restart it.

---

**[ ] Item 5 — Emit turn separator (required every turn, no exceptions)**

This is the audit receipt. It proves items 1–4 ran. Emit it whether or not anything happened.

If a technique fired or a file changed:
```
Techniques fired: [comma-separated list]
Captured: [bullet list of file changes]
Reason: [plain-text explanation of why these techniques fired and why these file changes were made, in the context of the user's answer]
```

If nothing happened:
```
Techniques fired: none
Captured: nothing this turn
Reason: [plain-text explanation of why no techniques fired and why no file changes were made, in the context of the user's answer]
```

**[ ] Item 6 — Ask the next question**

After the turn separator, ask the next question in the format and language in `./references/QUESTION-FORMAT.md`. Do not ask the next question until all items are checked.

---

### 3. Offer ADRs sparingly

Only offer to create an ADR when all three are true:
1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in `./references/ADR-FORMAT.md`. ADR files use the MADR format with `.md` extension.