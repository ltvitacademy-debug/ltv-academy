# The FBDI Process: Template to Import

Every FBDI load, no matter which Oracle Fusion module it targets — General Ledger, Payables, Receivables, Fixed Assets, Cash Management — follows the exact same sequence of steps. Learn this sequence once and you can load almost anything. This lesson walks it start to finish, in order, so that every later lesson in this course can simply say "run the process" without re-explaining what that means.

## What you'll learn

- The full, ordered FBDI pipeline from template to completed import
- What happens at each step, and which tool or screen is used
- Where the pipeline's "staging boundary" sits, and why it matters
- The two distinct submissions that are easy to confuse: loading to interface tables, and importing from them

## The pipeline, step by step

1. **Download the template.** Oracle publishes one Excel template per business object. You download the specific template for the data you're loading — Suppliers, Journals, Payables Invoices, and so on.
2. **Populate the template.** You fill in rows of data on the template's data-entry tabs, following the column structure Oracle has already built for you.
3. **Generate the CSV files.** The template's Instructions tab includes a macro button that converts your populated tabs into one or more CSV files, formatted exactly the way the import expects.
4. **Zip the CSV files.** The generated CSV files are bundled into a single ZIP file — this is the file you'll actually upload.
5. **Upload the ZIP to UCM.** The ZIP file is uploaded to Oracle's content management repository (Universal Content Management, or UCM), using the File Import and Export tool.
6. **Run Load Interface File for Import.** This scheduled process reads your uploaded ZIP out of UCM and loads its contents into the appropriate interface table(s) — the staging area. Nothing in the live application has changed yet.
7. **Run the product-specific import process.** A second scheduled process — Import Payables Invoices, Import Journals, AutoInvoice Import, and so on, depending on what you're loading — reads the staged rows, validates them against business rules, and creates real application records for every row that passes.
8. **Review the results.** You check the process logs and reports to confirm how many rows succeeded and how many were rejected, and why.

## The staging boundary matters

Steps 1 through 6 all happen *before* anything touches a live application table. A ZIP file sitting in UCM, or rows sitting in an interface table, have zero effect on your General Ledger, your supplier list, or your financial statements. The only step that creates real records is step 7, the product-specific import process. This is exactly why it's safe to re-run step 6 as many times as you need while troubleshooting a file — you are only ever affecting the staging area until step 7 runs.

## Two submissions, often confused by beginners

New Oracle Fusion users often expect "upload the file" to mean "the data is now loaded." It doesn't. There are two separate scheduled process submissions in this pipeline, and they do different jobs:

- **Load Interface File for Import** — moves data from your uploaded ZIP into interface tables. This step is almost identical regardless of which module you're loading into.
- **The product-specific import process** (its name changes per module — Import Payables Invoices for AP, Import Journals for GL, and so on) — moves data from interface tables into real application tables, applying business validation along the way.

Skipping the second step, or assuming it ran automatically, is one of the most common beginner mistakes in Oracle Fusion data loading — and one you'll learn to recognize and avoid in Chapter 5.

## Recap

The FBDI pipeline is always: download template, populate it, generate CSV, zip it, upload to UCM, run Load Interface File for Import, run the product-specific import process, then review the results. Everything before the final import step only affects a staging area, not live data — which is exactly why FBDI is safe to use at scale. Next up, lesson 4: a closer look at Universal Content Management, the repository every FBDI file passes through.
