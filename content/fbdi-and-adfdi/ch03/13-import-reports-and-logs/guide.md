# Import Reports and Logs

A process status of "Succeeded" tells you the job finished. It doesn't tell you what actually happened to your data. For that, you need the process's own output: its log file and, for most import processes, a dedicated report. This lesson covers how to read both, and what to look for.

## What you'll learn

- The difference between a process's log file and its output report
- What a typical import execution report shows
- How to find the output for a specific completed process
- Why the log file matters even when the report looks clean

## Log file versus output report

Every scheduled process produces a **log file** — a technical, often verbose record of what the process did internally: which steps it ran, in what order, and any system-level messages or warnings it generated along the way. Separately, most product-specific import processes also produce a **report**, specifically formatted for a human reviewing the business outcome: how many rows were read, how many succeeded, how many were rejected, often broken down by reason. For day-to-day review, the report is usually what you want first; the log file becomes useful when the report alone doesn't explain something, or when the process itself errored out before it could produce a normal report.

## What a typical import execution report shows

While exact layouts vary by module, an import execution report commonly includes: a total row count read from the interface table, a count of rows successfully imported, a count of rows rejected, and — this is the part worth reading carefully — a listing of rejected rows with enough identifying detail (often a row or line identifier, plus a message) to trace each one back to a specific record and a specific reason. A report showing "980 succeeded, 20 rejected" without that rejection detail is far less useful than one that shows which 20 rows failed and why.

## Finding the output for a specific run

From the Scheduled Processes work area, a completed process typically exposes its output file(s) directly from its row — the report (often available in a readable format like PDF or Excel) and, separately, the log. If you're reviewing an import you submitted five minutes ago versus one from last week, the process name, submission time, and the filters covered in lesson 12 are what let you locate the exact run whose output you need, rather than opening the wrong report and drawing the wrong conclusion.

## Why the log file still matters on a "clean" report

Occasionally a report shows zero rejected rows, but something still seems off — perhaps fewer total rows were processed than you expected. This is where the log file earns its place: it can reveal, for example, that the file-loading step dropped a tab's worth of rows earlier in the pipeline, before the import process ever saw them, which wouldn't appear as a "rejection" in the import report at all because those rows never reached the interface table in the first place. A clean-looking report is not, by itself, proof that everything you intended to load actually arrived.

## Recap

Every process produces a log file and, usually, a human-readable execution report; the report is your first stop for business outcomes, the log your second stop when something doesn't add up. A good report shows not just counts but the specific reasons behind each rejection. Even a clean report deserves a sanity check against the row count you expected. Next up, lesson 14: querying interface tables directly to see raw staged data before or after an import runs.
