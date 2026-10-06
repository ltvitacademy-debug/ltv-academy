# Lesson 4 — Permission Sets Revisited

**Chapter 1 · The Security Model · Lesson 4 of 24**

## What you'll learn

- Why permission sets are additive-only, and what that guarantees about safety
- Permission Set Groups — bundling multiple permission sets into one assignable "persona"
- Muting permissions inside a group, and why that's the one exception to "additive only"
- Reading the Status column: Up to Date vs. Outdated

## Additive, stackable, never subtractive

A **permission set** grants permissions on top of whatever a user's
profile already provides. A user can be assigned **zero, one, or many**
permission sets, and they only ever add — a permission set can never take
away something the profile already grants. That asymmetry is what makes
permission sets safe to hand out liberally: stacking one more on a user
can only expand their access, never shrink it unexpectedly.

This makes permission sets the right tool for exceptions: a handful of
Sales Users who also need edit access to a custom object most Sales Users
shouldn't touch get a permission set granting exactly that piece, without
a whole new profile built and maintained for a handful of people.

## Permission Set Groups — bundling into a persona

As the number of small, single-purpose permission sets grows, assigning
five or six of them to every new hire in a role gets tedious and
error-prone. A **Permission Set Group** bundles multiple permission sets
into one object a user can be assigned in a single click — effectively
representing a job persona built from reusable pieces.

![The Permission Set Groups list in Setup — "Price Surveys" shown with its Status (Outdated here, meaning Salesforce hasn't finished recalculating its combined permissions yet).](/courses/salesforce-security-and-access-fundamentals/ch01/04-permission-sets-revisited/permission-set-groups-list.jpg)

A single permission set group is simply a container: the user is assigned
the group once, and gets the union of every permission set inside it —
the diagram below shows the same shape Salesforce's own documentation
uses to explain it.

![A Permission Set Group containing three separate permission sets (A, B, C); users assigned the group inherit all three automatically instead of being assigned each one individually.](/courses/salesforce-security-and-access-fundamentals/ch01/04-permission-sets-revisited/permission-set-group-diagram.png)

## The one exception: muting

Permission set groups have exactly one escape hatch from "additive only":
**muting**. Inside a group, you can mute a specific permission from one of
its member permission sets — suppressing just that one grant without
removing the permission set itself from the group, and without touching
that permission set anywhere else it's used standalone. This is narrow by
design: it only works inside the group's own calculation, never against a
profile or an independently-assigned permission set.

## Status: Up to Date vs. Outdated

Permission set groups show a **Status** column — Up to Date once
Salesforce has finished recalculating the group's combined permissions
after a change, or **Outdated** immediately after you edit a member
permission set, until that recalculation finishes. A group showing
Outdated hasn't fully applied its latest change yet; checking Status is a
real troubleshooting step when a user's access doesn't match what you just
configured.

## Key terms

| Term | Meaning |
|---|---|
| Permission Set | Additive-only grant on top of a profile; a user can have any number |
| Permission Set Group | A bundle of permission sets, assignable as one unit — a persona |
| Muting | The one way to suppress a permission inside a group without removing it elsewhere |

## Check yourself

Why is "additive only" the property that makes permission sets safe to
assign liberally, and what would change about that safety if a permission
set could also revoke access?
