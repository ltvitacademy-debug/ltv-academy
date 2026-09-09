# Lesson 5 — Column Aliases (AS) · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Sometimes a column's real name isn't what you want showing up in your
results. That's what an alias is for — a temporary rename that only
affects your query's output, not the table itself.

## S2 · CODE CARD (SELECT FirstName AS GivenName, LastName AS Surname FROM Person.Person;)

Use the AS keyword between the column and the new name. Select first name
as given name, last name as surname — run that, and your Results grid
shows given name and surname as the column headers, even though the actual
table columns are still called first name and last name underneath.

## S3 · CODE CARD (SELECT FirstName GivenName, LastName Surname FROM Person.Person;)

Now, T-SQL technically lets you drop the AS keyword entirely and it still
works. But this course always writes AS explicitly, and here's why: leave
it out, and a missing comma between two columns can silently turn what
should be two separate columns into one aliased mess. Spelling it out
removes all ambiguity.

## S4 · CODE CARD (SELECT ListPrice AS OriginalPrice, ListPrice * 0.9 AS DiscountedPrice FROM Production.Product;)

Aliases matter even more once you're not just selecting a column, but
calculating one. List price times zero point nine is an expression, not a
stored column — without an alias, SQL Server hands you back an ugly,
unreadable header. With one, discounted price, it's immediately clear what
that number means.

## S5 · CODE CARD (SELECT FirstName AS [Given Name] FROM Person.Person;)

And if you want an alias with a space in it — Given Name, with a space —
wrap it in square brackets. That tells SQL Server this whole phrase, spaces
and all, is one identifier.

## S6 · OUTRO CARD

AS renames your output, never the table. Write it explicitly, use it on
calculations, and bracket it when you need a space. Next lesson: gluing
columns together with string concatenation. See you there.
