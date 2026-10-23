# Lesson 14 — Attachment & Export Controls

**Chapter 4 · Data Protection & Encryption · Lesson 14 of 24**

## What you'll learn

- Why attachment security is a separate concern from the parent record's own ACLs
- How ACLs on `sys_attachment` close a real gap that record-level ACLs leave open
- Why export is a distinct capability from read access, not a side effect of it
- The real data-leakage risk bulk export introduces that one-at-a-time viewing doesn't
- How to think about both controls as closing the same kind of gap at different layers

## Attachments aren't automatically covered by the parent record's ACL

A user with read access to an Incident record can see its fields — short description, state,
assignment group — according to whatever ACLs apply to the Incident table. It's easy to assume
that same access extends to anything attached to that record: a screenshot, a log file, a signed
document. It doesn't, automatically. Attachments are stored and tracked through their own table,
`sys_attachment`, separate from the record they're attached to, and ACLs can be configured
directly on that table. That means read access to the Incident and read/download access to a
file attached to that Incident are two separate permission checks, not one.

## The gap this closes: record access without attachment access

This separation exists for a real, practical reason. Consider an Incident that includes an
attached file containing something more sensitive than the ticket's own fields — a screenshot
that happens to capture a customer's full account details, or a document with regulated personal
data. The agent working the ticket may need to update its state, read its description, and add
comments — all of which the Incident-level ACL already permits. But that same agent may not need,
or be authorized, to download that specific attached file. Configuring a more restrictive ACL on
`sys_attachment` makes that distinction enforceable: the user keeps full, correct access to the
record itself, while being correctly blocked from the one piece of it — the file — that carries
extra risk.

```
Incident record ACL:                    sys_attachment ACL:
- read: incident_agent role             - read: incident_agent role
  (sees fields, can update state)         AND attachment_viewer role
                                         (file download requires BOTH)

Result: agent sees and works the ticket, but cannot download
        the sensitive attached file without the extra role.
```

## Export is a separate capability from read, not an extension of it

A nearly identical gap exists one level up, at the list level, and it's just as easy to overlook.
A user with legitimate read access to a list of records — say, every Incident in their assignment
group — can open and read each one individually in the UI. Whether that same user can select that
entire list and export it to CSV or Excel is a distinct question, governed by separate export
capabilities and role requirements, not an automatic consequence of having read access to the
underlying records.

```
List of 4,000 Incident records:
- Read access in the UI:        user can open and view each record, one at a time
- Export to CSV/Excel:          requires its own export-capable role or permission
                                 (not granted automatically by read access)
```

## Why the one-at-a-time vs. bulk distinction actually matters

This isn't a formality. Viewing records one at a time in the UI and extracting thousands of
records into a spreadsheet are completely different risks from a data-leakage standpoint. A user
reading records in the UI, one by one, leaves each view inside the platform's own access
controls, audit trail, and session boundaries. A user who exports that same data to a file can
walk away with it entirely — attach it to a personal email, copy it to a USB drive, upload it
somewhere outside the organization's control altogether. The data itself hasn't changed, but the
blast radius of a mistake or a bad actor has grown enormously, because the data has left the
platform's reach. That's exactly why export is worth gating as its own, separate capability rather
than assuming "if they can read it, they can export it."

## Key terms

| Term | Meaning |
|---|---|
| `sys_attachment` | The table ServiceNow uses to store and track files attached to records, separate from the record table itself |
| Attachment ACL | An ACL configured directly on `sys_attachment`, controlling view/download access to files independently of the parent record's own ACL |
| Export capability | A distinct, separately gated permission that controls whether a user can bulk-export a list of records to a file |
| Data-leakage vector | A way sensitive data can escape an organization's controlled systems, such as an unrestricted bulk export |

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: why does having read access to
an Incident record not automatically grant access to a sensitive file attached to it — and why is
bulk-exporting a list of records a meaningfully bigger data-leakage risk than reading those same
records one at a time in the UI?
