# Lesson 12 — Public Groups and Queues

**Chapter 2 · Record Access · Lesson 12 of 24**

## What you'll learn

- Public Groups as the reusable recipient every sharing rule and group-based grant points at
- What a public group can actually contain — users, roles, other groups, and more
- Queues as a distribution mechanism, not just an access grant
- Why queues and public groups solve different problems even though both are "a bunch of users"

## Public Groups: the reusable recipient

Sharing rules (Lesson 9) always share to a public group, a role, or a role
and its subordinates — never to an individual directly. **Public Groups**
are what make that possible: a named, reusable bundle of members that
exists independently of any one sharing rule, built once and referenced
by as many rules, report folder permissions, or list view restrictions as
needed.

A public group's members aren't limited to individual users — a group can
contain **users, roles, roles and subordinates, other public groups, and
more**, nested arbitrarily. **Grant Access Using Hierarchies** is a
setting on the group itself too, controlling whether access the group
grants also flows up the role hierarchy from its members.

![Creating a new Public Group — Label, Group Name, the Grant Access Using Hierarchies checkbox, and a Roles search populating the Selected Members list.](/courses/salesforce-security-and-access-fundamentals/ch02/12-public-groups-and-queues/new-public-group.jpg)

## Queues: distribution, not just access

A **Queue** looks similar on the surface — it's also a named collection
of users — but it solves a different problem. A queue is a **holding
location for unassigned records**: cases, leads, or other objects route
into a queue (manually or via assignment rules) and sit there until a
member of the queue **accepts** one to work it, or it gets reassigned
elsewhere. Queue membership does grant access to records in the queue,
but the point of a queue is workload distribution, not just visibility.

![The Queues setup page — Escalation, Platinum Support, and Priority queues, each scoped to the Case object as their Supported Objects.](/courses/salesforce-security-and-access-fundamentals/ch02/12-public-groups-and-queues/queues-setup-list.jpg)

Adding members to a queue uses the same Available/Selected picker pattern
seen throughout this chapter — search by user, role, or public group, move
them into Selected Members.

![Queue Members — searching available users and moving selected ones into the queue, the same interaction pattern used for roles, public groups, and manual sharing.](/courses/salesforce-security-and-access-fundamentals/ch02/12-public-groups-and-queues/queue-members-dialog.jpg)

## Why both exist

Public groups answer "who should be able to see this" — a sharing rule's
target, a report folder's audience. Queues answer "who's responsible for
working this, and how does it get assigned" — a Case's resting place
until a support rep claims it. A support team might use a public group to
share escalated cases broadly for visibility, and a queue, scoped to the
same object, to actually route unworked cases to whoever picks them up
next. Different jobs, often used together on the same object.

## Key terms

| Term | Meaning |
|---|---|
| Public Group | A reusable, named bundle of users/roles/groups — the recipient sharing rules point at |
| Queue | A holding location for unassigned records, with members who can accept and work them |
| Grant Access Using Hierarchies | A setting on the group controlling whether its access flows up the role hierarchy too |

## Check yourself

A support manager wants both "everyone on the team can see escalated
cases" and "unworked cases sit somewhere until someone claims one." Which
mechanism solves which half, and why can't one object do both jobs?
