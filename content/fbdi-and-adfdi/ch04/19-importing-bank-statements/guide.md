# Importing Bank Statements

Chapter 4 closes with the one Financials data load in this course where the file usually doesn't start life as an Oracle Fusion template at all — it starts as a file your bank sends you. Bank statement import exists to get that external file into Cash Management so it can be reconciled against your own recorded transactions.

## What you'll learn

- Why bank statement files often look different from the templates in Chapters 1 and 2
- What BAI2 is, and why it matters for this specific load
- The interface table bank statement data stages into
- How this import connects to the reconciliation work that follows it

## A file format that comes from outside Oracle, not inside it

Every other FBDI load in this course starts with an Oracle-published Excel template that you fill in yourself. Bank statements are different: banks produce their own statement files, in their own systems, in standardized banking file formats — not an Oracle template at all. The most common of these is **BAI2**, a widely used standardized format (from the Bank Administration Institute) that banks already produce for their account holders, independent of Oracle Fusion entirely. Oracle Fusion's Cash Management module is built to accept files in this format (and others), which is why this lesson's "template" conversation looks different from every prior lesson in this chapter — there often isn't a spreadsheet you personally populate at all. The file is already structured; your job is to get it into Oracle Fusion correctly, not to build it from scratch.

## The interface table

Once a bank statement file is loaded, its data stages into the Cash Management statement interface, commonly referenced as **CE_STATEMENT_HEADERS_INT** (with corresponding line-level staging for the individual statement transactions). As with every other module in this course, this staging step doesn't yet mean anything has changed inside Oracle Fusion's reconciliation records — a separate bank statement loading/import process reads the staged data and creates real, usable statement records.

## Why this import matters for reconciliation

A loaded bank statement becomes the external source of truth that Cash Management reconciliation compares against your own recorded transactions — deposits, payments, bank fees, interest. Without a correctly loaded statement, there's nothing to reconcile against, no matter how clean your own internal transaction records are. This is also why statement imports are typically run on a predictable cadence (daily or per statement cycle) rather than as a one-time conversion event like the supplier or journal examples earlier in this course — ongoing cash reconciliation depends on it happening regularly.

## Recap

Bank statement import is the one load in this chapter where the file usually originates outside Oracle Fusion entirely, commonly in the BAI2 format banks already produce, and stages into Cash Management's statement interface before a separate process creates usable statement records for reconciliation. Next up, Chapter 5: what happens when any of these imports — journals, invoices, receivables, assets, or bank statements — doesn't go as planned.
