# Lesson 20 — UI Policies for Form Behavior

**Chapter 5 · UI Policies, Data Policies & Business Rules (Admin View) · Lesson 20 of 36**

## What you'll learn

- What a UI Policy is and where it lives: `sys_ui_policy` plus its UI Policy Actions
- The three real field effects a UI Policy can apply: visible, mandatory, read-only
- How a UI Policy's condition decides when those effects fire, live, with no page reload
- The real limitation: a UI Policy only governs the form in the browser
- Why that limitation is exactly the gap Data Policies close, starting next lesson

## sys_ui_policy: client-side form rules

A UI Policy is a record on the `sys_ui_policy` table, scoped to one table (Incident, Change Request, a custom table — anything with a form). It exists to make a form behave intelligently as the user fills it in, instead of showing every field all the time regardless of context. The classic example: an Incident form where selecting Category = "Hardware" should reveal an Asset Tag field that's irrelevant for every other category. Rather than cluttering the form permanently, or writing a client script by hand, an administrator builds a UI Policy: a condition ("Category is Hardware") paired with the field behavior that condition should trigger.

A UI Policy record itself mostly holds administrative bookkeeping — which table it applies to, its condition, whether it's active, and an order value (policies run in a defined sequence when more than one could apply to the same form). The actual field-level work happens in a related list underneath it.

## UI Policy Actions: the actual field effects

Each UI Policy has one or more **UI Policy Actions** — child records that say, for one specific field, what should happen when the policy's condition is true. There are exactly three effects an admin can set per field per action:

- **Visible** — show or hide the field entirely
- **Mandatory** — require the field to be filled in before the form can be submitted
- **Read-only** — let the field display but block the user from typing into it

A single UI Policy can carry several actions across different fields — one policy for "Category = Hardware" might simultaneously make Asset Tag visible and mandatory, while a second policy for "State = Closed" might make the Resolution Notes field read-only. Each action also has a "reverse if false" setting, which decides whether the effect undoes itself automatically the moment the condition stops being true (e.g., the field hides itself again if the user changes Category away from Hardware) — this is almost always left on, since it's what makes the form feel responsive rather than sticky.

## Conditions and live behavior — no reload

What makes a UI Policy genuinely useful to an end user is that it evaluates **live**, in the browser, as they interact with the form — no save, no page refresh. The moment a user changes the Category field, the condition is re-checked instantly on the client, and the Asset Tag field appears or disappears, becomes mandatory or stops being mandatory, in real time. This is the same mechanism Chapter 3 introduced for Catalog UI Policies on a Service Catalog request form — the platform-wide `sys_ui_policy` behavior is identical whether the form is an Incident, a Change Request, or a catalog item's variable set; only the table being governed changes.

## The real limitation you must flag to yourself

This is the single most important fact to carry out of this lesson: a UI Policy only controls what happens **inside the browser, on that form**. It has no effect whatsoever on a record that gets written any other way — a background script run by another admin, a scheduled Import Set pulling rows from a spreadsheet, or an external system calling a Scripted REST API to create or update the record directly. In every one of those paths, the form never renders, so the UI Policy never evaluates, and a record can be saved with Asset Tag blank even though the UI Policy says it's "mandatory" whenever Category is Hardware.

That gap is real, and it's not a bug — a UI Policy was simply never designed to be a data-integrity mechanism. It's a form-experience mechanism. When a rule genuinely has to hold true no matter how the record reaches the database, that's a job for a Data Policy, which is exactly what the next lesson covers.

## Key terms

| Term | Meaning |
|---|---|
| UI Policy | A `sys_ui_policy` record: a condition on a table paired with client-side field behavior |
| UI Policy Action | A child record naming one field and which effect (visible/mandatory/read-only) applies |
| Reverse if false | Setting that automatically undoes a UI Policy Action's effect once its condition is no longer true |
| Client-side | Runs in the user's browser, on the rendered form — never touches records saved any other way |

## Check yourself

A UI Policy makes the Asset Tag field mandatory on the Incident form whenever Category is "Hardware." An integration creates a new Hardware incident through a Scripted REST API, with no Asset Tag value supplied. Does the record save successfully, and why?
