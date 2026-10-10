# Lesson 2 — Entity Relationship Diagrams

**Chapter 1 · Documenting Architecture · Lesson 2 of 17**

## What you'll learn

- The three core elements of an entity relationship diagram (ERD): entities, attributes, relationships
- How to read and draw crow's-foot cardinality notation
- How Salesforce's own object model — lookups, master-detail, and junction objects — maps onto standard ERD concepts
- Why Schema Builder alone isn't a documentation solution, even though it draws a live ERD of your org

## What an ERD actually shows

An **entity relationship diagram** is a structural map of data: what things (entities) exist, what facts (attributes) each thing holds, and how things relate to each other. In a Salesforce context, an entity is almost always an object — standard (Account, Contact, Opportunity) or custom (`Project__c`, `Warranty_Claim__c`). Attributes are fields. Relationships are the lookup and master-detail relationships connecting objects.

An ERD deliberately leaves out everything that isn't structure: no automation, no page layouts, no security. That narrowness is the point — it lets a reader understand the shape of the data model in one diagram, without the automation and UI layers that would otherwise clutter it. Lesson 7 and Lesson 12 build the fuller solution-design picture that an ERD is one input into.

## Entities, attributes, relationships — and cardinality

Draw each entity as a labeled box. List its key attributes inside or beside it — not every field, just the ones that matter for understanding the model (a primary identifying field, any field the relationship notation depends on, anything a reader would ask about). Draw a line between two entities for each relationship, and label that line with its **cardinality** — how many of one entity can relate to how many of the other.

The most common notation for cardinality is **crow's foot**: a single tick mark on a line means "one," and a three-pronged "crow's foot" means "many." Reading a line from Account to Contact with a single tick at the Account end and a crow's foot at the Contact end tells you: one Account can relate to many Contacts, and each Contact relates to exactly one Account. That is a one-to-many relationship — exactly what a standard Salesforce lookup models.

| Cardinality | Crow's-foot reading | Salesforce example |
|---|---|---|
| One-to-one | Single tick at both ends | A Contact and a single, exclusive User record tied one-for-one (uncommon; usually modeled as a lookup with a uniqueness rule) |
| One-to-many | Single tick on one end, crow's foot on the other | Account → Contact, Account → Opportunity |
| Many-to-many | Crow's foot at both ends | Students and Courses, modeled through a junction object |

## Mapping Salesforce relationship types onto the diagram

Salesforce doesn't give you a native "many-to-many" relationship type — it gives you lookup and master-detail, and you build many-to-many out of a **junction object** holding two master-detail (or lookup) relationships, one to each side. On an ERD, that junction object still appears as its own entity box, with a one-to-many line to each of the two objects it connects — the diagram shows the same two-hop structure the platform actually implements, rather than drawing a single misleading many-to-many line straight between the two base objects.

Lookup and master-detail are both one-to-many at the data-model level, but they're not interchangeable, and a careful ERD — or the accompanying object-model notes — should say which one is in play, because the difference changes real behavior: master-detail cascades delete of the parent to its children and lets roll-up summary fields work; lookup does neither. A reviewer reading only a plain line on the diagram can't tell the two apart, which is exactly why Lesson 8 covers adding a legend and annotation convention rather than relying on crow's-foot lines alone.

## Why Schema Builder isn't the documentation

Salesforce's native **Schema Builder** draws a live, interactive ERD-style view of your org's objects and relationships directly from metadata, and its Auto-Layout button will arrange that view automatically. It's a genuinely useful tool for *exploring* a data model. It is not, by itself, architecture documentation: it can't be annotated with the "why" behind a relationship, it doesn't version alongside a written decision record, and historically it has not offered a clean way to export a finished diagram for a document or a review board submission. Lesson 9 covers the diagramming tools architects actually use to produce a durable, exportable, annotatable ERD — often starting from what Schema Builder shows, but turning it into something that lives in the documentation set rather than only in the live org.

## Key terms

| Term | Meaning |
|---|---|
| Entity relationship diagram (ERD) | A diagram showing entities, their attributes, and the relationships between them |
| Entity | A distinct "thing" in the data model — an object, in Salesforce terms |
| Cardinality | How many instances of one entity can relate to how many instances of another |
| Crow's-foot notation | The most common ERD notation, using a tick for "one" and a three-pronged mark for "many" |
| Junction object | An object holding two relationships that implements a many-to-many relationship between two base objects |
| Schema Builder | Salesforce's native tool for viewing (not documenting) an org's live object model |

## Lab

Take a realistic scenario: a custom app tracks `Project__c` (master-detail child of Account), `Task__c` (lookup to `Project__c`, lookup to Contact as the assignee), and a many-to-many between `Project__c` and `Skill__c` implemented through a junction object `Project_Skill__c`. Draw this ERD by hand or in any tool, using crow's-foot notation, labeling each relationship line as lookup or master-detail. Then write one sentence per relationship explaining which Salesforce relationship type you chose and why (hint: think about what should happen to Tasks if a Project is deleted).

## Check yourself

Can you read a crow's-foot diagram and state its cardinality in plain English? Can you explain why a many-to-many relationship needs a junction object on both the Salesforce org and the ERD, rather than a single direct line? Can you say why lookup vs. master-detail matters even though both produce a one-to-many line on the diagram?
