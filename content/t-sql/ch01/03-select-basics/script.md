# Lesson 3 — The SELECT Statement Basics · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

SELECT is the single most important statement in all of T-SQL. Almost
everything else you'll learn in this course either builds on it or filters,
sorts, or groups what it returns. So let's take it apart, piece by piece.

## S2 · CODE CARD (SVG: SELECT <what you want> FROM <where it lives>;)

Every query that retrieves data follows the same basic shape. SELECT names
the columns you want. FROM names the table or view they come from. And a
semicolon marks the end of the statement. T-SQL doesn't strictly require
that semicolon on the last statement in a batch, but this course puts one
on every statement — it's a habit that saves you from real errors once your
scripts get longer than one line.

## S3 · IMAGE: query-results.png (SSMS results grid from a SELECT *)

The asterisk, or star, is a wildcard meaning every column, in the order the
table defines them. It's genuinely useful for exploring a table you've
never seen before. But hang onto that thought — in Lesson 4 we'll see why
star is rarely what you actually want once you're writing real, production
code.

## S4 · CODE CARD (SVG: USE AdventureWorks2012; SELECT * FROM Person.Person;)

Notice something in that query: Person dot Person, not just Person. SQL
Server tables live inside a schema — think of it as a folder that groups
related tables together. Person dot Person means the Person table, inside
the Person schema. AdventureWorks2012 organizes everything into schemas
like Person, Sales, Production, and Human Resources, and you'll see this
two-part naming in literally every script from here forward.

## S5 · CODE CARD (SVG: SELECT * FROM Sales.Currency;)

Go ahead and run this one yourself: select star from Sales dot Currency,
against AdventureWorks2012. Press F5, and watch every row and every column
of that table land in your Results grid.

## S6 · OUTRO CARD (SVG: next lesson, LTV seal)

SELECT, FROM, the semicolon, and schema dot table naming — that's the full
anatomy of a basic query. Next lesson, we get more precise: choosing
exactly the columns you want instead of grabbing everything with star. See
you there.
