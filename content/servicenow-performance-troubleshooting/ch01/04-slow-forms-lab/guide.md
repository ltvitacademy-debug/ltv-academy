# Lesson 4 — Slow Forms Lab

**Chapter 1 · Diagnosing Slow Forms & Lists · Lesson 4 of 25**

## What you'll learn

- How to walk a real "this is slow" complaint through all three diagnostic steps from this chapter, in order
- How to confirm a reported slowdown with the Slow Request Log before touching any configuration
- How to find unnecessary reference-field columns in a List Layout, and redundant UI Policies on a form
- How to estimate the realistic improvement from fixing both, instead of assuming one silver-bullet cause

## The scenario (fictional, illustrative)

**Meridian Logistics**, a fictional mid-size ServiceNow customer, is used here purely to practice
on — not a real company or real support data. Several dispatchers have reported that "the Open
Incidents list view is slow, especially this week." There's no further detail yet — no duration, no
pattern, no confirmed cause. This is exactly the vague complaint Lesson 1 warned against acting on
directly.

## Step 1 — confirm it with the Slow Request Log

Before changing anything, pull the Slow Request Log filtered to `incident_list.do` for the past
two weeks. The entries show something concrete: requests against that list view are averaging 3.8
seconds, up from a baseline of roughly 1.1 seconds the week before — and the time breakdown on
several of the slow entries shows the bulk of that time split between rendering and script
execution, not the underlying database query itself. That's useful on two fronts: it confirms the
complaint is real (nearly 3x slower than normal, not imagined), and it points away from a database
problem and toward something happening on the list-rendering or form side — exactly the two areas
Lessons 2 and 3 covered.

## Step 2 — review the List Layout

Opening the List Layout for the Open Incidents view turns up fourteen columns, four of which are
reference fields: **Assignment Group**, **Configuration Item**, **Business Service**, and
**Vendor** — the last of which was added eight months ago for a since-completed vendor audit and
is no longer referenced by anyone's current workflow. Each of those four reference columns
requires its own per-row lookup to resolve a sys_id into a displayed value, and this list
routinely renders 200-plus open incidents at once — meaning each page load is performing hundreds
of extra lookups just to paint columns, one of which nobody actually needs anymore. Removing the
unused Vendor column outright, and leaving the other three as a judgment call for the incident
process owner, is the first concrete fix.

## Step 3 — review the form's UI Policies

Dispatchers open individual Incident records constantly from that list, so the form itself is
worth checking too. The Incident form carries nineteen active UI Policies. Reading through them
turns up two clearly redundant ones: one UI Policy makes the **Resolution Notes** field mandatory
when `State = Resolved`, and a second, older UI Policy does the same thing but checks
`State = Closed` — both were clearly meant to enforce the same business rule at slightly different
points in the lifecycle, and both fire unconditionally on every form load regardless of which
state the record is actually in. Neither has "Run scripts" enabled, so individually they're cheap,
but they're pure duplication: one well-written condition (`State = Resolved OR State = Closed`)
replaces both.

## Step 4 — the realistic improvement

Neither fix, on its own, is a dramatic silver bullet — and that's the honest, typical outcome.
Removing one unnecessary reference column trims a small slice of per-row lookup time off every
list render; consolidating two redundant UI Policies trims a small slice of per-load evaluation
time off every form open. Together, applied across hundreds of list renders and form opens a day,
the cumulative effect is the kind of measurable, sustained improvement that should show up as a
lower average in the Slow Request Log over the following week — which is also exactly how you'd
verify the fix actually worked, rather than assuming it did.

## Key terms

| Term | Meaning |
|---|---|
| Baseline | A system's normal, typical response time, used as the comparison point for "slower than usual" |
| Unused reference column | A reference-field column still rendered in a List Layout after its original business reason is gone |
| Redundant UI Policy | Two or more UI Policies enforcing the same rule via overlapping conditions, consolidable into one |
| Verification | Re-checking the Slow Request Log after a fix to confirm the average duration actually improved |

## Lab

Using the same Meridian Logistics scenario: the List Layout review above left **Assignment
Group**, **Configuration Item**, and **Business Service** as judgment calls rather than clear
removals. Write one sentence for each, arguing whether a dispatcher triaging open incidents
genuinely needs that column visible in the default list, or whether it could reasonably be dropped
to one click away instead.

## Check yourself

Without looking back: in what order did this lab apply the three diagnostic tools from this
chapter, and why does confirming the problem with the Slow Request Log have to come before
reviewing the List Layout or the UI Policies — rather than after, or not at all?
