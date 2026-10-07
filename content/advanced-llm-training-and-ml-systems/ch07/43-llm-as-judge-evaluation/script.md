# Script — LLM-as-Judge Evaluation

## Segment 1 (title)

Human evaluation is slow and expensive -- a poor fit for comparing dozens of checkpoints in a week. LLM-as-judge substitutes a strong LLM for the human annotator, making comparison cheap and fast enough to run constantly, at the cost of specific, well-documented biases that have to be designed around.

## Segment 2 (steps)

The pattern is straightforward: show the judge model the same question and two responses, ask it to compare them against explicit criteria, and have it explain its reasoning before giving a verdict. Because judges tend to favor whichever response appears first, the standard practice is running the comparison twice with the responses swapped, and only counting a win if it holds in both orderings.

## Segment 3 (steps)

Two biases show up consistently. Position bias favors whichever response is shown first, independent of quality -- the swap-and-recheck approach catches this. Verbosity bias rates longer responses as better even when the extra length adds nothing, likely because length reads as thoroughness -- explicit prompt instructions against favoring length, and length-controlled win rates, both push back against it. A panel of multiple judge models, with verdicts aggregated, further dilutes any single model's idiosyncratic preferences.

## Segment 4 (code)

The prompt itself encodes these mitigations directly: explicit instruction not to favor length alone, and a request for brief reasoning before the final verdict, rather than just a bare A-or-B answer.

## Segment 5 (outro)

Research comparing GPT-4-as-judge against real human preferences found agreement in the 80%-plus range on open-ended chat evaluation -- useful, not perfect, which is why periodically checking the judge against actual human labels still matters. But a judge, and every benchmark covered so far, assumes the test data itself is clean. Next lesson covers what happens when it isn't: benchmark contamination.
