# Lesson 16 — Data Loading and Sample Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Reports are only as good as the data behind them. This lesson loads clean, realistic sample data into Cascade's org — not a handful of placeholder records called Test Account 1.

## S2 · STEPS — Import Wizard vs. Data Loader

Two tools, two jobs. The Data Import Wizard handles Accounts, Contacts, and Leads — point and click, with duplicate matching built in. Data Loader handles Opportunities and both custom objects — bulk CSV loads that support upsert and multiple related lookups per row.

## S3 · CODE — 15 Accounts

Fifteen Accounts, spread across all six Record Types, with names that actually sound like foodservice businesses — a restaurant group, a hotel chain, a hospital system, a school district, a caterer, and a dealer.

## S4 · CODE — Load order

Load order matters. Accounts first, then Contacts, then Opportunities, then Installation Projects, then Service Contracts — each step's lookup fields need the step above it to already exist, or Data Loader rejects the row instead of leaving it silently blank.

## S5 · STEPS — Upsert, not Insert

And use Upsert, not plain Insert, matched on an External ID field. It's easy to accidentally run the same load twice during testing — Upsert means a second run updates existing records instead of creating duplicate Accounts with the same name.

## S6 · OUTRO

Next lesson, with real data finally sitting in the org, you'll run a full test pass — confirming security, Flows, and validation rules all behave exactly the way Chapters 2 and 3 designed them to.
