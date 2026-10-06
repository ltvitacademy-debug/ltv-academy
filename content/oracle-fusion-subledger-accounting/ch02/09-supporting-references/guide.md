# Supporting References

You've now covered journal line rules, account rules, mapping sets, and description rules — four of the four rule types that make up a journal entry rule set. This lesson covers the last one: supporting references, and explains why Oracle gives journal lines a way to carry information that isn't an account segment at all.

## What you'll learn

- What a supporting reference is, and how it differs from an account segment
- Why supporting references exist even when the Chart of Accounts already has plenty of segments
- The connection between supporting references and third-party control account reconciliation
- A worked example using a supplier reference on a Payables accrual line

## Account segments versus supporting references

Your Chart of Accounts has a fixed, limited set of segments — maybe Company, Cost Center, Natural Account, and a few others. Every one of those segments, once defined, applies to every single transaction across the whole ledger, and changing the segment structure is a significant undertaking you studied back when you built enterprise structures and the Chart of Accounts.

A **supporting reference** is different: it is additional descriptive or analytical information attached to a specific journal line, without that information needing to be baked into the Chart of Accounts as a full segment. A supporting reference might carry the supplier number on an AP accrual line, the customer number on an AR receivable line, or a project number on a cost line — detail that is useful to track, but that would bloat the Chart of Accounts if every one of those values had to become its own account segment.

## Why this distinction matters

Imagine if "Supplier" had to be a full segment on your Chart of Accounts just so SLA could track which supplier an accrual line relates to. Every account combination in the entire ledger would carry that segment, whether or not the line had anything to do with a supplier, and the segment would balloon in size as the supplier list grows. Supporting references let SLA attach that kind of transaction-specific detail at the subledger journal level, where it belongs, without forcing it into the permanent structure everyone in GL has to live with.

## Supporting references and third-party reconciliation

Supporting references become especially important for **third-party control accounts** — a single GL account, like Accounts Payable Trade, that represents the combined balance owed to every supplier at once. On their own, a GL balance for that account tells you the total; it does not tell you how much is owed to any individual supplier. By attaching a supplier-number supporting reference to every line that hits that control account, Oracle lets you later run reports — covered in Chapter 5, when you study reconciling subledgers to the General Ledger — that break that one control account balance down by individual supplier, tying the subledger's own detail back to the GL total.

## A worked example

Picture an AP accrual journal line for a $3,000 invoice from supplier "Meridian Supply Co." The journal line itself posts to the Accounts Payable Trade account, a single account shared by every supplier. A supporting reference on that line carries "Supplier Number: 10452" (Meridian's supplier number). Later, when someone runs a report to reconcile the AP Trade account, the report can group every line by that supporting reference, showing exactly how much of the AP Trade balance belongs to Meridian versus every other supplier — information the account segment alone could never provide.

## Recap

A supporting reference carries additional, transaction-specific detail — like a supplier or customer number — on a journal line without requiring that detail to become a permanent Chart of Accounts segment, and it is what makes reconciling shared control accounts back to individual subledger detail possible. That completes the four rule types in Chapter 2. Next up, Chapter 3 begins with lesson 10: application accounting definitions, the container that bundles everything you've built so far into one coherent, assignable package.
