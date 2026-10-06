# Script — Ticket: AP Invoice Will Not Validate

## Segment 1 (title)

Your first full ticket. Meridian Steel Fabricators, ticket forty-one-twelve: an AP clerk says invoice INV-88341 for Summit Freight Carriers won't validate — they click Validate and, in their words, nothing happens.

## Segment 2 (steps)

Validate isn't a formality — it actually checks several things. Required fields are complete. Distributions sum to the header amount. Tax calculates correctly. And on a PO-matched invoice, it checks matching tolerance. If any check fails, the invoice doesn't move forward — either with a specific error message, or by landing on a hold instead. "Nothing happens" almost always means one of those two, and your first move is always to open the invoice and click Validate yourself.

## Segment 3 (steps)

Here's what that turns up. The invoice is sitting at Incomplete. Clicking Validate returns an actual message: the distribution total doesn't equal the invoice header amount. The header says eighteen thousand four hundred fifty dollars. The distributions only add up to eighteen thousand four hundred twenty. Thirty dollars short. Digging into the lines: a thirty dollar freight charge got added to the invoice after the original distributions were already generated, so nothing was ever created to cover it.

## Segment 4 (code)

That's the single most common reason a non-PO invoice won't validate — the distributions don't foot to the header total, and Oracle correctly refuses to move an unbalanced invoice forward. The fix is narrow: add a thirty dollar distribution to the freight expense account, confirm the total now matches eighteen thousand four fifty, and re-run Validate. No setup changes anywhere — this was specific to one invoice.

## Segment 5 (outro)

Resolution note: name the invoice, the exact dollar mismatch, the fix, and the verification — re-ran Validate, moved to Validated, no holds. Up next, lesson five: what happens when an invoice validates clean but still won't move forward, because it landed on a hold.
