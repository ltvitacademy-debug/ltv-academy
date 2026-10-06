# Designing a Simple Data Model From Requirements

**Chapter 3 · Relationships and Schema · Lesson 23 of 23**

Every lesson in this course has been one piece of a toolkit: objects, fields, five relationship
types, Record Types, Schema Builder, Salesforce IDs. This closing lesson runs the whole toolkit once,
start to finish, against one small, realistic requirement.

## What you'll learn

- How to pull objects and relationships straight out of a plain-English requirement
- Where a brand-new custom object is justified, and where reuse (Lesson 20) wins instead
- How the finished model reads back as a Schema Builder diagram

## The requirement

*"We run evening workshops. Each workshop has one instructor and many registered attendees. An
attendee can register for more than one workshop. We need to know, per workshop, who's coming — and
per attendee, which workshops they've signed up for."*

Three sentences, but every decision in this course shows up in how you answer them.

## Step 1: find the nouns, and check for reuse first

The nouns are **Workshop**, **Instructor**, and **Attendee**. Lesson 20's first rule was to reuse a
standard object before building a custom one — so before creating anything, ask whether Contact
already covers Instructor and Attendee. It does: both are just people, and Contact already has name,
email, and phone fields built in. That leaves exactly one concept with no standard-object match:
**Workshop** itself. That's the only custom object this model actually needs.

## Step 2: pick the relationship types

Workshop needs a relationship to its Instructor — one Workshop, one Instructor, but one Instructor
can teach many Workshops. That's a standard one-to-many, modeled as a **Lookup** from Workshop to
Contact (Lesson 16): loose enough that deleting an Instructor's Contact record shouldn't be forced to
delete every Workshop they ever taught.

Attendees are different: a Workshop has many Attendees, and an Attendee can register for many
Workshops. That's many-to-many — which Lesson 17 established can't be modeled with a single
relationship field at all. It needs a **junction object**, Workshop Registration, holding two
Master-Detail relationships: one to Workshop, one to Contact. Master-Detail here is deliberate, not
just convenient — a registration record has no meaning without both its Workshop and its Attendee, so
the tight, cascading bond is the correct choice, not merely the available one.

## Step 3: read it back on a Schema Builder canvas

Laid out, the model is three objects and three relationships: Workshop looks up to Contact (the
instructor), and Workshop Registration master-details to both Workshop and Contact (the attendee)
at once — the exact two-Master-Detail junction pattern Lesson 17 walked through with Session Speaker.

![A Schema Builder-style canvas showing the general shape this model takes once built: a junction object with two Master-Detail relationships connecting two other objects — the same pattern this lesson's Workshop Registration object follows.](/courses/salesforce-data-model-fundamentals/ch03/23-designing-a-simple-data-model-from-requirements/finished-schema-reference.png)

That's the whole exercise: find the nouns, check for reuse, pick a relationship type for each
remaining connection using what deletion and sharing behavior it implies, and confirm the shape makes
sense back on the canvas.

## Where the rest of the toolkit would extend it

Nothing in the requirement calls for them, but it's worth naming where the rest of this course would
plug in if the requirement grew: a **Record Type** on Workshop if "In-Person" and "Virtual" sessions
needed different page layouts (Lesson 19); a **Roll-Up Summary** on Workshop counting registrations,
since Workshop Registration is already Master-Detail (Lesson 16); and Schema Builder itself as the
tool to sanity-check all of it before shipping a change.

## Key terms

| Term | Meaning |
|---|---|
| Requirement | A plain description of what the business needs the data model to support |
| Reuse check | Confirming whether a standard object already covers a requirement's noun before building custom |
| Model walkthrough | Translating requirements into objects, then relationship types, then verifying on a diagram |

## Check yourself

Instead of "an Attendee can register for more than one Workshop," suppose the requirement said "each
Attendee can only ever attend one Workshop." Would Workshop Registration still need to be a junction
object — and if not, what would replace it?

---

Course complete. The next course in the Salesforce Administrator path, **Salesforce Administration**,
picks up from here — moving from how data is modeled to how it's actually administered: security,
automation, and the day-to-day work of running an org.
