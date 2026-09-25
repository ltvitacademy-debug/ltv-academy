# Capstone Kickoff

Everything in this course so far has been taught on small, clean examples. Real orgs are
neither. This capstone is one continuous scenario: you'll extract a messy dataset, clean
it, and reload it safely, using SOQL, Data Loader, Workbench, and the data-quality and
migration habits from the last few chapters. This lesson sets up the org, the mess, and
the plan. The next three lessons execute it.

## What you'll learn

- The fictional org and dataset you'll work with for the whole capstone
- Three specific data quality problems, sized with real record counts
- The five-step plan that turns those problems into a safe, verifiable project

## The scenario: Summit Ridge Outfitters

**Summit Ridge Outfitters** is a fictional wholesale distributor of outdoor gear. It sells
to independent retailers, runs Sales Cloud, and has used the same Salesforce org for six
years. You've just been hired as its Salesforce Data Analyst, and your first assignment
from the VP of Sales is: "Our data is a mess and nobody trusts the reports. Fix it, and
don't break anything."

You have a **Full sandbox** refreshed from production last week, plus read access to
production for comparison. Every change you make will be rehearsed in the sandbox first.

## The messy data, sized

A first round of counting queries (you'll write these yourself in the next lesson) gives
the baseline:

| Object | Records | Problem |
|---|---|---|
| Lead | 41,860 | 2,760 email addresses appear on two or more Leads (6,530 records in those groups, so 3,770 surplus copies), left behind by six years of trade-show list imports |
| Lead | 41,860 | `LeadSource` holds 14 distinct values; six of them are spellings of "Trade Show" (`Trade Show`, `tradeshow`, `Trade-Show`, `TradeShow`, `Trade Show 2021`, `Trade show - Denver`), and 4,210 Leads have it blank |
| Contact | 28,450 | 1,240 Contacts have no `AccountId`, so they are private contacts nobody but their owner can see |

The first two problems come from imports that bypassed anything a sales rep would have
seen. `LeadSource` is a picklist that isn't restricted, so an import can write any value
into it, and that's exactly what happened. The third comes from a legacy ERP migration
that loaded people before, or without, their companies.

## Your key to safe reloading: the legacy ID

Summit Ridge's ERP assigns every customer and every contact a number. Years ago someone
created a custom text field, `Legacy_Id__c`, on Account and on Contact, and marked it as
an **External ID**. Most Accounts and roughly 27,000 Contacts carry it. That field is the
project's backbone: it lets you match records without knowing Salesforce IDs, which is
exactly what an upsert needs.

The ERP export also tells you which company each of the 1,240 orphan Contacts belongs to.
Checking against the sandbox: 1,015 of them belong to Accounts already in Salesforce, and
225 belong to 61 companies that were never created as Accounts.

## The plan

Five steps, each of which you'll see again in the next lessons:

1. **Extract.** Query the data out with SOQL (Workbench for exploration, Data Loader for
   volume) and save a CSV backup of everything you're about to change.
2. **Clean.** In a working copy of the CSV, standardize `LeadSource`, flag which Lead in
   each duplicate group to keep, and match orphan Contacts to their Accounts.
3. **Stage.** Build the load files: new Accounts first, then Contact updates, then Lead
   fixes.
4. **Load.** Run Data Loader in the sandbox. Use upsert on `Legacy_Id__c`, parents before
   children, reading the success and error files after every run.
5. **Validate.** Re-run your baseline queries. The numbers must land exactly where you
   predicted, or you stop and investigate.

Only after a clean sandbox run do you repeat the load in production.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | The final project that applies the whole course to one realistic dataset |
| Baseline | The set of counts you record before changing anything, so you can prove the result afterward |
| External ID | A custom field flagged so Salesforce can use it to match records during upsert |
| Private contact | A Contact with no Account, visible only to its owner |
| Sandbox | A copy of the org used to rehearse changes without touching production |

## Check yourself

Why does the plan record baseline counts and back up a CSV of the data before any cleaning
begins, and why does the whole plan run in a sandbox first?
