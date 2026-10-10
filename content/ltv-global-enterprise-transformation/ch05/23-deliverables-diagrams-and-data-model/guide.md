# Lesson 23 — Deliverables: Diagrams and Data Model

**Chapter 5 · Deliverables · Lesson 23 of 33**

## What you'll learn

- Why Chapter 5 turns Chapters 1-4's decisions into formal deliverables instead of introducing new design work
- How to render LTV Global's data model (Lesson 9) as a clear entity-relationship diagram
- What a data dictionary adds that a diagram alone can't communicate
- How to decide what belongs in a diagram versus what belongs in supporting prose

## Chapter 5 formalizes; it doesn't redesign

Every design decision in this capstone was made in Chapters 2 through 4. Chapter 5's job is different: take those decisions and produce the actual artifacts a real Technical Architect engagement hands to a client — diagrams, a data model document, a risk register, decision records, a roadmap, and a technical architecture document. If you find yourself making a new design decision while writing a Chapter 5 deliverable, that's a sign something in Chapters 1-4 was left unresolved, not a sign Chapter 5 is the place to resolve it.

## Rendering LTV Global's data model as a diagram

Lesson 9 described LTV Global's objects and relationships in prose and a table. The actual deliverable is an **entity-relationship diagram (ERD)**: Account (Dealer, Business Account) and Account (End Customer, Person Account) as the two anchor entities; Equipment Asset connected to Account by a lookup and to Product2 by a lookup; Service Contract connected to Equipment Asset by master-detail (drawn with the master-detail notation, not a plain line, since the relationship type itself is architecturally meaningful); Parts Order connected to Account and Equipment Asset by lookups; and Opportunity and Case attached to Account and Equipment Asset respectively. A reviewer should be able to see, from the diagram alone, every relationship type Lesson 9 chose deliberately (master-detail versus lookup) without needing the prose to explain which is which — the diagram notation itself should carry that information.

## What a data dictionary adds

A diagram shows relationships; it doesn't show field-level detail, and trying to cram that detail into the diagram makes it unreadable. A **data dictionary** — a supporting table listing each object's key fields, their type, and their purpose — carries that detail instead: Equipment Asset's `Serial_Number__c` (indexed external ID, per Lesson 10), Parts Order's queue-based ownership field, Account's region and business-unit fields that drive the role hierarchy from Lesson 11. The diagram and the dictionary are companion artifacts, not competitors — a reviewer uses the diagram to understand structure and the dictionary to understand specifics.

## Deciding what belongs where

A genuine skill this deliverable tests: knowing what to put in the diagram itself versus what belongs in supporting prose or the dictionary. The diagram should stay focused on objects and relationships — cramming in every field, every validation rule, and every automation detail turns a one-page diagram into an unreadable wall of boxes that defeats the purpose of having a diagram at all. Details that matter but don't change the shape of the data model (field types, specific automation logic, exact picklist values) belong in the dictionary or the technical architecture document (Lesson 27), not squeezed onto the diagram itself.

## Why this deliverable gets challenged first in Chapter 6

The data model diagram is usually the first artifact an Architecture Review Board looks at, because it's the fastest way for a board member to sanity-check whether the rest of the design makes sense — if the data model doesn't hold together, nothing built on top of it (security, integration, the portal) can be trusted either. Having Lesson 9's master-detail versus lookup reasoning ready to explain on sight, not reconstructed on the spot, is exactly what Chapter 6 rewards.

## Key terms

| Term | Meaning |
|---|---|
| Entity-relationship diagram (ERD) | A diagram showing objects/entities and the relationships between them |
| Data dictionary | A supporting table of field-level detail for each object in a data model |
| Deliverable | A formal artifact produced from already-made design decisions, for a client or review audience |

## Lab

Using Lesson 9's object table, draw (in words — a numbered list of entities and the relationship type connecting each pair is sufficient; an actual diagram isn't required for this lab) LTV Global's full data model as it would appear in the ERD. For each relationship, state whether it's master-detail or lookup, and in one phrase, why.

## Check yourself

Can you explain, in your own words, the difference between what belongs in the ERD itself and what belongs in the data dictionary? Can you explain why Chapter 5's deliverables shouldn't introduce new design decisions, and what it would mean if you found yourself making one while writing a deliverable?
