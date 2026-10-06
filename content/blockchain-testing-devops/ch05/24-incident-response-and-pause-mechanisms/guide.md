# Lesson 24 — Incident Response & Pause Mechanisms

**Chapter 5 · Monitoring & Incident Response · Lesson 24 of 29**

## What you'll learn

- Why an alert firing is the start of an incident response process, not a resolution
- How an alert's full history, not just its latest firing, supports reconstructing what happened
- Why alert severity should route to different destinations, not all treated identically
- What a pause mechanism actually buys you -- and what it explicitly doesn't undo

## An alert firing is a question, not an answer

Lesson 23 ended with a notification landing in front of a human. What happens next is incident response: confirming whether this is a real incident or a false positive, deciding how urgent it actually is, and only then acting. Treating every fired alert as an automatic crisis burns a team out; treating every one as noise is how a real incident gets missed.

## Starting from the alert itself

![Tenderly's alert detail page, showing an individual alert's configuration with Disable and Trigger Test Alert actions available.](/courses/blockchain-testing-devops/ch05/24-incident-response-and-pause-mechanisms/alert-detail-disable-trigger.jpg)

The first real action usually isn't writing code -- it's looking at exactly what fired, on which contract, on which network, and deciding what it means. The same screen that shows an alert's configuration is where a team disables a rule that turns out to be noisy, or triggers a test to confirm a destination is actually working before relying on it during a real incident.

## Reconstructing the timeline

![Tenderly's alert history view, showing a full timestamped log of every alert that has fired, with transaction hash and network for each.](/courses/blockchain-testing-devops/ch05/24-incident-response-and-pause-mechanisms/alert-history.jpg)

Once the immediate response is underway, the next question is almost always "what actually happened, in what order?" A full history of every alert that fired -- not just the latest one -- is what makes that reconstruction possible. This log is the raw material Lesson 25's postmortem is built from; without it, a postmortem is just guesswork after the fact.

## Not every alert deserves the same response

![Tenderly's alert destinations list, showing routing options including Email, Slack, Discord, Webhook, and PagerDuty.](/courses/blockchain-testing-devops/ch05/24-incident-response-and-pause-mechanisms/alert-destinations-pagerduty.jpg)

A routine, low-severity check can land quietly in email. Something that needs a human actively responding right now -- a wave of suspicious withdrawals, a failed transaction pattern on a core function -- needs to reach PagerDuty or an on-call rotation, somewhere that actually wakes a person up. Routing every alert identically, regardless of severity, defeats the point of distinguishing them in the first place.

## What a pause mechanism actually buys

A pause mechanism -- a circuit breaker modifier that blocks new deposits, withdrawals, or specific functions -- doesn't fix the underlying problem. What it buys is time: the ability to stop new damage while the team actually investigates, instead of an exploit continuing to run while everyone scrambles to understand it.

Two things matter as much as the mechanism itself:

- **Who can pull it.** Chapter 3, Lesson 16 made the case for multisig-controlled deployments specifically because a single key holding that much power is itself a risk. The same logic applies to pause authority -- it shouldn't rest with one engineer's single key either.
- **What it can't undo.** A pause stops *new* activity. Funds that already moved before the pause was triggered stay moved. A pause mechanism limits ongoing damage; it is not a rollback.

## Key terms

| Term | Meaning |
|---|---|
| Incident response | The process of confirming, triaging, and acting on a fired alert -- not an automatic reaction to every notification |
| Circuit breaker / pause mechanism | A contract modifier that blocks specified functions (deposits, withdrawals) while a team investigates an incident |
| Alert routing | Sending an alert to a destination matched to its severity -- email for routine, PagerDuty for urgent |

## Check yourself

You're ready for Lesson 25 when you can explain: why does a pause mechanism buy time rather than fix a problem, and why does this lesson insist pause authority shouldn't rest with a single engineer's key?
