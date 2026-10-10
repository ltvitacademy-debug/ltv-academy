# Lesson 4 — Current-State Landscape Analysis

**Chapter 1 · Scenario and Requirements · Lesson 4 of 33**

## What you'll learn

- How to inventory an existing system landscape before designing anything new
- LTV Global's actual current-state systems: Meridian ERP, LedgerPoint, EuroCRM, Okta, and Snowflake
- Why each legacy system's specific limitations (not just its existence) shape the design
- How to represent a current-state landscape so stakeholders agree on the starting point before you propose a future one

## Why current-state analysis comes first

It's tempting to jump straight to designing the target state — it's the more interesting work, and it's what the client is actually paying for. But a target-state design that doesn't accurately account for what already exists is not a design, it's a wish list. **Current-state landscape analysis** is the discipline of inventorying what systems exist today, what each one is actually responsible for, how they currently talk to each other (if at all), and — most importantly — what each one's real limitations are, before proposing anything new. Skipping this step is how an architect ends up proposing a real-time integration with a system that has never supported real-time anything.

## LTV Global's current-state landscape

- **Meridian ERP.** An on-premises enterprise resource planning system that is the system of record for product catalog, inventory levels, and the manufacturing/supply-chain order lifecycle. Meridian exposes both older SOAP-based web services and newer REST endpoints, and can support near-real-time request/response integration — it's a legacy system, but not a frozen one.
- **LedgerPoint.** A mainframe-based general ledger, accounts-payable, and accounts-receivable system, inherited from an acquisition years before this transformation and never replaced because the cost and risk of replacing core financial infrastructure was never judged worth it. LedgerPoint has no modern API of any kind — the only integration path in or out is batch flat files moved by SFTP on a scheduled cadence. This is the constraint from Lesson 2 made concrete.
- **EuroCRM.** A decade-old CRM used only by the EMEA Field Service team, pre-dating LTV Global's broader Salesforce ambitions. It holds EMEA service history and contact data that nowhere else in the landscape has, and it is the system Lesson 20's migration strategy is specifically built to retire.
- **Okta.** LTV Global's corporate identity provider, already used to manage workforce identity and single sign-on into the company's other internal applications. Lesson 12 designs how Salesforce plugs into this existing investment rather than standing up a parallel identity system.
- **Snowflake.** LTV Global's existing enterprise data warehouse, used today for whatever cross-system reporting LTV Global's data team can currently assemble — largely by hand, because none of Meridian, LedgerPoint, or any CRM currently feeds it in a reliable, automated way. This is one of the fragmentation pains Lesson 3 named as a business driver.
- **Point solutions and spreadsheets.** Outside of the five named systems, several regional teams (particularly in APAC, the newest region) run parts of their process in spreadsheets and small point tools because nothing enterprise-grade was ever rolled out to them — a gap this transformation is also expected to close.

## What the current state tells you before you design anything

Laid out this way, three things are already obvious before a single Salesforce object gets designed: real-time integration is achievable with Meridian but structurally impossible with LedgerPoint without a mainframe modernization project that is out of scope; EMEA has real, irreplaceable data trapped in EuroCRM that has to be migrated, not just abandoned; and Snowflake already exists, so the data-warehouse integration in Lesson 15 is a "connect to it properly" problem, not a "stand up a data warehouse" problem.

## Documenting the landscape

A current-state landscape is typically captured as a simple systems inventory — what the system is, what it owns, how it connects today, and its key limitation — agreed with stakeholders before moving on. The table below is the version of that inventory this capstone carries forward into every later architecture decision.

| System | What it owns | Integration today | Key limitation |
|---|---|---|---|
| Meridian ERP | Product, inventory, manufacturing/supply-chain orders | SOAP + newer REST | On-prem; not a system this project will replace |
| LedgerPoint | General ledger, AP, AR | Batch flat files via SFTP only | No API of any kind — batch-only is permanent, not temporary |
| EuroCRM | EMEA field service history and contacts | Standalone, no integration | Being retired via Lesson 20's migration |
| Okta | Workforce identity, SSO | SAML/OIDC to other internal apps | Sized for ~10,000 employees, not millions of consumers |
| Snowflake | Cross-system reporting | Manual/ad hoc today | No reliable automated feed exists yet |

## Key terms

| Term | Meaning |
|---|---|
| Current-state landscape analysis | Inventorying existing systems, ownership, and limitations before designing a target state |
| Systems inventory | A structured list of each system, what it owns, how it integrates today, and its key limitation |
| Legacy system | An existing system the project must work around or integrate with, not necessarily replace |
| System of record | The one system whose data is treated as authoritative for a given kind of information |

## Lab

Using the systems-inventory table above, write one additional row for the "point solutions and spreadsheets" category described in this lesson's APAC example: what it likely owns informally, how it integrates today (if at all), and its key limitation. Then state, in one sentence, which later chapter of this course (migration, data architecture, or integration) you'd expect to address that row.

## Check yourself

Can you name LTV Global's five named current-state systems and state, for each, the one fact that most constrains this project's design? Can you explain why LedgerPoint's batch-only limitation is described as permanent rather than something this project should try to fix?
