# The Import Wizard

**Chapter 1 · Getting Data In · Lesson 2 of 20**

The Data Import Wizard is the fastest way to get a modest batch of records into Salesforce without installing anything. It lives entirely in the browser, walks you through choosing data, mapping fields, and starting the import, and auto-matches most columns for you. This lesson walks the flow end to end, on the same screens you'll use in a real org.

## What you'll learn

- The three-step flow the wizard walks you through
- How field mapping works, and when you need to fix it yourself
- What happens after you click Start Import
- The wizard's real limits, so you know when to reach for Data Loader instead

## Three steps, start to finish

From Setup, search **Data Import Wizard** in Quick Find and launch it.

![The Data Import Wizard landing page: a three-step progress graphic — Pre-step: Prepare your data, Choose data to import, Edit field mapping, Review and start import — with a green "Launch Wizard!" button.](/courses/salesforce-data-management/ch01/02-the-import-wizard/launch-wizard.png)

The wizard breaks the job into three real steps (plus the prep work from Lesson 1, shown here as a pre-step): **choose data**, **edit mapping**, and **start import**. You pick the object (Accounts, Contacts, Leads, Campaign Members, Solutions, or a custom object), whether you're adding, updating, or adding-and-updating records, and the CSV file to use.

## Field mapping — mostly automatic, not always right

Once you've chosen your file, the wizard tries to auto-match your CSV's column headers to Salesforce fields.

![Edit Field Mapping screen for Leads: a progress bar showing "Edit mapping" as the current step, a mapped-fields table, and a "Map your field" dialog open for "Address Line 1," currently Unmapped, with a searchable field list.](/courses/salesforce-data-management/ch01/02-the-import-wizard/edit-field-mapping.png)

Most columns map themselves — `First Name` to `First Name`, `Email` to `Email`, and so on. Anything the wizard can't confidently match is flagged **Unmapped**, like `Address Line 1` above. Click **Map** next to an unmapped column, search for the right Salesforce field (here, `Street`), and confirm. Leave a required field unmapped and those rows will fail on import, so it's worth working through every unmapped row before moving on — not just the obvious ones.

## Review, then start

The last step is a straightforward summary.

![Review & Start Import screen showing a progress bar at "Start import," a "Your selections" panel (Leads, Add new records, Lead Import.csv), and counts of 15 mapped fields and 0 unmapped fields, with a "Start Import" button.](/courses/salesforce-data-management/ch01/02-the-import-wizard/review-start-import.png)

Before you click **Start Import**, this screen shows exactly what you selected: the object, the operation (add, update, or both), the file, and a count of mapped versus unmapped fields. Zero unmapped fields is what you want to see here — if the count isn't zero, go back and fix it rather than importing anyway.

## What happens after you click Start

![A "Congratulations, your import has started!" confirmation dialog over the Review & Start Import screen, with a note that import status is available on the Bulk Data Load Job page.](/courses/salesforce-data-management/ch01/02-the-import-wizard/import-started-confirmation.png)

The import doesn't run synchronously — clicking Start Import queues an asynchronous job and hands you this confirmation. Click **OK** to jump to the **Bulk Data Load Job** page, where you can watch the job's status and, once it finishes, download the success and error files. That queuing behavior is the same Bulk API machinery Data Loader uses under the hood, which Lesson 9 covers in more depth.

## Know the wizard's limits

- **50,000 records per job**, and a practical sweet spot well under that for anything you want to babysit closely.
- **Supported objects only** — Accounts, Contacts, Leads, Solutions, Campaign Members, person accounts, and custom objects. No Opportunities, no Cases, no arbitrary standard objects.
- **Simpler matching** — duplicate prevention is limited to account name/site, contact email, or lead email, not a custom matching rule.
- **One CSV file per job** — no batching multiple files into a single run.

When a job falls outside any of these, that's the planning checklist from Lesson 1 pointing you at Data Loader instead, which Lesson 3 introduces.

## Try it yourself

In a sandbox or Developer Edition org, launch the Data Import Wizard against Leads with a small CSV (even five rows). Walk all three steps, deliberately leave one column unmapped to see how the wizard flags it, then map it and finish the import. Check the Bulk Data Load Job page afterward for the success file.

## Recap

- The wizard is a three-step flow: choose data, edit mapping, start import.
- Auto-mapping handles most columns; unmapped fields need your attention before you start.
- Starting an import queues an async job you track on the Bulk Data Load Job page.
- 50,000 records, a fixed list of supported objects, and simple duplicate matching are the wizard's real ceiling.

## Check yourself

You're importing 80,000 Contact records with a custom matching rule for duplicates. In one sentence, explain why the Import Wizard is the wrong tool here.
