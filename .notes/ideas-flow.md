# Ideas Flow — from problem to buildable story

## The core idea (one sentence)

The workflow is a **zoom-in funnel**: it starts at "what business problem exists" and ends at "a story a developer can build this sprint." Each row narrows the scope one level.

```
DOMAIN  →  PRODUCT  →  JOURNEY  →  EPIC  →  SPLIT  →  STORY
(why the   (what we    (the map   (one    (cut     (one
 business  build &     of the     bet at  into     buildable
 works     for whom)   whole      a time) slices)  unit)
 this way)             flow)
```

## Can it be simplified? Yes.

The 6 rows are really **3 jobs**. The skills are just tools you *may* reach for inside each job — not mandatory steps.

| Job | What you're deciding | Skills (pick what you need) | Real artifact |
|---|---|---|---|
| **A. Frame the problem** | Why/what/for-whom | `domain-discovery`, `prd` | CONTEXT-MAP + PRD |
| **B. Shape the work** | The journey → bets → slices | `user-story-mapping`, `epic-hypothesis` | Story map + epics |
| **C. Make it buildable** | Cut & write each story | `epic-breakdown-advisor` → `user-story-splitting` → `user-story` | Dev-ready stories w/ AC |

**Two mental shortcuts that remove most of the confusion:**

1. **Rows 5 and 6 are one motion.** "Split the epic" and "write the story" always happen together — you split *into titles*, then write *each title*. Think of it as one step: **"turn an epic into stories."** `epic-breakdown-advisor` is just the front door that routes you to the raw split patterns.

2. **Row 4 (`epic-hypothesis`) is optional.** It's only valuable when the epic is a genuine *bet* (you're not sure it'll work). For obvious/mandatory work, skip it.

So the honest minimum is: **Frame → Map → Split into stories.** The rest is depth you add when the risk justifies it.

## When to use it

You almost never run all 6 rows. **You enter at the row that matches how much is already decided.**

### 🆕 Starting a new project / product
Run the **full funnel, top to bottom**. Nothing is decided yet, so you genuinely need domain framing before you write stories.
`domain-discovery` → `prd` → `user-story-mapping` → (`epic-hypothesis` per epic) → split → `user-story`

### ➕ Adding a feature to an existing product
Skip rows 1–2. The domain and product already exist. **Enter at row 3 or 4.**
- Feature is a real bet? Start with `epic-hypothesis`, then split into stories.
- Feature is well-understood? Start at `epic-breakdown-advisor` → stories.
- Only touch `user-story-mapping` if the feature is a *multi-step flow* (e.g. "checkout"), not a single capability.

### 🔧 Small change / one clear thing to build
Go straight to row 6: **`user-story`**. One story with Gherkin AC. Don't manufacture epics for a 2-day task.

### 🧭 "I have an idea but it's fuzzy"
Start at row 1: **`domain-discovery`** only. Stop there until the problem is clear. Don't rush to stories.

### 🗺️ "I know the goal but not the sequence of work"
Jump to row 3: **`user-story-mapping`**. This is the tool for turning a known outcome into an ordered backbone + release slices.

---

**The rule of thumb:** *Start at the first row where the answer to its question is still unknown. Everything above that row is already settled — skip it.*
