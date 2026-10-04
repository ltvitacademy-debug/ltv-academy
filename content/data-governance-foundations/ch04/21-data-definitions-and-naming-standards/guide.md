# Lesson 21 — Data Definitions and Naming Standards

**Chapter 4 · Policies and Standards · Lesson 21 of 30**

## What you'll learn

- Why "customer" meaning five different things across five systems is a governance problem,
  not a minor annoyance
- What a business glossary is and what it's actually for
- The difference between business metadata and technical metadata
- What ISO/IEC 11179 is, in plain terms, and why naming conventions reference it

## The problem this lesson solves

Ask five teams in most organizations to define "active customer" and you'll often get five
different answers: active in the last 30 days, active in the last 12 months, has a current
subscription, has ever made a purchase, hasn't explicitly unsubscribed. None of those
definitions is wrong on its own — they're just different, and when a sales report and a
finance report both say "active customers" while counting different things, nobody can trust
either number without first asking which definition was used. That's the specific, expensive
problem data definitions and naming standards exist to solve.

## The business glossary

A **business glossary** establishes standard business definitions so there's one common
understanding of a term across the organization. It's a living, governed reference — not a
document someone writes once and files away — that defines business concepts, their
relationships to each other, and how each one maps to the actual physical data (which table,
which field) that represents it.

A useful glossary entry typically includes:

- **The term** — the one approved name for the concept
- **The definition** — plain language, specific enough that two people would apply it the
  same way
- **The accountable owner** — who decided this definition and who to ask if it seems wrong
  (Lesson 13's owner role, concretely applied)
- **The mapping** — which physical data element(s) this term actually corresponds to

## Business metadata vs. technical metadata

Metadata — data about data — splits into two broad kinds that governance treats differently:

| Kind | Examples | Who mainly cares |
|---|---|---|
| Technical metadata | Column data type, table size, date created | Custodians, platform engineers |
| Business metadata | Classification, business definition, retention period | Owners, stewards, consumers |

A data catalog typically holds both, but a business glossary is specifically about the
business metadata layer — the layer that answers "what does this actually mean," which a
column's data type alone can never tell you.

## Naming standards and ISO/IEC 11179

Naming conventions aren't arbitrary style preferences — many organizations anchor them to
**ISO/IEC 11179**, an international standard for metadata registries that defines how to
name and describe data elements consistently (permissible values, naming patterns, and how
metadata elements relate to each other). You don't need to memorize the standard's internals
for this course, but it's worth recognizing the name: when a naming standard document
references ISO/IEC 11179, it's borrowing a well-established external framework rather than
inventing conventions from scratch.

## Why this pays off

A well-maintained glossary and naming standard prevents misinterpretation, improves
measurable data quality, and — maybe most importantly for day-to-day trust — lets two
different teams build two different reports and get the same number when they're supposed to
be measuring the same thing.

## Key terms

| Term | Meaning |
|---|---|
| Business glossary | Governed, living reference of approved business term definitions |
| Technical metadata | Data about data's structure (type, size, creation date) |
| Business metadata | Data about data's meaning (definition, classification, owner) |
| ISO/IEC 11179 | International standard for naming and describing metadata elements consistently |

## Lab

Pick one term your organization (or a hypothetical one) uses inconsistently — "active
customer," "revenue," "churned account," anything with more than one plausible definition.
Write a one-paragraph glossary entry for it: the approved definition, who should own that
definition, and which physical data element it should map to.

## Check yourself

Can you explain why five different "active customer" definitions across five teams is a
governance failure rather than a harmless quirk — and name the four parts a good glossary
entry should include?
