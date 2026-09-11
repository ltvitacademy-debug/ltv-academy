# Lesson 35 — Security & Role Assignments

**Chapter 8 · Deployment & Administration · Lesson 35 of 40**

## What you'll learn

- What a role assignment actually is, and its three moving parts
- The difference between item-level and system-level security — and why
  they're mutually exclusive
- How security is inherited down the folder hierarchy, and how to break it
- The predefined roles you'll actually use: Browser, Publisher, Content
  Manager

## A role assignment, in three parts

A **role assignment** maps a **user or group account** to a **role
definition** (a named bundle of permitted tasks), for a specific
**securable item** — a folder, a report, a shared data source, or another
resource. All three parts have to be present: who, what they're allowed
to do, and what item that applies to.

Reporting Services ships with predefined role definitions, and in
practice you'll live in three of them:

- **Browser** — view and run reports, nothing more. Assign most users here.
- **Publisher** — add reports and create folders. A smaller group.
- **Content Manager** — full control over an item, including managing its
  security. Only a few people should have this.

## Item-level vs. system-level — and why they don't overlap

This is the part people get wrong first: **item-level** and
**system-level** role assignments are mutually exclusive, and you often
need both.

- **Item-level** role assignments control access to things in the folder
  hierarchy — reports, folders, shared data sources. You set these either
  on a specific item or on the Home folder (which everything inherits
  from by default).
- **System-level** role assignments authorize operations scoped to the
  server as a whole — using Report Builder, working with shared
  schedules — and they don't grant access to anything in the folder
  hierarchy. A system role assignment is *not* the same thing as being a
  system administrator; it doesn't confer full control on its own.

Because they're mutually exclusive, adding a user to a report server is
genuinely a two-part operation: an item-level assignment so they can
reach content, and a system-level one so they can use site-wide features.

## Inheritance, and breaking it

Role assignments are **inherited** down the folder hierarchy: a report
and its subfolders inherit whatever's assigned on the parent folder,
all the way down from Home. You can override this by creating a new,
item-specific role assignment — the web portal calls this
**customizing security** — but every item in the hierarchy must be
secured by *something*; you can't leave an item unsecured.

Here's that override in practice, on a specific report's Security page:

![The web portal Security page for a report named Product_Sales, with Add group or user highlighted and BUILTIN\Administrators already listed.](/courses/ssrs/ch08/35-security-and-role-assignments/report-add-group-user.png)
*Once security is customized for this item, Add group or user creates a role assignment scoped to it alone — no longer inherited from Home.*

Notice the left-hand menu on that same page — Properties, Parameters,
Data sources, Subscriptions, Caching, History snapshots, Security. Lesson
36 covers Caching and History snapshots; this lesson is about the
Security entry specifically.

## Key terms

| Term | Meaning |
|---|---|
| Role assignment | Maps a user/group to a role definition, for a specific securable item |
| Role definition | A named bundle of permitted tasks — Browser, Publisher, Content Manager, etc. |
| Item-level security | Controls access to folders, reports, and other content-hierarchy items |
| System-level security | Authorizes server-wide operations (Report Builder, shared schedules) — not tied to any item |
| Customize security | Breaking inheritance to create a role assignment scoped to one specific item |

## Lab

1. In the web portal, locate any report, open its **Manage** menu, and
   select **Security**. Confirm whether it currently inherits security
   from its parent folder, or has already been customized.
2. If it's still inherited, select **Customize security**, confirm the
   prompt, then **Add group or user** and assign yourself (or a test
   account) the **Browser** role on that one report only — leaving every
   other report under the same folder untouched.

## Check yourself

You're ready for Lesson 36 when you can explain: why are item-level and
system-level role assignments mutually exclusive, and why does that mean
granting a new user access to a report server is a two-part job, not a
one-part job?
