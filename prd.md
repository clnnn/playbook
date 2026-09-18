---
type: PRD
title: "PRD: FAME Autopilot MVP"
description: Requirements for the first version of FAME Autopilot — one simple financial-aid task (MPN) and one complex one (V1 verification), resolved conversationally by Sally and approved by a VFAO reviewer.
tags: [fame-autopilot, product]
status: draft
generated: { by: claude-code/claude-sonnet-5, at: 2026-08-25T11:42:23Z }
sources:
  - id: calls
    resource: /product/fame-autopilot/call-summary.md
    title: "Consolidated Call Summary: Fame Autopilot"
    author: human:clnnn
    last_modified: 2026-08-20
  - id: reconciliation
    resource: /product/fame-autopilot/poc-reconciliation.md
    title: "POC Reconciliation: FAME Autopilot"
    author: claude-code/claude-opus-5
    last_modified: 2026-08-24
  - id: scoping
    resource: /product/fame-autopilot/scoping-call-summary.md
    title: "Scoping Call Summary: Fame Autopilot MVP"
    author: human:clnnn
    last_modified: 2026-08-25
---

# PRD: FAME Autopilot MVP

> 🔶 marks anything not established — inferred, assumed, or unknown. Every 🔶 has a row in Risks & open questions.

## What & why

**Building:** We're building Sally, an agentic task layer that turns FAME's financial-aid decisions into assigned tasks and walks students through completing them conversationally, for VFAO's financial-aid team and their students, to solve the manual chase-and-walkthrough work that stalls them, which will result in an assigned task resolving without a staff member personally working the case.[^calls]

**Persona:**

- **Student (and parent)** — US career/trade school enrollee, low tech literacy across the whole range: Gen Z trade students who aren't tech-savvy through 50-year-old welding students who want to hit a link and not download anything. The pain this removes: an emailed worksheet with no one to explain it.
- **VFAO reviewer** — FAME's outsourced financial-aid office; no longer does the chasing, monitors agent progress, approves or rejects, handles escalations. The pain this removes: being the same person who chases, processes, counsels and files.

**Problem:** Financial-aid tasks stall because one staff member must personally chase each flagged student and walk them through the form question-by-question — a single verification case takes half a day, and students drop off while waiting.

## Solution & user flow

```
daily ISIR file lands
   ▼
canonical facts extracted → workflow rules match
   │  (verification level and award year → V1;  loan request → MPN)
   ▼
work item assigned to student, with its requirements attached
   ▼
email + SMS carrying a secure invitation link  (recurring reminders until resolved)
   ▼
student opens their one chat — Sally lists what's open, resumes where they stopped
   ▼
   ├── MPN ──────────── Sally explains what it is and why, links studentaid.gov,
   │                    collects the confirmation as proof, then takes an in-chat
   │                    attestation signature
   │
   └── V1 verification ─ Sally asks the worksheet question-by-question, establishing
                         dependency and tax-filing status in conversation, pre-fills the
                         FAME worksheet, presents it for review + signature, requests
                         tax transcripts / W-2s — and where the student is dependent,
                         reaches the parent in their own right for their signature and
                         their documents
   ▼
Sally judges every requirement satisfied → work item moves to awaiting review
   ▼
VFAO reviewer opens the review queue — reads the chat trail, opens the worksheet and docs
   ▼
   ├── approve ──── work item complete
   │
   └── reject ───── reason recorded, the failing requirements reopen, the student returns
                    to the same chat where Sally explains what was wrong and re-collects
                    only what is missing → back to awaiting review
```

Sally is handed "this student needs X" by FAME's upstream rules and owns only the resolving — verification level, dependency status and worksheet selection arrive on the ISIR, never from Sally asking — so she explains the task in plain language, captures what the form needs through conversation rather than an emailed attachment, and hands a reviewable packet to VFAO. Each task type gets its own playbook: MPN is completed on studentaid.gov and Sally only guides, captures proof and takes an in-chat attestation, never filing on a student's behalf, while V1 runs a branching interview across the student and, where they are dependent, their parent, and produces a pre-filled signed worksheet. Students never see a form they have to download, and reviewers never chase.

