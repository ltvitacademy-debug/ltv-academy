# Lesson 2 — Variables and Data Types

**Chapter 1 · Apex Fundamentals · Lesson 2 of 43**

## What you'll learn

- Apex's primitive data types: Integer, Double, Decimal, Boolean, String, Id, Date, Datetime, Blob
- How to declare and assign variables
- Why every uninitialized Apex variable starts out `null`
- What makes the `Id` type special

## Declaring variables

Because Apex is strongly typed, every variable declaration states its type
up front:

```apex
Integer recordCount = 0;
String accountName = 'Acme Corporation';
Boolean isActive = true;
Decimal unitPrice = 19.99;
```

Salesforce's rule for uninitialized variables is blunt: **all Apex
variables, whether they're class member variables or method variables, are
initialized to `null`.** Nothing defaults to `0` or `false` on its own —
you have to set it:

```apex
Boolean isWinner;      // null, not false, until you assign it
Boolean isReady = false; // explicitly set
```

## The primitive types you'll use constantly

| Type | Holds | Example |
|---|---|---|
| `Integer` | A 32-bit whole number (-2,147,483,648 to 2,147,483,647) | `Integer i = 1;` |
| `Double` | A 64-bit number with a decimal point | `Double pi = 3.14159;` |
| `Decimal` | An arbitrary-precision number — what currency fields use | `Decimal price = 19.99;` |
| `Boolean` | `true`, `false`, or `null` | `Boolean isActive = true;` |
| `String` | Text in single quotes, no length limit beyond heap size | `String s = 'Hello';` |
| `Id` | An 18-character Salesforce record identifier | `Id acctId = '001000000abcDEF';` |
| `Date` | A calendar day, no time component | `Date d = Date.today();` |
| `Datetime` | A specific day and time | `Datetime dt = Datetime.now();` |
| `Blob` | Binary data as a single object | used for files, attachments, Crypto |

## Decimal vs. Double

Both hold numbers with decimal points, but they're not interchangeable in
practice. `Decimal` is Apex's arbitrary-precision numeric type, and Apex
automatically assigns it to currency fields. If you don't explicitly set a
`Decimal`'s scale (its number of decimal places), the scale is inferred
from wherever the value came from — a query field, a String, or another
number.

```apex
Decimal total = 100.5;       // scale inferred as 1
Decimal rounded = total.setScale(2); // now 100.50
```

## The Id type

`Id` is worth calling out on its own: it holds any valid 18-character
Salesforce record identifier.

```apex
Id accountId = '001000000abcDEFAAO';
```

If you assign a 15-character value, Apex silently converts it to its
18-character form for you. Assign something that isn't a valid record Id
at all, and Apex rejects it with a runtime exception — this is type
checking doing real work, not just decoration.

## Date vs. Datetime

`Date` holds a calendar day with no time; `Datetime` holds a day *and* a
time, like a timestamp. Always create both using a system static method
rather than typing a literal:

```apex
Date today = Date.today();
Datetime now = Datetime.now();
```

You can add or subtract an `Integer` from a `Date` to shift it by days, but
you cannot do arithmetic between two `Date` values directly — use the
`Date` class's own methods for that instead.

## Key terms

| Term | Meaning |
|---|---|
| Strongly typed | Every variable's type is fixed and checked at compile time |
| Primitive data type | A built-in, non-object type like Integer, String, or Boolean |
| `null` | The default value of every uninitialized Apex variable |
| `Id` | An 18-character Salesforce record identifier type |
| Scale | The number of decimal places tracked by a `Decimal` value |

## Lab

In the Developer Console's Execute Anonymous window, run:

```apex
Integer recordCount;
System.debug('Before assignment: ' + recordCount); // prints null

recordCount = 42;
String greeting = 'There are ' + recordCount + ' records.';
Decimal price = 9.5;
Date today = Date.today();

System.debug(greeting);
System.debug('Price scale: ' + price.scale());
System.debug('Today: ' + today);
```

Confirm in the debug log that the first `System.debug` really does print
`null`.

## Check yourself

What value does an uninitialized `Integer` variable hold the instant it's
declared, and what's the practical difference between `Decimal` and
`Double`?
