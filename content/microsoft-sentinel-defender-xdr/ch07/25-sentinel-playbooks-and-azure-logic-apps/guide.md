# Lesson 25 — Sentinel Playbooks and Azure Logic Apps

**Chapter 7 · Automation with Playbooks · Lesson 25 of 32**

## What you'll learn

- Why Sentinel doesn't have its own separate automation engine — a playbook is a real Azure Logic App, full stop
- The three building blocks every Logic App is made of: triggers, connectors, and actions
- Which connector lets a Logic App talk to Sentinel specifically, and what it exposes
- How to read a simple playbook's shape even before you've opened the Logic Apps designer

## A playbook is a real Azure Logic App

The prior course in this path defined a playbook in the abstract: a defined, automated sequence of steps that runs whenever a specific alert type fires. Sentinel's implementation of that idea isn't a Sentinel-specific feature at all — **a Sentinel playbook is a real Azure Logic App**, created and run inside the separate Azure Logic Apps service, with a connector that lets it read from and act on Sentinel. Sentinel doesn't build or host its own workflow engine; it triggers a workflow that Logic Apps already knows how to run. That matters practically: everything you already know about Logic Apps — its visual designer, its run history, its pricing per execution — applies directly to Sentinel playbooks, because it's the same product.

## Logic Apps: triggers, connectors, actions

**Azure Logic Apps** is Azure's visual, low-code workflow automation service. You build a workflow in a drag-and-drop designer instead of writing orchestration code, and every workflow is made of the same three pieces:

- **Trigger** — the event that starts the workflow. Exactly one per workflow, and it's always first.
- **Connectors** — pre-built integrations to other systems (Microsoft Sentinel, Microsoft Teams, Office 365 Outlook, Microsoft Entra ID, Defender for Endpoint, and hundreds more) that expose that system's triggers and actions to the designer.
- **Actions** — the steps that run after the trigger fires: send a message, call an API, update a record, branch on a condition.

A workflow reads top to bottom: trigger fires, then each action runs in sequence (or in parallel branches), with the output of one action available as an input to the next.

## The Microsoft Sentinel connector

Logic Apps can integrate with almost anything because of its connector library, and Sentinel's piece of that library is the **Microsoft Sentinel connector**. It exposes a trigger built specifically for this scenario — a Logic App that starts "when a Microsoft Sentinel incident is created or updated" — plus actions such as adding a comment to an incident, changing its severity or status, or adding a tag. A playbook's trigger is almost always this Sentinel connector trigger; everything downstream of it can call on any other connector the designer has access to, which is how a single playbook ends up touching Teams, Outlook, and Entra ID in one run.

## Reading a playbook's shape

```
TRIGGER (Microsoft Sentinel connector):
  When a Sentinel incident is created or updated

ACTION 1 (Microsoft Sentinel connector):
  Get incident details

ACTION 2 (Microsoft Teams connector):
  Post a message to the SOC channel

ACTION 3 (Microsoft Sentinel connector):
  Add a tag to the incident ("auto-notified")
```

Even without having opened the Logic Apps designer yet, this is readable the same way a PowerShell line is readable once you know Verb-Noun: one trigger, then a numbered sequence of actions, each naming the connector it's calling. That's the entire mental model this chapter builds on — Lesson 26 covers how an incident actually reaches this trigger in the first place, through a separate piece called an automation rule.

## Key terms

| Term | Meaning |
|---|---|
| Azure Logic Apps | Azure's visual, low-code workflow automation service — the real product Sentinel playbooks run on |
| Playbook | A Sentinel-triggered Azure Logic App — the workflow itself, built in the Logic Apps designer |
| Trigger | The single event that starts a Logic App workflow running |
| Connector | A pre-built integration (Microsoft Sentinel, Teams, Outlook, Entra ID, etc.) exposing triggers/actions to a workflow |
| Action | A single step in a workflow that runs after the trigger fires |

## Check yourself

You're ready for Lesson 26 when you can explain: why does calling a Sentinel playbook "a real Azure Logic App" matter more than it sounds — what does that fact tell you about where you'd go to build, edit, or check the run history of one?
