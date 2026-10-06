# Lesson 23 — Alerting on Anomalous On-Chain Activity

**Chapter 5 · Monitoring & Incident Response · Lesson 23 of 29**

## What you'll learn

- Why alerting is monitoring that comes to you, instead of monitoring you have to go check
- What a real alert trigger type menu looks like, and why "anomalous" has to be defined precisely
- What belongs in a useful alert notification so it's actionable on arrival
- How to calibrate an alert so it's neither too broad to matter nor too narrow to ever fire

## Monitoring that comes to you

Lesson 22 covered what to watch: utilization, TVL trend, transaction pattern, price deviation. Watching a dashboard works as long as someone is actually looking at it, at the right moment. Alerting removes that dependency -- a condition is defined once, evaluated continuously, and fires automatically the instant it's true, regardless of whether anyone happened to be looking at a screen.

## Defining "anomalous" precisely

![Tenderly's alert creation flow, showing twelve distinct trigger types: Successful Transaction, Failed Transaction, Function Call, Event Emitted, Event Parameter, ERC20 Token Transfer, Allowlisted Callers, Blocklisted Callers, Balance Change, Transaction Value, State Change, and View Function.](/courses/blockchain-testing-devops/ch05/23-alerting-on-anomalous-on-chain-activity/alert-trigger-types.jpg)

"Alert me if something anomalous happens" isn't a condition a system can evaluate -- it has to be broken into specific, checkable triggers. A real alerting platform's menu makes that concrete: a transaction failing, a specific function being called, an address outside an allowlist calling a contract, a transaction value crossing a threshold. Picking the right trigger type is the actual design work of this lesson.

## Every active rule, in one place

![Tenderly's Alerting dashboard, listing every currently active and disabled alert rule with its type and status.](/courses/blockchain-testing-devops/ch05/23-alerting-on-anomalous-on-chain-activity/alerting-rules-dashboard.jpg)

Rules that live in someone's personal script, run manually when they remember, aren't really monitoring -- they're a habit that stops the day that person is busy or leaves. A dashboard listing every active rule, visible to the whole team, means the question "are we watching for X?" has an answer anyone can check, not just the person who set it up.

## What lands when it fires

![A real Tenderly alert email notification, showing the alert name, timestamp, transaction hash, network, and a direct link back to the dashboard.](/courses/blockchain-testing-devops/ch05/23-alerting-on-anomalous-on-chain-activity/alert-email-notification.jpg)

An alert's usefulness lives or dies on what it actually tells the person who receives it. This notification has the transaction hash, the network, and a direct link back into the dashboard -- everything needed to start investigating immediately, rather than a bare "something happened on Contract X" that sends someone hunting for context from scratch.

## Calibrating the threshold

- **Too broad** -- an alert that fires on routine activity trains the team to ignore it within a week. A muted alert channel is worse than no alert at all.
- **Too narrow** -- an alert scoped to one exact transaction or one specific address never fires again, and catches nothing it wasn't already looking for.
- **Calibrated** -- a named condition tied directly to Lesson 22's numbers: utilization crossing 90%, a single transfer over a meaningful dollar threshold, a function call from an address that isn't on the expected list.

## Key terms

| Term | Meaning |
|---|---|
| Trigger type | A specific, checkable on-chain condition (failed tx, function call, allowlist violation, etc.) an alert watches for |
| Alert fatigue | The tendency for a team to start ignoring alerts once too many of them fire on routine, non-actionable activity |
| Alert destination | Where a fired alert's notification is actually sent -- email, Slack, PagerDuty, a webhook |

## Check yourself

You're ready for Lesson 24 when you can explain: why would an alert scoped to "something anomalous happened" fail in practice, and what three pieces of information does a useful alert notification need to be immediately actionable?
