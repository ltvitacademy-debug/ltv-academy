# Subledger Accounting Troubleshooting Practice

This lesson closes Chapter 5 by walking through a realistic troubleshooting scenario end to end, using the diagnostic habits and reports from the last four lessons together, the way you'd actually use them on the job.

## What you'll learn

- A structured approach to "why didn't this transaction account correctly"
- How to apply the diagnostic checks from across this course in order
- Why checking the simplest explanations first saves time
- How this scenario pulls together concepts from every chapter

## The scenario

A controller reports: "Invoice INV-5540 from a new supplier, International Freight Partners, was validated three days ago, but I don't see it anywhere in the General Ledger." Your job is to find out why.

## Step 1: Is there even a subledger journal entry yet?

Start with the Review Journal Entries page from lesson 17, searching for the specific transaction. If no subledger journal entry exists at all for this invoice, the problem is upstream of GL entirely — either Create Accounting hasn't run yet for this event, or it ran and errored out. Check the Create Accounting process results (lesson 15) for an error specific to this transaction.

## Step 2: If there's an error, what kind?

Suppose Create Accounting did run, but errored on this specific invoice. Given this supplier is new, and the invoice description mentions "International" freight, this smells like the lesson 18 category of an incomplete rule — recall the lesson 18 example where a Freight account rule had a condition for "Domestic" freight with no fallback. If International Freight Partners' invoice carries a freight category the account rule doesn't have a condition for, that's exactly the kind of gap that produces an error instead of a journal entry.

## Step 3: If the entry exists, but only in Draft

If a subledger journal entry does exist but shows status "Draft," the explanation is immediately obvious given lesson 15: Draft entries cannot be transferred to GL. The fix here isn't a rule problem at all — it's simply that Final mode hasn't run yet for this event, whether because of scheduling timing or because someone is still reviewing it.

## Step 4: If the entry is Final, but still missing from GL

If the subledger entry shows status "Final," the next check (lesson 19 and lesson 20) is whether Transfer Journal Entries to GL has actually run since this entry went Final, and whether journal import successfully created the GL batch. Checking the GL journal batch list filtered by source "Payables" for the relevant date is the fastest way to confirm.

## Resolving this specific case

Suppose the investigation confirms: Create Accounting errored on this invoice because the Freight account rule's priority-ordered conditions only covered "Domestic" and this invoice's freight category is "International." Following lesson 18's guidance, this is a rule problem, not a one-off data problem, so the fix is to copy and update the account rule (following lesson 11's copy-first discipline) to add a condition — or a fallback — for International freight, then re-run Create Accounting in Draft to confirm the fix, then Final.

## Recap

Troubleshooting a missing or incorrect subledger-to-GL journey is a matter of checking, in order: does a subledger entry exist, did it error (and why), is it Draft or Final, and if Final, did transfer and import actually run. This closes Chapter 5. Next up, Chapter 6 begins with lesson 26: multiple accounting representations, where a single business event gets accounted differently across more than one ledger.
