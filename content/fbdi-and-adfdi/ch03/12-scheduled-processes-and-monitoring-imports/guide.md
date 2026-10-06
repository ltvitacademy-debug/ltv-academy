# Scheduled Processes and Monitoring Imports

Every process named in this course so far — Load Interface File for Import, Import Payables Invoices, Import Journals — is submitted and tracked in the same place: the Scheduled Processes work area. This lesson is about that work area itself: how to find a process you submitted, read its status, and understand what's happening underneath a single row in its list.

## What you'll learn

- What the Scheduled Processes work area is for
- The statuses a process moves through, and what each one means
- Why a single submission can actually be several processes, not one
- How to find the specific run you care about among many others

## The Scheduled Processes work area

Scheduled Processes is a general-purpose work area in Oracle Fusion used for far more than FBDI — it's where any long-running, asynchronous job gets submitted and tracked, including reports, batch jobs, and the import processes this course covers. Every process you submit shows up here as a row, with a process name, submission time, the user who submitted it, and a status.

## Reading process status

A submitted process typically moves through a small set of statuses: it may sit briefly as **pending**, run as **processing** or **running**, and finish as **succeeded**, **warning**, or **error**. "Succeeded" is good news for that process specifically, but remember from lesson 11 that a successful product-specific import process can still have rejected rows inside its own report — the process itself can succeed even while some of its rows didn't. "Warning" often signals exactly that: the process completed but something inside it deserves a closer look. "Error" means the process itself failed to complete, which is a different, usually more serious problem than ordinary rejected rows.

## One submission, multiple child processes

Some of the processes in this course aren't single jobs — they spawn **child processes** automatically. Load Interface File for Import, for example, is documented as spawning child processes, like one that transfers the file and another that loads it into the interface table. Import Journals similarly spawns a child program to do the actual work. When monitoring an import, it's worth expanding a parent process row to see its children, because a parent can show as still "running" while its real work is happening in a child row you might otherwise miss.

## Finding the run you care about

In a busy Oracle Fusion environment, Scheduled Processes can fill up fast with jobs submitted by many different users. The work area supports filtering — by process name, by submission date, by the user who submitted it — which is the practical way to find your specific run instead of scrolling through everyone else's. Searching by the exact process name you submitted (for example, "Import Payables Invoices") and a tight date range is usually the fastest path to the row you need.

## Recap

Scheduled Processes is the shared work area where every FBDI process is submitted and tracked, moving through statuses like pending, running, succeeded, warning, and error — with "succeeded" not necessarily meaning zero rejected rows. Some processes spawn child processes you need to expand to see. Filtering by process name and date is how you find your run quickly. Next up, lesson 13: reading the reports and logs a completed process actually produces.
