# Lesson 4 — ALM Lab

**Chapter 1 · Application Lifecycle Management · Lesson 4 of 26**

## What you'll learn

- How to plan a quarterly sub-production refresh for a real scoped application
- Where exactly anonymization fits into that refresh, and why skipping it is a real risk, not a formality
- How to decide when to publish a new Application Repository version before a release
- How the three ideas from this chapter — release awareness, instance strategy, and version management — combine into one real planning exercise

## The scenario

The company runs Dev, Test, and Production instances for **Equipment Checkout** — the scoped
application Scripting & Application Development's capstone built, with its `x_acme_eq_checkout`
table extending `task` and its standalone `x_acme_eq_equipment` lookup table. It's been live in
Production for a full quarter, real employees have checked out real equipment using it, and two
things are coming up at once: the quarterly sub-production refresh is due, and the team is about
to ship a significant new feature — an "Overdue Checkouts" module with automatic escalation —
that's been built and tested in Dev and Build. Walk through both, in the right order, the way a
real ServiceNow admin and developer would plan it.

## Step 1 — Plan the quarterly sub-production refresh

Dev and Test haven't been refreshed from Production since Equipment Checkout went live, so their
data is already a quarter stale — missing real checkout patterns, real equipment categories added
since launch, and real edge cases (equipment checked out and never returned, for instance) that
only exist in Production now. The plan: clone Production's current `x_acme_eq_checkout` and
`x_acme_eq_equipment` data into Dev and Test on the scheduled quarterly date, the same way any
other application's sub-production refresh would run.

## Step 2 — Apply anonymization before anyone opens the refreshed instances

That clone carries real employee data along with it — every real employee name and contact detail
tied to a `requested_for` or assignment field on a real checkout record. Before any developer or
tester is allowed to open the refreshed Dev or Test instance, anonymization runs against those
fields: real employee names and contact details are permanently replaced with realistic
fake values, exactly the way the Security & Access Controls course's anonymization lesson
described. Nobody testing the new "Overdue Checkouts" escalation logic needs a real employee's
real email address to confirm an escalation notification fires correctly — a fake-but-realistic
one works exactly as well, with none of the exposure.

## Step 3 — Publish a new Application Repository version before the feature ships

Separately from the refresh, the "Overdue Checkouts" feature itself is ready to move toward
Production. Before that happens, the team publishes a new Application Repository version of
Equipment Checkout — capturing the entire application, including the new module, as one coherent,
numbered snapshot — rather than relying on tracking which specific Update Sets collectively
represent "the app before this feature." That published version becomes the clean rollback point:
if the new escalation logic misbehaves once it's live, the team can pull the prior version back
down as a single, known-good unit, instead of trying to reconstruct which changes to reverse.

## What you just practiced

This lab combined every real idea from this chapter: recognizing that sub-production instances
need periodic refreshing to stay realistic (Lesson 2), treating anonymization as a required step
in that refresh rather than an afterthought (also Lesson 2, building on Security & Access
Controls), and publishing an Application Repository version at a real milestone — right before a
feature release — specifically so a coherent rollback point exists if it's needed (Lesson 3). That
sequence, refresh-then-anonymize and version-before-release, is exactly what a real ServiceNow team
running a real application does every quarter, not a one-time exercise.

## Key terms

| Term | Meaning |
|---|---|
| `x_acme_eq_checkout` / `x_acme_eq_equipment` | The Equipment Checkout application's two tables from the Scripting & Application Development capstone |
| Quarterly refresh | Cloning Production's current data into Dev and Test on a regular schedule |
| Anonymize-before-open | Running anonymization on a refreshed instance before any developer or tester accesses it |
| Version-before-release | Publishing an Application Repository version right before a feature ships, to guarantee a clean rollback point |

## Try it yourself

Sketch the order of operations on paper for one more scenario before Chapter 2 begins: Production
needs an emergency hotfix for Equipment Checkout at the same moment the quarterly refresh is
scheduled. Decide which should happen first, the hotfix or the refresh, and whether a new
Application Repository version should be published before or after the hotfix goes live.
