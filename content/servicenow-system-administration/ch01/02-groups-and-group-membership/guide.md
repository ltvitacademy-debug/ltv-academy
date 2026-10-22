# Lesson 2 — Groups & Group Membership

**Chapter 1 · Users, Groups & Roles · Lesson 2 of 36**

## What you'll learn

- Where groups live: the `sys_user_group` table
- The real table behind membership: `sys_user_grmember`, a many-to-many join between users and groups
- Why "Assignment group" on a task is the backbone of how ServiceNow routes work
- The Group Email and Manager fields, and what they're actually used for
- How group membership shows up as a related list on both the Group and User forms

## Where groups live: sys_user_group

A group is a record on `sys_user_group` — a Service Desk team, a department, an approval body, anything you want to assign work to as a unit rather than to one named person. Just like `sys_user` is the single source of truth for people, `sys_user_group` is the single source of truth for teams. A group record has a name, a description, a type (you can categorize groups — "itil", "approval_group", custom types), and two fields worth knowing by name:

- **Group Email** — a shared mailbox address for the group. When a notification (Chapter 4) is configured to send to "Assignment group," this is the address it uses, so the whole team gets the alert rather than relying on one person to forward it.
- **Manager** — a reference to a `sys_user` record identifying who leads the group. This field gets used in approval workflows ("route to the assignment group's manager for approval") and in reporting on team structure.

## The real membership table: sys_user_grmember

Here's the detail that trips up a lot of new admins: when you open a Group record and look at its "Group Members" related list, or open a User record and look at "Groups," you're looking at two different views into the same underlying data. The actual table doing the work is `sys_user_grmember` — a many-to-many relationship table with (at minimum) a `user` reference field and a `group` reference field. Every row in that table is one person's membership in one group. A user can have many rows (member of many groups); a group can have many rows (many members). The UI never makes you touch `sys_user_grmember` directly — you add members from either form's related list — but knowing that table exists matters the moment you need to write a report, a script, or a background business rule that needs to answer "which users are in this group" or "which groups is this user in" programmatically.

## Why groups matter: Assignment group

Groups aren't just an organizational nicety — they're the real mechanism behind how work gets routed in ServiceNow. Look at any Incident record and you'll find two separate fields: **Assignment group** and **Assigned to**. Assignment group points to a `sys_user_group` record; Assigned to points to a `sys_user` record (optionally blank until someone picks it up). This two-level structure is deliberate: a new incident lands in a queue the whole team can see ("Network Operations," "Service Desk Tier 1") before any individual claims it. That matters for three reasons — work doesn't get stuck with one person who's out sick, managers can see team workload at a glance, and SLA/escalation logic (something you'll meet again later in the course) is almost always written against the assignment group, not the individual assignee. Skipping assignment groups and just assigning everything directly to a person is one of the most common early-admin mistakes, because it throws away all of that visibility.

## Membership is a related list on both forms

Practically, adding someone to a group is a two-click operation: open the Group record, scroll to the **Group Members** related list, and click Edit to add users — or open the User record, scroll to **Groups**, and add the group from there. Both paths write (or remove) a row in `sys_user_grmember`; neither path is "more correct" than the other. Pick whichever form you already have open. This symmetry is the same relational pattern you'll see again when roles enter the picture in Lesson 3 — one join table, surfaced as a related list on both sides of the relationship.

## Key terms

| Term | Meaning |
|---|---|
| `sys_user_group` | The table that stores every group record |
| `sys_user_grmember` | The many-to-many join table tracking which users belong to which groups |
| Assignment group | The field on a task record (like Incident) that routes work to a team's queue |
| Group Email | A shared mailbox address used when notifications target the whole group |
| Manager | A reference to the sys_user who leads the group, used in approvals and reporting |

## Check yourself

Why does assigning every new incident directly to a specific person, instead of to an assignment group first, cause real problems for a Service Desk team — name at least two concrete consequences.
