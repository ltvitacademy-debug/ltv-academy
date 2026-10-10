# Lesson 3 — Variables and Data Types

**Chapter 1 · Programming Concepts · Lesson 3 of 18**

## What you'll learn

- What a variable is, and why programs need named storage for values
- What a data type is, and why a language needs to know a value's type
- Apex's core primitive types: Integer, Double, Decimal, String, Boolean, Date, Datetime, and Id
- Why Apex is a strongly, statically typed language, and what that means day to day

## A variable is a labeled box

A **variable** is a named location in memory that holds a value a program can refer to, use, and change while it runs. Instead of writing the number `10` five times in five different places and hoping you typed it the same way each time, you store it once, give it a name, and refer to that name everywhere you need it. Declaring a variable in Apex looks like this:

```apex
Integer orderCount = 10;
```

This line does three things at once: it declares a variable named `orderCount`, states that it will hold an `Integer` value, and assigns it an initial value of `10`. After this line runs, `orderCount` can be used anywhere else in that block of code, and its value can change later with a plain assignment: `orderCount = 11;`.

## Why type matters

A **data type** tells the language what kind of value a variable holds and, critically, what operations are valid on it. You can add two numbers together; you can't meaningfully "add" two true/false values the same way. A language that didn't track types would have no way to catch a mistake like trying to multiply a customer's name by their order total — it's a meaningless operation, and type-checking is what lets a compiler reject it before the program ever runs, rather than producing garbage output at runtime.

Apex is **strongly and statically typed**: every variable's type is declared up front and fixed for that variable's lifetime ("statically"), and the compiler enforces that only operations valid for that type are allowed ("strongly"). This is different from a dynamically typed language, where a variable's type can be whatever its current value happens to be and can change at any point. Apex's static typing means a whole category of mistakes — assigning a String into a variable declared as an Integer, for instance — gets caught at compile time, before the program runs at all, rather than surfacing as a confusing runtime failure.

## Apex's core primitive types

Apex's primitive data types cover the basic building blocks nearly every program needs:

```apex
Integer orderCount = 10;
Double shippingWeight = 4.5;
Decimal orderTotal = 149.99;
String customerName = 'Jordan Lee';
Boolean isActive = true;
Date signupDate = Date.newInstance(2026, 3, 14);
Datetime lastLogin = Datetime.now();
Id accountId;
```

A few details worth being deliberate about:

- **Integer** holds a whole number with no decimal point.
- **Double** holds a number with a decimal point, used for general floating-point math.
- **Decimal** also holds a number with a decimal point, but is the type Apex code typically reaches for when precision matters — money being the most common example, since currency math that silently loses a fraction of a cent is a real problem.
- **String** values are written in Apex with **single quotes**, not double quotes — `'Jordan Lee'`, never `"Jordan Lee"`. This trips up developers coming from languages that use double quotes for strings.
- **Boolean** holds only `true`, `false`, or `null` — nothing else.
- **Date** holds a calendar day with no time component; **Datetime** holds both a date and a specific time.
- **Id** is a type specific to the Salesforce platform: it represents a valid Salesforce record identifier. You'll work with it constantly once you reach the Apex-specific courses later in this path, since almost everything in Salesforce is identified by an Id.

## Every variable starts as null

One Apex-specific detail worth knowing early: an Apex variable that's declared but not explicitly assigned a value — like the `accountId` line above — doesn't default to zero, an empty string, or `false`. It defaults to **null**, meaning "no value at all." Treating null as if it were a real value (trying to use a null String as though it held text, for example) is one of the most common sources of runtime errors in Apex, and Chapter 2's lesson on errors and exceptions comes back to this directly.

## Key terms

| Term | Meaning |
|---|---|
| Variable | A named location in memory that holds a value a program can refer to and change |
| Data type | What kind of value a variable holds, and what operations are valid on it |
| Statically typed | A variable's type is fixed at declaration and checked by the compiler |
| Strongly typed | The compiler only allows operations that are valid for a given type |
| Null | The absence of a value; the default state of a declared-but-unassigned Apex variable |

## Lab

Write Apex-style variable declarations (you don't need a Salesforce org to do this — just write the code) for the following five pieces of data about a single customer order: an order number (whole number), an order total (money, needs precision), a customer name (text), whether the order has shipped yet (true/false), and the date the order was placed. For each one, write one sentence explaining why you picked that specific type over a plausible alternative (for example, why Decimal instead of Double for the order total).

## Check yourself

Can you explain why Apex requires single quotes for String literals, and what would happen if you used double quotes instead? Can you explain, without notes, what value an uninitialized `Boolean` variable holds in Apex, and why that matters the first time you try to use it in a condition?
