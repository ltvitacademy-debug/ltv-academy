# Script — Handling Unreconciled Items

## Segment 1 (title)

Even with well tuned matching rules and a diligent manual process, some items stay stubbornly unreconciled past the point where they should have cleared. This lesson is about diagnosing why, and the standard resolutions.

## Segment 2 (steps)

Some unreconciled items aren't really a problem — they're just timing. Outstanding checks, issued but not yet cashed, and deposits in transit, recorded but not yet processed by the bank, are both normal and just need to wait. Missing transactions are different — a bank line with no system counterpart because the transaction simply hasn't been entered yet — the fix is to record it, not force a match against something that doesn't exist.

## Segment 3 (steps)

Occasionally the bank itself made an error — wrong amount, wrong account, a double charge. That requires contacting the bank directly; Cash Management can document it but can't fix a bank side error from inside Oracle. Less commonly, the system side is wrong — a duplicate or incorrect entry — which needs correction at the source in Payables or Receivables, not a workaround in reconciliation.

## Segment 4 (steps)

This is why aging matters. Treating every unreconciled item the same regardless of age hides real problems behind normal timing noise. Most implementations age items by days outstanding and expect Treasury to specifically review anything crossing a threshold, commonly thirty days, since an item that old is unlikely to be ordinary timing.

## Segment 5 (outro)

A fictional month-end example: Harborview Metals Inc finds a normal eight-day-old outstanding check, an eleven-day-old duplicate receipt entry that gets corrected at the source, and a forty-two-day-old bank error that gets escalated directly to the bank. Up next, lesson fourteen: the reports that make all of this visible.
