# Script — Data Exports and Backups

## Segment 1 (title)

Getting data out of Salesforce matters just as much as getting it in — for backups, migrations, or feeding a tool without a native integration. This lesson covers the manual, on-demand export page.

## Segment 2 (screenshot: Setup search, Data Export)

From Setup, search Data Export in Quick Find. This single page is the entry point for both a one-time manual export and a recurring scheduled one.

## Segment 3 (screenshot: Data Export overview)

The page explains what it does in plain terms: it prepares a full copy of your org's data as CSV files, available for download, or by email link, for 48 hours after it completes.

## Segment 4 (screenshot: export options and data types)

Clicking Export Now opens the options screen. Include all data exports everything for a true backup. Deselecting it lets you pick specific objects instead, which produces a smaller, faster export — plus choices for whether to include images, documents, and attachments.

## Segment 5 (steps: flattened exports)

Here's the catch: exports are flattened. One CSV per object, and relationships export as ID columns, not nested data. A Contact's row includes its AccountId, but reconstructing the relationship means matching IDs across files yourself — and restoring means reloading those CSVs with Data Loader.

## Segment 6 (steps: Export Now vs. Schedule Export)

Export Now runs once, immediately — useful before a risky change or a mass delete. Schedule Export sets up a recurring export on a cadence your edition allows.

## Segment 7 (outro)

Next, we set that schedule up properly: the Weekly Export Service.
