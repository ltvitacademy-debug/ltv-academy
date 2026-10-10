# Lesson 5 — Data Modeling Patterns

**Chapter 1 · Enterprise Data Modeling · Lesson 5 of 26**

## What you'll learn

- Four recurring data modeling patterns enterprise architects reuse across projects: junction, hierarchy, polymorphic lookup, and event-log
- Why recognizing a pattern early saves you from reinventing (and misdesigning) a solved problem
- The real tradeoff each pattern makes, not just the mechanics of building it
- How to recognize which pattern a new requirement is actually asking for

## Why patterns matter

Most enterprise data modeling problems aren't novel. A new requirement almost always turns out to be a variation on a small number of recurring shapes. The value of knowing these patterns isn't just speed — it's that each one comes with known tradeoffs already worked out, so you're not discovering the hard way, mid-project, that your custom one-off design has a problem the standard pattern already solved.

## Pattern 1: the junction object (many-to-many)

Covered in Lesson 3: when two objects can each relate to many of the other, a junction object with two relationship fields represents each pairing as its own record. The pattern's real value beyond "it's the only way to model many-to-many" is that it gives you a natural home for relationship-specific data — a status, a date, a role — that belongs to the pairing itself and not to either side.

**Recognize it when:** the requirement contains "can have multiple" on both sides of the sentence. "A Contact can attend multiple Events, and an Event can have multiple Contacts" is a junction pattern; "a Contact can have multiple Opportunities" is not (that's a plain one-to-many).

## Pattern 2: the hierarchy (self-relationship)

Also introduced in Lesson 3: an object relates to another record of the same object, most commonly to represent organizational or structural nesting — Account's standard Parent Account field being the canonical example, used to roll corporate subsidiaries up into a parent for reporting without duplicating data.

**Recognize it when:** the requirement describes nesting or containment within a single kind of thing — "this Account is part of that Account's corporate family," "this Case is a duplicate of that Case," "this Territory rolls up into that Territory."

**The tradeoff:** hierarchy depth and breadth both have practical costs. A very deep or very wide hierarchy makes rollup reporting and hierarchy-based sharing more expensive to compute, and makes the structure harder for users to navigate. A hierarchy pattern should be scoped to the depth the business actually needs, not modeled as infinitely recursive by default.

## Pattern 3: the polymorphic lookup

Some standard Salesforce fields can point to more than one kind of object — the Task object's WhoId field, for example, can reference either a Lead or a Contact, and WhatId can reference many different object types depending on context. This is a genuinely different mechanic from a typical custom lookup, which is always bound to exactly one target object at creation time. On custom objects, Salesforce doesn't give you a true polymorphic custom lookup field the way some other platforms do; the common workaround is either a set of separate lookup fields (one per possible target object, with automation enforcing that only one is populated) or a design that routes through a common parent object instead.

**Recognize it when:** the requirement says "this record could relate to one of several different kinds of things" — a Note that could be attached to an Account, a Contact, or an Opportunity, for instance.

**The tradeoff:** true polymorphism (available on specific standard fields) is more elegant but platform-constrained; the custom-object workaround is more flexible but adds complexity (multiple lookup fields, validation to keep them mutually exclusive) that has to be deliberately designed and maintained.

## Pattern 4: the event log (append-only history)

Some data shouldn't be edited after creation — it should only ever be appended to, forming a chronological record. A Call_Log__c, a Status_Change__c, or an Audit_Entry__c object are all instances of this pattern: each record captures a point-in-time fact, and the "current state" is derived by looking at the most recent entry rather than by editing a single mutable field.

**Recognize it when:** the business says a version of "we need to know what happened, in order, over time" rather than just "we need to know the current value." This is a different instinct from immediately reaching for a single field that gets overwritten on every change.

**The tradeoff:** an event-log pattern produces more records over time than a mutable-field design, and reconstructing "current state" from the log requires either a query sorted by date or a roll-up/automation that keeps a denormalized "latest value" field in sync (a pattern that previews what Lesson 6 covers in depth: when denormalizing on purpose is the right call).

## Using patterns without forcing them

The discipline here isn't to force every new requirement into one of these four boxes. It's to recognize, within the first few minutes of a requirements conversation, which shape you're likely looking at — because that recognition tells you which known tradeoffs you're about to inherit, before you've written a single field.

## Key terms

| Term | Meaning |
|---|---|
| Junction object pattern | Modeling a many-to-many relationship with a custom object holding two relationship fields |
| Hierarchy pattern | A self-relationship used to represent nesting or containment within one object type |
| Polymorphic lookup | A relationship field capable of pointing to more than one kind of target object |
| Event-log pattern | An append-only object design where history is captured as a sequence of records rather than overwritten in place |

## Lab

A field-services company tracks Equipment units. They want to: (a) record every time a unit is serviced, with notes and a technician name, going back indefinitely; (b) represent that some Equipment is a sub-component installed inside other Equipment (a pump installed inside a larger assembly); and (c) let a single Service_Note__c optionally attach to either an Equipment record or a Customer_Site__c record, never both. Identify which of the four patterns in this lesson applies to each of the three requirements, and name the specific tradeoff each pattern choice commits the company to.

## Check yourself

Can you name all four patterns in this lesson and give a one-sentence trigger phrase for recognizing each one in a requirements conversation? Can you explain why Salesforce's lack of a true custom polymorphic lookup field forces a design tradeoff that a standard field like Task.WhoId doesn't have to make?
