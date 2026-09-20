# Profiles & Permission Sets

Licenses set the ceiling. Roles decide which records a user sees. This lesson covers what
decides what a user can actually **do** — create, edit, delete, view a given object or field
at all — through **Profiles** and **Permission Sets**.

## What you'll learn

- What a Profile is, and why every user must have exactly one
- What a Permission Set is, and how it differs from a Profile
- Why real orgs use both together, rather than one or the other

## Profile: the mandatory baseline

Every Salesforce user has **exactly one Profile** — it's not optional, and it's not additive
with other profiles. A Profile is the baseline set of permissions: which objects a user can
see at all, what they can do with those objects (create/read/edit/delete), which apps and tabs
are visible, and default field-level security. Common profiles look like "Sales User,"
"Marketing User," "System Administrator" — one profile per broad job function is typical, and
it's meant to be the floor for that kind of user, not something reconfigured per person.

## Permission Set: additive, stackable grants

A **Permission Set** grants *additional* permissions on top of whatever a user's Profile
already gives them. Unlike a Profile, a user can be assigned **any number** of Permission
Sets — zero, one, or several stacked together. Permission Sets never take permissions away;
they only add. This makes them the right tool for exceptions: a handful of Sales Users who
also need edit access to a custom object that most Sales Users shouldn't touch get a
Permission Set granting exactly that, without needing an entirely separate profile built and
maintained just for those few people.

## Why real orgs use both, deliberately

The combination is the point. Profiles keep broad job functions manageable — you don't want
hundreds of nearly-identical profiles, one per small variation in what someone needs. Permission
Sets handle the exceptions without exploding that profile count. A user's real, effective
access is their Profile's permissions **plus** every Permission Set assigned to them, unioned
together. If you're ever asked why a specific user can do something that seems outside their
job title, the answer is very often "their profile plus a permission set granting the extra
piece," not a mistake.

## Why this matters for an analyst

If a report or a data-entry workflow behaves differently for two users with the "same" job
title, checking both their Profile *and* their assigned Permission Sets (not just the Profile
name) is the right diagnostic step — because permission sets are exactly the mechanism
Salesforce provides for that kind of individual variation, and they're easy to overlook if you
only glance at someone's Profile field.

## Key terms

| Term | Meaning |
|---|---|
| Profile | The mandatory baseline permission set — every user has exactly one |
| Permission Set | An additive, stackable grant of extra permissions on top of a Profile |
| Effective access | A user's Profile permissions plus every assigned Permission Set, unioned |

## Check yourself

Why can't Permission Sets be used to take away a permission a user's Profile already grants
them? What does that "additive only" rule imply about how you'd diagnose overly broad access?
