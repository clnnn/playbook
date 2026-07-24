# Lean UX Canvas v2 — Worked Example

A case where **payer ≠ user ≠ final money-capturer**, and money sits **several hops downstream** of the behavior — exactly why Box 2 follows the money before naming a metric, and names one metric per hop.

## Symptom-triage app for a health insurer

**Context:** A telehealth startup offers a symptom-triage app. Patients use it free. The startup sells it to health insurers. ER over-use is the insurer's biggest avoidable cost.

### 1. Business Problem
Insurers pay for expensive ER visits that a nurse hotline or urgent-care redirect could have prevented, but their existing hotline is slow and under-used, so members default to the ER. The startup's app adoption stalls because insurers can't see the cost impact.

**Assumption to validate:** we assume members default to the ER because the hotline is *slow* — but we haven't checked whether they even remember the hotline exists at 11pm. We (the startup) may be part of the problem by pitching a slicker tool when the real gap is recall/trust, not speed. `[validate]`

### 2. Business Outcomes

**Following the money (Phase 2a):**
- **Stakeholders:** Member/patient (*uses* the app, pays nothing) · Employer (*buys* the health plan) · Insurer (*pays* the startup a per-member/month fee) · Startup (*builds* the app) · ER/provider (*bills* the insurer per visit).
- **Money path, hop by hop:** Employer pays insurer a premium → insurer pays the startup a per-member fee → members who'd have gone to the ER get redirected to cheaper care → the ER *doesn't* bill the insurer for those avoided visits → **the insurer keeps the avoided-cost difference.**
- **Final money-capturer:** the **insurer** — it captures ER-avoidance savings far larger than the fee it pays the startup. (The startup's revenue depends entirely on making that capture visible and real.)
- **Status-quo beneficiary:** the **ER/provider** profits from every avoidable visit and *loses* billed revenue if triage works — expect it to resist referral integrations. Internally, the insurer's own claims-ops team, staffed around today's ER volume, has no incentive to champion the change either.

**Outcome metric (Phase 2b):** money is downstream of the behavior, so name each hop:
- *Leading:* cut ER visits per 1,000 members by 20% within two quarters, for enrolled members.
- *Lagging:* −$X in avoided claims cost per 1,000 members → captured by the insurer.
- *Link (assume, validate):* the visits we avert are the *expensive, avoidable* ones and the redirected care costs materially less — not just shifting members off cheap visits. **[viability risk — candidate for Box 7]**

### 3. Users
First persona: **members with a young child**, who trigger anxious after-hours "is this an ER trip?" decisions most often.

### 4. User Outcomes & Benefits
When my kid spikes a fever at 11pm, I want a trustworthy answer fast, so I can avoid a scary, expensive ER trip and sleep. Pain avoided: panic and a wasted night. Gain: confidence I made the right call.

### 5. Solutions
1. AI triage chat with a one-tap "connect to a nurse" escalation.
2. Insurer dashboard showing avoided-ER-visit savings in dollars.
3. Push nudge after a search that suggests nearby urgent care instead of the ER.

### 6. Hypotheses
We believe cutting ER visits per 1,000 members by 20% will be achieved if anxious parents attain a fast, trusted after-hours answer with AI triage plus one-tap nurse escalation.

### 7. Riskiest Assumption
**Value/trust:** anxious parents will trust an app's triage answer at 11pm instead of just going to the ER. If false, no ER visits are avoided and the insurer captures nothing.

### 8. Least Work / Experiment
**Risk type (Box 7): value/trust** → deliver the benefit by hand before building. **Concierge test:** for two weeks, give 20 enrolled parents a phone number to a real nurse (no app yet). Measure: how many use it before an ER trip, and how many ER visits it averts. Pass: ≥8 of 20 call before defaulting to the ER. Settles the trust question before building the AI.

**Disposal:** delete-by end of week 2 — retire the phone line, archive the call recordings and the avoided-visit count, keep only the one-page learnings. If we're tempted to "just keep the line running," that's the signal it's quietly becoming the product.

---

## Counter-example — a solution-driven canvas that fails

The same insurer initiative, filled the wrong way. Each box shows why it collapses.

- **1. Business Problem:** "We need to build an AI triage chatbot." → *A solution, not a problem. What changed? Why now? Nothing here says.*
- **2. Business Outcomes:** "Increase revenue." → *Unmeasurable, and — the v2 tell — the money was never followed: no stakeholders named, no path, no final money-capturer. It also collapses the multi-hop trail to the lagging end only: no leading behavior to measure, so nothing an experiment can move. You can't know a chatbot moves money if you never traced where money sits.*
- **3. Users:** "Everyone with our insurer." → *Too broad to design an experiment for; the anxious-parent trigger moment is lost.*
- **4. User Outcomes:** "Users will like the app." → *Not a benefit or a job — just a hope. Says nothing about why anyone opens it at 11pm.*
- **5. Solutions:** "The AI chatbot." → *One pre-decided idea; no space to test dashboard vs. nudge vs. escalation.*
- **6. Hypotheses:** "We believe users will like AI triage." → *Not falsifiable, ignores the template, links no outcome to no user to no benefit.*
- **8. Experiment:** "Ship it to all members and watch." → *Not the smallest test — it's the whole build. Nothing is learned cheaply.*

**The fix is the good example above:** start from what changed, follow the money to the insurer as capturer, pick the anxious-parent persona, list several solutions, write one falsifiable hypothesis, and settle the trust risk with a two-week concierge test before building anything.
