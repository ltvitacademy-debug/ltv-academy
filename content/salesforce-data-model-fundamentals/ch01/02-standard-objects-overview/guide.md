# Standard Objects Overview

**Chapter 1 · Objects · Lesson 2 of 23**

Lesson 1 defined what an object is in general. This lesson looks at the objects Salesforce already
built before you customize anything — the **standard objects** — and where to go to see the full
list for yourself.

## What you'll learn

- The difference between a standard object and a custom object
- Where every object in an org is managed: Object Manager
- The handful of standard objects this course spends the most time on

## Standard vs. custom, the actual test

- A **standard object** ships with every Salesforce org. Account, Contact, Lead, Opportunity, Case,
  Campaign, Product2, Task, Event, and User are all standard objects. You can't delete a standard
  object, and its name has no suffix.
- A **custom object** is one an admin built for a specific org. Its API name always ends in `__c`
  (double underscore, lowercase c) — for example `Energy_Audit__c`. Lesson 7 covers building one.

Both kinds behave the same way once they exist: both have fields, both hold records, both can have
relationships to other objects. The distinction is about *who built it and whether it ships by
default*, not about what it's capable of.

## Object Manager: the master list

Every object in an org — standard or custom — is managed from the same screen. From **Setup**
(the gear icon, top right), open **Object Manager**. It lists every object, sorted by label, with a
**Type** column that tells you Standard Object or Custom Object at a glance. A typical production
org easily has 50+ rows here: most of them standard objects you'll never touch, a handful you'll
work with constantly.

## The objects this course keeps coming back to

You don't need to memorize the full Object Manager list. You do need these by name, because the
rest of this chapter — and most of this course — lives inside them:

| Object | What it's for |
|---|---|
| Account | The company or organization a relationship is with |
| Contact | A person who works at (or is associated with) an Account |
| Lead | An unqualified prospect, before conversion |
| Opportunity | A deal in progress, tracked toward a close |
| Case | A customer service issue or request |
| Product2 / PricebookEntry | What's being sold, and at what price |
| Task / Event | The things people actually do — calls, follow-ups, meetings |

Lessons 3 through 6 take these one group at a time.

## Recap

- Standard objects ship with Salesforce; custom objects are admin-built and end in `__c`.
- Object Manager (Setup → Object Manager) is the single list of every object, with a Type column.
- Account, Contact, Lead, Opportunity, and Case are the standard objects you'll use most.

## Check yourself

You open Object Manager and see a row labeled `Energy_Audit__c` with Type "Custom Object." Based on
the naming alone, could this object have shipped with a brand-new Salesforce org?
