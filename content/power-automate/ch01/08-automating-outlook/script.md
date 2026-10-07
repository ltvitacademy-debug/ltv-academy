# Script — Automating Outlook: Email Triggers and Actions

## Segment 1 (title)

Email is where most of Castlebridge Logistics' business processes still start and end — a shipping exception lands in an inbox, a confirmation needs to go out. The Office 365 Outlook connector covers both directions: triggers that start a flow from an incoming message, and actions that send or forward mail from inside one.

## Segment 2 (steps)

The trigger you'll use constantly is When a new email arrives, filterable by sender, subject keywords, or importance, so a flow only fires for the mail that actually matters instead of every message in a busy shared inbox. On the action side, Send an email and Forward an email cover sending something brand new or passing an existing message along without retyping it.

## Segment 3 (screenshot)

Two trigger options control attachments: Include Attachments and Only with Attachments. Metadata like file name and size always comes through regardless, but the actual file content only arrives when Include Attachments is turned on — and when it is, you get an array, one entry per file attached to that email.

## Segment 4 (screenshot)

Here's the real-world catch: Send an email's own Attachments field wants a single array, so if you want to add or filter what goes out, you can't just hand it the trigger's attachments directly. Initialize an empty array variable, loop over the attachments with Apply to each, append the ones you actually want, then point the Send an email action's Attachments field at that variable with an expression.

## Segment 5 (outro)

That loop-and-append pattern is the real way attachments get filtered before going back out the door. Next up, lesson nine: automating Microsoft Teams, with notifications and approvals posted straight to a channel.
