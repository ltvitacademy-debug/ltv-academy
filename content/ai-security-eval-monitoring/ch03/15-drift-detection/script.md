# Script — Drift Detection

## Segment 1 (title)

A model's weights don't change after launch, but the world feeding it does. Customer language shifts, new products appear, a competitor's name starts showing up where it never did. That's often enough for accuracy to quietly decline — no error thrown, nothing visibly broken.

## Segment 2 (steps: data drift vs concept drift)

Two different things get called drift. Data drift is the distribution of the input changing — the kinds of questions users ask. Concept drift is the relationship between input and correct output changing — what used to count as a good answer shifting over time.

## Segment 3 (screenshot: drift summary report)

A real drift report compares a reference distribution against a current window, column by column, with a statistical test chosen for that column's type — flagged Detected or Not Detected, with a drift score attached.

## Segment 4 (screenshot: drilled-down column)

Opening a flagged column shows exactly how the shape changed, not just that it did — the reference distribution next to the current one, overlaid.

## Segment 5 (screenshot: test suite)

A report nobody checks gets ignored. The same checks as a pass/fail test suite turn drift into something a pipeline can act on automatically — sixteen tests, three failed, each naming the exact column and score that crossed the threshold.

## Segment 6 (outro)

The same idea works for an LLM app without a tabular dataset — prompt topics, retrieved documents, even the model's own output tone, tracked reference-window against current-window. Next up: catching a different kind of drift — when the model itself starts making things up.
