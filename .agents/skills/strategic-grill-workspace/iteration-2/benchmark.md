# strategic-grill — Benchmark (iteration 2)

Baseline = plain Opus 4.8 (no skill). 11 evals, 1 run each per config.

| Configuration | Pass rate | Avg time (s) | Avg tokens |
|---|---|---|---|
| with_skill | 100.0% ± 0.0 | 55.0 | 23810 |
| without_skill | 56.5% ± 21.7 | 35.9 | 13462 |
| **delta** | **+0.435** | +19.1 | +10348 |

## Per-eval pass rate (with_skill | baseline | iter-1 with_skill)

| Eval | with_skill | baseline | iter-1 ws |
|---|---|---|---|
| cold-start-plain-language | 5/5 | 1/5 | 100% |
| fuzzy-language-member | 6/6 | 2/6 | 100% |
| weak-core-claim-pushback | 5/5 | 4/5 | 100% |
| new-feature-loyalty-points | 7/7 | 3/7 | 100% |
| cross-context-reporting-dashboard | 6/6 | 3/6 | 100% |
| relationship-change-shipping-inventory | 5/5 | 3/5 | 100% |
| boundary-expansion-subscriptions | 5/5 | 3/5 | 100% |
| new-cross-cutting-refund-flow | 5/5 | 2/5 | 75% |
| stale-path-detection | 4/4 | 4/4 | 100% |
| glossary-term-conflict | 4/4 | 3/4 | 100% |
| relationship-labelling | 5/5 | 3/5 | 50% |

## Analyst notes

- Revised assertions are now strongly discriminating: with-skill 100.0% vs baseline 56.5% (iteration 1 was 93.2% vs 69.5%).
- The added 'no DDD jargon in user-facing text' assertion fails the baseline on evals 2,3,6,7,8,9,10,14 — plain Opus consistently says 'bounded context', 'Anti-Corruption Layer', 'domain events', 'ubiquitous language'. This is the single biggest source of separation.
- The 'canonical labels only' assertion (eval 6) catches the baseline inventing 'Publisher-Subscriber'; the 'no implementation leakage' assertion (evals 1,6,7,10) catches SQL/ledger/saga design the skill keeps out.
- Eval 2 & 3 re-runs confirm the fixture change worked: with pre-seeded context files, the technique now lands inside the Q:/Recommendation block instead of behind the cold-start housekeeping question.
- Eval 10 with-skill now passes the broadened ownership assertion (it framed ownership as Orders-vs-Payments, which the iteration-1 assertion wrongly penalised).
- Eval 14 with-skill now passes: the reframed assertions reward keeping the DDD label out of conversation and recommending a single integration shape, instead of demanding a literal label in turn 1.
- Eval 11 (stale-path) remains non-discriminating: both configs catch the renamed directory (4/4 each). It validates correct behaviour but does not separate the skill from a strong base model — keep it, but don't read skill value into it.
- With-skill now saturates near 100% on these first-turn cases. To keep pressuring the skill in future iterations, add harder cases: multi-turn sessions, a user who pushes back on the recommendation, or a deliberately wrong 'core' justification the skill must not accept.
