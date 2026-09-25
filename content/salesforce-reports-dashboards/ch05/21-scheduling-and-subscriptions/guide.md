# Scheduling & Subscriptions

A dashboard nobody opens does not help anyone. The strongest way to keep your work in
front of people is to bring it to them: a fresh dashboard waiting on Monday morning, or
an email with the pipeline snapshot before the weekly forecast call. Salesforce supports
this through **scheduled refreshes** and **subscriptions**. This lesson covers how both
work, what is worth automating, and where the limits are.

## What you'll learn

- How the dashboard header tells you how fresh the data is
- How to refresh a dashboard manually and on a schedule
- How subscriptions deliver a dashboard or report to your inbox
- Limits to check in your own org

## Freshness is visible

Open a Lightning dashboard and look at the header. There is an "As of" timestamp that
tells you when the data was last refreshed. Beside it are buttons such as **Refresh**,
**Edit**, and **Subscribe**, as shown in the screenshot for this lesson. A dashboard
does not update itself in real time. Viewers see the data from its last refresh, so an
old timestamp is a hint to refresh, and a habit worth teaching your users.

Refreshing manually is fine for one person. It does not scale to a team, and it does not
help the executive who never clicks anything. That is where automation comes in.

## Subscribing to a dashboard

The **Subscribe** button opens a small scheduling dialog. In most orgs you choose:

1. **Frequency**: daily, weekly, or monthly.
2. **Days and time**: for example, weekdays at 7:00 a.m.
3. **Recipients**: yourself, and if your permissions and settings allow it, other users,
   roles, or groups.

At the scheduled time, Salesforce refreshes the dashboard and sends the subscribers
a snapshot by email. The data is refreshed under the dashboard's running user, which
ties straight back to the last lesson. A subscription to a fixed-user dashboard is
straightforward; dynamic dashboards generally cannot be refreshed on a schedule.

## Reports can be subscribed to as well

The same idea applies to individual reports. Report subscriptions in Lightning can be
scheduled, and you can often add a **condition**, so the email only arrives when a
report meets a threshold, such as "Total Amount above $1M" or "Record Count above 0".
That is a light form of alerting. A report that lists stalled deals only when there is
at least one is far more useful than one sent every Monday that reads "0 records".

## Limits to check

Scheduling is one of the areas where editions differ, so verify these in your org rather
than assuming:

- Editions limit the **number of scheduled refreshes and subscriptions** per user or per
  org. Plan for a handful, not dozens.
- Scheduled refreshes and email sends **consume background capacity**, so avoid
  scheduling many at the same time.
- Subscribers **see what the running user sees**, so review the data before adding a wide
  audience.
- The email is a snapshot, not an interactive dashboard. The link back takes viewers to
  the live one.

## Recap

Dashboards show their last-refresh timestamp, and viewers can refresh them manually. To
deliver data proactively, subscribe: pick a frequency, a time, and recipients, and
Salesforce refreshes and sends a snapshot. Report subscriptions can be conditional.
Check your edition's limits and remember that the running user governs what everyone
receives. Next: layout best practices.
