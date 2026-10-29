# Lesson 19 — Validation Before Returning to Production

**Chapter 5 · Eradication & Recovery · Lesson 19 of 32**

## What you'll learn

- The four real validation checks a system has to pass before it's trusted back in production: patch confirmation, a persistence re-check, a clean vulnerability scan, and a defined monitoring window
- Why confirming a patch was *applied*, not just scheduled or pushed, is its own separate step
- Why validation has to re-check for persistence on every affected host, even ones already eradicated in Lesson 17
- Why rushing or skipping validation is one of the most common real IR mistakes, and what it actually costs when it goes wrong

## Validation is a separate phase from eradication, not a formality

Eradication (Lesson 17) and restoring a clean backup (Lesson 18) feel like the finish line —
the malware's gone, the root cause is supposedly patched, and the database is back from a
known-good backup. It's tempting to treat that as "done" and bring the system back online
immediately. Real IR practice treats it as one phase short of done. Validation is the
checkpoint between cleanup and production, and it exists because eradication can be incomplete
in ways that don't show up until the system is live again — which is exactly the worst time to
discover it.

## Four checks, not a gut feeling

Meridian's SOC runs four specific checks on the Remote Desktop Gateway and billing database
server before either goes back into production, and none of them is "it looks fine now."
First, **patch confirmation**: the team verifies the security update is actually installed —
not scheduled, not pushed to a deployment queue, but confirmed present on the running system,
since a failed or pending patch install looks identical to a successful one from the outside.
Second, **a persistence re-check**: the same `Get-ScheduledTask`, `Get-LocalUser`, and registry
checks from Lesson 17 run again, on every host in scope, because eradication work done under
time pressure is exactly the kind of work worth re-verifying rather than trusting on the first
pass. Third, **a clean vulnerability scan**: an authenticated scan against the specific CVE
that was exploited, confirmed to come back with zero criticals for that finding — not a general
"looks okay" scan, but one that specifically targets the exact weakness that let the attacker
in. Fourth, **a defined monitoring window**: Meridian commits to 72 hours of elevated
monitoring on both systems, with detection rules tuned to the attacker's observed behavior,
before the incident is formally closed for those hosts.

## What rushing this step actually costs

Skipping or shortcutting validation is a well-documented, common real-world IR mistake, and
it's rarely dramatic in the moment — a tight timeline, pressure to restore business operations,
or confidence that "the restore already looked clean" are all it takes. The cost shows up
later, when a system that was never actually confirmed patched gets re-exploited through the
exact same vulnerability, or a persistence mechanism that survived eradication on one host (but
was never re-checked) quietly reactivates. At that point, the organization isn't just dealing
with a second incident — it's dealing with the same incident reopening, with a response team
that believed it was already closed. The 72-hour monitoring window exists specifically to catch
that failure mode while it's still small, instead of discovering it a month later.

## Key terms

| Term | Meaning |
|---|---|
| Patch confirmation | Verifying a security update is actually installed and active on the running system, not just scheduled or pushed |
| Persistence re-check | Re-running eradication's detection steps after cleanup, on every affected host, instead of trusting the first pass |
| Targeted vulnerability scan | A scan specifically checking the exact CVE or weakness that was exploited, not a general health scan |
| Monitoring window | A defined period of elevated monitoring on recovered systems before an incident is formally closed |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why is a persistence
re-check in Lesson 19 still necessary, even though Lesson 17 already removed Meridian's
scheduled task, rogue account, and registry entry?
