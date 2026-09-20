# Roles & the Role Hierarchy

Licenses set the outer ceiling on what a user could ever access. This lesson covers the next
layer: **roles**, and specifically the **Role Hierarchy** — the mechanism that decides which
individual records a user can see, based on where they sit in the org's management structure.

## What you'll learn

- What a Role is in Salesforce, distinct from a Profile (covered next lesson)
- How the Role Hierarchy makes data visibility flow upward
- Why this matters directly for what an analyst sees when running the same report as someone
  else

## A Role is a position in the org chart

A **Role** represents where a user sits in the company's reporting structure — Sales Rep,
Sales Manager, VP of Sales, and so on — arranged into a tree, the **Role Hierarchy**, that
generally mirrors the real org chart. Every user can be assigned to one role (or none). On its
own, a role is just a label and a position in a tree; its real power comes from what
Salesforce automatically does with that tree for record visibility.

## Data visibility flows up the hierarchy

Here's the core rule: by default, a user can see any record owned by users **below** them in
the Role Hierarchy, in addition to records they own themselves. A Sales Manager whose role
sits above three Sales Reps in the hierarchy sees their own records *and* all records owned by
those three reps — automatically, without anyone manually sharing anything. Go up another
level, and a VP of Sales sees everything visible to every manager and rep beneath them. This
is why the Role Hierarchy is sometimes described as visibility that flows upward: ownership
sits at the bottom with the person doing the work, and visibility accumulates as you go up the
chart, the same direction real reporting relationships flow.

Visibility does **not** flow sideways or downward by default. Two Sales Reps at the same level
in the hierarchy don't automatically see each other's records just because they share a
manager — only the manager above them does, unless a separate sharing rule (covered in Lesson
29) is configured to change that.

## Why an analyst needs to know this

If you and a colleague run what looks like the identical report and get different numbers,
role hierarchy position is one of the most common, boring explanations — before you assume
the data itself is wrong. A VP running a company-wide pipeline report is seeing legitimately
more records than a rep running the same report filtered to "my records," and that's not a
bug; it's the Role Hierarchy working as designed. Knowing this saves you from chasing a fake
data-quality bug that's actually a visibility difference.

## Key terms

| Term | Meaning |
|---|---|
| Role | A user's position in the org's reporting structure |
| Role Hierarchy | The tree of roles; determines default record visibility |
| Visibility flows up | A user sees records owned by anyone below them in the hierarchy, plus their own |

## Check yourself

Two Sales Reps report to the same Sales Manager. By default, can one rep see the other rep's
records? Why or why not, based on how the Role Hierarchy works?
