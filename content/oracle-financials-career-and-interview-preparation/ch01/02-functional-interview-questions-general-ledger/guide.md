# Functional Interview Questions: General Ledger

**Chapter 1 · Interview Preparation · Lesson 2 of 15**

This lesson is a set of real functional interview questions on Oracle Fusion General Ledger, each with a model answer and the reasoning an interviewer is actually listening for. These are not trick questions — they are the questions a hiring manager asks to confirm you've actually configured a ledger, not just read about one.

## What you'll learn

- How to answer GL-focused functional questions with the structure interviewers expect
- Where to pull real detail from your own capstone work instead of a generic textbook answer
- The difference between describing a feature and describing why you'd configure it that way

## Q&A: General Ledger

**"Walk me through how you'd design a chart of accounts for a company with two legal entities."**
Start with the requirement, not the segments: you need a structure that lets each entity's results stand alone and still consolidate cleanly. Name the segments you'd use — Company as the balancing segment, Cost Center, Account, and whatever else the client's reporting demands — and explain *why* Company is the balancing segment: it's the one that must net to zero per legal entity so intercompany eliminates correctly. If you've done this (the capstone's two-entity design), say so and name the actual cost centers you used (Assembly, Fabrication, Corporate Overhead) rather than speaking only in the abstract.

**"What's the difference between a primary ledger and a secondary ledger, and when would you actually need a secondary one?"**
Primary is the official book; secondary restates the same transactions under a different accounting method or currency, without touching the primary. You'd need one when a single entity has to report two ways at once — statutory basis in the local currency and a corporate basis in USD, for example — and you don't want to run two entirely separate implementations to get it.

**"How does journal approval and posting actually work, end to end?"**
A journal is entered or imported, routed through approval if the journal source requires it, and only then becomes eligible to post. Posting moves the balances into the ledger; before posting, a journal can still be corrected without a reversing entry. Mention journal categories and sources here if asked how the system distinguishes a manual entry from a Payables-generated one.

**"Tell me about intercompany journals — what makes them different from a normal journal entry?"**
An intercompany journal moves balances between two legal entities (or two balancing segment values) and has to book a matching receivable/payable pair so each entity's own books stay in balance. It only truly works, from a design standpoint, if the balancing segment is set up correctly in the first place — tie this back to the chart-of-accounts question above if it comes up.

**"How do you handle period close when something isn't ready to close?"**
You don't force it closed. You identify exactly which subledger or reconciling item is outstanding, get a realistic resolution timeline, and either hold the period open with a plan, or close it and plan a correcting entry in the next period if the business genuinely can't wait — but you say that out loud to the client rather than letting it happen silently. This is the instinct the capstone's Chapter 3 is built to train.

**"What reporting tools would you reach for to build a GL report for executives versus an ad hoc reconciliation check?"**
For executives, a formatted, scheduled, pixel-perfect report — BI Publisher, or a Financial Reporting Studio-built statement. For an ad hoc reconciliation check, OTBI, because you need to slice live transactional data quickly without building a formal report definition first.

## Key terms

| Term | Meaning |
|---|---|
| Balancing segment | The COA segment that must net to zero per legal entity |
| Intercompany journal | A journal between two legal entities that books a matching receivable/payable pair |
| Journal source/category | What system created a journal, and the business reason behind it |

## Lab

Pick two of the six questions above and record yourself answering out loud, without reading the model answer first. Compare your answer against the model afterward — the gap is exactly what to study before your next mock interview.

## Check yourself

- Why is Company the balancing segment in the capstone's chart of accounts, specifically?
- What is the real difference between a primary and a secondary ledger?
- Why does an intercompany journal need a matching receivable/payable pair?
