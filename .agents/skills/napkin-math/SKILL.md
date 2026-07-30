---
name: napkin-math
description: >
  Back-of-the-envelope estimation for system performance, cost, and data size questions.
  Use when the user says "napkin math", "quick estimate", "back of the envelope",
  "order of magnitude", or asks how fast/expensive/large something would be in a systems context.
source: https://github.com/sirupsen/napkin-math
---

# Napkin Math

Before starting any calculation, read `references/tables.md` for the base rate numbers.

## Method

### 1. Decompose the problem (Fermi decomposition)

Break the question into things you can estimate independently. Write them down as assumptions.
Keep it to 6 or fewer assumptions — if you need more, you're overcomplicating it.

### 2. Look up base rates

Use the reference tables in `references/tables.md`. Pick the operation that most closely matches each component.

### 3. Identify the dominant constraint

In most systems, one operation is 10-100x slower than the rest. Find it and model that — the other components are noise.

### 4. Calculate with exponents

Work in `c * 10^e` form. The exponent `e` is what matters — it gets you within an order of magnitude. The coefficient `c` is secondary.

### 5. Keep the units

Carry units through every step. They act as a checksum — if the units don't resolve to what the question asks, you made an error.

### 6. State the answer and make the decision

Give the final number, state your assumptions, and answer the architecture question: is this fast enough? cheap enough? feasible? The point of napkin math is to decide, not just to compute.

### 7. Suggest verification

When possible, suggest a concrete way the user can verify the estimate: a benchmark to run, a metric to check, a billing page to compare against, or a quick script.

---

## Solving Patterns

Recognize which patterns apply before computing.

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

### The first-principle gap

When your napkin estimate disagrees with reality by >3x, investigate — the gap itself is the insight:
- System is *faster* than predicted → hidden batching/amortization
- System is *slower* than predicted → wrong access pattern assumption, hidden overhead, or wrong level of the memory hierarchy

### When to simulate instead

Don't napkin-math probabilities over time, queues, or randomness. Simulate them:
- Multiple interacting probabilities (Monty Hall, random shard assignment)
- Queuing behavior under load
- Timeout/retry cascades

A 20-line simulation gives more confidence than a closed-form derivation you might get wrong.

---

## Useful Constants

| Quantity            | Approximation   |
| ------------------- | --------------- |
| Seconds per day     | ~10^5 (86,400)  |
| Seconds per month   | ~2.5 * 10^6     |
| Seconds per year    | ~3 * 10^7       |
| 1 GB (napkin)       | 10^9 bytes      |
| 1 TB                | 10^12 bytes     |

Use powers of 10 for all arithmetic — don't fuss over GiB vs GB for napkin math.

---

## Output Format

```
## Assumptions
- [list each assumption with its value and source]

## Calculation
- [step-by-step, carrying units, using c * 10^e notation]

## Answer
- [final number with units, stated as an order of magnitude range]
- [the decision: is this feasible/acceptable/worth investigating further?]

## Sensitivity
- [which assumptions matter most — if X is 2x off, does the answer change?]

## How to Verify
- [concrete step: benchmark, billing check, monitoring query, quick script]
```

---

## Worked Example

**Question:** How much does it cost to store 30 days of logs for a 100k RPS web app?

### Assumptions
- ~1 KB per log line (typical structured log)
- 100,000 requests/second
- 30 days retention
- Stored on blob storage ($0.02/GB/month)
- ~3x compression ratio for structured text

### Calculation
```
Data rate:    1*10^3 bytes/req * 10^5 req/s = 10^8 bytes/s = 100 MB/s
Per day:      10^8 bytes/s * 9*10^4 s/day = 9*10^12 bytes/day ~ 9 TB/day
30 days:     9 TB * 30 = 270 TB raw
Compressed:  270 TB / 3 = 90 TB stored
Cost:        90*10^3 GB * $0.02/GB = $1,800/month (storage only)
```

### Answer
~$2,000/month for storage alone. Add ingestion costs (~$0.5/GB * 270,000 GB = $135,000/month at list price for a managed logging service) — ingestion dominates if using a managed provider. Decision: self-manage on S3 if cost matters; managed service only if operational cost of running your own pipeline exceeds $130k/month in engineer time.

### Sensitivity
- Log line size has linear impact. 500 bytes → half the cost.
- Compression ratio: 2x instead of 3x → 50% more expensive.
- The managed-logging ingest cost dwarfs raw storage — that's the real decision point.

### How to Verify
- Sample 1000 requests in production, measure median log line size.
- Check current blob storage bill for existing log buckets.
- Compare `du -sh` on a day's compressed logs vs raw.
