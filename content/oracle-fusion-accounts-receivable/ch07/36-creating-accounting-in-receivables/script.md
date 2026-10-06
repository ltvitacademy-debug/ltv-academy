# Script — Creating Accounting in Receivables

## Segment 1 (title)

Nothing posts to the GL, and nothing even becomes a finished journal entry, until one process runs: Create Accounting. This lesson covers what it actually does.

## Segment 2 (steps)

Create Accounting applies the AutoAccounting rules to every eligible event - invoices, receipts, adjustments, credit memos - generating the actual journal entries. It can run for one transaction, a batch, or an entire period.

## Segment 3 (steps)

It runs in two modes. Draft accounting previews what the entries would look like without making them final. Final accounting locks them in as an authoritative, auditable entry.

## Segment 4 (steps)

The Transfer to General Ledger parameter decides whether final entries move on to the GL in the same run, or stay in the subledger for a separate transfer process later - useful for coordinating timing across several subledgers.

## Segment 5 (outro)

A transaction can fail to account over an incomplete setup rule, an invalid GL combination, or a closed period, and those failures need resolving before close. Up next, lesson 37: the Receivables to General Ledger transfer itself.
