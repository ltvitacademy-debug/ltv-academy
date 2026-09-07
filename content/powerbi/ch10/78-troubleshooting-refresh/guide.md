# Lesson 78 — Troubleshooting Refresh Problems

**Chapter 10 · Refresh & Gateways · Lesson 4 of 4**

## What you'll learn

- Where to check first, before diagnosing anything else
- The four-failures rule that silently disables your schedule
- Common causes: `GatewayNotReachable`, expired credentials, size limits
- How to read refresh history and turn off failure emails

## Two things to verify before anything else

Before troubleshooting a specific error, the official guidance says to
confirm two basics every time:

1. **The gateway version is up to date.** An outdated gateway is
   behind a surprising number of otherwise-confusing failures.
2. **The report has a gateway selected at all.** If none is selected,
   the underlying data source may have changed, or gone missing
   entirely.

## Reading refresh history

Every refresh attempt — successful or not — is logged with its status,
duration, and any error message:

![Screenshot of refresh history showing a completed synchronization cycle.](/courses/power-bi/ch10/78-troubleshooting-refresh/refresh-history.png)
*Start here for any refresh problem — the error message usually points straight at the fix.*

## The four-failures rule

If a scheduled refresh fails **four times in a row**, Power BI
automatically disables it — no warning beyond the failure emails
themselves. To re-enable it: fix the underlying issue (often expired
credentials), then go back to **Schedule refresh** and flip the toggle
back **On**.

## Common failure causes

| Symptom | Likely cause | Fix |
|---|---|---|
| `GatewayNotReachable` when setting credentials | An outdated gateway | Install the latest gateway version and retry |
| Refresh fails, dashboard doesn't update | Normal delay | Wait 10-15 minutes; if it still doesn't show, repin the visual |
| "Processing Error: Type Mismatch" | A problem in your M script, or an outdated Desktop version | Fix the Power Query step in Desktop, update Desktop, republish |
| Refresh times out | Semantic model too large/complex for shared capacity's 2-hour limit (5 hours on Premium) | Reduce model size/complexity, or move to Premium/Fabric capacity |
| Refresh exceeds size limits | Shared capacity caps semantic models at 1 GB and 10 GB of uncompressed data during processing | Reduce imported data volume, or move to Premium (no such cap) |

## Turning off failure-notification emails

If you're getting refresh-failure emails you no longer want (perhaps
you're not the right owner anymore), an admin removes your email from
the relevant semantic model's settings:

![Screenshot of the semantic model settings section for changing refresh email notifications.](/courses/power-bi/ch10/78-troubleshooting-refresh/refresh-email.png)
*This is an admin action on the semantic model, not a personal email-client setting.*

## Why this closes the chapter

Refresh and gateways are the plumbing behind everything you've built:
without a working schedule, your `AdventureWorksDW2014` dashboards
quietly go stale, and nobody notices until someone asks why last
month's numbers look wrong. Chapter 11 shifts from *keeping data
current* to *controlling who sees which rows of it* — Row-Level
Security.

## Key terms

| Term | Meaning |
|---|---|
| Refresh history | The log of every refresh attempt, its status, duration, and error |
| Four-failures rule | Power BI auto-disables a schedule after four consecutive failures |
| `GatewayNotReachable` | An error usually caused by an outdated gateway version |

## Lab

1. Open **Refresh history** for your `AdventureWorksDW2014` semantic
   model and review the status of every refresh you've triggered so
   far this chapter.
2. If you see any failures, match the error message against the table
   above and identify the likely fix — even if you don't need to apply
   it right now.
3. Confirm your gateway (Lesson 76) is running the latest available
   version, since an outdated one is the single most common root
   cause on this list.

## Check yourself

Chapter 10 is complete when you can explain what happens automatically
after four consecutive scheduled-refresh failures, and the two steps
required to bring the schedule back.
