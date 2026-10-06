# Business Hours and Holidays

**Chapter 2 · Configuring the Organization · Lesson 12 of 36**

Support teams aren't available around the clock, and the clock they *are* available on often
spans multiple time zones. Salesforce tracks this with two linked setup objects: **Business
Hours**, which define when your team is working, and **Holidays**, which define the days (or
hours) you aren't — even during normal business hours. Together they drive case escalation
rules, milestones, and entitlement processes across Service Cloud.

## What you'll learn

- What Business Hours records control, and how more than one can exist in an org
- How to read and edit a weekly Business Hours grid
- What a Holiday record is, and how it attaches to one or more Business Hours
- Why these two objects matter even if you've never built an escalation rule yet

## Business Hours: more than one clock

From Setup, enter **Business Hours** in the Quick Find box. An org can have many Business Hours
records — one per support team, region, or time zone, not just a single global clock. Each
record has a name (ideally one that signals its region, like "EMEA Support Hours"), a time zone,
an Active checkbox, and an optional "use as default" flag that makes it the default business
hours on new cases.

The heart of a Business Hours record is a simple weekly grid: a start and end time for each day
of the week, with a "24 hours" checkbox per day for teams that never close. Leave a day's times
blank and that day is treated as fully closed.

![A Business Hours edit form showing a weekly grid: Sunday through Saturday, each with Start Time and End Time dropdowns defaulted to 8:00 AM and 4:00 PM on weekdays, and a 24-hours checkbox per day.](/courses/salesforce-administration/ch02/12-business-hours-and-holidays/business-hours-weekly-grid.png)
*Blank start/end times on a day mean that day is closed, not "unset."*

## Holidays: exceptions to the normal week

A Holiday record is a specific date (or recurring date, like every New Year's Day) that
overrides a Business Hours record's normal weekly schedule — even if that date would otherwise
fall inside business hours. From Setup, enter **Holidays** in the Quick Find box, click **New**,
give it a name and a date, and either mark it **All Day** or set specific from/to times for a
partial-day closure.

![A Holiday Detail edit form with fields for Holiday Name ("Martin Luther King Jr. Day"), Description, Date, a Time range with an All Day checkbox selected, and a Recurring Holiday checkbox.](/courses/salesforce-administration/ch02/12-business-hours-and-holidays/holiday-detail-form.png)
*A holiday isn't useful on its own — it has to be associated with one or more Business Hours records (via the Business Hours related list on the holiday) to actually suspend anything.*

## Why they're paired

A holiday with no Business Hours associated does nothing. The pairing matters because
escalation rules, milestones, and entitlement processes all calculate their due times against a
specific Business Hours record — and that calculation needs to know not just "is it currently
within the weekly grid" but also "is today a holiday for this business hours record." Up to
1,000 holidays can be associated with a single Business Hours record, and a holiday
automatically takes on the time zone of whichever Business Hours record it's attached to.

![Setup's Company Settings menu showing Business Hours and Holidays as separate, adjacent entries alongside Company Information and Fiscal Year.](/courses/salesforce-administration/ch02/12-business-hours-and-holidays/company-settings-menu.png)
*Business Hours and Holidays are configured as two separate pages, but they only do anything useful together.*

## Key terms

| Term | Meaning |
|---|---|
| Business Hours | A named weekly schedule (with time zone) defining when a team is considered "open" |
| Holiday | A specific date or recurring date that suspends one or more Business Hours records |
| Default Business Hours | The Business Hours record automatically applied to new cases when none is specified |
| Escalation rules / Milestones / Entitlements | Service Cloud features that calculate due times against a Business Hours record, honoring any attached holidays |

## Check yourself

Your org has "US Support Hours" and "EMEA Support Hours" as two separate Business Hours
records. You create a single Holiday for December 25th. Does it automatically apply to both? Why
or why not?
