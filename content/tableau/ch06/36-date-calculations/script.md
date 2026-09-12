# Script — Date Calculations

## Segment 1 (title)

Date Calculations. Tableau has a full set of date functions for measuring distances between dates, shifting dates forward and backward, and pulling individual pieces out of a date — this lesson covers the ones you'll use constantly.

## Segment 2 (code: distance between two dates)

DATEDIFF is the function you'll use constantly once you're working with order and ship dates. Days to Ship equals DATEDIFF, 'day', comma, Order Date, comma, Ship Date. The first argument is the date part you want the difference measured in — day, week, month, quarter, or year are the ones you'll use most.

## Segment 3 (code: shifting a date)

DATEADD moves a date forward, or backward with a negative number, by a given interval. Follow-Up Date equals DATEADD, 'month', 3, Order Date — that returns a real date, three months after Order Date, useful for anything needing a future or past reference point.

## Segment 4 (code: extracting a piece)

Two closely related functions extract one component of a date. DATEPART returns a number — the month as 7, for instance. DATENAME returns a string instead — Order Month Name equals DATENAME, 'month', Order Date, which returns "July." Use DATEPART for sorting or math, DATENAME for something readable on a label.

## Segment 5 (code: rounding down to a period)

DATETRUNC rounds a date down to the start of whatever period you specify. Order Month equals DATETRUNC, 'month', Order Date — if Order Date is July 17th, this returns July 1st, still a real date, just snapped to the start of the month. This is exactly how Tableau builds its own date hierarchies under the hood.

## Segment 6 (outro)

Next lesson, IF, THEN, ELSE, and CASE — writing conditional logic into a calculated field so it returns different results depending on what's true.
