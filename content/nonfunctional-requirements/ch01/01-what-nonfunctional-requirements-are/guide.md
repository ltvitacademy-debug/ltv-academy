# Lesson 1 — What Nonfunctional Requirements Are

**Chapter 1 · Nonfunctional Requirements · Lesson 1 of 18**

## What you'll learn

- The difference between a functional requirement and a nonfunctional requirement (NFR)
- Why NFRs are harder to elicit and easier to skip than functional requirements
- The standard NFR categories a Salesforce architect is expected to own
- Why NFRs belong in architecture decisions from day one, not bolted on afterward

## Functional vs. nonfunctional

A **functional requirement** describes what a system does: "when a case is created with Priority = Critical, assign it to the on-call queue and send an SMS to the duty manager." It's testable with a single pass/fail check, and a stakeholder can point at a screen and say "yes, that happened" or "no, it didn't."

A **nonfunctional requirement** describes how well the system has to do everything it does: how fast, how available, how secure, how maintainable, how recoverable after something goes wrong. "The case-assignment trigger must complete in under two seconds for 95% of cases, even during a product-recall spike of 50,000 new cases in a day" is an NFR wrapped around the functional requirement above. The functional requirement can be true while the NFR is violated — the case gets assigned, but it takes 40 seconds and the support team is furious.

This is the core reason NFRs get shortchanged in real projects: a functional requirement that's missing is immediately obvious (a button does nothing, a field doesn't save), while an NFR that's missing is invisible until the system is under real load, attacked, audited, or needs to be changed by someone other than the person who built it. A demo with ten test records never reveals a performance NFR gap. A sales cycle never reveals a disaster-recovery gap. Both show up for the first time in production, usually at the worst moment.

## The standard NFR categories

This course organizes Salesforce NFR work around six categories, each covered in its own lesson this chapter:

- **Performance** — response time and throughput under realistic load (Lesson 2)
- **Security** — confidentiality, integrity, and controlled access to data and functionality (Lesson 3)
- **Scalability** — the system's ability to handle growth in data volume, users, and transaction rate without a redesign (Lesson 4)
- **Reliability** — the system behaving correctly and consistently, including how it handles failure (Lesson 5)
- **Maintainability and recoverability** — how easily the system can be changed safely, and how it recovers after an outage or data loss (Lesson 6)
- **Compliance** — the legal, regulatory, and contractual constraints that shape the design (Lesson 7)

Industry standards such as ISO/IEC 25010 (the "software product quality model") list more categories than this — usability, portability, interoperability — but these six are the ones a Salesforce Technical Architect is routinely asked to own, defend, and trade off, because they're the ones that determine whether an org survives contact with real usage, real attackers, and real auditors.

## Why this matters at the architecture level

Functional requirements usually come from a business analyst or product owner working directly with end users. NFRs come from a different, less obvious set of sources: an existing SLA with a customer, a compliance officer's regulatory obligation, an infrastructure team's capacity plan, or simply the architect's own judgment about what "production-grade" means for this specific org. Nobody hands an architect a tidy list of NFRs the way a product owner hands over user stories — eliciting them is itself architectural work, and it's the subject of Lesson 8.

An NFR that's decided during initial design (e.g., "this object will hold 200 million records, so it needs a Big Objects or external-object strategy, not a custom object") is a design choice. The same NFR discovered 18 months into production, after the custom object has hit its practical limits, is a migration project — more expensive, riskier, and visible to the business in a way the original decision never had to be.

## Key terms

| Term | Meaning |
|---|---|
| Functional requirement | A testable statement of what the system does |
| Nonfunctional requirement (NFR) | A testable statement of how well the system does what it does — speed, availability, security, and similar quality attributes |
| ISO/IEC 25010 | An international standard defining a software product quality model, the common reference point for NFR categories |
| Quality attribute | Another common name for an NFR category (performance, security, and so on) |

## Lab

Take a real-sounding Salesforce feature request: "When a customer submits a support case through the community portal, create a Case record and notify the assigned support agent." Write down three functional requirements this implies and three nonfunctional requirements this implies, without being told what they are. For each NFR, write one sentence on what would go wrong in production if that NFR were silently ignored during design.

## Check yourself

Can you explain, in one sentence each, the difference between a functional and a nonfunctional requirement? Can you name the six NFR categories this course covers and give one real-world Salesforce example of each?
