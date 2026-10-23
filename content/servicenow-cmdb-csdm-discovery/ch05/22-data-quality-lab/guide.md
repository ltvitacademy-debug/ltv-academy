# Lesson 22 — Data Quality Lab

**Chapter 5 · Data Quality & Governance · Lesson 22 of 26**

## What you'll learn

- How to trace a bad Health Dashboard score back to its root cause, not just its symptom
- How to read and correct a misconfigured Identification Rule
- How to run the detect-review-merge cleanup loop on existing duplicates
- How to close the loop with a named, accountable owner

## The scenario

You open the CMDB Health Dashboard for a mid-size environment and see a duplicate rate of 40% on `cmdb_ci_server` — more than a third of server CIs are likely duplicating another record already in the table. Completeness and Correctness both look reasonable on the records that do exist. This is a duplicate-rate problem specifically, and this lab walks through diagnosing and fixing it the same way you'd approach it on a real environment, using what the last four lessons covered.

## Step 1 — Don't clean up yet; find the cause

The instinct is to jump straight to merging duplicates. Resist it. Lesson 20 was explicit that cleanup without fixing the cause just gets undone by the next Discovery run. So the first stop is the Identification Rule for `cmdb_ci_server`, because a 40% duplicate rate concentrated in one CI class is exactly what a bad identification rule produces.

Reviewing the rule turns up the problem: it's matching new and existing server records on **Host Name alone**. No independent identifier like a hardware serial number is configured, and no dependent pairing like Host Name + Domain is being enforced either. That single weakness explains the whole pattern, once you connect it to something specific about this environment: a large share of the servers are virtual machines, and VMs in this environment get renamed during routine lifecycle events — a VM provisioned as `TEMP-BUILD-04` gets renamed to `WEB-PROD-17` once it's promoted to production. Discovery sees the renamed VM, finds no existing record with that hostname, and creates a brand-new CI instead of recognizing it as the same machine it already had a record for.

## Step 2 — Tighten the Identification Rule

The fix is to stop relying on a value that can change. The hardware serial number (or, for a VM, the hypervisor-assigned instance UUID, which survives a rename) is added as the independent identifier, so a renamed VM is still recognized as the same CI it always was. Host Name + Domain stays in place as a secondary, dependent identifier for cases where a serial or UUID isn't available. This one change doesn't touch any of the 40% of records already duplicated — it only prevents new duplicates from this specific cause going forward, which is exactly why Step 1 had to happen before Step 3.

## Step 3 — Detect and merge the existing duplicates

With the rule fixed, it's time to deal with the backlog. Running duplicate detection against `cmdb_ci_server` surfaces the likely-duplicate pairs — the serial-number-or-UUID match the new rule would have caught the first time. Each flagged pair gets reviewed by hand to confirm it's a genuine match (a VM's old `TEMP-BUILD-04` record and its new `WEB-PROD-17` record, for instance), and confirmed pairs are merged — never deleted — so that any Incident history, Change records, and relationships already attached to either record end up consolidated on the single surviving CI.

## Step 4 — Assign accountable ownership

The rule is fixed and the backlog is cleared, but Lesson 21 covered why that alone doesn't keep it fixed. The last step is naming a specific, accountable owner — in this case, a named lead on the Infrastructure Team — as the CI-class data owner for `cmdb_ci_server`, responsible for checking the duplicate-rate score on a quarterly cadence and catching the next version of this problem long before it reaches 40%.

## Key terms

| Term | Meaning |
|---|---|
| Root-cause diagnosis | Tracing a dashboard score problem to the rule or process that's actually producing it |
| Instance UUID | A hypervisor-assigned identifier for a VM that survives a hostname rename |
| Detect-review-merge loop | The cleanup sequence from Lesson 20, applied here to an existing duplicate backlog |
| CI-class data owner | The named, accountable role from Lesson 21, assigned at the end of this scenario |

## Check yourself

Before Chapter 6, make sure you can explain, without looking: why did fixing the Identification Rule in Step 2 have to happen before running duplicate detection in Step 3, rather than the other way around?
