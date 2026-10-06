# Script — Supplier Bank Accounts

## Segment 1 (title)

Lesson seven flagged the Payments tab as where a supplier's bank account eventually attaches. This is that lesson. A bank account is what makes electronic payment possible at all, and it's one of the most common reasons a perfectly valid, approved invoice still can't be paid.

## Segment 2 (steps)

Electronic payment needs a bank account on file; a domestic check doesn't. That's why a brand-new supplier can sometimes be paid by check while their electronic setup is still catching up, and why forcing someone onto EFT before their bank details are complete is a reliable way to generate a payment failure.

## Segment 3 (steps)

Domestic electronic payments can often work with just an account number and basic routing. International payments need more: a specific bank and branch identified on the account, because cross-border rails need to know exactly which institution and location receive the funds. Skip that on an international supplier, and the payment can validate everywhere else and still fail at the point of actually transferring money.

## Segment 4 (code)

Because the account number is sensitive, Fusion masks it once stored - commonly showing only the last four digits, the same idea as a credit card statement. The full number stays stored for processing, but casual viewing only shows the masked version. If a missing or incomplete bank account exists, the invoice itself can still validate and get approved cleanly - the failure shows up later, at the payment step, not at validation.

## Segment 5 (outro)

Brightfield's fictional domestic supplier, Vantree Industrial Parts, just needs an account number and routing details. A fictional overseas supplier, Nordwell Freight Partners, needs a bank and branch specified before EFT will work for them at all. Up next, lesson ten: supplier registration and qualification, how a prospective supplier becomes a trusted one.
