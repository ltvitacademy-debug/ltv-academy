# Incident Documentation

This closes out the chapter, and it's the step most teams under-invest in: once an incident is
resolved and everyone can go back to their evening, what actually gets written down about it —
and how — determines whether the same incident happens again in six months.

## What you'll learn

- What a blameless postmortem is, and why blame actively works against learning
- How to reconstruct an incident timeline usefully, not just narratively
- The real difference between a root cause and a contributing factor
- What makes an action item actually prevent recurrence, versus just feeling productive

## The blameless postmortem

A **postmortem** — a written record of what happened, why, and what's changing as a result — is
only useful if people are honest in it, and people are only honest when they're not worried about
being blamed. A **blameless postmortem** treats the incident as a system failure to understand,
not a person to punish: the DBA who left a transaction open for six hours made a human mistake
that better tooling, better alerting, or a better process should have caught sooner — the fix is
almost never "that person should be more careful," because "be more careful" isn't a real
safeguard. Postmortems that assign blame teach people to hide mistakes and omit details next
time, which is the opposite of what the document is for.

## Reconstructing the timeline

A useful incident timeline isn't a narrative essay — it's a sequence of timestamped, factual
events: when the deployment went out, when the alert fired, when the on-call DBA acknowledged
it, when the runaway session was identified, when it was killed, when service was confirmed
stable. Pulling this from actual sources — alert timestamps, `sys.dm_exec_sessions` login times,
chat logs from the incident channel — rather than from memory afterward, matters because memory
compresses and reorders events under stress. The timeline is what everything else in the
postmortem gets built on.

## Root cause versus contributing factors

It's tempting to write down a single root cause and move on, but most real incidents have a root
cause *and* several contributing factors that made it worse or let it go undetected longer. If a
deployment altered a stored procedure and a stale statistic caused a bad plan, the immediate
trigger might be the stale statistic — but "why did nobody notice for four hours" might be a
contributing factor like "no alert exists for this condition." Both deserve honest documentation,
because fixing only the root cause and ignoring the contributing factors ("we'll add an alert
next time") often prevents a *repeat* far more effectively than the root-cause fix alone.

## Action items that actually prevent recurrence

The weakest kind of action item is vague and unowned — "be more careful with deployments" fixes
nothing, because it isn't checkable and nothing changes about the system. A real action item is
specific, assigned, and changes something structural: "add a pre-deployment statistics update
step to the deployment checklist," "add an alert on `log_reuse_wait_desc = 'ACTIVE_TRANSACTION'`
for longer than 30 minutes," "add this scenario to the on-call runbook." The test for a good
action item is whether, if it had existed before this incident, the incident either wouldn't have
happened or would have been caught and stabilized much faster.

## Key terms

| Term | Meaning |
|---|---|
| Postmortem | A written record of an incident: what happened, why, and what's changing as a result |
| Blameless | An approach treating an incident as a system failure to fix, not a person to blame |
| Root cause | The underlying trigger of an incident |
| Contributing factor | A condition that worsened an incident or delayed detection, alongside the root cause |

## Check yourself

A postmortem's only action item is "the on-call DBA should double-check their work more
carefully." Is that a strong action item by this lesson's standard? What would make it stronger?
