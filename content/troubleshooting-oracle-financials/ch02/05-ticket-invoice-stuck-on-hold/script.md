# Script — Ticket: Invoice Stuck on Hold

## Segment 1 (title)

Cascade Outdoor Supply, ticket forty-one-eighty-nine. An AP supervisor says invoice INV-55032 from Trailhead Gear Co. validated just fine, but it's sitting there and won't pay — something about a hold.

## Segment 2 (steps)

This is a different symptom than last lesson. The invoice isn't Incomplete — it successfully validated. But Payables won't pay a held invoice until every hold on it clears. A few you'll see constantly on PO-matched invoices: Price, when the invoiced price exceeds the PO price beyond tolerance. Qty Ord and Qty Rec, for quantity variances against the order or the receipt. Tax Variance, when the tax doesn't match what Oracle calculates. And Account hold, for an invalid or disabled account on a distribution.

## Segment 3 (steps)

Opening the Holds tab on this invoice shows exactly one: Price. The PO says forty-two dollars a unit. The invoice was entered at forty-six fifty — about a ten point seven percent increase, well past the business unit's five percent tolerance. Checking with the buyer explains it: Trailhead Gear Co. raised prices mid-quarter, and nobody ever updated the purchase order before this shipment got invoiced.

## Segment 4 (steps)

Here's the part that matters: there are three ways to clear a price hold, and they are not interchangeable. Correct the PO if the new price is legitimate. Correct the invoice if the invoice itself was entered wrong. Or manually release the hold — which is available, but doesn't fix the variance, posts the difference to a variance account, and leaves the PO wrong for next time. Here, the price increase is real, so the right fix is updating the PO to forty-six fifty, confirmed by the buyer — not overriding the hold.

## Segment 5 (outro)

Resolution note: name the hold type, the specific variance and tolerance exceeded, the fix — the PO price was corrected, not overridden — and a recommendation to check this supplier's other open POs for the same stale pricing. Up next, lesson six: invoice matching variance in more depth, including quantity holds tied to receiving.
