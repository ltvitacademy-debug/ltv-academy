# Custom Objects

**Chapter 1 · Objects · Lesson 7 of 23**

Lesson 2 drew the line between standard and custom objects by name. This lesson is about the moment
that line actually matters: when nothing Salesforce built fits the data you need to track, and an
admin builds something new.

## What you'll learn

- Why custom objects exist, and when to reach for one
- That a custom object behaves identically to a standard object once it's created
- Where custom objects come from: Object Manager's Create menu

## When a standard object doesn't fit

Account, Contact, Lead, Opportunity, Case, Product — these cover an enormous amount of ground, but
not everything. A solar installation company might need to track **Energy Audits** for each
property it evaluates. A university might need **Course Enrollments**. Neither of those is an
Account, a Contact, or anything else standard — so an admin creates a **custom object** to represent
it.

## Same shape, different origin

This is the part that surprises people: once a custom object exists, there is no functional
difference between it and a standard object. A custom object record gets the same kind of header,
the same Details and Related tabs, the same ability to have fields, page layouts, relationships to
other objects, and show up in reports. The *only* real differences are:

- Its API name ends in `__c` (Lesson 2).
- An admin — not Salesforce — defined its fields and its purpose.
- It can be deleted, unlike most standard objects.

Looking at a record on screen, you often can't tell which kind of object you're looking at without
checking Object Manager.

## Where a custom object comes from

From **Object Manager**, the **Create** button offers two paths: **Custom Object** (build one from
scratch, defining a Label and Plural Label) and **Custom Object from Spreadsheet** (import structure
and data from a spreadsheet directly into a new object). Either way, Salesforce automatically
generates the API name, creates a tab if you ask for one, and gives the object the same baseline
capabilities every object gets — fields, records, relationships, reports.

## Key terms

| Term | Meaning |
|---|---|
| Custom object | An object an admin builds for a specific org's data, API name ending in `__c` |
| Create > Custom Object | The Object Manager action that starts building a new custom object |
| Label / Plural Label | The display names given to a custom object when it's created |

## Recap

- Custom objects exist for data that no standard object represents.
- Once created, a custom object behaves exactly like a standard one — same tabs, same capabilities.
- New custom objects are created from Object Manager's Create button.

## Check yourself

Looking only at a record's page — header, tabs, related lists, no Object Manager in sight — how
could you tell whether you're looking at a standard object's record or a custom object's record?
