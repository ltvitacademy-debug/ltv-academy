# Schema Builder

**Chapter 3 · Relationships and Schema · Lesson 21 of 23**

Every relationship diagram in this chapter so far has actually been a Schema Builder screenshot. This
lesson finally introduces the tool itself — where to find it, what it shows, and why it's worth
opening before you touch Object Manager at all when you're trying to understand how an org fits
together.

## What you'll learn

- Where Schema Builder lives in Setup, and how fast it is to open
- What a Schema Builder canvas actually shows, object by object
- How Schema Builder compares to reading the same information in Object Manager

## Finding it

Schema Builder lives in Setup like everything else in this chapter — type its name into the Quick
Find box and it's one click away, no deeper navigation required.

![Setup's Quick Find box with "schema builder" typed in, showing the Schema Builder result under Objects and Fields.](/courses/salesforce-data-model-fundamentals/ch03/21-schema-builder/schema-builder-quick-find.png)

## What the canvas shows

Once it opens, Schema Builder lets you choose which objects to display — standard, custom, or
both — and lays them out as cards on a visual canvas. Each card lists every field on that object,
with its data type, and every relationship is drawn as a connecting line between two cards.

![A Schema Builder canvas with Contact, Favorite, Offer, and Property displayed — each card listing its fields and data types, with Lookup and Master-Detail lines connecting them.](/courses/salesforce-data-model-fundamentals/ch03/21-schema-builder/schema-builder-canvas.png)

This is the same Favorite/Offer/Property example Lessons 16 and 17 used to explain Lookup,
Master-Detail, and junction objects — proof that everything in those lessons was visible on one
screen the whole time, not scattered across separate Object Manager pages.

A busier object tells the same story at a larger scale. User, below, fans out to many other objects
at once — exactly the kind of density Lesson 20 flagged as worth a second look on anything *less*
central than User itself.

![A Schema Builder canvas centered on User, with many relationship lines fanning out to other objects including Suggestion.](/courses/salesforce-data-model-fundamentals/ch03/21-schema-builder/schema-builder-second-example.png)

## Schema Builder vs. Object Manager

Object Manager is where you actually *create* fields and relationships — Schema Builder is read-first
by design, built for understanding structure rather than editing it field by field. The same object
detail Object Manager shows as a scrollable list of rows, Schema Builder shows as one compact card.

![Object Manager's detail view for a custom object, with its fields listed in a card layout that mirrors how the same object appears on a Schema Builder canvas.](/courses/salesforce-data-model-fundamentals/ch03/21-schema-builder/schema-builder-vs-object-manager.png)

Object Manager still answers "what are this object's permissions, page layouts, and settings."
Schema Builder answers a different question fast: "how does this object connect to everything else" —
which is exactly the question worth asking before any schema change, including the one Lesson 23
walks through end to end.

## Key terms

| Term | Meaning |
|---|---|
| Schema Builder | Setup's visual canvas showing objects, fields, and relationships as connected cards |
| Canvas | The draggable, zoomable workspace where selected objects are laid out |
| Object card | Schema Builder's compact representation of one object's fields and data types |

## Check yourself

You've inherited an org and need to understand how five custom objects relate before making a
change. Would you start in Object Manager or Schema Builder, and why?
