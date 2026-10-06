# Lesson 31 — Sandboxes for Administrators

**Chapter 5 · Administration in Practice · Lesson 31 of 36**

## What you'll learn

- The four sandbox types and what each one actually includes
- What a Create Sandbox form asks for, and why
- How to tell a sandbox copy is still processing
- Why experienced admins never build directly in production

## Why this matters

Chapters 1 through 4 covered dozens of settings an admin can change — profiles,
permission sets, page layouts, email templates, Flow-fired notifications.
Every one of those changes can be tested somewhere other than the org your
whole company depends on. That somewhere is a **sandbox**: a copy of your
org's metadata (and, optionally, its data) that behaves identically to
production but where a mistake costs nothing.

## Developer and Developer Pro — the lightweight sandboxes

The fastest sandboxes to create copy **metadata only** — objects, fields,
page layouts, flows, Apex — with no production records:

![The 'Create Sandbox' page for a Developer/Developer Pro sandbox, showing an Apex Class field and a required Sandbox Access field set to 'Select public group...'](/courses/salesforce-administration/ch05/31-sandboxes-for-administrators/create-sandbox-developer.png)
*Sandbox Access controls who can log in once the copy finishes — scoping it to a public group keeps a dev sandbox from being open to the whole org.*
Source: [Salesforce Ben — Guide to Salesforce Selective Sandbox Access](https://www.salesforceben.com/guide-to-salesforce-selective-sandbox-access/)

| Type | Storage | Data | License limit |
|---|---|---|---|
| Developer | 200 MB | None (metadata only) | 1 per Developer Sandbox license |
| Developer Pro | 1 GB | None (metadata only) | 1 per Developer Pro Sandbox license |

## Partial Copy and Full — sandboxes with real data

Partial Copy and Full sandboxes take longer to create because they copy
actual records, using a **Sandbox Template** to define what comes along:

![The 'Create Sandbox' page for a Partial/Full Copy sandbox, showing a Sandbox Templates table with a 'ProductionCopy' option, an Apex Class field, and Sandbox Access radio buttons for 'All Active Users' or 'User Group (Recommended)' with a Public Group picker.](/courses/salesforce-administration/ch05/31-sandboxes-for-administrators/create-sandbox-partial-full-copy.png)
*A Sandbox Template is a saved definition of which objects, and how many records of each, to include — built once in Setup and reused every refresh.*
Source: [Salesforce Ben — Guide to Salesforce Selective Sandbox Access](https://www.salesforceben.com/guide-to-salesforce-selective-sandbox-access/)

| Type | Storage | Data | Typical use |
|---|---|---|---|
| Partial Copy | 5 GB | A sampled subset via a template | Realistic QA without the size of a full copy |
| Full | Matches production | All production data | Staging, performance testing, final UAT |

## Watching a sandbox build

Sandbox creation and refresh aren't instant — Partial Copy and Full sandboxes
especially can take hours. The Sandboxes list shows progress:

![A Sandboxes list table with columns Name, Type, Status, Location, and Release Type, showing two sandboxes ('Developer' and 'Partial') both with Status 'Processing' and Release Type 'Preview.'](/courses/salesforce-administration/ch05/31-sandboxes-for-administrators/sandboxes-list-status.png)
*A Release Type of "Preview" means that sandbox has already been upgraded to the next Salesforce release — useful for admins who want to test an upcoming release before it reaches production.*
Source: [Salesforce Ben — Why Admins Should Beware of Salesforce Sandbox Preview Orgs](https://www.salesforceben.com/why-admins-should-beware-of-salesforce-sandbox-preview-orgs/)

## Choosing the right size

| Sandbox | Includes | Good for |
|---|---|---|
| Developer | Metadata only | Day-to-day configuration work, quick experiments |
| Developer Pro | Metadata only, more storage | Larger in-progress projects with more custom metadata |
| Partial Copy | Metadata + sampled data | QA and testing against realistic (not full-size) data |
| Full | Metadata + all data | Staging, performance testing, final sign-off before release |

Bigger isn't automatically better — a Full sandbox takes the longest to
refresh and costs the most in storage, so most orgs do the bulk of their
day-to-day configuration work in Developer or Developer Pro sandboxes and
reserve Partial Copy / Full for testing that specifically needs real data.

## Why this matters for every lesson before this one

Every configuration change described in Chapters 1–4 — a new profile, a
permission set, a page layout, an email template, a Flow-fired notification
— should be built and tested in a sandbox first. The next lesson, Change
Sets, is how that validated work actually gets from the sandbox into
production.

## Key terms

| Term | Meaning |
|---|---|
| Sandbox | A copy of an org's metadata (and optionally data) used for safe testing |
| Sandbox Template | A saved definition of which objects/records to include in a Partial or Full Copy |
| Sandbox Access | Who can log in to a sandbox once it's created (public group or all active users) |
| Release Type: Preview | Indicates a sandbox is running the next Salesforce release ahead of production |

## Check yourself

- What's the difference between what a Developer sandbox and a Partial Copy sandbox include?
- Why does creating a Partial Copy or Full sandbox ask you to pick a Sandbox Template?
- What does it mean if a sandbox's Release Type shows "Preview"?
