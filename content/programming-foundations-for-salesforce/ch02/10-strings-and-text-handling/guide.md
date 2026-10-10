# Lesson 10 — Strings and Text Handling

**Chapter 2 · Structuring Code · Lesson 10 of 18**

## What you'll learn

- Why text gets its own dedicated lesson, beyond just being "a data type"
- Core String methods in Apex: length, case conversion, searching, splitting, trimming
- String concatenation, and the type-conversion trap it creates
- Why Strings are immutable, and what that actually means in practice

## Text is everywhere, and rarely arrives clean

Nearly every real program spends a disproportionate amount of its logic manipulating text: validating that a name isn't blank, normalizing inconsistent capitalization, splitting a full name into first and last, trimming stray whitespace a user accidentally typed. Lesson 3 introduced `String` as a primitive type; this lesson covers the actual toolkit Apex's `String` class gives you for working with text in practice.

## Core String methods

```apex
String rawInput = '  Jordan Lee  ';

String cleaned = rawInput.trim();              // 'Jordan Lee' -- strips leading/trailing whitespace
Integer len = cleaned.length();                 // 10
String upper = cleaned.toUpperCase();            // 'JORDAN LEE'
String lower = cleaned.toLowerCase();            // 'jordan lee'
Boolean hasSpace = cleaned.contains(' ');         // true
List<String> parts = cleaned.split(' ');          // ['Jordan', 'Lee']
String firstName = parts[0];                      // 'Jordan'
Boolean sameName = cleaned.equals('Jordan Lee');   // true
```

A few of these deserve a second look: `.trim()` removes whitespace only from the beginning and end of a String, not from the middle. `.split()` returns a `List<String>` — this is the point where Lesson 9's collections and this lesson's strings connect directly, since breaking text apart almost always produces a collection you then loop over or index into. `.equals()`, not `==`, is the correct way to compare two Strings for equality in most languages that treat Strings as objects; Apex's `==` does work correctly for String comparison as a specific accommodation, but reaching for `.equals()` out of habit is a safe, portable instinct worth building early.

## Concatenation and the type-conversion trap

Apex lets you join a String to other values with `+`:

```apex
Integer orderCount = 5;
String message = 'You have ' + orderCount + ' orders';
System.debug(message); // 'You have 5 orders'
```

This works because Apex automatically converts the `Integer` into its String representation when it's combined with a String using `+`. The trap: this automatic conversion only happens because a String is involved somewhere in the expression. `5 + 3` is arithmetic addition (`8`); `'5' + 3` or `5 + 'results'` forces a different kind of behavior because a String is present. Keeping a clear mental model of exactly what type each piece of an expression is — rather than assuming `+` always "just works" — avoids a category of subtle bugs, especially once an expression has several pieces chained together.

## Strings are immutable

A String in Apex is **immutable** — once created, its actual content in memory never changes. Every method that appears to "modify" a String, like `.toUpperCase()` or `.trim()`, actually returns a **brand-new** String with the result, leaving the original untouched:

```apex
String original = 'hello';
String upper = original.toUpperCase();

System.debug(original); // 'hello' -- unchanged
System.debug(upper);    // 'HELLO' -- a new String
```

This trips up beginners who write `original.toUpperCase();` on its own line, expecting `original` itself to change, and then can't understand why it's still lowercase later. The fix is always the same: capture the method's return value into a variable (reassigning the original variable, or a new one) — `original = original.toUpperCase();` — because the method never changes the original in place.

## Key terms

| Term | Meaning |
|---|---|
| String concatenation | Joining Strings (and other values, auto-converted) together with + |
| .trim() | Removes leading and trailing whitespace from a String, returning a new String |
| .split() | Breaks a String into a List<String> based on a separator |
| Immutable | A value that cannot be changed after creation; String methods return new Strings rather than modifying the original |

## Lab

Write Apex code (no org needed) that takes the raw String `'  priya shah  '`, cleans it up (trims whitespace, converts to proper case by uppercasing just the first letter of each name part after splitting on the space), and prints the cleaned full name. Then write one sentence explaining, using the immutability rule from this lesson, why each intermediate step in your cleanup had to be captured into a variable rather than just calling the method and moving on.

## Check yourself

Can you explain, without looking back, exactly what `.trim()`, `.split()`, and `.toUpperCase()` each return, and confirm none of them change the original String? Can you predict what `'Total: ' + 3 + 4` evaluates to in Apex, and explain why it isn't `'Total: 7'`?
