# Script — Description Rules

## Segment 1 (title)

Journal line rules decide which lines exist. Account rules decide which account each line posts to. Today's rule type handles something easy to overlook but critical for anyone reading a journal entry later: the description on each line.

## Segment 2 (steps)

Without a good description rule, a line might just say "Payables Invoice," over and over, for every invoice from every supplier. Multiply that across thousands of transactions, and a controller or auditor has to click into every single line to find out what it actually relates to.

## Segment 3 (steps)

A description rule assembles its text from constant text you always want to appear, like the word "Invoice," plus sources - the same transaction data sources from lesson four, like supplier name or invoice number. You lay these pieces out in order, and SLA concatenates them when it builds the line.

## Segment 4 (code)

Picture improving a generic "Invoice" description. Combine constant text "Invoice", a source for supplier name, a constant colon, and a source for invoice number. The result: "Invoice: Acme Office Supply : INV-48213" - immediately useful on an Account Analysis Report, no need to open the transaction.

## Segment 5 (steps)

The same technique works everywhere. Receivables might combine customer name and transaction number. Fixed Assets might combine asset number and a depreciation description. The available sources differ by module, but building the description the same way, every time.

## Segment 6 (outro)

So remember: description rules turn generic repeated labels into specific, transaction-aware text, and that pays off directly when you reconcile and audit later in this course. Up next, lesson nine: supporting references, which carry additional reference data on a line beyond the account and description.
