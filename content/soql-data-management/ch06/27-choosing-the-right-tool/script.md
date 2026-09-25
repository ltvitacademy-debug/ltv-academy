# Script — Choosing the Right Tool for the Job

## Segment 1 (title)

You now have three tools. This lesson is about picking the right one, which matters more than knowing any one tool.

## Segment 2 (code: three tools, side by side)

Side by side. Data Loader is a desktop app for big volumes, every operation, and scripted jobs. Workbench is a browser tool with no install, best for quick queries and small loads. The Import Wizard is built into Setup, handles up to fifty thousand rows, and is import only.

## Segment 3 (steps: ask three questions)

Ask three questions in order. How many records? Over fifty thousand rules out the wizard. Which operation? If you need to export or delete, the wizard is out too. One-off or repeatable? If the job repeats, Data Loader with an upsert on an External ID is the reliable pattern.

## Segment 4 (code: rules of thumb)

As rules of thumb. Just need to look at data? Workbench. A small one-time load of a supported object? The Import Wizard. Large, recurring, or anything that exports or deletes? Data Loader. And whichever tool you pick, for anything risky, export first and rehearse in a sandbox.

## Segment 5 (outro)

That wraps up the tools chapters. Next up: Chapter seven, and the data quality issues you'll meet in real CRM data.
