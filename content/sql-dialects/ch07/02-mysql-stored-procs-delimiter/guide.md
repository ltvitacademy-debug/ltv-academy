# Lesson 44 — MySQL Stored Procedures and the DELIMITER Trick

**Chapter 7 · MySQL Deep Dive for T-SQL Developers · Lesson 2 of 5**

## What you'll learn

- Why `CREATE PROCEDURE` in MySQL needs a trick T-SQL has never needed
- What `DELIMITER` actually changes — and what it does **not** change
- How to write a MySQL stored procedure with a multi-statement body
- Why this is a client-tool convention, not a server or language feature

## The problem: semicolons inside a semicolon-terminated statement

In T-SQL, you can write a multi-statement stored procedure and just end each internal statement
with a semicolon — `GO` (a batch separator, not even real T-SQL) is the only special punctuation
involved, and it's optional in most tools. MySQL's command-line client, and many GUI tools, work
differently: they use `;` to decide **when to send** a statement to the server. That's fine for a
single `SELECT`, but a stored procedure body legitimately needs semicolons **inside** it.

```sql
-- This BREAKS in the mysql command-line client:
-- it sends "CREATE PROCEDURE ... BEGIN SET x = 1" as soon as it hits
-- the FIRST semicolon, before the procedure body is even finished.
CREATE PROCEDURE BadExample()
BEGIN
  DECLARE x INT;
  SET x = 1;
  SELECT x;
END;
```

## The fix: DELIMITER changes what the CLIENT treats as "end of statement"

`DELIMITER $$` tells the client tool — not the MySQL server — to treat `$$` as the new
end-of-statement marker, instead of `;`. That lets you write a procedure body full of ordinary
semicolons without the client cutting you off early. `DELIMITER //` is just as common; the marker
itself is arbitrary.

```sql
DELIMITER $$

CREATE PROCEDURE GetActiveCustomers()
BEGIN
  DECLARE minOrders INT;
  SET minOrders = 1;

  SELECT CustomerId, CustomerName
  FROM Customers
  WHERE OrderCount >= minOrders;
END$$

DELIMITER ;
```

Notice the body still uses ordinary `;` after every internal statement — `DECLARE x INT;`,
`SET minOrders = 1;`, and the `SELECT` all end in `;`, exactly as they would anywhere else. Only
the **very end** of the whole `CREATE PROCEDURE` statement uses the temporary `$$` marker, and the
final `DELIMITER ;` switches the client back to normal for everything that follows.

## This is a client-tool convention, not a server feature

This is the single most important thing to understand about `DELIMITER`: **the MySQL server has
no idea it exists.** `DELIMITER` is not SQL — you won't find it in the SQL standard, and you can't
use it inside application code that talks to MySQL over a driver (a Python, Java, or .NET MySQL
client sends the whole procedure body as one string; there's no "client prompt" for it to
confuse). It exists purely because the interactive `mysql` CLI (and tools that mimic it, like many
GUI query editors) need a way to know where one statement ends and the next begins, and `;` isn't
good enough once a statement's body contains `;` itself.

## Calling the procedure once it's created

Once defined, calling a MySQL stored procedure uses `CALL`, not `EXEC` (T-SQL) or nothing at all
(PL/SQL uses `EXEC` too, informally, but the formal syntax is different again) — one more small
but real syntax difference to keep straight.

```sql
CALL GetActiveCustomers();
```

## Key terms

| Term | Meaning |
|---|---|
| `DELIMITER` | A client-tool directive that changes the end-of-statement marker, so procedure bodies can contain ordinary semicolons |
| `$$` / `//` | Common (arbitrary) temporary delimiter markers |
| `CALL` | MySQL's keyword for executing a stored procedure |

## Lab

Write a MySQL stored procedure with at least two internal statements separated by semicolons
(a `DECLARE` and a `SET`, for example), using `DELIMITER $$` to define it and `DELIMITER ;` to
restore normal behavior afterward. Call it with `CALL`.

## Check yourself

You're ready for Lesson 45 when you can explain, without looking: what problem does `DELIMITER`
solve, why is it specifically a client-tool convention rather than a MySQL language feature, and
what keyword do you use to execute a MySQL stored procedure once it exists?
