# Lesson 99 — Table Relationships: One-to-One

**Chapter 11 · Database Design Fundamentals · Lesson 5 of 12**

## What you'll learn

- What a **one-to-one** relationship means, and why it's the rarest of the
  three relationship shapes
- How to enforce it: the same column is both the primary key *and* a
  foreign key
- AdventureWorks2012's real one-to-one relationship: `Person.Person` and
  `HumanResources.Employee`
- Why you'd split one real-world thing into two tables at all

## What one-to-one means

A **one-to-one** relationship means each row in Table A corresponds to *at
most one* row in Table B, and vice versa. It's the rarest of the three
relationship shapes (Lessons 100–101 cover the other two) because most of
the time, if two things always pair up exactly one-to-one, you'd just put
them in a single table. One-to-one earns its own table split when:

- One side is optional (not every `Person` is an `Employee`)
- One side holds a large or rarely-used set of columns you don't want
  loaded with every query on the main table
- You're modeling a "supertype/subtype" — one general thing, several
  specific kinds of it

## The real AdventureWorks2012 example

Every `HumanResources.Employee` **is** a `Person.Person` — but not every
`Person.Person` is an employee (customers and vendors are people too, in
this schema). That's a textbook one-to-one relationship, and it's enforced
by a simple, elegant trick: `Employee.BusinessEntityID` is **both** the
table's primary key *and* a foreign key referencing `Person.BusinessEntityID`.

```sql
-- The real relationship in AdventureWorks2012
SELECT p.FirstName, p.LastName, e.JobTitle, e.HireDate
FROM Person.Person AS p
JOIN HumanResources.Employee AS e ON e.BusinessEntityID = p.BusinessEntityID;
```

Because `BusinessEntityID` is `Employee`'s primary key, it's automatically
unique — no `Employee` row can share it with another `Employee` row. And
because it's also a foreign key into `Person`, every `Employee` row must
correspond to exactly one real `Person` row. Primary key + foreign key on
the *same* column is what turns an ordinary one-to-many foreign key into a
strict one-to-one.

## Defining your own

```sql
CREATE TABLE dbo.Person (
    PersonID INT NOT NULL PRIMARY KEY,
    Name     NVARCHAR(50) NOT NULL
);

CREATE TABLE dbo.Employee (
    PersonID  INT NOT NULL PRIMARY KEY REFERENCES dbo.Person (PersonID),
    JobTitle  NVARCHAR(50),
    HireDate  DATE
);
```

`Employee.PersonID` being its own primary key (not a separate `EmployeeID`)
is what makes this one-to-one instead of one-to-many — there can be at most
one `Employee` row per `PersonID`, because a primary key can't repeat.

## Key terms

| Term | Meaning |
|---|---|
| One-to-one | Each row in Table A matches at most one row in Table B, and vice versa |
| Supertype/subtype | A general table (Person) with specific-kind tables (Employee) hanging off it 1:1 |
| PK = FK pattern | Making the same column both primary key and foreign key enforces strict one-to-one |

## Lab

Run against AdventureWorks2012:

```sql
-- Confirm the real relationship: every employee has exactly one matching person
SELECT COUNT(*) AS EmployeeCount FROM HumanResources.Employee;
SELECT COUNT(DISTINCT BusinessEntityID) AS MatchedPersons
FROM Person.Person
WHERE BusinessEntityID IN (SELECT BusinessEntityID FROM HumanResources.Employee);
-- Both counts should match exactly
```

## Check yourself

You're ready for Lesson 100 when you can explain, without looking: what
column trick turns a foreign key relationship into a strict one-to-one,
and why is `Employee`/`Person` in AdventureWorks2012 a real example of it?
