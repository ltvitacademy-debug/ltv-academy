# Object Relationships

Chapter 4 taught you to read one object at a time — standard fields, custom fields, what a
picklist or a formula field means. That's necessary, but it's not sufficient. Almost no
useful question an analyst answers lives inside a single object. "Which accounts had a deal
close this quarter" needs Accounts *and* Opportunities. "Which contacts attended which
campaigns" needs Contacts *and* Campaigns, plus something connecting the two. This chapter is
about how objects connect to each other — the Salesforce data model — because that's exactly
what SOQL joins operate on in the next course.

## What you'll learn

- What a relationship field actually is, underneath Salesforce's UI
- The three relationship shapes you'll meet in real orgs: Lookup, Master-Detail, and
  many-to-many via a junction object
- Why this is the direct foundation for SOQL joins, not a side topic

## A relationship field is a foreign key, with opinions

Underneath the point-and-click UI, a Salesforce relationship field is the same idea SQL
Server calls a foreign key: a field on one object that stores the ID of a record on another
object. An Opportunity has an `AccountId` field pointing at an Account. A Contact has an
`AccountId` field pointing at an Account. That's the whole mechanism — one record referencing
another by ID.

What makes Salesforce different from a plain foreign key is that the *type* of relationship
field you choose changes real behavior: what happens on delete, how security is inherited,
and whether roll-up summaries are even possible. Salesforce gives you a small number of
relationship types, each with real, non-negotiable rules attached.

## The three relationship shapes

- **Lookup relationship** — a loose, optional link between two objects. A Contact can point
  at an Account, but nothing forces it to, and deleting the Account doesn't force-delete the
  Contact by default. Covered in full in the next lesson.
- **Master-Detail relationship** — a tight, required link. The "detail" record cannot exist
  without its "master" parent, deleting the parent cascades and deletes the children, and the
  detail record inherits the parent's sharing/security settings. Also covered in the next
  lesson.
- **Many-to-many, via a junction object** — Salesforce has no native "many-to-many" field
  type. When you need many Contacts related to many Campaigns, you build a custom object in
  the middle with two Master-Detail relationships, one to each side. This pattern — the
  junction object — gets its own lesson (Lesson 23) because it's genuinely common in real
  orgs.

## Why this matters before you write a single SOQL query

The next course in this path teaches SOQL, and SOQL joins across objects using exactly these
relationship fields — a child-to-parent SOQL query walks a Lookup or Master-Detail field, and
a parent-to-child query walks the same relationship in reverse, using a Salesforce-specific
naming convention you'll meet by name later (a relationship name, not just an object name).
None of that syntax will make sense if you don't already know, conceptually, that an
Opportunity has an `AccountId` pointing at one Account, and that one Account can have many
Contacts and many Opportunities pointing back at it. This chapter builds that mental model
first, deliberately, before SOQL asks you to write it as a query.

## Key terms

| Term | Meaning |
|---|---|
| Relationship field | A field on one object storing the ID of a related record on another object |
| Lookup relationship | A loose, optional relationship — covered in Lesson 22 |
| Master-Detail relationship | A tight, required relationship with cascade delete — covered in Lesson 22 |
| Junction object | A custom object with two Master-Detail relationships, implementing many-to-many — covered in Lesson 23 |

## Check yourself

Why can't Salesforce represent a many-to-many relationship (like Contacts to Campaigns) with
a single relationship field the way it represents Opportunity-to-Account? What has to exist
instead?
