# Lesson 2 — Conceptual, Logical and Physical Models

**Chapter 1 · Enterprise Data Modeling · Lesson 2 of 26**

## What you'll learn

- The three altitudes of data modeling — conceptual, logical, physical — and who speaks each language
- Why skipping straight to Salesforce objects and fields is the most common architect mistake
- A worked example of the same idea moving through all three layers
- How to use this framework to keep a requirements meeting from collapsing into an implementation debate

## Three different questions, three different rooms

Enterprise data modeling traditionally happens in three passes, and each one answers a different question for a different audience:

- **Conceptual model.** What are the real-world things and relationships this business cares about, independent of any software? A conceptual model for an insurance company might say: a Policyholder owns one or more Policies; a Policy covers one or more Assets; a Claim is filed against a Policy. No database, no Salesforce, no fields — just the business's own vocabulary. This is the layer a VP or a business stakeholder can read and correct without any technical background.
- **Logical model.** The conceptual entities turned into structured entities and attributes, with relationships typed (one-to-many, many-to-many) and business rules attached — but still independent of any specific platform. A logical model says a Policy has a start date, an end date, a status, and a required relationship to exactly one Policyholder. This is the layer a business analyst or data modeler works in, and it's portable: the same logical model could, in principle, be implemented in Salesforce, SAP, or a custom database.
- **Physical model.** The logical model implemented in a specific platform's actual mechanics. In Salesforce, this is where "Policyholder" becomes an Account or a custom object, "owns one or more Policies" becomes a master-detail or lookup relationship, and "status" becomes a picklist field with a defined value set. This is the layer where Salesforce-specific tradeoffs — covered in the next two lessons — actually get decided.

## Why this separation matters in practice

The most common mistake an architect makes under deadline pressure is collapsing all three layers into one conversation — showing up to a requirements meeting and sketching custom objects and lookup relationships before the business has agreed on what a "Policy" even means. That produces a model that's technically buildable and conceptually wrong: it locks in someone's first guess at the business concept, encoded permanently in object and field names that are expensive to rename later.

Keeping the layers separate changes the order of operations. You get the business to agree on the conceptual model first — in their language, with no Salesforce vocabulary at all — and only once that's stable do you move to logical, and only once the logical model is validated do you touch the physical layer. Each layer is a checkpoint where a misunderstanding is still cheap to fix, instead of a change request after go-live.

## Worked example: the same idea at three altitudes

Take "a customer can have multiple shipping addresses, and one of them is the default."

- **Conceptual:** A Customer has Addresses. One Address per Customer is marked as the default.
- **Logical:** Customer (1) to Address (many). Address has a boolean attribute "is default," with a business rule that exactly one Address per Customer must have this set to true at any time.
- **Physical (Salesforce):** Customer maps to Account. Address becomes a custom object, Shipping_Address__c, in a master-detail relationship to Account (so an address cannot exist without its Account, and inherits its sharing — the specific mechanics Lesson 4 covers). The "is default" rule becomes a checkbox field, Is_Default__c, enforced by a validation rule or a trigger, because Salesforce has no native "exactly one" constraint across sibling records.

Notice that the conceptual and logical models never changed across different possible physical implementations — you could have built this in a different CRM and the first two layers would read identically. That portability is the whole point: it's what lets the business validate the model without being held hostage to platform-specific debate.

## Using this as a meeting discipline

In practice, this framework is most valuable as a discipline for running requirements conversations. When a stakeholder starts a sentence with "so we'd need a new field called...", that's a physical-layer statement arriving before the conceptual and logical layers have been agreed on. A useful architect habit is to pause and ask the conceptual question first — "what real-world thing does this represent, and how does it relate to what we already modeled?" — before any object or field name gets written down.

## Key terms

| Term | Meaning |
|---|---|
| Conceptual model | A platform-independent description of the real-world entities and relationships a business cares about |
| Logical model | The conceptual model structured into typed entities, attributes, and relationships, still platform-independent |
| Physical model | The logical model implemented in a specific platform's actual objects, fields, and relationship mechanics |
| Business rule | A constraint on data that reflects how the business actually operates (e.g., "exactly one default address per customer") |

## Lab

A healthcare provider wants: "A Patient can see multiple Doctors, and a Doctor can see multiple Patients. Each Patient-Doctor pairing has a 'primary care' flag, and at most one Doctor can be marked primary for a given Patient." Write out this requirement at all three layers: conceptual (plain business language), logical (entities, relationship cardinality, and the business rule stated precisely), and physical (how you would represent it in Salesforce — name the objects, the relationship type, and the field that would enforce the constraint).

## Check yourself

Can you explain, without naming a single Salesforce object or field, why starting a requirements conversation at the physical layer is risky? Can you take a one-sentence business requirement and correctly separate it into its conceptual, logical, and physical layers?
