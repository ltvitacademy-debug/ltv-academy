**Chapter 2 · Flow Types · Lesson 10 of 31**

# Autolaunched Flows

Every flow type covered so far in this chapter — record-triggered, screen, scheduled — runs with
no admin standing over it watching each step. Salesforce has a name for that behavior:
**autolaunched**. This lesson looks at the specific flow type that makes "autolaunched" its whole
identity: **Autolaunched Flow (No Trigger)**, a flow with no built-in way to start itself at all.

## What you'll learn

- Why "autolaunched" describes most of this chapter's flow types, not just one of them
- What makes Autolaunched Flow (No Trigger) different from the others
- How an autolaunched flow actually gets started, since nothing starts it automatically
- Why it still has to be activated like any other flow

## "Autolaunched" is a category, not one flow type

Setup's New Automation screen groups flows into four categories — Triggered, Scheduled, Screen,
and Autolaunched — but look closely at the Frequently Used cards underneath, and the word
"autolaunched" shows up in three different flow types' own descriptions, not just the one
literally named Autolaunched:

![The New Automation screen's Frequently Used cards, with the word "autolaunched" highlighted inside the descriptions for Record-Triggered Flow, Autolaunched Flow (No Trigger), and Schedule-Triggered Flow.](/courses/salesforce-flow-automation/ch02/10-autolaunched-flows/new-automation-three-core-flows.png)

A record-triggered flow, a schedule-triggered flow, and a platform event-triggered flow are all,
technically, autolaunched flows — they all run in the background with no screen. What separates
them from each other is only the **Trigger**: what starts them. The Flows list in Setup makes this
explicit when you add the Trigger column:

![Setup's Flow Definitions list filtered to Autolaunched Flows, with five numbered rows showing different Trigger values: Schedule, Record—Run Before Save, Record—Run After Save, Platform Event, and one row with a blank Trigger.](/courses/salesforce-flow-automation/ch02/10-autolaunched-flows/autolaunched-flows-list.png)

Four of those five rows have a trigger — something that starts them without being asked. The
fifth row, with a blank Trigger column, is the flow type this lesson is actually about:
**Autolaunched Flow (No Trigger)**.

## The one with no trigger at all

Autolaunched Flow (No Trigger) has no Start-element schedule, no object to watch, no platform
event to subscribe to, and no screen. Its own description on the New Flow screen says exactly
what does start it: "Launches when invoked by Apex, processes, REST API, and more." Build one
and the canvas looks almost bare — just a Start labeled "Autolaunched Flow," whatever elements
you add, and an End:

![A Flow Builder canvas titled "Clone Closed Case - V1," with Start (Autolaunched Flow) connected to a Clone Case Create Records element and End, and the Activate button in the top-right highlighted.](/courses/salesforce-flow-automation/ch02/10-autolaunched-flows/flow-builder-activate-button.png)

Like every other flow, it must be **activated** before anything can run it — the Activate button,
highlighted above, flips it from Inactive to live.

## Giving it something to invoke it

An activated Autolaunched Flow (No Trigger) still does nothing until something calls it. Apex
code can invoke it directly. Another flow can call it as a Subflow (Lesson 11). And — a pattern
with roots going back to Classic — a custom button or link, pointed at the flow's own URL with
merge-field parameters, can hand a user-driven way to launch it:

![A classic "New Button or Link" / Custom Button or Link Edit page, with fields for Label, Name, Description, Display Type, Behavior, and a Content Source set to URL.](/courses/salesforce-flow-automation/ch02/10-autolaunched-flows/new-button-or-link-window.png)

The button's URL passes values into the flow's input variables as query parameters, so clicking
it is effectively invoking the flow with data already in hand — no screen required, because the
flow itself still has none. The screen the user sees is just the record detail page they clicked
from.

## Key terms

| Term | Meaning |
|---|---|
| Autolaunched | Describes any flow that runs in the background with no screen — a category, not a single flow type |
| Autolaunched Flow (No Trigger) | The specific flow type with no built-in trigger of its own; must be invoked by Apex, another flow, REST API, or a button/link |
| Trigger | What starts a flow without a person asking — a schedule, a record save, or a platform event; this flow type has none |
| Activate | The step every flow (including this one) needs before anything can run it |

## Check yourself

A flow's Trigger column in Setup is blank. What does that tell you about how it gets started,
and name two ways it could still be launched?
