# Lesson 3 — Creating and Deactivating Users

**Chapter 1 · Users and Access · Lesson 3 of 36**

## What you'll learn

- How to fill out the New User form, field by field
- Why License has to be chosen before Profile
- The right way to offboard a user: deactivation, not deletion
- When to use Freeze instead of (or before) deactivating

## The New User form

From the Users list, click **New User** to open the full creation form.

![The complete Salesforce Classic New User form, with General Information, Mailing Address, Single Sign-On Information, Locale Settings, and Approver Settings sections, and the Role/User License/Profile fields boxed.](/courses/salesforce-administration/ch01/03-creating-and-deactivating-users/new-user-form-full.png)
*The New User form. Identity on the left, the fields that actually control access — Role, User License, Profile — boxed on the right.*

| Section | What it covers |
|---|---|
| **General Information** | First Name, Last Name, Email, Username, Nickname, and the critical trio: Role, User License, Profile |
| **Mailing Address** | Optional, mostly cosmetic |
| **Locale Settings** | Time Zone, Locale, and Language — gets display formatting right from day one |
| **Approver Settings** | Delegated Approver, Manager — used by approval processes later in the course |

### Fields that actually matter

- **Username** must be unique across every Salesforce org that exists, not just yours. It's formatted like an email address (`name@company.com`) but doesn't have to be a deliverable one — only the separate **Email** field needs to be real.
- **User License** has to be chosen *before* Profile — the license determines which profiles even appear in that dropdown. Lesson 4 covers this relationship in depth.
- **Profile** sets this person's baseline permissions. Lesson 5 is entirely about profiles.
- **Active** is checked by default. Every new user starts able to log in immediately once you save.

At the bottom of the form, checking **Generate new password and notify user immediately** sends the new user a welcome email with a login link — the standard way to onboard someone.

## Deactivating a user

Salesforce does not let you delete a user record. Ever. This is deliberate: a user's record is tied to every record they ever created, every report they're listed as the owner of, every audit trail entry with their name on it. Deleting the user would orphan all of that.

Instead, you **deactivate** them:

1. From the Users list, click **Edit** next to the user's name.
2. Clear the **Active** checkbox.
3. Click **Save**.

![A Salesforce Classic User Edit page for a user named Sara Stevenson, with the Active checkbox unchecked and highlighted.](/courses/salesforce-administration/ch01/03-creating-and-deactivating-users/user-edit-deactivate.jpg)
*Deactivating a user: clear Active, save. The record and its history stay exactly where they are — only login access is removed.*

A deactivated user keeps their license slot free for reassignment (more on that in Lesson 4), but their historical data — ownership, sharing, audit trail — is untouched.

## Freeze: the emergency button

Occasionally Salesforce won't let you deactivate a user right away — most often because the user is referenced in a custom hierarchy field, or because deactivating would leave a role or territory without anyone assigned. For that situation, use **Freeze**:

![A Salesforce Classic User Detail page with the Freeze button highlighted next to Edit, Sharing, Reset Password, and Login.](/courses/salesforce-administration/ch01/03-creating-and-deactivating-users/user-detail-freeze.jpg)
*Freeze — found on the user's own detail page. Blocks login instantly without requiring the dependency cleanup that deactivation needs.*

Freeze is reversible (click **Unfreeze** to restore access) and takes effect immediately, which makes it the right tool for "this person needs to be locked out right now" situations — an offboarding that can't wait, or a compromised account — even before you've worked out every dependency that's blocking full deactivation.

## Key terms

| Term | Meaning |
|---|---|
| New User | The form that creates a single user record |
| Add Multiple Users | A streamlined form for creating up to 10 users at once |
| Deactivation | Clearing Active to remove login access while preserving the record |
| Freeze | An immediate, reversible login block, independent of deactivation |

## Check yourself

Without looking back: why does Salesforce require License to be set before Profile, and what's the difference between deactivating a user and freezing one?
