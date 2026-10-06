# Planning a Data Load

**Chapter 1 · Getting Data In · Lesson 1 of 20**

Every data load that goes wrong went wrong before anyone opened a CSV file. The import tool rarely fails on its own; it fails because nobody checked for duplicates first, nobody confirmed which fields were required, or nobody noticed the org was nearly out of storage. Planning is the part of data loading that happens before you touch a wizard or a tool, and it's the part that actually prevents the bad outcomes — mangled data, hit API limits, or records nobody can find afterward.

## What you'll learn

- The questions to answer before you load a single record
- How to pick between the Data Import Wizard and Data Loader
- Why storage and API limits belong in the plan, not a surprise after the fact
- A simple checklist you can reuse for every load

## Start with the object, not the tool

Before opening anything, write down three things: which object you're loading into (Leads? Accounts? a custom object?), how many records, and where the data is coming from. These three answers shape everything else. A 500-row Lead import from a trade-show spreadsheet is a completely different job from a 200,000-row Account migration from a legacy CRM, even though both are technically "a data load."

Next, ask what already exists in the org. Loading 500 new Leads into an empty object is simple. Loading 500 Leads when the org already has 50,000 is a duplicate-management problem as much as an import problem — and it's much cheaper to think about that now than to clean it up after the fact.

## Choose your tool by the shape of the job

Salesforce gives admins two built-in ways to get data in, and picking the right one is itself a planning decision.

![Setup's Quick Find box filtered to "data import," highlighting the Data Import Wizard menu item under Integrations.](/courses/salesforce-data-management/ch01/01-planning-a-data-load/setup-search-data-import.png)

The **Data Import Wizard** is the friendlier of the two: a guided, click-through flow for Accounts, Contacts, Leads, Solutions, Campaign Members, and custom objects, capped at 50,000 records per job and limited to simpler field mappings.

![Setup's Quick Find box filtered to "data loader," highlighting the Data Loader menu item under Integrations.](/courses/salesforce-data-management/ch01/01-planning-a-data-load/setup-search-data-loader.png)

**Data Loader** is the desktop application: it handles any object (including ones the wizard doesn't support), scales to 150 million records with Bulk API, and supports complex field mappings and scheduled/automated jobs — at the cost of an install and a steeper learning curve. Lesson 2 covers the wizard in depth; Lesson 3 covers Data Loader.

## Check the limits before you load

A load plan isn't complete until you've looked at what the org can actually absorb.

![Setup's System Overview page, showing Schema usage (custom objects, custom settings, metadata types) and a Data Storage gauge at 113% of its 5 MB limit, flagged in red.](/courses/salesforce-data-management/ch01/01-planning-a-data-load/system-overview-data-storage.png)

The **System Overview** page under Setup shows current data storage against the org's limit, plus API requests used in the last 24 hours. A large import that looks fine on paper can still fail partway through if the org is already near its storage ceiling, or if a scheduled integration is eating the same API allowance you're about to use. Check this page before a load of any real size, not after it stalls.

## A reusable planning checklist

1. **Object and volume.** What object, how many records, one-time or recurring?
2. **Source and quality.** Where is the data coming from, and has anyone looked at it yet?
3. **Duplicates.** Does this object already have data that the new records might collide with?
4. **Required fields and validation rules.** Will every row satisfy them, or will rows bounce?
5. **Tool choice.** Import Wizard for a simple, smaller job; Data Loader for scale, custom objects, or automation.
6. **Limits.** Storage and API headroom, checked on System Overview.
7. **Backup.** Can you export what's there now, so a bad load can be undone?

## Try it yourself

In a sandbox or Developer Edition org, open Setup and search for "data import" and "data loader" to see both entry points. Then open System Overview and note the current data storage percentage — that's the number you'd check before planning any real load.

## Recap

- Planning happens before the tool, not during it: object, volume, source, and quality come first.
- The Import Wizard suits smaller, simpler jobs; Data Loader suits scale, custom objects, and automation.
- System Overview shows storage and API headroom — check it before a load of any size.
- A short checklist, used every time, catches most of what goes wrong.

## Check yourself

A colleague wants to import 300,000 Account records from a legacy system next week. In one sentence, name the single biggest planning risk you'd flag before they start.
