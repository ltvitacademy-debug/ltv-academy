# Lesson 30 — Notifications and Alerts

**Chapter 4 · Communication and Support Features · Lesson 30 of 36**

## What you'll learn

- Where custom notification types are built, and what they need
- How a Custom Notification Type actually fires (hint: it doesn't, by itself)
- What the user-facing result looks like
- The four real channels Salesforce uses to get a user's attention

## Why this matters

Email is too slow for "this needs you right now," and nobody wants to poll a
list view waiting for a status to change. Salesforce's notification system
is how automation reaches into a user's day — a badge on a bell icon, a push
notification on their phone — at the moment something they care about
actually happens.

## Where custom notifications are built

From Setup, under **Notification Builder → Custom Notifications**, an admin
defines new notification types:

![The Setup Custom Notifications page, with Notification Builder > Custom Notifications highlighted in the left nav, and a New button for Custom Notification Types on the right.](/courses/salesforce-administration/ch04/30-notifications-and-alerts/notification-builder-navigation.png)
*This page only defines the notification TYPE — sending one is a separate job for Flow or Process Builder, as the page itself says.*
Source: [Salesforce Ben — How to Set Up Salesforce Push Notifications](https://www.salesforceben.com/set-up-salesforce-push-notifications/)

## Defining a notification type

Clicking New opens a short form:

![The 'New Custom Notification Type' dialog, with Custom Notification Name set to 'Opportunity Closed,' API Name 'Opportunity_Closed,' and Supported Channels Desktop and Mobile both checked.](/courses/salesforce-administration/ch04/30-notifications-and-alerts/new-custom-notification-type.png)
*Naming it clearly matters — this name is what shows up later when a Flow picks which notification type to send.*
Source: [Salesforce Ben — How to Set Up Salesforce Push Notifications](https://www.salesforceben.com/set-up-salesforce-push-notifications/)

| Field | Purpose |
|---|---|
| Custom Notification Name | The label shown when automation selects which notification to send |
| API Name | The developer name referenced by Flow/Process Builder/Apex |
| Supported Channels | Desktop, Mobile, or both — whether it can push to the mobile app |

## Once it's saved

The new type appears in the list, ready for automation to use:

![The Custom Notification Types list showing 'Opportunity Closed' with its API Name, and checkmarks under both Desktop and Mobile columns.](/courses/salesforce-administration/ch04/30-notifications-and-alerts/custom-notification-types-list.png)
*Defining the type is step one. A Flow (or Process Builder, on older orgs) is what actually fires it when an Opportunity's Stage changes to Closed Won.*
Source: [Salesforce Ben — How to Set Up Salesforce Push Notifications](https://www.salesforceben.com/set-up-salesforce-push-notifications/)

This is the detail that trips up new admins: creating a Custom Notification
Type does nothing by itself. It has to be paired with a **Send Custom
Notification** action inside a Flow (or a similar action in Process
Builder), which supplies the actual recipient, title, and body text at
runtime.

## What the user actually sees

Once a Flow fires the notification, here's the result:

![The notification bell dropdown open, showing one unread notification: 'Opportunity Update — United Oil Installations is now closed!' with a timestamp of '2 minutes ago' and a Mark all as read link.](/courses/salesforce-administration/ch04/30-notifications-and-alerts/notification-bell-dropdown-result.png)
*The bell badges the moment the Flow runs — no page refresh needed — and the dropdown shows exactly the title and body the Flow's Send Custom Notification action supplied.*
Source: [Salesforce Ben — How to Set Up Salesforce Push Notifications](https://www.salesforceben.com/set-up-salesforce-push-notifications/)

If the notification type has Mobile enabled and the user has the Salesforce
mobile app with push notifications allowed, the same message also appears
as a native push notification on their phone.

## The four real channels

| Channel | Setup required | Typical use |
|---|---|---|
| In-app bell | None — always available | Default landing spot for every notification |
| Mobile push | Notification type must enable Mobile, user must opt in on their device | Time-sensitive alerts reaching someone away from their desk |
| Email Alert | A template + a workflow rule, process, or Flow (covered in Lesson 26) | Formal, logged communication — not a quick nudge |
| Custom Notification | A Custom Notification Type + a Flow/Process Builder action | Real-time, in-platform alerts for specific business events |

Don't confuse **Email Alerts** (which send an actual email, using the
templates and letterheads from Lesson 26) with **Custom Notifications**
(which populate the bell and push to mobile). They're built differently,
triggered differently, and show up in completely different places — picking
the right one depends on whether the message needs to live in an inbox or
just needs to interrupt someone for a few seconds.

## Key terms

| Term | Meaning |
|---|---|
| Custom Notification Type | The admin-defined notification "shape" — name, API name, channels |
| Send Custom Notification | The Flow (or Process Builder) action that actually fires a notification |
| Supported Channels | Desktop and/or Mobile — which surfaces a notification type can reach |
| Email Alert | A separate, template-based automated email (distinct from a Custom Notification) |

## Check yourself

- What two pieces does it take to get a notification to actually fire, beyond just creating the type?
- Where would a user see a Custom Notification that doesn't support Mobile?
- What's the practical difference between an Email Alert and a Custom Notification?
