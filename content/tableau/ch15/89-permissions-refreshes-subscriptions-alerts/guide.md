# Lesson 89 — Permissions, Refreshes, Subscriptions, Alerts & Sharing

**Chapter 15 · Tableau Server, Cloud & Public · Lesson 89 of 95**

## What you'll learn

- How permission rules actually work — Allow, Deny, and unspecified
- How to keep a published extract up to date with a refresh schedule
- How subscriptions email people a snapshot on a schedule, automatically
- How data-driven alerts notify people the moment a number crosses a
  line — without anyone checking the dashboard
- How sharing a link differs from granting a permission

## Permissions: who can do what

Once content is published, **permissions** control what each person or
group can actually do with it — not just whether they can see it, but
whether they can filter it, download it, edit it, or delete it.

![A permission-rules grid: groups and users down the left, capabilities across the top, each cell showing a green checkmark (Allowed), a red X (Denied), or left gray (unspecified).](/courses/tableau/ch15/89-permissions-refreshes-subscriptions-alerts/permissions-rules.png)
*Templates like View, Explore, Publish, and Administer set a whole row of capabilities at once — Custom lets you override individual cells.*
Source: [Tableau Help — Set Permissions](https://help.tableau.com/current/server/en-us/permissions.htm)

A few things worth internalizing about how this grid actually behaves:

- Every capability has three possible states: **Allowed**, **Denied**,
  or **unspecified** (left gray). Unspecified isn't neutral — it falls
  through to whatever a broader rule (like the project's default
  permissions) already says.
- **Deny always wins.** If any rule denies a capability for a user —
  whether directly or through a group they belong to — that denial
  overrides any Allow from another rule.
- Templates (View, Explore, Publish, Administer, Denied) are just
  convenient presets for an entire row of capabilities. Custom lets
  you hand-pick individual capabilities when a template doesn't fit.

## Refreshes: keeping extracts current

If a published data source uses an **extract** (Lesson 9 covered
extracts vs. live connections), that extract goes stale the moment new
data lands in the source system — until something refreshes it. On
Cloud or Server, you don't refresh it by hand: you create a
**refresh schedule** against the published data source (full or
incremental), running nightly, hourly, or on whatever cadence the
business actually needs. This is exactly why "Allow refresh access"
from Lesson 88 mattered — the schedule needs the server to be able to
authenticate to the source data on its own, on a timer, with nobody
sitting there entering a password.

## Subscriptions: push a snapshot to someone's inbox

A **subscription** emails a static image snapshot of a specific view
to a person, on a schedule, automatically — no login required to see
it land in their inbox.

![The Watch menu on a published view's toolbar, showing three options: Subscriptions (get scheduled email snapshots), Metrics (track key numbers), and Alerts (notify when data reaches a threshold).](/courses/tableau/ch15/89-permissions-refreshes-subscriptions-alerts/subscribe-toolbar.png)
*Subscriptions, Metrics, and Alerts all live behind the same Watch menu — three different ways of getting Tableau to come to you instead of the other way around.*
Source: [Tableau Help — Subscribe Yourself or Others to a View](https://help.tableau.com/current/server/en-us/subscribe_user.htm)

A subscription reflects whatever the view's default filters show at
send time — if you need it filtered to one region or one manager, you
subscribe to a saved **custom view** with those filters already
applied, not the base view. An executive who never opens Tableau at
all can still get a Monday-morning snapshot of exactly the numbers they
care about, every week, without lifting a finger.

## Data-driven alerts: notify on a threshold, not a schedule

A subscription is time-based ("every Monday"). A **data-driven alert**
is condition-based: it watches a continuous numeric axis and notifies
someone the moment the value crosses a threshold you define.

![The Create Alert dialog: condition set to 'Above or equal to' a threshold value, a subject line, a 'send as frequently as possible' notification setting, and a recipients field.](/courses/tableau/ch15/89-permissions-refreshes-subscriptions-alerts/data-alert-dialog.png)
*An alert only needs a continuous numeric axis to attach to — set the condition, the threshold, and who hears about it.*
Source: [Tableau Help — Send Data-Driven Alerts](https://help.tableau.com/current/pro/desktop/en-us/data_alerts.htm)

The difference matters practically: a subscription tells someone "here's
Monday's number, as usual." An alert tells someone "profit just dropped
below target, right now" — the moment it happens, not on a fixed
calendar.

## Sharing vs. permissions

It's easy to conflate "who can see a link" with "who has permission."
They're related but distinct: **permissions** are the underlying
capability grid you saw above — they're what actually gets enforced no
matter how someone arrives at the content. **Sharing** is simply
handing someone a way in — a direct link, or adding them to a project.
Sharing a link with someone who has no permission on that content still
gets them a login prompt or an access-denied page; permissions are what
ultimately decide whether they get in.

## Key terms

| Term | Meaning |
|---|---|
| Permission rule | A row of capabilities (Allow/Deny/unspecified) applied to a user or group |
| Refresh schedule | A recurring, automated job that refreshes a published extract on Cloud or Server |
| Subscription | An automatic, scheduled email snapshot of a view sent to a person |
| Data-driven alert | A notification triggered when a chosen measure crosses a defined threshold |

## Lab

1. Sketch (on paper or in a doc) a permission rule for three groups —
   "Executives" (View only), "Analysts" (Explore), "BI Team"
   (Administer) — against one workbook, and note which template each
   maps to.
2. Write the specific refresh cadence you'd choose for a sales
   dashboard that leadership checks every Monday morning, and justify
   it in one sentence.
3. Describe one real number from your own life or work where a
   data-driven alert (threshold-based) would genuinely be more useful
   than a weekly subscription (schedule-based).

## Check yourself

You're ready for Lesson 90 when you can explain, without notes, why
"Deny always wins" in a permission rule, and state the one-sentence
difference between a subscription and a data-driven alert.
