# Design Patterns for a Manufacturing Company

This final lesson pulls together everything from this course into one coherent design scenario: a mid-size manufacturing company implementing Subledger Accounting across its subledgers, the way you'd actually approach it as a consultant. You already know this company's world — your capstone later in this path will put you back in a manufacturing company's shoes to investigate a close that doesn't balance, and everything below is exactly the kind of design thinking that prevents that problem in the first place.

## What you'll learn

- How to think through an SLA design for a company with multiple subledgers
- Which design decisions from this course matter most for a manufacturing business specifically
- How AP, AR, Assets, and Cash Management design choices connect through SLA into one GL
- A checklist mindset for approaching a real SLA implementation

## The company: a manufacturing business

Picture a manufacturing company that purchases raw materials and components (Payables), sells finished goods to distributors and retailers (Receivables), owns a meaningful base of production equipment (Fixed Assets), and manages several bank accounts across its purchasing and sales cycles (Cash Management). Every one of those subledgers needs its own Application Accounting Definition, and all of them ultimately post into one General Ledger.

## Payables design decisions

For Payables, the supplier base includes both domestic and international freight and material suppliers (deliberately echoing lesson 25's troubleshooting scenario) — the account rule for Freight needs conditions covering every freight category actually in use, not just the common domestic case, learned the hard way in that lesson. Supporting references carrying supplier number on every AP Trade line (lesson 9) are essential here, because a manufacturer with hundreds of suppliers absolutely needs the Open Account Balances Listing (lesson 22) to know what's owed to whom.

## Receivables and Fixed Assets design decisions

For Receivables, description rules (lesson 8) combining customer name and invoice number make the Account Analysis Report usable when a distributor disputes a balance. For Fixed Assets, with a large base of production equipment, mapping sets (lesson 7) translating asset category into the correct Natural Account segment avoid building a separate account rule condition for every one of dozens of equipment categories.

## Cash Management and the GL tie-together

Cash Management transactions reconcile bank activity against AP payments and AR receipts already accounted through SLA — meaning the accuracy of everything upstream (correct account rules, correct supporting references) directly determines how clean that reconciliation is. This is the connective-tissue idea this entire course was built around: AP, AR, Assets, and Cash Management each generate their own subledger journal entries through one shared SLA engine, and all of them land in the same General Ledger, where they must reconcile (lesson 23) and tell one coherent financial story.

## A design checklist, pulling the course together

Before go-live, a consultant walks through: are all event classes for all four subledgers covered by journal entry rule sets (Chapter 2)? Are AADs built, validated, and activated (Chapter 3)? Is Draft-then-Final accounting configured sensibly per subledger (Chapter 4)? Are supporting references in place wherever control-account reconciliation will be needed (Chapter 5)? If multiple ledgers are in play, is each one's accounting method correct for its purpose (Chapter 6)? Every item on that checklist is a lesson in this course.

## Recap

This course built, step by step, everything a consultant needs to design, implement, troubleshoot, and reconcile Subledger Accounting across a real company's subledgers — the engine that converts every AP, AR, Assets, and Cash Management transaction into the General Ledger entries you already know how to read. That completes Oracle Fusion Subledger Accounting. Next up in the Oracle Fusion Financials Consultant path: Oracle Financial Reporting, where you'll learn to build the financial statements and reports that consume everything this course taught you to account for correctly.
