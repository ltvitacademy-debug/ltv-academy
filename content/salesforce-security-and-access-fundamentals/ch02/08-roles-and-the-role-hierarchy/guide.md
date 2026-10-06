# Lesson 8 — Roles and the Role Hierarchy

**Chapter 2 · Record Access · Lesson 8 of 24**

## What you'll learn

- How the role hierarchy automatically widens access above whatever OWD sets
- "Up the tree, not across it" — the one direction access actually flows
- What a role grants beyond visibility: Opportunity Access and Case Access settings
- Role hierarchy vs. the org chart — related, but not the same thing

## Automatic widening, upward only

Lesson 7 established OWD as the floor. The **role hierarchy** is the first
mechanism that automatically widens it: a user in a role that reports up
to another role gives everyone **above** them in that chain the same
access to their records that OWD already grants the owner — read, or
read/write, depending on the OWD level and the specific access settings on
that role.

This only works if OWD's **Grant Access Using Hierarchies** checkbox is
on for that object (Lesson 7's screenshot showed this column) — it's
checked by default for every standard object and can't be unchecked for
most of them, but it's a real, visible setting worth knowing is there.

![The Roles setup page in tree view — Example Company at the top, CEO beneath, then VP Development branching into Directors, Managers, and individual contributors beneath that.](/courses/salesforce-security-and-access-fundamentals/ch02/08-roles-and-the-role-hierarchy/role-hierarchy-tree.jpg)

## Up the tree, not across it

The hierarchy only flows **upward**: a manager sees their reports' records
(and their reports' reports, and so on down that one branch), but peers in
parallel branches see nothing extra from each other, and reports never
see anything extra from their managers either. "QA Engineer" reporting to
"Director QA" doesn't grant QA Engineer any special access to Director
QA's records — only the reverse.

## More than just visibility

A role isn't only a position in a tree — its detail page shows explicit
**Opportunity Access** and **Case Access** settings that describe exactly
what users in that role can do with records owned by people below them:
"Users in this role can edit all opportunities associated with accounts
that they own, regardless of who owns the opportunities" is a real
example of the specific, readable language Salesforce uses for this.

![A role's detail page — Hierarchy breadcrumb showing its place in the tree, plus explicit Opportunity Access and Case Access language describing exactly what that upward grant covers.](/courses/salesforce-security-and-access-fundamentals/ch02/08-roles-and-the-role-hierarchy/onboarding-manager-role-detail.jpg)

## Role hierarchy vs. org chart

The role hierarchy is often *modeled* on the org chart, but they aren't
required to be identical, and conflating them causes real misconfiguration.
The role hierarchy exists purely to control data visibility; the org chart
exists to reflect who manages whom. A sample hierarchy built around sales
territories — CEO, then regional sales directors, then reps under each —
shows a tree built for access, not for HR reporting lines.

![A sample role hierarchy built around sales territories — reps report to directors, directors report to the CEO role, purely to control which records roll up to whom.](/courses/salesforce-security-and-access-fundamentals/ch02/08-roles-and-the-role-hierarchy/sample-role-hierarchy.jpg)

## Key terms

| Term | Meaning |
|---|---|
| Role Hierarchy | A tree that automatically widens access upward from a record's owner |
| Grant Access Using Hierarchies | The OWD setting that must be on for a role hierarchy to apply to an object |
| Opportunity/Case Access | Explicit role settings describing exactly what the upward grant covers |

## Check yourself

Two users are peers, in parallel branches of the role hierarchy reporting
to the same manager. Does either one gain any access to the other's
records through the hierarchy alone? Why or why not?
