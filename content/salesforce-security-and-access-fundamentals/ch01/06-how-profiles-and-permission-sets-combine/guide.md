# Lesson 6 — How Profiles and Permission Sets Combine

**Chapter 1 · The Security Model · Lesson 6 of 24**

## What you'll learn

- The union rule: effective object/field access is the sum of every applicable grant
- Why "deny" doesn't exist at this layer — nothing a permission set or profile does can subtract
- How to actually read combined access from Object Manager instead of guessing
- A worked example of the union in practice

## The union rule

A user's **effective access** to an object or field is the **union** of:

1. Their one profile
2. Every permission set assigned to them, individually
3. Every permission set inside every permission set group assigned to them

There is no "most restrictive wins" and no "last one applied wins." Every
grant from every source adds together, and the broadest result across all
of them is what the user actually has. If *any* profile or permission set
grants Edit on a field, the user has Edit — full stop, regardless of how
many other sources stay silent on it.

## There's no "deny" at this layer

This is the detail that trips people up coming from other systems: neither
a profile nor a permission set has a "deny" or "remove" setting for object
or field permissions. The only way access *doesn't* exist is if **nothing
assigned to the user ever granted it**. You cannot claw back a permission
with a second permission set — the only lever is not granting it in the
first place, or (inside a permission set group only) muting it from Lesson
4.

## Reading it from Object Manager

Guessing a user's effective access by mentally combining their profile and
every permission set is error-prone past a handful of sources. Object
Manager's **Object Access** tab does the combining for you — switch
between the Permission Sets, Permission Set Groups, and Profiles sub-tabs
to see exactly which sources grant which CRUD permissions for this object,
side by side.

![Object Manager's Object Access tab for Account — Permission Set Groups and Profiles each listed with their own CRUD columns; a user's real access is the union across whichever of these are actually assigned to them.](/courses/salesforce-security-and-access-fundamentals/ch01/06-how-profiles-and-permission-sets-combine/object-access-crud-matrix.jpg)

## A worked contrast

Picture two users with permission sets assigned individually, with no
group: User A has Permission Set A and B; User B has Permission Set B and
C. Both get the union of whatever each of their assigned sets grants —
nothing shared beyond what the specific sets they hold provide.

![Without a permission set group, each user is wired individually to the specific permission sets they need — the union still applies, but there's no single assignable bundle.](/courses/salesforce-security-and-access-fundamentals/ch01/06-how-profiles-and-permission-sets-combine/ungrouped-permission-sets-diagram.png)

Now group Permission Sets A, B, and C into one Permission Set Group.
Assign the group to a new user, and they get the union of all three in one
click — the same "union" math, just packaged for reuse instead of wired
one by one.

![A Permission Set Group bundling three permission sets — assigning the group once gives a user the union of everything inside it, the same math as assigning each piece individually.](/courses/salesforce-security-and-access-fundamentals/ch01/06-how-profiles-and-permission-sets-combine/permission-set-group-example-diagram.png)

## Key terms

| Term | Meaning |
|---|---|
| Effective access | The union of a user's profile plus every permission set (direct or via group) |
| Union rule | Any one grant from any one source is enough — nothing subtracts |
| Muting | The only exception — suppresses a grant inside a group's own calculation only |

## Check yourself

A user's profile denies Edit on a field, but a permission set assigned to
them grants it. What's their actual effective access, and why does
"denies" not really describe what the profile is doing here?
