# Segregation of Duties

Lesson 12 mentioned, almost in passing, that a company often wants the person entering an invoice to be different from the person approving it. This lesson makes that idea explicit: segregation of duties (SoD), the control principle that no single person should hold conflicting access that lets them both initiate and approve the same business event unsupervised.

## What you'll learn

- What segregation of duties means and why it exists as a control
- What an SoD conflict looks like in Oracle Fusion terms
- The tools used to detect and manage SoD conflicts
- How implementation teams handle unavoidable conflicts

## The principle behind segregation of duties

Segregation of duties is a fraud- and error-prevention control: if one person can both create a transaction and approve it, that person can push through something improper with no second set of eyes. The classic textbook example is also the clearest one in Payables: a single person who can both create a supplier (or edit supplier bank details) and also approve payments to that supplier could create a fictitious supplier and pay it. Oracle Fusion doesn't automatically stop this — the system will happily provision a role combining both capabilities if an administrator builds and assigns it that way. SoD is a design discipline applied *to* role design, not a feature that enforces itself.

## What an SoD conflict looks like

An SoD conflict exists when a single person's combined access (across one or more roles) includes two "incompatible" duties — defined by the business, not by Oracle, as duties that should never sit with the same person. Common Financials examples:

- Create/edit a supplier **and** approve supplier payments
- Create a journal entry **and** approve/post that same journal
- Enter a customer credit memo **and** approve the write-off resulting from it
- Maintain the chart of accounts **and** have broad transaction-entry access across business units

Note that this is a statement about **combined access across all of a person's roles**, not about any single role in isolation — a perfectly reasonable AP Specialist role and a perfectly reasonable payment-approval role can still create a conflict the moment the same person holds both.

## Detecting and managing conflicts

Oracle Fusion Applications doesn't predefine SoD business logic on its own — the risk tolerance and the specific list of incompatible duties are something each enterprise defines. The tool built for this job is **Oracle Advanced Access Controls**, part of Oracle Risk Management Cloud: it continuously monitors role assignments and actual transactions against a library of access-conflict rules, flags violations, and can simulate the effect of a proposed access change before it's granted — catching a new conflict before it's created rather than after. (An older, related product with a similar purpose, Application Access Controls Governor, is still referenced in some documentation and in E-Business Suite contexts.)

## When a conflict can't be avoided

Small companies sometimes can't fully staff around every conflict — Castellan Robotics Inc.'s controller, during a staffing gap, genuinely needs both invoice-approval and journal-posting access for a few weeks. The accepted response isn't to pretend the conflict doesn't exist; it's to document it as an accepted risk, add a compensating control (a second person reviewing a sampled report of that controller's activity each week), and track it until it's resolved. You'll see the reporting side of this — how a conflict actually gets surfaced for review — in Lesson 14.

## Key terms

| Term | Meaning |
|---|---|
| Segregation of duties (SoD) | The principle that no one person should hold conflicting, unsupervised access |
| SoD conflict | A combination of incompatible duties held by one person across their roles |
| Oracle Advanced Access Controls | Oracle's current tool for continuously detecting SoD conflicts in Fusion Cloud |
| Compensating control | A mitigation (like a review) used when a conflict can't be immediately eliminated |

## Recap

SoD prevents one person from both initiating and approving the same kind of business event unsupervised; conflicts are defined by the business and detected across a person's combined role access, commonly with Oracle Advanced Access Controls. When a conflict is unavoidable, document it and add a compensating control. Next up, Lesson 14: security reports and audits, where SoD conflicts actually get surfaced and reviewed.
