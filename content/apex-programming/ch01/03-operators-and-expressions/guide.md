# Lesson 3 — Operators and Expressions

**Chapter 1 · Apex Fundamentals · Lesson 3 of 43**

## What you'll learn

- Arithmetic, comparison, logical, and assignment operators
- The ternary operator as shorthand for if-then-else
- Why `==` and `===` are different in Apex
- How `&&` and `||` short-circuit, and which one binds tighter

## Arithmetic operators

```apex
Integer a = 10;
Integer b = 3;

System.debug(a + b); // 13
System.debug(a - b); // 7
System.debug(a * b); // 30
System.debug(a / b); // 3  (integer division truncates)
```

If either operand is a `Double`, the result becomes a `Double` instead of
truncating:

```apex
Double result = 10 / 3.0; // 3.3333333333333335
```

## Assignment operators

Beyond plain `=`, Apex supports compound assignment operators that combine
an operation with assignment:

```apex
Integer total = 5;
total += 10; // total is now 15
total -= 3;  // total is now 12
total *= 2;  // total is now 24
total /= 4;  // total is now 6
```

## Comparison operators

```apex
Integer x = 5;
Integer y = 8;

Boolean lessThan = x < y;   // true
Boolean atLeast  = x >= y;  // false
```

Comparison operators (`<`, `<=`, `>`, `>=`) never evaluate to `null` —
if either operand is `null` for a numeric or date/time comparison, the
expression simply evaluates to `false`.

## Equality: `==` vs. `===`

This trips up developers coming from Java. In Apex, `==` compares **value**
equality, not reference equality, for everything except user-defined types:

```apex
String s1 = 'Hello';
String s2 = 'Hello';
System.debug(s1 == s2); // true -- same value
```

`===` is the **exact** equality operator — it checks whether two
references point to the exact same location in memory:

```apex
MyClass obj1 = new MyClass();
MyClass obj2 = new MyClass();
System.debug(obj1 == obj2);  // depends on your equals()/hashCode() override
System.debug(obj1 === obj2); // false -- different objects in memory
```

String comparisons using `==` are case-insensitive and follow the
context user's locale — another detail that differs from Java.

## Logical operators and short-circuiting

```apex
Boolean a = true;
Boolean b = false;

System.debug(a && b); // false
System.debug(a || b); // true
```

Both `&&` and `||` short-circuit: in `x && y`, `y` is only evaluated if
`x` is `true`; in `x || y`, `y` is only evaluated if `x` is `false`. One
precedence rule to remember: **`&&` binds tighter than `||`**, so
`a || b && c` evaluates as `a || (b && c)`.

## The ternary operator

The ternary operator is shorthand for a simple if-then-else, written as
`condition ? valueIfTrue : valueIfFalse`:

```apex
Integer score = 72;
String grade = score >= 70 ? 'Pass' : 'Fail';
System.debug(grade); // Pass
```

The condition (the part before `?`) can never be `null` — Apex requires a
real Boolean there.

## Key terms

| Term | Meaning |
|---|---|
| Compound assignment | Operators like `+=`, `-=`, `*=`, `/=` that combine an operation with assignment |
| `==` | Apex's value-equality operator (not reference equality, except for user-defined types) |
| `===` | Apex's exact equality operator — true only if both sides reference the same memory location |
| Short-circuit evaluation | `&&`/`||` skip evaluating their right-hand side when the result is already determined |
| Ternary operator | `condition ? x : y`, shorthand for if-then-else |

## Lab

In Execute Anonymous, predict the output of each line, then run it to
check yourself:

```apex
Integer a = 7, b = 2;
System.debug(a / b);        // integer division
System.debug(a / (b * 1.0)); // forces Double division

String name1 = 'Trailblazer';
String name2 = 'Trailblazer';
System.debug(name1 == name2);

Boolean isVip = true;
Integer purchases = 3;
String tier = (isVip && purchases > 0) ? 'Priority' : 'Standard';
System.debug(tier);
```

## Check yourself

Why does `10 / 3` return `3` instead of `3.33`, and what's the one
precedence rule you need to remember when mixing `&&` and `||` in the same
expression?
