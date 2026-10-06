# Script — Profiles Revisited

## Segment 1 (title)

You met profiles in the overview as the mandatory baseline. This lesson goes deeper — what a profile actually controls beyond object CRUD, and why Salesforce itself tells admins to lean on permission sets instead.

## Segment 2 (screenshot: New User)

Every user has exactly one profile, assigned the moment the user record is created. It's required, and unlike a permission set, it's never additive with another profile. Whatever the profile doesn't grant, the user doesn't have — until a permission set adds it.

## Segment 3 (steps: what a profile controls)

A profile isn't only CRUD. It sets which apps and tabs are visible, login hours and IP ranges, password policy — expiration, complexity, history — default record types and page layouts, and baseline field-level security before any permission set overrides it. That's why profiles still matter even in orgs that have moved most day-to-day access to permission sets: login restrictions and password policy don't live anywhere else.

## Segment 4 (screenshot: User Profiles list)

Standard profiles — System Administrator, Standard User, and others — are mostly locked down; CRUD on standard objects for standard profiles has been fixed since Winter '21. Custom profiles, cloned or built from scratch, are fully editable, which is why real configuration happens on those, not the ones Salesforce ships.

## Segment 5 (outro)

Salesforce's own documentation recommends permission sets and permission set groups over profiles for managing object access — reusable building blocks beat dozens of near-duplicate profiles. Profiles keep the mandatory baseline; permission sets handle the rest, and that's Lesson 4.
