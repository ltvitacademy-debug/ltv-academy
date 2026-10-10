# Lesson 32 — Working With Dates, Times and Strings

**Chapter 4 · Governor Limits and Design · Lesson 32 of 43**

## What you'll learn

- `Date` vs. `Datetime` vs. `Time`, and when to use each
- Common `Date`/`Datetime` methods: creating, comparing, and adding intervals
- Common `String` methods used constantly in real Apex: `trim`, `split`, `contains`, `startsWith`, `toLowerCase`, `isBlank`
- Why `String.isBlank()` is usually safer than a plain null check
- A realistic example combining both: parsing and validating a date range from a user-supplied string

## Date, Datetime, and Time

Lesson 2 introduced `Date` and `Datetime` as primitive types. To recap precisely: a `Date` holds a calendar day with no time component; a `Datetime` holds a specific day and time (a timestamp); and a related type, `Time`, holds a time of day with no date. Salesforce's own guidance is to create these values with the built-in static methods rather than parsing strings by hand wherever possible:

```apex
Date today = Date.today();
Datetime rightNow = Datetime.now();
Date specificDay = Date.newInstance(2026, 12, 31);
```

## Common Date/Datetime methods

```apex
Date closeDate = Date.today().addDays(30);       // 30 days from today
Date nextMonth = Date.today().addMonths(1);
Boolean isPast = closeDate < Date.today();        // Dates support direct comparison operators

Datetime created = Datetime.now();
Datetime oneHourLater = created.addHours(1);
String formatted = created.format('MM/dd/yyyy HH:mm');
```

`Date` and `Datetime` values support the standard comparison operators (`<`, `>`, `<=`, `>=`, `==`) directly, which is what makes a check like `opp.CloseDate < Date.today()` (an overdue Opportunity) read naturally.

## Common String methods

A handful of `String` methods come up constantly in real Apex code:

```apex
String raw = '  Acme Corp  ';
String cleaned = raw.trim();              // 'Acme Corp'
Boolean empty = String.isBlank(raw);      // false -- isBlank checks for null OR empty/whitespace-only

List<String> parts = 'a,b,c'.split(',');  // ['a', 'b', 'c']

String email = 'Jane.Doe@Example.com';
Boolean looksCorporate = email.toLowerCase().endsWith('@example.com');
Boolean mentionsAcme = email.contains('acme'); // case-sensitive; would be false here
```

## Why String.isBlank() beats a plain null check

A plain `someString == null` check misses the extremely common case of an empty string (`''`) or a string containing only whitespace (`'   '`) — both of which are "not null" but still effectively meaningless input. `String.isBlank()` catches all three cases (`null`, `''`, and whitespace-only) in one call, which is why this course prefers it over a bare null check anywhere user-supplied or imported text is involved:

```apex
String userInput = '   ';
if (userInput == null) {
    System.debug('would NOT catch this case'); // never runs — userInput isn't null
}
if (String.isBlank(userInput)) {
    System.debug('correctly caught as blank'); // runs
}
```

## Putting it together: validating a date range

```apex
String startStr = '2026-11-01';
String endStr = '2026-11-30';

if (String.isBlank(startStr) || String.isBlank(endStr)) {
    throw new IllegalArgumentException('Both dates are required.');
}

Date startDate = Date.valueOf(startStr); // parses a YYYY-MM-DD formatted String
Date endDate = Date.valueOf(endStr);

if (startDate > endDate) {
    throw new IllegalArgumentException('Start date must be before end date.');
}

System.debug('Valid range: ' + startDate + ' to ' + endDate);
```

`Date.valueOf()` parses a `String` in `YYYY-MM-DD` format into a `Date`; it throws an exception if the string isn't in that exact format, which is exactly why real code validates the input is non-blank before attempting to parse it.

## Key terms

| Term | Meaning |
|---|---|
| `Date` | A calendar day with no time component |
| `Datetime` | A specific day and time (a timestamp) |
| `Time` | A time of day with no date |
| `String.isBlank()` | Returns true for null, empty string, or whitespace-only string — safer than a plain null check |
| `Date.valueOf()` | Parses a `YYYY-MM-DD` formatted String into a Date |

## Lab

In the Developer Console's Execute Anonymous window, write a script that: takes a hardcoded `String` representing a customer's full name with extra whitespace (e.g. `'  Jane   Doe  '`), trims it, splits it on whitespace, and prints the first and last parts separately; then takes two hardcoded date strings, validates neither is blank, parses them with `Date.valueOf()`, and prints whether the range is valid (start before end).

## Check yourself

Can you explain, with an example, why `someString == null` is not a sufficient check for "did the user actually provide meaningful text"? What's the difference between `Date`, `Datetime`, and `Time`?
