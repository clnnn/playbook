---
name: nfr-elicitation
description: Interrogates a plan or feature in plain language until every
  non-functional requirement carries a number and a consequence — speed, load,
  uptime, failure behaviour, security, compliance, accessibility, offline reach,
  data durability, and operability. Use once a functional spec or PRD exists and
  before domain/architecture work, or whenever someone says how well a system
  must behave — "fast", "always-on", "secure", "handles scale" — without saying
  how much. Other skills reach it to pin down the "how well" a functional spec
  leaves implicit.
---

# NFR Elicitation

Interview the user in plain language until every non-functional requirement is
pinned. People don't hand you NFRs; they hand you adjectives — "fast",
"reliable", "secure". Your job is to turn each adjective into **the number**.

**The number** is the whole game. A requirement isn't real until it carries:

- **a threshold** — the measurable line ("under 3 seconds", "500 concurrent", "99.9%")
- **a consequence** — what breaks the moment you cross it ("the installer abandons the job")
- **a source** — who dictates the line: user tolerance, business, a contract, or regulation

"Fast" is an adjective. "Loads in under 3s or the field technician gives up and
calls the office" is **the number**. You elicit it by asking about the
consequence, never the metric — people can't answer "what's your p99 latency
target?" but they can always answer "how long before someone gives up waiting?"

## General rules

- **Ask about the breakage, not the metric.** Every attribute below is phrased
  as a "what happens when…" question for exactly this reason. Reach for the
  metric only after the consequence has surfaced.
- **Speak the user's language.** "Availability", "throughput", and "RPO" are
  your private notes — the moment they reach the user, the answers get worse.
- **Cross-reference the functional spec.** If a PRD or feature doc exists, read
  it first; an NFR that contradicts a stated function is a question, not a note.
- **A number you can't meet is a feasibility risk, not an NFR.** When the user
  names a threshold the build plausibly can't hit, flag it and hand it back to
  validation (a Proof-of-Life or spike) rather than recording it as settled.

## Running the session

Run this as a guided interrogation — one attribute at a time, in rounds. Hold to
this protocol until [Ending the session](#ending-the-session) is met:

- **Open with a heads-up.** Tell the user this is a short interview to put a
  number behind every "fast", "secure", or "reliable" in the plan, then start at
  the first live attribute. If a PRD or feature doc exists, read it first (see
  General rules) so you interrogate against what's already stated.
- **One question per turn.** Ask a single attribute's breakage question in plain
  language, then wait. Stacking questions bewilders the user and thins every
  answer.
- **Label progress every turn** — e.g. `Speed — 2 of 10`.
- **Anchor with a number, and recommend one.** Where the domain lets you guess a
  plausible threshold, offer it as a starting number the user can accept, raise,
  or reject — an anchor pulls a sharper answer than a blank. Put your
  recommendation first, marked `(Recommended)`.
- **Force the number before advancing.** An answer that's still an adjective
  isn't done — ask the follow-up that surfaces the consequence, then the
  threshold and its source. Record each pinned requirement into the spec (see
  Output) before the next question.
- **Pause and resume on request**, and absorb interruptions without losing the
  attribute in front of you.

### The attributes

Walk these angles. Each stress-tests one quality and pins one number. Pick
what's live for this system rather than marching through all of them — but every
one you skip must be skipped *on purpose*, not forgotten.

- **Speed** — "How long before [user] gives up waiting?" → response-time threshold
- **Load** — "Your busiest moment — how many people at once? What happens at 10×?" → concurrency / throughput
- **Uptime** — "If it's dark for an hour at the worst possible time, who's hurt and how badly?" → availability target + acceptable maintenance windows
- **Failure** — "When [a dependency] dies mid-task, what should the user see — and can they lose work they'd already done?" → recovery behaviour, data-loss tolerance
- **Security & privacy** — "What's the worst thing someone could steal, forge, or read here? Who must never see what?" → authN/authZ, encryption, threat model
- **Compliance** — "Any rules you don't get to choose — regulation, a customer contract, where data is allowed to live?" → standards, audit trail, retention
- **Access** — "Who uses this in what conditions — one-handed, gloves on, bright sun, a screen reader?" → accessibility standard + device/context
- **Reach** — "Where does it run — which devices and browsers — and what happens when there's no signal?" → platforms + offline behaviour
- **Data durability** — "If the database vanished this second, how much data can you afford to lose, and how far back must you be able to restore?" → recovery point / recovery time, retention
- **Operability** — "When it misbehaves at 2am, how do you find out, and who's on the hook to fix it?" → logging, alerting, ownership

## Ending the session

The session is complete only when all of these hold:

- Every attribute above is either pinned with **the number** (threshold +
  consequence + source) or explicitly recorded as *not live for this system*.
- No adjective survives unquantified — no "fast", "secure", or "reliable" stands
  in the spec without a number behind it.
- Every number the build plausibly can't hit is flagged as a feasibility risk,
  not silently accepted.

Until all three hold, keep grilling in rounds.

## Output

Write the requirements to `nfr-spec.md` (or into the PRD's non-functional section
if one exists). One row per pinned requirement:

```markdown
# Non-Functional Requirements — [system/feature]

| Attribute | The number (threshold) | Consequence if crossed | Source | Priority |
|---|---|---|---|---|
| Speed | Job screen loads < 3s on 4G | Installer abandons, calls office | User tolerance | Must |
| Load  | 500 concurrent installers, 10× on launch day | Queue backs up, jobs mis-assigned | Business forecast | Must |
| … | | | | |

## Ruled out (not live)
- [Attribute] — why it doesn't apply to this system

## Feasibility risks (numbers we may not hit)
- [Attribute + number] — hand to validation before committing
```
