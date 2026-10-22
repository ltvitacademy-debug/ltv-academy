# Lesson 35 — Capstone: Configure a Small-Department Instance

**Chapter 8 · CSA Exam Preparation & Capstone · Lesson 35 of 36**

## What you'll learn

- A single, cumulative scenario that applies Chapters 1 through 4 end to end
- How to stand up users, groups, and roles for a real department
- How to reason through an ACL decision for one sensitive custom field
- How to build one catalog item and one matching notification for it

## The scenario

You've just been hired as the ServiceNow administrator for Lakeview
Facilities, a 40-person department inside a mid-sized company that is
onboarding onto ServiceNow for the first time. Nobody at Lakeview has ever
touched the platform. Your job this lesson — and the next — is to take
them from zero to a working, production-ready setup, using exactly what
Chapters 1 through 7 of this course taught. If you have a free Personal
Developer Instance, build this alongside the lesson. If not, the written
walkthrough below stands on its own; the reasoning is the point, not the
clicking.

## Step one: users, groups, and roles (Chapter 1)

Lakeview has three kinds of people: 35 staff who will submit requests, 4
coordinators who triage and assign work, and 1 department head who needs
visibility into everything without doing the triage work herself.

Following Chapter 1's pattern, you don't assign roles to 40 individuals —
you build the group structure first and let role inheritance do the work.
You create three groups: `lakeview_facilities_staff` (all 35 requesters, no
special role — they just need the base `itil` or requester-level access to
submit and view their own requests), `lakeview_facilities_coordinators`
(the 4 triage staff, granted a custom `facilities_coordinator` role), and
`lakeview_facilities_manager` (the department head, granted
`facilities_coordinator` plus a read-only reporting role). You add each
person to exactly one group matching their job, not to multiple overlapping
groups — the delegated-administration pattern from Lesson 4 only stays
manageable if group membership maps cleanly to a real job function. The
department head becomes the group manager for all three groups, so she can
add or remove staff herself without filing a ticket with you every time
someone joins or leaves Lakeview.

## Step two: one ACL decision for a sensitive field (Chapter 2)

Lakeview's request form needs a custom field: `estimated_cost`, a currency
field coordinators use to flag anything over a departmental spending
threshold. Staff should never see this field — not because it's secret in
a security sense, but because showing an unapproved cost estimate to the
person who filed the request creates confusion and premature pushback
before a coordinator has reviewed it.

Following Chapter 2's layered model, hiding the field with a UI Policy
alone is not enough — Lesson 22 from Chapter 5 already warned you that a
UI Policy is client-side only. The real control has to be a field-level
ACL on `estimated_cost`, scoped to the Facilities Request table, with a
`read` and `write` operation each requiring the `facilities_coordinator`
role. Per Lesson 6's evaluation order, this means the field is invisible
to anyone without that role regardless of what the form itself tries to
show, and invisible to any report, Import Set, or inbound integration that
isn't running with that role either. That's the difference Chapter 2 spent
five lessons building: an ACL is enforced at the data layer, not the
presentation layer.

## Step three: one catalog item (Chapter 3)

The single most common Lakeview request is furniture — a new chair, a
replacement desk, a shelf moved between offices. Following Chapter 3, you
build a catalog item called "Furniture Request" rather than letting staff
file generic incidents that a coordinator has to re-triage by hand every
time.

The catalog item's form uses a small variable set (Lesson 12's pattern,
not a one-off pile of unrelated variables): a choice variable for request
type (New Item / Replacement / Relocation), a reference variable pointing
at the requester's own location record, and a multi-line text variable for
details. A catalog UI policy (Lesson 13) makes the "current item" field
mandatory only when request type is Replacement or Relocation — there's no
"current item" to describe on a brand-new furniture request. The item
routes to the `lakeview_facilities_coordinators` group as the assignment
group, so a request lands with someone who can actually act on it instead
of sitting unassigned.

## Step four: one notification (Chapter 4)

When a coordinator marks a Furniture Request as fulfilled, the requester
needs to know without having to log in and check. Following Chapter 4, you
build a notification record scoped to the Facilities Request table,
triggered on a field-change condition — specifically, the state field
changing to "Closed Complete" — rather than on every update to the record,
which would spam the requester every time a coordinator added an internal
note.

The notification uses an email template (Lesson 17) with the request
number, the item requested, and the fulfillment date pulled in as
variables, so coordinators never have to write a one-off email by hand.
Lesson 16's distinction matters here: this is a condition-based
notification tied to one specific state transition, not an event-based one
— Lakeview doesn't need a custom event fired from a script when a simple
field-change condition already says exactly what you need it to say.

## Where this stands at the end of Lesson 35

Lakeview now has: a group structure with working role inheritance, one
field-level ACL protecting a sensitive estimate from the people who
shouldn't see it yet, one catalog item that replaces an ad hoc incident
with a structured request, and one notification that closes the loop with
the requester. Lesson 36 picks this up exactly here — adding form behavior
rules, a System Properties and Scheduled Jobs check, and the Update Set
that will move all of this from Dev into Test and then Production.

## Key terms

| Term | Meaning |
|---|---|
| Role inheritance | A role granted through group membership rather than assigned directly to a user |
| Field-level ACL | An access rule on a single field, enforced at the data layer regardless of UI |
| Variable set | A reusable, named group of catalog variables applied to one or more catalog items |
| Condition-based notification | A notification triggered by a specific field value or change, not a custom event |

## Check yourself

Why was a field-level ACL the correct control for `estimated_cost`, and a
UI Policy alone would not have been enough? Answer using the data-layer
versus presentation-layer distinction from Chapters 2 and 5 before moving
to Lesson 36.
