# Lesson 25 — Data Subject Requests

**Chapter 5 · Lifecycle and Compliance · Lesson 25 of 30**

## What you'll learn

- The full set of data subject rights, not just erasure
- The four-step process most organizations use to fulfill a request
- Why identity verification matters as much as the data itself
- The practical challenges that make fulfillment harder than it sounds

## More than one right

Lesson 24 covered erasure, but it's one of several rights an individual — a **data subject** — can invoke over their own personal data. The common set, drawn from how GDPR and similar frameworks structure these rights, includes:

- **Access** — a copy of the personal data an organization holds about them
- **Rectification** — correcting inaccurate or incomplete data
- **Erasure** — deletion, under the conditions covered in Lesson 24
- **Portability** — receiving their data in a structured, commonly-used format to move to another provider
- **Restriction** — limiting how their data is processed without necessarily deleting it
- **Objection** — opting out of specific processing, such as certain marketing uses

A **data subject request (DSR)**, sometimes called a subject access request, is the formal mechanism for invoking any of these. Treating "someone asked about their data" as a single generic bucket is a mistake — an access request and a portability request expect genuinely different outputs.

## The fulfillment process

Regardless of which right is being invoked, most organizations run the same four-step process:

1. **Verify identity.** Before handing over, correcting, or deleting anyone's personal data, confirm the requester actually is that person. Skipping this step turns the privacy right into an attack vector — an impersonator submitting an access request on someone else's behalf is a real risk, not a theoretical one.
2. **Locate the data.** Find every system that holds data about this individual — not just the obvious system of record, but the data warehouse, the support-ticket tool, the marketing platform, and any backups or logs relevant to the specific right being invoked.
3. **Compile and respond.** Assemble what the request actually calls for — a data export for access or portability, a corrected record for rectification, a deletion confirmation for erasure — within the applicable response window.
4. **Log the request.** Record what was requested, when, what was done, and by whom, independent of the underlying data itself. This log is what lets an organization demonstrate, later, that it actually honored its obligations.

## Why fulfillment is harder than it sounds

Step 2 — locating the data — is usually where a DSR process breaks down in practice. Personal data about one individual is rarely confined to one table. It's scattered across the application database, a data warehouse copy, a CRM, a support-ticketing system, email marketing platform, log files, and sometimes spreadsheets nobody officially sanctioned (shadow IT). A credible DSR process depends on already knowing where personal data lives — which is exactly what classification (Chapter 2) and a documented data inventory exist to make possible. Without that groundwork, every request becomes an improvised search.

## Key terms

| Term | Meaning |
|---|---|
| Data subject | The individual whose personal data is being processed |
| Data subject request (DSR) | A formal request from an individual to exercise one of their data rights |
| Data portability | The right to receive personal data in a structured, commonly-used, machine-readable format |
| Identity verification | Confirming a requester is actually the data subject before acting on their request |

## Lab

Write out, step by step, how your own organization (or a hypothetical small company you design) would fulfill an access request: how would you verify the requester's identity, which systems would you have to search, and who would be responsible for compiling the final response? Note any system you're genuinely unsure how you'd search.

## Check yourself

Can you list the six common data subject rights from memory, and explain why identity verification is the first step rather than an afterthought?
