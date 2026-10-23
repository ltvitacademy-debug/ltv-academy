# Lesson 13 — Building a UI Test

**Chapter 4 · Automated Test Framework (ATF) · Lesson 13 of 26**

## What you'll learn

- How a UI Test is actually composed: a sequence of reusable Test Steps
- The real step types that simulate a user interacting with a form
- How a UI Test verifies that something actually happened, not just that it ran
- Impersonate User — why a UI Test can run as a specific role, not just as an admin
- Why role-based behavior has to be tested as that role to mean anything

## A UI Test simulates a real user, click by click

Lesson 12 introduced Test Steps as the reusable building block underneath every ATF Test. A UI
Test is the most literal application of that idea: it's a sequence of Test Steps that simulate a
real person clicking through the actual ServiceNow interface, in the actual order a user would —
opening a specific form, setting a field's value, submitting it, and so on. Where a human tester
would click, type, and look, a UI Test record performs the same sequence of actions
programmatically, step by step, and ServiceNow logs exactly what happened at each one.

## The step sequence, conceptually

A typical UI Test strings together steps like these:

1. **Open a form** — navigate to a specific record, or to a blank form for a specific table.
2. **Set a field's value** — fill in a field the way a user would type into it.
3. **Submit the form** — the equivalent of clicking the Submit or Save button.
4. **Verify the result** — confirm something specific is now true: a field shows the expected
   value, a particular message appeared, or the record reached the expected state.

That fourth step is what separates a real UI Test from simply clicking through blindly. A Test
Step that only opens a form and submits it proves the form *didn't error out* — it proves
nothing about whether the right thing actually happened. The verification step is where the Test
actually checks a specific, concrete outcome: "after submitting with these values, field X should
now equal Y," or "a confirmation message containing this specific text should now be visible."
Without that check, running the Test repeatedly would just confirm the form still loads — useful,
but far short of catching the kind of logic regression Lesson 12 described.

## Impersonate User: testing the role, not just the admin

One of ATF's most important real capabilities is the **Impersonate User** Test Step. Without it,
every UI Test would run as whichever account launched it — almost always an administrator, who
can see every field and bypass every restriction. That's a problem, because so much of what this
path has already taught depends entirely on *which role* is looking at the form. Course 3's and
Course 6's lessons on UI Policies showed exactly this: a UI Policy can hide a field, make it
read-only, or make it mandatory, conditioned on the current user's role. An admin account might
never trigger that UI Policy at all, because the condition that hides the field for a regular
employee is often written to exclude admins by design.

Impersonate User solves this by making the Test run as a specific, real user — someone holding a
specific role — for the duration of that Test. A UI Test that impersonates a standard employee
role before interacting with a form is actually exercising the same UI Policies, field-level ACLs,
and visibility rules that a real employee would hit. A UI Test that only ever runs as an admin can
pass every single time while a real employee-facing bug sits completely undetected, simply because
the admin account never triggered the condition that was broken.

## Why this is worth building carefully

A UI Test is slower to build than a server-side Test, because it has to account for the same
things a real user experiences — page load timing, which fields are even visible to impersonate,
what order a form actually presents its fields in. That cost is deliberate: a UI Test is the only
ATF step type that confirms the *experience* works, not just the logic underneath it. Lesson 14
covers the server-side alternative, which skips the UI entirely and is faster to run but can't
catch a UI Policy or form-layout problem a UI Test would catch immediately.

## Key terms

| Term | Meaning |
|---|---|
| UI Test | A Test composed of Test Steps that simulate a real user interacting with the actual form |
| Verification step | A Test Step that checks a specific, concrete outcome — not just that the form submitted |
| Impersonate User | A Test Step that runs the rest of the Test as a specific user and role |
| Field-level ACL | Access control that governs whether a role can read or write a specific field |

## Check yourself

Without looking back: why would a UI Test that only ever runs as an administrator fail to catch a
bug in a UI Policy that's conditioned on a specific employee role — and what Test Step fixes that?
