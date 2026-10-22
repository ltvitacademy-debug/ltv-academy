# Lesson 23 — Forms & Lists Lab

**Chapter 5 · Forms & Lists · Lesson 23 of 34**

## What you'll learn

- How to add a column to a list view using List Layout, in words
- How to build a two-condition filter with AND, and read the breadcrumbs it produces
- How to group a filtered list by a column without changing its underlying records
- What related lists you'd expect to see — and not see — on one specific incident

## The scenario

You're customizing the Incident list view for the Service Desk team. Your lead wants four things
done before the morning shift starts: add a "Caller" column to the list, filter it down to active
incidents assigned to the Service Desk group, group the result by priority, and confirm what
related lists a team member would actually see if they opened one of those incidents. Nothing
here requires a screenshot — every step tells you exactly what to configure and what you'd expect
to see change.

## Step 1 — Add the Caller column

Open the Incident list, right-click any column header, and choose **List Layout** from the
context menu (or use the Configure gear if your instance surfaces it there instead). In the
two-column picker, find "Caller" in the list of available fields on the left and move it into the
shown-columns list on the right, then use the up/down control to position it right after "Short
description" — the Service Desk team wants to see who opened the incident without scrolling right.
Save. The list now shows a Caller column, in that position, for everyone using this particular
list view. No incident record changed; only the layout of this view did.

## Step 2 — Filter to active Service Desk incidents

Click the filter icon above the columns to open the condition builder. Set the first row to
**Active** / **is** / **true**, then click the plus icon to add a second row: **Assignment
group** / **is** / **Service Desk**. Confirm the toggle between the two rows is set to **AND** —
you want records matching both conditions, not either one alone. Click Run. The breadcrumb trail
above the list now reads something like "Active is true AND Assignment group is Service Desk,"
and the record count drops to only the incidents meeting both conditions. Underneath, that filter
is the same thing as the encoded query `active=true^assignment_group=Service Desk` from Lesson
21 — you just built it visually instead of typing it.

## Step 3 — Group by priority

Right-click the Priority column header and choose **Group By**. The filtered list reorganizes
into clusters — all Priority 1 records first, then Priority 2, and so on — each cluster under its
own collapsible header showing how many records it contains. The filter from Step 2 is still
fully in effect; grouping only changes how those same already-filtered records are presented. A
Service Desk lead scanning this grouped, filtered list can immediately see whether any Priority 1
incidents are sitting in their queue, without reading every row.

## Step 4 — Check what related lists would appear

Opening any one incident from this filtered, grouped list shows its form, and scrolling down
reveals its related lists — likely **Affected CIs** (if a configuration item was tagged),
**Related Problems** (only if this incident has actually been linked to a Problem record as a
root cause), and **Approvals** (only if this specific incident's workflow has generated one). The
key thing to confirm, and the thing a newer admin often gets wrong: an incident with no linked
Problem record simply shows an empty Related Problems list, not a missing one — the related list
itself is still configured to appear on every Incident form; it's the underlying query that
returns zero rows for this particular incident.

## What you just practiced

You moved a column with List Layout, built a two-condition AND filter and read its breadcrumb
trail, grouped an already-filtered list without touching its underlying records, and correctly
distinguished between a related list that's configured-but-empty and one that isn't configured at
all. That combination — layout, filter, grouping, and related-list literacy — is exactly what a
Service Desk admin uses every single morning before the first hand-off meeting.

## Key terms

| Term | Meaning |
|---|---|
| List Layout | Used in Step 1 to add and position the Caller column |
| AND condition | Used in Step 2 to require both Active and Assignment group to match |
| Group By | Used in Step 3 to cluster the filtered list by Priority |
| Configured-but-empty related list | A related list that still appears on the form even when its query returns zero matching records |

## Try it yourself

Before moving to Chapter 6, repeat this lab on your own developer instance using a different
assignment group and a different grouping column, and open one real incident to confirm for
yourself which related lists show data and which show an empty, but still present, list.
