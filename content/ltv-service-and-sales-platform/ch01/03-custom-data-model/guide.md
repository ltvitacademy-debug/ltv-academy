# Lesson 3 — Custom Data Model

**Chapter 1 · Design · Lesson 3 of 25**

## What you'll learn

- Why Solstice's standard objects (Account, Opportunity, Case, Asset) aren't enough on their own
- The three custom objects this capstone adds, and exactly how each one relates to the standard objects around it
- Lookup versus master-detail relationships, and which one each new object uses and why
- The full data model you'll build against for the rest of this course

## What the standard objects already cover

Jules's baseline already has four standard objects doing real work: **Account** and **Contact** hold Solstice's customers, **Opportunity** (with Opportunity Products) tracks an appliance sale through its pipeline, and **Case** tracks a service request. One more standard object matters a great deal here and is easy to overlook: **Asset**. Asset is Salesforce's built-in object for tracking a specific product a customer owns — exactly what a sold-and-installed refrigerator or dishwasher is. When an Opportunity closes won, its line items become the appliances a specific Account actually owns, each one a separate Asset record with a serial number, a purchase date, and a status. Case even ships with a standard lookup field straight to Asset, so a service request can point at the exact unit it's about.

That standard layer gets Solstice to "what did we sell and what's broken," but not to "who's scheduled to fix it" or "is this repair covered under warranty, and by whom." That gap is what this lesson's three custom objects close.

## The three custom objects

**`Installation_Job__c`** represents one scheduled visit — an installation or a repair — tied to a specific Case and a specific Asset, assigned to a specific technician.

| Field | Type | Purpose |
|---|---|---|
| `Case__c` | Lookup(Case) | The service request this job fulfills |
| `Asset__c` | Lookup(Asset) | The specific appliance being installed or repaired |
| `Technician__c` | Lookup(User) | The assigned technician |
| `Job_Type__c` | Picklist (Installation, Repair, Warranty Repair) | What kind of visit this is |
| `Status__c` | Picklist (Scheduled, En Route, In Progress, Completed, Needs Parts) | Drives the technician job board you'll build in Lesson 12 |
| `Scheduled_Date__c` | Date/Time | When the visit is booked |

**`Warranty_Claim__c`** represents a claim filed with the appliance manufacturer when a repair is covered under warranty.

| Field | Type | Purpose |
|---|---|---|
| `Asset__c` | Lookup(Asset) | The appliance under claim |
| `Case__c` | Lookup(Case) | The service request that triggered the claim |
| `Claim_Status__c` | Picklist (Draft, Submitted, Approved, Denied) | Lifecycle state, enforced by the trigger in Lesson 9 |
| `Claim_Amount__c` | Currency | What Solstice is claiming back from the manufacturer |
| `Manufacturer_Claim_Id__c` | Text | The ID returned by the manufacturer's API (Lesson 14) once submitted |

**`Service_Contract__c`** represents an extended service plan a customer bought, which determines whether a given repair is covered and up to what dollar limit — this is the record the Lesson 9 trigger checks `Claim_Amount__c` against.

| Field | Type | Purpose |
|---|---|---|
| `Account__c` | Lookup(Account) | Who bought the plan |
| `Asset__c` | Lookup(Asset) | Which appliance it covers |
| `Coverage_Limit__c` | Currency | Maximum claimable amount under this plan |
| `Start_Date__c` / `End_Date__c` | Date | The plan's active window |

## Lookup vs. master-detail — and why every relationship above is a lookup

Salesforce gives you two relationship types for connecting custom objects to a parent: a **lookup relationship**, where the child record can exist and be reassigned independently of its parent, and a **master-detail relationship**, where the child's security and existence are tied directly to the parent (delete the parent, and matching children are deleted too; the child can also inherit sharing from the parent). All three objects above use lookups, deliberately: an `Installation_Job__c` genuinely needs to survive and be reassigned if its Case gets closed and reopened differently, a `Warranty_Claim__c` needs to be queryable and reportable on its own even if nobody deletes its Case, and none of these three relationships should silently cascade-delete real service history. Master-detail is the right call when a child record has no meaning without its parent (a line item on an order, for instance) — that's not the relationship any of these three objects have to their parents.

## Key terms

| Term | Meaning |
|---|---|
| Asset | Standard Salesforce object tracking a specific product a customer owns |
| `Installation_Job__c` | Custom object for one scheduled installation or repair visit |
| `Warranty_Claim__c` | Custom object for a claim filed with a manufacturer |
| `Service_Contract__c` | Custom object for an extended service plan covering an Asset |
| Lookup relationship | A relationship where the child can exist and be reassigned independently of its parent |
| Master-detail relationship | A relationship where the child's existence and security are tied to its parent |

## Lab

Draw (on paper, in a diagramming tool, or as an indented list) the full entity-relationship diagram for Solstice's data model: Account, Contact, Opportunity, Asset, Case, and the three custom objects above, with every relationship labeled lookup or master-detail and pointed in the correct direction (child → parent). You'll reuse this diagram as the data-model artifact in Lesson 21's documentation.

## Check yourself

- Why is Asset the object that connects Solstice's sales side to its service side?
- Name the three custom objects this lesson adds and what each one is for.
- Why does none of the three custom objects use a master-detail relationship?
