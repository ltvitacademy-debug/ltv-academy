# Choosing the Right Tool for the Job

Chapter finale. You now know **Data Loader**, **Workbench** and the **Import Wizard**. None of them is best at everything, and a data analyst is judged partly on picking the right one for a given task instead of using a favourite for every task.

## What you'll learn

- What each tool is strongest at
- A quick decision path based on volume, operation and repeatability
- The safety habit that applies to every choice

## The three tools side by side

| | Data Loader | Workbench | Import Wizard |
|---|---|---|---|
| Where it runs | Installed desktop app | Browser, no install | Built into Setup |
| Volume | Large; designed for big loads | Smaller, ad hoc jobs | Up to 50,000 records |
| Operations | Insert, Update, Upsert, Delete, Hard Delete, Export, Export All | Query, Insert, Update, Upsert, Delete, Undelete, Purge | Add and update only |
| Repeatable jobs | Yes, with command-line mode | Not designed for it | No |
| Support | Official Salesforce tool | Community tool | Built-in feature |

## A decision path

Ask three questions, in this order:

1. **How many records?** More than 50,000 rules out the Import Wizard, and a large job belongs in Data Loader.
2. **Which operation?** Need to **export** or **delete**? The wizard cannot do either. Need to load **Opportunities or Cases**? The wizard doesn't support them.
3. **One-off or repeatable?** A job that runs weekly should be a Data Loader job, ideally an **upsert** on an External ID so re-runs do not create duplicates.

## Rules of thumb

- **Just need to look?** Workbench. Run a quick query, check field names, inspect a limit.
- **Small, one-time load of a supported object?** The Import Wizard.
- **Large, recurring, or involves export or delete?** Data Loader.

## Whatever you choose

The habits from this chapter apply to all three tools. **Export the affected records first**, **rehearse in a sandbox**, test with a **small batch**, and read the **error output** before you trust the result. The tool matters less than the process around it.

## Key terms

| Term | Meaning |
|---|---|
| Ad hoc | A one-off task, not a scheduled or repeated one |
| Volume | How many records a job touches |
| Repeatable load | A job that runs again on new data, such as a weekly sync |
| Upsert | Update-or-insert, matched on an ID field |

## Check yourself

Three requests arrive: (a) a count of open Cases for one Account, (b) 8,000 new Leads from a trade show, one time, (c) a nightly sync of 60,000 customer rows from an ERP. Assign a tool to each and justify your choices in one sentence apiece.
