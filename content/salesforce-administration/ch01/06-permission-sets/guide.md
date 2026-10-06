# Lesson 6 — Permission Sets

**Chapter 1 · Users and Access · Lesson 6 of 36**

## What you'll learn

- What a permission set is, and how it differs from a profile
- Why permission sets only grant access, never revoke it
- How to view which permission sets touch a given object
- Where to create a new permission set in Setup

## The problem permission sets solve

Every user has exactly one profile (Lesson 5), and that profile is usually shared by an entire team. But real teams aren't perfectly uniform — one rep might need access to a custom object the rest of the team doesn't. Cloning an entire new profile for one person's one extra need creates exactly the kind of profile sprawl experienced admins try to avoid.

**Permission sets** solve this: they're a separate container of extra permissions, assigned directly to the individual users who need them, layered on top of whatever profile each user already has.

## Inside a permission set

A permission set's overview page looks strikingly similar to a profile:

![A Salesforce permission set's overview page, listing sections for Apps (Assigned Apps, Assigned Connected Apps, Object Settings, App Permissions) and System (System Permissions), with License and Description fields at top.](/courses/salesforce-administration/ch01/06-permission-sets/permission-set-overview.webp)
*Apps, Object Settings, App Permissions, Apex Class Access, System Permissions — the same categories a profile controls, in a separate, assignable package.*

The categories are the same ones covered in Lesson 5 — object permissions, field-level security, app visibility, system permissions. What's different is the usage pattern, summarized here:

| | Profile | Permission Set |
|---|---|---|
| **Per user** | Exactly one, mandatory | Any number, optional |
| **Can remove access** | Yes (it's the baseline) | No — grant only |
| **Reused across profiles** | No, tied to the profile itself | Yes, assignable regardless of profile |
| **Best for** | The baseline every team member shares | The extra one subset of users needs |

Because a permission set can only **add** access, never take it away, assigning one is low-risk — you can't accidentally lock a user out of something their profile already granted them.

## Seeing it from the object's side

The relationship between objects and permission sets also shows up from Object Manager. Open any object, click **Object Access**, and the **Permission Sets** tab lists every permission set touching that object and exactly what it grants:

![Object Manager's Object Access page for the Account object, with the Permission Sets tab highlighted showing a count, next to Permission Set Groups and Profiles tabs.](/courses/salesforce-administration/ch01/06-permission-sets/object-manager-access-tabs.jpg)
*Object Access shows Read/Create/Edit/Delete/View All/Modify All for every permission set, permission set group, and profile that touches this one object — useful for auditing who can do what to a specific object.*

## Creating a permission set

1. From Setup, Quick Find **Permission Sets**, select it.
2. Click **New**.
3. Enter a **Label**, and optionally restrict it to a specific **User License** (covered in Lesson 4 — a permission set can require a license, same as a profile).
4. Save, then click into **Object Settings**, **App Permissions**, or **System Permissions** to configure exactly what the set grants.
5. From the permission set's **Manage Assignments** page — or from an individual user's record — assign it to the users who need it.

![The Salesforce Setup navigation with Administration expanded, showing Permission Sets listed alongside Permission Set Groups, Profiles, and Users.](/courses/salesforce-administration/ch01/06-permission-sets/setup-admin-nav.png)
*Permission Sets lives in the same Administration group as Profiles — Setup > Administration > Permission Sets > New.*

## Key terms

| Term | Meaning |
|---|---|
| Permission set | A reusable, grant-only package of extra permissions assigned directly to users |
| Object Access | The per-object page showing which profiles, permission sets, and permission set groups touch it |
| Manage Assignments | The screen used to assign (or remove) a permission set from specific users |

## Check yourself

Without looking back: what's the key difference in how a permission set can be used compared to a profile, and why does that make permission sets lower-risk to assign?
