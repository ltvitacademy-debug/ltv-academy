# Data Loader Concepts

**Chapter 1 · Getting Data In · Lesson 3 of 20**

Data Loader is the tool you reach for when the Import Wizard's limits stop being theoretical: more than 50,000 records, an object the wizard doesn't support, a complex field mapping, or a job you want to run the same way every week. Unlike the wizard, it's a real application you install on your machine — which means there's a one-time setup cost before you get the payoff of handling almost anything.

## What you'll learn

- What Data Loader is, and when it beats the Import Wizard
- The install steps, start to finish
- The six operations on its main screen
- Where Data Loader's settings live, and why they matter before your first real job

## What Data Loader actually is

Data Loader is a free, Salesforce-provided desktop client for bulk import and export. It reads from and writes to CSV files (or, on Windows, a database connection), and it talks to Salesforce through the same APIs — SOAP or Bulk API — that any integration would use. That API relationship is what gives it reach the wizard doesn't have: any standard or custom object, up to 150 million records when Bulk API is enabled, and field mappings you build and save for reuse.

From Lesson 1's planning checklist, Data Loader is the right call when you need to load into an object the wizard doesn't support, when your mappings are too complex for auto-matching, when you want to schedule recurring loads, or when you're exporting data for backup — Lesson 7 picks that use case up directly.

## Installing it

![Setup's Data Loader page, reached via Quick Find, showing a short description and Download links for both Windows and Mac along with their installation instructions.](/courses/salesforce-data-management/ch01/03-data-loader-concepts/setup-data-loader-page.png)

Setup has its own shortcut to the download (search **Data Loader** in Quick Find), but the actual installer comes from Salesforce's developer site. Before installing, you need **Java Runtime Environment (JRE) 17 or later** — Data Loader no longer bundles its own copy. Download the Data Loader zip for your OS, extract it, and run the installer script inside (`install.bat` on Windows, `installer.command` on macOS).

![A Windows command-line installer finishing: a list of copied files (dataloader.bat, config files, sample mapping files) followed by "Your Data Loader v45.0.0 is created in..." and a prompt asking whether to create a start menu shortcut.](/courses/salesforce-data-management/ch01/03-data-loader-concepts/install-terminal-output.png)

The installer copies Data Loader's program files, a `configs` folder (where your settings and encryption keys live), and a `samples` folder with example mapping and configuration files you'll reference later if you ever move to command-line batch mode. It finishes by asking about desktop and start-menu shortcuts — say yes to either, since you'll be opening this often.

## The six operations

Open Data Loader and you land on its main screen.

![The Data Loader welcome screen: a Salesforce-branded header and six large buttons — Insert, Update, Upsert, Delete, Hard Delete (greyed out), Export, and Export All.](/courses/salesforce-data-management/ch01/03-data-loader-concepts/data-loader-main-window.png)

Every job starts by picking one of these buttons, and each one is really its own small wizard: log in, choose an object, choose a CSV file, map fields, and run. **Insert**, **Update**, and **Upsert** are the three ways to get data in — Lesson 5 covers exactly how they differ. **Delete** and **Hard Delete** remove records (Hard Delete skips the Recycle Bin entirely and needs a separate permission, which is why it's greyed out until that permission is granted). **Export** and **Export All** pull data out, with Export All also returning soft-deleted and archived records — Lesson 7 picks this up.

## Settings worth knowing before your first job

Before running anything for real, open **Settings → Settings**. Two fields matter immediately: **Batch size** (how many records move per API call — larger batches are faster but riskier if one bad row can roll back the whole batch) and **Server host** (point this at a sandbox before you point it at production, the first time you try anything new). Later lessons revisit specific settings as they become relevant — upsert matching in Lesson 5, Bulk API in Lesson 9.

## Try it yourself

If you have access to a machine where you can install software, download Data Loader for your OS from the developer site, install it, and open it once just to see the six-button screen. You don't need to log in or run a job yet — just confirm the install worked and locate the Settings dialog.

## Recap

- Data Loader is a desktop client that talks to Salesforce via SOAP or Bulk API, built for scale and flexibility the wizard doesn't have.
- Installing it requires JRE 17+ first, then the Data Loader zip and its installer script.
- The main screen's six buttons — Insert, Update, Upsert, Delete, Hard Delete, Export, Export All — are each their own mini-wizard.
- Settings like batch size and server host are worth checking before your first real job, not after something goes wrong.

## Check yourself

A colleague asks why their org needs Data Loader at all when the Import Wizard already exists. In one sentence, name the single most common reason admins reach for Data Loader instead.
