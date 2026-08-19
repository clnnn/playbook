---
name: grill-and-align
description: A relentless interview that sharpens a plan, and writes the vocabulary, the boundaries and the hard decisions into the repo as it goes.
disable-model-invocation: true
---

# Grill and Align

Interview the user relentlessly until you and the user share one understanding. Map the plan as a **design tree**. Every decision branches into the decisions that hang off it.

You do two jobs in one session. You pressure-test the plan out loud. You also write down the language, the boundaries and the decisions you hear.

## Run the rounds

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled. These are the questions you can ask *now*, without guessing at answers you have not heard yet.

Ask the whole frontier in one message. Number each question and give your recommended answer. Then wait for the user's answers before the next round.

Use this format for every question:

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Each round of answers reshapes the tree. Settled decisions push the frontier outward and unblock the questions that waited on them. Recompute the frontier and ask the next round. A question that depends on another question still open in this round belongs to a *later* round.

**Finding facts is your job, never the user's.** When a frontier question needs a fact from the environment, dispatch a sub-agent to find it. Never ask the user for something you can look up. Do not block on the sub-agent: a running lookup is an unsettled prerequisite, so it holds back only the questions downstream of it. Ask the rest of the frontier now. The *decisions* stay with the user. Put each one to them and wait.

## During the session

**Challenge against the glossary.** The user uses a term that conflicts with the language in `CONTEXT.yaml`. Call it out at once. "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

**Sharpen fuzzy language.** The user uses a vague or overloaded term. Propose one precise term. "You say 'account' — do you mean the Customer or the User? Those are different things."

**Discuss concrete scenarios.** The user describes a relationship between two concepts. Invent a specific case and ask which way it falls. "A customer returns one jacket from a three-item order. Is that one return, or three?" A concrete case forces a precise answer.

**Cross-reference with code.** The user states how something works. Check whether the code agrees. A contradiction becomes a question, never a silent edit. "Your code cancels whole Orders, but you just said partial cancellation works — which is right?"

## Write it down

Capture each answer inside the turn it lands in. Never batch these up.

| What settled | Where it goes | Format |
|---|---|---|
| A resolved term | that context's `CONTEXT.yaml` | [CONTEXT-FORMAT.md](./references/CONTEXT-FORMAT.md) |
| A context, or a relationship between two contexts | `docs/CONTEXT-MAP.yaml` | [CONTEXT-MAP-FORMAT.md](./references/CONTEXT-MAP-FORMAT.md) |
| A decision that passes the three gates | a numbered file in `docs/adr/` | [ADR-FORMAT.md](./references/ADR-FORMAT.md) |

Every term lives in the `language:` section of one `CONTEXT.yaml`. One home per term, and no second place to look. Keep `CONTEXT.yaml` free of implementation details. It is a glossary and nothing else.

Write `docs/CONTEXT-MAP.yaml` from the first context onward. Create every file lazily, when you have something to put in it.

**Ask for the tag. Never guess it.** Every context in the map carries one tag: `core`, `supporting` or `generic`. Before you write the tag, ask the user which capability the business loses if it buys this part off the shelf. The answer picks the tag, and it goes in the `description` field as the justification.

**Offer an ADR sparingly.** A decision earns one when all three gates hold: it is hard to reverse, it surprises a reader who lacks the context, and it came out of a real trade-off. Skip the ADR when any gate fails.

## Validate

Run this after every write to a context file:

```bash
node "$(git rev-parse --show-toplevel)/.agents/skills/grill-and-align/scripts/validate_context.js" <path/to/CONTEXT-MAP.yaml>
```

- Exit `0`: continue.
- Exit `1`: fix the reported problems in the YAML. Re-run before the next round. Carry only a valid file forward.
- Exit `2`: you passed the wrong path. Pass the correct `CONTEXT-MAP.yaml`.

## The live graph

Start the graph server once, right after you write `docs/CONTEXT-MAP.yaml` for the first time. It watches the context files and reloads, so the user reads the current map at any moment. Follow [GRAPH-SERVER.md](./references/GRAPH-SERVER.md) to start it and to stop it.

## Adversaries

Once the frontier is empty and `--final` validation exits `0`, three subagents attack what the session wrote. One takes the context boundaries, one takes the tags, one takes the ADRs. They run in parallel, once, and they read the artifacts alone. Validating first keeps their attention on the design rather than on malformed YAML, which the validator reports for free. Follow [ADVERSARIES.md](./references/ADVERSARIES.md) for what each one receives, what it attacks, and how the user's rulings land back in the files.

Accepted findings can reopen the frontier. Grill the new questions in rounds as before. The adversaries stay done.

## Ending the session

The session is done when all five hold:

- The frontier is empty. Every branch of the design tree is visited, and nothing is silently assumed.
- No term the user used still conflicts with the glossary, and every decision that passes the three gates has an ADR.
- `validate_context.js --final <path/to/CONTEXT-MAP.yaml>` exits `0`.
- The adversaries have run, and the user has ruled on every finding.
- You stated the shared understanding back to the user, and the user confirmed it.

Keep grilling in rounds until all five hold. Do not act on the plan before the user confirms. Stop the graph server after the user confirms.
