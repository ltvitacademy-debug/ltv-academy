# Lesson 3 — Domain Modeling

**Chapter 1 · Designing Applications · Lesson 3 of 25**

## What you'll learn

- What a domain model is and why it comes before any object or field gets created
- The difference between modeling the business domain and modeling the Salesforce schema
- How entities, relationships, and lifecycle states fit together in a domain model
- Why skipping this step is the single most common cause of a data model that has to be rebuilt later

## The domain model is not the data model

A **domain model** is a conceptual description of the real-world things a business cares about, how they relate to each other, and how they behave over time — independent of any particular software, including Salesforce. A **data model**, by contrast, is the technical implementation of that domain inside a specific platform: which things become custom objects, which become standard objects, which become fields versus related records. The order matters: an architect who jumps straight to "let's create a custom object called Equipment_Claim__c with these 12 fields" without first working out the domain model is modeling the solution before understanding the problem, and the two will often disagree in ways that only surface after launch.

Consider a warranty-claims scenario. The domain model says: a **Customer** owns one or more pieces of **Equipment**; a piece of Equipment can have multiple **Warranty Claims** filed against it over its life; each Warranty Claim moves through a lifecycle of states (Submitted, Under Review, Approved, Denied, Closed); a Claim is handled by exactly one **Service Technician** at a time, but a Technician handles many Claims. None of that sentence mentions Salesforce. Only after that's settled does the architect ask: does Equipment map to Salesforce's standard Asset object, or does it need a custom object because this business's equipment has fields Asset doesn't support? Does Warranty Claim need its own object, or could it be a record type on Case? That second question is schema design, covered more in Lesson 16 — this lesson is about getting the first question right before touching the second.

## Entities, relationships, and lifecycle

Three elements recur in every domain model worth drawing:

- **Entities** are the nameable things the business talks about — Customer, Equipment, Claim, Technician. Each is a thing with an identity that persists over time, not just a value.
- **Relationships** describe how entities connect and the cardinality of that connection: one Customer to many Equipment (one-to-many), one Equipment to many Claims (one-to-many), one Claim to one Technician at a time but one Technician to many Claims (one-to-many the other direction). Cardinality decisions here directly predict whether a Salesforce relationship should be a lookup, a master-detail, or something else entirely — that mapping is Lesson 16's job, but the cardinality has to be right first.
- **Lifecycle** describes the states an entity moves through and what triggers each transition. A Claim's lifecycle (Submitted → Under Review → Approved/Denied → Closed) isn't incidental detail — it often becomes the backbone of the automation design in Chapter 3, because "what should happen when a Claim moves from Under Review to Approved" is exactly the kind of question Flow and Apex exist to answer.

## Why this step gets skipped, and what it costs

Domain modeling gets skipped under deadline pressure because it doesn't look like progress — there's no object, no field, no visible artifact yet, just conversation and maybe a whiteboard sketch. But a domain model that's wrong in a fundamental way (missing an entity, getting a cardinality backwards, missing a lifecycle state the business actually needs) tends to surface its damage only after real data has been entered against the wrong structure — which is exactly when it's most expensive to fix. A whiteboard session that catches "wait, can one Claim actually involve two Technicians collaborating?" before any object exists costs an hour; the same discovery six months after launch can mean a data migration.

## Key terms

| Term | Meaning |
|---|---|
| Domain model | A conceptual description of real-world business entities, their relationships, and their lifecycle, independent of any specific software |
| Data model | The technical implementation of a domain model inside a specific platform — objects, fields, and relationships |
| Entity | A nameable business "thing" with a persistent identity (Customer, Equipment, Claim) |
| Cardinality | The one-to-one, one-to-many, or many-to-many nature of a relationship between two entities |
| Lifecycle | The states an entity moves through over time and the events that trigger each transition |

## Lab

Using the warranty-claims scenario above (or a domain you know well — a different business process entirely is fine), draw or write out a domain model with at least four entities, their relationships with cardinality labeled, and at least one entity's full lifecycle with its states named. Do not mention Salesforce objects anywhere in this exercise — if you catch yourself writing "custom object" or "lookup field," you've slipped into data modeling too early.

## Check yourself

Can you explain, in your own words, why domain modeling has to happen before data modeling rather than alongside it? Can you name the three recurring elements of a domain model and give an original example of each?
