# Lesson 17 — Spokes & Connector Actions

**Chapter 5 · IntegrationHub · Lesson 17 of 29**

## What you'll learn

- What a Spoke actually bundles, beyond the one-line definition from course 4
- How a real Spoke — Slack — organizes its Connector Actions
- Why each Connector Action is independently usable, not a single monolithic integration
- The Inputs/Outputs model a Connector Action shares with any other Flow Designer action
- How a Spoke hides the external system's authentication and request formatting from the flow builder

## A Spoke is a bundle of independently-usable actions

Flow Designer & Automation showed you one spoke action dropped into one flow. What it didn't
dwell on is that a Spoke is never just one action — it's a **bundle** of multiple, separately
usable actions, each wrapping one specific operation against the external system's API. Take
the real Slack Spoke as an example. It ships actions like "Post Message," "Create Channel," and
"Invite User" — three completely different operations, each its own action, each droppable into
any flow on its own. A flow builder who only needs to post a notification never touches the
"Create Channel" action; they just use "Post Message" and move on.

## Each action has its own Inputs and Outputs — same model as course 4

This is the detail worth sitting with: a Connector Action is modeled exactly like any other
Flow Designer action you met in course 4 — it declares named **Inputs** and named **Outputs**.
"Post Message" takes inputs like a channel name and a message body. "Create Channel" takes a
channel name and a visibility setting. "Invite User" takes a channel and a user identifier. The
flow builder wires values into those inputs and reads the outputs back, the same drag-and-drop
experience as wiring any other flow step — they never see, and never need to see, the Slack API
underneath.

## What the action hides from the flow builder

Underneath "Post Message," the Slack Spoke is doing real work: authenticating against Slack
(typically via an Authentication Profile configured once, back in Chapter 3), formatting the
request body the way Slack's API expects it, calling the correct endpoint, and parsing Slack's
response into the clean Outputs the flow builder sees. None of that complexity leaks out. A flow
builder who has never read Slack's API documentation can still post a message, create a channel,
and invite a user — because the Spoke's author already did that research once, and packaged the
result as a reusable action.

## Why this bundling matters for the admin or developer, not just the flow builder

As the person who might install, configure, or extend a Spoke, you're the one who confirms the
Spoke is licensed and installed (Lesson 16), connects its Authentication Profile, and decides
which of its bundled actions a given flow actually needs. You're also the person who notices
when the *bundle* doesn't cover a use case — when none of Slack's shipped actions do what a
business process needs — which is exactly the situation Lesson 18 walks through solving.

## Key terms

| Term | Meaning |
|---|---|
| Spoke | A bundle of multiple pre-built, independently-usable Connector Actions for one external system |
| Connector Action | One specific operation inside a Spoke (e.g. "Post Message"), with its own Inputs and Outputs |
| Inputs/Outputs | The named parameters a flow builder wires into and reads back from any action, including a Connector Action |
| Authentication Profile | The credential configuration (Chapter 3) a Spoke's actions use internally to authenticate |

## Check yourself

Using the Slack Spoke as your example: why can a flow builder drop "Post Message" into a flow
and use it correctly without ever reading Slack's REST API documentation?
