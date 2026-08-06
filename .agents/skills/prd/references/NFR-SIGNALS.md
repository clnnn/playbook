# NFR Signals

Lookup reference for §6 of [`prd`](../SKILL.md): the ten quality attributes, the signals that raise them, the rubric that decides which get pinned, and the tradeoffs that make a pinned set impossible.

A **signal** is something already written in §2, §3 or §5 that tells you a quality matters. Derivation runs off the document, so a product that never touches money never fields a payment-integrity question, and a desk-bound persona never fields an offline one.

## The ten attributes

Closed list — every candidate lands in exactly one, and every attribute ends the section either pinned or ruled out with a reason.

The breakage question is what you ask. The attribute name and what it pins are private notes: "availability", "throughput" and "RPO" reaching the user is what makes the answers worse.

| Attribute | Prefix | Breakage question | Pins |
|---|---|---|---|
| Speed | `PERF` | "How long before [persona] gives up waiting?" | Response time under a named condition |
| Load | `SCALE` | "Your busiest moment — how many people at once? What happens at 10×?" | Concurrency, throughput |
| Uptime | `AVAIL` | "If it's dark for an hour at the worst possible moment, who's hurt and how badly?" | Availability target, acceptable maintenance window |
| Failure | `RESIL` | "When [dependency] dies mid-task, what should they see — and can they lose work they'd already done?" | Degraded behaviour, work-loss tolerance |
| Security & privacy | `SEC` | "What's the worst thing someone could steal, forge, or read here? Who must never see what?" | Authentication, authorisation, encryption, threat model |
| Compliance | `COMP` | "Which rules do you not get to choose — regulation, a customer contract, where data is allowed to live?" | Standard, audit trail, retention |
| Access | `A11Y` | "Who uses this in what conditions — one-handed, gloves on, bright sun, a screen reader?" | Accessibility standard, usage context |
| Reach | `REACH` | "Which devices and browsers, and what happens when there's no signal?" | Platforms, offline behaviour |
| Data durability | `DATA` | "If the database vanished this second, how much data can you afford to lose, and how far back must you be able to restore?" | Recovery point, recovery time, retention |
| Operability | `OPS` | "When it misbehaves at 2am, how do you find out, and who's on the hook to fix it?" | Alerting, ownership |

IDs number per attribute — `PERF-01`, `PERF-02`, `RESIL-01`.

## The signal table

| Signal in §2 / §3 / §5 | Raises |
|---|---|
| Money changes hands, or a balance/price/total is displayed | `DATA` `SEC` `AVAIL` — a wrong number is worse than no number |
| Personal, health, financial or location data is stored | `SEC` `COMP` |
| §4 or §9 names a regulation, a customer contract, or a data-residency rule | `COMP` |
| The persona works in the field, on the move, or on customer premises | `REACH` `RESIL` |
| The §7 primary metric is time-based — time-to-first-action, time-to-value | `PERF` |
| A key feature aggregates or fans out across several sources | `PERF` `RESIL` |
| Usage concentrates — a deadline, a shift change, a campaign, a season | `SCALE` |
| The feature is live or collaborative — real-time updates, several people at once | `PERF` `SCALE` `RESIL` |
| A key feature depends on a third party you don't control | `RESIL` `AVAIL` |
| Work spans sessions — a long application, an upload, a resumable form | `RESIL` `DATA` |
| The product replaces the manual process outright, so there's no fallback | `AVAIL` |
| The persona works under physical constraint — gloves, sunlight, noise, one hand | `A11Y` |
| Public sector, education, enterprise procurement, or a stated accessibility commitment | `A11Y` `COMP` |
| The feature is something others build on — an API, a webhook, an export | `PERF` `AVAIL` `RESIL` |
| Records must survive — audit trail, legal hold, historical reporting | `DATA` `COMP` |
| Failure is invisible to the user — a background job, a sync, a scheduled send | `OPS` `RESIL` |

Signals over-generate on purpose: a payments feature legitimately raises eight attributes. The rubric below is what cuts them down.

## The ranking rubric

**Business importance**

- **High** — missing it means the §2 problem persists, the §7 primary metric misses, or a contract or regulation breaks.
- **Medium** — it degrades the experience without defeating the outcome.
- **Low** — nobody who matters notices this release.

**Technical risk**

- **High** — nobody here has hit this number before, or it needs a design decision not yet made.
- **Medium** — achievable with known techniques, given deliberate effort.
- **Low** — falls out of any reasonable build.

High importance is pinned, whatever its risk. High importance **and** high risk is pinned *and* mirrored into §9 as a feasibility risk. Everything else is ruled out in the document with its one-line reason — "Offline: not live, every persona is desk-bound on corporate wifi" is a decision someone can argue with six months from now, where silence is not.

## Anchoring and landing zones

An anchor pulls a sharper answer than a blank, so offer a number rather than asking for one: *"3 seconds on 4G is the usual bar for a screen someone opens in front of a customer — accept, raise, or reject?"* This is also where realism gets its teeth. Run the `napkin-math` check on latency, throughput, concurrency, data-volume and cost measures and surface only the verdict: *"5k concurrent at p99 400ms across four aggregated sources is roughly 3× what a single region gives you — 700ms is the honest launch number, or this needs a caching design."*

Three follow-ups is the floor. When the user is still waving between numbers, record a **landing zone** instead of stalling:

- **Minimal** — below this, the release is off.
- **Target** — the number to design for.
- **Outstanding** — worth celebrating.

A landing zone is a real requirement engineering can design against, not a failed answer. Reserve 🔵 for a number that needs discovery nobody has done yet.

## Tradeoff pairs

The anchor check tests one number. This tests the **set** — eight individually plausible scenarios can be collectively impossible, and only a pairwise pass catches it. Each row is one design decision that moves two attributes in opposite directions.

| Pair | The decision that forces the choice |
|---|---|
| `SEC` ↔ `PERF` | Step-up auth, per-request token validation, fine-grained authorisation on aggregate queries — each buys assurance in milliseconds |
| `DATA` ↔ `PERF` | Synchronous cross-region replication buys RPO≈0 and spends write latency; async buys the write and opens a loss window |
| `AVAIL` ↔ `COMP` | Regional failover is how you reach four nines; a data-residency rule deletes the regions you would fail over to |
| `SCALE` ↔ `PERF` | Caching is how throughput is met, and staleness is how it breaks a screen whose job is showing the current number |
| `REACH` ↔ `DATA` | Offline editing means merge conflicts and last-write-wins loss — and caching records on the device reopens `SEC` |
| `RESIL` ↔ `PERF` | Retries, timeouts and circuit breakers are what keep it up, and they land in the tail latency |
| `OPS` ↔ `SEC` | The logging that makes 2am debuggable is the logging that puts personal data in an aggregator |
| `AVAIL` ↔ viability | Each nine multiplies infrastructure and on-call cost; four nines is a staffing decision wearing a technical hat |

Resolving one is a **business** call, not a technical one: say which side wins, in the §2 persona's terms ("a leaked balance costs us the client; a slow balance costs us a reload"), then amend the losing scenario's Response Measure so the pinned set stays honest. A tradeoff nobody will settle today goes to §10 with an owner rather than sitting in §6 looking settled.
