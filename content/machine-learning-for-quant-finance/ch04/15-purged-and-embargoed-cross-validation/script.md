# Script — Purged & Embargoed Cross-Validation

## Segment 1 (title)

This is the single most important lesson in this course. Time-ordered splitting guarantees training comes before testing in calendar time, but that's not sufficient, because financial labels are almost never tied to a single instant — and that gap is exactly what purging and embargoing, formalized by Marcos Lopez de Prado, were built to close.

## Segment 2 (steps)

Here's the leak. A label like the return over the next five days has a label window, not a single timestamp — it spans from day t to day t plus five. Say a walk-forward split puts days ninety through one hundred in the test set. A training row sitting at day ninety-seven has a label window reaching to day one hundred two — two days into the test block. That row's own timestamp is safely before the test period, but its label was computed using information from inside the test window. Train on it, and you've trained on the test period, laundered through the label.

## Segment 3 (steps)

The fix is two separate pieces. Purging drops any training row, usually just before the test block, whose label window reaches into the test span at all. Embargoing is a different, additional fix: it drops a further buffer of training rows positioned right after the test block, even when their own labels don't reach backward into it, because serial correlation in returns and rolling-window features can still leak test-period information forward into those nearby rows. Purge handles overlap through the label; embargo handles leakage through correlation and features, on the other side of the test block.

## Segment 4 (code)

Scikit-learn has no built-in class for any of this — KFold and TimeSeriesSplit know nothing about label windows. In practice you write a small custom splitter extending KFold. The rows before the test block get filtered by where their label actually resolves, which is the purge. The rows after the test block get filtered by raw distance alone, with no reference to the label at all, which is the embargo. Two different filters, two different reasons.

## Segment 5 (outro)

Purging removes training rows whose labels overlap the test span; embargoing removes a buffer right after it for a completely different reason, and neither one ships with scikit-learn. Next, lesson sixteen: combinatorial cross-validation, which applies both of these to every possible combination of groups at once, instead of just one split.
