# Lesson 13 — Changing Data Types

**Chapter 3 · Power Query & Data Cleaning · Lesson 2 of 12**

## What you'll learn

- The most common data types you'll actually use, and their icons
- Four different places in Power Query to change a column's type
- Why a correctly-formatted date can still fail to convert
- How to fix it with the locale-aware "Change type with locale" option

## Reading the icons

Every column heading shows a small icon indicating its current data type —
these controls (from Power Query Online's version of the same menu) show
each one next to its name:

![Screenshot of a row of data type selector controls in Power Query, each showing an icon and name: Decimal Number, Fixed Decimal Number, Whole Number, Percentage, Date/Time, Date.](/courses/power-bi/ch03/13-changing-data-types/data-types-icons.png)
*The icons you'll see constantly: 1.2 for decimal numbers, $ for currency, 123 for whole numbers, % for percentage, and calendar icons for dates and times.*

You don't need to memorize the full list — Text, Whole Number, Decimal
Number, Date, and True/False cover the vast majority of columns you'll
touch in this course.

## Four places to change a type

Power Query gives you the same choice from four different spots, so use
whichever is closest to what you're already doing:

![Screenshot of the Power Query Home ribbon with a Data type dropdown open, listing Decimal number, Currency, Whole number, Percentage, Date/Time, Date, Time, and more, including a "Using locale..." option at the bottom.](/courses/power-bi/ch03/13-changing-data-types/home-tab.png)
*Home ribbon → Data type dropdown. The same list also appears on the Transform tab, by clicking the small icon on a column heading itself, and on the right-click "Change Type" menu.*

## When a "correct" date still fails

Here's where people get tripped up. Consider a Date column, currently
stored as text, that looks perfectly normal:

![Screenshot of a table with a Date column showing values 22/01/2020, 23/01/2020, 24/01/2020, and 25/01/2020, and a Units column.](/courses/power-bi/ch03/13-changing-data-types/locale-sample-original.png)
*Every one of these looks like a valid date. But which part is the day, and which is the month?*

Set the column's type to **Date**, and this happens:

![Screenshot of a table with every row in the Date column showing "[Error]" and a details panel reading "DataFormat.Error: We couldn't parse the input provided as a Date value," with detail "22/01/2020."](/courses/power-bi/ch03/13-changing-data-types/locale-sample-error.png)
*Every row fails. The error explains why: Power Query tried to read "22/01/2020" as month/day/year — and there's no 22nd month.*

This isn't a broken file. It's a **locale mismatch**: the dates are written
day/month/year (the UK convention), but Power Query assumed month/day/year
(the US convention) because that's the region setting on this computer.

## The fix: Change type with locale

Right-click the column header, choose **Change Type**, then **Using
Locale**, and tell Power Query which convention to actually use:

![Screenshot of the "Change column type with locale" dialog, with Data type set to Date and Locale set to English (United Kingdom), showing sample input values like 29/03/2020.](/courses/power-bi/ch03/13-changing-data-types/change-column-type-locale.png)
*Pick the correct data type and the locale the source data was actually written in — English (United Kingdom), in this case.*

Every value converts correctly:

![Screenshot of the same table, now with the Date column correctly typed as dates showing 1/22/2020 through 1/25/2020.](/courses/power-bi/ch03/13-changing-data-types/locale-sample-final.png)
*Same data, correctly interpreted. The display format follows your own locale — but the values are now accurate dates instead of text.*

## When to reach for this

Use **Using Locale** any time you're converting text to a Date, Time, or
number, and the source might come from a different region than your
computer's default settings — international CSV exports, extracts from
systems configured elsewhere, or JSON/web data with unfamiliar date
formats. If you're ever unsure whether a conversion actually parsed
correctly, check for `[Error]` cells before moving on.

## Key terms

| Term | Meaning |
|---|---|
| Data type | The classification (Text, Date, Whole Number, etc.) applied to a column |
| Locale | The language + region combination Power Query uses to interpret text values |
| Change type with locale | The dialog that lets you specify both a target type and the source locale |
| DataFormat.Error | The error shown when a value can't be parsed into the chosen type |

## Lab

1. In any query, right-click a column header and open the **Change Type**
   menu — notice **Using locale** at the bottom.
2. Find a text column that looks like it could be a date, and try
   converting it directly. Check whether any rows show `[Error]`.
3. If you have (or can create) a column with day/month/year-style dates,
   deliberately trigger the error, then fix it with **Using Locale** set to
   a matching region.

## Check yourself

You're ready for Lesson 14 when you can explain, to someone who's never
seen it, why a table full of "valid-looking" dates can still throw
DataFormat.Error — and how Using Locale fixes it.
