# Lesson 3 — Stakeholders and Business Drivers

**Chapter 1 · Scenario and Requirements · Lesson 3 of 33**

## What you'll learn

- Why a Technical Architect maps stakeholders explicitly instead of assuming "the business" wants one thing
- LTV Global's key stakeholders across its four business units and three regions, and what each one actually cares about
- The business drivers behind the transformation — what's actually forcing LTV Global to act now
- How conflicting stakeholder priorities become real design tensions you'll resolve later in this course

## "The business" is never one person

A recurring mistake in enterprise architecture is treating "what the business wants" as a single, coherent voice. LTV Global has four business units and three regions, and each one has its own leadership, its own priorities, and — critically — its own definition of what this transformation needs to deliver to be considered a success. A Technical Architect who designs for an imagined, averaged-out "the business" instead of the real, specific people who will use and judge the system ends up with a design that satisfies no one particularly well. Mapping actual stakeholders, by name and by interest, is foundational architecture work, not a soft-skills afterthought.

## LTV Global's key stakeholders

- **VP of Equipment Sales (North America).** Cares about a true 360-degree view of every dealer and direct account — specifically, visibility into what equipment a customer already owns before pitching a new sale. Wants Opportunity data from Salesforce, not spreadsheets reconstructed from the ERP.
- **VP of Parts & Aftermarket Distribution (Global).** Owns the highest-volume business unit at LTV Global and is the most sensitive to performance and scale — any design that makes parts ordering slower than today's homegrown tools is an automatic non-starter for this stakeholder.
- **Director of Field Service (EMEA).** Responsible for the team currently running on the aging regional CRM you'll meet in Lesson 4, and the most directly affected by the migration strategy this capstone designs in Chapter 4 — this stakeholder cares about zero disruption to field technicians during cutover.
- **CFO / Head of Finance.** Owns the relationship to the legacy financial system and is the most conservative stakeholder about touching it — not because of technical nostalgia, but because a financial-reporting mistake is the costliest kind of mistake this company can make.
- **CIO.** Owns the overall technology budget and the identity provider relationship, and is the executive sponsor who ultimately presents this design, through you, to the Architecture Review Board in Chapter 6.
- **Chief Information Security & Compliance Officer.** Owns GDPR compliance for EMEA and the company's overall risk posture — the stakeholder most likely to block a design on security or data-residency grounds alone.
- **Dealers and end customers.** Not internal stakeholders, but their experience through the customer portal (Lesson 16) is a business driver in its own right — dealer satisfaction and self-service adoption are measured outcomes of this transformation, not side effects.

## The business drivers behind the transformation

Four forces are actually driving LTV Global to fund this transformation now, and they matter because every design decision later in this course should trace back to at least one of them: **fragmentation** — four business units currently see different, incomplete pictures of the same customers because they're on a mix of disconnected tools; **growth** — APAC's rapid growth is straining processes that were built for a smaller, North America-centric company; **cost** — maintaining the aging regional CRM in EMEA and reconciling data by hand across systems is an increasingly expensive, people-intensive process; and **competitive pressure** — dealers increasingly expect the kind of self-service ordering experience competitors already offer, and LTV Global's current tooling can't deliver it.

## Where stakeholder tension shows up later

Some of these priorities are already in tension, and this course doesn't pretend otherwise. The Parts & Aftermarket VP's performance demands interact directly with the large data volume strategy in Lesson 10. The CFO's caution about the financial system directly shapes the integration decision in Lesson 14 — and becomes one of the rejected-alternative arguments you'll defend in Chapter 6. The Field Service Director's zero-disruption demand constrains the migration sequencing in Lesson 20. None of these tensions get waved away; they get resolved, with trade-offs made explicit, as the course proceeds.

## Key terms

| Term | Meaning |
|---|---|
| Stakeholder | A specific person or group with a real interest in, and influence over, the outcome of the design |
| Business driver | A real organizational pressure (fragmentation, growth, cost, competition) that justifies funding the transformation |
| Executive sponsor | The stakeholder (here, the CIO) who owns ultimate accountability for the project's success to leadership |
| Stakeholder tension | A situation where two stakeholders' legitimate priorities pull the design in different directions |

## Lab

Pick any two stakeholders from this lesson's list whose priorities you believe are already in direct tension (for example, the Parts & Aftermarket VP's performance demands versus the CFO's caution about touching the financial system). Write three or four sentences describing the specific tension, and name which later lesson in this course (by number or topic) you'd expect to actually resolve it.

## Check yourself

Can you name at least four of LTV Global's stakeholders and state, in one sentence each, what each one actually cares about? Can you name the four business drivers behind this transformation, and explain why "the business wants a Salesforce transformation" is too vague a statement for a Technical Architect to design against?
