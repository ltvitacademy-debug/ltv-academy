# Script — Combining Leads, Opportunities & Cases

## Segment 1 (title)

Leads, pipeline, and service on one page. Each lives on a different object, and the most interesting question sits between two of them. Today is about thinking across objects.

## Segment 2 (steps)

Draw the map first. A lead connects to the rest only at conversion, when it becomes or links to an account, a contact, and maybe an opportunity. Opportunities belong to an account. Cases belong to an account. So opportunities and cases meet at the account, and your at-risk question is an account-level question.

## Segment 3 (screenshot)

Here's a real cross-object report from Trailhead sample data: campaigns with opportunities and revenue. One report type spans two objects, and the total amount sits above the rows. Standard report types bridge some relatives. But no single standard type puts opportunities and cases side by side.

## Segment 4 (code)

Custom report types let an admin define the objects, but the chain has limits. It's a chain, not a tree, so you generally can't bring in opportunities and cases as siblings. Confirm current limits in your org before promising anything.

## Segment 5 (code)

Cross filters get you closer. Start from an accounts report. Add accounts with open opportunities, and accounts with open, high priority cases. You get a clean list of at-risk accounts, without duplicated rows, but no dollar totals. Joined reports are a good exploration tool, but check their dashboard limits.

## Segment 6 (code)

Beware fan-out. When a parent joins to several children, its amount repeats for each child. A fifty thousand dollar opportunity on an account with three open cases can be counted three times. If totals look too high, suspect fan-out. Then reconcile.

## Segment 7 (code)

SOQL answers the dollars question directly. Sum the amount of open opportunities closing this quarter, where the account is in a subquery of open, high priority cases. Illustrative answer: 38 accounts and about 0.4 million, or 19 percent of pipeline. Export with Data Loader if you need Excel or Tableau.

## Segment 8 (outro)

Reach for CRM Analytics or Tableau when you need row-level blending across many objects, outside data, or volume that strains reports. Both need licensing and setup. Otherwise, native plus one SOQL-backed number may be enough. Choose deliberately, say why. Next, lesson seventeen: data cleaning at scale.
