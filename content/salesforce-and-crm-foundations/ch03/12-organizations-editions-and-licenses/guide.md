# Lesson 12 — Organizations, Editions and Licenses

**Chapter 3 · How Salesforce Works · Lesson 12 of 20**

## What you'll learn

- What a Salesforce "org" actually is
- The major Salesforce editions and roughly what separates them
- The difference between a **user license** and a **permission set license** / **feature license**
- Where to go in Setup to see exactly what your org has, and how much of it is used

## What is an "org"?

Every time a company signs up for Salesforce, they get their own **organization** — usually just called an "org" for short. An org is your company's private, walled-off slice of the multitenant platform you learned about in Lesson 11: your own data, your own users, your own customizations, your own security settings. When someone says "log in to your org," they mean the specific Salesforce environment that belongs to your company (or, while learning, your personal Developer Edition or Trailhead Playground).

## Editions: what level of Salesforce did you buy?

Salesforce sells its core CRM product (Sales Cloud, Service Cloud, and others) in several **editions**, which mostly differ by feature depth, customization limits, and price:

- **Essentials** — a stripped-down edition aimed at very small businesses.
- **Professional** — core sales and service features for growing teams, with some customization limits.
- **Enterprise** — the most common edition for mid-size and larger businesses; full access to most automation and customization tools, including the Apex and Flow features you'll meet later in this course.
- **Unlimited** — Enterprise features plus higher limits and premium support.
- **Developer Edition** — a free, full-featured (but size-limited) edition Salesforce gives away specifically so students and developers can learn and build — this is almost certainly the edition you're using in this course.

Your org's edition determines which features are even available to turn on, which is why "what edition are we on?" is one of the first things an admin checks when a client asks for something that isn't working.

## Licenses: what can each user actually do?

Having the right edition doesn't automatically mean every user can do everything. Salesforce also assigns **licenses** per user, which control what parts of the application that specific person can access:

- **User license** — the big one. It determines which core objects and base functionality a user can access (for example, a "Salesforce" license gives full CRM access, while a "Chatter Free" license only allows collaboration features, not CRM records). Every user gets exactly one user license.
- **Permission set license** — grants access to an *add-on* feature (like a specific Salesforce product) without changing the user's core license. A user can be assigned many permission set licenses.
- **Feature license** — similar to a permission set license, an older mechanism granting access to a specific feature (like "Marketing User") on top of a user's base license.

Your company purchases a certain number of each license type, and every user you create consumes one. Admins regularly check license usage to avoid running out before renewal.

## Where to look: Company Information

Setup's **Company Information** page (Setup → Company Settings → Company Information) is where an admin finds the org's edition, its unique Organization ID, storage limits, and — critically — a full breakdown of every license type the org owns, how many were purchased, and how many are currently in use.

![Real screenshot of a Salesforce query showing UserLicense records, including TotalLicenses and UsedLicenses columns for license types like Salesforce, Chatter Free, Chatter External, and Guest License.](/courses/salesforce-and-crm-foundations/ch03/12-organizations-editions-and-licenses/user-licenses-query-1.jpg)
*Real Salesforce license data: each license type tracks how many were purchased (TotalLicenses) against how many are actively assigned (UsedLicenses). Red circles were added by the original author to highlight these two columns.*
Source: [SalesforceCodex — Getting Salesforce License Information](https://salesforcecodex.com/salesforce/getting-salesforce-licenses-information/)

![Real screenshot of a second Salesforce UserLicense query result, showing additional license types including Sales User, Service User, and Standard Einstein Activity Capture User, with expiration dates and usage counts.](/courses/salesforce-and-crm-foundations/ch03/12-organizations-editions-and-licenses/user-licenses-query-2.jpg)
*More license types from the same org — notice ExpirationDate: some licenses (like trials or add-on products) expire and must be renewed.*
Source: [SalesforceCodex — Getting Salesforce License Information](https://salesforcecodex.com/salesforce/getting-salesforce-licenses-information/)

If TotalLicenses and UsedLicenses are equal, an admin can't create another user of that type until more licenses are purchased — a very common real-world support ticket.

## Key terms

| Term | Meaning |
|---|---|
| Org (organization) | Your company's isolated environment on the Salesforce platform |
| Edition | The product tier (Essentials, Professional, Enterprise, Unlimited, Developer, etc.) that determines available features |
| User license | The primary license every user has, determining base-level access |
| Permission set / feature license | An add-on license layered on top of a user's base license to grant access to a specific product or feature |
| Company Information | The Setup page showing org edition, ID, and all license usage |

## Lab

1. In your Developer org, go to Setup and search "Company Information" in the Quick Find box.
2. Record your org's Edition and Organization ID.
3. Scroll to the User Licenses section and note how many "Salesforce" licenses are Total vs. Used in your org.

## Check yourself

You're ready for Lesson 13 when you can explain the difference between an edition and a license in one sentence each, and you know exactly where in Setup to check both for any org you're given access to.
