# Lesson 27 — A Real Automation Rule Plus Playbook Example

**Chapter 7 · Automation with Playbooks · Lesson 27 of 32**

## What you'll learn

- A complete, concrete walk-through combining an automation rule and a playbook on one real scenario
- How a phishing-report incident moves from creation through notification without an analyst touching it first
- Why the automation rule's condition is what keeps this pairing scoped to exactly the incidents it's meant for
- How to describe what each piece — rule and playbook — is doing at every step, in plain language

## The scenario: a user-reported phishing email

Chapter 6 covered incident investigation in general; this lesson puts automation on top of one specific, common incident: a user forwards a suspicious email, a data connector and analytics rule turn that into a Sentinel incident, and from there the automation runs without a human needing to start it.

## Step 1 — the incident is created

A phishing-report analytics rule (the kind covered back in Chapter 3) fires and Sentinel creates a new incident: title "Phishing Email Reported — Suspicious Link," severity Medium, with the reporting user and the email's sender as mapped entities. This is the moment every automation rule watching for "incident created" gets a chance to evaluate it.

## Step 2 — the automation rule evaluates

An automation rule named "Auto-notify SOC on phishing reports" is set to trigger on **incident created**, with a condition checking that the incident's analytics rule name matches the phishing-report detection. This incident matches, so the rule's action fires: **run playbook "Notify-SOC-Teams."** If this had been a different incident — a brute-force login alert, say — the condition would fail and nothing downstream would run; that's the condition doing its scoping job exactly as Lesson 26 described.

## Step 3 — the playbook runs

The playbook itself is the Azure Logic App from Lesson 25. Its Microsoft Sentinel connector trigger receives the incident, and its actions run in sequence:

```
ACTION 1 (Microsoft Sentinel): Get incident details
  → pulls the reporting user, sender address, and any extracted URLs

ACTION 2 (Microsoft Teams): Post a message to the #soc-alerts channel
  → "Phishing report incident created: [incident link]. Sender: [address]."

ACTION 3 (Microsoft Sentinel): Add a tag to the incident
  → tags it "auto-notified" so anyone opening it later knows this step ran
```

## Step 4 — what's still a human's job

Notice what this example deliberately does *not* do: it doesn't auto-close the incident, and it doesn't take any action against the sender or the email itself. It only notifies and tags — it gets a human looking at the right incident faster, but it doesn't decide the email is malicious or take a response action on that judgment. That restraint isn't an accident; it's exactly the design question Lesson 28 covers next — which actions are safe to fully automate, and which ones should keep a human in the loop.

## Key terms

| Term | Meaning |
|---|---|
| Phishing-report incident | A Sentinel incident created from a user-reported suspicious email, via a data connector and analytics rule |
| Rule condition (worked example) | Matches on the incident's analytics rule name, so only phishing-detection incidents trigger this specific playbook |
| Notification action | An action that informs a human (e.g., posting to Teams) without taking a response action itself |
| Tagging | Marking an incident so its automated history is visible to anyone who opens it later |

## Check yourself

You're ready for Lesson 28 when you can walk through this example end to end, from memory: what creates the incident, what the automation rule's condition checks, and exactly what the playbook's three actions do — in that order.
