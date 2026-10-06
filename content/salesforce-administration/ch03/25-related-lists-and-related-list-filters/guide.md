# Related Lists and Related List Filters

**Chapter 3 · Objects and Layouts · Lesson 25 of 36**

A record rarely tells the whole story by itself. An Account's real context is everything
connected to it — its Opportunities, its Contacts, its open Cases. **Related lists** are how
Salesforce surfaces that connected data directly on the parent record, and the modern
**Dynamic Related List** component is what lets an admin shape exactly which rows show up,
not just which columns.

## What you'll learn

- Where a related list component lives on a Lightning record page
- What a related list's columns actually are, and how they're configured
- What a Dynamic Related List adds on top of a standard related list
- Why filtering a related list is a meaningfully different capability than filtering a report

## The related list component

On a Lightning Record Page built in **Lightning App Builder**, a related list is a draggable
component like any other — placed on the page, pointed at a specific related object (Opportunities,
Orders, Assets), with its own settings panel on the right.

![The Lightning App Builder, with the Related List - Single component selected on an Account Record Page, and a right-hand panel titled "Upgrade to Dynamic Related Lists" with an Upgrade Now button, an arrow pointing at the Opportunities related list on the canvas.](/courses/salesforce-administration/ch03/25-related-lists-and-related-list-filters/dynamic-related-list-config.png)
*Every related list on a record page starts as a component here — and Salesforce surfaces the upgrade path right where you're already configuring it.*

A standard related list renders its rows in a fixed table — the columns an admin chose, the data
exactly as it exists on the related records.

![An Assets related list table with six rows, showing columns for Asset Name, Serial Number, Install Date, Quantity, Contact Name, and Status.](/courses/salesforce-administration/ch03/25-related-lists-and-related-list-filters/assets-related-list-table.png)
*Straightforward, but fixed — a standard related list shows every related record, in whatever columns were configured, with no filtering of its own.*

## Dynamic Related Lists: filtering what shows up

A standard related list shows *every* related record. A **Dynamic Related List** (the "Related
List - Single" component, upgraded) adds real configuration: its own label, its own set of
columns, a sort field and order, a record limit — and critically, **filters**, so two different
Dynamic Related Lists pointed at the same object can show entirely different slices of it. One
list could show only open Opportunities; a second, on the same page, only closed ones.

![A Dynamic Related List - Single configuration panel, with Parent Record set to "Use This Account," Related List set to "Opportunities," Related List Type set to "List," Number of Records to Display set to 10, Related List Fields listing Opportunity Name/Stage/Amount/Close Date, Sort Field set to Close Date, Sort Order Ascending.](/courses/salesforce-administration/ch03/25-related-lists-and-related-list-filters/account-related-lists.png)
*Label, fields, sort, record count, and filters — all configured per related list, not inherited from the object's default layout.*

## Why a filtered related list matters

Without filtering, a busy Account with 40 closed-lost Opportunities buries the three open ones a
rep actually needs to see today. A Dynamic Related List filtered to **Stage is not Closed** solves
that directly on the record page — no separate report, no extra click, and no dependency on the
underlying page layout the way older related-list customization required. This is also where
related lists start to resemble reports: same idea of filtering rows to what matters, but living
directly on the record instead of in a separate tab.

## Why this matters

A record page with the right related lists, correctly filtered and sorted, turns a cluttered wall
of every connected record into exactly the slice a user needs for their job — the open
opportunities for a rep, the active contracts for a support agent. That's a meaningful amount of
daily friction removed for a one-time admin configuration.

## Key terms

| Term | Meaning |
|---|---|
| Related list | A component on a record page showing records connected to the current one |
| Dynamic Related List | The upgraded related list component with its own filters, sort, and field selection |
| Related List Type | Whether a Dynamic Related List renders as a List, Board, or other display format |
| Upgrade to Dynamic Related Lists | The Lightning App Builder prompt that converts a standard related list to a dynamic one |

## Check yourself

Why can two Dynamic Related Lists pointed at the same related object, on the same record page,
show two completely different sets of records?
