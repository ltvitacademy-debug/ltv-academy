# Lesson 19 — Dialect-Specific String Functions: A Side-by-Side Reference

**Chapter 3 · Querying Basics Compared · Lesson 8 of 8**

## What you'll learn

- Substring extraction across all four dialects
- Measuring string length: LEN vs. LENGTH vs. CHAR_LENGTH
- Finding a substring's position: CHARINDEX vs. INSTR vs. POSITION
- Trimming: the one area that's nearly consistent everywhere

## Substring extraction

```sql
-- T-SQL: SUBSTRING(string, start, length)
SELECT SUBSTRING('LTV Academy', 1, 3) AS Result;  -- 'LTV'

-- Oracle: SUBSTR(string, start, length)
SELECT SUBSTR('LTV Academy', 1, 3) AS result FROM DUAL;  -- 'LTV'

-- MySQL: supports BOTH SUBSTRING and SUBSTR
SELECT SUBSTRING('LTV Academy', 1, 3);  -- 'LTV'
SELECT SUBSTR('LTV Academy', 1, 3);     -- 'LTV'

-- PostgreSQL: supports BOTH SUBSTRING and SUBSTR
SELECT SUBSTRING('LTV Academy', 1, 3);  -- 'LTV'
SELECT SUBSTR('LTV Academy', 1, 3);     -- 'LTV'
```

T-SQL is `SUBSTRING`-only; Oracle is `SUBSTR`-only; MySQL and PostgreSQL
are generous and accept both spellings.

## Measuring length

```sql
-- T-SQL: LEN (trims trailing spaces before counting)
SELECT LEN('LTV Academy') AS Result;  -- 11

-- Oracle: LENGTH
SELECT LENGTH('LTV Academy') AS result FROM DUAL;  -- 11

-- MySQL: LENGTH (bytes) or CHAR_LENGTH (characters)
SELECT LENGTH('LTV Academy');       -- byte length
SELECT CHAR_LENGTH('LTV Academy');  -- character length

-- PostgreSQL: LENGTH
SELECT LENGTH('LTV Academy');  -- 11
```

T-SQL's lone function is `LEN`; everyone else uses `LENGTH`. MySQL splits
the idea in two — `LENGTH` for bytes, `CHAR_LENGTH` for characters —
which matters once multi-byte encodings are involved.

## Finding a substring's position

```sql
-- T-SQL: CHARINDEX(substring, string)
SELECT CHARINDEX('Academy', 'LTV Academy') AS Result;  -- 5

-- Oracle: INSTR(string, substring)  -- argument order is REVERSED
SELECT INSTR('LTV Academy', 'Academy') AS result FROM DUAL;  -- 5

-- MySQL: INSTR(string, substring) or LOCATE(substring, string)
SELECT INSTR('LTV Academy', 'Academy');      -- 5
SELECT LOCATE('Academy', 'LTV Academy');     -- 5

-- PostgreSQL: POSITION(substring IN string) or STRPOS(string, substring)
SELECT POSITION('Academy' IN 'LTV Academy');  -- 5
SELECT STRPOS('LTV Academy', 'Academy');      -- 5
```

Watch the argument order carefully: T-SQL's `CHARINDEX` takes the
substring first, but Oracle's `INSTR` takes the full string first. MySQL
offers both `INSTR` (string-first, like Oracle) and `LOCATE`
(substring-first, like T-SQL). PostgreSQL's `POSITION` uses English-like
`IN` syntax, while its `STRPOS` takes the string first.

## Trimming

```sql
-- All four platforms support these consistently
SELECT TRIM('  LTV Academy  ') AS Result;
SELECT LTRIM('  LTV Academy') AS Result;
SELECT RTRIM('LTV Academy  ') AS Result;
```

Trimming is the one area where there's genuine consistency: `TRIM`,
`LTRIM`, and `RTRIM` work the same, by name and behavior, across T-SQL,
Oracle, MySQL, and PostgreSQL.

## Full side-by-side reference

| Task | T-SQL | Oracle | MySQL | PostgreSQL |
|---|---|---|---|---|
| Substring | `SUBSTRING(s, start, len)` | `SUBSTR(s, start, len)` | `SUBSTRING` or `SUBSTR` | `SUBSTRING` or `SUBSTR` |
| Length (chars) | `LEN(s)` | `LENGTH(s)` | `CHAR_LENGTH(s)` (or `LENGTH` for bytes) | `LENGTH(s)` |
| Find position | `CHARINDEX(sub, s)` | `INSTR(s, sub)` | `INSTR(s, sub)` or `LOCATE(sub, s)` | `POSITION(sub IN s)` or `STRPOS(s, sub)` |
| Trim | `TRIM`/`LTRIM`/`RTRIM` | `TRIM`/`LTRIM`/`RTRIM` | `TRIM`/`LTRIM`/`RTRIM` | `TRIM`/`LTRIM`/`RTRIM` |

## Key terms

| Term | Meaning |
|---|---|
| `SUBSTRING`/`SUBSTR` | Substring-extraction functions; T-SQL has only SUBSTRING, Oracle only SUBSTR, MySQL/PostgreSQL accept both |
| `LEN`/`LENGTH`/`CHAR_LENGTH` | Length functions; MySQL distinguishes byte length from character length |
| `CHARINDEX`/`INSTR`/`LOCATE`/`POSITION`/`STRPOS` | Position-finding functions, with varying argument order |
| `TRIM`/`LTRIM`/`RTRIM` | Trimming functions, consistent across all four dialects |

## Lab

Write a query that finds the position of `'Academy'` inside `'LTV
Academy'` on all four platforms, paying close attention to argument order:
T-SQL's `CHARINDEX`, Oracle's `INSTR`, MySQL's `LOCATE`, and PostgreSQL's
`POSITION ... IN`.

## Check yourself

You've completed Chapter 3 when you can reconstruct this entire reference
table from memory: substring, length, position, and trim, across all four
dialects, including which functions reverse their argument order.
