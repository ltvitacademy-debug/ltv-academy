# Lesson 19 — Setting Up Alerting

**Chapter 5 · Automation With PowerShell · Lesson 19 of 26**

## What you'll learn

- Why a health check and a backup test that nobody sees still leave Chapter 5's problem unsolved
- A real, simple alerting mechanism: emailing on a failed check, using `Send-MailMessage`
- How to combine Lesson 17's health check and Lesson 18's backup test into one scheduled routine
- Why this closes the "whoever happened to be on call" gap from Lesson 1, for real this time

## A silent check is still a manual process

Lessons 17 and 18 built real, working checks. But a script that runs on a schedule and prints its
result to a console nobody is watching has the exact same gap as the original problem: someone
still has to remember to go look. **Alerting** is the last piece — getting a person notified the
moment something is actually wrong, without anyone having to check manually first.

## A real, simple alerting mechanism

```powershell
function Send-OverlookAlert {
    param([string]$Subject, [string]$Body)

    Send-MailMessage `
        -From "dba-alerts@overlookmedical.com" `
        -To "oncall-dba@overlookmedical.com" `
        -SmtpServer "smtp.overlookmedical.com" `
        -Subject "Overlook DB Alert: $Subject" `
        -Body $Body
}
```

This is deliberately simple — a real alerting setup in a larger environment might use Azure Monitor
action groups or a paging service, but the underlying mechanism is the same: a failed condition
triggers a message to a specific person, automatically, with no manual check required first.

## Wiring the two checks from Lessons 17-18 into this

```powershell
$health = Test-OverlookHealth
$backup = Test-OverlookBackup

if (-not $health.OverallHealthy) {
    Send-OverlookAlert -Subject "Health check failed" `
        -Body ($health | Out-String)
}

if (-not $backup.BackupVerified) {
    Send-OverlookAlert -Subject "Backup verification failed" `
        -Body ($backup | Out-String)
}
```

Run on a schedule — a scheduled task, or a PowerShell runbook — this is the whole point of Chapter
5 realized in a few real lines: Overlook's on-call DBA finds out about a failed health check or an
unverified backup within one scheduling interval, automatically, instead of discovering it during
an actual incident.

## Why this specifically closes Lesson 1's gap

Lesson 1 named the problem precisely: "access to patient data was granted informally... by whoever
happened to be on call," and nothing ran unless a specific person remembered to run it. This lesson
is the direct technical answer: the checks run whether or not any specific person is thinking about
them, and the alert reaches whoever is actually on call — not whoever happened to build the script.

## Key terms

| Term | Meaning |
|---|---|
| Alerting | Automatically notifying a person when a check fails, without requiring a manual look first |
| `Send-MailMessage` | A simple PowerShell cmdlet for sending an email, used here as the notification mechanism |
| Scheduled routine | Running health checks, backup tests, and alerting on a recurring schedule with no manual trigger |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: how does this lesson's alerting
script specifically close the "whoever happened to be on call" gap Lesson 1 identified?
