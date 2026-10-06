# Lesson 8 — Order of Execution Overview

**Chapter 2 · Choosing the Right Tool · Lesson 8 of 18**

## What you'll learn

- The real, current order Salesforce follows when a record is saved, straight from the Apex Developer Guide
- Why validation rules run *before* most triggers, not after
- Where approval-process entry criteria, workflow rules, and Flow fit relative to each other
- Why this order matters even if you never write a line of Apex

## Why admins need this, not just developers

Every tool in Chapter 1 participates in one shared sequence. When two of them seem to conflict — a validation rule blocking something a Flow just set, or a workflow field update not triggering another automation you expected — the order of execution is almost always the real explanation. This is the single most-referenced piece of platform knowledge for diagnosing "why did this automation do that."

## The order, as Salesforce documents it (API 68.0, Winter '27)

This is the current, official sequence for a record save (insert/update), from the Apex Developer Guide's "Triggers and Order of Execution":

1. Loads the original record from the database (or initializes it, for an insert/upsert).
2. Loads the new field values from the request, overwriting the old ones.
3. Runs system validation: required fields, valid field formats, max field length, layout rules (for standard UI edits) or foreign key/picklist checks (for API/Apex-originated requests).
4. Executes **record-triggered flows configured to run before the record is saved**.
5. Executes all **before triggers**.
6. Runs system validation again, and runs **custom validation rules**.
7. Executes **duplicate rules**. A blocked duplicate stops here — no after triggers, no workflow.
8. Saves the record to the database, but doesn't commit yet.
9. Executes all **after triggers**.
10. Executes **assignment rules**.
11. Executes **auto-response rules**.
12. Executes **workflow rules** (classic). If a workflow field update fires, Salesforce re-runs: an update to the record, system validation again, and before/after update triggers one more time (and only once more) — but *not* validation rules, duplicate rules, or Process Builder/flows a second time.
13. Executes **escalation rules**.
14. Executes **Process Builder processes** and **flows launched by workflow rules**, in no guaranteed order relative to each other. (Record-triggered flows give you control over this ordering, which unordered legacy automation doesn't.)
15. Executes **record-triggered flows configured to run after the record is saved**.
16. Executes **entitlement rules**.
17. Updates **roll-up summary fields** on a parent record (and the parent goes through its own save procedure); if that update also affects a grandparent's roll-up, the grandparent goes through save too.
18. Executes **criteria-based sharing** evaluation.
19. **Commits** all DML operations to the database.
20. Runs **post-commit logic**: sending email, enqueued async Apex (queueable jobs, future methods), and async paths in record-triggered flows.

## The two facts that resolve most confusion

- **Validation rules run before the record is saved, and before most triggers finish, but after before-triggers.** A before-trigger can normalize a value, and the validation rule will see the normalized version — this is a deliberate design, not a quirk.
- **An approval process's entry criteria is itself evaluated as part of a save (typically via Submit for Approval, which is its own operation) — but once a record is locked for approval, only the before/after trigger and validation steps for *that* save apply the same way.** The point to internalize: approval processes don't get a special order-of-execution exemption; they're still just automation reacting to a save.

## Where this shows up in our running example

Our discount validation rule (Lesson 4) runs at step 6 — after any before-trigger, before the record is ever saved. The notification Email Alert tied to the approval process doesn't fire as part of this list at all in the simple case; it fires when a user clicks Submit for Approval, which is a distinct, later operation that itself goes through this same order of execution.

## Recap

- One ordered sequence governs every save, and every tool in this course participates in it somewhere.
- Validation rules run early (step 6); workflow field updates can force a partial re-run of triggers (step 12) but skip validation and duplicate rules the second time.
- Process Builder and flows triggered by workflow rules run in no guaranteed relative order — record-triggered flows exist partly to fix that.
- This isn't developer trivia — it's the explanation for most "why did two automations conflict" questions admins get asked.

## Try it yourself

Pull up the official Apex Developer Guide's "Triggers and Order of Execution" page yourself and compare it against the numbered list above. Note which steps exist specifically because of *workflow rules* re-saving a record — that mechanic is the subject of the next lesson.

## Check yourself

A before-trigger sets a field to a cleaned-up value. Does the validation rule on that object see the original value the user typed, or the cleaned-up value the trigger set? Why?
