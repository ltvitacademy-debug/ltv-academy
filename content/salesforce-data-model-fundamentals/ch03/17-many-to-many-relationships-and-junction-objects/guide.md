# Many-to-Many Relationships and Junction Objects

**Chapter 3 · Relationships and Schema · Lesson 17 of 23**

Lesson 16 ended with Favorite holding both a Lookup and a Master-Detail at once — one object, two
parents. That combination wasn't an accident. It's the exact pattern Salesforce uses to model a
relationship neither Lookup nor Master-Detail can represent on its own: many-to-many.

## What you'll learn

- Why a single Master-Detail field can only ever connect a child to one parent
- What a junction object is, and the two fields that make it work
- How to read a many-to-many pattern straight off a Schema Builder diagram

## The problem: one child, two parents

A standard object can hold many Lookup or Master-Detail fields, but each one of those fields still
only points to a single parent record. That's fine for one-to-many — many Contacts to one Account —
but it breaks down the moment two objects each need to relate to *many* records of the other. A
Session can have many Speakers, and a Speaker can speak at many Sessions. Neither object's own
record can hold "many" in a single relationship field.

## The fix: a junction object with two Master-Details

The standard fix is a **junction object** — a custom object that exists purely to connect two other
objects, built with **two Master-Detail relationships**, one to each side. Session Speaker, below, is
exactly that: it carries a Master-Detail to Session and a separate Master-Detail to Speaker.

![Session Speaker junction object with two Master-Detail relationships, one to Session and one to Speaker, shown with a legend distinguishing Lookup from Master-Detail lines.](/courses/salesforce-data-model-fundamentals/ch03/17-many-to-many-relationships-and-junction-objects/session-speaker-junction-legend.png)

Each Session Speaker record represents one pairing — one Speaker at one Session. Add ten Speakers to
a Session and you get ten Session Speaker records, not ten new fields on Session. That's what lets
either side scale to "many" without redesigning the object itself.

## Favorite and Offer, revisited

Lesson 16's Favorite object fits the same pattern once Offer is added alongside it. Both Favorite and
Offer are junction-style objects linking Contact to Property — Favorite tracks which contacts like
which properties, Offer tracks which contacts bid on which properties. A Contact can have many
Favorites and many Offers; a Property can be favorited and offered on by many Contacts.

![Schema Builder showing Favorite and Offer, each with a Master-Detail(Property) field connecting two many-to-many relationships back to Contact and Property.](/courses/salesforce-data-model-fundamentals/ch03/17-many-to-many-relationships-and-junction-objects/schema-builder-junction-object.png)

## What the junction record itself looks like

A junction object is still a normal object — it shows up in Object Manager with its own fields, and
in this case the generated Master-Detail field even carries the parent's name in its type.

![Object Manager detail view of a Cookie Scent junction object, whose Property field is typed Master-Detail(Property).](/courses/salesforce-data-model-fundamentals/ch03/17-many-to-many-relationships-and-junction-objects/cookie-scent-object-manager.png)

Because a junction object uses two real Master-Detail fields, it also means two cascading deletes:
delete a Property and every junction record pointing at it — Favorite, Offer, whatever you've
built — goes with it, same as any other Master-Detail child.

## Seeing it on the other side

The relationship also surfaces on the parent's own record — a junction-object related list looks
exactly like any other related list, which is the whole point: to end users, many-to-many just looks
like "this record has a list of related things."

![A Job Posting Site record's related list of Job Postings — the user-facing result of a junction object connecting Job Posting Site to Position behind the scenes.](/courses/salesforce-data-model-fundamentals/ch03/17-many-to-many-relationships-and-junction-objects/job-posting-site-related-list.png)

## Key terms

| Term | Meaning |
|---|---|
| Many-to-many relationship | A connection where each record on either side can relate to multiple records on the other side |
| Junction object | A custom object with two Master-Detail relationships, one to each side being connected |
| Junction record | One row on the junction object representing a single pairing between the two related records |

## Check yourself

Why can't a single Lookup or Master-Detail field, by itself, model a many-to-many relationship — and
why does the junction object need *two* Master-Detail fields rather than one Master-Detail and one
Lookup?
