# Delegated Administration

**Chapter 1 · Users and Access · Lesson 10 of 36**

Not every administrative task needs a full System Administrator. A regional office manager who
resets passwords and unlocks accounts for their own team doesn't need the keys to the whole org —
and handing out the System Administrator profile just to cover a handful of routine tasks is how
orgs end up with far more admins than they ever meant to have. **Delegated administration** is
Salesforce's built-in way to hand over a narrow, specific slice of admin work without widening
access any further than that.

## What you'll learn

- What a delegated administrator can and can't do
- How to find Delegated Administration in Setup
- How to build a Delegated Group and give it something to manage
- Why Assignable Profiles is the setting that keeps delegation from becoming a backdoor to full access

## Finding Delegated Administration

From Setup, the Quick Find box takes you straight there — it lives under the same **Security
Controls** section as Sharing Settings, Password Policies, and Session Settings.

![The Security Controls menu in Setup, with Delegated Administration circled in red near the bottom of the list, below Expire All Passwords and above Remote Site Settings.](/courses/salesforce-administration/ch01/10-delegated-administration/security-controls-menu.webp)
*Delegated Administration sits alongside the org's other security settings — it's a security boundary, not a convenience feature.*

## Creating a Delegated Group

Everything in delegated administration is organized around a **Delegated Group**: a named
container that holds both *who* the delegated administrators are and *what* they're allowed to
manage. Click **New** next to Delegated Groups, give it a name, and decide whether to **Enable
Group for Login Access** — which lets members of this group log in as the users they administer,
a significant permission worth granting deliberately rather than by default.

![The New Delegated Group edit form, with the Delegated Group Name field set to "Delegate user group" and the Enable Group for Login Access checkbox checked, Save and Cancel buttons above.](/courses/salesforce-administration/ch01/10-delegated-administration/new-delegated-group.webp)
*A delegated group starts as just a name and one checkbox — the real configuration happens on the detail page after Save.*

## What a delegated group can be handed

Saving the group opens its detail page, which is really a set of five related lists — each one a
different slice of administrative power you can delegate independently:

| Related list | What it hands over |
|---|---|
| Delegated Administrators | Which users are members of this group |
| User Administration | Which roles (and their subordinates) this group can create and edit users within |
| Assignable Profiles | Which profiles this group's members are allowed to assign to a user |
| Assignable Permission Sets | Which permission sets this group's members are allowed to assign |
| Custom Object Administration | Which custom objects this group can fully administer (fields, page layouts, etc.) |

![The Delegated Group Detail page showing the Delegated Administrators, User Administration, Assignable Profiles, Assignable Permission Sets, and Custom Object Administration related lists, each currently empty with an Add button.](/courses/salesforce-administration/ch01/10-delegated-administration/delegated-group-detail.webp)
*Every related list starts empty — a new delegated group can do nothing until you deliberately add to each one.*

## Assignable Profiles: the guardrail

User Administration lets a delegated admin create and edit users, but creating a user means
assigning them a profile — and without a limit, a delegated admin could create a brand-new user
and hand them the System Administrator profile, defeating the entire point of delegating in the
first place. **Assignable Profiles** closes that gap: it's the explicit list of profiles this
group's members are permitted to assign. Anything not on that list simply isn't offered to them.

![The Assignable Profiles add dialog, with "Standard User" entered in the first lookup field and four more empty lookup rows below it, Save button above.](/courses/salesforce-administration/ch01/10-delegated-administration/delegated-assignable-profiles.webp)
*A delegated admin managing new hires on a sales team might be scoped to exactly one profile here — Standard User — and nothing else.*

## Why this matters more than it looks

Delegated administration isn't about trust in a person — it's about limiting the blast radius of
a mistake or a compromised account. A delegated admin who can only create users in one role
hierarchy, only assign one or two profiles, and only touch a couple of custom objects can do real
day-to-day work without ever being in a position to see or change the things a System
Administrator can. That's a meaningfully smaller attack surface than handing out full admin
access to cover routine requests.

## Key terms

| Term | Meaning |
|---|---|
| Delegated Group | The named container holding who can delegate-administer and what they can touch |
| Enable Group for Login Access | Lets this group's members log in as the users in their scope |
| Assignable Profiles | The explicit list of profiles a delegated group's members may assign to a user |
| User Administration (scope) | The roles and subordinates a delegated group may create/edit users within |

## Check yourself

Why does Assignable Profiles matter even after a delegated admin already has permission to create
and edit users?
