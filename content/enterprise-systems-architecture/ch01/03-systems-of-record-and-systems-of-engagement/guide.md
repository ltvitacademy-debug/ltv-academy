# Lesson 3 — Systems of Record and Systems of Engagement

**Chapter 1 · Salesforce in the Enterprise · Lesson 3 of 22**

## What you'll learn

- The distinction between a system of record (SoR) and a system of engagement (SoE), and why it matters architecturally
- Where Salesforce typically sits in that distinction, and where it doesn't
- Why one piece of data can have a system of record for one purpose and a different authoritative system for another
- How to spot a "dueling systems of record" problem before it causes a data-integrity incident

## Two different jobs a system can do

A **system of record (SoR)** is the system an organization has designated as the authoritative source of truth for a specific category of data — if there's ever a dispute about what the correct value is, the SoR wins. A **system of engagement (SoE)** is the system people actually interact with day to day — the interface where work gets done, decisions get made, and relationships get managed. These aren't mutually exclusive labels; plenty of systems do both jobs for the data they own. But in a large enterprise, the two roles frequently land on different systems for the same business process, and a System Architect needs to know exactly where the line falls.

## Where Salesforce typically sits

Salesforce is built, first and foremost, to be an excellent system of engagement: it's where sales reps work deals, where service agents handle cases, where marketers manage campaigns. For the data that's genuinely native to that engagement — opportunity stage, case status, campaign membership — Salesforce is also appropriately the system of record, because nothing else in the enterprise has a legitimate competing claim to that data.

But Salesforce frequently is *not* the system of record for data it displays. A sales rep views a customer's outstanding invoice balance inside Salesforce, but the ERP's general ledger is the actual system of record for that balance — Salesforce is just the system of engagement showing it. An account's employee headcount might be pulled in from an HR or data-enrichment system that remains the real authority. Confusing "this field is visible in Salesforce" with "Salesforce is authoritative for this field" is one of the most common and costly architectural mistakes a System Architect can let through.

## The same data, two different authorities

It's also normal for the same conceptual entity to have different systems of record depending on the exact question being asked. "What is this customer's billing address" might be owned by the ERP's finance records (because that's what goes on an invoice), while "what is this customer's primary contact for sales outreach" might legitimately be owned by Salesforce (because that's a sales-relationship fact, not a financial one). The architecture has to be precise about which *specific field or fact*, not just which *object*, has which authority — a single Account record can be a patchwork of fields each sourced from a different system of record.

## Spotting dueling systems of record

The failure mode to watch for is two systems each independently believing they are authoritative for the same fact, with no reconciliation process between them — for example, both Salesforce and the ERP allowing a user to edit a customer's primary address, with no integration keeping them in sync and no documented rule for which one wins when they disagree. This produces silent data drift that nobody notices until a report, an invoice, or a compliance audit surfaces the mismatch. The System Architect's job during any integration design is to explicitly name, for every piece of shared data, exactly one system of record and make every other system a read-only or conflict-resolved consumer of it.

## Key terms

| Term | Meaning |
|---|---|
| System of record (SoR) | The system designated as the authoritative source of truth for a specific category of data |
| System of engagement (SoE) | The system people actually interact with day to day to do their work |
| Dueling systems of record | A failure mode where two systems each independently believe they are authoritative for the same fact, with no reconciliation |
| Field-level authority | The principle that system-of-record status should be assigned per field or fact, not just per object |

## Lab

Pick an Account-level fact that would plausibly live on a Salesforce Account record at a real company: billing address, annual revenue, primary contact, and employee count. For each one, decide which system in a typical enterprise (Salesforce itself, the ERP, an HR system, or a third-party data provider) should be the system of record, and justify your answer in one sentence. Then describe, in writing, what a "dueling systems of record" failure would look like if two of those systems both allowed direct edits to the same field with no integration between them.

## Check yourself

Can you define system of record and system of engagement in your own words, without needing an example to lean on? Can you give a real example of a fact that's visible in Salesforce but whose actual system of record is somewhere else?
