# Lesson 7 — Permission Set Groups

**Chapter 1 · Users and Access · Lesson 7 of 36**

## What you'll learn

- What a permission set group is and the problem it solves
- What the "Outdated" status on a group means
- Muting — how a group can dial back one permission from one of its member sets
- Where to create and view permission set groups in Setup

## The problem groups solve

Permission sets (Lesson 6) solve the "one person needs one extra thing" problem. But many real roles need *several* permission sets at once — a new Sales Operations hire might need five or six sets just to do their job on day one. Assigning each one individually, for every single hire, doesn't scale.

A **permission set group** bundles multiple permission sets into a single unit that gets assigned — and later reassigned, or removed — all at once.

## The Permission Set Groups list

![The Salesforce Lightning Setup Permission Set Groups list page, showing one recently-viewed group named "Price Surveys" with API Name, Label, Description, Last Modified, Created, and Status (Outdated) columns, and a New Permission Set Group button.](/courses/salesforce-administration/ch01/07-permission-set-groups/permission-set-groups-list.jpg)
*Setup > Permission Set Groups. This org's "Price Surveys" group bundles several permission sets under one assignable label.*

Notice the **Status** column reads **Outdated**. This isn't an error — a permission set group periodically recalculates its combined, effective access from its member permission sets. If one of those member sets changes, the group's status flips to Outdated until Salesforce recalculates it (automatically, usually within minutes).

## What a group gives you that individual sets don't

| Capability | Why it matters |
|---|---|
| **Bundling** | Several permission sets become one assignable unit |
| **Single assignment** | Assign (or remove) the whole bundle in one action, not several |
| **Muting** | Dial back one specific permission from one specific member set, *only within this group* — the original permission set is untouched everywhere else it's used |
| **Reuse at scale** | Assign the same group to every new hire in a role, instead of reconstructing their access set by set |

Muting deserves a second look: imagine a permission set in your group grants Delete access on Opportunities, but for this particular group's audience you don't want that. Muting lets you suppress just that one permission inside the group's combined result — the permission set itself, used standalone or in other groups, still grants Delete normally.

## Seeing it from the object's side

The same **Object Access** page used in Lesson 6 also has a **Permission Set Groups** tab:

![Object Manager's Object Access page for the Account object, with the Permission Set Groups tab highlighted, listing three groups and their Read, Create, Edit, Delete, View All, and Modify All grants.](/courses/salesforce-administration/ch01/07-permission-set-groups/object-manager-access-tabs.jpg)
*Three permission set groups touch the Account object here, each with its own combined grant — a quick way to audit group-level access to any object.*

## Creating a permission set group

1. From Setup, Quick Find **Permission Set Groups**, select it.
2. Click **New Permission Set Group**.
3. Enter a **Label** and **Description**.
4. Add the permission sets that belong inside the group.
5. Optionally mute specific permissions from specific member sets.
6. Assign the group to users, the same way you'd assign a single permission set.

![The Salesforce Setup navigation with Administration expanded, showing Permission Set Groups listed first, above Permission Sets, Profiles, and Users.](/courses/salesforce-administration/ch01/07-permission-set-groups/setup-admin-nav.png)
*Permission Set Groups sits right above Permission Sets in the same Administration section of Setup.*

## Key terms

| Term | Meaning |
|---|---|
| Permission set group | A bundle of permission sets, assignable as a single unit |
| Outdated status | Signals a member permission set changed and the group's combined access needs recalculation |
| Muting | Suppressing one specific permission from one member set, scoped only to this group |

## Check yourself

Without looking back: what does a permission set group's "Outdated" status mean, and what does muting let you do that editing the member permission set directly would not?
