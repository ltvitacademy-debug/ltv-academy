# The Import Wizard

Data Loader and Workbench are separate tools. The third option is built right into Salesforce: the **Data Import Wizard**. It trades power for simplicity, which is exactly why it is worth knowing.

## What you'll learn

- Where the Import Wizard lives and how its steps work
- What it can do with records
- Its real limits, which decide when to use something else

## Where to find it

In **Setup**, use the Quick Find box to search for **Data Import Wizard**, or go to **Data Management** and open it. Click **Launch Wizard**. It runs inside your existing Salesforce session, so there is **nothing to install** and no separate login. You also need suitable permissions, and administrators typically control who has them.

## The steps

1. **Choose data.** Pick the object, then the action: **add new records**, **update existing records**, or **add new and update existing records**. For updates, you also choose the field used to **match** incoming rows to existing records, such as the Salesforce Id, an external ID, or a field like Email or Name, depending on the object.
2. **Upload your CSV.** Drag in the file.
3. **Map fields.** The wizard proposes mappings from your column headers, and you correct any it gets wrong.
4. **Start the import.** Progress and results are available afterwards, so check them for failed rows.

The wizard also offers a few options such as whether to trigger automation like workflow rules and processes on the imported records.

## The real limits

| Limit | Detail |
|---|---|
| Volume | Up to **50,000 records** per import |
| Objects | Accounts, Contacts, Leads, Solutions, Campaign Members and custom objects. **Not** Opportunities or Cases |
| Operations | **Import only**: no export, no delete |

These limits are why the wizard suits a small, one-time load of a supported object, often done by an administrator, and why anything bigger or broader moves to Data Loader.

## Key terms

| Term | Meaning |
|---|---|
| Data Import Wizard | Salesforce's built-in, guided CSV import tool in Setup |
| Match field | The field used to identify existing records when updating |
| Import only | The wizard can add and update records but cannot export or delete |
| Supported object | An object the wizard can load, such as Accounts, Contacts, Leads |

## Check yourself

You have a 120,000-row file of Opportunities to load. Explain why the Import Wizard is the wrong tool on two separate counts, and name the better one.
