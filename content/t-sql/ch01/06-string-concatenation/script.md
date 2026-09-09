# Lesson 6 — String Concatenation with + · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

How do you glue two pieces of text together in T-SQL — say, a first name
and a last name into one full name? That's called concatenation, and it
comes up constantly once you're building real reports.

## S2 · CODE CARD (SELECT FirstName + ' ' + LastName AS FullName FROM Person.Person;)

T-SQL uses the plus sign for it. First name, plus a literal space in
quotes, plus last name, aliased as full name. Run that, and each row's
first and last name glue together into one combined string.

## S3 · CODE CARD (SELECT 'Customer: ' + FirstName + ' ' + LastName AS Label FROM Person.Person;)

You're not limited to just a space — mix in any literal text you want.
Customer colon, plus first name, plus a space, plus last name. Every piece,
literal text and column values alike, glues together in exactly the order
you write it.

## S4 · CODE CARD (SELECT FirstName + ' ' + MiddleName + ' ' + LastName AS FullName FROM Person.Person;)

Now here's a gotcha nearly every T-SQL developer trips over eventually. If
even one piece being concatenated with plus is NULL, the entire result
becomes NULL. Add middle name into that full name concatenation, and for
the many people who don't have a middle name on file, the WHOLE full name
comes back NULL — even though first name and last name both had perfectly
good values.

## S5 · CODE CARD (SELECT CONCAT(FirstName, ' ', MiddleName, ' ', LastName) AS FullName FROM Person.Person;)

The fix is a function called CONCAT. Instead of plus signs, you list the
pieces separated by commas inside CONCAT's parentheses, and it treats any
NULL as simply an empty string instead of poisoning the whole thing. We'll
go much deeper on NULL handling in Chapter 2, but for now: plus propagates
NULL, CONCAT does not.

## S6 · OUTRO CARD

Plus glues strings together but breaks on NULL; CONCAT fixes that. Next
lesson, we look at CASE expressions — branching logic you can write right
inside a SELECT statement. See you there.
