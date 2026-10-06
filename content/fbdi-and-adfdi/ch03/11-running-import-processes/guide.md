# Running Import Processes

The last lesson ended with data sitting safely in an interface table, staged but inert. This lesson covers the process that actually matters to the business: the product-specific import process that reads those staged rows, checks them against real validation rules, and creates — or refuses to create — live application records.

## What you'll learn

- What a product-specific import process actually does, step by step
- Why its name changes depending on what you're loading
- The kind of validation it applies that earlier steps could not
- What its output tells you, and why both counts (succeeded and rejected) matter

## One name per module, one job in common

Every Oracle Fusion Financials module has its own import process, named for what it does: **Import Journals** for General Ledger, **Import Payables Invoices** for Payables, **AutoInvoice Import** for Receivables, and so on — these specific processes get their own lessons in Chapter 4. Despite the different names, they all do the same conceptual job: read rows out of the relevant interface table(s), run them through that module's business-rule validation, and write an accepted row forward into the real application table as a live record.

## What this step validates that earlier steps couldn't

Load Interface File for Import, from the previous lesson, only confirmed the file was structurally valid CSV data that could be inserted into an interface table — it has no idea whether a supplier number is a duplicate, whether an account combination exists in the chart of accounts, or whether a required approval workflow field is populated correctly. The product-specific import process is where all of that business logic actually runs. This is intentional: keeping file-structure validation separate from business-rule validation is what lets the same "Load Interface File for Import" process be reused unchanged across every single module in this course.

## Submitting the process

Like Load Interface File for Import, the product-specific import process is submitted from Scheduled Processes, with its own set of parameters — commonly things like which ledger or business unit the data belongs to, a batch or group identifier to scope which staged rows it should pick up, and sometimes an option for whether to purge successfully processed rows afterward (covered in Chapter 5). Getting these parameters right ensures the process only processes the batch you intend, rather than accidentally picking up unrelated staged data left over from an earlier, unrelated load.

## Reading the two outcomes

When the process finishes, it reports two numbers that both matter: how many rows were successfully imported, and how many were rejected. A run that processes 980 of 1,000 rows successfully is not simply "98% done" — it's 20 specific, fixable problems waiting in the rejected rows, each with an identifiable cause you'll learn to trace in Chapter 5. Treating the rejected count as noise to ignore, rather than a list of specific issues to resolve, is how data quality problems quietly make it into a live Oracle Fusion environment.

## Recap

The product-specific import process is the step that actually creates live records, applying the business-rule validation earlier steps could not. Its name changes per module, but its job — validate, then create or reject — stays the same everywhere. Both the succeeded and rejected counts in its output deserve attention. Next up, lesson 12: using Scheduled Processes to monitor imports while they run, and interpreting their status.
