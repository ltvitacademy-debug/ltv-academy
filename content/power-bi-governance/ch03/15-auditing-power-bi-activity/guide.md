# Lesson 15 — Auditing Power BI Activity

**Chapter 3 · Trust and Quality · Lesson 15 of 20**

## What you'll learn

- How auditing differs from the usage metrics covered in Lesson 14
- How to run and review an audit search covering Power BI activity
- What one logged event actually records, down to the IP address and the exact item touched
- How to drill into a single event's full detail for deeper investigation

## A different question than usage metrics

Lesson 14's usage metrics answers "who viewed this report, and how often." Auditing answers a broader and more precise question: **who did what, to which item, and when** — across every action in the tenant, not just views of one report.

| | Usage metrics | Audit log |
|---|---|---|
| Scope | One report at a time | Every logged action, tenant-wide |
| Who sees it | The report's owner | Admins / compliance reviewers |
| What it shows | View counts over time | Specific actions: viewed, shared, deleted, exported... |

Power BI's activity auditing runs through **Microsoft Purview's** unified audit log — the same audit system Microsoft 365 uses tenant-wide, with Power BI as one of the workloads it covers.

## Running an audit search

A compliance reviewer runs a named, time-bounded search — this one covering a one-week window, 2.9 million candidate events, filtered down to 300 actually returned.

![Screenshot of the Microsoft Purview audit search screen, showing a search query's time range, total result count, an Export button, and a blank space above the results toolbar.](/courses/power-bi-governance/ch03/15-auditing-power-bi-activity/audit-search-job-details-dashboard.png)
*Date, IP address, user, activity, and the exact item touched — one row per action captured by the audit log.*

Every row is one logged event: when it happened, the IP address it came from, who did it, what kind of action it was, and which specific item it touched. For a certified dataset, this is how you'd answer "who actually deleted that," not just "who viewed it."

## Saved searches, reviewed later

Audit searches don't have to be run fresh every time — they're saved jobs with their own status, so a reviewer can come back and check results later.

![Screenshot of a list of saved audit searches, showing search name, job status, progress percentage, search time, total results, creation time, and who performed each search.](/courses/power-bi-governance/ch03/15-auditing-power-bi-activity/audit-new-search-columns.png)
*A named, saved audit search — status, time range, who ran it, and how many results came back.*

This matters for governance because audit reviews are rarely one-off — a real investigation often means re-running a similar search over several days, comparing what changed.

## Drilling into one event

Any single row expands into its full detail: every field the audit system captured for that one action.

![Screenshot of the Detail panel for one audit log entry, showing date, IP address, user, activity (FileAccessed), the exact item, and a raw AppAccessContext JSON payload.](/courses/power-bi-governance/ch03/15-auditing-power-bi-activity/audit-new-search-result-details.png)
*One record expands to its full detail — date, user, the exact item, and a raw access-context payload for deeper investigation.*

That raw detail — down to a client app ID and a correlation ID — is what turns "something happened to this file" into an actual, defensible answer for a security or compliance investigation.

## Key terms

| Term | Meaning |
|---|---|
| Audit log | A tenant-wide, per-action record of activity across Power BI and other Microsoft 365 workloads |
| Audit search | A named, time-bounded query against the audit log, saved as a job with its own status |
| Microsoft Purview | The compliance platform that hosts Power BI's unified audit log |

## Lab

Write the audit search you'd run to answer this question: "Did anyone outside the Finance team export the certified Q3 Revenue dataset last month?" Name the time range you'd set, and list the two or three fields from this lesson's screenshots you'd actually check in the results to answer it.

## Check yourself

Without looking back, can you state the one core difference between what usage metrics tells you and what the audit log tells you — and name which one you'd reach for if a certified dataset was unexpectedly deleted?
