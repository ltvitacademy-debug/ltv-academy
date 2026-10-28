# Lesson 28 — When to Automate vs. When to Keep a Human in the Loop

**Chapter 7 · Automation with Playbooks · Lesson 28 of 32**

## What you'll learn

- The real principle that decides whether a playbook action should run fully automated or wait for approval
- Which categories of action are low-risk enough to automate with confidence
- Which categories of action are high-impact or ambiguous enough that they should keep a human in the loop
- How this same principle, taught generically for SOAR in the prior course, applies specifically to Sentinel playbook design

## The principle: confidence and impact, not convenience

The prior course's SOAR chapter established this generically: a playbook only works safely when every branch of its decision tree was already known in advance, because a human already decided ahead of time that the automated response is correct for that exact condition. Sentinel playbook design applies that same principle with one more practical dimension added — **impact**. A scenario can be well-understood and still carry an action too consequential to hand fully to automation. The real question for any action inside a playbook isn't "can this be automated?" — almost anything can be scripted. It's "is this action low-risk and well-understood enough that being wrong, occasionally, costs very little?"

## Safe to automate: low-risk, well-understood, high-confidence

Some categories of action pass that test clearly:

- **Notifications** — posting to a Teams channel, sending an email, paging on-call. Being wrong costs a few seconds of someone's attention.
- **Enrichment** — pulling extra context (checking a URL against threat intel, looking up a user's manager) without changing anything. It only adds information; it can't make things worse.
- **Tagging and categorization** — labeling an incident "auto-notified" or "phishing-confirmed." Reversible, and purely organizational.

These are exactly the actions Lesson 27's worked example used — get details, notify Teams, add a tag — and that's not a coincidence. They're the textbook case for full automation precisely because a wrong outcome is cheap to undo.

## Keep a human in the loop: high-impact or ambiguous

Other categories fail that test, even when the scenario itself is common:

- **Disabling a user account** — correct for a confirmed compromised account, devastating for a legitimate user caught by a false positive who now can't work.
- **Isolating a production server or endpoint** — correct for confirmed active malware, potentially an outage-causing mistake if the detection was wrong.
- **Blocking a sender domain or IP organization-wide** — correct for confirmed malicious infrastructure, disruptive if it turns out to be a shared mail gateway.

Each of these has real, hard-to-reverse consequences if automation gets it wrong — which is why Sentinel playbook design for actions like these typically inserts an **approval step**: the playbook still does the enrichment and notification automatically, but pauses and waits for a human to approve the final, consequential action before taking it.

## Automating the easy part, approving the hard part

The practical pattern this produces isn't "automate everything" or "automate nothing" — it's splitting a playbook so automation handles the cheap, reversible, high-confidence parts, and a human approves the expensive, hard-to-reverse part. A phishing playbook can fully automate getting the URL's threat-intel verdict and notifying the SOC, then pause for a human to approve quarantining the email across every inbox, rather than doing that step unattended too.

## Key terms

| Term | Meaning |
|---|---|
| Low-risk action | An action cheap to be wrong about — notifications, enrichment, tagging — safe to fully automate |
| High-impact action | An action expensive or hard to reverse if wrong — disabling accounts, isolating servers, blocking domains |
| Approval step | A pause inserted into a playbook where a human must approve before a consequential action runs |
| Automation scope | The deliberate boundary around which actions in a playbook run unattended vs. which wait for a human |

## Check yourself

You're ready for Chapter 8 when you can sort three new actions — "send a Slack message," "revoke a user's active sessions," "look up a device's last sign-in location" — into "safe to automate" or "needs a human approval step," and explain why for each.
