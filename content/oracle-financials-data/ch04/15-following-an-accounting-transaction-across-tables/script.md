# Script — Following an Accounting Transaction Across Tables

## Segment 1 (title)

Every table so far has been introduced on its own. This lesson is the payoff: a single worked trace of one supplier invoice, from the moment it's entered to the moment its balance shows up in a report. Hold this chain in your head, and you understand the backbone of the whole model.

## Segment 2 (steps)

It starts with a row in AP_INVOICES_ALL, lines in AP_INVOICE_LINES_ALL, distributions in AP_INVOICE_DISTRIBUTIONS_ALL. Nothing has reached the ledger yet. Subledger Accounting doesn't think in terms of invoices — it thinks in transaction entities and events. XLA_TRANSACTION_ENTITIES identifies the transaction generically; XLA_EVENTS records the specific accounting event, like "invoice validated."

## Segment 3 (code)

For each event, Subledger Accounting produces a subledger journal entry: XLA_AE_HEADERS and XLA_AE_LINES. This is already a journal entry, just not yet inside GL. XLA_DISTRIBUTION_LINKS ties each subledger line back to the exact source distribution that caused it — the link that answers "which invoice distribution produced this line."

## Segment 4 (code)

The subledger journal transfers into the General Ledger through GL_IMPORT_REFERENCES, a bridge table carrying the connection into the actual GL_JE_HEADERS and GL_JE_LINES rows. Once posted, those roll up into GL_BALANCES, which is what a financial report ultimately reads.

## Segment 5 (outro)

Source transaction, then transaction entity and event, then subledger journal linked back to its source, then the GL bridge, then the ledger itself. The same chain applies to Receivables or Fixed Assets — only the starting tables change. Up next, lesson sixteen: a closer look at the subledger accounting tables themselves.
