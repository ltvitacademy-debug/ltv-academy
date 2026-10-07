# Automating Microsoft Teams: Notifications and Approvals

Castlebridge Logistics' dispatch team lives in Microsoft Teams during a shift, not in their inbox. The **Microsoft Teams** connector lets a flow post directly into a channel or chat — a plain notification, or a richly formatted, interactive **adaptive card** that collects a response without anyone leaving Teams.

## What you'll learn

- The two core posting actions: **Post message in a chat or channel** and **Post an adaptive card in a chat or channel and wait for a response**
- What an adaptive card actually is, and why it's different from a plain text message
- The prerequisite almost everyone misses: the Workflows app must be installed in Teams
- How a card's JSON and a flow's dynamic content combine to build an interactive poll or approval
- A worked Castlebridge Logistics example: a dock-door capacity poll

## Posting a plain message vs. posting a card

**Post message in a chat or channel** sends straight text (or simple HTML) to a Teams channel or a 1:1/group chat — good for a one-way notification like "Truck 14 has cleared customs."

**Post an adaptive card in a chat or channel and wait for a response** is a different animal entirely: it posts a structured, interactive card — built from JSON, not a text string — and the flow actually pauses at that action until someone responds to the card. That response becomes dynamic content the rest of the flow can use.

## Prerequisite: the Workflows app

Before any Teams action in a flow will actually post anything, the **Workflows app** must be installed in the target Microsoft Teams (from the Teams app store, or by an admin at the tenant level). This is the single most common reason a Teams action in a new flow silently fails on first run.

## Building an adaptive card

An adaptive card's content is JSON — a defined schema with a `type`, a `body` (an array of text blocks, images, inputs), and an `actions` array (buttons like Submit). You paste that JSON into the action's **Message** field, then replace placeholder text with the specific labels and choices your scenario needs. A `type: "Input.ChoiceSet"` block is what turns a card into something people can actually click and respond to, rather than just read.

![Screenshot of a finished adaptive card posted to a Microsoft Teams channel, showing a poll with multiple-choice options and a Submit button.](/courses/power-automate/ch01/09-automating-microsoft-teams/finished-first-card.png)
*A finished adaptive card in a Teams channel — the body's text blocks and choice set, rendered.*
Source: [Microsoft Learn — Create flows that post adaptive cards to Microsoft Teams](https://learn.microsoft.com/en-us/power-automate/create-adaptive-cards)

## After the response: updating the card

Because the **wait for a response** action pauses the flow, you can follow it with logic that reacts to what was submitted — and even replace the card itself with a confirmation view, using the action's **Update message** configuration, so the person who answered sees their response reflected back rather than the same blank card.

![Screenshot of a replacement adaptive card shown after a response was submitted, confirming the recorded answer.](/courses/power-automate/ch01/09-automating-microsoft-teams/update-message-2.png)
*The replacement card shown after submission — built with the same Update message setting on the wait-for-response action.*
Source: [Microsoft Learn — Create flows that post adaptive cards to Microsoft Teams](https://learn.microsoft.com/en-us/power-automate/create-adaptive-cards)

## Castlebridge Logistics example: the dock-door poll

Castlebridge Logistics' yard supervisor needs a quick way to poll dispatchers about which dock door to reserve for an oversized inbound load. The flow: a manually triggered flow posts an adaptive card to the Dispatch channel with a choice set of open dock doors, waits for a response, then sends a confirmation email naming whoever picked a door and which one they chose — all without a single person leaving Teams.

## Key terms

- **Post message in a chat or channel** — sends plain text or simple HTML to a Teams channel or chat, one-way
- **Post an adaptive card ... and wait for a response** — posts an interactive JSON-based card and pauses the flow until someone responds
- **Adaptive card** — a structured card defined in JSON, with a `body` of content blocks and an `actions` array of buttons
- **Workflows app** — the Teams app that must be installed before any Teams connector action will post successfully
