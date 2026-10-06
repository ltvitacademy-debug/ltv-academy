# Lesson 3 — Profiles Revisited

**Chapter 1 · The Security Model · Lesson 3 of 24**

## What you'll learn

- Why every user has exactly one profile, and what that actually constrains
- What a profile controls beyond object CRUD — apps, tabs, record types, login hours, password policy
- Standard vs. custom profiles, and why Salesforce pushes admins toward the latter
- Salesforce's own guidance: use permission sets for *access*, profiles for the baseline

## The one mandatory setting

Every Salesforce user has **exactly one profile** — it's assigned the
moment the user record is created, it's required, and it's never additive
with another profile the way permission sets are. Whatever the profile
doesn't grant, the user doesn't have, unless a permission set adds it
later.

![The New User page — Profile sits as a required dropdown right next to Role, assigned once at creation.](/courses/salesforce-security-and-access-fundamentals/ch01/03-profiles-revisited/new-user-role-profile.jpg)

## More than CRUD

A profile isn't only object permissions. It also sets, for every user
assigned to it:

- Which **apps** and **tabs** are visible at all
- **Login hours** and **login IP ranges**
- **Password policies** (expiration, complexity, history)
- Default **record type** and **page layout** assignments
- Baseline **field-level security** (before any permission set overrides it)

This is why profiles still matter even in an org that's moved most
day-to-day access management to permission sets — login restrictions and
password policy don't live anywhere else.

## Standard vs. custom profiles

Salesforce ships a set of **standard profiles** (System Administrator,
Standard User, and others depending on edition) that most of their
attributes can't be edited on directly — as Lesson 2 covered, CRUD on
standard objects for standard profiles has been locked since Winter '21.
**Custom profiles**, cloned from a standard one or built from scratch,
are fully editable, which is why real orgs do almost all profile
configuration on custom profiles rather than the ones Salesforce ships.

![The User Profiles list in classic Setup — the Custom column is the tell: unchecked rows are standard profiles with fixed, non-editable attributes.](/courses/salesforce-security-and-access-fundamentals/ch01/03-profiles-revisited/user-profiles-list.jpg)

## Salesforce's own recommendation

Salesforce's help documentation is explicit: *"We strongly recommend that
you use permission sets and permission set groups instead of profiles to
manage your users' object permissions."* The reasoning is reuse — a
handful of small, composable permission sets avoid the alternative of
building dozens of nearly-identical profiles, one per small variation in
what a job function needs. Profiles still set the mandatory baseline and
the settings permission sets can't touch (login hours, password policy);
permission sets handle the rest. Lesson 4 covers that side in full.

## Key terms

| Term | Meaning |
|---|---|
| Profile | The mandatory, single-per-user baseline — object CRUD, apps, tabs, login hours, password policy |
| Standard profile | Salesforce-shipped, mostly non-editable since Winter '21 |
| Custom profile | Editable profile, cloned or built from scratch — where real configuration happens |

## Check yourself

A user needs a different password expiration policy than the rest of
their team, who otherwise need identical object and field access. Can a
permission set solve this alone? Why or why not?
