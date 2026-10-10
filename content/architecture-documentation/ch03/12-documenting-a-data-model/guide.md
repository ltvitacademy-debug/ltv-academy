# Lesson 12 — Documenting a Data Model

**Chapter 3 · Practice · Lesson 12 of 17**

## What you'll learn

- How to assemble a complete data model documentation package, not just a single ERD
- The object inventory table: a companion artifact every ERD needs
- How to document field-level choices that an ERD's diagram can't show on its own
- A full worked example for a realistic multi-object Salesforce data model

## An ERD is necessary, not sufficient

Lesson 2 taught ERD notation. On its own, even a well-drawn ERD with a full legend (Lesson 8) can't carry everything a reader needs to actually build against or review a data model. A complete **data model documentation package** pairs the ERD with two things a diagram can't hold: an **object inventory table** describing each entity's purpose and ownership, and **field-level notes** explaining the non-obvious choices a diagram's lines and boxes can't show.

## The object inventory table

For every object in the model, list its purpose and a few structural facts a reader would otherwise have to go hunting for in Setup:

| Object | Type | Purpose | Relationship to parent |
|---|---|---|---|
| `Account` | Standard | The customer organization | — |
| `Project__c` | Custom | A billable engagement tied to one Account | Master-detail to Account |
| `Task__c` | Custom | A unit of work within a Project | Lookup to `Project__c`; Lookup to Contact (assignee) |
| `Skill__c` | Custom | A reusable skill tag (e.g., "Apex," "Data Migration") | — (standalone picklist-style reference object) |
| `Project_Skill__c` | Custom (junction) | Links Projects to the Skills they require | Master-detail to `Project__c`; Master-detail to `Skill__c` |

This table does work an ERD's boxes alone don't: it states in plain words what each object is *for*, not just what it's connected to, and it gives a reader a single scannable reference instead of requiring them to infer purpose from object and field names.

## Field-level notes: the detail a diagram can't carry

An ERD shows that `Task__c` has a lookup to `Project__c`. It can't show, on the diagram itself, *why* that relationship is a lookup rather than master-detail, or what happens to orphaned Tasks if a Project is deleted. Field-level notes capture exactly that:

- **Why lookup, not master-detail, for Task__c → Project__c?** Tasks should survive if a Project record needs to be deleted and re-created during a data cleanup, since historical time entries on the Task matter for billing even after the Project wrapper is gone — master-detail's cascading delete would destroy that history.
- **Why master-detail for Project_Skill__c → both parents?** The junction object has no independent meaning without both its parent Project and parent Skill; if either side is deleted, the junction record logically ceases to mean anything, so cascading delete is the correct, intended behavior here — the opposite reasoning from the Task__c case above.
- **Required field note:** `Task__c.Assignee__c` (lookup to Contact) is deliberately not required at the database level, because Tasks are sometimes created before an assignee is known; a validation rule, not a required-field setting, enforces that an assignee must exist before a Task can move to "In Progress" status.

Notice the two relationship decisions above reach opposite conclusions (lookup to preserve history vs. master-detail to enforce dependent existence) using the same underlying reasoning skill: asking what should happen on delete, and letting the real business answer — not a default habit — decide the relationship type. That's exactly the kind of reasoning an ERD's lines can't show and field-level notes exist to capture.

## Assembling the package

A complete data model documentation package, ready to sit inside an SDD's data model section (Lesson 7), has three parts in this order: the ERD itself (with legend, from Lesson 8), the object inventory table, and the field-level notes for any relationship or field whose reasoning isn't obvious from the diagram alone. A reader should be able to get the shape from the ERD, the purpose of each piece from the inventory table, and the reasoning behind any non-obvious choice from the notes — without needing to ask the original architect.

## Key terms

| Term | Meaning |
|---|---|
| Data model documentation package | The combination of an ERD, an object inventory table, and field-level notes that together fully document a data model |
| Object inventory table | A table listing each object's type, purpose, and relationship to its parent |
| Field-level notes | Written explanations of non-obvious relationship or field choices that a diagram's lines can't show |

## Lab

A nonprofit's Salesforce org tracks volunteer shifts: `Volunteer__c` (custom object, standalone), `Shift__c` (custom, lookup to a `Program__c` object representing which program the shift supports), and `Shift_Signup__c` (junction object, master-detail to both `Volunteer__c` and `Shift__c`, recording that a specific volunteer signed up for a specific shift). Write the full three-part package: draw or describe the ERD with legend, write the object inventory table for all four objects, and write field-level notes explaining why `Shift__c` uses a lookup (not master-detail) to `Program__c`, and why `Shift_Signup__c` uses master-detail to both its parents.

## Check yourself

Can you name the three parts of a complete data model documentation package and what each one adds that the others can't? Can you explain, using the Task__c example, why "what should happen on delete" is the real question behind choosing lookup vs. master-detail, rather than a fixed rule of thumb? Can you say why an object inventory table's "purpose" column matters even when the ERD already shows the object's name and relationships?
