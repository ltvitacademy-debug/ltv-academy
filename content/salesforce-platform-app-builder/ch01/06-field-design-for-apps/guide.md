# Field Design for Apps

**Chapter 1 · Application Fundamentals · Lesson 6 of 24**

## What you'll learn

- The four questions to ask before creating any field
- Warranty_Claim__c's fields, each with a deliberate type
- Why "just use text" is a worse default than it looks
- How this closes out the data side of Chapter 1

## Four questions per field

| Question | What it decides |
|---|---|
| Type | Text, Number, Picklist, Formula, Roll-Up Summary... |
| Constraint | Required? Unique? A length or value limit? |
| Who edits it | Field-level security, by profile |
| Who sees it | Placement on the page layout |

Every field on every object deserves this pass — skipping it is how
orgs end up with a dozen free-text fields that should have been one
picklist.

## Warranty_Claim__c, field by field

```
Claim_Number__c      Auto Number   (CLM-{00000})
Claim_Date__c         Date          required
Status__c             Picklist      New/Review/Approved/Denied
Resolution_Notes__c   Long Text Area  not required
Total_Claimed__c      Roll-Up Summary  SUM of line items
```

Five fields, five deliberate type choices — not five text fields
because text happens to be the default when you click "New Field."

## Text is not a neutral default

| Type | What it enforces |
|---|---|
| Free text | Nothing — every typo becomes a stored, reportable value |
| Picklist | Only the values you defined can ever be entered |
| Formula | Can never drift out of sync with the fields it's calculated from |
| Roll-up summary | Always correct — no one has to remember to update it manually |

Each step down this list trades a little flexibility for a lot of
data quality. A Platform App Builder's job is knowing which trade is
worth making for each specific field — not defaulting to text because
it's always available.

## Closing out the data model

Chapter 1 is now complete end to end: Lesson 3 turned a requirement
into a design decision, Lesson 4 turned that into an entity-relationship
model, Lesson 5 built the object and its relationship, and this lesson
chose every field's type on purpose. Chapter 2 moves to the interface
— the layouts, pages, and components users actually interact with.

## Key terms

| Term | Meaning |
|---|---|
| Field-level security | Per-profile control over who can view/edit a specific field |
| Picklist | A field type restricted to a predefined list of valid values |
| Roll-up summary field | A field on the parent, automatically calculated from master-detail children |

## Check yourself

A field will store a customer's satisfaction rating, 1 through 5,
and must never hold any other value. Which field type enforces that,
and why would plain text fail the requirement?
