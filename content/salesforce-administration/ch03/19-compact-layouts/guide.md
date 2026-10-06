# Compact Layouts

**Chapter 3 · Objects and Layouts · Lesson 19 of 36**

Open any record in Lightning Experience and the first thing you see, above the Details and
Related tabs, is a tight strip of three to four key fields — the **highlights panel**. That
panel isn't driven by the page layout from the last lesson at all. It's driven by a separate,
much shorter configuration: the **compact layout**.

## What you'll learn

- What the highlights panel actually is, and which configuration drives it
- How to edit a compact layout's field selection
- The difference between a default compact layout and a custom one
- Why a compact layout stays deliberately small

## The highlights panel, by default

Every object ships with a default compact layout. On Case, for example, the out-of-the-box
highlights panel shows **Priority**, **Status**, and **Case Number** — enough to orient a user
at a glance before they scroll into the full record.

![A live Case record's highlights panel showing Priority: Low, Status: New, and Case Number: 00001002, above Feed and Related tabs.](/courses/salesforce-administration/ch03/19-compact-layouts/default-highlights-panel.png)
*Three fields, no scrolling required — that's the entire point of a compact layout.*

## Editing a compact layout

From Object Manager, select an object, then **Compact Layouts**, then **New** (or edit an
existing one). The edit screen is deliberately simple: a **Label** and **Name** for the compact
layout, then two columns — **Available Fields** on the left, **Selected Fields** on the right —
with an **Add** button to move fields across and **Up/Top/Down/Bottom** controls to set their
order.

![A "Compact Layout Edit" screen titled "Case Highlights": Available Fields on the left (Product, Service Contract, SLA Violation, Type, Web Company, etc.), Selected Fields on the right (Subject, Priority, Status, Case Number, Case Origin, Case Reason), an Add button, and Top/Up/Down/Bottom reorder controls.](/courses/salesforce-administration/ch03/19-compact-layouts/compact-layout-edit.png)
*The same dual-listbox pattern you've now seen for navigation items and user profiles — move fields across, set the order.*

## What a custom compact layout changes

Swap in a custom compact layout and the highlights panel changes immediately — same record,
completely different field set up top, because a different compact layout is now assigned.

![The same Case record's highlights panel after a custom compact layout is applied: Status: New, Case Number: 00001002, Case Origin: Web, and Case Reason: Installation — a different field set than the default panel.](/courses/salesforce-administration/ch03/19-compact-layouts/custom-highlights-panel.png)
*Priority dropped out, Case Origin and Case Reason came in — the admin decided which four fields matter most for this team's cases.*

## Why compact layouts stay small

A compact layout is meant to answer "what is this record, at a glance" — not replace the full
page layout. There's no hard rule stopping you from adding more fields, but the highlights panel
has limited visual real estate, and a panel crowded with eight or ten fields defeats the purpose:
a user scanning a list of open cases needs to recognize the important ones in a glance, not read
a second detail page before the first one even loads.

## Key terms

| Term | Meaning |
|---|---|
| Highlights panel | The strip of key fields shown at the top of a Lightning record, above Details/Related |
| Compact layout | The short, separate configuration (not the page layout) that drives the highlights panel |
| Default compact layout | The out-of-the-box compact layout every object ships with |
| Compact Layout Edit | The Object Manager screen for choosing and ordering a compact layout's fields |

## Check yourself

A record's Details tab shows a dozen fields from its page layout, but its highlights panel shows
only three. Why doesn't the highlights panel grow when the page layout gains more fields?
