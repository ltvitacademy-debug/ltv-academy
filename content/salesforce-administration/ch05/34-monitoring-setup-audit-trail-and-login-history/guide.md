# Monitoring: Setup Audit Trail and Login History

**Chapter 5 · Administration in Practice · Lesson 34 of 36**

Field History Tracking (back in Chapter 3) answers "what changed on this record." It doesn't
answer "who changed a permission set" or "who logged in from an unfamiliar location at 2 AM."
Those are **configuration** and **access** questions, not record questions — and Salesforce has
two separate, built-in tools to answer them: **Setup Audit Trail** and **Login History**.

## What you'll learn

- What Setup Audit Trail actually records, and what it leaves out
- How to find both tools in Setup, starting from the same search habit
- What Login History shows per login attempt
- Why these two tools answer different questions and neither replaces the other

## Setup Audit Trail: who changed the configuration

From Setup, **View Setup Audit Trail** in the Quick Find box opens a table of the org's most
recent configuration changes: permission set edits, profile changes, security setting updates,
new Apex classes, Flow versions, sharing rule changes, and more — each row showing the **Date**,
the **User** who made it, and the **Action** taken.

![The "View Setup Audit Trail" Setup page, listing recent entries with Date, User, Source Namespace Prefix, Action, and Section columns — several rows showing permission set field-level security changes made by the same user within seconds of each other.](/courses/salesforce-administration/ch05/34-monitoring-setup-audit-trail-and-login-history/setup-audit-trail-list.png)
*The default view shows the last 20 changes — download the full six months as a CSV when you need more than that.*

The page itself only displays the most recent entries, but a **download link** lets an admin pull
the full **six months** of setup change history as a CSV — the practical way to investigate
something that happened further back than the on-screen list reaches.

## Login History: who logged in, and from where

Login History is a completely separate page, reached the same way — type **Login History** into
the same Quick Find box.

![Setup's Quick Find box with "login history" typed in, and "Login History" highlighted as the matching result under the Identity section.](/courses/salesforce-administration/ch05/34-monitoring-setup-audit-trail-and-login-history/login-history-quick-find.png)
*Same habit, different tool — Quick Find is how an admin reaches almost everything in Setup, audit trail included.*

Opening it shows every login attempt — successful or failed — with **Username, Login Time, Source
IP, Location, Login Type, Status, Browser, Platform,** and more per row.

![The Login History Setup page, showing a table of login records with Username, Login Time, Source IP, Location, Login Type, Status, Browser, and Platform columns, each row showing a successful Application login.](/courses/salesforce-administration/ch05/34-monitoring-setup-audit-trail-and-login-history/login-history-results.png)
*Status alone tells you success or failure; Source IP and Location are what you check when a login looks like it shouldn't have happened.*

Like Setup Audit Trail, Login History retains **six months** of data, downloadable as CSV or GZIP
for anything beyond what's displayed on screen.

## Two tools, two different questions

It's easy to blur these together since they're both "history" pages reached the same way, but
they answer genuinely different questions:

| | Setup Audit Trail | Login History |
|---|---|---|
| Answers | "Who changed *this setting*?" | "Who logged in, from where, and did it succeed?" |
| Tracks | Configuration changes in Setup | Login attempts (success and failure) |
| Typical use | Investigating an unexpected permission or setting change | Investigating a suspicious or failed login |

Neither one replaces **Field History Tracking**, either — that tool covers changes to *record
data*, not org configuration or logins. A full picture of "what happened in this org" usually
means checking more than one of these three, depending on the question being asked.

## Why this matters

When something in an org looks wrong — a permission that shouldn't exist, a user who says they
never logged in from that location — these two pages are often the fastest way to get a factual
answer before escalating. They're read-only, built-in, and require no setup of their own beyond
knowing where to look.

## Key terms

| Term | Meaning |
|---|---|
| Setup Audit Trail | Setup page recording configuration changes — who changed what, and when |
| Login History | Setup page recording every login attempt, successful or failed, with IP and location |
| Retention window | Six months of history for both tools, downloadable as CSV beyond the on-screen view |
| Field History Tracking | The separate, Chapter 3 tool for tracking changes to record field values (not configuration or logins) |

## Check yourself

A user reports a Flow stopped working, and an admin suspects someone changed a validation rule by
accident. Which tool answers that question — Setup Audit Trail, Login History, or Field History
Tracking — and why?
