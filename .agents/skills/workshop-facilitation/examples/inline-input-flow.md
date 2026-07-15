# Example Flow: Inline Input Skips Answered Questions

This transcript demonstrates the **inline-input rule** from the Input section of every skill: anything the user supplies with the invocation counts as answers already given. The facilitator credits that context, skips the questions it covers, and resumes mid-flow — it does not march the user back through questions they already answered.

The session below uses `prioritization-advisor` running on this facilitation protocol, but the pattern applies to any interactive skill.

---

## The Transcript

**User (invocation with inline context):**

> Use prioritization-advisor: We're a Series A SaaS that just found product/market fit and is scaling fast. My team is small but aligned — 4 engineers, 1 designer, clear goals. I've got a backlog of ~20 features and need to pick what ships next quarter.

**Facilitator:**

> Quick heads-up: this normally takes about 5-7 minutes and 4 context questions — but you've already answered half of them in your request, so we'll be faster.
>
> Here's what I have from what you gave me:
> - **Product stage:** early PMF, scaling fast ✓
> - **Team context:** small but aligned (4 eng, 1 design, clear goals) ✓
>
> That covers Context Q1 and Q2. Two things I still need:
>
> **Context Q3/4 — What's driving the prioritization decision right now?**
> 1. Too many ideas, unclear which to pursue
> 2. Prioritizing by gut feel; want a metrics-based process
> 3. Stakeholders disagree and we need a shared, defensible ranking
> 4. Other (specify)

**User:**

> 2

**Facilitator:**

> Moving from gut feel to a repeatable, metrics-based process — that steers us toward a scoring framework rather than a quick value/effort sort.
>
> **Context Q4/4 — How much data do you have to score against?**
> 1. Rich data — reliable analytics, reach numbers, confidence estimates
> 2. Some data — basic analytics and customer feedback, but nothing rigorous
> 3. Little to none — mostly qualitative signal

**User:**

> 2 — decent analytics and steady customer feedback, but no formal confidence scoring yet

**Facilitator:**

> That's everything. Based on your stage (scaling post-PMF), an aligned team, the goal of replacing gut feel with a repeatable process, and some-but-not-rigorous data, here's the recommendation:
>
> **Recommended: RICE** — Reach × Impact × Confidence ÷ Effort gives you the metrics-based ranking you want, and the explicit *Confidence* term keeps you honest about the data gaps you just flagged instead of overweighting shaky estimates.
>
> **Alternative: Weighted Scoring** — if RICE's four inputs feel heavy for a 20-item backlog, a lighter 2-3 criteria weighted model gets you 80% of the rigor with less scoring overhead.
>
> Want me to set up a RICE scoring template for your backlog, or walk through the alternative first?

---

## Why This Works

- **The invocation context was treated as answers, not preamble.** The facilitator restated what it extracted (stage, team context) and *showed* which questions were credited — the user sees their input landed and trusts the flow.
- **Progress labels stayed honest.** The session opened at `Context Q3/4`, not `Q1/4`, because Q1 and Q2 were already answered. Restarting the count would signal the inline input was ignored.
- **Only the gaps were asked.** Two questions instead of four. The guided mechanism didn't disappear — it did exactly its job, on exactly the missing pieces.
- **The empty-handed path still exists.** A user who invokes the same skill with no context gets the full heads-up, entry-mode choice, and all four questions. Inline input is a shortcut, never a requirement — that's the "invitation, not gate" principle from the Input convention.

## The Anti-Pattern (What Not to Do)

**User:** *(same rich invocation as above)*

**Facilitator (wrong):**

> Welcome! This session takes 5-7 minutes. Let's begin.
>
> **Context Q1/4 — What stage is your product in?**

The user already answered that — in the message the facilitator is replying to. Re-asking teaches the user that context given up front is wasted, which trains them to withhold it. Interaction drag compounds from there: every re-asked question is a turn the session didn't need.

**Corrective action:** before asking Q1 of any flow, scan the invocation (and any pasted context) against the question list. Credit what's covered, say so explicitly, and open at the first genuinely unanswered question.
