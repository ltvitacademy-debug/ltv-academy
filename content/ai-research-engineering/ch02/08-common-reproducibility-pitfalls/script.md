# Script — Common Reproducibility Pitfalls

## Segment 1 (title)

Most reproduction attempts fail for a small set of recurring reasons, not fraud. Recognizing these pitfalls in advance saves you from debugging your own code for days when the real gap is somewhere else entirely — in what the paper didn't report, or how a comparison was actually set up in the first place.

## Segment 2 (steps)

A single run per condition, with no seed averaging reported, can't support a strong claim — neural network training is stochastic, and the gap might just be seed-to-seed noise, especially on smaller datasets or smaller models. A subtler version is an undisclosed hyperparameter sweep, where only the best run across many attempts gets written up, quietly inflating the number you're trying to match against your own single run.

## Segment 3 (steps)

Comparisons can also fail on the baseline side: a stale or under-tuned baseline makes a new method look better than it really is, and leaderboards let you cross-check a suspiciously low baseline number against other papers that used that same baseline. Datasets drift too — versions, splits, and label corrections change over time between a paper's publication and your own download — and compute-dependent factors like batch size and numerical precision can shift results even with identical logical hyperparameters on paper.

## Segment 4 (code)

A short checklist — your seeds, dataset version, batch size, precision, and hardware, set directly next to theirs — forces you to record exactly what you compared against what, instead of discovering the gap later, once it's much harder to untangle which factor actually mattered.

## Segment 5 (outro)

Once you've ruled out this whole list and a result still won't reproduce, the next lesson covers what to actually do about it, in a specific and deliberate order.
