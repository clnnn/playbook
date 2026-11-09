# Property patterns

Notation is neutral pseudo-code: `for all x: P(x)`. Each pattern names where its expected outcome comes from, which is what keeps it clear of the tautology ban.

| Pattern | Rule | Fits | Example |
|---|---|---|---|
| **Roundtrip** | An operation followed by its inverse returns the input. | Serializers, parsers, codecs, escaping, storage write/read. | `for all v: decode(encode(v)) == v` |
| **Validity** | Every operation returns a value that satisfies the type's rule. | Data structures with an invariant; transforms that keep size or contents. | `for all t,k,v: isValid(insert(k, v, t))` |
| **Postcondition** | After one call, something specific holds about its result. | Any call whose result can be partly characterized. | `for all t,k,v: find(k, insert(k, v, t)) == v` |
| **Model** | The result, mapped onto a simple abstract value, equals a simple operation on that abstract value. | Types with a simple abstract view (a map seen as a sorted list of pairs). | `for all t,k,v: toList(insert(k, v, t)) == listInsert((k, v), toList(t))` |
| **By construction** | The generator builds the input from parts whose expected result it already knows, then adds what should not matter. | Normalizers, formatters, extractors: anything that should see through noise. | `for all words, noise: slugify(decorate(words, noise)) == join(words, "-")` |
| **Oracle / differential** | A trusted alternative implementation gives the same answer. | Optimizations, rewrites, migrations, parallel vs sequential. | `for all xs: fastSort(xs) == naiveSort(xs)` |
| **Metamorphic** | A known change to the input moves the output predictably; no exact expected value needed. | Search, ranking, numerics, anything without a cheap oracle. | `for all q,docs,d: results(q, docs + [d]) ⊇ results(q, docs)` |
| **Idempotence / fixed point** | Twice equals once; an input already valid passes through unchanged. | Normalization, dedup, formatting, upserts, retried handlers. | `for all x: f(f(x)) == f(x)`; `for all valid s: f(s) == s` |
| **Commutativity** | Two paths reach the same result. | Independent updates, set-like and mergeable state. | `for all xs: sort(map(inc, xs)) == map(inc, sort(xs))` |
| **Induction** | A call relates to calls on smaller inputs; base case plus step cover all. | Lists, trees, folds, divide and conquer. | `union(empty, t) == t` |
| **Easy to verify** | Finding the answer is hard, checking it is cheap. | Solvers, pathfinding, tokenizers, schedulers. | `for all s: concat(tokenize(s)) == s` |
| **State machine** | A random command sequence runs on the system and on a model; after every step the two agree and invariants hold. | Stateful APIs, storage, caches, queues, protocols, concurrency. | `{push x, pop, size}` against a list; after each step `real.size == model.length` |
| **Survives** | Any valid input returns a value or fails in a documented way. | First property on any rich-input function. | `for all s: parse(s) returns a value or raises ParseError` |

## Which patterns find bugs

In Hughes' study of a search tree with eight planted bugs ("How to Specify It!", 2019):

- Validity properties alone missed five of the eight: an implementation returning the empty tree passes every one.
- Postcondition, metamorphic and model properties each caught every bug.
- Model properties failed fastest, in about 6 tests on average, against about 56 for metamorphic and 77 for postconditions.

Hence the default pairing in `SKILL.md`: a model property plus a validity property, with metamorphic properties where a model would be costly or would mirror the code. The numbers come from one small case study and rank the patterns; they are not general bug-finding rates.

## Strengthening a weak set

Keep adding properties until a deliberately wrong implementation fails at least one: one that does nothing, drops an input, duplicates a key, or is off by one. For `add`, commutativity alone admits `a * b`; adding identity and associativity closes the gap. When no further property is natural, a concrete example closes it: `reverse([1, 2, 3]) == [3, 2, 1]` catches the identity function that the roundtrip lets through.
