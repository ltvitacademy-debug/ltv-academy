# Speculative Decoding

Everything in this chapter so far has worked around decode's memory-bound nature from the outside — better memory layout (Lesson 18), smarter scheduling (Lesson 19). Speculative decoding attacks it differently: it spends *extra* compute, which decode has spare capacity for, to cut the number of sequential memory-bound steps actually needed.

## What you'll learn

- Why decode's one-token-at-a-time structure leaves GPU compute underused, and how speculative decoding exploits that
- How a draft model and a target model work together
- Why the verification step is more than just "checking" — it preserves the target model's exact output distribution
- What happens on a reject, and why acceptance rate is the metric that decides if this helps at all

## The core idea: guess fast, verify in parallel

Normal decode generates exactly one token per forward pass through the full (target) model — slow not because the compute is heavy, but because each step is memory-bound and strictly sequential (Lesson 4). Speculative decoding adds a small, cheap **draft model** that proposes several candidate tokens in a row, very quickly, by running its own fast, sequential decode. Then the large **target model** checks all of those candidate tokens in a *single* forward pass — because checking several proposed tokens at once is a parallel operation, much like prefill, it can use the GPU's spare compute capacity instead of taking several separate sequential steps.

## Verification: not just checking, but preserving the distribution

The target model's verification step doesn't simply accept drafted tokens that happen to match what it would have picked — it uses a specific rejection-sampling procedure that guarantees the final output has *exactly* the same probability distribution as if the target model had generated every token by itself, one at a time, with no draft model involved. Each drafted token is accepted with a probability based on how the target model's and draft model's probabilities for that token compare; if a token is rejected, everything after it in that draft is discarded, and the target model re-samples a token at that position itself before the process starts over. This guarantee is what makes speculative decoding a strict speed optimization, not a quality trade-off — the output is statistically identical to standard decoding, just produced with fewer sequential target-model steps.

## Where the draft model comes from

- **A smaller sibling model** — e.g. a distilled or naturally smaller model from the same family (tying back to Lesson 15), ideally one trained on similar data so its token preferences correlate well with the target's.
- **Prompt lookup / n-gram decoding** — for tasks with lots of verbatim repetition (code editing, retrieval-augmented generation quoting source text), the "draft" can just be a lookup of matching spans already seen in the prompt, with no separate model at all.
- **Self-speculation (e.g. Medusa-style heads)** — extra prediction heads attached to the target model itself propose multiple next tokens, avoiding a second model altogether.

## The metric that decides if any of this helps: acceptance rate

Speculative decoding only pays off if the draft model's guesses are accepted often enough that the extra compute spent verifying them is worth it; if the target model rejects most draft tokens, you've paid for drafting *and* still mostly fall back to one-token-at-a-time generation. **Acceptance rate** — the fraction of drafted tokens the target model confirms — is the single number that tells you whether a given draft/target pairing is actually worth deploying, which is exactly the kind of measurement Lesson 16's framework applies here too.

## Key terms

| Term | Meaning |
|---|---|
| Draft model | A small, fast model that proposes several candidate tokens ahead of the target model |
| Target model | The full model whose output distribution the final result must match exactly |
| Rejection sampling (here) | The verification procedure that preserves the target model's exact output distribution |
| Acceptance rate | The fraction of drafted tokens the target model confirms; decides if speculation is worth it |

## Recap

Speculative decoding trades spare GPU compute for fewer sequential target-model steps, using a draft model to propose tokens and a statistically exact verification step to confirm or reject them — with acceptance rate as the number that determines whether it's actually a win for a given model pairing and workload. Next up, Lesson 21: prompt caching, which avoids recomputation a different way — by reusing the KV cache itself across requests.
