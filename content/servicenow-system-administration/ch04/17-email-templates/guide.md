# Lesson 17 — Email Templates

**Chapter 4 · Notifications & Email · Lesson 17 of 36**

## What you'll learn

- Where email templates live: the `sysevent_email_template` table
- Why a notification references a template instead of writing its own message body
- How field placeholders pull real record values into the email at send time
- The real benefit of reuse — one template, many notifications, one place to edit
- How subject lines and HTML vs. plain-text bodies fit into a template record

## The message body is a separate object from the notification

Lesson 16 covered the trigger and the recipients — the "when" and "who" of a notification. The "what does the email actually say" part lives in a different object entirely: an Email Template, stored on `sysevent_email_template`. A notification record has a field pointing at a template; the notification doesn't carry its own subject and body unless an administrator overrides it directly on the notification (which is possible, but defeats the purpose this lesson covers). Separating the two means the same wording can back several different notifications, and a wording fix only has to happen in one place.

## Why reuse actually matters here

Picture an organization with five separate notifications all related to incident updates: one for assignment, one for a comment added, one for resolution, one for reopening, one for an SLA warning. If each of those five notifications had its own hand-written HTML body, a simple request — "add our new support phone number to every incident email's footer" — means editing five records and hoping none of them drift out of sync. With a shared template (or even just a shared footer block referenced consistently), that same request is one edit. This is the same principle Course 1's lessons on maintainability apply to code: duplicated content is a maintenance liability, and ServiceNow's template/notification split exists specifically to avoid it for email.

## Field placeholders: pulling real data into the message

A template's subject and body aren't static text — they contain placeholders that pull real values from whichever record triggered the notification, written as `${field_name}`. A template built for incident notifications might have a subject line like `Incident ${number} has been updated` and a body that includes `${short_description}`, `${priority}`, and `${assigned_to}`. At send time, ServiceNow resolves each placeholder against the actual record that fired the notification — so the one template produces a different, accurate email for every incident it's used on, without the administrator writing a single line of script. This is the mechanism that makes "one template, many notifications, many records" actually work: the template is generic, and the placeholders are what make each sent email specific.

## Subject, HTML body, and plain-text fallback

A template record carries a Subject field (itself allowed to contain placeholders, as shown above) and a Message HTML field for the rich body — the version most email clients render, with headings, bold text, and basic styling consistent with how the organization wants its notifications to look. Templates also support a plain-text fallback for email clients or situations where HTML rendering isn't available. As the administrator building a template, the practical habit is: write the HTML body first since that's what nearly everyone sees, then confirm the plain-text version still reads sensibly on its own — not just as HTML tags stripped out badly.

## Wiring a template to a notification

Once a template exists, attaching it to a notification record is a single reference field on the notification form — pick the template, and the notification now sends exactly that subject and body whenever its trigger fires. The notification itself can still add extra content above or below the template (for links back to the record, or additional context specific to that one notification), but the shared template is what the organization maintains centrally. This is also why planning templates deliberately, before building out a dozen loosely related notifications, saves real rework — deciding early that "incident update emails" share one template avoids five near-duplicate messages that quietly diverge later.

## Key terms

| Term | Meaning |
|---|---|
| `sysevent_email_template` | The table storing every reusable email template |
| Field placeholder | `${field_name}` syntax that pulls a real record value into the subject or body at send time |
| Message HTML | The rich-formatted body field most email clients render |
| Plain-text fallback | The non-HTML body shown when a client can't render the HTML version |
| Template reuse | Multiple notifications referencing one template so wording edits happen in one place |

## Check yourself

An organization wants to update the support phone number shown in every incident-related email's footer. If all five incident notifications reference the same Email Template, how many records actually need editing — and what would the answer have been if each notification had its own hand-written body instead?
