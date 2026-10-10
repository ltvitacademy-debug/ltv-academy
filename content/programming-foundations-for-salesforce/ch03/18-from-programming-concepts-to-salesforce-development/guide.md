# Lesson 18 — From Programming Concepts to Salesforce Development

**Chapter 3 · Developer Habits · Lesson 18 of 18**

## What you'll learn

- A full recap of how the seventeen lessons in this course connect to each other
- Which concepts transfer directly, unchanged, into real Apex
- What's genuinely new and Salesforce-specific, waiting in the courses ahead
- How to think about your own readiness for the next step in this path

## What you actually learned in this course

This course never required a Salesforce org, because its real subject was never Salesforce — it was programming itself, using Apex's own syntax as the vehicle. Looking back across all seventeen lessons as one connected whole:

**Chapter 1** built the absolute foundation: what programming is at all (Lesson 1), how code actually executes (Lesson 2), how to store and type values (Lesson 3), how to compute and compare them (Lesson 4), and how to make a program's behavior depend on those values — branching (Lesson 5) and repeating (Lesson 6).

**Chapter 2** built structure on top of that foundation: packaging logic into reusable methods (Lesson 7), packaging data and behavior together into classes and objects (Lesson 8), handling many values at once with collections (Lesson 9), working with text specifically (Lesson 10), handling things going wrong without crashing (Lesson 11), and the systematic mindset for figuring out *why* something went wrong in the first place (Lesson 12).

**Chapter 3** built the habits around all of that: finding answers you don't already know (Lesson 13), tracking how code changes over time (Lesson 14), writing code for other humans to read (Lesson 15), checking your own work deliberately rather than hoping it's right (Lesson 16), and knowing where code actually gets written and run (Lesson 17).

## What transfers directly, unchanged

Nearly everything in this course is **not** Apex-specific — it's general programming knowledge that happens to have been taught through Apex's syntax. Variables, types, operators, conditions, loops, functions, classes, collections, exceptions, debugging method, clean naming, DRY, version control concepts, and test-case thinking all transfer directly and unchanged into real Apex work, because that's genuinely what they are in real Apex — not a simplified preview of something that works differently later.

## What's genuinely new ahead

What this course deliberately did *not* cover is the Salesforce-specific layer that sits on top of these general concepts, reserved for the dedicated courses ahead in this path:

- **Triggers** — Apex code that runs automatically in response to database events (a record being inserted, updated, or deleted), rather than being called directly the way every method in this course was.
- **SOQL and DML** — Salesforce's own query language and the operations (insert, update, delete) for actually reading and writing records in the Salesforce database.
- **Governor limits** — strict, platform-enforced ceilings on resource usage (how many queries, how much CPU time) specific to Salesforce's multi-tenant architecture, mentioned only in passing in Lesson 17 and never given invented numbers here deliberately.
- **Salesforce DX, scratch orgs, and real deployment workflows** — the full version of what Lesson 14's version control concepts and Lesson 17's tooling overview were setting up.
- **Lightning Web Components** and the broader Salesforce platform's UI layer, which Apex frequently serves as the backend for.

## Assessing your own readiness

Before moving to the next course in this path, a genuinely honest self-check matters more than rushing forward. Can you read an unfamiliar block of Apex-style code — one with variables, a loop, a conditional, and a method call — and correctly predict what it does, line by line, without running it? Can you spot, by eye, an off-by-one mistake in a loop, or a misplaced condition that makes a later branch unreachable? Can you write a short method of your own, with the right parameters and return type, to solve a small, clearly-stated problem? If any of those feel shaky, revisiting that specific lesson now costs far less than discovering the gap partway through a lesson that assumes it's solid.

## Key terms

| Term | Meaning |
|---|---|
| Trigger | Apex code that runs automatically in response to a database event, rather than being called directly |
| SOQL | Salesforce's own query language for reading records from the database |
| DML | Data Manipulation Language -- the operations (insert, update, delete) for writing records |
| Governor limit | A platform-enforced ceiling on resource usage, specific to Salesforce's multi-tenant architecture |

## Lab

Write a short, honest self-assessment: for each of this course's three chapters, pick the one lesson you felt least confident in, and write two or three sentences on exactly what about it still feels unclear. Then, for each of those lessons, go back and re-read just its "Check yourself" section and attempt to answer it from memory before looking back at the lesson body. This isn't busywork — it's the single most useful thing you can do before starting the next course in this path.

## Check yourself

Can you explain, in your own words, why this entire course was taught without ever requiring a Salesforce org, and why that was a deliberate choice rather than a limitation? Can you name, from memory, at least three Salesforce-specific concepts (triggers, SOQL/DML, governor limits, Salesforce DX, Lightning Web Components) that this course deliberately left for later courses, and briefly say what each one is for?
