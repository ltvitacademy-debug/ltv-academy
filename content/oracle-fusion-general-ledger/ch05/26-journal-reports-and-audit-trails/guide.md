# Journal Reports and Audit Trails

**Chapter 5 · Balances, Inquiries and Monitoring · Lesson 26 of 37**

## What you'll learn

- The reports used to review journal activity behind a trial balance
- What an audit trail captures that a balance alone cannot show
- Why "who posted this, and when" matters as much as "what was posted"
- How these reports support both period-end review and external audit requests

## The trial balance tells you what; these reports tell you how

Lesson 25's trial balance answers "what is the ending balance." It does not show *which journals* built that balance, in what order, from which sources, or who was responsible for them. That's the gap journal reports and audit trails fill — they are the detail layer a reviewer turns to when a trial balance number needs explaining, or when someone outside the company (an external auditor) needs proof, not just a number.

## The core journal reports

- **Journal Entries Report / General Journal** — lists journal entries for a ledger and period in entry order, showing header information (source, category, batch) alongside each line's account, debit, and credit.
- **Account Analysis Report** — shows all the activity for a specific account, letting a reviewer see every journal line that touched it during a period, which is exactly what's needed to explain an unexpected swing.
- **Journal Entries by Document Number** or similar sequence-based reports — useful where completeness matters: confirming no document number in a sequence is missing, which auditors frequently check for manual journals.

For **LTV Manufacturing Corporation**, if the Utilities Expense balance from lesson 22 looked high for March, the Account Analysis Report for that account is where a reviewer would go to see every journal line posted to it that period, and judge whether each one is legitimate.

## What an audit trail adds

A report shows *what* posted. An **audit trail** shows *who* did what, and *when* — who created a journal, who approved it, whether it was edited before posting, and who ultimately posted it. Oracle Fusion maintains this history as part of the journal's record, separate from its financial content, and it is retained specifically because financial control depends on traceability: a correct-looking number that nobody can explain or attribute is still a control failure.

This is also where General Ledger connects back to the approval workflows covered in Chapter 3 — the audit trail is the permanent record of that approval history, not just a point-in-time status.

## Why both matter together

Journal reports and audit trails answer different halves of the same question. A journal report proves the accounting is complete and correctly summarized. An audit trail proves the *process* that produced it was followed — the right person entered it, the right person approved it, nothing was altered outside the normal workflow. External auditors, and most internal control frameworks, require both: numbers that tie out, and a documented trail showing how they got there.

## Key terms

| Term | Meaning |
|---|---|
| Account Analysis Report | Shows all journal line activity for one specific account over a period |
| Journal Entries Report | Lists journal entries for a ledger/period with header and line detail |
| Audit trail | The record of who created, edited, approved, and posted a journal, and when |

## Recap

Journal reports show the detail behind a trial balance number — which journals, from which sources, built that balance — while the audit trail proves who was responsible for each step along the way. Together they turn "the number is right" into "the number is right, and we can prove how it got there." Next up, lesson 27: Drilling Down to Subledger Detail, which connects these same journal lines all the way back to their originating business transaction.
