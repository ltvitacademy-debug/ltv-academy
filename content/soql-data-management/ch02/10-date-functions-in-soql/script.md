# Script — Date Functions in SOQL

## Segment 1 (title)

Almost every real reporting question has a time dimension. What closed this quarter, which cases came in last week, how revenue trended by year. SOQL gives you date literals and date functions for exactly that, and this lesson closes Chapter Two.

## Segment 2 (code: writing dates)

Dates in SOQL are never quoted. A date field uses year, month, day. A datetime field adds a T, the time, and a Z. Hard-coding dates works, but the query goes stale as soon as the calendar moves. Date literals fix that.

## Segment 3 (code: date literals)

A date literal is a keyword Salesforce resolves against the current date every time the query runs. TODAY, YESTERDAY, THIS underscore MONTH, NEXT underscore QUARTER, and rolling windows like LAST underscore N underscore DAYS colon 30. Also unquoted. Period literals like THIS MONTH are ranges, so CloseDate equals THIS MONTH means anywhere in this month. The fiscal versions follow your org's fiscal year.

## Segment 4 (code: date functions)

Date functions extract part of a date. CALENDAR YEAR, CALENDAR QUARTER, CALENDAR MONTH, and fiscal equivalents that follow your org's fiscal calendar. Their best use is in GROUP BY. This query returns one row per year of closed-won revenue. It's Lesson 8's grouping, with a date function.

## Segment 5 (steps: fiscal quarters and time zones)

Two cautions. Grouping by fiscal quarter alone would merge quarter one of every year, so add FISCAL YEAR as well. And for datetime fields like CreatedDate, wrap the field in convertTimezone so date boundaries follow the user's time zone.

## Segment 6 (outro)

That closes Chapter Two. You can summarize, group, filter groups, and slice by time. Next up: Chapter Three, starting with Lesson 11, parent-to-child queries.
