# Script — Capstone: Add Monitoring & Alerting

## Segment 1 (title)

The automation suite and the pipeline both cut manual work, but neither tells Priya something is wrong the moment it happens. This lesson applies Chapter 6's alerting patterns to one real scenario: transaction log growth during Meridian's nightly catalog import.

## Segment 2 (code: detecting the real condition)

DBCC SQLPERF(LOGSPACE) is the real, built-in SQL Server command for checking transaction log usage, and Invoke-DbaQuery runs it directly. The nightly batch job routinely pushed log usage past 70% for a few minutes before clearing on its own — which used to page Priya's phone for nothing.

## Segment 3 (code: Send-MeridianAlert, routed by severity)

Send-MeridianAlert, the helper every script in this capstone already calls, is where the actual routing happens — Info and Warning post to a Teams channel through a webhook, and only Critical goes to the on-call paging service that rings Priya's phone.

## Segment 4 (steps: tuning it to stop paging for nothing)

Two changes fixed the false pages: requiring the condition to persist across several consecutive checks instead of firing on one sample, and routing by severity so only a sustained, genuinely critical condition reaches a phone. Nightly false pages dropped to roughly one real page every couple of weeks.

## Segment 5 (outro)

Next up: turning this entire build — the automation suite, the pipeline, and the tuned monitoring — into a story worth telling in an interview or to a manager.
