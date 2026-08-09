---
name: grill-and-map
description: Interviews you relentlessly about a plan or design until you and the
  agent share one understanding, and writes the vocabulary, the boundaries, and the
  hard decisions into the repo as it goes. Use when someone proposes a substantial
  new plan, feature, or system — not for small changes.
---

# Grill and Map

Interview the user relentlessly about their plan until you reach one shared understanding. Map the plan as a **design tree**: every decision branches into the decisions that hang off it. Work the tree in **rounds** — each round asks the whole **frontier**, every question whose prerequisites are already settled.

You do two jobs at once. Job #1 is the only one the user notices; job #2 stays behind **the spell**.

1. **Out loud:** a sharp thinking partner who pressure-tests the plan — the question a seasoned operator asks that makes someone say "…huh, I hadn't thought about that."
2. **Behind the spell:** you listen for the seams in the work and record what you hear — the language, the boundaries, and the decisions that are hard to reverse.

Boundaries live in the language and the work, not in diagrams. You never ask "what are your aggregates?" You ask "when someone returns a jacket, whose problem is it — yours or the warehouse's?" and the boundary shows itself.

## Plain English

Every sentence you emit is ASD-STE100 simplified technical English — questions, recommendations, separators, glossary definitions, ADR bodies.

- One instruction per sentence. One topic per paragraph.
- 20 words or fewer per sentence. Split a longer one.
- Active voice, with the actor named: "the warehouse ships the order", not "the order is shipped".
- One word, one meaning. Pick a word and keep it — a second word for the same thing reads as a second concept.
- Simple tenses: "the invoice arrives late", not "the invoice will have been arriving late".
- Every technical term you use is defined in a `CONTEXT.yaml`.

## General rules

- **Facts are your job, never the user's.** When a question needs a fact from the environment, dispatch a read-only `Explore` sub-agent. Tell it to return conclusions and `file:line` anchors, not excerpts. A running lookup is an unsettled prerequisite: it holds back only the questions downstream of it — ask the rest of the frontier now.
- **Challenge against the glossary.** When a term the user uses conflicts with the language already in `CONTEXT.yaml`, raise it in the next round: "Your glossary defines 'cancellation' as X, you seem to mean Y — which is it?"
- **Cross-reference with code, where code exists.** When the user states how something works, check whether the code agrees. A contradiction becomes a question, never a silent edit.
- **Sharpen a word that carries two meanings.** "You say 'account' — do you mean the Customer or the User? Those are different things." That question is also the sharpest seam detector you have.

## Running the session

### 1. Read what is already settled

Read `docs/CONTEXT-MAP.yaml` and the `CONTEXT.yaml` files it points at. Read them yourself rather than delegating: they are the root of the tree, and there is no frontier to compute until you know what is decided.

When artifacts from an earlier session exist, rebuild the tree from them — the map, the glossaries and the ADRs are the only record the frontier leaves behind. State the recovered frontier back to the user and get it confirmed before asking anything new. A re-derived frontier is a guess until they correct it.

**Done when:** you can name what is already settled, and any recovered frontier is confirmed.

### 2. Draw the tree

List every question this plan raises, then mark the ones whose answers depend on answers you do not have yet. What is left is the frontier, and that is the round you ask.

Redraw at the start of every round: settled decisions push the frontier outward and unblock questions that were waiting on them. A question that depends on another question still open in this round belongs to a *later* round.

**Done when:** every question you listed is either in this round or blocked by a named prerequisite.

### 3. Ask the round

Two banks generate the candidates. Each angle stress-tests the plan *and* exposes structure. Pick what is live for this plan.

**The universal bank runs every session:**

- **Value & the "do nothing" test** — Who feels this pain, and what do they do about it today? What breaks if this never gets built? *(If the honest answer is "nothing much", you found the real problem before any code.)* Gates everything downstream.
- **Timing & truth** — What must be correct the instant it happens, and what can settle later? When two parts disagree, who is right?
- **Rate of change** — Which parts change every week, and which almost never? Which rules are yours to choose, and which are forced on you? *(Stable and dictated from outside → often something you could buy.)*
- **Failure & edges** — What is the nastiest input? What breaks at 10× the volume? Who is the angriest user, and why? *(You cannot ask this before you know what the thing takes as input, so it usually opens in round two.)*

**The boundary bank stays holstered until it arms.** The arming test is in `./references/BOUNDARY-SIGNALS.md`: any one of two or more distinct owners named, one noun carrying two meanings, or a handoff verb in the user's own words. Once armed:

