# Workbench, Overview

Data Loader is a desktop application you install. **Workbench** is the other classic Salesforce data tool, and it lives entirely in your browser. Many admins and analysts keep it bookmarked for quick jobs, and it appears often in Salesforce data job descriptions alongside Data Loader.

## What you'll learn

- What Workbench is and how you connect to an org
- What its main menus contain
- How it compares with Data Loader

## What Workbench is

Workbench is a **free, web-based** power-user tool for Salesforce. There is nothing to install: you open it in a browser, log in with your Salesforce org, and use it right away.

- At login you choose the **environment** (Production or Sandbox) and an **API version**.
- It is a **community tool**, not an officially supported Salesforce product. That does not make it unsafe, but it does mean you should follow your organization's security policy before connecting a real org, and it is one reason some companies restrict it.

## The main menus

| Menu | What's there |
|---|---|
| **Info** | Standard and custom objects, org limits, session information |
| **Queries** | **SOQL Query** and **SOSL Search** |
| **Data** | Insert, Update, Upsert, Delete, Undelete and Purge |
| **Migration** | Retrieve and Deploy metadata |
| **Utilities** | Tools such as Apex Execute and REST Explorer |

As an analyst you will mostly live in **Info** and **Queries**, with **Data** for small changes. Migration and Utilities are developer and admin territory.

## Workbench versus Data Loader

| | Workbench | Data Loader |
|---|---|---|
| Install | None, runs in a browser | Desktop application |
| Best for | Quick, ad hoc queries and small loads | Large volumes and repeatable jobs |
| Scripting | Not designed for it | Command-line mode available |
| Support | Community tool | Official Salesforce tool |

Neither replaces the other. A common habit is to explore and check things in Workbench, then use Data Loader when the job gets big.

## Key terms

| Term | Meaning |
|---|---|
| Workbench | Free, browser-based Salesforce data and developer tool |
| API version | The Salesforce API release Workbench uses for its calls |
| SOQL Query page | Where you run queries in Workbench (next lesson) |
| Undelete | Restores records from the Recycle Bin |
| Purge | Permanently removes records from the Recycle Bin |

## Check yourself

A teammate asks whether to open Workbench or Data Loader to check the field names on the Opportunity object. Which would you pick and why, and what would change if the task were loading 400,000 rows?
