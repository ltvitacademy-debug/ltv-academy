# Lesson 16 — Data Loading and Sample Data

**Chapter 4 · Analytics and Delivery · Lesson 16 of 20**

## What you'll learn

- Why "Test Account 1" is bad sample data, and what realistic sample data
  looks like instead
- Which tool to use for which object: Data Import Wizard versus Data
  Loader
- How to load related records in the right order so lookups resolve
  correctly
- How to avoid creating duplicates when the same data gets loaded more
  than once

This lesson applies the Data Management course's Data Loader and Import
Wizard concepts directly against Cascade's own objects for the first
time.

## Step 1 — Why realistic sample data matters

A report built against "Test Account 1," "Test Account 2," and a
Opportunity called "asdf" tells you nothing about whether your build
actually works, and it's not something you'd ever put in front of an
interviewer. Realistic sample data means real-sounding business names,
real-feeling variation across Record Types, and values that actually
exercise the validation rules and reports from Chapters 3 and 4.

## Step 2 — Which tool for which object

| Tool | Use for | Why |
|---|---|---|
| **Data Import Wizard** | Accounts, Contacts, Leads | Point-and-click, built-in duplicate matching against existing records, good for a few hundred rows |
| **Data Loader** | Opportunities, Installation Projects, Service Contracts | Bulk insert/upsert from CSV, handles custom objects and multiple related lookups per row, supports External ID matching |

Accounts and Contacts go in first, through the Import Wizard, since every
other object's sample data depends on Accounts already existing to look
up to.

## Step 3 — Building the sample data set

| Data | Volume | Example |
|---|---|---|
| Accounts | 15, spread across all six Record Types | "Riverside Bistro Group" (Restaurant), "Highline Hotels" (Hotel & Hospitality), "Mercy Valley Health System" (Healthcare & Institutional), "Columbus City Schools" (Education), "Northgate Catering Co." (Catering), "Pacific Restaurant Supply" (Dealer) |
| Contacts | 2–3 per Account | Named with real-sounding titles matching Contact Role — an Executive Chef, a Purchasing Manager |
| Opportunities | 20+, spread across all five open/closed stages | Realistic equipment packages, Amounts in a believable range ($8,000–$180,000) |
| Installation Projects | One per Closed Won Opportunity | Status spread across Scheduled, In Progress, and Complete |
| Service Contracts | One for roughly half the Closed Won Accounts | Tiers and Renewal Status spread realistically, some intentionally "At Risk" so Lesson 15's report has something to show |

## Step 4 — Loading order and why it matters

```
1. Accounts           (Import Wizard)
2. Contacts            (Import Wizard, matched to Accounts)
3. Opportunities        (Data Loader, Account lookup by name/External ID)
4. Installation Projects (Data Loader, Opportunity + Account lookups)
5. Service Contracts     (Data Loader, Account + Install Project lookups)
```

Loading out of order means a lookup field has nothing to resolve to yet
— Data Loader will reject the row rather than leave the lookup blank
silently, which is the safer failure mode, but only if you load in the
right order to begin with.

## Step 5 — Avoiding duplicates

Use **Data Loader's Upsert operation** with an External ID field (or the
built-in Account Name matching in the Import Wizard) whenever a load
might run twice — during testing, it's easy to accidentally load the
same CSV again. Upsert means a second run updates existing records
instead of creating duplicate Accounts with the same name.

## Key terms

| Term | Meaning |
|---|---|
| Upsert | An operation that inserts a new record or updates an existing one, based on a matching field |
| External ID | A field marked to uniquely identify a record from an outside system, usable as an Upsert match key |
| Load order | The sequence related objects must be loaded in so lookup fields resolve correctly |

## Lab

Build a 15-Account, 30-Contact, 20-Opportunity, 10-Installation-Project,
7-Service-Contract sample data set following the volumes above, loaded in
the correct order with the correct tool for each object. Confirm the
Lesson 15 reports return real, varied numbers once this data is in.

## Check yourself

- Which two objects load through the Import Wizard, and which three load
  through Data Loader?
- What happens if Opportunities are loaded before their related Accounts
  exist?
- Why use Upsert instead of plain Insert when there's a chance a load
  runs twice?
