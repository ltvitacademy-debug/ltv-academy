# Lesson 23 — Business Rules: an Administrator's View

**Chapter 5 · UI Policies, Data Policies & Business Rules (Admin View) · Lesson 23 of 36**

## What you'll learn

- What a Business Rule is and where it lives: `sys_script`
- The four real timing types: before, after, async, and display
- Why a Business Rule is far more powerful than a UI Policy or Data Policy — and far riskier
- What an administrator needs to recognize when reviewing one, without writing the script
- Why real scripting of Business Rules is deferred to Course 6 of this path

## sys_script: server-side logic that runs automatically

A Business Rule is a record on the `sys_script` table, and it's the most powerful of the three mechanisms this chapter covers. Where a UI Policy only affects a browser form and a Data Policy only enforces mandatory/read-only on specific fields, a Business Rule is server-side script that runs automatically whenever a record on its target table is inserted, updated, deleted, or even queried. There's effectively no limit to what a Business Rule can do once it fires — it can read or write any field on the current record, look up and modify completely unrelated records, call another system, or block the operation outright. As an administrator, you won't typically be writing these scripts yourself in this course — that real scripting skill is Course 6 of this path, "Scripting & Application Development." What you need here is the ability to open an existing Business Rule and correctly recognize what it's doing and when it runs, because Business Rules are often the real explanation behind "why did this field change" or "why did this record get created automatically" questions that land on an administrator's desk.

## The four timing types, by name

Every Business Rule runs at one of four points, and knowing the name and real behavior of each is exactly the admin-level skill this lesson targets:

- **before** — runs before the database write happens; because the record hasn't been saved yet, a before rule can still modify fields on the current record, and that modification gets included in the same save. It can also abort the operation entirely.
- **after** — runs once the write has already completed. An after rule can't change the current record's own save (that already happened) but is the standard place to update other, related records — for example, updating a parent Change Request's state after a Change Task closes.
- **async** — also runs after the write, but in the background, non-blocking, outside the user's save transaction. This is the real choice for anything slower that shouldn't make the user wait — calling an external system, running a heavier calculation — because the user's form submission returns immediately while the async rule finishes separately.
- **display** — runs when the form loads, before the page is rendered, and its job is to pass server-side data down to the client for the form's client scripts to use. It's the one timing type that's about getting data to the browser, not about writing to the database.

## Why this is more powerful, and more dangerous

A UI Policy can only touch one field's visible/mandatory/read-only state on one form. A Data Policy can only touch one field's mandatory/read-only state at the database level. A Business Rule has none of those boundaries — a single before Business Rule on the Incident table can rewrite half the fields on that Incident, and a single after Business Rule can cascade changes across Problem, Change, and Task records that have nothing obviously to do with the Incident being saved. That power is exactly why Business Rules carry real risk: a poorly scoped or poorly conditioned Business Rule can silently alter data the admin never intended to touch, fire on every single save to a high-volume table and slow the whole instance down, or create a rule that fights with another Business Rule running at the same timing, each one undoing the other's change. Recognizing a Business Rule's condition and timing before trusting what it does is a real administrative skill, independent of being able to write one from scratch.

## What to actually look at, as an administrator

When reviewing an existing Business Rule record — say, while troubleshooting unexpected field behavior — the fields worth checking first are: which table it runs on, its timing type (before/after/async/display), its condition (does it even apply to the record you're looking at), and whether it's currently active. Those four facts answer "could this rule even be responsible for what I'm seeing" before you need to read a single line of the script itself.

## Key terms

| Term | Meaning |
|---|---|
| Business Rule | A `sys_script` record: server-side script that runs on insert, update, delete, or query |
| Before | Runs before the database write; can still modify the record being saved, or abort it |
| After | Runs once the write completes; typically used to update other, related records |
| Async | Runs after the write, in the background, non-blocking — used for slower operations |
| Display | Runs when the form loads, to pass server-side data to the client |

## Check yourself

An administrator notices that updating an Incident's State to "Resolved" always also updates a related Problem record's Workaround field, with no visible UI Policy or Data Policy involved. Which mechanism is almost certainly responsible, and which of the four timing types would it most likely be using, given that it updates a different record than the one being saved?
