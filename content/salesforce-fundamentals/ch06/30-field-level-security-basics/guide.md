# Field-Level Security, Basics

Every security layer so far has worked at the object or record level: can this user see the
Opportunity object at all (Profile), can they see this specific Opportunity record (Role
Hierarchy, Sharing Rules). This lesson covers the layer one step smaller: **Field-Level
Security (FLS)** — access controlled per individual field, independent of everything above
it.

## What you'll learn

- What Field-Level Security is, and how it's independent from object- and record-level access
- The real, practical implication for an analyst: a silently missing field value
- Why this is set on Profiles and Permission Sets, the same mechanisms from Lesson 28

## A field can be hidden even when the record isn't

**Field-Level Security** controls, per Profile or Permission Set, whether a specific field on
an object is **visible**, **read-only**, or **editable** for a given user — completely
independent of whether that user can see the record itself. A user can have full access to an
Opportunity record — they can see it, open it, even edit most of its fields — while one
specific field, say a sensitive `Commission_Rate__c` field, is configured invisible to them
specifically through FLS. The record isn't hidden. The object isn't hidden. Only that one field
is.

## Where FLS is configured

Field-Level Security is set the same place Lesson 28 already introduced: on a Profile (as part
of its baseline) or on a Permission Set (as an additive grant). This is deliberate — it's the
exact same mechanism, applied at a finer grain, so it fits naturally into everything you
already learned about Profiles and Permission Sets rather than being a separate system to
learn from scratch.

## The real implication for an analyst: a silently missing value

This is the important, easy-to-miss consequence: if a field is hidden from a user by FLS,
that user querying or reporting on it doesn't get an error — they simply don't see the
field's value at all, or the field doesn't appear in the report builder for them to select in
the first place. Two users building what looks like the identical report can get genuinely
different columns, or the same column with blank values for one of them, and neither user gets
any indication that FLS is the cause. If a report seems to be "missing data" for a field that
you know is populated in the underlying object, FLS on that specific user's Profile or
Permission Set — not a data quality problem — is one of the first things worth checking.

## Key terms

| Term | Meaning |
|---|---|
| Field-Level Security (FLS) | Per-field visibility/edit control, independent of object- and record-level access |
| Visible / Read-only / Editable | The three states FLS can set a field to, per Profile or Permission Set |
| Silently missing value | The practical symptom of FLS: no error, just an absent or blank field for that user |

## Check yourself

A colleague says a report is "missing data" in one column, but you can confirm the underlying
field is fully populated for every record. What Chapter 6 concept would you check first, and
why wouldn't this show up as an error?
