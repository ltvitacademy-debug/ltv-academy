# Script — The Chinchilla Trade-off: Params vs. Tokens

## Segment 1 (title)

Loss falls predictably as you scale parameters, data, or compute on their own. But the question that actually matters for planning a run is: given a fixed compute budget, how should it split between a bigger model and more training tokens? DeepMind's 2022 Chinchilla paper answered that directly.

## Segment 2 (steps)

Earlier guidance favored scaling model size aggressively over data, partly because those earlier fits didn't correct for learning-rate schedules mismatched to run length. That's part of why models like Gopher, at 280 billion parameters, were trained on relatively few tokens per parameter. Chinchilla, at just 70 billion parameters but 1.4 trillion tokens, used the exact same compute budget — and beat the much larger Gopher on downstream evaluations.

## Segment 3 (code)

The fitted optimum from over 400 carefully controlled training runs, ranging from 70 million to 16 billion parameters, comes out to roughly 20 tokens for every parameter. A 7-billion-parameter model's compute-optimal budget is therefore around 140 billion tokens. That's the number to anchor on when judging whether a run is under or over trained for its size.

## Segment 4 (steps)

But compute-optimal only minimizes training-time loss — it says nothing about inference cost, which scales with parameters, not training tokens. That's why many open-weight models deliberately train a smaller model well past its compute-optimal token count: it costs more up front but is far cheaper to serve at scale.

## Segment 5 (outro)

Hold onto that 20-tokens-per-parameter anchor, and the idea that compute-optimal and inference-cheap are different goals. Next up: the learning rate schedule that makes a run at this scale actually stay stable.
