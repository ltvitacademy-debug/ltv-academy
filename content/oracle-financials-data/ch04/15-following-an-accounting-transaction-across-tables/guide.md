# Following an Accounting Transaction Across Tables

Every table you've studied so far has been introduced on its own. This lesson is the payoff: a single worked trace of one supplier invoice, moving step by step from the moment it's entered in Payables to the moment its balance shows up in a General Ledger report. If you can hold this chain in your head, you understand the backbone of the entire Oracle Fusion financial data model.

## What you'll learn

- The full, named sequence of tables one invoice passes through on its way to a reported balance
- What an "accounting event" is, and why one transaction can generate more than one
- The specific table that links a subledger distribution to its subledger journal line
- The bridge table that physically carries a subledger journal into the General Ledger

## Step 1: the source transaction

It starts with a row in `AP_INVOICES_ALL`, with its lines in `AP_INVOICE_LINES_ALL` and its accounting detail in `AP_INVOICE_DISTRIBUTIONS_ALL` — everything from lesson 8. Nothing has reached the ledger yet; this is still purely a Payables transaction.

## Step 2: recognizing the transaction, generically

Subledger Accounting doesn't think in terms of "invoices" — it thinks in terms of transaction entities and events. `XLA_TRANSACTION_ENTITIES` identifies the business transaction (this invoice) in a generic, cross-product way Subledger Accounting can work with regardless of which subledger it came from. `XLA_EVENTS` then records the specific **accounting event** — a business occurrence that requires accounting, such as "invoice validated." A single transaction can generate more than one event over its life (validation is one event; a later cancellation could be another), which is part of why this layer exists as its own step rather than being skipped.

## Step 3: the subledger journal entry itself

For each accounting event, Subledger Accounting applies the configured accounting rules and produces a subledger journal entry: `XLA_AE_HEADERS` (the header of that subledger-level journal) and `XLA_AE_LINES` (its debit/credit lines). This is conceptually a journal entry already, just not yet inside `GL_JE_HEADERS` — it's the Subledger Accounting engine's own record of what the accounting should be.

## Step 4: linking back to the source

`XLA_DISTRIBUTION_LINKS` is the table that ties each `XLA_AE_LINES` row back to the specific source distribution — in this case, the exact row in `AP_INVOICE_DISTRIBUTIONS_ALL` that caused it. This is the link that lets you answer, precisely, "which invoice distribution produced this subledger journal line," rather than just knowing that some invoice, somewhere, was involved.

## Step 5: the bridge into GL, and the final landing

The subledger journal is transferred into the General Ledger through `GL_IMPORT_REFERENCES`, a bridge table that carries the connection from the subledger accounting lines into the actual `GL_JE_HEADERS` and `GL_JE_LINES` rows from lesson 13. Once posted, those lines roll up into `GL_BALANCES` from lesson 14, which is what a financial report ultimately reads.

## The full chain, named end to end

```
AP_INVOICES_ALL / AP_INVOICE_LINES_ALL / AP_INVOICE_DISTRIBUTIONS_ALL
        |
        v
XLA_TRANSACTION_ENTITIES  -->  XLA_EVENTS
        |
        v
XLA_AE_HEADERS / XLA_AE_LINES   (linked back via XLA_DISTRIBUTION_LINKS)
        |
        v
GL_IMPORT_REFERENCES
        |
        v
GL_JE_HEADERS / GL_JE_LINES  -->  GL_BALANCES
```

The same chain applies to Receivables, Fixed Assets, or any other subledger — only the starting tables change; everything from `XLA_TRANSACTION_ENTITIES` onward is shared.

## Recap

A transaction's full journey runs from its subledger source tables, through Subledger Accounting's generic transaction/event layer (`XLA_TRANSACTION_ENTITIES`, `XLA_EVENTS`), into the subledger journal itself (`XLA_AE_HEADERS`/`XLA_AE_LINES`, linked back via `XLA_DISTRIBUTION_LINKS`), across the `GL_IMPORT_REFERENCES` bridge, and finally into `GL_JE_HEADERS`/`GL_JE_LINES` and `GL_BALANCES`. Next up, lesson 16: a closer look at the Subledger Accounting tables themselves, since they're the shared engine every subledger routes through on this exact journey.
