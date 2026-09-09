# Lesson 42 — NVARCHAR and Unicode

**Chapter 5 · Data Types, Strings, and Dates · Lesson 2 of 11**

## What you'll learn

- What Unicode is and why it matters for text storage
- `NVARCHAR(n)` vs. `VARCHAR(n)`
- The storage cost of Unicode, and why it's usually worth it
- The `N` prefix on string literals

## The problem plain VARCHAR has

`VARCHAR` stores text using roughly one byte per character, which is
enough for English letters, digits, and basic punctuation — but **not**
enough to reliably represent characters from many other languages: accented
letters, Cyrillic, Chinese, Japanese, Arabic, emoji, and more. That's where
**Unicode** comes in — a standard that can represent virtually every
character in every written language.

## NVARCHAR — Unicode-capable variable-length text

```sql
-- Illustrative column definition:
-- CustomerName NVARCHAR(100)
```

`NVARCHAR(n)` behaves just like `VARCHAR(n)` — variable length, up to `n`
characters — but stores those characters using Unicode, so names like
`'José'`, `'María'`, or `'田中'` store correctly and reliably, regardless
of the server's regional settings.

## The storage cost

Unicode storage generally uses about **twice** the space per character
compared to `VARCHAR`. For a column that will only ever contain plain
English text, this is real (if usually small) overhead. For anything that
might contain international names, addresses, or user-generated content —
which is most real-world applications — that overhead is worth paying
to avoid data corruption or loss.

## The N prefix on literals

When writing a Unicode string literal directly in T-SQL, prefix it with
`N`:

```sql
USE AdventureWorks2012;
GO

SELECT *
FROM Person.Person
WHERE FirstName = N'José';
```

Without the `N` prefix, SQL Server may interpret the literal using the
server's default (non-Unicode) code page, which can silently mangle
characters outside the basic English set. This matters even when querying
a `VARCHAR` column — the `N` prefix is about how the **literal itself** is
interpreted.

## Key terms

| Term | Meaning |
|---|---|
| Unicode | A standard capable of representing virtually every written language's characters |
| `NVARCHAR(n)` | Variable-length Unicode text, up to `n` characters |
| `N'...'` | Marks a string literal as Unicode |

## Lab

In AdventureWorks2012, look up `Person.Person.FirstName`'s data type via
Object Explorer, and run:

```sql
SELECT FirstName, LastName
FROM Person.Person
WHERE FirstName = N'François';
```

## Check yourself

You're ready for Lesson 43 when you can answer, without looking: why might
`VARCHAR` fail to store some real names correctly, and what does the `N`
prefix on a string literal do?
