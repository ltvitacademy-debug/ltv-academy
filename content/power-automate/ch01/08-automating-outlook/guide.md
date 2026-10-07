# Automating Outlook: Email Triggers and Actions

Email is where most Castlebridge Logistics business processes still begin and end — a shipping exception lands in an inbox, a confirmation needs to go out, a damaged-freight claim needs attachments forwarded to the claims team. The **Office 365 Outlook** connector gives you both sides of that: triggers that start a flow from an incoming email, and actions that send, forward, or reply from within one.

## What you'll learn

- The main Outlook triggers: **When a new email arrives (V3)** and the calendar event triggers
- The main Outlook actions: **Send an email (V2)**, **Forward an email (V2)**, **Get emails (V3)**
- How the `Include Attachments` and `Only with Attachments` trigger options work
- A real multi-attachment pattern: looping through an array of attachments and appending them to an outgoing email
- Where this fits into Castlebridge Logistics' exception-handling process

## Triggers: starting a flow from Outlook

The connector's most-used trigger is **When a new email arrives (V3)**, which starts a flow whenever a message lands in a mailbox. It can be filtered by sender, subject keywords, or importance, so a flow only fires for the emails that actually matter — for Castlebridge Logistics, that might mean filtering to only messages from the carrier-exceptions distribution list.

Calendar triggers exist too: **When an event is added, updated, or deleted (V3)** and **When an upcoming event is starting soon (V3)**, useful for anything tied to a scheduled dock appointment or driver check-in.

## Actions: doing something in Outlook

- **Send an email (V2)** — sends a new message from the connection's mailbox, with dynamic content, HTML formatting, and attachments
- **Forward an email (V2)** — forwards an existing message to a new recipient or group, saving a manual step
- **Get emails (V3)** — retrieves messages matching a filter, for flows that need to read and process mail rather than just react to it
- **Create event (V4)** / **Get events (V4)** — the calendar-side equivalents

## Working with attachments

Two trigger properties control whether attachment content comes through at all: **Include Attachments** and **Only with Attachments**. Set both to **Yes** on the trigger if your flow needs to act on whatever was attached to the incoming email — attachment metadata (name, size, content type) always comes through regardless, but the actual file content only comes through when **Include Attachments** is turned on.

![Screenshot of an Attachments array from an Outlook trigger, shown as dynamic content in the flow designer.](/courses/power-automate/ch01/08-automating-outlook/multiple-attachments.png)
*The trigger's Attachments property is itself an array — one entry per file on the incoming email.*
Source: [Microsoft Learn — Office 365 Outlook connector reference](https://learn.microsoft.com/en-us/connectors/office365/)

A common real pattern — forwarding every attachment from an incoming email onto a new outgoing one — needs a small amount of extra plumbing, because **Send an email (V2)**'s own Attachments field expects a single array, and you can't just hand it the trigger's attachments directly when you also want to add or filter which ones go out. The fix: initialize an empty array variable, loop over the trigger's attachments with **Apply to each**, and use **Append to array variable** to build the exact set of attachments you want to send — then reference that variable, as an expression, in the **Send an email (V2)** action's Attachments field.

![Screenshot of the Send an email (V2) action's Attachments field set using an expression referencing an array variable.](/courses/power-automate/ch01/08-automating-outlook/dynamic-expression.png)
*The Attachments field set to an expression — the array variable built up by the Apply to each loop, not the trigger's attachments directly.*
Source: [Microsoft Learn — Office 365 Outlook connector reference](https://learn.microsoft.com/en-us/connectors/office365/)

## Castlebridge Logistics example: the exception-handling flow

A carrier reports a damaged pallet by emailing photos to a shared exceptions inbox. The flow: **When a new email arrives (V3)** (filtered to that inbox, with attachments included) triggers, an **Apply to each** loop walks the attachments and appends each one that isn't a signature-image to an array variable, and **Send an email (V2)** forwards a cleaned-up claim notice — with only the real damage photos attached — to the claims team.

## Key terms

- **When a new email arrives (V3)** — the Outlook trigger that starts a flow on an incoming message, filterable by sender, subject, or importance
- **Send an email (V2)** — the Outlook action that sends a new message, with dynamic content, HTML body, and attachments
- **Include Attachments / Only with Attachments** — trigger options controlling whether attachment file content is passed into the flow
- **Attachments array** — the trigger's attachment output, one entry per file, typically filtered or rebuilt with a variable before being sent back out
