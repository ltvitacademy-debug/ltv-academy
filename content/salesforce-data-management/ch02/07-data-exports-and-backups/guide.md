# Data Exports and Backups

**Chapter 2 · Getting Data Out and Keeping It Safe · Lesson 7 of 20**

Getting data out of Salesforce matters just as much as getting it in — for backups, for migrating to another system, or for feeding data to a tool that doesn't have a native integration. Salesforce gives you two built-in ways to export: a manual, on-demand export page in Setup, and Data Loader's Export operation from Lesson 3. This lesson covers the first; Lesson 8 covers scheduling it to run automatically.

## What you'll learn

- Where the Data Export page lives and what it actually produces
- The choice between exporting everything or specific objects
- What a flattened export means for relationships between records
- Export Now versus Schedule Export, and when each makes sense

## Finding the Data Export page

![Setup's Quick Find box filtered to "data export," with the Data Export menu item highlighted under Data.](/courses/salesforce-data-management/ch02/07-data-exports-and-backups/setup-search-data-export.png)

From Setup, search **Data Export** in Quick Find. This single page is the entry point for both a one-time manual export and a recurring scheduled one — Lesson 8 covers the scheduled half.

## What the export page shows you

![The Data Export Setup page, titled "Monthly Export Service," showing an explanation of the feature, a "Next scheduled export" status banner, and Export Now / Schedule Export buttons.](/courses/salesforce-data-management/ch02/07-data-exports-and-backups/data-export-service-overview.png)

Despite the page sometimes reading "Monthly Export Service" in the header, this is the same feature Lesson 8 calls the **Weekly Export Service** — the available frequency depends on your org's edition. The page explains what it does in plain terms: it prepares a full copy of your org's data as a set of CSV files, available for download from this page (and by email link) for 48 hours after the export completes.

## Choosing what to export

![The Data Export options screen, showing export file encoding, checkboxes for including images/documents/attachments and Salesforce Files, a "Replace carriage returns with spaces" option, Start Export / Cancel buttons, and a checklist of specific object types to include, with "Include all data" checked.](/courses/salesforce-data-management/ch02/07-data-exports-and-backups/data-export-options-and-data-types.png)

Clicking **Export Now** (or configuring a scheduled export) opens this options screen. Two choices matter most:

- **Include all data** exports everything you have access to — the simplest choice for a true backup.
- **Deselecting it** lets you pick specific objects (Account, Contact, Opportunity, and so on) if you only need part of the org, which produces a smaller, faster export.

You can also choose whether to include images, documents, attachments, and Salesforce Files — these substantially increase export size and time, so only include them if you actually need them restored.

## What "flattened" means, and why it matters

A data export produces one CSV per object, each a flat table — and that's the catch. Relationships between records export as **IDs**, not as nested data. A Contact's export row includes its `AccountId`, but reconstructing "this Contact belongs to this Account" from the files afterward means matching IDs across separate CSVs yourself. An export is a faithful snapshot of your data, not a ready-to-restore package — restoring it (if you ever need to) means reloading those CSVs back in with Data Loader, respecting the same relationship-loading approach from Lesson 6.

## Export Now vs. Schedule Export

**Export Now** runs once, immediately — useful before a risky change, a mass delete (Lesson 10 covers this), or a one-off migration. **Schedule Export** sets up a recurring export that runs automatically on a cadence your edition allows, which is the subject of the next lesson.

## Try it yourself

In a sandbox, navigate to Setup's Data Export page and click Export Now. Deselect Include all data and choose just the Account and Contact objects, leave attachments unchecked, and start the export. Once it completes, download the files and open the Contact CSV to find the `AccountId` column — that's the "flattened" relationship in practice.

## Recap

- Setup's Data Export page is the entry point for both manual and scheduled exports.
- Include all data for a true backup, or deselect it to export specific objects only.
- Exports are flattened — relationships export as ID columns, not nested data.
- Export Now runs once immediately; Schedule Export sets up recurring exports, covered next.

## Check yourself

Before a risky mass-delete operation, you want a safety net you can restore from if something goes wrong. In one sentence, which export option should be checked, and why?
