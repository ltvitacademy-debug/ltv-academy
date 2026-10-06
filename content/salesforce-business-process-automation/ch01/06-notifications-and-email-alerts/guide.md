# Lesson 6 — Notifications and Email Alerts

**Chapter 1 · Declarative Business Logic · Lesson 6 of 18**

## What you'll learn

- Why an automated process is only as good as the notification that tells a human to act on it
- How an Email Template's merge fields work, and why they matter for every automated notification you'll ever configure
- How the notification template you picked in Lesson 2's approval wizard actually gets used
- Where Email Alerts show up beyond approval processes — Flow, and (in older orgs) Workflow Rules

## A process nobody hears about isn't automated, it's just invisible

Every tool this chapter has covered so far — approval processes, validation rules, formulas — operates on data. None of it, by itself, tells a human anything happened. A discount approval process that locks a record and silently waits for someone to notice is barely better than no process at all. The notification is not a nice-to-have bolted onto the end of automation; it's the part that actually makes a process *work* for the people running it.

## Email Templates are where this starts

Before an Email Alert or an approval notification can send anything, it needs an **Email Template**. Creating one (Setup → Email Templates → New) asks for:

- **Folder** and **Available For Use** — where it lives and whether it can actually be selected
- **Email Template Name** and **Template Unique Name** — the human label and the API-safe identifier
- **Subject** and **Email Body** — including **merge fields**, written like `{!Shift.ServiceResource}`, that pull live data from the record that triggered the notification

Merge fields are what make a template reusable instead of generic. A notification that reads "A shift needs your approval" is far less useful than one that reads "Maria Lopez created a shift and needs your approval for the 6 AM slot" — and that second version is just the first one with merge fields doing the work.

## This is the same template you picked in Lesson 2

Remember Step 4 of the approval process wizard, **Select Notification Templates**? That field *is* an Email Template, built exactly the way described above. Every approver on every step of an approval process gets notified through this same mechanism. Lesson 2 and Lesson 3 already used it — this lesson just opens up what's actually inside it.

## Email Alerts beyond approval processes

An **Email Alert** is a standalone automation component: an action (usable from Flow, and from Workflow Rules in older orgs) that sends a chosen Email Template to a chosen recipient whenever it fires. Configuring one asks for the same core pieces:

- **Object** — what kind of record triggers it
- **Email Template** — which template to send
- **Recipient Type** — a role, a user field like "Record Owner," a public group, or a specific user
- **From Email Address** — the organization-wide address it sends from, if configured

The difference between an Email Alert used inside an approval process and one fired from a Flow is just *what triggers it*. The sending mechanism, and the template underneath it, is identical either way.

## Recap

- Automation without notification is invisible automation — nobody benefits from a process that doesn't tell anyone it ran.
- Email Templates, with merge fields pulling live record data, are the foundation every notification mechanism builds on.
- The notification template in an approval process's Step 4 is the exact same kind of Email Template covered here.
- Email Alerts reuse that same template mechanism from Flow (and legacy Workflow Rules), triggered by something other than an approval step.

## Try it yourself

Create an Email Template named "Discount Approval Needed" with a Subject and Body that use at least two merge fields from Opportunity (for example the Opportunity Name and the discount percentage). Then go back to the discount approval process from Lesson 2 and set it as the notification template.

## Check yourself

Why does using merge fields in an Email Template matter more as an org grows from a handful of users to hundreds of approvers across dozens of processes?
