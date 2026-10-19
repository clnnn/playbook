# Quality signals

Lookup reference for the **Quality** section of a slice in [`cut`](../SKILL.md): the ten attributes, the signals in a slice's journey that raise them, and how each one is measured before the slice ships.

A **signal** is something already written in the slice's journey, boundary or mocks that tells you a quality matters. Derivation runs off the slice, so a path that never shows a balance never fields a payment-integrity question.

## The ten attributes

Closed list — every candidate lands in exactly one. The breakage question is what you ask; the attribute name stays a private note. IDs number per attribute across all slices — `PERF-01`, `PERF-02`, `RESIL-01` — and a slice reusing a number already pinned keeps its ID.

| Attribute | Prefix | Breakage question | Pins | Measured by |
|---|---|---|---|---|
| Speed | `PERF` | "How long before the user gives up waiting?" | Response time under a named condition | Load script or browser trace against the deployed slice |
| Load | `SCALE` | "Busiest moment — how many at once? At 10×?" | Concurrency, throughput | Load script at the slice's scaled concurrency |
| Uptime | `AVAIL` | "Dark for an hour at the worst moment — who's hurt?" | Availability target, maintenance window | Uptime probe over the slice's first week |
| Failure | `RESIL` | "When the dependency dies mid-path, what does the user see? Is work lost?" | Degraded behaviour, work-loss tolerance | Kill the mock mid-path and read the screen |
| Security & privacy | `SEC` | "Worst thing someone could steal, forge or read here? Who must never see what?" | Authentication, authorisation, encryption | Unauthenticated and cross-tenant requests against every endpoint the path adds |
| Compliance | `COMP` | "Which rules do you not get to choose — regulation, contract, data residency?" | Standard, audit trail, retention | Checklist against the named rule; audit rows read back |
| Access | `A11Y` | "Who uses this in what conditions — one hand, gloves, sun, a screen reader?" | Accessibility standard | Automated audit plus one screen-reader walk of the path |
| Reach | `REACH` | "Which devices and browsers, and what happens with no signal?" | Platforms, offline behaviour | The path on each named device; airplane mode mid-path |
| Data durability | `DATA` | "Database gone this second — how much can you lose, how far back must you restore?" | Recovery point, recovery time | Restore drill from the latest backup, timed |
| Operability | `OPS` | "Misbehaves at 2am — how do you find out, who fixes it?" | Alerting, ownership | Break the path and time the alert's arrival |

## The signal table

| Signal in the slice | Raises |
|---|---|
| Money changes hands, or a balance, price or total is shown | `DATA` `SEC` `AVAIL` |
| Personal, health, financial or location data is stored | `SEC` `COMP` |
| A regulation, contract or residency rule is named | `COMP` |
| The user is in the field, on the move, or on customer premises | `REACH` `RESIL` |
| The promise is time-based — time to first action, time to value | `PERF` |
| The path aggregates or fans out across several sources | `PERF` `RESIL` |
| Usage concentrates — a deadline, a shift change, a campaign | `SCALE` |
| The path is live or collaborative — several people at once | `PERF` `SCALE` `RESIL` |
| The path crosses a mocked boundary to a third party | `RESIL` `AVAIL` |
| Work spans sessions — a long form, an upload, a resumable task | `RESIL` `DATA` |
| The slice replaces the manual process, so there is no fallback | `AVAIL` |
| Public sector, education, enterprise, or a stated accessibility commitment | `A11Y` `COMP` |
| Others build on it — an API, a webhook, an export | `PERF` `AVAIL` `RESIL` |
| Records must survive — audit trail, legal hold, reporting | `DATA` `COMP` |
| Failure is invisible — a background job, a sync, a scheduled send | `OPS` `RESIL` |

Signals over-generate on purpose. The cut: pin an attribute when missing it means the promise is dishonest, a contract or regulation breaks, or a later slice would have to rebuild this one. Everything else is named on the slice in one line under **Quality** as *not pinned: why*, so the decision can be argued with later.

## Anchoring

Every number is **anchored** before it is written: *"3 seconds on 4G is the usual bar for a screen opened in front of a customer — accept, raise, or reject?"* Run `napkin-math` on latency, throughput, concurrency, size and cost numbers, scaled to the slice's conditions (sample data, one tenant, the first week's traffic), and surface only the verdict. A number nobody can anchor is written with 🔶 and a row in the slice's **Open questions**.
