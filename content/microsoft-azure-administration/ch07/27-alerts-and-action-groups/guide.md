# Lesson 27 — Alerts and Action Groups

**Chapter 7 · Monitoring & Cost Management · Lesson 27 of 32**

## What you'll learn

- Why an alert rule is really two things glued together: a condition and an action
- How to read a real alert condition like "CPU > 80% for 5 minutes"
- What an Action Group is, and why it's built as a reusable, separate object
- A concrete example connecting an alert rule to an Action Group end to end

## An alert rule: condition plus action

Lessons 25 and 26 covered watching data — metrics and logs you have to go look at.
An **alert rule** flips that around: it watches on your behalf and does something the
moment a condition is true. Every alert rule is built from the same two halves: a
**condition** (what to watch for) and an **action** (what happens when it's true).
Everything else — scope, severity, evaluation frequency — just fills in the details
around those two halves.

## Reading a real condition

A condition names a **signal** (a metric or a log query), a **threshold**, and how
often it's checked. The classic example:

```
Signal: Percentage CPU
Operator: Greater than
Threshold: 80
Aggregation: Average
Evaluation frequency: every 1 minute, over the last 5 minutes
```

In plain language: "check the average CPU every minute, and if it's been over 80% for
the last 5 minutes, fire." That 5-minute window matters — without it, a single 2-second
CPU spike that's completely normal would fire the alert, which is exactly the kind of
noisy, useless alerting this evaluation window exists to prevent.

## Action Groups: reusable, not rebuilt every time

An **Action Group** is a separate, reusable object that defines what happens when any
alert fires: send an email, send an SMS or a push notification, call a webhook, trigger
an Azure Function, run a Logic App, or kick off an automation runbook. It's defined
once and then attached to as many alert rules as you want — the CPU alert on one VM,
a disk-space alert on another, a budget alert from Lesson 28 could all point at the
same Action Group, so the whole team gets notified the same way no matter which
condition tripped.

## Putting it together: scope, condition, action, severity

A complete alert rule has four parts: a **scope** (which resource or resources it
watches), the **condition** from above, an **Action Group** to run, and a **severity**
(Sev 0, the most critical, through Sev 4, the least). Severity doesn't change what
fires — it just helps whoever's on call triage a flood of alerts by how serious each
one actually is.

## Example: CPU alert triggers a response

A VM's CPU alert rule — condition: average CPU over 80% for 5 minutes, scope: that one
VM — fires. Its attached Action Group does two things at once: sends an email to the
infrastructure team, and calls an Azure Function that automatically resizes the VM to
the next tier up. No one had to be watching Metrics Explorer when it happened; the
alert rule was watching instead.

## Key terms

| Term | Meaning |
|---|---|
| Alert rule | A condition paired with an action — what to watch for, and what to do when it's true |
| Condition | A signal, threshold, and evaluation frequency, e.g. "CPU > 80% for 5 minutes" |
| Action Group | A reusable set of actions (email, SMS, webhook, function, runbook) attached to one or more alert rules |
| Severity | A Sev 0–4 rating on an alert rule, used to triage which fired alert matters most |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why is an Action
Group built as its own separate, reusable object instead of being configured
individually inside every alert rule?
