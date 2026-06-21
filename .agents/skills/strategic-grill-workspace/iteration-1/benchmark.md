# strategic-grill — Benchmark (iteration 1)

Baseline = plain Opus 4.8 (no skill). 11 evals, 1 run each per config.

| Configuration | Pass rate | Avg time (s) | Avg tokens |
|---|---|---|---|
| with_skill | 93.2% ± 15.4 | 59.336 | 24876 |
| without_skill | 69.5% ± 15.9 | 35.818 | 13442 |
| **delta** | **+0.237** | +23.5 | +11434 |

## Per-eval pass rate

| Eval | with_skill | without_skill |
|---|---|---|
| cold-start-plain-language | 5/5 | 2/5 |
| fuzzy-language-member | 4/4 | 2/4 |
| weak-core-claim-pushback | 4/4 | 3/4 |
| new-feature-loyalty-points | 4/4 | 3/4 |
| cross-context-reporting-dashboard | 4/4 | 3/4 |
| relationship-change-shipping-inventory | 4/4 | 3/4 |
| boundary-expansion-subscriptions | 4/4 | 3/4 |
| new-cross-cutting-refund-flow | 3/4 | 2/4 |
| stale-path-detection | 4/4 | 4/4 |
| glossary-term-conflict | 4/4 | 3/4 |
| relationship-labelling | 2/4 | 3/4 |

## Analyst notes

- The delta is concentrated in FORMAT/DISCIPLINE assertions: baseline (plain Opus 4.8) almost always fails 'exactly one question' and 'Q:/Recommendation format' because it answers with long multi-question essays.
- Substantive grilling assertions (pushes back, reads context files, flags stale path / glossary conflict) PASS in BOTH configs — Opus 4.8 is already a strong critical thinker, so these assertions are weakly discriminating.
- DDD-jargon leakage is a strong UNMEASURED discriminator observed in transcripts: baselines used 'bounded context', 'Anti-Corruption Layer', 'Published Language', 'Conformist' in user-facing text; with-skill never did. Recommend adding an explicit assertion.
- Baseline invented non-canonical labels ('Publisher-Subscriber' in eval 6; ad-hoc type/integration fields in eval 14). With-skill stayed on the canonical DDD set. Recommend an assertion for this.
- Baselines leaked implementation (SQL schemas, ledger design, saga/compensation) into responses and docs; the skill kept artifacts as glossaries only. Recommend an 'altitude' assertion.
- Eval 10 with_skill failed assertion 2 because it framed ownership as Orders-vs-Payments instead of new-context-vs-distributed — arguably a better framing; the assertion is too prescriptive.
- Eval 14 with_skill failed assertions 2 & 4: the skill deliberately keeps DDD labels OUT of conversation and defers the CONTEXT-MAP write until the user confirms, so a literal label can't appear in turn 1. The assertions fight the skill's own language rule and should be reframed.
- Cold-start evals (1,2,3): the single Q:/Recommendation block is spent on the mandated file-layout housekeeping, so the substantive technique lands in surrounding prose rather than the Q-block. Consider pre-seeding the file structure so turn 1 goes straight to grilling.
