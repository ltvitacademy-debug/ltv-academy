# Lesson 25 — Capstone: Build ATF Coverage for a Real Application

**Chapter 7 · Capstone: a Tested, Deployable Application Pipeline · Lesson 25 of 26**

## What you'll learn

- How to translate one critical business path into a concrete UI Test and a concrete server-side Test
- Why the "full section" rejection path matters as much as the happy path, and has to be tested explicitly
- How to group both tests into a Test Suite that runs automatically on every pipeline build
- How this coverage becomes the evidence the Change Request in Lesson 26 will actually rely on

## Picking up where Lesson 24 left off

Lesson 24 named ATF coverage on the critical path as a hard requirement for the
Course Registration application, without designing it. This lesson does the
design work, using the real ATF mechanics from Chapter 4 — UI Tests, server-side
Tests, and Test Suites — against this specific application instead of a generic
example.

The critical path, stated precisely: *a student registers for a course.* That
single sentence actually covers two distinct scenarios that both have to be
proven, because a student registering for an open section and a student hitting a
full section exercise completely different logic.

## Test 1 — a UI Test for the happy path

Following Chapter 4's UI Test mechanics, this test simulates the actual student
experience end to end, step by step:

1. **Open form** — navigate to the Course Registration application's registration
   form as a logged-in student user.
2. **Set field value** — select a course section known (via test data) to have at
   least one open seat.
3. **Click submit** — click the Register button.
4. **Assert field value** — confirm the registration record's status field now
   reads "Confirmed."
5. **Assert condition** — confirm a confirmation record exists linking this
   student to this section, and that the section's open-seat count decremented by
   exactly one.

This is the test that proves the application does the one thing it exists to
do — successfully register a student for a course — every single time a change is
proposed, without a human needing to click through it by hand.

## Test 2 — a UI Test for the full-section rejection path

The registrar's office specifically flagged this as the scenario that generates
support tickets when it's handled wrong, so it gets its own explicit test rather
than being assumed to work because the happy path works:

1. **Open form** — same registration form, same logged-in student user.
2. **Set field value** — select a course section whose test data is seeded with
   zero open seats.
3. **Click submit** — click the Register button.
4. **Assert field value** — confirm the registration attempt's status reads
   "Rejected — Section Full," not a generic error and not a silent failure.
5. **Assert condition** — confirm no confirmation record was created, and the
   section's seat count did **not** change — a rejected registration must not
   quietly consume a seat.
6. **Assert field value** — confirm the student was offered the waitlist option
   rather than simply told no.

## Test 3 — a server-side Test for the capacity-check logic

Chapter 4 distinguished UI Tests (what the student sees) from server-side Tests
(what the platform computes), and this capstone needs both. The registration-
capacity-check logic — the Script Include or Flow Action that decides "is there a
seat" — gets its own server-side Test that calls that logic directly with known
inputs and asserts on its return value:

- **Input**: a section record with `max_seats = 30` and `enrolled_count = 30`.
- **Assert**: the capacity-check function returns `false` (no seat available).
- **Input**: the same section with `enrolled_count = 29`.
- **Assert**: the capacity-check function returns `true` (one seat available).

Testing this logic directly, independent of the UI, catches a bug in the
capacity math itself even if a future UI change accidentally makes the broken
logic *look* like it's working on screen.

## Grouping into a Test Suite

All three tests — the happy-path UI Test, the full-section UI Test, and the
server-side capacity Test — get grouped into one ATF **Test Suite**, exactly as
Chapter 4 described, named something like "Course Registration — Critical Path."
That suite is configured to run automatically on every pipeline build triggered by
a commit to the connected Git repository, not just before a release. A regression
introduced on a Tuesday afternoon gets caught Tuesday afternoon, long before it's
anywhere near a Change Request — which is exactly the evidence Lesson 26's
deployment runbook is going to depend on.

## Key terms

| Term | Meaning |
|---|---|
| UI Test | An ATF test that drives the actual form/page like a user, step by step |
| Server-side Test | An ATF test that calls platform logic (Script Includes, Flow Actions) directly, independent of the UI |
| Test Suite | A named group of ATF tests run together, here scheduled to run on every pipeline build |
| Capacity check | The server-side logic deciding whether a course section has an open seat; tested independently of the registration form |

## Check yourself

Explain, specifically, why the full-section rejection path needs its own UI Test
rather than being covered "by extension" once the happy-path test passes — and why
the capacity-check logic also needs a separate server-side Test even though the UI
Test already exercises it indirectly.
