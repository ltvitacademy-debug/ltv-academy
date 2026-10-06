# Lesson 5 — Planning the Build

**Chapter 1 · Design · Lesson 5 of 20**

## What you'll learn

- Why build order matters even when every requirement is already designed
- The exact lesson-by-lesson build sequence for Chapters 2–4, and why each
  step has to come before the next
- How to spot a dependency before it blocks you mid-build
- How to close out Chapter 1 and hand off cleanly into Chapter 2

## Why order matters

You now have two finished designs from Lessons 3 and 4: a data model and
a security model. It's tempting to jump straight into Setup and start
clicking — but the *order* you build things in is its own decision, and
getting it wrong creates real rework. You can't set sharing rules on an
object that doesn't exist yet. You can't build a Flow against fields that
haven't been created. You can't load sample data into custom objects that
aren't there.

This lesson plans that order once, for the rest of the capstone, so every
later lesson knows exactly what it can assume already exists.

## The dependency chain

Three dependencies drive almost the entire build order:

1. **Objects before automation.** Every Flow, validation rule, and
   approval process in Chapter 3 references specific fields on specific
   objects — so every object and field from Lesson 3's data model has to
   exist first.
2. **Data model before security implementation.** Sharing rules in
   Chapter 3 are written against real objects (Installation Project,
   Service Contract) — Lesson 11 can't implement the Lesson 4 security
   design until those objects exist.
3. **A working org before sample data and reports.** Chapter 4's reports,
   dashboards, and sample data all assume the objects, fields, page
   layouts, and automation already behave correctly.

## The build sequence

| Order | Lesson(s) | What gets built | Depends on |
|---|---|---|---|
| 1 | 6 | Accounts and Contacts — fields, record types, page layout basics | Lesson 3 data model |
| 2 | 7 | Leads, with a lead-conversion mapping to Account/Contact/Opportunity | Lesson 6 (Accounts/Contacts must exist to convert into) |
| 3 | 8 | Opportunities with Cascade's five named stages and Products | Lesson 7 (conversion creates Opportunities) |
| 4 | 9 | The two custom objects: Installation Project, Service Contract | Lesson 8 (Installation Project looks up to Opportunity) |
| 5 | 10 | Page layouts and a Lightning App Page tying it together | Lessons 6–9 (every object referenced must already exist) |
| 6 | 11 | The Lesson 4 security model implemented for real: roles, profiles, sharing rules | Lesson 9 (sharing rules reference Installation Project and Service Contract) |
| 7 | 12–13 | Flows and validation rules automating real Cascade processes | Lesson 11 (automation must respect the security model, not fight it) |
| 8 | 14 | An approval process for a real approval scenario | Lessons 12–13 (approval processes often trigger from or alongside Flow logic) |
| 9 | 15 | Reports and a dashboard | Lesson 14 (every prior object and field must exist to report on) |
| 10 | 16 | Clean sample data loaded | Lesson 15 (reports need real data to validate against) |
| 11 | 17–20 | Testing, documentation, presenting, retrospective | Everything above |

## Reading this as a Gantt, not a checklist

Notice that Chapter 2 (Lessons 6–10) is entirely sequential — each lesson
builds directly on the last. Chapter 3's automation lessons (12–14) could
technically happen in a different internal order, but all of them require
Lesson 11's security model to already be in place, so automation never
gets built against an unfinished security design. Chapter 4 is the only
chapter that's purely additive — nothing in it changes the object model,
it just uses what already exists.

## Closing out Chapter 1

Before moving to Chapter 2, you should have three concrete things, not
just an idea in your head:

- The Lesson 3 data model diagram (objects, fields, relationships)
- The Lesson 4 security model (role hierarchy, profiles, OWD, sharing
  rules)
- This lesson's build sequence, pinned somewhere you'll keep checking it

Chapter 2 assumes all three already exist. If any of them still feels
unsettled, this is the moment to go back and fix it — not mid-build.

## Key terms

| Term | Meaning |
|---|---|
| Dependency | A build step that cannot happen correctly until an earlier step is finished |
| Build sequence | The ordered plan for turning a design into a working org |
| Rework | Redoing already-built configuration because something it depended on changed |

## Lab

Take the 11-row build sequence table and copy it into your capstone
document as a literal checklist, right under the Lesson 1 Definition of
Done. You'll check off a row as you finish the corresponding lesson.

## Check yourself

- Why must Lesson 9's custom objects be built before Lesson 11's sharing
  rules?
- Which chapter is purely additive, and why does that matter for build
  order?
- Name one piece of rework that skipping this planning lesson could cause.