## In scope

- **Work item lifecycle** — canonical facts through rule matching to a work item assigned to a student with its requirements attached, and the requirement-satisfaction judgement that moves it to awaiting review.
- **Notification & reminders** — email and SMS sending, the student-facing message templates, secure invitation links, and the recurring cadence until an item resolves. The machinery for this exists, but nothing reaches a student today: no account with a message provider has been set up, the email channel is switched off, the background job that would do the sending is not running, and assigning work to a student does not itself trigger a message. The delivery screens report every message as accepted regardless, so the system currently looks healthy while sending nothing — turning this on is a piece of work, not a setting. The ready-made student messages are also written in reviewer language.
- **Student chat experience** — the one mobile-first chat: open-item listing, resume-where-stopped, free text with structured input where a flow earns it, document upload, and replies that appear as they are written rather than all at once.
- **Sally's agent runtime** — orchestration moves into code rather than a service-to-service agent pattern, with the LLM staying hosted in Foundry; the prior pattern needed a service connection to authenticate against Foundry data, which proved too slow and unreliable to build on. Streaming is a hard requirement, validated in the runtime before any playbook is written. Still open: the temporary developer tunnel currently on the live path, and how conversation history is carried between turns.
- **Task playbooks** — per-task-type handlers: MPN (explain, link to studentaid.gov, capture proof, take an in-chat attestation) and V1 (the branching worksheet interview, dependency and tax-filing status established in conversation, the pre-filled worksheet and its signatures, tax transcript and W-2 requests, and the parent reached and participating in their own right where the student is dependent).
- **Platform security** — durable authenticated logins with roles; every part of the system checking not only whether someone is signed in but whether they are allowed to see or change the particular record they asked for, which is the check almost nothing makes today; uploaded documents protected and screened; and personal data kept out of operational logs.
- **Review surface & audit trail** — a reviewer surface whose decisions are actually saved (today's accept-document choices are discarded when the page closes), the queue, chat trail and packet viewing, the approve and reject verdicts; and behind it the append-only trail, its retention, and the per-student export that does not exist yet.
- **Rejection flow** — everything downstream of a reject verdict: the reviewer's notes carry context back to Sally, who adapts and resumes the student's same chat, re-collecting only what is missing, then the item returns to the review queue. A manual fallback sits alongside it — the reviewer can pull an exceptional case out of the system and chase the student directly, which is the escalation path for a case that keeps looping. 🔶 the exact shape of a reviewer's rejection notes, and the round count before a case is treated as exceptional, are implementation-time decisions.

## Out of scope

- **V5 verification** — never walked through in any discovery call; its form and document set need a dedicated session, and guessing at identity requirements on the compliance-heaviest task is how the pilot loses credibility. Rules for it already exist in the prototype, so this excludes using it, not building it.
- **FAFSA and Entrance Counseling as Sally-driven tasks** — MPN already proves the government-site pattern (explain → link → capture proof). A second copy of it buys feedback breadth, not learning, and V1 is where the build risk sits. Entrance counseling's rules also already exist in the prototype.
- **Write-back into FAME systems (webhooks, originating aid)** — completed work stays in the review surface and VFAO files it exactly as they do today, so nothing about the pilot touches a system of record.
- **Customer-facing rule configuration** — schools will never self-configure; FAME professional services always will, and rules ship pre-seeded. Hiding the screen is not the boundary: the capability behind it must be closed off, which Platform security covers.
- **ISIR-confirmed completion** — confirmation-gated closure is already built; the MVP doesn't use it because write-back is excluded and an approved packet is the definition of done. Waiting for a new ISIR transaction with the verification flag cleared is a later confirmation loop.

**Future considerations:**

- Native mobile app with push notifications
- ISIR-confirmed completion once a new transaction clears the flag
- Corrections handled as a process distinct from verification
- Bundled compliance packet — documents and trail together, in an audit-ready shape

Native mobile is only a legitimate exclusion because the student chat is mobile-first — see `REACH-01`. If the chat isn't phone-first, this stops being an exclusion and becomes a hole.

## Success criteria

- ⭑ **Time to completion** — median from ISIR verification flag to reviewer-approved reaches ≤7 days for V1, and ≤3 days from assignment for MPN, measured against the current manual process over the pilot's first 45 days; if it doesn't beat that baseline, the product pivots. 🔶 no manual baseline exists to compare against
- **Staff-touch-free resolution** — V1 work items reaching approved with no staff member contacting the student reaches 60%, same window. 🔶
- **Packet quality** — V1 packets a reviewer approves without correcting the worksheet reaches 80%, same window. 🔶
- **Disbursement safety** — pilot students missing a disbursement deadline reaches zero, same window — a pilot that resolves cheaply but slower than VFAO has failed.

Numbers are sized against a pilot cohort of ~50 V1-flagged students, possibly up to 100. 🔶

## Quality requirements

**PERF-01 — Reply latency**
Sally's reply lands in ≤7.5s p95 (10s floor) on 4G, 40 turns into a V1 interview; the student sees a response begin within 2s p95, which on a turn needing a lookup means visible progress rather than a blank wait.

- **Why** — Solution step "asks the worksheet question-by-question": a student waiting a minute per question abandons the interview, which is the ⭑ metric directly. The hackathon's agent architecture was hitting roughly a minute per reply; the runtime is being rebuilt in code specifically to close that gap, with streaming validated before any playbook is written.
- **From** — Launch, ~50-student pilot; tightens to 5s p95 before an award-year peak.

**SEC-01 — Access control**
Every part of the system checks who is asking and whether they are allowed to see or change the record they asked for; reviewers authenticate with zero shared logins and sessions that survive a restart; students carry a signed invitation link scoped to one student, expiring in 24h. No real student record enters the system while either prototype opening remains: work must not be able to close without a human, and no passphrase may waive required evidence.

- **Why** — Solution step "email + SMS carrying a secure invitation link" and the reviewer surface. Today the system does check whether a request arrives signed in, but almost nowhere does it check whether that person is allowed to see or change the specific record they asked for — so anyone signed in can reach anyone's case, a handful of ways in are open to anybody at all, and one flag added to any request skips the identity check entirely. The student's link is also unsigned and never expires while their work is open. One forwarded link exposes a parent's tax return, and a crafted rule closes work no human ever saw — either ends both the pilot and the compliance story FAME sells on.
- **From** — Launch; per-role authorisation before the first paying school.

**SEC-02 — Document protection**
SSNs, tax transcripts and W-2s encrypted at rest and in transit, screened on upload before Sally or a reviewer sees them, and personal data kept out of operational logs. Student and parent tax documents stay inside the perimeter until a ruling says they may leave.

- **Why** — Solution step "requests tax transcripts / W-2s": uploaded files sit unencrypted with nothing screening them, and documents are currently sent to an AI provider, so a student's and their parent's tax data leaves the perimeter as a side effect of Sally reading it. The audit trail is not the only store holding personal data — captured facts, conversation messages, uploaded files and model telemetry all do.
- **From** — Launch, as the safe default; relaxes only if FAME rules the documents may leave.

**COMP-01 — Audit trail**
Every chat turn, requirement change, captured field and reviewer verdict written to an append-only trail, retained 5 years 🔶, exportable per student within 1 business day.

- **Why** — Solution step "reviewer reads the chat trail": FAME is a federal third-party servicer and fraud findings must be reported to both the government and the school, so a decision nobody can reconstruct is a decision nobody can report. No export of any kind exists today and no retention is configured, so both are build work rather than settings.
- **From** — Launch; 7 years if a school contract demands it.

**REACH-01 — Device reach**
Student chat is mobile-first: usable at a 360px viewport on iOS Safari 15+ and Android Chrome 100+, zero downloads and zero app installs. Reviewer surface is desktop web, ≥1280px, on current Chrome and Edge.

- **Why** — Persona line "just wants to hit a link and not download anything": the flow enters by SMS, so a desktop-shaped chat loses the student at step one, while reviewers work a queue at a desk and need the width.
- **From** — Launch; unchanged.

Reconciled against the tradeoff pairs: `SEC-01` ↔ `PERF` — the invitation link is exchanged once for a session rather than checked per turn, so universal access checks cost a lookup, not a round trip. `SEC-02` ↔ the ⭑ metric — if tax documents may not reach an AI provider, Sally cannot read them and document understanding returns to a human, putting the reviewer back in the loop the product exists to remove; the safe default holds until FAME rules, and the ruling is named in Dependencies. `OPS` ↔ `SEC` — personal data stays out of operational logs and 2am debugging works from reference identifiers instead. `RESIL` ↔ `PERF` — the 10s floor absorbs one retry. `REACH` ↔ `SEC` — no offline editing, so no records are cached on a device, which is also what keeps `SEC-02` honest.

*Raised, not pinned:*

- Data durability — every answer and upload is already committed on the turn it's given, so recovery point zero for an in-flight interview falls out of the existing design rather than needing a number.
- Uptime — VFAO falls back to email during the pilot, so an hour dark costs nothing irrecoverable.
- Load — ~50 students, possibly up to 100, and the award year that brought 125,000 extra ISIRs is a post-pilot problem.
- Failure behaviour — committing answers per turn covers losing work; the temporary tunnel on the live path is still a decision inside *Sally's agent runtime* rather than a pinned number.
- Operability — nothing is deployed, monitored or alerting yet, so a number here would have nothing to hold to; it follows the hosting decision rather than standing as its own requirement.
- Accessibility standard — the education-sector obligation lands with the first paying school, not an internal pilot.

## Dependencies

- **Real ISIR ingest into canonical facts** — absent today, data is seeded; owned by FAME, and tracks the flat-file spec that changes yearly plus hotfixes. Ingest contract defined, revisited during the build if needed
- **FAME V1 verification worksheets, dependent and independent versions, as fillable templates** — absent on our side; supplied by FAME, and worksheet generation cannot start without them
- **FA knowledge base validation** — drafted but unvalidated: a substantial body of curated financial-aid expertise already exists and cannot be edited without a code change; blocked on the flow deep dive below
- **Deep dive with VFAO on the MPN and V1 flows, their branches and edge cases** — unresolved; gates the knowledge base, the V1 playbook and the parent path, and the same sessions carry per-task-type experience validation
- **Email + SMS delivery** — the message templates, reminder cadence, retries and delivery tracking are built, but nothing sends today: there is no provider account, the email channel is switched off, and the background job that would do the sending is not running. Because the delivery screens report success anyway, this is further from working than it looks. The hackathon prototype used Twilio (SMS) and SendGrid (email), reaching roughly 90% delivery — but only ever tested against the team's own inboxes, not real carrier or spam conditions. The provider account is FAME's — they pick the vendor, hold the account and own carrier/sender registration — so it is blocked on FAME naming the provider and handing over credentials. 🔶 whether the pilot needs both channels or just one is still open
- **Hosting model and environment** — unresolved; one shared service or one deployment per school is undecided, and nothing is deployed, built by a pipeline, or monitored today. The choice propagates into tenancy, operations and what a durable login means
- **Reviewer and staff identity source** — named: the existing FAME Advantage single sign-on, described as simple to set up. Logins today are demo personas that do not survive a restart, and durable roles need to be wired to it
- **Ruling on whether student and parent tax documents may be sent to an AI provider** — unresolved; FAME's call as the federal third-party servicer. `SEC-02` builds the safe default now, so nothing waits on the answer, but the ruling is what could relax it

## Risks & open questions

| Risk or unknown | Why it matters | Next move |
|---|---|---|
| Exact reviewer rejection-note format and round-count-to-escalation are unspecified 🔶 | The overall rejection flow is settled — the reviewer's notes carry context, Sally adapts and resumes the same chat re-collecting only what is missing, and a manual pull-out-and-chase path exists as the escalation valve for a looping case — but what a reviewer must state and how many rounds trigger it are still open | Decide at implementation time when the reviewer surface is built, rather than at the deep dive |
| How a parent is reached, identified and signed is unspecified 🔶 | V1 cannot complete for a dependent student without a parent signature and parent documents, and dependent students are most of what V1 flags | Settle the parent path at the V1 deep dive, before the playbook is built |
| No measured manual baseline 🔶 | The ⭑ criterion's ≤7-day target is set against a number nobody has measured | Pull ISIR-flag→resolved dates for 20 completed V1s from the last award year, before the measurement window opens |
| Pilot cohort assumed at ~50 🔶, and the 60% and 80% targets are unevidenced 🔶 | Under ~30 students every percentage swings on a single case and the 45-day read becomes qualitative | Confirm available V1-flagged volume at beta-school selection; restate the criteria as qualitative if it comes in under 30 |
| 5-year retention unconfirmed 🔶 | `COMP-01` is built against it, and retention is cheap to over-build and expensive to under-build | Confirm the Title IV retention obligation FAME operates under before `COMP-01` is built |
| Whether V1's branch needs structured input or holds on free text | The dependency and tax-filing-status chain drives which worksheet is used and which documents are requested; a misread answer produces a wrong packet | Decide per flow at the deep dive, then test the branch on 5 role-play students — add structured input only where the flow earns it, never as demo polish |
| FAFSA may be the better simple task than MPN | FAFSA is pre-enrollment and higher-value; MPN exercises the parent path V1 also needs | Decide at the story-map review — swap if pilot-window FAFSA volume exceeds loan-requesting students |
| Real ISIR ingest is absent today | Every work item in the flow originates there; without it the pilot is a demo | Agree a first-real-file date at the next technical sync — fall back to seeded data if it slips past the walking skeleton |
| FAME's fillable worksheet templates are absent, and worksheet generation depends on them | The V1 packet is what a reviewer approves; with no template Sally has nothing to fill and the reviewer receives a transcript to retype | Supply both dependent and independent templates before the V1 playbook starts; fall back to a structured packet and accept the transcription cost if they slip |
| Notification provider is unprovisioned, and US SMS sending needs carrier registration with a lead time 🔶 | The templates and cadence are built but nothing sends today, and the delivery screens report success anyway — with no provider, zero students reach the chat and every success criterion reads zero | Name the provider and confirm account plus SMS registration status at the next technical sync; open the pilot email-only if registration slips, and switch SMS on behind it |
| Hosting model unresolved — one shared service or one deployment per school | The choice propagates into tenancy, operations and who runs the stack, and today's logins survive neither a restart nor a second server | Decide it before the platform security work starts, since it changes what a durable session has to be |
| Multi-tenancy / campus scoping is undecided 🔶 | MVP may need to support only one campus, but access control is being reframed as a permissions problem rather than an architecture one — every record campus-tagged, a master filter scoping reviewer queries to their campuses — and retrofitting tenancy later is more expensive than designing for it now; campus access must live in Fame Autopilot itself rather than being inherited from other FAME apps, since the same employee can have different access per product | Amber decides whether a single-campus pilot is acceptable to start; expect she'll want the FA Hub experience (single database, multi-tenant, campus selector) as the model, with single-campus tolerable only as a temporary state |
| Flow deep dive not scheduled | Blocks the knowledge base, the V1 playbook, the parent path and the rejection flow | Book two sessions in the first week: MPN walkthrough, V1 branch walkthrough — and carry the rejection flow into both |
| **Value** — students may not engage with a chatbot for tax paperwork at all | The whole product assumes conversation beats an emailed worksheet, and nothing in discovery tests that | Role-play 5 students per task type before the pilot opens — redesign the interview if fewer than 3 of 5 finish V1 unaided |
| **Value** — verification drop-off may be caused by the paperwork, not the chasing | If so, removing the chase moves the ⭑ metric far less than the targets assume | Instrument abandonment per interview question from day one; compare against VFAO's email drop-off points at the 30-day read |
| **Viability** — reviewer effort may not fall even at 60% staff-touch-free | If a reviewer still reads every chat trail, VFAO's cost is unchanged and the business case doesn't close | Time reviewer minutes per approved packet from the first case; escalate at the 30-day read if the median exceeds 30 minutes |

[^calls]: Consolidated Call Summary: Fame Autopilot
