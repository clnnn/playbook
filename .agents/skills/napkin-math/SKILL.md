---
name: napkin-math
description: >
  Napkin math: back-of-the-envelope estimates of system latency, throughput,
  cost, or data size. Use when asked how fast, expensive, or large something
  would be, or for an order-of-magnitude feasibility check.
source: https://github.com/sirupsen/napkin-math
---

# Napkin Math

## Method

### 0. Check the method fits

If the question turns on interacting probabilities (Monty Hall, random shard assignment), queuing under load, or timeout/retry cascades, write a 20-line simulation instead: it gives more confidence than a closed-form derivation you might get wrong. Otherwise, continue.

### 1. Decompose the problem (Fermi decomposition)

Break the question into things you can estimate independently. Write them down as assumptions.
Keep it to 6 or fewer assumptions — if you need more, you're overcomplicating it.

### 2. Look up base rates

Read `references/tables.md` and pick the row that most closely matches each component. Done when every assumption has a value and a source: a table row, a number from the question, or an explicitly flagged guess. → writes `## Assumptions`

### 3. Find the bottleneck

In most systems, one operation is 10-100x slower than the rest. Done when you have named the bottleneck and shown every other term is ≥10x smaller; if two terms are within 10x, model both.

### 4. Calculate with exponents

Work in `c * 10^e` form. The exponent `e` is what matters — it gets you within an order of magnitude. The coefficient `c` is secondary. Treat GiB as GB and use the constants below. → writes `## Calculation`

### 5. Keep the units

Carry units through every step. They act as a checksum — if the units don't resolve to what the question asks, you made an error.

### 6. Replay the calculation in code

The replay is scratch work: it validates the formulas you derived against executable code before you write a single line of output. Rewrite the arithmetic as a short throwaway script (Python or similar) that computes the answer directly from the assumption values — the only numbers it may contain are the assumptions themselves, never intermediate results from your hand math (see the worked example).

Run it. On a mismatch, trust the code: fix the hand math (or a mistranscribed assumption) and replay until they agree.

Then perturb: rerun with each assumption at 2x and 0.5x. Base rates are 2-3x rough, so this is the real error bar.

Done when the script's output matches your hand answer's exponent, every assumption has been perturbed, and you can name the assumption that moves the answer most (or say that none moves the exponent). What ships is the corrected calculation and the sensitivity; the script stays in scratch. → writes `## Sensitivity`

### 7. State the answer and make the decision

Give the final number as an order-of-magnitude range and answer the architecture question: is this fast enough? cheap enough? feasible? The point of napkin math is to decide, not just to compute. → writes `## Answer`

### 8. Suggest verification

The replay checked your arithmetic; the user still needs to check your assumptions against reality. Suggest a concrete way: a benchmark to run, a metric to check, a billing page to compare against, or a quick script. → writes `## How to Verify`

When a measurement disagrees with the estimate by >3x, investigate — the gap itself is the insight:
- System is *faster* than predicted → hidden batching/amortization
- System is *slower* than predicted → wrong access pattern assumption, hidden overhead, or wrong level of the memory hierarchy

---

## Solving Patterns

### Data size from schema

- Count of records * bytes per record = total size
- Example: 10^6 products * 64-bit id = 8 MB; 10^6 products * 1 KB row = 1 GB

### Throughput ↔ latency conversion

- Max ops/sec = 1 second / latency per op
- Example: fsync takes 1 ms → max 1,000 fsyncs/s; TCP echo takes 10 us → max 100,000 ops/s

### Probability-weighted paths

When a system has hit/miss rates (caches, page faults, circuit breakers), weight each path:
- Expected latency = P(hit) * hit_latency + P(miss) * miss_latency
- For p50: if hit rate > 50%, the p50 is in the hit path
- For p99: almost always in the miss path

### Parallelism and batching

- Embarrassingly parallel work: divide total time by core count. Cost = cores * $/core-hour.
- Batching amortizes fixed costs: if a system groups N operations per expensive call (e.g. MySQL group commit), effective throughput = N * (1/latency).
- For parallel calls: latency = max(individual latencies), not sum.

---

## Useful Constants

| Quantity            | Approximation   |
| ------------------- | --------------- |
| Seconds per day     | ~10^5 (86,400)  |
| Seconds per month   | ~2.5 * 10^6     |
| Seconds per year    | ~3 * 10^7       |
| 1 GB (napkin)       | 10^9 bytes      |
| 1 TB                | 10^12 bytes     |

---

## Output Format

```
## Assumptions
## Calculation
## Answer
## Sensitivity
## How to Verify
```

---

## Worked Example

**Question:** How much does it cost to store 30 days of logs for a 100k RPS web app?

### Assumptions
- 100,000 requests/second (question)
- 30 days retention (question)
- ~1 KB per log line (guess: typical structured log)
- ~3x compression (tables.md: English text 2-4x)
- $0.02/GB/month on blob storage (tables.md: Blob Storage)

### Calculation
```
Data rate:    1*10^3 bytes/req * 10^5 req/s = 10^8 bytes/s = 100 MB/s
Per day:      10^8 bytes/s * 9*10^4 s/day = 9*10^12 bytes/day ~ 9 TB/day
30 days:      9 TB * 30 = 270 TB raw
Compressed:   270 TB / 3 = 90 TB stored
Cost:         90*10^3 GB * $0.02/GB = $1,800/month (storage only)
```

Replay (scratch, not shipped):

```python
line_bytes, rps, days, compression, usd_per_gb = 1_000, 100_000, 30, 3, 0.02   # assumptions only
raw_gb = line_bytes * rps * 86_400 * days / 1e9
print(raw_gb, raw_gb / compression * usd_per_gb)   # 259200.0 1728.0 → matches 2.7*10^5 GB, ~$1.8*10^3
```

### Answer
$10^3–10^4/month for storage alone (~$2,000). Ingestion through a managed logging service (tables.md: $0.5/GB) adds ~$0.5/GB * 2.6*10^5 GB ≈ $1.3*10^5/month — ingestion dominates by ~75x. Decision: self-manage on blob storage if cost matters; use a managed service only if running your own pipeline would cost more than ~$130k/month in engineer time.

### Sensitivity
- Every assumption is linear: 2x on any one moves storage cost 2x, so no single assumption moves the exponent.
- Log line size and request rate also move ingest cost linearly; compression does not (ingest is billed raw).
- The managed-vs-self-hosted choice is the real decision point, not any storage assumption.

### How to Verify
- Sample 1000 requests in production, measure median log line size.
- Check current blob storage bill for existing log buckets.
- Compare `du -sh` on a day's compressed logs vs raw.
