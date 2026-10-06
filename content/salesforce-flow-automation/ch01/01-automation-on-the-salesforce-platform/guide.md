**Chapter 1 · Flow Foundations · Lesson 1 of 31**

# Automation on the Salesforce Platform

Every Salesforce org eventually needs to do something automatically: update a field, create a
related record, send a notification, kick off an approval. Salesforce has offered several
declarative (point-and-click) tools for this over the years, but as of today **Flow is the one
Salesforce actively builds, documents, and recommends** — Workflow Rules and Process Builder are
both retired for new automation, and orgs still running them are being migrated to Flow. This
course is about building real automation with Flow Builder, starting here with what Flow actually
is and where it fits.

## What you'll learn

- Why Flow replaced Workflow Rules and Process Builder as Salesforce's automation tool
- The four automation categories Salesforce itself groups flows into
- When declarative automation (Flow) is the right call, and when it isn't
- Where in Setup you go to see every automation already running in an org

## One platform, one modern automation tool

Salesforce historically shipped three separate declarative automation tools — Workflow Rules,
Process Builder, and Flow — each with its own editor and its own limitations. Maintaining logic
spread across three different tools made orgs hard to debug and hard to hand off. Salesforce
retired Workflow Rules and Process Builder for new development; every new piece of point-and-click
automation you build today, you build in **Flow Builder**. If you inherit an org that still has
live Workflow Rules or Process Builder processes, Salesforce's own migration tooling helps convert
them to flows.

## The four categories Salesforce groups automation into

When you start a new automation in Setup, Salesforce itself organizes the options into four
categories, and recognizing them now will make the rest of this chapter easier to follow:

- **Triggered** — automations launched by a record change or a platform event; they run without
  any user sitting in front of a screen
- **Scheduled** — time-based automations that run at a specific time or on a recurring frequency
- **Screen** — interface-driven automations that walk a user through a business process, collecting
  or displaying information along the way
- **Autolaunched** — automations invoked directly by something else (Apex, a REST API call, a
  button, another flow) rather than by a trigger or a schedule

Chapter 2 of this course covers each of the flow types that fall under these categories in detail:
record-triggered flows (before-save and after-save), screen flows, scheduled flows, autolaunched
flows, subflows, and platform event-triggered flows.

## When to reach for Flow (and when not to)

Flow is the right tool for most business-process automation: field updates, record creation,
approval-style logic, and guided data entry. It is not a replacement for everything — complex,
high-volume, or deeply programmatic logic is often still better served by Apex, and some
integration patterns are a better fit for Apex or middleware. A practical rule many admins use: if
you can describe the logic as "when X happens, do Y, unless Z," Flow can almost certainly do it.

## Seeing what's already automated

Every flow in an org — whatever type it is — shows up in one place: the **Flows** list in Setup.
It is worth knowing this list exists before you build anything new, so you don't duplicate
automation that's already running.

![The All Flows list view in Setup, showing each flow's process type: Autolaunched Flow or Screen Flow.](/courses/salesforce-flow-automation/ch01/01-automation-on-the-salesforce-platform/all-flows-list-process-type.png)

The same list view also shows each flow's trigger — whether it runs before a record saves, after
a record saves, or on a schedule:

![The All Flows list view, showing the Triggers column: Record—Run Before Save, Record—Run After Save, and Schedule.](/courses/salesforce-flow-automation/ch01/01-automation-on-the-salesforce-platform/all-flows-list-triggers.png)

And when you start building something new, Salesforce's own New Automation screen groups every
option into the four categories above:

![The New Automation screen in Setup, grouping options into Triggered, Scheduled, Screen, and Autolaunched categories.](/courses/salesforce-flow-automation/ch01/01-automation-on-the-salesforce-platform/new-automation-three-core-flows.png)

## Key terms

| Term | Meaning |
|---|---|
| Flow | Salesforce's current declarative (point-and-click) automation tool |
| Workflow Rules / Process Builder | Older automation tools, both retired for new development |
| Triggered automation | Runs from a record change or platform event, no user screen involved |
| Autolaunched flow | A flow invoked directly by Apex, an API, a button, or another flow |

## Check yourself

A colleague says "we should build this in Process Builder since that's what the rest of the org
uses." What does this lesson say you should tell them, and why?
