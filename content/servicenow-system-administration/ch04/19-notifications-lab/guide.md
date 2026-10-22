# Lesson 19 — Notifications Lab

**Chapter 4 · Notifications & Email · Lesson 19 of 36**

## What you'll learn

- How to plan a complete notification flow before touching any form
- Building a record-condition-triggered notification scoped to a group recipient
- Attaching a shared Email Template instead of writing a one-off message body
- Confirming an Inbound Email Action would correctly process a reply to that notification
- Why walking through this scenario on paper first catches mismatches before they ship

## The scenario

Your organization is rolling out a new Change Request type and needs real email handling around it, not just a record in the database. The requirement, as handed to you by the Change Manager: **when a Change Request moves into the "Scheduled" state, the assigned Change Advisory Board (CAB) group should get an email using the organization's existing Change Notification template — and if anyone on the CAB replies to that email, the reply should land as a comment on the Change Request automatically**, the same way incident replies already work. This lab walks through configuring that, piece by piece, exactly the way you would in a real instance — no screenshots, because this is reasoning through the configuration, not clicking through a UI.

## Step 1 — Identify the trigger before anything else

Before opening a single form, write down the trigger in plain language: *fire when a record on the Change Request table has its State field changed to Scheduled.* This is a record condition trigger (Lesson 16) — not an event trigger, because there's no complex calculation involved, just a direct field transition that the platform can watch for natively. Writing this sentence down first matters: it's what you'll check the finished notification record against once it's built, instead of discovering a gap during testing.

## Step 2 — Identify the recipient, separately from the trigger

The recipient is the assigned CAB group — not a hardcoded user, not the record's "Opened by" field, and not an Email field. This is the group recipient type covered in Lesson 16: every active member of that CAB group with a notification-eligible email address receives a copy when the notification fires. Calling this out as its own decision, separate from the trigger, is exactly the habit that avoids the common mistake from Lesson 16 — picking a recipient field that technically exists on the record but isn't actually who should be told.

## Step 3 — Attach the shared template, don't write a new one

The organization already has a Change Notification email template on `sysevent_email_template` used elsewhere for change-related communications — reference it on the new notification rather than writing a fresh HTML body. The template already contains the right placeholders for a Change Request: something like `${number}`, `${short_description}`, and `${start_date}`/`${end_date}` for the scheduled window, each of which resolves against the actual Change Request record when the notification fires. Reusing it means this new notification automatically matches the wording and formatting of every other change-related email the CAB already receives, and any future wording fix to that template applies here too, with no extra work.

## Step 4 — Assemble the notification record

Putting steps 1 through 3 together, the notification record you're building has: Table = Change Request, When to send = Updated, Field condition = State changes to Scheduled, Who will receive it = the CAB group, Email Template = the existing Change Notification template. Each of those five pieces maps directly to a setting covered in Lessons 16 and 17 — nothing here is a new mechanism, it's the same trigger/recipient/template structure applied to a new table and a new audience.

## Step 5 — Confirm the reply path works the same way it does for incidents

The last requirement — a CAB reply becoming a comment on the Change Request — depends on an Inbound Email Action already existing (or being built) that's scoped to the Change Request table, following the same pattern Lesson 18 covered for incidents: the outbound notification carries a watermark identifying the specific Change Request, a CAB member's reply echoes that watermark back in its quoted text, inbound processing matches it to the correct record, and a Record Action script appends the reply's body as a comment. If no Inbound Email Action exists yet for the Change Request table, that's a real gap to flag before calling this requirement done — the outbound notification half can be fully correct while the reply half silently does nothing without it.

## Step 6 — Walk the whole flow end to end, on paper

Before considering this finished, trace it start to finish: a Change Request's State field is set to Scheduled → the notification's trigger fires → the CAB group is resolved as recipients → the Change Notification template renders with this record's real number, description, and scheduled dates → the email lands in each CAB member's inbox → a CAB member replies with a scheduling conflict → the watermark in that reply is matched back to the same Change Request → an Inbound Email Action appends that reply as a comment. Every step in that chain is something this chapter already taught; the lab is confirming they chain together correctly for this specific, real request, not inventing anything new.

## Key terms

| Term | Meaning |
|---|---|
| Record condition trigger | Firing on a direct field transition, like Change Request State changing to Scheduled |
| Group recipient | A "Who will receive it" setting that sends to every active member of a specified group |
| Shared template | Referencing an existing Email Template instead of writing a one-off body for a new notification |
| Reply path | The watermark-match-then-action chain that lets a reply become a comment automatically |
| End-to-end trace | Walking a configured flow step by step before calling it done, to catch a missing piece like an absent Inbound Email Action |

## Check yourself

Walk through the six-step flow above and answer: if the notification in Steps 1-4 is built correctly, but no Inbound Email Action exists yet for the Change Request table, which half of the Change Manager's original requirement is satisfied, and which half silently fails — and at which exact step does that failure happen?
