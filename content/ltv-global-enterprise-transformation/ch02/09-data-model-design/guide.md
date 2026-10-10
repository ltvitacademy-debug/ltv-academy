# Lesson 9 — Data Model Design

**Chapter 2 · Core Architecture · Lesson 9 of 33**

## What you'll learn

- LTV Global's full Salesforce data model: objects, relationships, and why each relationship type was chosen
- Why Equipment Asset is a custom object rather than a repurposed standard object
- The Person Account vs. Business Account decision for LTV Global's two very different customer types
- How this data model gives every later chapter something concrete to design against

## From ownership map to actual objects

Lesson 8 decided what Salesforce owns. This lesson decides how that ownership looks as an actual Salesforce data model — the objects, the relationships between them, and the specific reasoning behind each relationship type, exactly the kind of decision Lesson 23's deliverable diagram will need to represent cleanly.

## Two kinds of Account, for two kinds of customer

LTV Global has two fundamentally different kinds of customer, and the data model treats them differently rather than forcing one Account shape onto both: **dealers** are businesses, and get a standard **Business Account**, with its own role hierarchy participation and account hierarchy for dealer groups that operate across multiple locations. **End customers** are individuals who directly own equipment, and get a **Person Account** — the standard Salesforce feature that blends Account and Contact into a single record for a B2C-style individual customer, which fits LTV Global's millions of individual equipment owners far better than forcing every one of them through a separate Contact tied to an artificial "household" Account that doesn't reflect how the business actually relates to them.

## The core object model

| Object | Type | Key relationship | Why this shape |
|---|---|---|---|
| Account (Dealer) | Standard, Business Account | Account hierarchy for multi-location dealer groups | Dealers are businesses with their own internal structure |
| Account (End Customer) | Standard, Person Account | — | Individuals owning equipment directly, not businesses |
| Equipment Asset | Custom (`Equipment_Asset__c`) | Lookup to Account (owner) and to Product2 (what it is) | Needs to exist independently of any single Opportunity, and to be queried at scale by serial number (Lesson 10) |
| Service Contract | Custom (`Service_Contract__c`) | Master-detail to Equipment Asset | A service contract has no meaning without its specific piece of equipment, and should be deleted/cascaded with it |
| Parts Order | Custom (`Parts_Order__c`) | Lookup to Account and to Equipment Asset | The highest-volume object; a lookup (not master-detail) keeps it from inheriting Equipment Asset's sharing and avoids making Equipment Asset a single point of ownership-model failure |
| Opportunity | Standard | Lookup to Account | Standard equipment-sales pipeline, unchanged in shape from any other Salesforce implementation |
| Case | Standard | Lookup to Equipment Asset, lookup to Service Contract | Standard Field Service case model, replacing EuroCRM's case-equivalent data after Lesson 20's migration |

## Why Equipment Asset is custom, not a repurposed standard object

Salesforce's standard **Asset** object exists specifically for tracking a customer's purchased products, and a reasonable first instinct is to use it directly. LTV Global's design instead uses a purpose-built custom object, because Equipment Asset needs fields and automation specific to heavy industrial equipment (serial number formatted to match Meridian's own numbering scheme, warranty tracking tied to Service Contract, a lookup directly to the dealer who sold it, separate from the owning end customer) that would mean heavily customizing the standard Asset object anyway — and a heavily customized standard object loses the main benefit (out-of-box behavior) that made starting with the standard object appealing in the first place. This is a judgment call, not a universal rule — the lesson's Lab asks you to reason about when the opposite choice would be right.

## Why master-detail here, and lookup there

The Service Contract → Equipment Asset relationship is master-detail deliberately: a service contract is meaningless without its specific equipment, should inherit that equipment's sharing automatically, and should be deleted if the equipment record is ever deleted. The Parts Order → Equipment Asset relationship is a lookup deliberately, for the opposite reason: Parts Order is the highest-volume object in the entire design, and master-detail would force every Parts Order to inherit Equipment Asset's OWD and sharing recalculation behavior at a volume where that recalculation cost (Lesson 10) becomes a real performance risk. Choosing master-detail versus lookup here isn't a default — it's a direct consequence of each object's actual volume and sharing needs.

## Key terms

| Term | Meaning |
|---|---|
| Person Account | A Salesforce feature blending Account and Contact into one record, used here for individual end customers |
| Business Account | A standard Account record representing a company, used here for dealers |
| Master-detail relationship | A relationship where the child inherits the parent's sharing and is deleted if the parent is deleted |
| Lookup relationship | A looser relationship that doesn't force shared ownership, sharing inheritance, or cascading deletion |

## Lab

A new architect on the team proposes switching Equipment Asset from a custom object to the standard Asset object, arguing "it's literally what Asset is for." Write a short response (four or five sentences) either defending LTV Global's custom-object choice or arguing the new architect has a point — either answer is acceptable, but you must reference at least two of the specific fields or behaviors this lesson named (serial number formatting, warranty/Service Contract linkage, dealer lookup) in your reasoning, not just a generic preference.

## Check yourself

Can you explain, from memory, why end customers get a Person Account while dealers get a Business Account? Can you state the specific reason Service Contract uses master-detail to Equipment Asset while Parts Order uses a lookup to the same object, instead of both using the same relationship type?
