# Script — Human Evaluation Design

## Segment 1 (title)

Standard benchmarks need a definitively correct answer to grade. Many of the qualities that matter most -- is this response actually helpful, does it sound natural -- don't have one. Human evaluation measures those qualities directly, by having people judge outputs. This lesson covers how to design one that produces a trustworthy signal instead of noise.

## Segment 2 (steps)

Two common designs. Pairwise comparison shows an annotator two outputs for the same prompt and asks which is better -- an easier, more consistent task than scoring something in isolation, and it directly answers the question most evaluation actually cares about: is the new checkpoint better than the old one? Likert-scale rating instead assigns a single output a numeric score, useful for tracking quality over time, though more prone to drift between annotators.

## Segment 3 (steps)

Asking an annotator to just "rate the quality" produces inconsistent results, because different people silently weight different things -- one cares about correctness, another about tone. A rubric fixes that by making the criteria explicit and shared, with concrete examples of what separates a low score from a high one. But even with a good rubric, you still need to check that annotators actually agree with each other on overlapping examples -- otherwise the average score you report is just averaging noise.

## Segment 4 (code)

Cohen's kappa measures that agreement between two annotators while correcting for the agreement you'd expect purely by chance, which raw percent-agreement doesn't do. A kappa above roughly 0.6 is generally read as substantial agreement; below about 0.4, the rubric or the task itself is probably too ambiguous to trust the resulting scores.

## Segment 5 (outro)

Human evaluation is trustworthy when done carefully, but it's slow and expensive per data point. Next lesson covers the approach that's largely replaced it for fast iteration: using an LLM itself as the judge.
