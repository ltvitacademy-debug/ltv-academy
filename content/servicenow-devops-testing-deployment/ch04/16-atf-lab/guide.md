# Lesson 16 — ATF Lab

**Chapter 4 · Automated Test Framework (ATF) · Lesson 16 of 26**

## What you'll learn

- How to apply everything in this chapter to one real application: the Equipment Checkout
  capstone from Course 6
- How to design a UI Test that impersonates two different roles in the same scenario
- How to design a server-side Test that validates the `EquipmentAvailabilityChecker` Script
  Include directly
- How to group both into one Test Suite and schedule it to run automatically
- How to reason through ATF coverage decisions the way you'd actually make them on the job

## The scenario: testing Equipment Checkout's critical path

Course 6's capstone built a real scoped application, `x_acme_eqchk`, for tracking employee
equipment loans: an employee requests a piece of equipment, their manager approves or rejects it,
and a `before insert` Business Rule calls the `EquipmentAvailabilityChecker` Script Include to
block a duplicate request against equipment that's already checked out. That whole chain —
request, approval, availability check — is the application's **critical path**: the one sequence
that absolutely has to keep working, through every future change anyone makes to this
application. This lab designs real ATF coverage for exactly that path, using nothing but the four
step types this chapter already covered.

## Step 1 — the UI Test, impersonating both roles

The critical path involves two different people acting in sequence, so the UI Test needs to
impersonate both of them, in order, within a single Test:

1. **Impersonate User** — switch to an employee account.
2. **Open a form** — the Equipment Checkout request form, blank.
3. **Set a field's value** — pick a specific, known-available piece of equipment, and set a
   needed-by date.
4. **Submit the form** — the equivalent of the employee clicking Submit.
5. **Verify the result** — confirm the new request record now exists with a state of
   "Pending Approval."
6. **Impersonate User** — switch to that employee's manager account.
7. **Open a form** — the pending request record.
8. **Set a field's value** — change the request's state to "Approved."
9. **Submit the form** — save the approval.
10. **Verify the result** — confirm the request record's state is now "Approved."

That ten-step sequence is a single UI Test, but it exercises the entire employee-to-manager
handoff end to end, through the real UI Policies and field-level ACLs each role would actually
encounter — not just as an admin clicking through both forms as the same account.

## Step 2 — the server-side Test, validating the Script Include directly

The UI Test above confirms the *experience* works. It says nothing, directly, about whether
`EquipmentAvailabilityChecker.isEquipmentAvailable()` itself returns the right answer for every
input — that needs a server-side Test, built the way Lesson 14 described:

1. **Create a GlideRecord** — a Checked Out request against a specific piece of equipment, set up
   exactly the way the Script Include expects to find one.
2. **Call the Script Include method** — run `isEquipmentAvailable()` against that same equipment's
   ID.
3. **Verify the result** — assert the method returns `false`, because that equipment is now
   already checked out.

This server-side Test is faster than the UI Test, and it validates the exact logic that the
`before insert` Business Rule depends on — independent of any form, any UI Policy, any role.

## Step 3 — one Test Suite, scheduled nightly

Individually, these two Tests cover two different layers of the same feature. Grouped into a Test
Suite named "Equipment Checkout Regression," they report one combined result for the whole
critical path. Scheduled to run nightly — the same Scheduled Test Execution mechanism Lesson 15
covered — this Suite now runs every night with nobody involved: if a future change to this
application's Business Rules, Script Includes, or UI Policies ever breaks the request-approval
flow or the availability check, the very next nightly run surfaces it as a failed Test, ready to
investigate before it reaches a real employee.

## Why this is the complete pattern

This lab deliberately used every mechanism this chapter introduced, in the order it introduced
them: Test Steps composing a Test (Lesson 12), a UI Test impersonating real roles (Lesson 13), a
server-side Test validating logic directly (Lesson 14), and both grouped into a scheduled Test
Suite (Lesson 15). That's the real, complete ATF pattern for any application built on this
platform — not a special case for this one capstone.

## Key terms

| Term | Meaning |
|---|---|
| Critical path | The one sequence of behavior in an application that absolutely must keep working through future changes |
| End-to-end UI Test | A single UI Test that impersonates multiple roles in sequence to cover a full handoff |
| Direct logic validation | A server-side Test Step that calls a Script Include method and checks its return value |
| Equipment Checkout Regression | This lab's named Test Suite grouping both Tests for scheduled nightly execution |

## Check yourself

Without looking back: walk through why this lab needed two separate Tests — one UI, one
server-side — rather than just one of them, to get real coverage of the Equipment Checkout
critical path.
