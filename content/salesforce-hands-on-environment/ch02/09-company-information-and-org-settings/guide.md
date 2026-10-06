# Company Information and Org Settings

**Chapter 2 · Getting Comfortable in Setup · Lesson 9 of 14**

One Setup page summarizes the entire org at a glance: **Company Information**. It's worth knowing
well — it's often the very first page an experienced admin checks when they open an unfamiliar org.

## What you'll learn

- How to reach the Company Information page, two different ways
- The three categories of information it holds: identity, edition/instance, and licenses/storage
- How to read the User Licenses and Data Storage tables specifically

## Reaching Company Information

From Setup, either type **Company Information** into Quick Find, or browse to it directly under
**Company Settings** in the sidebar (Lesson 7 covered exactly this kind of choice between search
and browsing). Both paths land on the same page.

## What the page actually shows

- **Organization ID** — a unique, 15-character identifier for this specific org, unique across
  every Salesforce org in existence. Useful when filing a support case or identifying an org in
  logs.
- **Organization Edition and Instance** — which Salesforce edition the org is running (Lesson 4
  covered Developer Edition specifically), and which physical data center ("instance," like NA212)
  it's hosted on.
- **User Licenses and Data Storage** — what's purchased, what's in use, and what's left.

## Reading the User Licenses table

This table lists every license type available in the org — Salesforce, Chatter Free, Chatter
External, and others — with columns for **Total Licenses**, **Used Licenses**, and **Remaining
Licenses**. It's the first place to check before creating a new user: if Remaining Licenses for the
type you need is already at zero, you'll need to free one up or buy more before you can proceed.

## Reading the Data Storage table

This table breaks down exactly what's consuming the org's data storage limit, by record type —
Contacts, Opportunities, Leads, and so on, each with a record count and storage size. The moment an
org starts showing storage warnings, this table is where you go to see precisely what's taking up
the space.

## Key terms

| Term | Meaning |
|---|---|
| Company Information | The Setup page summarizing an org's identity, edition, licenses, and storage |
| Organization ID | A unique 15-character identifier for one specific Salesforce org |
| Instance | The physical data center a Salesforce org runs on (e.g., NA212) |

## Check yourself

Name the three categories of information the Company Information page holds, and where you'd
specifically check before creating a new user.
