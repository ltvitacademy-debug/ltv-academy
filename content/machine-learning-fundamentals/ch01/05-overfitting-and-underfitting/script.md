# Script — Overfitting & Underfitting

## Segment 1 (title)

Last lesson gave you the theory. This one makes it a practical skill: looking at two numbers, the training score and the held-out score, and knowing which problem you have and what to try next.

## Segment 2 (steps)

Here's the diagnosis. If both scores are poor and similar, you're underfitting: the model is too simple. If training is excellent but held-out is much worse, you're overfitting: the model memorized. If both are good with a small gap, you have a good fit. The level of both scores tells you about bias. The gap tells you about variance.

## Segment 3 (code)

We'll test it on scikit-learn's make moons, two interleaving half circles with enough noise that no model can be perfect. A decision tree is our dial: max depth limits how many questions it may ask. We fit depths one through fifteen, recording training and held-out accuracy for each.

## Segment 4 (code)

Depth one scores about eighty percent on both: underfitting. Depths two to four reach ninety-one percent on held-out data, the sweet spot. Depth fifteen scores a perfect one hundred on training but only eighty-six on held-out rows: overfitting. Training accuracy only ever rises, so it can't guide this choice.

## Segment 5 (screenshot)

The validation curve, the output of the code above, makes the pattern obvious. Both curves start together. Then training keeps climbing, while held-out accuracy peaks and falls away. The best setting sits where the held-out curve peaks.

## Segment 6 (code)

To fix overfitting, hold the model back. Limiting the tree to depth three lifts held-out accuracy from eighty-six to ninety-one percent. Another constraint we tried closed the gap but didn't improve the score, a reminder that fixes need testing, not assuming. And with only a hundred sixty held-out rows, small differences are noise.

## Segment 7 (steps)

For underfitting, do the opposite: more flexibility or better features. For overfitting: constrain, simplify, get more data, or ensemble. One caution: we chose the depth by peeking at held-out data, so that score is slightly optimistic. Lesson seven fixes that with a validation set.

## Segment 8 (outro)

Compare train and held-out scores, name the problem, apply the matching fix. Up next, lesson six: loss functions and optimization, how models actually learn.
