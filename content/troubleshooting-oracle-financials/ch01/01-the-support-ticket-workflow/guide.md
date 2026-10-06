# The Support Ticket Workflow

**Chapter 1 · How to Work a Support Ticket · Lesson 1 of 3**

## What you'll learn

- Why production support is a different skill from implementation
- The six stages every support ticket moves through
- The vocabulary you'll see on every ticket for the rest of this course: severity, reproduce, root cause, resolution
- A first look at the kind of ticket this course is built around

## Implementation vs. support

Everything earlier in this path — Enterprise Structures, General Ledger, Payables, Receivables, Cash Management, Fixed Assets, Expenses, Procure-to-Pay, Order-to-Cash — was about building Oracle Fusion Financials correctly the first time. Production support is the opposite direction. The system is already live, real transactions are already flowing through it, and something that used to work (or something a user expected to work) isn't working now. Your job isn't to design a solution from a blank page — it's to figure out what actually happened to one specific transaction, in one specific setup, for one specific user, and fix it without breaking anything else that's currently working correctly.

That last clause matters more than it sounds like it should. A consultant who "fixes" a stuck invoice by changing a tolerance setting that affects every supplier in the business unit has usually traded one ticket for twenty new ones. Everything in this course is built around that discipline: find the actual cause, fix the actual cause, touch nothing else.

## The six stages of a ticket

| Stage | What happens |
|---|---|
| **1. Intake** | The ticket is logged: who reported it, what they saw, when, and on which record |
| **2. Triage** | Severity and priority are assigned — is this one invoice, or is the whole AP team blocked? |
| **3. Reproduce and scope** | You confirm the problem is real and work out how far it extends (one record? one user? one business unit?) |
| **4. Investigate** | You trace the symptom back through the setup, the data, and the process until you find the actual cause |
| **5. Resolve** | You apply the fix — to the data, the setup, or sometimes just user guidance — and verify it |
| **6. Document and close** | You record what happened, why, and what you did, so the next person doesn't start from zero |

Chapters 2 through 6 of this course are almost entirely Stage 4 and Stage 5, worked through real ticket scenarios across Payables, Receivables, Cash Management, General Ledger, Subledger Accounting, Fixed Assets, Expenses, security, and data loading. Lesson 2 of this chapter goes deeper on Stage 4. Lesson 3 goes deeper on Stage 6.

## A ticket, start to finish

Here's a short version of the kind of ticket you'll see repeatedly, worked at the fictional company **Meridian Steel Fabricators**:

> **Ticket #40112.** AP clerk reports: "I can't validate invoice INV-88341 for Summit Freight Carriers. It just sits there." Severity: Medium (one invoice, one clerk, not blocking the whole team).

A consultant working this ticket doesn't start by guessing. They open the invoice, try to validate it themselves, read whatever message Oracle actually returns, and check the distributions against the invoice header total. That specific ticket is the subject of Lesson 4 in Chapter 2 — this lesson is only introducing the shape of the process you'll use on it and on every ticket after it.

## Severity isn't the same as root cause

A common mistake is letting severity (how urgent the ticket is) drive the diagnosis (what's actually wrong). A "Critical" ticket because the whole AP team is blocked from closing the period might have a one-line root cause — a single disabled account combination that every journal in the batch happens to use. A "Low" ticket from one confused user might take longer to run down because the symptom is vague. Triage tells you what to work on first. It tells you nothing about why it's broken.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Confirm the issue is real by triggering it yourself or walking through the same steps the user took |
| Scope | How far the problem extends — one record, one user, one business unit, or everyone |
| Root cause | The actual condition in the setup or data that produced the symptom — not the symptom itself |
| Resolution | The specific action taken to correct the root cause |
| Severity | How urgent a ticket is, based on impact and how many people are blocked |

## Recap

Production support starts after the system is live: a real user hit a real problem on a real transaction, and your job is to trace the symptom back to its actual cause without disturbing anything else. Every ticket in this course moves through the same six stages — intake, triage, reproduce and scope, investigate, resolve, document and close. Next up, Lesson 2: a systematic method for Stage 4, diagnosing problems step by step.
