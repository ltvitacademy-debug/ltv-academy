# Weekly Export Service

**Chapter 2 · Getting Data Out and Keeping It Safe · Lesson 8 of 20**

Lesson 7 covered running an export manually, on demand. This lesson covers the other half of the same page: scheduling exports to run automatically, so backups happen on a reliable cadence without anyone remembering to click a button. Salesforce calls this feature the Weekly Export Service, though the actual frequency you get depends on your org's edition.

## What you'll learn

- Where scheduling lives, and how it differs from a one-time export
- Which editions get weekly frequency versus monthly
- What happens once a scheduled export is in progress
- How to know a scheduled export actually ran, and where the files land

## Same page, a different button

![The Data Export Setup page, showing "Monthly Export Service" with an explanatory paragraph and both Export Now and Schedule Export buttons.](/courses/salesforce-data-management/ch02/08-weekly-export-service/data-export-service-overview.png)

From the same Data Export page covered in Lesson 7, click **Schedule Export** instead of Export Now. The configuration screen that opens is nearly identical to the manual export's options — same encoding choice, same attachment checkboxes, same object selection — with one addition: a frequency and start-date setting for when the export should run going forward.

## Weekly, or monthly — it depends on your edition

Despite "Weekly Export Service" being the feature's common name, the frequency you actually get depends on edition:

- **Enterprise, Performance, and Unlimited Edition** orgs can schedule a **weekly** export.
- Editions without weekly access (and the feature shown here reading "Monthly Export Service") are limited to a **monthly** cadence instead.

Either way, the mechanics are the same: once scheduled, the export runs automatically on that cadence without anyone needing to return to this page — until you want to change the schedule or the objects included.

## Watching a scheduled export run

![The same Data Export page mid-run, showing "A data export is currently in progress for your organization," along with who scheduled it, the schedule date, and the export file encoding.](/courses/salesforce-data-management/ch02/08-weekly-export-service/scheduled-export-in-progress.png)

Once a scheduled export kicks off, this page updates to show it's in progress, along with who scheduled it and when. You'll also get an email with a download link once it finishes — the same 48-hour download window from Lesson 7 applies here too, so a scheduled export isn't a long-term archive on its own. If you need to keep backups longer than 48 hours, someone (or something) has to actually download and store the files each cycle.

## Why scheduling beats remembering

The entire point of automating this is removing the human step. A manual Export Now depends on someone remembering to run it before it's needed — usually right before a risky change, which is exactly the moment people are focused on something else. A scheduled export exists whether or not anyone thinks about it that week, which is what makes it a real backup strategy rather than a one-off safety net.

## Try it yourself

In a sandbox, open the Data Export page and click Schedule Export. Walk through the options — notice they mirror the manual export screen from Lesson 7 — and set a frequency (weekly, if your edition allows it, otherwise monthly). You don't need to leave the schedule in place; this is just to see the configuration screen firsthand.

## Recap

- Schedule Export lives on the same Data Export page as the manual export, just a different button.
- Frequency depends on edition — Enterprise, Performance, and Unlimited get weekly; others get monthly.
- A scheduled export's files follow the same 48-hour download window as a manual one.
- Scheduling turns a backup from "something someone has to remember" into something that just happens.

## Check yourself

An org on an edition without weekly export access needs backups more often than once a month. In one sentence, what are their realistic options?
