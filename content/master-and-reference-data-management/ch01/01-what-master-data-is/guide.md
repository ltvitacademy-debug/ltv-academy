# Lesson 1 — What Master Data Is

**Chapter 1 · MDM Foundations · Lesson 1 of 25**

## What you'll learn

- The standard definition of master data, and the specific traits that set it apart from other data in your organization
- Why the word "master" is used — what it means for data to be reused across systems
- A concrete example of why the same customer can look like three different people to three different systems
- How this course is organized across its five chapters

## The definition

**Master data is the core set of business entities that multiple systems and processes share and reuse** — customers, products, vendors, employees, and locations are the classic examples. It's "master" in the sense of a master copy: the authoritative version that everything else should be built from or checked against.

Three traits usually separate master data from the rest of what a company stores:

- **It's reused, not generated once.** A customer record gets referenced by sales, billing, support, and shipping — the same entity, touched by many processes.
- **It changes slowly.** A customer's name or address might update a few times a year. Compare that to a transaction log, which grows by the second.
- **It's relatively low in volume, but high in value.** A company might have 50,000 customer records and 50 million order records — but get the customer record wrong, and every one of those 50 million orders inherits the mistake.

## Why "master" matters: the same customer, three times

Picture a mid-size retailer. The CRM system has a customer named "Robert Chen," phone ending in 4471. The billing system has "Bob Chen," same phone number, different mailing address because he moved and only updated it in one place. The shipping system has "R. Chen," an old address from two years ago, pulled from an order that was never updated.

All three systems are technically correct about *something*. None of them, on its own, is a reliable answer to the question "who is this customer, right now?" That's the exact gap master data management exists to close: one real-world entity, scattered across systems, each with a partial and slightly different view of it.

## Why this matters more than it sounds like

This isn't a cosmetic problem. A company that can't agree on who its customers are can't calculate accurate revenue per customer, can't honor a "we'll never contact you again" opt-out consistently, and can't merge two product catalogs after an acquisition without duplicating half the inventory. Master data problems are usually invisible until a specific moment — a merger, an audit, a marketing campaign that mails the same customer three times — when they become very visible, very fast.

## How this course is organized

Twenty-five lessons across five chapters. This chapter (MDM Foundations) covers the vocabulary and shape of the problem: what master data is, how it's different from reference and transactional data (Lesson 2), the architecture styles used to manage it (Lesson 3), the business case for investing in it (Lesson 4), and the governance structure around it (Lesson 5). Chapter 2 goes deep on matching and consolidation — how you actually find and merge the duplicate views of the same entity. Chapters 3 and 4 cover specific master data domains (customer, product, vendor, employee) and reference data. Chapter 5 closes with distribution, quality, integration patterns, tooling, and a case study.

## Key terms

| Term | Meaning |
|---|---|
| Master data | The core business entities (customer, product, vendor, employee, location) that multiple systems share and reuse |
| Master data management (MDM) | The discipline and set of processes for creating and maintaining one trusted, consistent view of master data |
| System of record | The system officially designated as the authoritative source for a given piece of data |

## Lab

Pick one entity your own organization (or household, if you're between jobs) tracks in more than one place — a contact, a product, a vendor. Write down every system or spreadsheet that has its own copy of that entity, and note one field that disagrees between at least two of them. That disagreement is a master data problem in miniature.

## Check yourself

Can you state, in your own words, the three traits that make data "master data" rather than transactional data, and explain why the same customer can legitimately look different in three different systems?
