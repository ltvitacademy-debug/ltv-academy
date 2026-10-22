# Lesson 1 — Creating & Managing Users

**Chapter 1 · Users, Groups & Roles · Lesson 1 of 36**

## What you'll learn

- Where user records actually live in ServiceNow: the `sys_user` table
- How to create a user through User Administration > Users
- The key fields that control whether a user can log in and do work: `user_name`, `email`, `active`, `locked_out`, `password_needs_reset`
- Why you deactivate a user instead of deleting one, and what breaks if you delete
- Why a brand-new user still can't do much until you assign a role (Lesson 3)

## Where users live: the sys_user table

Every person who can log into your ServiceNow instance — agents, managers, end users submitting their own tickets, even integration accounts — is a record on the `sys_user` table. There is no separate "employee table" and "login table"; it's one table, and every field you'll ever reference in a report, a notification, or a script (`gs.getUserID()`, `current.caller_id`, `assigned_to`) ultimately points back to a row here. Understanding that `sys_user` is the single source of truth for "who" is the foundation everything else in this chapter builds on: groups reference it, roles reference it, and the catalog and ACLs you'll meet in Chapter 2 all check against it.

## Creating a user

You create a new user from **User Administration > Users**, then the **New** button. The form has dozens of fields, but only a handful matter on day one:

- `user_name` — the login value the person types at the sign-in screen. This is independent of their real name; a shop might use `jsmith` or a full email address as the user_name, but whatever convention you pick, it has to be unique across the instance.
- `email` — used for notifications (Chapter 4) and often mapped from a directory sync, but equally critical for a manually created user, since this is where password-reset links and assignment notifications land.
- First name / Last name — cosmetic but show up everywhere: list views, the Impersonate menu, approval records.

Once you save the record, the user exists — but a user with zero roles can barely do anything beyond viewing their own profile and whatever the default `guest`-level ACLs expose. We'll fix that in Lesson 3.

## The fields that control access: active, locked_out, password_needs_reset

Three checkbox-style fields on the user form do real work:

- `active` — the single most important field on the form. An inactive user cannot log in, full stop, regardless of their roles or group memberships. This is also the field you toggle off when someone leaves the organization, rather than deleting their record (more on that below).
- `locked_out` — set automatically after too many failed login attempts (or manually by an admin responding to a security concern). A locked-out user is blocked even though `active` stays true — it's a separate gate, not a synonym for inactive.
- `password_needs_reset` — forces the user to set a new password on their next successful login. Useful when you create an account with a temporary password, or after a suspected credential compromise.

These three fields answer three different questions — "does this person exist as an active employee," "have we deliberately locked them out," and "do they need a fresh password" — and a careful administrator checks the right one for the right situation instead of reaching for whichever one happens to be visible.

## Deactivate, don't delete

It is tempting to delete a user record the day someone leaves. Don't. ServiceNow is a relational system, and `sys_user` is referenced everywhere: an incident's `caller_id`, an incident's `opened_by`, a change request's `assigned_to`, an approval's approver, audit history on nearly every table. Delete the user record and every one of those references either breaks (shows a blank or a broken reference) or, worse, silently orphans — you lose the answer to "who actually reported this incident" or "who approved this change," which matters for audits, SLAs, and historical reporting long after the person is gone.

Setting `active` to false solves the actual business problem — the person can no longer log in — while every historical record that points to them stays intact and readable. This is the standard, recommended pattern across every real ServiceNow instance: deactivate departing users, never delete them, unless you're cleaning up a test record that was never real to begin with.

## Key terms

| Term | Meaning |
|---|---|
| `sys_user` | The table that stores every user record in the instance |
| `active` | Field controlling whether a user can log in at all; false = deactivated |
| `locked_out` | Separate flag blocking login after failed attempts or admin action, independent of `active` |
| `password_needs_reset` | Forces a password change on the user's next login |
| Deactivation | The correct way to remove a departed user's access without breaking historical references |

## Check yourself

A manager asks you to permanently delete a former employee's user record to "clean things up." What do you do instead, and specifically what would break on the incident and change tables if you deleted the record rather than deactivating it?
