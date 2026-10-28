# Lesson 26 — Triggering a Playbook from an Incident

**Chapter 7 · Automation with Playbooks · Lesson 26 of 32**

## What you'll learn

- Why a playbook never decides on its own when to run — that job belongs to a separate piece, the automation rule
- The two real trigger types an automation rule can fire on: incident created and incident updated
- How conditions narrow an automation rule so it only fires on the incidents you actually mean
- How a rule and a playbook divide the work: rule decides *when*, playbook decides *what happens*

## The missing piece: who decides when to run?

Lesson 25 covered what a playbook is — a real Azure Logic App, with a Microsoft Sentinel connector trigger that starts a run when an incident is created or updated. But that raises an obvious question: out of every incident Sentinel ever creates, which ones actually reach that trigger? The answer isn't "all of them" and it isn't buried inside the playbook itself. It's a separate Sentinel object called an **automation rule**, and its entire job is deciding *when* a playbook — or any other automated action — actually runs.

## Automation rule trigger types

An automation rule fires on one of two real trigger types:

- **When incident is created** — fires once, at the moment Sentinel creates a new incident.
- **When incident is updated** — fires every time an existing incident changes (severity escalates, a new alert gets added, status changes), so a rule can react mid-investigation, not just at the start.

Most automation rules use "when incident is created," since that's the natural moment to kick off a first response. "When incident is updated" exists for the cases where you specifically want to react to something changing after the fact — for example, running a different playbook the moment an incident's severity gets manually escalated to High.

## Conditions: narrowing the rule

A trigger alone would fire on *every* incident, which is rarely what you want. Automation rules let you add **conditions** — if/then logic evaluated against the incident's properties — so the rule only fires on the subset you mean. A condition might check:

- Severity (e.g., only High or Medium)
- Title or analytics rule name (e.g., only incidents from a specific detection)
- Tags, entities, or the data connector the incident originated from

Put a trigger and a condition together and you get a sentence like: "When an incident is created, **and** its severity is High, run Playbook X." That sentence is the automation rule in full — the trigger says when to evaluate, the condition says which ones qualify, and the action (covered next) says what to do about the ones that pass.

## Rule decides when, playbook decides what

This is the division of labor that makes the whole system composable instead of a tangle of special cases: the **automation rule is the trigger condition**, and the **playbook is the actual workflow**. One automation rule can run a playbook, tag an incident, assign an owner, or change its status — a playbook is only one of several actions a rule can take, and a rule can chain more than one of them. Keeping "when" and "what" as two separate objects means you can point the same playbook at several different automation rules (one for phishing incidents, one for brute-force incidents) without rebuilding the workflow each time — you just write a new rule with a new condition that happens to call the same playbook.

## Key terms

| Term | Meaning |
|---|---|
| Automation rule | The Sentinel object that decides when an action (like running a playbook) happens |
| Trigger (rule) | "When incident is created" or "when incident is updated" — the moment a rule evaluates |
| Condition | If/then logic on an incident's properties (severity, title, tags) that narrows which incidents qualify |
| Action (rule) | What the rule does once its conditions pass — run a playbook, tag, assign, or change status |

## Check yourself

You're ready for Lesson 27 when you can explain, in one sentence each: what does the automation rule decide, and what does the playbook decide — and why does keeping those two decisions separate let you reuse one playbook across several different rules?
