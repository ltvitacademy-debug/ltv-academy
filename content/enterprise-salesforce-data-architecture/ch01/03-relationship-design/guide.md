# Lesson 3 — Relationship Design

**Chapter 1 · Enterprise Data Modeling · Lesson 3 of 26**

## What you'll learn

- The relationship types Salesforce actually offers, and what each one is for
- How to model many-to-many relationships using a junction object
- Hierarchical and self-relationships, and where they show up in real orgs
- Why relationship design is one of the hardest Salesforce decisions to walk back

## The relationship types on the platform

Salesforce gives you a small set of relationship mechanisms, and enterprise data modeling is largely the discipline of picking the right one deliberately instead of defaulting to whichever one is faster to click through in Object Manager:

- **Lookup relationship.** A loose, optional link between two objects. Per Salesforce's own object reference, a lookup relationship "has no effect on deletion or security" — deleting the parent doesn't delete the child, and the child doesn't inherit the parent's sharing. Lookup fields also aren't automatically required on the page layout, unlike master-detail fields.
- **Master-detail relationship.** A tight, structural link where the detail (child) record's existence, ownership, and security are controlled by its master (parent). Lesson 4 covers this mechanism and its tradeoffs in depth.
- **Hierarchical relationship.** A special-purpose lookup available only on the User object, used to model management chains (a User's Manager field is the canonical example).
- **Self-relationship.** A lookup or master-detail relationship where an object relates to another record of the same object — for example, a custom Account Hierarchy or a Case with a "related Case" field pointing to another Case.
- **Many-to-many relationship.** Not a distinct relationship type on its own — Salesforce models many-to-many using a junction object: a custom object with two master-detail (or, less commonly, lookup) relationships, one to each of the objects being connected.

## Modeling many-to-many: the junction object pattern

Many real business relationships are many-to-many, not one-to-many, and this is where a lot of data models go wrong early. Consider "a Contact can attend multiple Events, and an Event has multiple attending Contacts." You cannot represent this with a single lookup field on either object, because a lookup field holds exactly one value.

The standard pattern is a junction object — commonly named something like Event_Attendee__c — with two relationship fields, one to Event and one to Contact. Each attendance record is its own row, so a Contact attending five Events produces five Event_Attendee__c records, and an Event with two hundred attendees has two hundred of them. Salesforce's own documentation confirms this pattern directly: a many-to-many relationship is built with "a custom junction object with two master-detail relationship fields, each linking to the objects that you want to relate," and this capability (a custom object holding two master-detail relationships) has been supported since early API versions of the platform.

The junction object isn't just plumbing — it's also the natural home for data that belongs to the relationship itself, not to either side of it. "Attended: yes/no," "Registration date," and "Seat number" all belong on Event_Attendee__c, because none of them are a property of the Event alone or the Contact alone; they only make sense in the context of that specific pairing.

## Hierarchical and self-relationships

Self-relationships model structure within a single object. The two recurring enterprise patterns are:

- **Organizational hierarchy.** Accounts representing a parent company and its subsidiaries, linked through Account's standard Parent Account lookup — letting you roll up or report across a corporate family without duplicating data.
- **Record-to-record linkage.** A Case with a "Parent Case" or "Related Case" field, used to group duplicate or related support tickets without merging them.

The User object's Manager field is the one genuinely hierarchical relationship type on the platform, reserved for modeling reporting chains, and it has its own specific behaviors (like being usable in role-based or manager-based sharing rules) that a generic self-lookup doesn't get for free.

## Why relationship design is hard to reverse

The relationship type you choose isn't a cosmetic decision — it determines deletion behavior, ownership, sharing inheritance, whether roll-up summaries are even possible, and how expensive a future change will be. Salesforce's own documentation is explicit that once you've attached certain features to a relationship — most notably, a roll-up summary field on a master-detail relationship — you lose the ability to freely convert that relationship to a different type. That's the core reason this decision belongs at the architecture table, made deliberately with the next several years in mind, rather than left to whichever relationship type happens to be the default when a new object is created.

## Key terms

| Term | Meaning |
|---|---|
| Lookup relationship | A loose, optional relationship between two objects with no effect on deletion or security |
| Master-detail relationship | A relationship where the detail record's existence, ownership, and sharing are controlled by its master |
| Junction object | A custom object with two relationship fields used to model a many-to-many relationship |
| Hierarchical relationship | A special lookup type available only on the User object, used for management chains |
| Self-relationship | A relationship where an object relates to another record of the same object |

## Lab

A professional training company has Students and Courses. A Student can enroll in multiple Courses, and a Course has multiple enrolled Students. The business also wants to track, per enrollment, a completion status and a final grade. Design the relationship structure: name the junction object you'd create, state which two relationships it needs and to which objects, and list which fields belong on the junction object versus on Student or Course directly — and explain why each field belongs where you put it.

## Check yourself

Can you explain why a single lookup field cannot represent a many-to-many relationship, and describe the junction object pattern that solves it? Can you name one real enterprise scenario each for a self-relationship and for a hierarchical relationship?
