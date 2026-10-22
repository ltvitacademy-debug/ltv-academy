# Lesson 9 — Navigation Lab

**Chapter 2 · Navigation & Workspaces · Lesson 9 of 34**

## What you'll learn

- How to combine everything from this chapter into one realistic task, start to finish
- The exact steps to jump straight to the Incident table's list view without browsing menus
- How to build a filter condition on a list using the condition builder, in words
- How to confirm a personal preference (time zone) without touching any system-wide setting

## The scenario

You're a new ServiceNow admin on your first day. Your manager asks you to do three things before
your first stand-up: open the Incident table's list view, narrow it down to only the incidents
assigned to the Network assignment group, and double-check that your own time zone preference is
set correctly so the timestamps you see match your local time. Nothing here requires any
screenshot — every step below tells you exactly what to type, where to click, and what label to
look for, the same way you'd describe it to a coworker over a phone call.

## Step 1 — Jump straight to the Incident table's list view

Instead of expanding the Incident application in the Application Navigator and hunting for an
"All" module, use the direct-navigation shortcut from Lesson 5. Click into the Application
Navigator's filter box at the top of the left-side panel, type `incident.list`, and press Enter.
This opens the `incident` table's list view immediately — every incident record you have
permission to see, in a plain list, with no module and no pre-applied filter standing between you
and the raw table.

## Step 2 — Filter to the Network assignment group

At the top of the list, above the column headers, is a breadcrumb reading something like
"Incident > All," and next to it a filter icon (a funnel) that opens the **condition builder**.
Click that filter icon. In the condition builder, set the first field to **Assignment group**,
set the operator to **is**, and set the value to **Network**. Click the **Run** button (or the
green checkmark, depending on your instance's styling) to apply the condition. The list refreshes
to show only incidents whose Assignment group field is set to Network — the breadcrumb updates to
reflect the active filter, and the record count in the list header drops to match. If you expect
to need this exact view again tomorrow, this is also the moment you'd save it, either by adding
the filtered list to your Favorites from Lesson 5 or by saving it as a named list view.

## Step 3 — Check your personal time zone preference

Timestamps on the list you just filtered — Opened, Updated, and so on — display according to
*your* personal time zone preference, not a system-wide setting. To check it, click your own
profile picture or avatar in the top-right corner of the header to open the user menu, and look
for your profile or preferences option. Your time zone field shows the value currently set for
your account — for example, "US/Eastern." If it's wrong, correct it here, in your own profile
menu. You would never go looking for this in the System Properties application: that's
instance-wide configuration, and your personal time zone is exactly the kind of setting from
Lesson 8 that belongs to you alone and never to the whole instance.

## What you just practiced

In three steps, you used the direct-navigation shortcut to skip the module tree entirely, built a
real filter condition on a live table without being handed a pre-made module, and correctly
routed a personal-preference question to the profile menu instead of an admin-only settings
application. That's the exact sequence — shortcut, filter, correct scope — that separates someone
who's merely seen ServiceNow from someone who can actually move around it under pressure on day
one.

## Key terms

| Term | Meaning |
|---|---|
| Direct-navigation shortcut | Typing `incident.list` into the Application Navigator's filter box to open a table's list view directly |
| Condition builder | The filter interface (opened via the funnel icon) used to build conditions like "Assignment group is Network" |
| Assignment group | The field on Incident identifying which support group a record is routed to |
| Personal time zone | A per-user preference controlling how that user sees dates/times, set from the profile menu, never from System Properties |

## Try it yourself

Before moving to Chapter 3, repeat this lab from memory on your own developer instance: jump to
`incident.list`, filter to a different assignment group of your choosing, and confirm your own
time zone preference — without opening the Application Navigator's tree even once.
