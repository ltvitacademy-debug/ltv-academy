# Investigating Cash Management, Subledger Accounting and General Ledger

**Chapter 3 · The January 31 Challenge · Lesson 20 of 25**

The remaining three symptoms get traced here: the bank variance, the Receivables transactions missing from the GL, and the intercompany mismatch. Like lesson 19, this lesson confirms root causes — lesson 21 does the fixing.

## What you'll learn

- How to confirm whether an unreconciled bank item is a company error or a bank error
- How to trace missing GL postings back to a specific Subledger Accounting failure
- How to find an unposted journal that's quietly sitting in Draft status
- Why three very different kinds of root cause can produce the same vague CFO complaint

## Investigating Cash Management: the $9,200.00 bank item

Elena's complaint: a bank reconciliation item still isn't cleared. Pulling up the open item from lesson 16's reconciliation worksheet shows the specifics: the bank statement carries two $9,200.00 EFT debits, both referencing PMT-21087's payment file identifier, dated January 10 and January 11. Grace Olsen's notes already confirm Oracle Fusion generated and transmitted that file exactly once. A call placed to Regions Bank's commercial services desk confirms it: a network timeout on the bank's processor caused a retransmission, and the bank agrees to reverse the duplicate debit and issue written confirmation.

**Root cause confirmed:** a bank-side duplicate transmission, not an LTV posting error. This is the one problem whose fix doesn't involve correcting anything inside Oracle Fusion at all — it requires the bank's written confirmation and reversal.

## Investigating Subledger Accounting: the missing postings

Elena's complaint: some Receivables transactions never made it to the General Ledger. The Subledger Accounting **accounting events report**, filtered to January and status "Incomplete," lists exactly 14 transactions, all transaction type "Freight Charge," all crediting account 7850 — and all carrying the identical error: **no applicable Account Rule found**. Checking the Account Rule configuration for the Freight Charge transaction type confirms it: the rule's account-mapping logic was never updated when account 7850 was added to the chart of accounts back in December.

**Root cause confirmed:** a configuration gap. The Account Rule needs a new mapping line for account 7850 before these 14 transactions, totaling $4,250.00, can generate accounting and post.

## Investigating the General Ledger: the intercompany mismatch

Elena's complaint: intercompany between the US and Canada doesn't tie. Checking the **journal batch status** report for January in both ledgers finds it: INTERCO-JAN-0131, $27,750.00, status **Draft**, never submitted for approval or posting. Because it never posted, the US entity's Corporate Overhead cost center carries the full $27,750.00 of allocated overhead that should have been split with Canada, and the Canadian entity's books show no corresponding intercompany payable or expense at all — which is exactly what "intercompany doesn't tie" looks like from the outside.

**Root cause confirmed:** a complete, balanced journal that was simply never submitted.

## Three different kinds of root cause

This lesson's three findings are deliberately different in kind: a bank-side processing error outside Oracle Fusion entirely, a configuration gap inside Subledger Accounting, and a simple human step (submit for posting) that never happened. A consultant who assumes every month-end problem has the same shape will miss at least one of these. Recognizing which kind of problem you're looking at is what determines which kind of fix lesson 21 applies.

## Key terms

| Term | Meaning |
|---|---|
| Accounting events report | A Subledger Accounting report listing transactions and their accounting/processing status |
| Journal batch status | Whether a journal batch is Draft, Submitted, Posted, or in Error |

## Recap

Three more root causes are confirmed: the bank's duplicate transmission (Cash Management), the missing Account Rule mapping for account 7850 (Subledger Accounting), and the unposted intercompany journal (General Ledger). All six of Elena's symptoms now have confirmed causes. Next up, lesson 21: correcting, reconciling, and completing the month-end close.
