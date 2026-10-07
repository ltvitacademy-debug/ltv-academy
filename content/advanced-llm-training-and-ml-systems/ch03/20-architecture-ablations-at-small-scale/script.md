# Script — Architecture Ablations at Small Scale

## Segment 1 (title)

Every lesson so far has assumed the architecture, data mixture, and schedule are already decided. But those choices have to be made before the expensive run starts, and nobody tests them by training the full-size model five different ways. Here's how teams actually make those calls.

## Segment 2 (steps)

The usual suspects get ablated repeatedly: positional encoding, like RoPE versus ALiBi; normalization placement and type, like pre-norm versus post-norm, or LayerNorm versus RMSNorm; feed-forward activation functions; and attention variants like grouped-query or multi-query attention, which trade a little quality for much cheaper inference.

## Segment 3 (code)

In practice an ablation is just training several small configs of the same codebase on the identical data, token budget, and learning-rate schedule, changing exactly one thing — say, the normalization type — and comparing final validation loss. Multiple seeds per variant are common, since a single run's noise can otherwise look like a real effect.

## Segment 4 (steps)

The whole practice rests on one assumption that has to be checked, not trusted: that if A beats B at fifty to a hundred fifty million parameters, A still beats B at the billions-of-parameters scale you actually care about. That usually holds for genuinely structural wins, but it's not guaranteed, which is why some decisions get re-validated at a slightly larger scale before being locked in.

## Segment 5 (outro)

That closes the loop on this chapter: cheap, small runs are how you predict a big run's loss, and they're also how you choose the architecture that big run will actually use. Next up, Chapter 4: turning a pretrained base model into one that follows instructions.
