# Lesson 4 — Operators and Expressions

**Chapter 1 · Programming Concepts · Lesson 4 of 18**

## What you'll learn

- What an expression is, and how it differs from a statement
- Arithmetic, comparison, and logical operators, with Apex examples of each
- Why operator precedence matters, and how to remove ambiguity with parentheses
- The difference between `=` (assignment) and `==` (comparison) — a classic beginner mistake

## Expressions produce values; statements do things

An **expression** is any piece of code that evaluates down to a single value. `5 + 3` is an expression; it evaluates to `8`. `orderTotal > 100` is also an expression; it evaluates to either `true` or `false`. A **statement**, by contrast, is a complete instruction — often built around an expression, but doing something with it rather than just being it. `Integer total = 5 + 3;` is a statement: it takes the expression `5 + 3`, evaluates it, and assigns the result to a variable. Nearly every line of code you write is a statement built out of one or more expressions.

## Arithmetic operators

Apex's arithmetic operators work the way they do in ordinary math, with one detail worth flagging:

```apex
Integer sum = 10 + 3;        // 13
Integer difference = 10 - 3; // 7
Integer product = 10 * 3;    // 30
Integer quotient = 10 / 3;   // 3  <-- integer division truncates!
Double preciseQuotient = 10.0 / 3.0; // 3.333...
Integer remainder = 10 % 3;  // 1
```

Dividing two `Integer` values with `/` performs **integer division** — the result is truncated to a whole number, dropping anything after the decimal point, rather than rounding. `10 / 3` is `3`, not `3.33`. Getting a precise decimal result requires at least one of the operands to be a `Double` or `Decimal`. This single detail causes a disproportionate number of beginner bugs, because the code compiles fine and simply produces a quietly wrong number.

## Comparison and logical operators

Comparison operators evaluate to a `Boolean` (`true` or `false`):

```apex
Boolean isEqual = (orderTotal == 100);
Boolean isNotEqual = (orderTotal != 100);
Boolean isGreater = (orderTotal > 100);
Boolean isGreaterOrEqual = (orderTotal >= 100);
```

Logical operators combine or invert `Boolean` values:

```apex
Boolean canCheckout = (cartHasItems && paymentValid);   // AND -- both must be true
Boolean needsReview = (isHighValue || isFirstTimeBuyer); // OR -- at least one must be true
Boolean isInactive = !isActive;                          // NOT -- flips true/false
```

`&&` requires both sides to be true; `||` requires at least one side to be true; `!` flips a single Boolean's value. These three cover the overwhelming majority of conditional logic you'll ever write, and Lesson 5 builds directly on them.

## The classic mistake: `=` vs. `==`

A single equals sign, `=`, is the **assignment operator** — it stores a value into a variable. A double equals sign, `==`, is the **equality comparison operator** — it checks whether two values are equal and produces a `Boolean`. These look similar and do fundamentally different things:

```apex
Integer orderCount = 5;   // assignment: orderCount now holds 5
Boolean sameCount = (orderCount == 5); // comparison: sameCount holds true
```

Writing `=` where you meant `==` (or vice versa) is one of the most common mistakes new programmers make across every language, not just Apex. Apex's static typing catches many — but not all — accidental misuses of `=` where a `Boolean` expression was expected, because assigning a non-Boolean value where a condition is required is a type mismatch the compiler can reject.

## Operator precedence and parentheses

Like ordinary math, Apex evaluates some operators before others — multiplication and division before addition and subtraction, for example — a rule called **operator precedence**. `2 + 3 * 4` evaluates to `14`, not `20`, because `3 * 4` runs first. Relying on memorized precedence rules for anything beyond simple arithmetic is a habit worth breaking early: parentheses cost nothing and remove all ambiguity, both for the compiler and for the next person reading your code.

```apex
Integer result = (2 + 3) * 4; // 20, explicit and unambiguous
```

## Key terms

| Term | Meaning |
|---|---|
| Expression | A piece of code that evaluates to a single value |
| Statement | A complete instruction, often built from one or more expressions |
| Integer division | Division between two whole numbers that truncates any decimal remainder |
| Assignment operator (=) | Stores a value into a variable |
| Equality operator (==) | Compares two values and produces a Boolean |
| Operator precedence | The order in which operators are evaluated when more than one appears in an expression |

## Lab

Without running any code, work out by hand what each of these Apex expressions evaluates to, and write down your reasoning for each: `17 / 5`, `17.0 / 5.0`, `17 % 5`, `(4 + 2) * 3 - 1`, and `(10 > 5) && (3 == 3)`. Then identify which one of the five would most likely surprise a beginner, and explain why in one sentence.

## Check yourself

Can you explain, without looking back, why `10 / 3` and `10.0 / 3.0` produce different kinds of results in Apex? Can you state the practical difference between `=` and `==` clearly enough that a complete beginner would never confuse them again?
