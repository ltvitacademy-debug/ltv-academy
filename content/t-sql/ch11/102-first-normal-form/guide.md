# Lesson 102 — Normalization: 1NF

**Chapter 11 · Database Design Fundamentals · Lesson 8 of 12**

## What you'll learn

- What **normalization** is trying to accomplish
- **First Normal Form (1NF)**: the ground-floor rule every well-designed
  table already follows
- A violating design, and the real AdventureWorks2012 table that shows the
  fix
- Why 1NF is the rule behind Lessons 99–101's relationship shapes

## What normalization is for

**Normalization** is a set of formal rules for structuring tables to avoid
storing the same fact in more than one place, and to avoid cramming more
than one fact into a single column. Each "normal form" is a stricter rule
than the last. 1NF is the first and most basic.

## First Normal Form (1NF)

A table is in 1NF when:

1. Every column holds a single, **atomic** value — never a list or a
   combination of values crammed together
2. Every row is unique, identifiable by a primary key
3. There are no repeating groups of columns (like `Phone1`, `Phone2`,
   `Phone3`)

## A design that violates 1NF

```sql
-- VIOLATES 1NF: multiple phone numbers crammed into one column
CREATE TABLE dbo.BadPersonDesign (
    PersonID    INT NOT NULL PRIMARY KEY,
    Name        NVARCHAR(50),
    PhoneNumbers NVARCHAR(200)  -- '555-1111, 555-2222, 555-3333'
);
```

This is unusable for real queries — you can't search for "everyone with
phone number 555-2222" without string-parsing every row, and you can't
enforce a phone number format at the column level.

## The real AdventureWorks2012 fix

AdventureWorks2012 already follows 1NF here: instead of one crowded column,
`Person.PersonPhone` gives every person's phone number its **own row**:

```sql
-- One person, potentially many phone number rows — never crammed into one column
SELECT p.FirstName, p.LastName, pp.PhoneNumber, pnt.Name AS PhoneType
FROM Person.Person AS p
JOIN Person.PersonPhone AS pp ON pp.BusinessEntityID = p.BusinessEntityID
JOIN Person.PhoneNumberType AS pnt ON pnt.PhoneNumberTypeID = pp.PhoneNumberTypeID
WHERE p.BusinessEntityID = 285;
```

This is exactly Lesson 100's one-to-many relationship, applied to solve a
1NF violation: one `Person`, many `PersonPhone` rows, each with one atomic
phone number.

## Fixing the bad design yourself

```sql
CREATE TABLE dbo.Person (
    PersonID INT NOT NULL PRIMARY KEY,
    Name     NVARCHAR(50)
);

CREATE TABLE dbo.PersonPhone (
    PersonID    INT NOT NULL REFERENCES dbo.Person (PersonID),
    PhoneNumber NVARCHAR(20) NOT NULL,
    CONSTRAINT PK_PersonPhone PRIMARY KEY (PersonID, PhoneNumber)
);
```

Now `WHERE PhoneNumber = '555-2222'` is a simple, indexable, SARGable
predicate (Lesson 87) — impossible with the crammed-together version.

## Key terms

| Term | Meaning |
|---|---|
| Normalization | Formal rules for structuring tables to avoid duplicated or crammed-together data |
| 1NF (First Normal Form) | Every column atomic, every row unique, no repeating column groups |
| Atomic value | A single, indivisible piece of data — not a list or combination |

## Lab

Run against AdventureWorks2012:

```sql
-- Find every person with more than one phone number on file
SELECT BusinessEntityID, COUNT(*) AS PhoneCount
FROM Person.PersonPhone
GROUP BY BusinessEntityID
HAVING COUNT(*) > 1;
```

## Check yourself

You're ready for Lesson 103 when you can explain, without looking: what
three rules define 1NF, and how does `Person.PersonPhone` demonstrate the
fix for a repeating-group violation?
