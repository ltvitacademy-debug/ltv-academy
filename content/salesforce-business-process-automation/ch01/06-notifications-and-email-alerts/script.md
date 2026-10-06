# Script — Notifications and Email Alerts

## Segment 1 (title)

Every tool we've covered so far operates on data. None of it, by itself, tells a human anything happened. A locked record nobody hears about is barely better than no process at all. Let's fix that.

## Segment 2 (screenshot: email template form)

Before anything can notify anyone, it needs an Email Template. Here's a real one being built: a folder, a name, a subject, and a body. Look at the body, it's full of merge fields like curly-brace Shift dot Service Resource. Those pull live data from whatever record triggered the notification, which is what makes a template reusable instead of generic.

## Segment 3 (screenshot: approval notification template)

You've actually already used this. Step 4 of the approval wizard back in Lesson 2, Select Notification Templates, that field is exactly the Email Template we just built. Every approver on every step of an approval process gets notified through this same mechanism, we just hadn't opened it up yet.

## Segment 4 (code: merge fields in practice)

Here's why merge fields matter. Without them, every notification reads the same generic line. With them, the email names the actual record, the actual requester, the actual value in question. One template, reused everywhere, personalized every single time it sends.

## Segment 5 (steps: an email alert's four pieces)

Outside of approval processes, an Email Alert is its own automation component, usable from Flow and from Workflow Rules in older orgs. It needs the same core pieces: an object, which kind of record triggers it; the template to send; a recipient type, a role, a record owner, a group, or a specific user; and a from address if your org has one configured.

## Segment 6 (outro)

That closes out Chapter 1's toolbox: approvals, validation, formulas, and now notifications. Chapter 2 steps back and asks the harder question: which tool, and when do you need more than any of these can give you.
