# Organization Settings and Company Information

**Chapter 2 · Configuring the Organization · Lesson 11 of 36**

Every Salesforce org has one page that describes the org itself: its name, its address, its
default locale and time zone, and — critically for an administrator — exactly how much of
everything you've bought. That page is **Company Information**, and it's the first stop in this
chapter because almost every setting you'll touch from here forward reads its defaults from it.

## What you'll learn

- Where Company Information lives in Setup, and what it actually controls
- How licenses, storage, and API limits show up on this one page
- What "Fiscal Year Starts In" and "Activate Multiple Currencies" mean here (previewed —
  full detail in Lesson 13)
- The other settings grouped under Company Settings in Setup

## Finding Company Information

From Setup, click the gear icon, then **Company Settings**, then **Company Information**. The
left-hand Company Settings menu groups several related pages together: Business Hours, Calendar
Settings, Company Information, Data Protection and Privacy, Fiscal Year, Holidays, Language
Settings, Maps and Location Settings, and My Domain. This lesson covers Company Information
itself; the next two lessons cover Business Hours/Holidays and Fiscal Year/Currencies.

![Setup's Company Settings menu, expanded to show Business Hours, Calendar Settings, Company Information (highlighted), Data Protection and Privacy, Fiscal Year, Holidays, Language Settings, Maps and Location Settings, and My Domain.](/courses/salesforce-administration/ch02/11-organization-settings-and-company-information/company-settings-menu.png)
*Company Information is one of several pages grouped under Company Settings — you'll visit most of the others in this chapter.*

## What's on the page

Company Information is a read-mostly detail page (click **Edit** to change the handful of fields
that are actually editable). It's organized into a few groups of facts:

- **Identity**: Organization Name, Primary Contact, Division, Address — the details Salesforce
  has on file for your company
- **Locale defaults**: Default Locale, Default Language, Default Time Zone, Currency Locale —
  the starting point every new user inherits unless their own user record overrides it
- **Fiscal Year Starts In** and **Activate Multiple Currencies** — org-wide settings that get
  their own dedicated setup pages (Lesson 13)
- **The Organization ID**: a unique identifier for your org, sometimes needed for support cases
  or integration configuration
- **Storage and limits**: Used Data Space, Used File Space, API Requests (Last 24 Hours),
  Streaming API Events (Last 24 Hours) — all shown with their maximums

![The Company Information detail page: Organization Name, Primary Contact, Division, Address, Fiscal Year Starts In, Default Locale, Default Language, Default Time Zone, Organization ID, and usage figures for data space, file space, and API requests.](/courses/salesforce-administration/ch02/11-organization-settings-and-company-information/company-information-detail.png)
*Everything on this page is either a fact about your org or a limit you're consuming against.*

## Licenses live here too

Near the top of the page, four links — **User Licenses**, **Permission Set Licenses**, **Feature
Licenses**, and **Usage-based Entitlements** — open the license detail you'll need constantly as
an admin: how many of each license type you've purchased, how many are in use, and how many
remain. Before you create a new user in a given license type (a topic from Chapter 1), this is
where you check whether you actually have a seat free.

![A User Licenses table: Name, Status, Total Licenses, Used Licenses, Remaining Licenses, and Expiration Date for license types including Identity, Salesforce, Chatter External, Chatter Free, and Salesforce Integration — with the Salesforce row's Used and Remaining counts highlighted.](/courses/salesforce-administration/ch02/11-organization-settings-and-company-information/user-licenses-table.png)
*"Remaining Licenses" here is the number that tells you whether you can create the next user.*

## Why this page matters for everything else

Company Information isn't just informational. The Default Time Zone and Default Locale set here
are what a brand-new user inherits before they ever log in. The Fiscal Year setting here drives
every forecast and every "this fiscal quarter" report filter org-wide. And the storage and API
figures here are the numbers you'll monitor to know when your org is approaching a real limit —
not a guess, the actual count against the actual maximum.

## Key terms

| Term | Meaning |
|---|---|
| Company Information | The Setup page describing your org's identity, locale defaults, and consumption against licenses/storage/API limits |
| Organization ID | A unique ID for your Salesforce org, often needed for support or integrations |
| Default Time Zone / Locale | The org-wide defaults every new user inherits unless overridden on their own user record |
| User Licenses | The license inventory showing total, used, and remaining seats per license type |

## Check yourself

If a new hire's user record is missing a time zone, what value will Salesforce use, and where is
that default actually set?
