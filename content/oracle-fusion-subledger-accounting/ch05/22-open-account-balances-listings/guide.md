# Open Account Balances Listings

The Account Analysis Report, from lesson 21, shows you every line that posted to an account over a period — a history of activity. This lesson covers a different question: not what posted, but what's still open right now. That's the job of the Open Account Balances Listing.

## What you'll learn

- What "open" means for a balance in this context
- How an Open Account Balances Listing differs from a simple account balance
- Why supporting references (from Chapter 2) are what make this report possible
- A worked example using Accounts Payable Trade

## What "open" means here

For certain accounts — most commonly third-party control accounts like Accounts Payable Trade or Accounts Receivable — the single GL balance represents a net result of many individual items, some of which have already been fully settled (an invoice that was both booked and paid) and some of which are still outstanding (an invoice that was booked but not yet paid). The **Open Account Balances Listing** report identifies and lists specifically the items that remain open — not yet fully offset by a corresponding transaction — rather than the entire history of everything that ever posted.

## How this differs from a plain account balance

A plain GL account balance tells you one number: the net total right now. It cannot, on its own, tell you which specific items make up that number, or which of them are still outstanding versus already settled. The Open Account Balances Listing breaks that single number down into its open, unsettled components — for AP Trade, this effectively means: which specific invoices are still unpaid, and for how much, adding up to the account's current balance.

## Why supporting references make this possible

This is a direct payoff of the supporting references lesson (lesson 9). Recall that a supporting reference, like a supplier number, gets attached to every journal line that hits a shared control account like AP Trade. The Open Account Balances Listing relies on exactly that kind of reference data to identify which underlying items are still open and attribute the open balance back to a specific supplier, invoice, or transaction. Without that supporting reference data being captured in the first place, this report would have nothing to group by.

## A worked example

Suppose the AP Trade account currently shows a $45,000 balance. An Open Account Balances Listing for that account might show: Invoice INV-2201 from Meridian Supply Co., $12,000, still open; Invoice INV-2340 from Acme Office Supply, $8,500, still open; and several more smaller open items, all adding up to $45,000. This is immediately more useful than the single $45,000 figure alone, because it tells a controller exactly what the company still owes, and to whom.

## Recap

The Open Account Balances Listing breaks a control account's net balance down into its specific open, unsettled items, relying directly on the supporting reference data captured back in Chapter 2. It answers "what's still outstanding" rather than "what happened historically." Next up, lesson 23: reconciling subledgers to the General Ledger, where this report becomes one of the key tools in a formal month-end reconciliation process.
