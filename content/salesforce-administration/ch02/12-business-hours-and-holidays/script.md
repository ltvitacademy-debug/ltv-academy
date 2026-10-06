# Script — Business Hours and Holidays

## Segment 1 (title)

Support teams aren't available around the clock, and the clock they are available on often spans multiple time zones. Salesforce tracks this with two linked objects: Business Hours, which define when your team is working, and Holidays, which define when they aren't.

## Segment 2 (screenshot: Business Hours weekly grid)

An org can have many Business Hours records — one per team, region, or time zone, not just one global clock. Each record is a simple weekly grid: a start and end time per day, with a 24-hours checkbox for teams that never close. Leave a day blank and it's treated as fully closed.

## Segment 3 (screenshot: Holiday Detail form)

A Holiday record is a specific date, or a recurring one, that overrides the normal weekly schedule. Give it a name and a date, mark it all day or set partial hours, and optionally make it recurring so you don't recreate it every year.

## Segment 4 (screenshot: Company Settings menu)

Business Hours and Holidays are two separate pages in Setup, but a holiday with no business hours attached does nothing on its own. You associate a holiday with one or more Business Hours records — up to a thousand holidays per record — and it inherits that record's time zone automatically.

## Segment 5 (steps: why the pairing matters)

Escalation rules, milestones, and entitlement processes all calculate due times against a Business Hours record. That calculation checks two things: is it currently inside the weekly grid, and is today a holiday for this specific business hours. Both have to be configured for the math to be right.

## Segment 6 (outro)

Next up: Fiscal Year and Currencies, two more org-wide settings that ripple into forecasts and reports the same way Business Hours ripples into case due dates.
