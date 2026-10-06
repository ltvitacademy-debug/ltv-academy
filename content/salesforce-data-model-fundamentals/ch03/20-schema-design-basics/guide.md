# Schema Design Basics

**Chapter 3 · Relationships and Schema · Lesson 20 of 23**

Every piece from Chapter 1 through Lesson 19 is now on the table: objects, fields, the five
relationship types, and Record Types. This lesson doesn't add a new building block — it's about the
judgment calls you make when you start combining them into an actual schema.

## What you'll learn

- Why "can I build this?" is the wrong first question — "should I?" comes first
- A short list of warning signs that a schema is heading toward trouble
- How field and object naming consistency pays off long after the build is done

## Start from the business process, not the object palette

The single biggest schema-design mistake is reaching for objects and fields before the process they
represent is actually understood. A well-designed schema is a direct translation of how the business
already works — which records relate to which, what has to exist before what, who owns what — not a
collection of objects that merely seemed useful. Lesson 23 walks through this translation step by
step; this lesson is about the principles that translation leans on.

## Reuse before you build

Chapter 1 covered how deep Salesforce's standard object set already goes — Account, Contact, Lead,
Opportunity, Case, and more, each with fields and relationships already wired up. Before creating a
custom object, check whether a standard object (possibly with a Record Type, from Lesson 19, or a
few custom fields from Chapter 2) already fits. Every unnecessary custom object is more schema to
document, secure, and explain to the next admin who inherits the org — including, eventually, you.

## Watch the relationship type, not just the connection

Lessons 16 through 18 weren't just vocabulary — the relationship type you pick has real consequences
that are hard to undo later. Master-Detail cascades deletes and locks in sharing; Lookup doesn't.
Picking Master-Detail because a Roll-Up Summary would be convenient, without considering that
deleting the parent now takes every child with it, is the kind of decision that looks fine in a demo
and causes a support ticket six months later.

## A schema with too many relationships fanning out from one object is a warning sign

Schema Builder makes this visible fast: an object with connector lines radiating to a dozen others is
either a genuinely central concept (Account often legitimately is one) or a sign that unrelated
concerns got bolted onto a single object instead of being modeled as their own thing — or, per
Lesson 17, connected properly through a junction object.

![A Schema Builder canvas showing one User object with many relationship lines fanning out to other objects — exactly the kind of dense, central-object pattern worth a second look when it shows up somewhere less obviously central than User.](/courses/salesforce-data-model-fundamentals/ch03/20-schema-design-basics/schema-builder-dense-object.png)

When you see this pattern on an object that *isn't* naturally central to the business, it's worth
asking whether every one of those relationships truly belongs there.

## Naming consistency is a design decision, not a formatting preference

A field called "Close Date" on one object and "Closed On" on another, meaning the same thing, costs
real time every time someone writes a report or a formula referencing both. Decide a naming
convention — plural or singular object names, consistent date-field suffixes, consistent
abbreviations — before the schema grows past a handful of objects, because renaming later touches
every formula, report, and integration that already references the old name.

## Key terms

| Term | Meaning |
|---|---|
| Schema | The overall structure of an org's objects, fields, and relationships |
| Reuse | Preferring an existing standard object (with Record Types or custom fields) over a new custom object |
| Naming convention | A consistent pattern for object and field names, decided early and applied schema-wide |

## Check yourself

You're asked to track "Partner Companies" that place orders. Before creating a brand-new custom
object, what's the first standard object you'd check, and what two tools from this chapter might let
it do the job without a new object at all?