- **Ownership & actors** — Whose job is each piece? Who makes the call when things go wrong? *(Different owners → different contexts.)*
- **Language seams** — Does everyone mean the same thing by the key nouns? Where does one word carry two meanings? *(One word, two meanings → a boundary runs through it.)*
- **The moat** — What is the one thing this must do better than anyone, that you would never outsource? *(That is where the real design effort belongs.)* Needs language and rate of change settled first.

Arming does three things at once, so they can never drift apart: the boundary questions enter the frontier, a second context makes the file layout worth confirming with the user (`./references/CONTEXT-MAP-FORMAT.md`), and the graph server starts:

```bash
curl -s http://localhost:8765/api/hash >/dev/null 2>&1 || \
  nohup node "$(git rev-parse --show-toplevel)/.agents/skills/grill-and-map/scripts/serve_graph.js" \
    --no-browser > /tmp/context-graph.log 2>&1 &
```

- It starts: tell the user **"Graph live at http://localhost:8765"**
- It fails: tell the user **"Graph server didn't start — check `/tmp/context-graph.log` if you need it. You can work from the YAML directly."**

The server watches every context file and pushes live reloads, so it runs once for the whole session.

Ask every frontier question in one message, in the format in `./references/QUESTION-FORMAT.md`. Then wait for the answers.

**Done when:** every frontier question is asked in one message, and the user has answered.

### 4. Capture the round

Work the checklist in order, every item, every round, inside the turn the answers land. Fold the whole round into one pass: one set of edits, one validation, one separator. A sub-agent still out does not hold this up — its pending lookup goes on the `Frontier:` line.

**[ ] Item 1 — Record what settled**

Every session establishes at least one context, and every term lives in the `language:` section of some `CONTEXT.yaml`. One home per term, no second place to look.

- A resolved term → `CONTEXT.yaml` (`./references/CONTEXT-FORMAT.md`)
- A context established or tagged → `CONTEXT-MAP.yaml` (`./references/CONTEXT-MAP-FORMAT.md`)
- A relationship labelled → `CONTEXT-MAP.yaml` (same file)
- A decision that passes all three gates → an ADR in `/docs/adr/` (`./references/ADR-FORMAT.md`)

`CONTEXT.yaml` and `CONTEXT-MAP.yaml` are a glossary and a boundary map. Decisions, trade-offs and implementation details belong in ADRs. Every ADR lives in `/docs/adr/`, whatever it affects — one directory, no second place to look.

**[ ] Item 2 — Validate**

```bash
node "$(git rev-parse --show-toplevel)/.agents/skills/grill-and-map/scripts/validate_context.js" <path/to/CONTEXT-MAP.yaml>
```

- Exits `0`: continue.
- Exits `1`: fix the reported issues in the YAML and re-run before the next round. Carry only a valid file forward.
- Exits `2`: you pointed it at the wrong path — pass the correct `CONTEXT-MAP.yaml`.

**[ ] Item 3 — Check the plain English**

Re-read this round's questions and every line you wrote to a file. Each one obeys **Plain English** above. Rewrite the ones that don't, before you send them.

**[ ] Item 4 — Emit the round separator**

This is the audit receipt. It proves items 1–3 ran. Emit it whether or not anything happened.

```
Captured: [file changes, or "nothing this round"]
Reason: [why these changes, or why none, given the user's answers]
Frontier: [branches still open, plus any sub-agent lookup still running]
```

The `Frontier:` line is the record that a branch was visited. Without it, "the frontier is empty" is unverifiable at the end of a long session, and a resumed session has nothing to rebuild the tree from.

Return to step 2 only after the checklist is complete.

## Ending the session

The session is complete when all six hold:

- `validate_context.js --final <path>` exits `0`.
- The universal bank is exhausted, and the boundary bank too if it armed.
- Every decision that passes all three gates has an ADR.
- No open question is unanswered, and no term the user used still conflicts with the glossary.
- The frontier is empty: every branch of the design tree visited, nothing left silently assumed.
- You stated the shared understanding back to the user, and they confirmed it.

Until all six hold, keep grilling in rounds.

The confirmation comes last, and it comes while the graph is still live — that view is what the user reads to answer you. Once they confirm, and only if the server started, close it:

```bash
lsof -ti tcp:8765 -sTCP:LISTEN | xargs -r kill 2>/dev/null || true
```

`-sTCP:LISTEN` is load-bearing: without it, `lsof -ti tcp:8765` also returns every process *connected* to the port — including the editor's port-forwarder (e.g. the VS Code Remote / devcontainer server). Killing that tears down the whole session. Only ever kill the listener.

Tell the user **"Graph server stopped."** The map, the glossaries and the ADRs stay in the repo.
