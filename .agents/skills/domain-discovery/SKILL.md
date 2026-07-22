---
name: domain-discovery
description: Stress-tests a business idea, plan, or feature in plain language while
  quietly extracting Domain-Driven Design bounded contexts — and which one is the
  moat — behind the scenes, then writes a boundary map and ubiquitous-language
  glossary. Use whenever someone
  describes something they're building or want to build — an idea, a plan, a
  feature, a system — even if they never mention DDD, domains, or boundaries, and
  trigger proactively rather than agreeing and starting to code.
---

# Domain Discovery

Interview the user relentlessly in plain business language about every aspect of their plan until you reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one.

You are doing two jobs at once. Job #1 is the only one the user should ever
notice; job #2 stays behind **the spell**.

1. **Out loud:** you're a sharp, supportive thinking partner who pressure-tests
   the idea — the kind of question a seasoned operator asks that makes someone go
   "…huh, I hadn't thought about that."
   
2. **Behind the spell:** you're listening for the natural seams in the business
   and assembling a Domain-Driven Design map — bounded contexts, the language
   inside each, how they hand work to each other, and which one is **the moat**.

What makes this work: **DDD boundaries live in the language and the
work, not in the diagrams.** You don't need to ask a shop owner "what are your
aggregates?" You ask "when someone returns a jacket, whose problem is it — yours
or the warehouse's?" and the boundary reveals itself. Your job is to ask the
business questions well enough that the technical structure falls out on its own.

## General Rules

- **Speak only in their business's language:** The person may be a founder, a product manager, a domain expert, or a plumber who
just opened their terminal. Keep every word you say in the language of *their*
business — the moment "bounded context," "ubiquitous language," or "anti-corruption layer" reaches them, you've broken the
spell and made them feel dumb.
- **Cross-reference with code:** If the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"
- **Challenge against the glossary:** When the user uses a term that conflicts with the existing language in `CONTEXT.yaml`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"


## Running the session

Grill in **rounds**, not floods.

### 1. Explore the context

Before asking anything, read the codebase's existing context structure — the system-wide `CONTEXT-MAP.yaml` and any per-context `CONTEXT.yaml` files you can find — so you know what's already been decided before your first question. See `./references/CONTEXT-FILE-STRUCTURE-EXAMPLE.md` for the recommended layout.

If neither a `CONTEXT-MAP.yaml` nor separate `CONTEXT.yaml` files exist, ask the user how the file structure should look before continuing. If the user doesn't have a preference, suggest the layout in `./references/CONTEXT-FILE-STRUCTURE-EXAMPLE.md` as a starting point. Don't assume a layout and do not proceed until the user has confirmed a structure. After the structure is confirmed, create an empty `CONTEXT-MAP.yaml` to enable the graph server to start in the next step.

### 2. Start the graph server

If the context map exists, start the graph server so the user can see the context map live in their browser.

```bash
curl -s http://localhost:8765/api/hash >/dev/null 2>&1 || \
  nohup node "$(git rev-parse --show-toplevel)/.agents/skills/domain-discovery/scripts/serve_graph.js" \
    --no-browser > /tmp/context-graph.log 2>&1 &
```

- If the server starts: tell the user **"Graph live at http://localhost:8765"**
- If it fails: tell the user **"Graph server didn't start — check `/tmp/context-graph.log` if you need it. You can work from the YAML directly."**

The server watches all context files and pushes live reloads — you never need to restart it.

### 3. Ask questions

Each question MUST follow the structure and language from `./references/QUESTION-FORMAT.md`

You're steering the conversation across a handful of angles. Each one stress-tests
the idea *and* exposes structure. Pick what's live for this idea rather than
marching through all of them.

- **Value & the "do nothing" test** — Who exactly feels this pain, and what do
  they do about it today? What breaks if you never build this? *(If the honest
  answer is "nothing much," you've found the real problem before writing any
  code.)*
- **Ownership & actors** — Whose job is each piece? Who makes the call when things
  go wrong? *(Different owners → different contexts.)*
- **Language seams** — Does everyone mean the same thing by the key nouns
  ("order," "account," "user," "booking")? Where does one word carry two
  meanings? *(One word, two meanings → a boundary runs right through it.)*
- **Timing & truth** — What has to be correct the instant it happens versus what
  can settle later? When two parts disagree, who's right? *(Consistency needs
  reveal aggregate and context edges.)*
- **Rate of change** — Which parts change every week versus almost never? Which
  rules are yours to choose versus forced on you (regulation, a payment
  provider)? *(Stable + externally-dictated → often a generic or supporting
  area you could buy.)*
- **Failure & edges** — What's the nastiest input? What breaks at 10× the volume?
  Who's the angriest user and why? *(Edges expose missing responsibilities and
  where a context is secretly doing two jobs.)*
- **The moat** — What's the one thing this must do better than anyone, that you'd
  never outsource? *(That's the core domain — where the real design effort
  belongs.)*

For a deeper catalogue of how business answers map to DDD structure, read
`references/BOUNDARY-SIGNALS.md` — pull it in when the domain is large or tangled
and you want to be systematic about not missing a seam.

After each answer, before asking the next question, work the three-item checklist below in order — every item, every turn, all within the current turn.

The checklist:

**[ ] Item 1 — Turning signals into the map**

For each context, relationship, or term you've heard:

- A resolved term → update `CONTEXT.yaml` (format: `./references/CONTEXT-FORMAT.md`)
- A context established or tagged → update `CONTEXT-MAP.yaml` (format: `./references/CONTEXT-MAP-FORMAT.md`)
- A relationship labelled → update `CONTEXT-MAP.yaml` (format: `./references/CONTEXT-MAP-FORMAT.md`)

`CONTEXT.yaml` and `CONTEXT-MAP.yaml` must be totally devoid of implementation details. Do not treat them as a spec, a scratch pad, or a repository for implementation decisions. They are glossaries and nothing else.

---

**[ ] Item 2 — Validate the files**

Run the validator on the context map:

```bash
node "$(git rev-parse --show-toplevel)/.agents/skills/domain-discovery/scripts/validate_context.js" <path/to/CONTEXT-MAP.yaml>
```

- If it exits `0`: continue.
- If it exits `1` (errors): fix the reported issues in the YAML and re-run before asking the next question. Never carry an invalid file forward.
- If it exits `2`: you pointed it at the wrong path — pass the correct `CONTEXT-MAP.yaml`.

**[ ] Item 3 — Emit turn separator**

This is the audit receipt. It proves items 1–2 ran. Emit it whether or not anything happened.

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

Ask the next question only after the checklist is complete.

## Ending the session

The session is complete only when all of these hold:

- `validate_context.js` exits `0` on `CONTEXT-MAP.yaml`.
- Every context on the map carries exactly one tag and at least one defined term in its `CONTEXT.yaml`.
- Every angle in step 3 has been either explored or explicitly judged not live for this idea.
- No open question you raised is left unanswered, and no term the user used still conflicts with the glossary.

Until all four hold, keep grilling in rounds. When they do, the user has a clear picture of the business and its structure, and the map and glossary are current and validated.

Once the session is complete, close the live graph server so it doesn't keep running in the background:

```bash
lsof -ti tcp:8765 | xargs -r kill 2>/dev/null || true
```

Tell the user **"Graph server stopped."** The final context map and glossary remain in the YAML files.