# Installing & Configuring Data Loader

Chapters 1 to 4 were about getting data out with queries. This chapter is about **moving data in bulk**: exporting it to files, loading it back, and changing it safely. The tool for that job is **Data Loader**, and it is the tool most Salesforce data analyst job postings expect you to know.

## What you'll learn

- What Data Loader is and what it can and can't do
- How logging in works, and why the environment choice matters
- The handful of settings worth understanding before your first load

## What Data Loader is

Data Loader is Salesforce's own **free, official desktop application**. You install it on your computer, connect it to an org, and use it for bulk operations: **Insert, Update, Upsert, Delete, Hard Delete, Export** and **Export All**. Both the input and the output are **CSV files**, which is why it fits so naturally with the spreadsheet and SQL skills you already have.

It is built for volume. Where a browser tool is fine for a few hundred rows, Data Loader is the standard choice for large loads, and it can also be run from the command line for repeatable jobs.

## Logging in

When you start an operation, Data Loader asks how to connect:

- Choose **how to log in**. OAuth, where you approve access in a browser window, is the modern option. Password authentication also exists, and it requires your security token appended to your password when your org needs one.
- Choose the **environment**: **Production** or **Sandbox**. This is the choice to slow down for. It decides which org your operation actually touches.
- Your user needs **API access**. Whether API access is included depends on the Salesforce edition, and it is controlled by the **API Enabled** permission on your profile or permission set. If login fails with an API error, that is the first thing to check.

## Settings worth knowing

Open **Settings** in Data Loader and you will see several options. The ones that matter first:

| Setting | What it does |
|---|---|
| Batch Size | Records sent per batch. Default is 200 (the standard API's maximum), and it can go higher when Bulk API is on |
| Use Bulk API | Processes data with Salesforce's Bulk API, designed for large volumes |
| Insert Null Values | When on, blank CSV cells overwrite existing field values with nothing |
| Query request size | How many records come back per request during an export |

The defaults are fine while you are learning. **Insert Null Values** is the one to respect: with it on, a blank cell in an update file erases real data.

## Key terms

| Term | Meaning |
|---|---|
| Data Loader | Salesforce's free, official desktop app for bulk import, export and update |
| CSV | The plain-text file format Data Loader reads and writes |
| Sandbox | A copy of an org used for safe testing, separate from Production |
| Batch size | The number of records processed together in one request |
| API Enabled | The permission that lets a user connect through the API |

## Check yourself

You are about to run your first load. Which two things should you confirm before clicking through the login, and what could go wrong if you skip one of them?
