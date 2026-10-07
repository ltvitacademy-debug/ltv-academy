# Runbooks & Automation

An incident at 3am is the worst possible time to figure out, from scratch, how to fix something. A **runbook** is what the on-call engineer opens instead of improvising — a written, specific set of steps for a known problem. This lesson covers how to structure a runbook well, and where automation should (and shouldn't) take the human out of the loop entirely.

## What you'll learn

- The four parts every good runbook needs: trigger, diagnosis, remediation, escalation
- Why a vague runbook is barely better than no runbook at all
- The difference between auto-remediation and ChatOps, and when each fits
- How Northbridge would turn last lesson's connection-pool incident into a runbook

## The four parts of a runbook

A runbook earns its place in an alert's description only if it's specific enough to actually follow under stress. Every good one has four parts:

1. **Trigger condition** — exactly which alert or symptom this runbook is for. Not "checkout is slow" but "Checkout Latency P99 alert fires."
2. **Diagnostic steps** — the specific dashboards, queries, or commands to run, in order, to confirm what's happening. Link the actual dashboard, write the actual PromQL or KQL query — don't make the responder reconstruct it from memory at 3am.
3. **Remediation steps** — the specific action to take once diagnosis confirms the cause, including the exact command or UI path, and what "it worked" looks like.
4. **Escalation path** — who to page and when, if the remediation steps don't resolve it or the diagnosis doesn't match any known cause.

A runbook that says "check if the database is the problem, and fix it if so" is not a runbook — it's a to-do list item disguised as one. The test of a good runbook: could a competent engineer unfamiliar with this specific service follow it successfully at 3am? If not, it needs more specificity, not more prose.

## A runbook skeleton

```
Trigger: CheckoutLatencyP99 alert fires (>2s for 5 min)

Diagnose:
  1. Open Checkout Service dashboard
  2. Check golden signals: is error rate also up?
  3. Check inventory-service DB pool: utilization & wait queue

Remediate:
  - If pool saturated: increase pool size (see runbook-db-pool.md)
  - If deploy <1hr old: roll back via `kubectl rollout undo`

Escalate:
  - No cause found in 15 min -> page secondary on-call
  - Customer-facing impact confirmed -> notify IC, update status page
```

## Where automation fits

Not every remediation step needs a human to execute it. Two patterns are common:

- **Auto-remediation** — the system detects the condition and takes the fix automatically, no human in the loop. Good for well-understood, low-risk, reversible actions: restarting a crashed pod, scaling out when queue depth crosses a threshold, failing over to a healthy replica. Risky for anything with side effects that are hard to undo.
- **ChatOps** — remediation commands are run from a chat tool (a Slack bot, for example) rather than a terminal, so the action, who ran it, and the result are all visible to everyone in the incident channel at once. This keeps a human in the loop for judgment calls while removing the friction of context-switching to a different tool mid-incident.

The connection-pool fix from the troubleshooting-methodology lesson is a good candidate for a ChatOps command (`/incident scale-pool inventory-db 50`) rather than full auto-remediation — pool sizing has downstream cost and risk implications a human should approve, but the mechanics of running it shouldn't require switching tools mid-incident.

## Key terms

- **Runbook** — a specific, written procedure for responding to a known trigger condition
- **Trigger condition** — the exact alert or symptom a runbook applies to
- **Auto-remediation** — the system fixes a known condition automatically, no human approval
- **ChatOps** — running remediation commands from a chat tool so the whole team sees the action and result
