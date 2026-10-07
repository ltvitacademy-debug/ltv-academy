# Script — Speculative Decoding

## Segment 1 (title)

This chapter so far has worked around decode's memory-bound nature from the outside. Speculative decoding attacks it differently: it spends extra compute, which decode has spare capacity for, to cut the number of sequential steps actually needed.

## Segment 2 (steps)

A small, cheap draft model proposes several candidate tokens in a row, very quickly. Then the large target model checks all of those candidates in a single parallel forward pass, instead of several separate sequential ones — using spare compute the GPU had anyway during a memory-bound decode step.

## Segment 3 (steps)

Verification isn't just checking for a match — it's a rejection-sampling procedure that guarantees the final output has exactly the same distribution as standard one-token-at-a-time decoding. Each drafted token is accepted or rejected based on how the two models' probabilities compare. If a token's rejected, everything after it in that draft gets discarded, and the target model samples that position itself.

## Segment 4 (steps)

The draft model itself can come from a few places: a smaller sibling model from the same family, often distilled; prompt lookup decoding, which just reuses spans already seen in the prompt with no separate model at all; or self-speculation, where extra heads attached to the target model propose the next few tokens directly.

## Segment 5 (code)

In vLLM, this is a couple of flags: a speculative model and a number of speculative tokens per step. Whether it's actually worth running comes down to one number — acceptance rate, the fraction of drafted tokens the target model confirms.

## Segment 6 (outro)

If acceptance rate is low, you've paid for drafting and still mostly fall back to normal decoding. Next up, lesson twenty-one: prompt caching, which avoids recomputation a different way entirely.
