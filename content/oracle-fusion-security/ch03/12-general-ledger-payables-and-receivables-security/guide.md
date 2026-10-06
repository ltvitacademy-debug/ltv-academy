# General Ledger, Payables and Receivables Security

Lesson 11 named the job roles. This lesson is about what their underlying duty roles and data security actually lock down in each module — the specific privileges and policies that decide whether a given accountant can post a journal, approve an invoice, or write off a receivable.

## What you'll learn

- Key duty roles and privileges behind common General Ledger tasks
- Key duty roles and privileges behind common Payables tasks
- Key duty roles and privileges behind common Receivables tasks
- A pattern you'll see repeat across all three modules

## General Ledger: separating entry from posting

Within General Ledger, function security is commonly split so that creating a journal entry and posting a journal entry are controlled by different privileges — meaning a company can staff those two actions with different people (or require a different role to touch posting) even though both actions happen inside the same Journals page. A **General Accountant** typically has entry and basic posting duty roles; period close tasks and higher-risk adjustments are more commonly reserved for **General Accounting Manager**. Data security here runs through the data access set mechanics from Lesson 6 — an accountant only posts within the ledgers and balancing segment values their data access set covers.

## Payables: entry, matching, and approval as separate privileges

Payables duty roles separate several steps that look like one workflow to an end user but are secured independently underneath:

- **Invoice entry** — creating an invoice (what an Accounts Payable Specialist does)
- **Invoice validation/matching** — matching an invoice to a purchase order or receipt
- **Payment processing** — creating and confirming payment runs
- **Invoice approval** — approving an invoice for payment, sometimes gated by an approval-limit rule tied to invoice amount

A company can, and often does, want the person entering an invoice to be different from the person approving it — which is exactly the kind of separation Lesson 13 covers under segregation of duties. Data security on top of this layer is primarily business unit (Lesson 7): an AP Specialist for US Operations cannot act on EMEA Shared Services invoices no matter how well their job role is configured.

## Receivables: receipts, adjustments, and write-offs

Receivables duty roles similarly separate:

- **Receipt application** — applying a customer payment to an open invoice
- **Adjustments** — adjusting a customer's balance (a write-down, say)
- **Write-offs** — writing off an uncollectible balance entirely, typically a more tightly held privilege than ordinary adjustments, since it directly affects reported revenue

At Castellan Robotics Inc., an Accounts Receivable Specialist can apply receipts and make routine adjustments, but writing off a balance over a defined threshold requires an **Accounts Receivable Manager** — a deliberate design choice, not a technical limitation, implemented by which duty roles each job role inherits.

## The pattern across all three modules

Across GL, AP, and AR, the same shape repeats: **routine entry work** sits in a specialist-level duty role, **higher-risk or irreversible actions** (posting, approval, write-off) sit in a manager-level duty role, and **data security scopes all of it** to the ledger, business unit, or equivalent dimension the person is actually responsible for. Recognizing this pattern is what lets you reason about a module you haven't memorized the exact duty role names for yet.

## Key terms

| Term | Meaning |
|---|---|
| Invoice validation/matching | Matching an AP invoice to a PO or receipt, secured separately from entry |
| Write-off | Clearing an uncollectible AR balance; typically a manager-level privilege |
| Approval-limit rule | A rule gating invoice approval by dollar amount |

## Recap

Each module separates routine entry from higher-risk actions like posting, approval, and write-off, assigns them to different duty roles, and scopes all of it with data security (ledger, business unit). Next up, Lesson 13: segregation of duties, where this separation becomes an explicit control rather than just an organizational convenience.
