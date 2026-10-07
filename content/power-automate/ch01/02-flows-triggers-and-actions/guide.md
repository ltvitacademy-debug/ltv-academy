# Flows, Triggers and Actions

Every flow in Power Automate, no matter how complicated it eventually gets, is built from exactly two kinds of pieces: one **trigger** and one or more **actions**. Castlebridge Logistics' shipping approvals run through a flow that is, underneath everything, just a trigger and a short chain of actions. This lesson gets that shape firmly in your head before you build your first real flow in Lesson 3.

## What you'll learn

- What a trigger is, and the three ways a trigger can start a flow
- What an action is, and how actions chain together after a trigger fires
- What the real trigger and action picker panels look like in the designer
- Why every flow needs at least one trigger and one action to be saved at all

## The trigger: what starts the flow

A **trigger** is the event that starts a cloud flow. Nothing in a flow runs until its trigger fires. Power Automate connectors — Office 365 Outlook, SharePoint, Teams, and hundreds more — each expose their own prebuilt triggers you pick from:

![Screenshot of a partial list of Office 365 Outlook triggers, including "When a new email arrives (V3)," "When an email is flagged (V3)," and "When a new event is created (V3)."](/courses/power-automate/ch01/02-flows-triggers-and-actions/outlook-triggers.png)
*A partial list of the triggers the Office 365 Outlook connector alone provides — every connector ships its own set.*
Source: [Microsoft Learn — Triggers](https://learn.microsoft.com/en-us/power-automate/triggers-introduction)

Triggers fall into three types:

- **Automated** — fires on an event in a connected service, such as "When an item is created" in a SharePoint list. This is what starts Castlebridge's shipping approval flow the moment a new shipment record is added.
- **Instant** — fires manually, such as tapping a button in the Power Automate mobile app. A Castlebridge dock worker could trigger an instant flow to flag a damaged pallet on the spot.
- **Scheduled** — fires on a recurring schedule you define, like every morning at 6 AM. Useful for a daily summary of Castlebridge's overnight deliveries.

## The action: what the flow does next

An **action** is a step the flow performs after the trigger fires — send an email, update a record, post a Teams message, start an approval. You add your first action by selecting the plus sign below the trigger card, which opens a configuration panel organized into Favorites, AI capabilities, Built-in tools, and By connector:

![Screenshot of the "Add an action" configuration panel in the Power Automate designer, showing sections for Favorites, AI capabilities, Built-in tools, and By connector.](/courses/power-automate/ch01/02-flows-triggers-and-actions/actions-examples.png)
*The same panel you'll use in Lesson 3 to add the approval action to Castlebridge's shipping flow.*
Source: [Microsoft Learn — Actions](https://learn.microsoft.com/en-us/power-automate/actions-introduction)

A flow almost always needs more than one action — the SharePoint trigger fires, then an action sends a notification, then another action updates a record. Actions run in the order you place them, top to bottom, unless you branch them with a condition (Lesson 4) or repeat them with a loop (Lesson 5).

## The minimum a flow needs to save

Power Automate won't let you save a flow with only a trigger and no action, or an action with no trigger above it. At minimum, every flow is one trigger plus one action — everything else in this course is variations and additions on that same two-piece shape.

## Key terms

- **Trigger** — the single event that starts a cloud flow; every flow has exactly one
- **Action** — a step the flow performs after the trigger fires; a flow can have many
- **Automated trigger** — fires on an event in a connected service (new item, new email)
- **Instant trigger** — fires manually, such as from a button in the mobile app
- **Scheduled trigger** — fires on a recurring schedule you define
