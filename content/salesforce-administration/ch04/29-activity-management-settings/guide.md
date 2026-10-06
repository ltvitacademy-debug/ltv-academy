# Lesson 29 — Activity Management Settings

**Chapter 4 · Communication and Support Features · Lesson 29 of 36**

## What you'll learn

- Where activity-related settings live under Setup
- What Einstein Activity Capture syncs, and the toggles that control it
- How the default activity-sharing setting affects what users see
- How tasks, events, and emails converge on the Activity Timeline

## Why this matters

A task without a due date, an event nobody can find, an email that never gets
linked back to the deal it was about — activity data turns into noise fast if
nobody configures it. Activity Management Settings is where an admin decides
how tasks and events get created, whether email and calendar activity flows
into Salesforce automatically, and who gets to see what once it does.

## Where these settings live

Base activity behavior is controlled from **Setup → Activity Settings** —
checkboxes like allowing multiple contacts on one task, enabling group tasks
and events, and simplified Lightning task/event creation. Sync-related
settings, for orgs using **Einstein Activity Capture**, live in their own
area:

![The Setup navigation tree showing Einstein > Einstein Sales > Einstein Activity Capture > Settings (circled), next to a 'Welcome To Einstein Activity Capture' panel explaining that connected emails and events are automatically added to the activity timelines of related Salesforce records.](/courses/salesforce-administration/ch04/29-activity-management-settings/activity-capture-settings-navigation.png)
*The Settings node is where an admin actually turns sync on and configures how it behaves — not where individual users connect their own accounts.*
Source: [Apex Hours — Guide to Setup Einstein Activity Capture](https://www.apexhours.com/guide-to-setup-einstein-activity-capture/)

## Reviewing what actually syncs

Inside the setup wizard, an admin reviews three separate streams, each with
its own enable toggle and direction:

![The 'Review Sync Settings' screen with three rows — Emails, Events, and Contacts — each with an Enabled toggle, and Direction dropdowns set to 'Microsoft Exchange to Salesforce' for Events and Contacts.](/courses/salesforce-administration/ch04/29-activity-management-settings/review-sync-settings.png)
*Direction matters: one-way (connected account to Salesforce) is common for Events and Contacts, so a rep's personal calendar doesn't get overwritten by Salesforce.*
Source: [Apex Hours — Guide to Setup Einstein Activity Capture](https://www.apexhours.com/guide-to-setup-einstein-activity-capture/)

| Stream | What syncs |
|---|---|
| Emails | Added to the activity timeline of related Salesforce records; insights can surface alongside them |
| Events | Synced from the connected calendar (and optionally back) and added to the related record's timeline |
| Contacts | New/updated contacts flow in to support matching and insights |

## Setting the sharing default

Synced activity is personal by nature — a rep's inbox and calendar. The
sharing default decides whether other users can see it:

![The 'Set Default Activity Sharing' screen, with two radio options: 'Share with Everyone' and 'Don't Share' (selected), plus an Insights panel explaining that others see limited event details even when sharing is off.](/courses/salesforce-administration/ch04/29-activity-management-settings/set-default-activity-sharing.png)
*'Don't Share' is the more conservative default — individual users can still choose to share a specific activity even when the org default keeps things private.*
Source: [Apex Hours — Guide to Setup Einstein Activity Capture](https://www.apexhours.com/guide-to-setup-einstein-activity-capture/)

- **Share with Everyone** — any user with access to the related record can
  see the synced activity.
- **Don't Share** (the more common default) — synced activities stay
  private to the owner unless they choose to share one manually.

## Where it all ends up: the Activity Timeline

Regardless of which settings produced them, tasks, events, and synced
emails all converge on one place — the Activity Timeline component on the
record itself:

![An Account record's Activity Timeline showing a list of synced emails — subject, sender, recipient, and timestamp — including one highlighted '[No subject]' email, with a Chatter 'Collaborate here!' panel to the side.](/courses/salesforce-administration/ch04/29-activity-management-settings/activity-timeline-on-record.png)
*Every item here — manually logged or automatically synced — is one entry on the same timeline, in chronological order.*
Source: [Apex Hours — Guide to Setup Einstein Activity Capture](https://www.apexhours.com/guide-to-setup-einstein-activity-capture/)

## The admin's checklist

| Area | What it controls |
|---|---|
| Activity Settings (base) | Multiple contacts per activity, group tasks/events, simplified creation UI |
| Activity Capture → Settings | Whether email/calendar sync is on, and for whom |
| Sync direction (per stream) | Whether data flows one-way or both ways between the connected account and Salesforce |
| Default Activity Sharing | Whether synced activity is visible org-wide or private by default |

## Key terms

| Term | Meaning |
|---|---|
| Activity Timeline | The chronological feed of tasks, events, and emails on a record |
| Einstein Activity Capture | The feature that syncs a connected email/calendar account into Salesforce |
| Sync direction | Whether data flows one-way (e.g., Exchange → Salesforce) or both ways |
| Default Activity Sharing | The org-wide default for whether synced activities are visible to other users |

## Check yourself

- What's the difference between Activity Settings and Einstein Activity Capture Settings?
- Why would an admin choose a one-way sync direction instead of two-way for Events?
- If the sharing default is "Don't Share," can an individual user still share one activity?
