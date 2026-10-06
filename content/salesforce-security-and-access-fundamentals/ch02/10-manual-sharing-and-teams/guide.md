# Lesson 10 — Manual Sharing and Teams

**Chapter 2 · Record Access · Lesson 10 of 24**

## What you'll learn

- Manual sharing: the one-off, record-by-record exception at the top of the stack
- Why manual sharing is the only mechanism not automated or rule-driven
- What happens to a manually-shared record when it changes owner
- Teams as a preview of the next lesson — collaborative, standing access vs. a single one-off grant

## The top of the stack

OWD sets the floor. The role hierarchy opens it automatically, upward.
Sharing rules open it to configured groups, by rule. **Manual sharing** is
the last and most granular layer: a record owner (or anyone with
sufficient access) sharing **one specific record** with **one specific
user or group**, by hand, through the record's own Share button — no rule,
no hierarchy, no criteria, just a direct grant on that one record.

![The record-access stack — Manual Sharing sits at the very top, the one-off layer above everything automated below it.](/courses/salesforce-security-and-access-fundamentals/ch02/10-manual-sharing-and-teams/sharing-layers-diagram.png)

## Why it's different from everything else in this chapter

Every other mechanism in Chapter 2 is **systematic** — OWD, roles, and
sharing rules apply the same way to every matching record, automatically,
every time. Manual sharing is the opposite: it's a deliberate, individual
action on a single record, the kind of thing an admin or owner reaches for
when nothing systematic fits the situation. A classic example from
Salesforce's own training: a recruiter going on vacation temporarily shares
their open job applications with a colleague covering for them — a need
too narrow and too temporary to justify a sharing rule.

The interaction pattern should look familiar from elsewhere in Salesforce:
an "available" list on one side, a "selected" list on the other, Add and
Remove buttons moving entries between them — the same picker UI Salesforce
reuses across role assignment, group membership, and manual sharing alike.

![The same Add/Remove picker pattern used throughout Salesforce wherever you grant access to specific users or groups — role assignment shown here, manual sharing works identically.](/courses/salesforce-security-and-access-fundamentals/ch02/10-manual-sharing-and-teams/assign-users-picker.jpg)

## What happens when ownership changes

Manual shares are tied to the record, not guaranteed to survive every
change to it. If a record's **owner changes**, Salesforce removes manual
shares that the *previous* owner granted (since the grant was theirs to
give), unless the new owner is above the old one in a hierarchy that
already covers it. This is a real, practical gotcha: a manually-shared
record can quietly stop being shared the moment ownership transfers,
without an error or notification calling it out.

## Teams — a preview

**Account Teams**, **Opportunity Teams**, and **Case Teams** (Lesson 11)
solve a related but distinct problem: *standing, collaborative* access for
a defined group of people who work a record together on an ongoing basis
— not a single ad-hoc share, but a reusable team structure with its own
roles and access levels, re-applied automatically as new records of that
type come in. Manual sharing is a one-time grant on one record; teams are
a durable structure that keeps working across many records.

## Key terms

| Term | Meaning |
|---|---|
| Manual sharing | A one-off grant of access to one record, for one user or group, via the Share button |
| Add/Remove picker | The interaction pattern Salesforce reuses for granting access to specific users or groups |
| Ownership change | Can remove manual shares the previous owner granted — a real gotcha to watch for |

## Check yourself

A recruiter manually shares a job application record with a colleague,
then transfers ownership of that record to someone else. What should you
expect to happen to the colleague's access, and why?
