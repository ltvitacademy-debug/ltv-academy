# Lesson 30 — Creating & Completing an Update Set

**Chapter 7 · Update Sets & Change Management (Admin View) · Lesson 30 of 36**

## What you'll learn

- The real four-step workflow: set Current → make changes → review → mark Complete
- Why the order matters — specifically, why "Current" has to happen first
- What the "Default" Update Set is, and why changes land there by mistake
- How to review exactly what an Update Set captured before completing it
- What "Complete" actually does, and why it's a one-way door in normal use

## The real workflow, in order

Building and finishing an Update Set follows four steps, and the order is not optional:

1. **Create a new Update Set** and set it as your **Current** Update Set, using the Update Set picker at the top of the screen.
2. **Make your customizations** — new Business Rules, UI Policy edits, ACL changes, whatever the work calls for. ServiceNow automatically records each one into the current Update Set as you go; there's no separate "save to Update Set" step.
3. **Review** the Update Set's related list of captured changes to confirm it holds exactly what you intended — no more, no less.
4. **Mark it Complete** once you're satisfied it's ready to move.

## Why setting Current first is the step that matters most

The Update Set picker shows whichever Update Set is currently active, and every captured change goes into *that one*, not into whichever Update Set you intend to use. If you start making changes before switching the picker to your intended Update Set, those changes are recorded into whatever was previously current — which, for most admins most of the time, is the system's **Default** Update Set.

This is a real, common beginner mistake: an admin opens a Business Rule, edits it, saves it, and *then* creates a new Update Set called "Fix for Incident Routing" and switches to it — by which point the edit they just made is already sitting in Default, not in the new Update Set they meant to use. The fix isn't clever; it's disciplined ordering. Always create and switch to the Update Set *before* touching anything, not after.

## Why the Default Update Set is a trap, not a feature

The Default Update Set exists so that configuration changes always have *somewhere* to go, even if an admin forgets to create a dedicated one. But Default is a poor place for real changes to live: it isn't scoped to one piece of work, it tends to accumulate unrelated changes from many sessions over time, and most teams never promote Default itself to another instance. Changes stuck there either have to be manually moved into the correct Update Set later (possible, but tedious and error-prone) or get lost track of entirely. Treat finding your own work in Default as a signal you skipped step one.

## Reviewing before you complete

Before marking an Update Set Complete, open it and look at its list of captured changes (each one a `sys_update_xml` record). This is your chance to catch two problems: changes you *meant* to make that are missing (maybe they landed in Default because of the mistake above), and changes you *didn't* mean to include — for example, an unrelated tweak made earlier in the same session while this Update Set happened to be current. A clean, single-purpose Update Set is far easier to promote and troubleshoot than one that bundles several unrelated pieces of work together.

## What "Complete" actually does

Marking an Update Set **Complete** locks it as ready for export and promotion — it signals to anyone downstream that this batch of changes is finished and reviewed, not still in progress. In normal practice this is a one-way step: you don't keep editing a Completed Update Set's contents. If more related work is needed, the standard pattern is to start a new Update Set for it rather than reopening the old one.

## Key terms

| Term | Meaning |
|---|---|
| Current Update Set | The one active in the picker; every captured change goes into this one |
| Default Update Set | The system's fallback container; changes land here when no other Update Set was set Current |
| Complete | The status marking an Update Set as finished and ready to export/promote |
| Update Set picker | The top-of-screen control used to view or switch the Current Update Set |

## Check yourself

Without looking back: an admin edits a Business Rule, then creates a new Update Set and switches to it, then edits a UI Policy. Which of those two changes ends up in the new Update Set, and where does the other one go?
