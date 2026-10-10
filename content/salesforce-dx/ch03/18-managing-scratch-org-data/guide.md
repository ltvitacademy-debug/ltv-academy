# Lesson 18 — Managing Scratch Org Data

**Chapter 3 · Packaging and Workflows · Lesson 18 of 22**

## What you'll learn

- Why scratch orgs need a repeatable way to get sample data, not a one-time manual fix
- How sf data export tree and sf data import tree work together
- What a "plan" is and why it matters once more than one object is involved
- The size limits these commands are designed around

## Data doesn't survive a scratch org's lifecycle

A scratch org starts empty of custom data and gets deleted or expires within days (Lesson 5). If your Apex classes, Flows, or components assume certain records exist — a handful of Accounts and Contacts to test against, a few records in a custom object your Flow references — you can't rely on manually re-entering that data every time you spin up a fresh scratch org. You need a **repeatable, version-controlled way to seed data**, the same way your metadata itself is repeatable and version-controlled.

## Exporting a small sample dataset

`sf data export tree` runs a SOQL query against a source org and writes the matching records to JSON files in the **sObject tree format** — a structure built around nested parent-child records with a single root record type:

```bash
sf data export tree --query "SELECT Name, Industry, TickerSymbol, (SELECT FirstName, LastName, Email, Phone FROM Contacts) FROM Account" --output-dir ./data --plan --target-org myScratch
```

A single query can return at most **2,000 records**, and these commands are designed for genuinely small sample datasets — Salesforce's own guidance frames this as a tool for datasets under roughly 3,000 records total, not a general-purpose data migration tool.

## Why --plan matters once more than one object is involved

Exporting from a single object produces one JSON file. The moment your query touches related objects — Accounts with their Contacts, as above — you need the **`--plan`** flag. With `--plan`, the export produces one JSON data file per object plus a separate **plan definition file** (ending in `-plan.json`) that ties them together and preserves the parent-child relationships between records from different objects when they're re-imported. Plans support relationship queries up to five levels of child objects deep.

## Importing into a fresh scratch org

```bash
sf data import tree --plan ./data/Account-Contact-plan.json --target-org myOtherScratch
```

Pointing `--plan` at the generated plan file re-creates the exported records, with relationships intact, in whatever org you target — a brand-new scratch org, most commonly. If you skip using a plan and instead import individual files directly with `--files`, you're responsible for listing them in the correct parent-before-child order yourself, since there's no plan file doing that ordering for you.

## Keeping it in version control

Because the export writes plain JSON files, the standard practice is to commit them to Git alongside your metadata, often under a `data/` or `scripts/` folder in the project. A fresh scratch org's setup routine then becomes: deploy metadata (Lesson 10), then import the committed data plan — fully repeatable, fully reviewable, and not dependent on anyone remembering to type records in by hand.

## Key terms

| Term | Meaning |
|---|---|
| sObject tree format | The nested JSON structure representing parent-child records for export/import |
| `sf data export tree --plan` | Exports related records across multiple objects plus a plan file tying them together |
| Plan definition file | The generated file (ending `-plan.json`) that preserves relationships across exported objects |
| `sf data import tree` | Imports an exported dataset (optionally via a plan) into a target org |

## Lab

Write the `sf data export tree` command you'd use to export every Opportunity (Name, StageName, Amount) along with its related Contact Roles, using a plan, into a local `./seed-data` folder from an org aliased `source-org`. Then write the corresponding `sf data import tree` command to bring that same data into a brand-new scratch org aliased `fresh-scratch`. Explain why you used `--plan` rather than just listing files directly.

## Check yourself

Can you explain why scratch orgs specifically need a repeatable data-seeding approach rather than manual data entry? Can you describe what `--plan` adds when exporting data that spans more than one related object, and name the record-count limit a single export query is subject to?
