# Lesson 12 — Creating the Governance Operating Model

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 12 of 35**

## What you'll learn

- How to choose an operating model shape that fits LTV Global's actual
  size and structure, not a textbook default
- The specific hybrid model this capstone lands on, and who sits in
  it
- How every deliverable from Lessons 2-11 finds a permanent home in
  this structure
- What the rest of this chapter builds on top of the model this lesson
  finalizes

**Reminder:** LTV Global and the operating model below are fictional
and illustrative, invented for this capstone.

## Choosing a shape, not a label

A fully **centralized** model — one team owning every decision for
every domain — would make Dana Whitfield's small program team a
bottleneck for a company with three regions and six business units. A
fully **decentralized** model is exactly what already existed before
this program started: three systems, three customer records, no one
accountable for reconciling them. Neither fits. LTV Global adopts a
**federated hybrid model**: a small central office sets standards and
makes cross-domain calls, while the domain owners from Lesson 4 keep
day-to-day authority inside their own business units.

## The structure

| Layer | Who | Role |
|---|---|---|
| Executive sponsor | Dana Whitfield, CDO | Funds the program, reports to the board, breaks ties between domain owners |
| Governance office | Marcus Ibe, Director of Data Governance | Runs the KPIs and workflow from Lesson 11, maintains the glossary and dictionary, facilitates the council |
| Domain owners | Renata Silva, Tom Okafor, Grant Lindqvist, Amara Chen | Keep Lesson 4's accountability for their own domain's decisions and stewards |
| Stewards | Priya Anand, Diego Marsh, Sam Okonjo, Leo Fitzgerald | Do the daily work the four domain owners are accountable for |

A monthly **Data Governance Council** — Dana, Marcus, and the four
domain owners, plus an IT & Data Services representative for Summit —
is where the Lesson 11 workflow's escalations land: an authoritative-
source dispute nobody below that level can settle, a KPI that's missed
target two months running, or a new CDE candidate like Lesson 6's
surfaced `DateOfBirth`.

## Where every earlier deliverable lives now

This model isn't a new, thirteenth thing to build — it's the permanent
home for everything already built in this chapter:

- The **landscape inventory** (Lesson 2) and **glossary/dictionary**
  (Lesson 5) are maintained by the governance office, not frozen as a
  one-time document.
- **CDE scoring** (Lesson 3) and **classification** (Lesson 6) are
  revisited whenever the office or a domain owner flags a new
  candidate — exactly what happened with `DateOfBirth`.
- **Quality rules** (Lesson 7), **lineage** (Lesson 8), and
  **authoritative-source decisions** (Lesson 9) stay with the stewards
  and owners who authored them, reviewed at the monthly council.
- **Access and retention policy** (Lesson 10) and the **KPIs and
  workflow** (Lesson 11) are the governance office's standing
  operational responsibility.

## What the rest of this chapter builds

This lesson closes the foundational half of the capstone. The chapter
continues from here into an AI governance strategy, a formal
architecture diagram, and the final assembled program documents and
executive presentation — all built on top of the structure, roles, and
deliverables this lesson just made permanent.

## Key terms

| Term | Meaning |
|---|---|
| Operating model | The organizational structure (centralized, federated, or hybrid) governance decisions and work flow through |
| Federated hybrid model | A model with a small central office for standards and cross-domain decisions, and distributed domain-level ownership |
| Governance council | A recurring cross-domain meeting where escalations and cross-cutting decisions get made |

## Lab

Diagram LTV Global's operating model as a simple org chart: Dana at
the top, Marcus's governance office beside her, the four domain owners
below, and their stewards below them. Add one arrow showing how an
issue from Lesson 11's workflow actually reaches the monthly council
when it can't be resolved at the steward or owner level.

## Check yourself

- Why did a fully centralized model get rejected for LTV Global, and
  why did a fully decentralized model get rejected too?
- Who sits on the monthly Data Governance Council, and what kind of
  issue actually reaches it?
- Name two deliverables from earlier lessons that the governance
  office now maintains on an ongoing basis, rather than having built
  once and moved on.
