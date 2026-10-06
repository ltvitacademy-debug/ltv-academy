# Lesson 21 — Sharing Settings and Recalculation

**Chapter 4 · Beyond the Basics · Lesson 21 of 24**

## What you'll learn

- What the Sharing Settings page actually controls, beyond just OWD
- Why sharing has to be **recalculated**, and what triggers it
  automatically versus manually
- What happens, concretely, during a large sharing recalculation
- Why recalculation timing matters for anyone planning an OWD or
  role-hierarchy change

Chapters 1-3 treated OWD, roles, and sharing rules as settings you
configure once. This lesson covers the machinery that keeps the actual
access **in sync** with those settings as data and org structure
change — and why that machinery isn't instantaneous.

## The Sharing Settings page

Setup → **Sharing Settings** is the home for everything covered in
Chapter 2: it's where OWD is set per object, where sharing rules are
created and listed, and where a few org-wide toggles live — including
**Manage public groups**, **Manage sharing**, and, for orgs with
external users, **Secure guest user record access** (covered fully in
Lesson 22). It's the single screen that shows the record-access model
for the whole org at a glance, which is also why the audit in Lesson
20 used it as a starting point for Finding 1.

## Why sharing needs recalculating at all

Record access isn't computed fresh every time someone opens a record —
Salesforce maintains **sharing tables** behind the scenes that
precompute who can see what, so that pulling up a record or running a
report doesn't have to re-derive the entire OWD/hierarchy/sharing-rule
chain on every click. Those tables have to be rebuilt whenever
something that feeds into them changes:

```
Triggers automatic recalculation:
  - A user's role changes
  - A user is added to or removed from a role
  - Account/Opportunity/Case ownership changes
  - A sharing rule's criteria or target group changes

Requires a MANUAL recalculation:
  - Changing which fields a criteria-based sharing rule evaluates,
    in some cases
  - After certain bulk data operations or org changes, if Salesforce
    flags that automatic recalculation didn't fully run
```

Most day-to-day changes — a new hire, a promotion, a reassigned
Opportunity — trigger recalculation automatically, in the background,
without an admin doing anything extra. The manual case exists because
Salesforce's own documentation calls out specific actions where you
should trigger it yourself, and because large-scale structural changes
(a role hierarchy redesign, a new sharing rule retrofitted onto
millions of existing records) can be initiated manually from the
**Sharing Settings** page with a **Recalculate** button next to each
sharing rule.

## What recalculation actually does

Recalculation walks every affected record and reevaluates who should
have access to it under the current OWD, role hierarchy, and sharing
rules, then updates the underlying sharing tables to match. For a
small org this is fast and invisible. For an org with millions of
records and a non-trivial role hierarchy, a full recalculation is a
genuinely heavy background job — Salesforce queues and processes it
asynchronously, and it can take anywhere from minutes to hours
depending on data volume and hierarchy depth. During that window,
access reflects the *old* sharing model until the job catches up.

## Why this matters for planning a change

If Lesson 20's Finding 1 fix (changing Opportunity OWD from Public
Read/Write to Private) goes live for Brightwell Insurance Group, every
existing Opportunity needs its sharing reevaluated against the new OWD
and the existing role hierarchy — this is exactly the kind of change
that triggers a large recalculation. The practical implications:

- **Plan the timing.** Trigger large OWD or hierarchy changes during
  low-usage windows, not in the middle of a sales team's biggest
  reporting day.
- **Don't assume instant effect.** Testing the change immediately
  afterward (Lesson 17's Login As) may show stale results until the
  recalculation finishes — a real source of "but I just changed the
  OWD" confusion.
- **Watch the limit.** Very large recalculations can run into
  Salesforce's processing limits; Salesforce Support can advise on
  staging a change like this for orgs at the high end of data volume.

## Key terms

| Term | Meaning |
|---|---|
| Sharing table | The precomputed internal record of who has access to what, kept in sync by recalculation |
| Automatic recalculation | Recalculation triggered by ordinary changes (ownership, role, sharing-rule edits) with no admin action needed |
| Manual recalculation | Recalculation an admin explicitly triggers from Sharing Settings, typically for large structural changes |

## Check yourself

You change a role hierarchy's structure at 9am on a Monday, right as
the sales team starts their week. Based on this lesson, what would you
do differently, and why?
