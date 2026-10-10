# Lesson 25 — Data Architecture Case Study: Financial Services

**Chapter 4 · Applying Data Architecture · Lesson 25 of 26**

## What you'll learn

- How a regulated financial-services environment changes which data-architecture decisions matter most
- How systems-of-record and MDM concepts apply when Salesforce sits alongside a core banking platform
- How external objects and Big Objects solve a specific class of regulated-industry constraint
- How to reason about an architecture decision when "move the data into Salesforce" isn't an option

## Meet Carrow Mutual Wealth Advisory

Carrow Mutual is a wealth-management firm with 2,200 advisors serving 340,000 individual and small-business clients. Client account balances, transaction history, and trade records live and are regulated inside Carrow's core banking and custody platform — a separate system Carrow runs, has run for two decades, and is not migrating off of, because that platform is the regulator-audited system of record for anything touching actual money movement. Salesforce was introduced five years ago to run the client-relationship side: advisor notes, meeting history, financial-planning conversations, and compliance-review workflow. The two systems need to work together without either one losing its regulatory standing as the authoritative source for its own data.

## Systems of record, applied (Lesson 17)

The first architectural decision is naming which system is authoritative for what, explicitly, in writing: the core banking platform is the system of record for account balances, holdings, and transactions — full stop, not negotiable, because that's what the regulator audits. Salesforce is the system of record for the relationship data: advisor interactions, suitability assessments, and compliance sign-offs. The risk this decision heads off is the common failure mode where a convenient copy of balance data inside Salesforce quietly starts being treated as authoritative by advisors who find it easier to read than the core platform — and a stale or lagging copy then drives a real financial conversation with a client based on wrong numbers.

## External objects, not replication (Lesson 9)

Advisors need to see current balance and holdings data while working in Salesforce, but copying that data into custom Salesforce objects would create exactly the authoritative-copy risk the previous decision was designed to prevent, plus a synchronization problem at 340,000 clients' worth of account data. Carrow's architect recommends External Objects via Salesforce Connect, surfacing the core banking platform's account and holdings data live, in Salesforce's interface, without that data ever actually being stored in Salesforce. Advisors get one screen; the regulator-audited platform stays the only place the data is actually written and stored; there's no stale-copy risk because there's no copy.

## Compliance history and Big Objects (Lesson 9)

Every compliance review and suitability assessment Carrow performs has to be retained for years under financial-services recordkeeping regulation, and the volume — across 2,200 advisors and 340,000 clients, multiplied by years of required retention — runs into the hundreds of millions of records over the platform's lifetime. Keeping all of it in a standard custom object would eventually create exactly the large-data-volume performance risk from Lesson 22. Carrow's architect recommends a Big Object for compliance-review history older than the current active review cycle: still queryable (regulators and internal audit can retrieve any historical record), but outside the primary object's active-record footprint, which keeps current-year compliance workflows fast regardless of how many years of history have accumulated behind them.

## Master data: the client identity problem (Lesson 15)

A client's identity — name, address, tax ID, relationship to other accounts — legitimately needs to match exactly between the core banking platform and Salesforce; a mismatch here isn't a cosmetic inconvenience, it's a compliance risk (sending a suitability letter to a stale address) and an advisor-trust risk (two systems disagreeing about who the client even is). Carrow's architect recommends the core banking platform remain the master for client identity data specifically — not account balances, a separate category — with a one-way, scheduled sync into Salesforce's Contact/Person Account records, and a documented process for who corrects a discrepancy and where the correction actually gets made first.

## Key terms

| Term | Meaning |
|---|---|
| Regulator-audited system of record | A system whose data the regulator treats as authoritative, usually not safe to duplicate elsewhere without risk |
| External Object (Salesforce Connect) | A way to surface another system's live data inside Salesforce without storing a copy |
| Compliance retention | A regulatory requirement to keep specific records (often for years) even once they're no longer actively used |
| Master for client identity | The single system designated as authoritative for a client's identity data, distinct from transactional data |

## Lab

Carrow is evaluating whether to let advisors edit a client's mailing address directly in Salesforce, since that's where advisors spend most of their day, rather than requiring them to go into the core banking platform. Using this lesson's systems-of-record and master-data reasoning, write a recommendation: should Salesforce be allowed to write address changes, and if so, what has to be true about where that change then needs to be reflected, by when, and who's accountable if the two systems disagree afterward?

## Check yourself

Can you explain why Carrow's architect recommended External Objects instead of replicating balance data into Salesforce? Can you explain why client identity data and account-balance data were assigned to different reasoning in this case study, even though both ultimately originate in the same core banking platform?
