# Script — Completing and Printing Transactions

## Segment 1 (title)

Let's close chapter four by tying off two loose ends that apply to every transaction type we've covered, however it was created: what complete actually requires, and how a completed transaction reaches the customer as a printed or emailed document.

## Segment 2 (steps)

Before a transaction moves from incomplete to complete, Receivables checks a valid customer with a bill-to site, at least one line with a valid amount, required fields resolving successfully, including a derivable revenue account, and tax and freight calculating without error. How strict this check is depends on the transaction type and source combination, tighter for manual entry, looser for an already-validated AutoInvoice import.

## Segment 3 (steps)

Once complete, a transaction can be printed or emailed. On-demand, for a single reprint when a customer calls. Batch, a scheduled process that handles every transaction completed since the last run, which is how most invoices actually go out day to day. And delivery defaults, often email to the billing contact on file, falling back to print and mail otherwise. Printing itself doesn't touch accounting or balance.

## Segment 4 (outro)

Picture Northwind Fixtures Co completing forty manually entered invoices that afternoon, plus accepting three hundred ninety-seven AutoInvoice imports that completed automatically overnight because their source and type allow it. At five PM, a scheduled batch process picks up all four hundred thirty-seven newly completed transactions, emails the ones with a billing contact on file, and queues the rest for mail the next morning. That closes chapter four, transactions. Chapter five would move to receipts, covering how customer payments come in and get applied.
