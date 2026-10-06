# Script — Importing Receivables Transactions with AutoInvoice

## Segment 1 (title)

Receivables has its own name for its FBDI-driven import: AutoInvoice. It's used constantly, because Receivables transactions overwhelmingly originate somewhere other than a person typing into Oracle Fusion — a billing system, a point-of-sale system, a subscription platform.

## Segment 2 (steps)

AutoInvoice is a long-standing Oracle name for the process that turns externally sourced lines into invoices, credit memos, and debit memos automatically. Functionally, it fills exactly the same role as Import Journals or Import Payables Invoices — the product-specific import process for this module.

## Segment 3 (steps)

AutoInvoice reads from RA_INTERFACE_LINES_ALL, the Receivables line staging table. Each row is one line of revenue, tax, or freight, tagged with a customer reference, a transaction type, an amount, and attributes that tell AutoInvoice which lines belong together.

## Segment 4 (steps)

Here's the concept unique to this module: grouping rules. Receivables lines arrive more loosely than a payables header-and-lines structure, and get grouped into complete transactions using configured logic based on shared attributes like customer, date, and currency. AutoInvoice isn't just validating lines — it's assembling them into invoices first.

## Segment 5 (outro)

Picture two lines meant to combine onto one invoice, but one is missing a grouping attribute formatted consistently with its sibling. AutoInvoice can't match them confidently, and the mismatch gets rejected rather than failing silently — which is exactly why reviewing its rejection detail is part of a Receivables consultant's normal routine. Up next, lesson eighteen: importing Fixed Assets additions through Mass Additions.
