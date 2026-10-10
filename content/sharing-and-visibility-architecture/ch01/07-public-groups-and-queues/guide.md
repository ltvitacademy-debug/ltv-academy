# Lesson 7 — Public Groups and Queues

**Chapter 1 · Sharing Building Blocks · Lesson 7 of 24**

## What you'll learn

- What a public group actually is, and why almost every other sharing mechanism in this course depends on one existing
- How nested groups work, and the real risk nesting creates for an architect to manage
- What a queue is, and how it differs from a public group even though both look like "a list of users" on the surface
- Why queue membership grants implicit record access, and what that implies for sharing design

## Public groups are the reusable building block everything else points at

A public group is nothing more than a named, reusable collection of users, roles, roles-and-subordinates, or other public groups. On its own, a public group grants nothing — it has no access level, no object association, no visibility implication by itself. Its entire value is as a *target*: sharing rules point at public groups, manual shares can be granted to a public group, folder access for reports and dashboards is granted to public groups, and queues (covered below) are populated with public groups as members. Almost every mechanism covered earlier in this chapter that needs to address "this specific population of people" does so by pointing at a public group rather than by listing individual users directly, precisely because a group can be edited once and have that edit propagate everywhere it's referenced.

![The access summary page for a public group, showing its membership and where the group's membership can be reviewed and managed.](/courses/sharing-and-visibility-architecture/ch01/07-public-groups-and-queues/public-group-access-summary.png)
*A public group's access summary — the natural place to review exactly who's in a group, since the group itself has no visibility logic until something else points at it.*

## Nesting, and the audit risk it creates

Public groups can contain other public groups, which makes them genuinely powerful for modeling real organizational structure — a "Regional Sales Leadership" group might simply contain "West Coast Sales Managers" and "East Coast Sales Managers" as members, rather than every individual manager being added twice. But nesting is also the single biggest source of "I don't actually know who has access to this" findings in a sharing-architecture review. A sharing rule that grants access to "Regional Sales Leadership" is really granting access to every user transitively reachable through every layer of nesting beneath it, and that full membership isn't visible from the sharing rule itself — someone has to actually trace the group tree to know the true population. An architect reviewing a mature org's sharing design should always ask, for any group used as a sharing-rule target: how many layers deep does this nest, and is there a documented, current list of who's actually in it as a result? Membership changes (someone added to a nested sub-group) silently change who the outer group, and every sharing rule pointed at it, actually reaches — with no notification anywhere that this happened.

## Queues: a different kind of membership

A queue looks superficially like a public group — it's a list of users (and can include roles and other public groups as members too) — but it exists for a fundamentally different purpose: distributing *ownership*, not just visibility. Records assigned to a queue (a common pattern for Leads, Cases, and custom objects used for work intake) don't have an individual owner in the usual sense; they're owned by the queue itself, and any member of that queue can take ownership of a specific record from it, typically through a "take" or "accept" action in list views built for this purpose. This is the mechanism behind round-robin and pooled-ownership patterns: a batch of inbound leads lands in a shared queue, and whichever rep picks one up next becomes its individual owner from that point forward.

Because a queue is, in effect, standing in as the record's owner, every member of that queue automatically has access to every record currently assigned to the queue — this is implicit, not something a separate sharing rule needs to grant, and it disappears the moment a record is taken out of the queue by an individual owner. This is worth contrasting directly with a public group: being a member of a public group grants you nothing by itself, while being a member of a queue grants you real, immediate access to everything sitting in that queue, simply by virtue of membership.

## Key terms

| Term | Meaning |
|---|---|
| Public group | A reusable, named collection of users, roles, or other groups, used as a target by sharing rules, manual shares, and folder access — grants nothing by itself |
| Nested group | A public group that includes another public group as a member, expanding its effective membership transitively |
| Queue | A list of users that can own records collectively; any member can take individual ownership of a record from the queue |
| Implicit queue access | The automatic visibility every queue member has into records currently assigned to that queue, simply by being a member |

## Lab

In a Developer Edition org, create two public groups — "Team A" and "Team B" — and nest Team B inside Team A as a member. Add one unique test user to Team B only, and confirm (through the group's access summary, or by testing a sharing rule pointed at Team A) that the user inherits membership in Team A transitively. Then create a queue for Leads or Cases, add two test users as members, and assign a record to the queue. Confirm both members can see the record, then have one of them take ownership and confirm the other member loses visibility once ownership moves to an individual.

## Check yourself

1. What does a public group grant by itself, with no sharing rule, manual share, or other mechanism pointing at it?
2. Why does group nesting create an audit risk that a flat (non-nested) group doesn't have?
3. How does queue membership grant record access differently from public group membership?
