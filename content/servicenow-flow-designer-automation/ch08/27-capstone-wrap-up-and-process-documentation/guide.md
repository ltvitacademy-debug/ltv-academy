# Lesson 27 — Capstone Wrap-Up & Process Documentation

**Chapter 8 · Capstone: Automating a Real Business Process · Lesson 27 of 27**

## What you'll learn

- How to verify the Contractor Offboarding flow actually ran correctly, using the Execution Log
- How to write real process documentation the way a working admin or developer does it — not a screenshot tour
- What to check first when this flow fails, drawing on Chapter 7's diagnosis skills
- How Flow Designer's low-code skills set up the scripted work waiting in the next course

## Verifying the flow with the Execution Log

Building the flow in Lesson 26 isn't the finish line — a flow that looks
right in the designer can still fail at run time, which is exactly why
Lesson 22 taught the **Execution Log**. Open it for a run of Contractor
Offboarding and check each stage in order: did the scheduled trigger's
query actually return the contractor record you expected? Did the If/Else
branch go down the correct path for that contractor's type? Did the
Revoke Access subflow report a success status back to the parent flow,
and if not, what reason did it log? Did the approval actually land on the
manager's approval list, and did the Create Record action produce a real
task record in the IT queue? Each "yes" confirms one link in the chain;
the first "no" tells you exactly where to look, the same diagnostic habit
Lesson 23 built around common flow failures.

## Writing process documentation that a real admin would trust

A flow that only lives inside Flow Designer is a flow nobody but you can
support. Real process documentation is short, specific, and answers four
questions a future admin — or you, six months from now — would actually
ask:

- **What triggers it?** A scheduled job, running daily, that queries the
  contractor table for records where the end date is today and the
  contractor is still active.
- **What does it do, step by step?** Branches on contractor type, calls
  the Revoke Access subflow to pull access for the right systems, routes
  an approval to the contractor's manager to confirm equipment return,
  and creates an assigned IT task summarizing the outcome.
- **Who's involved?** The contractor's manager (approval), IT (the
  disable-account task), and whoever owns the flow itself for maintenance.
- **What do you check if it fails?** The Execution Log first, starting
  with whether the trigger's query found the right record, then whether
  the subflow returned a failure status — exactly the order you just
  verified above.

That's not a long document. It's four short answers, written down once,
that save the next person from re-deriving the entire flow by reading
every node.

## Why this belongs in writing, not just in your head

Chapter 5's catalog automation and Chapter 6's IntegrationHub lessons
both built flows that depend on external systems and multiple
stakeholders — exactly the kind of flow that breaks quietly, weeks later,
when nobody remembers why a step exists. Documentation written at build
time, while the design decisions are still fresh, is far more accurate
than documentation reconstructed after something has already gone wrong.

## Where Flow Designer leaves off, and scripting picks up

This course's own description calls Flow Designer "the admin-facing
bridge toward scripted development" — and this capstone is proof of why.
Every mechanism you just sequenced — a trigger, a branch, a subflow call,
an approval, a record action — is a low-code wrapper around something a
script could also do directly: a query, a conditional, a reusable
function, an approval record insert. Flow Designer let you build
Contractor Offboarding without writing a line of JavaScript. The next
course, **JavaScript for ServiceNow Developers**, is where you start
writing that underlying logic yourself — in Business Rules, Script
Includes, and Client Scripts — for the cases Flow Designer's building
blocks can't quite reach.

## Key terms

| Term | Meaning |
|---|---|
| Execution Log | The per-run record of what a flow actually did, used to verify behavior or diagnose a failure |
| Process documentation | A short, written record of what triggers a flow, what it does, who's involved, and what to check if it fails |
| Flow owner | The person responsible for maintaining a flow after it's built, who relies on documentation to do so |
| Low-code bridge | This course's role in the learning path — Flow Designer's visual mechanisms as a stepping stone toward the scripted development taught next |

## Check yourself — and a reflection for the next course

Write your own one-paragraph process documentation for Contractor
Offboarding, in the four-question format above, as if you were handing
the flow off to a colleague. Then reflect: which single step in this
flow — the branch, the subflow, the approval, or the task — would be
hardest to express in a Flow Designer canvas alone, and easiest to
imagine writing as a short script instead? That's the exact seam where
this course ends and JavaScript for ServiceNow Developers begins.
