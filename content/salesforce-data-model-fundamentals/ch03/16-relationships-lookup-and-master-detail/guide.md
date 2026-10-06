# Relationships: Lookup and Master-Detail

**Chapter 3 · Relationships and Schema · Lesson 16 of 23**

Chapter 2 mentioned relationship fields in passing — Lesson 9 grouped Lookup Relationship and
Master-Detail Relationship together as one family, and Lesson 13 leaned on master-detail to explain
Roll-Up Summary fields. This lesson finally gives both types their own full treatment: what each
one actually does, and — more importantly — when a loose connection is right and when a tight one
is.

## What you'll learn

- What a Lookup Relationship connects, and what it looks like once it's in place
- What makes Master-Detail genuinely tighter than a Lookup, not just a different icon
- How to configure the optional Lookup Filter step, and what it's actually for

## Lookup: a loose, two-way reference

A **Lookup Relationship** links two objects so a record on one can reference a record on the other
— "look it up." The classic example: a Contact looks up to an Account. That reference shows up on
the parent's Related list automatically.

![An Account record's Related tab, showing two Contacts — Sean Forbes and Rose Gonzalez — connected through a lookup relationship.](/courses/salesforce-data-model-fundamentals/ch03/16-relationships-lookup-and-master-detail/account-related-contacts.png)

Lookup is deliberately loose: a Contact can exist with no Account at all, deleting the Account
doesn't delete its Contacts, and most lookup-related child objects keep their own tab and behave as
stand-alone records the rest of the time.

## Master-Detail: tight, with real consequences

**Master-Detail Relationship** is a stricter bond. The detail (child) record can't exist without
its master (parent) — deleting the master deletes every detail record with it. The master also
controls the detail's sharing: whoever can see the master record can see the related detail
records, with no separate sharing rule needed on the detail object. This is also the relationship
type Lesson 13's Roll-Up Summary fields depend on — only master-detail gives Salesforce the
structural guarantee needed to maintain a live aggregate.

Schema Builder makes the distinction visible at a glance: a Lookup line is drawn differently from a
Master-Detail line, and the field itself is labeled with its relationship type right on the card.

![Schema Builder showing a Favorite object with a Lookup(Contact) field and a Master-Detail(Property) field — two different relationship types on the same object.](/courses/salesforce-data-model-fundamentals/ch03/16-relationships-lookup-and-master-detail/schema-builder-master-detail.png)

Notice Favorite has *both* kinds at once: a loose Lookup to Contact, and a tight Master-Detail to
Property. That combination — one object, two relationships to two different parents — is exactly
what Lesson 17 builds into a full many-to-many pattern.

## The optional Lookup Filter step

Creating either relationship type offers an optional **Lookup Filter** step: a condition that
narrows which records a user is even allowed to pick in the lookup, rather than showing every
record on the related object.

![A Lookup Filter on a Case's Contact lookup, restricting choices to contacts whose Account matches the Case's own Account.](/courses/salesforce-data-model-fundamentals/ch03/16-relationships-lookup-and-master-detail/lookup-filter-config.png)

This example keeps a support rep from accidentally linking a Case to a Contact at the wrong
company — the filter compares Contact: Account ID to Case: Account ID and only shows matches.

## Key terms

| Term | Meaning |
|---|---|
| Lookup Relationship | A loose reference between two objects; neither record depends on the other to exist |
| Master-Detail Relationship | A tight bond where the detail record is deleted with its master and inherits its sharing |
| Lookup Filter | An optional condition narrowing which records appear as valid choices in a lookup field |

## Check yourself

A detail record's related master is deleted. What happens to the detail record under a Master-
Detail relationship — and would the answer be different if the relationship were a Lookup instead?
