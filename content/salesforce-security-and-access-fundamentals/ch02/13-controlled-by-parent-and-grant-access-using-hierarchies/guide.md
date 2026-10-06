# Lesson 13 — Controlled by Parent and Grant Access Using Hierarchies

**Chapter 2 · Record Access · Lesson 13 of 24**

## What you'll learn

- Controlled by Parent: why some objects don't get their own OWD level at all
- Which objects default to Controlled by Parent, and why Contact and Asset are among them
- Grant Access Using Hierarchies: what turning it off actually does, and why it's rare
- Closing out Chapter 2 — how all seven mechanisms fit together

## Controlled by Parent

You've seen **Controlled by Parent** sitting in the OWD screenshot since
Lesson 7, on rows like Order, Contact, and Asset, instead of Private,
Public Read Only, or Public Read/Write. It means exactly what it says:
that object has **no independent OWD of its own** — a user's access to a
Contact is whatever their access to that Contact's **parent Account**
already is. See the Account, see the Contact. Edit the Account, edit the
Contact. There's no separate sharing model to configure, because the
object is designed to inherit its access entirely from the relationship it
belongs to.

![The Organization-Wide Defaults page — Order, Contact, and Asset all set to Controlled by Parent for both Internal and External Access, instead of an independent Private/Public level.](/courses/salesforce-security-and-access-fundamentals/ch02/13-controlled-by-parent-and-grant-access-using-hierarchies/owd-edit-page.jpg)

This makes sense once you think about what these objects actually are: a
Contact without an Account rarely makes sense as its own independently-
secured thing, and neither does an Asset detached from the Account that
owns it. Controlled by Parent avoids the pointless work of maintaining a
parallel, separately-configured sharing model for data that's conceptually
part of its parent anyway.

## Grant Access Using Hierarchies

This checkbox has appeared throughout the chapter — on OWD rows, and on a
public group's own detail page. It controls one specific thing: whether
the **role hierarchy** (Lesson 8) is allowed to apply to that object's
sharing at all. On by default and locked for most standard objects, it
can be turned **off** for custom objects when an org genuinely wants
record access to ignore management structure entirely — a case where
seniority truly shouldn't translate into automatic visibility.

![A public group's detail page, showing Grant Access Using Hierarchies as "Enabled" — the same setting appears at the OWD level too, and controls identically whether the role hierarchy applies.](/courses/salesforce-security-and-access-fundamentals/ch02/13-controlled-by-parent-and-grant-access-using-hierarchies/reviewers-public-group-sharing-tabs.jpg)

Turning it off is rare and deliberate — it's the one lever that can make a
manager genuinely unable to see a report's records through the hierarchy
alone, which is unusual enough that most orgs never touch it.

![Creating a new Public Group — Grant Access Using Hierarchies appears again here, confirming it's a property of the sharing recipient, not just a one-time OWD toggle.](/courses/salesforce-security-and-access-fundamentals/ch02/13-controlled-by-parent-and-grant-access-using-hierarchies/new-public-group.jpg)

## Closing out Chapter 2

Seven lessons, one stack: **OWD** sets the floor (or hands it off entirely
via **Controlled by Parent**), the **role hierarchy** widens it upward
automatically if **Grant Access Using Hierarchies** allows it, **sharing
rules** widen it to configured groups, **manual sharing** widens it
one record at a time, and **teams** provide standing collaborative access
on top of all of it — with **public groups and queues** as the reusable
containers several of those mechanisms point at. Chapter 3 moves from
*how the model works* to *applying it* — designing security for real sales
and service organizations.

## Key terms

| Term | Meaning |
|---|---|
| Controlled by Parent | No independent OWD — access inherits entirely from the parent record |
| Grant Access Using Hierarchies | Controls whether the role hierarchy applies to an object's or group's sharing |

## Check yourself

Why doesn't Contact get its own Private/Public Read Only/Public
Read/Write setting the way Account does? What would configuring one
separately actually have to account for, that Controlled by Parent avoids?
