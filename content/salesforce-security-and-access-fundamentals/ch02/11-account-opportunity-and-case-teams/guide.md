# Lesson 11 — Account, Opportunity, and Case Teams

**Chapter 2 · Record Access · Lesson 11 of 24**

## What you'll learn

- Teams as reusable, standing access — the counterpart to one-off manual sharing
- Team Role and per-member Access Level, set independently per team member
- Default Team — pre-populating a team automatically instead of rebuilding it record by record
- Account Teams vs. Opportunity Teams vs. Case Teams — same pattern, three objects

## Standing access, not a one-off

Lesson 10 covered manual sharing — one record, one grant, done by hand
every time. **Teams** solve the version of this problem that repeats:
a defined group of people who collaborate on an object's records on an
ongoing basis. **Account Teams**, **Opportunity Teams**, and **Case
Teams** are the same underlying pattern applied to three different
objects — add a member once, with a role and an access level, instead of
manually sharing each new record that comes in.

![An Opportunity's Contacts tab, showing its Opportunity Team related list — team members with roles, and buttons for Add Default Team and Add Opportunity Team Members.](/courses/salesforce-security-and-access-fundamentals/ch02/11-account-opportunity-and-case-teams/opportunity-team-related-list.jpg)

## Team Role and Access Level — set per member

Adding someone to a team isn't just "give them access." Each member gets:

- A **Team Role** — a free-text label like "Sales Engineer" or "Executive
  Sponsor," describing what they actually do on the deal or account
- An **Access Level** on the record — Read Only or Read/Write, independent
  of what their profile, permission sets, or the role hierarchy already
  give them

This is an explicit grant per record type, per member, visible on the form
exactly where it's set.

![Add Opportunity Team Members — Team Role, User, and Opportunity Access as three required fields per row, with a note that a team member's access can exceed the org's default opportunity access settings.](/courses/salesforce-security-and-access-fundamentals/ch02/11-account-opportunity-and-case-teams/add-opportunity-team-members.jpg)

## Default Team — the reusable part

Rebuilding the same team on every new Opportunity would defeat the point.
**Default Team** solves this: configure a standard team once (per user, in
their personal settings, or per account at the org level for Account
Teams), and new records can pull that same team in automatically via
**Add Default Team**, instead of re-adding the same people one by one
every time.

## Where teams fit near other collaboration features

Account, Opportunity, and Case Teams live alongside related
collaboration tools on the same records — Opportunity **Splits**, for
example, which divide revenue credit among team members rather than
granting record access, sit on an adjacent tab of the same Opportunity.
Splits and teams solve different problems (credit allocation vs. record
access) even though they show up in the same part of the UI and often
involve the same people.

![The Splits tab on the same Opportunity — a related but distinct feature from the Team tab: Splits allocate revenue credit, Teams grant record access.](/courses/salesforce-security-and-access-fundamentals/ch02/11-account-opportunity-and-case-teams/opportunity-splits-tab.jpg)

## Key terms

| Term | Meaning |
|---|---|
| Team Role | A free-text label describing what a team member does on the record |
| Access Level | Read Only or Read/Write, set per team member, independent of other access sources |
| Default Team | A pre-configured standard team, added to new records in one click instead of rebuilt each time |

## Check yourself

Why does a team member's Access Level get set independently per person,
rather than inheriting whatever their profile already grants? What
real-world situation does that independence solve?
