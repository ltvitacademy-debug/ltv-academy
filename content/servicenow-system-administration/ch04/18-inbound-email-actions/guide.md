# Lesson 18 — Inbound Email Actions

**Chapter 4 · Notifications & Email · Lesson 18 of 36**

## What you'll learn

- Where inbound email processing is configured: the `sysevent_in_email_action` table
- How a reply to a notification email gets matched back to the record it came from
- The real role of the watermark in making that match possible
- The difference between a Record Action and Reply/Forward/New handling, at a conceptual level
- A concrete example: a reply becoming a work note on the originating Incident automatically

## Notifications go out; inbound email actions handle what comes back

Lessons 16 and 17 covered the outbound half of email in ServiceNow: a notification fires, a template fills in the message, the recipient gets an email. Inbound Email Actions handle the other direction — what happens when that recipient hits Reply. When a caller replies to "Your incident INC0010234 has been updated" with a few lines adding more detail, ServiceNow's email inbox processing has to do two things: figure out which record that reply belongs to, and decide what to do with the reply text once it knows. Both of those are governed by records on the `sysevent_in_email_action` table.

## Matching a reply back to its record

ServiceNow can't just guess which Incident a reply is about. The real mechanism is a watermark — a hidden reference, typically embedded in the outbound notification email's body or subject line, that uniquely identifies the record and gets echoed back in the reply (most email clients quote the original message below a reply, which is exactly where the watermark survives). When an inbound email arrives, ServiceNow's email processing scans for that watermark, and when it finds one, it knows definitively which record — which Incident, which Catalog Task, which Change Request — the reply is actually about, rather than trying to parse a subject line that a user may have edited or stripped. Without a valid watermark match, the email is treated as a new, unrelated inbound message instead of a reply tied to an existing record.

## What happens once the record is matched: the action itself

Once ServiceNow knows which record a reply belongs to, an Inbound Email Action record defines what to actually do with it — and that's where administrator configuration comes in. A real, common action: take the body of the reply and add it as a work note (or a comment, if the reply came from the end-user-facing side) on the matched Incident. The action record is scoped to a table (Incident, in this example) and carries a script that runs against the matched record, with the inbound email's subject, body, and sender available to that script. The script itself is the kind of deeper scripting this path's later scripting course covers in full detail — at this level, the administrator-relevant fact is that replying to a notification email is a real, working path to updating a record without opening ServiceNow at all, as long as an Inbound Email Action exists to handle it.

## Record Action vs. Reply/Forward/New handling

Inbound Email Actions aren't all the same shape. A **Record Action** runs against a record that the inbound processing has already matched (the watermark-reply case above is the typical path into this). Separately, ServiceNow's inbound email processing distinguishes between a genuine **Reply** (matched via watermark to an existing record), a **Forward** (the email was forwarded rather than replied to, which changes what context is reliably available), and a **New** inbound email with no watermark match at all — which can still be configured to create a brand-new record (for example, turning an email sent to a support inbox into a new Incident) rather than updating an existing one. As the administrator, recognizing which of these three situations you're actually configuring for determines which Inbound Email Action record and which condition applies.

## Why this matters for the people actually using the system

From the end user's point of view, none of this watermark-and-table-matching machinery is visible — they just see that replying to an email about their ticket updated the ticket. That invisibility is the entire point: a caller who's used to email, not a service portal, gets a natural way to add information to their own incident. Getting the inbound action's script right (appending cleanly, not duplicating quoted text, not overwriting existing notes) is what keeps that experience trustworthy instead of producing messy, duplicated work notes that make the Incident harder to read than if the reply had never been processed at all.

## Key terms

| Term | Meaning |
|---|---|
| `sysevent_in_email_action` | The table storing every inbound email action record |
| Watermark | A hidden reference in a notification email that lets a reply be matched back to its originating record |
| Record Action | An inbound email action that runs against a record already matched by the watermark |
| Reply / Forward / New | The three situations inbound processing distinguishes between, based on whether and how a watermark match occurred |
| Work note | A common target for an inbound action's script — appending the reply text onto the matched record |

## Check yourself

A caller replies to an incident notification email, but the reply arrives as a brand-new, unrelated inbound record instead of updating the original Incident. What's the most likely reason the watermark match failed, and which of the three inbound-email situations — Reply, Forward, or New — did ServiceNow end up treating this message as?
