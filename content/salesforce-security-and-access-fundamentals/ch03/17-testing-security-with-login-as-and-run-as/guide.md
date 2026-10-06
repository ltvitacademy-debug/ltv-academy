# Lesson 17 — Testing Security with Login As and Run As

**Chapter 3 · Applying Security · Lesson 17 of 24**

## What you'll learn

- How **Login As** lets an admin see Salesforce exactly as a specific
  user sees it
- How **Run As** lets a developer execute Apex tests under a specific
  user's permissions, without logging in as them
- A repeatable checklist for testing a security design before users
  find the gaps
- The honest limits and audit trail both tools leave behind

Every design in Lessons 14-16 is a theory until someone actually logs
in as that type of user and checks what they can see. Salesforce gives
admins two different tools for this, built for two different
situations: **Login As**, for checking the UI a real human sees, and
**Run As**, for checking what Apex code sees during an automated test.

## Login As: see Salesforce through someone else's eyes

**Login As** lets a System Administrator (or anyone with the "Manage
Users" permission, depending on setup) log in to Salesforce as another
active user, without needing that user's password. You see exactly
what they see: their page layouts, their record access, their button
visibility, their list views.

### How to use it

1. First, confirm the policy is on. From Setup, search **Login Access
   Policies**, and check **Administrators Can Log In as Any User**.
2. From Setup, search **Users** and open the user list.
3. Next to any **active** user's row, select **Login**. (Login As is
   not available for inactive users — Lesson 10's manual-sharing lesson
   covered why a record's owner matters, and the same logic applies
   here: there's no session to step into for a deactivated account.)
4. Salesforce opens a new session as that user, with a banner across
   the top confirming you're logged in as them and a **Logout** link to
   return to your own session.
5. Navigate exactly as that user would: open the records you expect
   them to see, try the actions you expect them to be blocked from, and
   confirm page layouts and field visibility match the profile and
   permission sets you assigned.

### What it's for, and what it isn't

Login As is a **verification** tool, not a support-ticket shortcut for
every "can you check what I'm seeing" request — it generates a real
session under that user's identity, and every action during it is
logged. Use it deliberately: confirm one specific security decision at
a time (can this profile see this field? does this sharing rule reach
this record?), not as a general-purpose way to browse as other people.

## Run As: testing Apex under another user's permissions

**Run As** is the Apex-testing equivalent, used inside test classes —
not something you click through in Setup. Apex code normally runs in
**system context**, ignoring field-level security and sharing rules
entirely, which makes it easy to write a test that passes even though a
real user would be blocked. Wrapping test code in a `System.runAs()`
block executes it under a specified user's actual permissions, so
sharing and field-level security apply the way they would for that
real person.

```
@isTest
static void repCannotSeeOtherRegionAccount() {
    User rep = [SELECT Id FROM User WHERE ... LIMIT 1];
    System.runAs(rep) {
        List<Account> visible = [SELECT Id FROM Account];
        System.assertEquals(0, visible.size());
    }
}
```

`System.runAs()` does **not** change the current user outside the Test
context — it's only usable in test methods, and its main job is
verifying sharing behavior, not general permission behavior (CRUD and
field-level security checks inside `runAs` can behave differently
depending on whether the code explicitly enforces them, so don't
assume `runAs` alone proves FLS is respected unless the code path
you're testing actually checks it).

## A testing checklist, for either tool

1. Pick one real user per **role** in your design (a Tier 1 agent, a
   Regional Manager, a Sales Ops user) — not one test per individual.
2. For each, list the specific things they should and shouldn't be
   able to do: records visible, fields editable, buttons present.
3. Log in as (or run as) that user and check each item on the list.
4. Note anything that doesn't match — then fix the OWD, sharing rule,
   restriction rule, or permission set that's actually responsible,
   rather than patching around the symptom.
5. Re-test after the fix, not just the fix's immediate object — a
   sharing-rule change can ripple to related objects.

## Key terms

| Term | Meaning |
|---|---|
| Login As | Logging in to a real session as another active user, to verify what they see |
| Login Access Policies | The Setup page where "Administrators Can Log In as Any User" is enabled |
| `System.runAs()` | An Apex test method that executes a code block under a specified user's sharing context |
| System context | The default Apex execution mode, which ignores sharing and field-level security |

## Check yourself

You Login As a Tier 1 agent and find they can see an Account your
design says they shouldn't. Walk through, in order, which tools from
Lessons 14-16 you'd check first to find the cause — and why you'd check
them in that order.
