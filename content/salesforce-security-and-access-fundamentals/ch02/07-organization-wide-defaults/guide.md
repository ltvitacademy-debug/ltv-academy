# Lesson 7 — Organization-Wide Defaults

**Chapter 2 · Record Access · Lesson 7 of 24**

## What you'll learn

- Organization-Wide Defaults (OWD) as the floor every record-level mechanism builds on
- Private, Public Read Only, and Public Read/Write — what each actually grants
- Internal vs. External default access, and why they're separate columns
- A simple decision framework for picking the right default per object

## The floor, not the ceiling

Chapter 1 settled what a user can *do* with an object. Chapter 2 starts on
the second question: which *records* can they see at all. **Organization-
Wide Defaults (OWD)** is where that starts — it sets the baseline access
every user has to records they **don't own**, before the role hierarchy,
sharing rules, or manual sharing add anything on top. Nothing below OWD in
the record-access stack can see further than OWD allows; those mechanisms
only ever open access *wider*, never narrower.

![The Organization-Wide Sharing Defaults Edit page — every major object with its own Default Internal Access, Default External Access, and Grant Access Using Hierarchies setting.](/courses/salesforce-security-and-access-fundamentals/ch02/07-organization-wide-defaults/owd-edit-page.jpg)

## The three levels that matter most

- **Private** — only the record owner (and users above them in the role
  hierarchy, if Grant Access Using Hierarchies is on) can see it.
- **Public Read Only** — everyone in the org can view the record; only the
  owner (and role hierarchy) can edit it.
- **Public Read/Write** — everyone in the org can view *and* edit it.

Notice from the screenshot that OWD is set **per object**, not once for
the whole org: Opportunity might be Public Read/Write while Case is Public
Read/Write/Transfer and Lead is Public Read/Write/Transfer too, each
reflecting how collaborative that object's workflow actually needs to be.

## Internal vs. External — two separate columns

Every object's OWD has **two** settings, not one: **Default Internal
Access** for employees inside the org, and **Default External Access**
for portal, community, or guest users outside it. External access can
never be more permissive than internal access — you can't open a record
to the outside world more than you've opened it to your own employees.
This is why the External column is frequently set to Private even when
Internal is Public Read/Write.

## Choosing a level: three questions

A simple decision sequence, used widely by Salesforce admins, narrows the
choice fast:

1. Who is the *most restricted* user who needs this object at all?
2. Will there ever be an instance of this object that user shouldn't be
   allowed to **see**? If yes → **Private**.
3. If they can see every instance, will there ever be one they shouldn't
   be allowed to **edit**? If yes → **Public Read Only**. If no →
   **Public Read/Write**.

![A decision tree for choosing an object's sharing model: Private if there's ever a record the most restricted user shouldn't see, Public Read-Only if they can see everything but not edit everything, Public Read/Write otherwise.](/courses/salesforce-security-and-access-fundamentals/ch02/07-organization-wide-defaults/sharing-model-decision-tree.jpg)

## Where OWD sits in the bigger picture

OWD is the bottom layer of a stack this chapter builds lesson by lesson:
sharing rules and manual sharing only ever widen what OWD already allows,
never narrow it, and the role hierarchy (Lesson 8) sits directly above
OWD as the next, automatic layer of widening.

![The record-access stack — Organization-Wide Defaults at the base, Role Hierarchy above it, Sharing Rules above that, Manual Sharing at the top: each layer only ever opens access wider.](/courses/salesforce-security-and-access-fundamentals/ch02/07-organization-wide-defaults/sharing-layers-diagram.png)

## Key terms

| Term | Meaning |
|---|---|
| OWD | The baseline record access every user has, before any other mechanism adds more |
| Private / Public Read Only / Public Read/Write | The three core access levels, per object |
| Internal / External Access | Two separate OWD settings; external can never exceed internal |

## Check yourself

An object is set to Private internally. Can a sharing rule or the role
hierarchy ever grant a user *less* access than Private for that object?
Why does the direction of every later mechanism only go one way?
