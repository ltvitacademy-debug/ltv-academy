# Lesson 4 — Licenses and License Types

**Chapter 1 · Users and Access · Lesson 4 of 36**

## What you'll learn

- What a Salesforce license actually controls
- Why License is chosen before Profile on the New User form
- How licenses limit both users and permission sets
- Why licenses are a finite, purchased resource an admin has to manage

## License comes first

On the New User form, **User License** sits directly above **Profile** — and that ordering reflects a real dependency, not just a layout choice.

![The New User form with the Role, User License, and Profile fields boxed together, User License positioned directly above Profile.](/courses/salesforce-administration/ch01/04-licenses-and-license-types/new-user-form-full.png)
*License is chosen first because it determines which profiles are even available to select.*

A **license** defines the broad category of access a user is entitled to — think of it as what your organization *bought* for this person, separate from what an admin later *configures* for them with a profile or permission set.

## What a license actually controls

| Controls | How |
|---|---|
| **Available features** | A feature not included in a license can't be unlocked by any profile or permission set |
| **Available profiles** | Each license type only works with a matching subset of profiles |
| **Seat count** | Your org purchases a fixed number of each license type; every active user occupies one seat |

Common license types include **Salesforce** (full CRM access), **Salesforce Platform** (custom-app access without core CRM objects), **Chatter Free** (collaboration only, no CRM data), and **Chatter External** (for people outside your company). Each unlocks a different slice of what Salesforce can do.

## A license that narrows the options

Here's a user whose License is set to **Chatter Free**:

![The New User form with User License set to Chatter Free and Profile left on its default blank/limited option.](/courses/salesforce-administration/ch01/04-licenses-and-license-types/new-user-form-clean.jpg)
*Chatter Free is a limited, no-cost license — and notice the Profile field only offers a small set of Chatter-specific profiles, not the standard CRM ones.*

This is the dependency in action: picking Chatter Free immediately narrows which profiles this user could ever be assigned. If you need this person to see Accounts and Opportunities, Chatter Free is the wrong license, no matter how the Profile is configured afterward.

## Licenses apply to permission sets too

Licensing doesn't stop at the user record — permission sets carry their own **License** field:

![A Salesforce permission set's overview page, showing its License field set to Salesforce alongside Description, API Name, and Namespace Prefix.](/courses/salesforce-administration/ch01/04-licenses-and-license-types/permission-set-overview.webp)
*This permission set requires a Salesforce license. A user holding only a Chatter Free license could never be assigned it — the license mismatch blocks it outright.*

This matters when you build permission sets in Lesson 6: a permission set's own license requirement is a second, independent gate, on top of whatever profile the user has.

## Managing licenses as a finite resource

Because your organization purchases a specific count of each license type, part of an admin's ongoing job is watching that supply. Deactivating a user (Lesson 3) frees their license seat for reassignment — one more reason deactivation, not deletion, is the correct offboarding step.

## Key terms

| Term | Meaning |
|---|---|
| User License | The broad category of access purchased for a user; chosen before Profile |
| Salesforce license | Full CRM access — Accounts, Contacts, Opportunities, and more |
| Salesforce Platform license | Custom-app access without the standard CRM objects |
| Chatter Free / External | Limited, collaboration-only licenses with no CRM data access |
| Seat | One occupied license slot, consumed by one active user |

## Check yourself

Without looking back: why does picking the wrong license for a user mean the right profile may not even be available to assign?
