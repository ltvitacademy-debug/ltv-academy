# Lesson 100 — IDENTITY Columns and SCOPE_IDENTITY()

**Chapter 12 · Database Design Fundamentals · Lesson 4 of 21**

## What you'll learn

- `IDENTITY(1,1)` — auto-incrementing a column on every `INSERT`
- `SCOPE_IDENTITY()` — the right, safe way to read the value back
- `@@IDENTITY` — a real, documented footgun you should avoid
- `IDENT_CURRENT('table')` — the least safe option for concurrent use
- This is a genuinely common real interview question

## Defining an IDENTITY column

```sql
CREATE TABLE dbo.LessonDemo (
    DemoID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);

INSERT INTO dbo.LessonDemo (Label) VALUES ('First row');
INSERT INTO dbo.LessonDemo (Label) VALUES ('Second row');

SELECT * FROM dbo.LessonDemo;
```

`IDENTITY(1,1)` means: start at `1`, and go up by `1` on every successful
`INSERT`. You never include `DemoID` in the `INSERT` yourself — SQL
Server generates it automatically. The first row gets `1`, the second
gets `2`, and so on, even if rows are later deleted (identity values are
never reused by default).

## SCOPE_IDENTITY() — the right, safe choice

Once you've inserted a row, you often need that generated ID right away —
for example, to insert related rows into a child table. `SCOPE_IDENTITY()`
is the function built for exactly that:

```sql
INSERT INTO dbo.LessonDemo (Label) VALUES ('New row');
SELECT SCOPE_IDENTITY() AS NewDemoID;
```

`SCOPE_IDENTITY()` returns the last identity value inserted by **your
current session**, in **your current scope** — meaning the statement
(or batch) you're actually running, not something happening elsewhere.
This is the function you should reach for by default.

## @@IDENTITY — a real footgun

```sql
-- @@IDENTITY returns the last identity value inserted in the
-- current SESSION, across ANY scope — including a trigger
INSERT INTO dbo.LessonDemo (Label) VALUES ('Triggered row');
SELECT @@IDENTITY AS LastIdentityAnywhere;
```

`@@IDENTITY` looks similar, but it's dangerously broader: it returns the
last identity value inserted **anywhere in the current session**, even
inside a trigger that fired because of your `INSERT`. If a trigger on
`LessonDemo` inserts a row into a completely different table, `@@IDENTITY`
silently returns **that** trigger's identity value instead of the one you
actually wanted — a real, well-documented bug source in production code.

## IDENT_CURRENT('table') — least safe for concurrency

```sql
SELECT IDENT_CURRENT('dbo.LessonDemo') AS LastIdentityForTable;
```

`IDENT_CURRENT('table')` returns the last identity value generated for a
**specific table**, across **any session** — not just yours. In a system
with multiple users inserting into the same table concurrently, this can
return a value some *other* session just generated, which may have
nothing to do with the row you just inserted. This is the least safe of
the three for concurrent workloads.

## The three, side by side

| Function | Scope | Safe for concurrency? |
|---|---|---|
| `SCOPE_IDENTITY()` | Current session, current scope | Yes — the right default |
| `@@IDENTITY` | Current session, any scope (including triggers) | No — triggers can clobber it |
| `IDENT_CURRENT('table')` | That table, any session | No — least safe |

## Key terms

| Term | Meaning |
|---|---|
| `IDENTITY(1,1)` | Auto-increments a column starting at 1, by 1, on every INSERT |
| `SCOPE_IDENTITY()` | Last identity value from the current session and scope — the safe choice |
| `@@IDENTITY` | Last identity value from the current session, any scope — can be clobbered by triggers |
| `IDENT_CURRENT('table')` | Last identity value for a table, across any session — least safe |

## Lab

```sql
CREATE TABLE dbo.Lesson100Demo (
    DemoID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);

INSERT INTO dbo.Lesson100Demo (Label) VALUES ('Row A');
SELECT SCOPE_IDENTITY() AS AfterRowA;

INSERT INTO dbo.Lesson100Demo (Label) VALUES ('Row B');
SELECT SCOPE_IDENTITY() AS AfterRowB, @@IDENTITY AS AnyScope,
       IDENT_CURRENT('dbo.Lesson100Demo') AS ForThisTable;

DROP TABLE dbo.Lesson100Demo;
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
which of the three identity functions should you use by default, and why
can `@@IDENTITY` give you the wrong value when a trigger is involved?
