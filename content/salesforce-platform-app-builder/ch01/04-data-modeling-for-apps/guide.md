# Data Modeling for Apps

**Chapter 1 · Application Fundamentals · Lesson 4 of 24**

## What you'll learn

- How to turn a requirement's nouns into a list of candidate objects
- How to decide one-to-many vs. many-to-many before building anything
- The warranty-claims data model, worked end to end
- Why junction objects exist, with a concrete example

## From nouns to objects

Lesson 3 ended with a design decision for a warranty-claims app.
Before opening Object Manager, turn that decision into a model on
paper:

1. **List the nouns** in the requirement — Claim, Asset, Product, Customer
2. **Mark the owners** — which object is the parent of which
3. **Draw the links** — is each relationship one-to-many or many-to-many?
4. **Check for reuse** — Account, Contact, and Asset already exist as standard objects

## The warranty-claims model

```
Account (standard)
  └─ Asset (standard)
       └─ Warranty_Claim__c  (master-detail to Asset)
            └─ Claim_Line_Item__c (master-detail to Claim)
```

Two custom objects, both anchored to standard parents — not four
objects built from scratch. This is the reuse-first principle from
Lesson 3, applied directly to the data model.

## Matching relationship shape to reality

| Shape | When to use it | Example |
|---|---|---|
| One-to-many | A record always belongs to exactly one parent | One Asset has many Warranty Claims |
| Many-to-many | Records on both sides can relate to several on the other | A Claim can cover several Products; a Product can appear on many Claims |

A many-to-many relationship can't be modeled with a single field —
it needs a **junction object** sitting between the two: a custom
object with two master-detail (or lookup) relationships, one to each
side. In the warranty-claims model, `Claim_Line_Item__c` is that
junction — it links `Warranty_Claim__c` to `Product2`.

## Why getting the shape wrong hurts later

Model a many-to-many relationship as a simple lookup and you'll hit
a wall the first time a claim needs to cover two products, or a
product needs to appear on two different claims — the data literally
can't be captured without duplicating records. Getting the shape
right during design is far cheaper than migrating data after the
app is already in use.

## Key terms

| Term | Meaning |
|---|---|
| Entity-relationship model | The nouns and the relationships between them, decided before building |
| One-to-many | One parent record relates to many child records |
| Many-to-many | Records on both sides can relate to multiple records on the other |
| Junction object | A custom object with two relationships that resolves a many-to-many |

## Check yourself

A requirement says "track which employees attended which training
sessions, and let a session have a pass/fail score per employee."
Is that one-to-many or many-to-many — and what object do you need
that isn't in the requirement's nouns?
