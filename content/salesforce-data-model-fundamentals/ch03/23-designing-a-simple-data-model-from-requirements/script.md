# Script — Designing a Simple Data Model From Requirements

## Segment 1 (title)

Every lesson in this course has been one piece of a toolkit: objects, fields, five relationship types, Record Types, Schema Builder, Salesforce IDs. This closing lesson runs the whole toolkit once, start to finish, against one small requirement.

## Segment 2 (steps: the requirement)

Here's the ask: we run evening workshops. Each workshop has one instructor and many registered attendees. An attendee can register for more than one workshop. We need to know, per workshop, who's coming, and per attendee, which workshops they've signed up for. Three sentences — but every decision in this course shows up in how you answer them.

## Segment 3 (steps: find the nouns)

Step one: find the nouns, and check for reuse first. The nouns are Workshop, Instructor, and Attendee. Instructor and Attendee are both just people — Contact already covers them, name, email, phone, built in. That leaves exactly one concept with no standard-object match: Workshop. That's the only custom object this model needs.

## Segment 4 (steps: pick relationship types)

Step two: pick the relationship types. Workshop to Instructor is one-to-many — a Lookup from Workshop to Contact, loose enough that deleting an instructor's record doesn't force-delete every workshop they taught. Attendees are many-to-many, which needs a junction object — Workshop Registration, with two Master-Detail relationships, one to Workshop, one to Contact. Master-Detail here is deliberate: a registration means nothing without both sides.

## Segment 5 (screenshot: finished schema)

Laid out, the model is three objects and three relationships — Workshop looks up to Contact for the instructor, and Workshop Registration master-details to both Workshop and Contact at once, the same two-Master-Detail junction pattern Session Speaker demonstrated earlier in this chapter.

## Segment 6 (outro)

That's the whole exercise, and the whole course: find the nouns, check for reuse, pick relationship types by what they imply, confirm the shape on a diagram. Next up in the Salesforce Administrator path: Salesforce Administration — security, automation, and running an org day to day.
