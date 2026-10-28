# Lesson 26 — Playbooks: Automating the Repeatable Steps

**Chapter 7 · SOAR & Automation Basics · Lesson 26 of 32**

## What you'll learn

- What a playbook actually is: a defined, automated sequence of steps triggered by a specific alert type
- How a real playbook reads from start to finish, using a phishing report as the running example
- Why playbooks work best for well-understood, repeatable scenarios, and fall apart for novel incidents
- What has to be true about a scenario before it's a good candidate to turn into a playbook at all

## A playbook, defined

A **playbook** is a defined, automated sequence of steps that runs whenever a specific type of alert comes in. It's the concrete thing SOAR's automation actually consists of — not automation in the abstract, but a written-out, repeatable recipe: when this trigger happens, do this step, then this step, then this one, branching based on what each step finds. If Lesson 25 was about what SOAR can do in general, a playbook is where one specific version of that gets built and run.

## A real example: the phishing-report playbook

The clearest way to see this is a scenario every SOC deals with constantly: a user forwards a suspicious email to the security team. A phishing-report playbook might run like this —

```
TRIGGER: user-reported phishing email received

1. Extract the sender address and any URLs/attachments from the email
2. Check the sender address and URLs against threat intel feeds
3. IF confirmed malicious:
     - Auto-quarantine the email from every inbox it reached, not just the reporter's
     - Notify the user who reported it that action was taken
4. IF not confirmed malicious (or intel is inconclusive):
     - Route the email to an analyst for manual review
     - Notify the user it's being looked into
```

Every one of those steps is something an analyst could do by hand — and before SOAR, that's exactly what happened, every single time a phishing report came in. The playbook doesn't invent a new capability; it just runs the same decision tree automatically, in seconds, instead of an analyst repeating it manually for the fortieth time this week.

## Why playbooks need well-understood, repeatable scenarios

A playbook only works because every branch of its decision tree was already known in advance. "If the URL is confirmed malicious, quarantine the email" is a safe automated action specifically because a human already decided, ahead of time, that this is the correct response to that exact condition. That's the real requirement for turning any scenario into a playbook: it has to be **repeatable** (it happens often enough to be worth automating) and **well-understood** (every reasonable outcome and the correct response to it is already known).

## Why playbooks fall apart on novel incidents

A genuinely novel incident — an attack pattern nobody on the team has seen before, an alert that doesn't cleanly match any known category, a situation where the "right" response depends on business context a tool can't know — has none of that. There's no pre-agreed decision tree to follow, because nobody has been in exactly this situation before. Forcing a playbook onto a scenario like that doesn't save time; it risks the platform taking a confident, fully automated wrong action on a situation it was never actually built to handle. That's why playbooks are deliberately scoped to the repeatable, well-understood slice of the workload — phishing reports, known malware signatures, routine access requests — and why novel investigation stays a human analyst's job, which is exactly where Lesson 27 picks up.

## Key terms

| Term | Meaning |
|---|---|
| Playbook | A defined, automated sequence of steps that runs whenever a specific alert type triggers it |
| Trigger | The specific alert type or condition that starts a playbook running |
| Enrichment | Gathering extra context on an indicator (like checking a URL against threat intel) before deciding what to do |
| Decision branch | A point in a playbook where the next step depends on what an earlier step found |

## Check yourself

You're ready for Lesson 27 when you can explain: what two conditions does a scenario need to meet before it's a good candidate for a playbook, and why does a genuinely novel incident fail both of them?
