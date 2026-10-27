# Lesson 13 — Testing a Failover

**Chapter 4 · High Availability & Disaster Recovery · Lesson 13 of 26**

## What you'll learn

- Why a failover group that's never been tested is still just a theory
- The real PowerShell command that triggers a manual failover test
- What actually happens, step by step, during the test
- What to watch for, and what counts as a real pass or fail

## A failover group nobody has tested is still a theory

Lesson 12 built a real failover group. But a mechanism that's configured and a mechanism that's
*proven to work* are two different things — and the gap between them is exactly where Overlook's
board-level mandate from Lesson 1 would fail if left unaddressed. A DR plan nobody has ever actually
triggered is a plan on paper, not a tested capability. This lesson runs that test deliberately, on
Overlook's own terms, before Chapter 7's unannounced drill does it under pressure.

## Triggering a manual failover

```powershell
Switch-AzSqlDatabaseFailoverGroup `
  -ResourceGroupName "OverlookRG" `
  -ServerName "overlook-sql-prod-west" `
  -FailoverGroupName "overlook-fg"
```

Notice the server name: the failover is triggered **from the secondary server**, not the primary —
that's the real syntax, and it reflects what's actually happening: you're telling the secondary
"become the new primary now," not telling the primary to step down.

## What actually happens, step by step

1. **The secondary stops accepting replicated changes from the (soon-to-be-former) primary** and
   finishes applying anything already in flight.
2. **The secondary is promoted to primary.** `OverlookDB` on `overlook-sql-prod-west` becomes
   writable.
3. **The listener endpoint — `overlook-fg.database.windows.net` — is repointed** to the new
   primary. This is the step that makes the failover group worth building: the application doesn't
   need to be told anything.
4. **The old primary becomes the new secondary**, once it's reachable again, and begins replicating
   from the new primary in the reverse direction.

## What to actually watch during the test

- **How long the application was actually unreachable** — this is the real-world measurement
  against Lesson 11's 1-hour RTO target, not a theoretical number.
- **Whether any in-flight writes were lost**, and how many — the real-world measurement against the
  5-minute RPO target.
- **Whether the application reconnected on its own** once the listener endpoint repointed, with no
  manual connection-string change — if it didn't, that's a gap in the *application's* retry logic,
  not the failover group itself.
- **Confirming data on the new primary matches what was expected** — querying a few known rows
  after failover completes, not just trusting that the failover command returned successfully.

## What a real pass actually looks like

A passing test isn't just "the command didn't error." It's: the application reconnected within a
reasonable window, the data on the new primary is correct and current within the RPO target, and
the whole event could be reconstructed afterward from logs — which is exactly what Lesson 9's
auditing and this chapter's monitoring make possible.

## Key terms

| Term | Meaning |
|---|---|
| `Switch-AzSqlDatabaseFailoverGroup` | The PowerShell cmdlet that triggers a manual failover, run against the secondary server |
| Promoted primary | The secondary server, once a failover makes it the new primary |
| Real-world RPO/RTO measurement | The actual observed data loss and downtime during a test, compared against the planned targets |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why is `Switch-AzSqlDatabaseFailoverGroup`
run against the secondary server's name, and what four things should actually be checked during a
failover test beyond "did the command succeed"?
