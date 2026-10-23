# Lesson 21 — Governance Lab

**Chapter 6 · Governance, Compliance & Audit · Lesson 21 of 24**

## What you'll learn

- How to scope audit logging to the specific fields that carry real compliance weight, not everything
- How to turn Lesson 18's elevation-logging idea into an actual written policy with named owners
- How to document compliance responsibility honestly, separating platform capability from customer work
- How this chapter's three lessons combine into a single, defensible governance package
- How to answer a non-technical stakeholder's question — "are we HIPAA compliant now?" — honestly

## The scenario

Meridian Regional Health — the same four-hospital system whose Patient
Scheduling system was modeled in the CMDB & Discovery course's
capstone — now needs its ServiceNow instance to demonstrate real,
HIPAA-relevant governance. Patient Scheduling records contain fields
that are patient-adjacent: the patient's name, appointment type, the
clinic location, and free-text scheduling notes that staff sometimes
use to record sensitive context ("patient requested interpreter,"
"follow-up needed for condition X"). Leadership's ask mirrors Lesson
20's framing exactly: they want to know what ServiceNow's platform
capabilities already give them, and what their own team still has to
build and own on top of it. You're asked to produce that governance
package.

## Step 1 — Decide what actually needs auditing, and why

Lesson 19's selective-auditing principle applies directly here. Not
every field on the Patient Scheduling record carries compliance weight
— the record's `sys_id`, its creation timestamp, and routine UI
metadata don't need a change history anyone will ever query. The
fields that do clear the bar are the patient-adjacent ones: patient
name, appointment type, clinic location, and the free-text scheduling
notes field, precisely because those are the fields a HIPAA review
would actually ask about — who viewed or changed this patient's
information, and when.

The deliverable here is a short, named list, not a blanket setting:

```
Audited (HIPAA-relevant, via Dictionary "Audit" setting):
  - patient_name
  - appointment_type
  - clinic_location
  - scheduling_notes (free text; may contain sensitive context)

Not audited (no compliance weight, avoids unnecessary overhead):
  - sys_id, sys_created_on, and other routine record metadata
```

This list is the actual artifact a reviewer would want to see — proof
that auditing was a deliberate decision, scoped to the data that
matters, not an assumption that "ServiceNow logs everything."

## Step 2 — Write the security_admin elevation policy

Lesson 18 argued that elevation events are themselves worth tracking.
For Meridian, that becomes a real, written policy rather than a
vague intention:

1. **Elevation requires a logged justification.** Before activating
   `security_admin`, the admin records, in a change ticket or request
   record, which ACL they intend to edit and why — e.g., "widening the
   scheduling_notes ACL to add the care-coordinator role, per approved
   change CHG0041982."
2. **Elevation triggers a manager notification.** Every elevation event
   generates a notification to the requesting admin's manager, not just
   a passive log entry nobody reviews. This closes the exact gap Lesson
   18 warned about — an elevation that happens and is logged, but that
   nobody actually looks at.
3. **The justification and the actual ACL change are reviewed together,
   after the fact**, to confirm the edit matches what was requested —
   not a wider change made under cover of a narrower approval.

```
Elevation policy, end to end:
  Admin requests elevation --> logs justification + target ACL
  Elevation activates       --> manager notified immediately
  ACL edit is made          --> reviewed against the logged justification
```

## Step 3 — Document responsibility honestly

The governance package closes with the same honest line Lesson 20
drew. Meridian's team documents it explicitly, so no one later assumes
ServiceNow "handles" HIPAA on its own:

```
Platform provides:                    Meridian owns:
- Field-level audit logging           - Choosing WHICH fields are
  mechanism (sys_audit)                 patient-adjacent and audited
- ACL and role infrastructure         - Designing the actual role model
                                         for who can see scheduling_notes
- Elevate Roles / security_admin      - Writing and enforcing the
  mechanism                             elevation-justification policy
- Encryption, masking, export         - Deciding which Patient
  controls                              Scheduling fields need them
```

Nothing in this list claims ServiceNow certifies Meridian as HIPAA
compliant. It states, specifically and honestly, which decisions and
which enforcement are Meridian's own responsibility, built on top of
real platform mechanisms.

## Step 4 — Answer the stakeholder's question honestly

When leadership asks "are we HIPAA compliant now?", the honest answer
is not a flat yes. It's: "We've configured the platform mechanisms that
HIPAA-relevant governance depends on — selective audit logging on the
patient-adjacent fields, a logged and reviewed elevation policy for
security_admin, and clear ownership of the ACL model protecting
scheduling data. Full HIPAA compliance also depends on things outside
ServiceNow entirely — staff training, physical security, incident
response procedures — that this governance package doesn't cover and
was never meant to." That answer is more useful to leadership than a
reassuring "yes," because it tells them exactly what's actually been
built and what still needs attention elsewhere.

## Key terms

| Term | Meaning |
|---|---|
| Patient-adjacent field | A field whose value could reveal something about a specific patient, even indirectly (e.g., scheduling notes) |
| Logged justification | A required, recorded reason for a security_admin elevation, tied to the specific ACL change intended |
| Manager notification | An active alert sent when elevation happens, closing the gap between "it was logged" and "someone reviewed it" |
| Governance package | The combined artifact of audit scope, elevation policy, and an honest responsibility split, produced for review |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: in
Meridian's governance package, which specific pieces are things
ServiceNow the platform makes possible, and which specific pieces are
decisions and enforcement that only Meridian's own team could have
made? Chapter 7 opens the course's final stretch — a full capstone
security assessment of a real instance, starting with Lesson 22.
