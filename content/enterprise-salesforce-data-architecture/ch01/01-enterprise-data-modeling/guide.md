# Lesson 1 — Enterprise Data Modeling

**Chapter 1 · Enterprise Data Modeling · Lesson 1 of 26**

## What you'll learn

- Why data modeling matters more, not less, once an org has thousands of users and millions of records
- The difference between modeling for a single team and modeling for an enterprise
- The real costs of a bad data model: the ones that show up in Setup, and the ones that show up in a board meeting
- How this chapter is organized, and what an architect is expected to own by the end of it

## Modeling at admin scale vs. modeling at architect scale

A Salesforce admin building out a new object for a single sales team asks a narrow question: what fields does this team need, and what does it relate to? That question is answerable in an afternoon, and getting it wrong costs an afternoon to fix.

An enterprise data architect asks a different question: what does this object mean to every team, system, and integration that will ever touch it, for as long as this org exists? A field added casually in year one can still be driving a broken integration in year seven, long after the person who added it has left the company. At enterprise scale — hundreds of thousands of Accounts, dozens of integrated systems, multiple business units sharing one org — a data model isn't a convenience for today's requirements. It's the thing every future requirement has to fit inside.

This is the central shift this course asks you to make. Everything you already know about objects, fields, and relationships from administration still applies. What changes is the time horizon and the blast radius you're designing for.

## What a bad enterprise data model actually costs

The failure modes of weak data modeling rarely show up as an error message. They show up as:

- **Reports that can't be trusted.** Two business units each built their own "Customer" object because nobody owned a shared definition, and now revenue reporting requires reconciling two systems of record that disagree.
- **Integrations that silently break.** An external system expects an Account's industry field to always be populated; a well-meaning admin made it optional eighteen months later, and nobody told the integration team.
- **Performance walls that appear years later.** A parent Account accumulates millions of child records under a single owner, and now every record-level sharing recalculation or search against that hierarchy slows the whole org down — a data skew problem that's dramatically cheaper to design around up front than to re-architect after the fact.
- **Governance gaps.** Nobody can say with confidence which system is the authoritative source for a customer's billing address, because three systems all claim to own it and the Salesforce data model never declared a winner.

None of these are bugs in the traditional sense. They're the predictable, compounding cost of data modeling decisions that were reasonable in isolation but were never evaluated against the enterprise as a whole.

## What this chapter covers

Chapter 1 builds the foundation the rest of the course leans on:

- **Lesson 2** separates conceptual, logical, and physical modeling — three different altitudes you have to work at, often in the same meeting.
- **Lessons 3–4** cover relationship design in depth: lookup vs. master-detail, and the tradeoffs that decision locks in.
- **Lesson 5** surveys recurring data modeling patterns you'll reuse across almost every enterprise build.
- **Lesson 6** covers denormalization and roll-up summaries — when flattening data on purpose is the right call, not a shortcut.
- **Lesson 7** covers person accounts and contact models, one of the highest-consequence, hardest-to-reverse decisions in the whole platform.

By the end of this chapter, you should be able to look at an unfamiliar Salesforce org's data model and immediately start asking the right diagnostic questions — not "is this technically valid," but "will this still make sense in five years, at ten times the data volume, with three more systems depending on it."

## Key terms

| Term | Meaning |
|---|---|
| Data model | The structure of objects, fields, and relationships that represents an organization's information in Salesforce |
| Enterprise data architecture | Data modeling done with the whole organization's current and future needs as the unit of design, not one team's |
| System of record | The single system designated as the authoritative source for a given piece of data |
| Data skew | An imbalance in how records are distributed (e.g., too many child records under one parent, or too many records owned by one user) that degrades performance at scale |
| Blast radius | The full set of teams, reports, and integrations that a data model change could affect |

## Lab

A mid-size insurance company runs Salesforce across Sales, Service, and a newer Claims business unit that joined through an acquisition two years ago. Each business unit currently maintains its own custom object to represent a "Policyholder," built independently before anyone connected the three teams. Write a short architect's assessment (150–250 words): what specific risks does this create (pick at least three from the lesson — reporting, integration, performance, governance), and what is the first question you would ask the three business units before proposing any change to consolidate the model?

## Check yourself

Can you explain, in your own words, why a data modeling decision that is perfectly reasonable for one team can still be the wrong decision for the enterprise? Can you name three concrete, non-technical costs of a weak data model, and connect each one to a specific category (reporting, integration, performance, or governance)?
