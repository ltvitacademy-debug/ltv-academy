# Script — Scheduled Processes and Monitoring Imports

## Segment 1 (title)

Every process named so far — Load Interface File for Import, Import Payables Invoices, Import Journals — is submitted and tracked in the same place: Scheduled Processes. This lesson is about that work area itself.

## Segment 2 (steps)

Scheduled Processes is a general-purpose work area used for far more than FBDI — any long-running job gets tracked here. Every process you submit shows up as a row: process name, submission time, the user who submitted it, and a status.

## Segment 3 (steps)

A process typically moves through pending, then processing or running, and finishes as succeeded, warning, or error. Succeeded is good news for that process, but a successful import process can still have rejected rows inside its own report. Warning often signals exactly that. Error means the process itself failed to complete — a different, more serious problem than ordinary row rejections.

## Segment 4 (steps)

Some processes spawn child processes automatically. Load Interface File for Import spawns a transfer step and a load-to-interface step. Import Journals spawns its own child program to do the real work. Expand the parent row to see its children — a parent can show as still running while the real work is happening underneath it.

## Segment 5 (outro)

In a busy environment, Scheduled Processes fills up fast. Filter by process name, submission date, and the user who submitted it to find your specific run instead of scrolling through everyone else's. Up next, lesson thirteen: reading the actual reports and logs a completed process produces.
