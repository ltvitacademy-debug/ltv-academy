# Lesson 36 — Capstone Wrap-Up & Administration Checklist

**Chapter 8 · CSA Exam Preparation & Capstone · Lesson 36 of 36**

## What you'll learn

- How to finish the Lakeview scenario with form-behavior and server-side rules
- What System Properties and Scheduled Jobs actually matter for this department
- How to package the entire build into one Update Set and move it Dev to Production
- A real, usable checklist for calling any new department's setup production-ready

## Picking up where Lesson 35 left off

Lakeview Facilities now has its group structure, one field-level ACL, one
catalog item, and one notification. Three things are still missing before
this is genuinely production-ready: form-behavior rules on the request
itself, a sanity check on the platform settings that affect this
department, and a disciplined way to move the whole build out of Dev.

## Step five: UI Policy and Data Policy on the request (Chapter 5)

The Facilities Request table needs one more rule: when request type is set
to Relocation, the "destination location" field must be visible and
required — for New Item or Replacement requests, it stays hidden, since
there's no second location involved. Following Lesson 20's pattern, that's
a UI Policy, because it only needs to control what the form shows and
requires while someone is actively filling it out.

But the same rule needs a backstop. If a Relocation request ever reaches
the Facilities Request table with no destination location — through an
API integration, a scheduled import, or a script that bypasses the form
entirely — the record is useless to a coordinator with no indication of
where the item is actually going. Following Lesson 21, you add a Data
Policy with the identical condition (request type is Relocation) that
enforces "destination location is mandatory" at the server, so the rule
holds no matter how the record is created. Lesson 22's framing applies
exactly here: the UI Policy makes the form usable, and the Data Policy
makes the rule actually unbreakable.

## Step six: a System Properties and Scheduled Jobs check (Chapter 6)

Before calling Lakeview's setup done, Chapter 6 says to check the platform
settings that actually touch this department rather than assuming
defaults are fine. Two things matter here. First, the instance's
notification email properties — specifically, whether outbound email is
even enabled on this instance and which address notifications send from
— because Lesson 25's lesson on System Properties is exactly where an
admin discovers a notification was configured correctly but never sent
because outbound email was off at the instance level. Second, whether any
existing Scheduled Job that archives or closes stale requests (for
example, an inactivity-based auto-close job) applies to the new Facilities
Request table — Lesson 26 covered exactly this kind of job, and a generic
"close inactive requests after 30 days" job that was scoped only to
Incident will silently do nothing for Lakeview's new table unless its
condition is widened or a department-specific job is added. A quick look
at System Logs (Lesson 27) during initial testing confirms the
notification actually fired and the scheduled job actually ran, rather
than assuming silence means success.

## Step seven: one Update Set, Dev to Test to Production (Chapter 7)

None of steps one through six should have been built directly in a
production instance. Following this course's Chapter 7, every piece of
this capstone — the groups and roles, the ACL, the catalog item and its
variable set, the notification and its email template, and the new UI
Policy and Data Policy — belongs inside a single, well-named Update Set:
something like "Lakeview Facilities — Initial Rollout," not a generic
default set. Lesson 29's lesson on what an Update Set actually captures
matters here: catalog items, ACLs, and policies are all capturable
configuration, but the user records and group memberships you created are
not — those need to exist independently in each environment, created
directly or migrated through a separate data load, never through the
Update Set itself.

Following Lesson 30, you complete the set only once every piece has been
tested together in Dev, not piece by piece as you build it. Following
Lesson 31, you move the completed set to Test first, where someone other
than you — ideally an actual Lakeview coordinator — walks through
submitting and fulfilling one real Furniture Request before anything
touches Production. Only after that passes do you retrieve and commit the
same set in Production. If Lesson 32's common problems come up — a missing
dependency like the variable set not being captured because it existed
before you started this update set — you fix it in Dev, re-test, and move
a corrected set through the same path, never hand-patch Production
directly.

## The administration checklist

Before calling any new department's ServiceNow setup production-ready, a
competent administrator checks:

1. Every group's membership maps to a real job function, with no person
   sitting in overlapping groups that grant conflicting access.
2. Every sensitive field has a field-level ACL, not just a UI Policy
   hiding it from the form.
3. Every catalog item routes to the correct assignment group and has no
   mandatory field that doesn't apply to every request type it covers.
4. Every notification has been tested end to end — triggered, sent, and
   actually received — not just configured and assumed to work.
5. Every form-behavior rule enforced client-side (UI Policy) has a
   matching server-side rule (Data Policy) wherever the condition
   protects data integrity, not just form usability.
6. Outbound email and any relevant Scheduled Jobs have been confirmed
   active and correctly scoped for the new table or department — not
   assumed from the defaults.
7. The entire build exists in one cleanly named Update Set, tested in Dev,
   verified by someone else in Test, and only then committed in
   Production — never built or patched directly in Production.

## Key terms

| Term | Meaning |
|---|---|
| Data Policy backstop | A server-side rule that enforces a condition a UI Policy only enforces on the form |
| Instance-level email properties | A System Property controlling whether outbound notification email is enabled at all |
| Update Set scope | What an Update Set does and doesn't capture — configuration, not user records or group membership |
| Production-ready | A setup that has been tested end to end by someone other than its builder, not just configured |

## Check yourself

Walk back through the full Lakeview build, start to finish, and name one
thing from each of this course's seven content chapters (1 through 7) that
appears somewhere in the final setup. If you can't name one from a given
chapter, that's a gap in this capstone worth noticing before you consider
yourself ready for a real department's ServiceNow rollout — and for the
CSA exam.
