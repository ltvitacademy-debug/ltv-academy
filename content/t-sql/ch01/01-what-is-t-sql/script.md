# Lesson 1 — What Is T-SQL? A Tour of SSMS · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Welcome to the Lifting the Veil T-SQL Development course. I'm glad you're
here. In this first lesson we answer two questions: what exactly is T-SQL,
and what is this tool called SQL Server Management Studio that you'll live
in for the rest of the course?

## S2 · IMAGE: ssms.png (SSMS main window)

T-SQL, short for Transact-SQL, is Microsoft's extension of standard SQL
built into SQL Server. Plain SQL gives you the core vocabulary — select,
insert, update, delete. T-SQL adds procedural pieces on top: variables,
if-else branching, loops, stored procedures, error handling, transactions.
That combination is what lets you write entire programs that run inside the
database engine, not just single queries. And this is the tool you write it
all in: SQL Server Management Studio, or SSMS. Free, made by Microsoft, and
the only tool you need for this entire course. Object Explorer on the left,
a Query Editor tab on the right — that's the layout you'll see in every
single lesson.

## S3 · IMAGE: connect-object-explorer.png (Object Explorer, Databases expanded)

Object Explorer is a tree view of everything you have access to: servers,
databases, tables, views, stored procedures. Expand Databases, and you'll
see AdventureWorks — the sample database this whole course is built on.
Chapters 1 through 11 use AdventureWorks2012, a full transactional database
for a fictional bicycle company. Chapter 12, on data warehousing, switches
to AdventureWorksDW2014, the reporting-shaped version of the same data.

## S4 · IMAGE: new-query.png (New Query button + database dropdown)

To write a query, click New Query on the toolbar. That opens a blank Query
Editor tab pointed at whatever database is selected in the dropdown right
next to it. Always check that dropdown before you run anything — it's the
single most common mistake beginners make, running a query against the
wrong database.

## S5 · IMAGE: execute.png (Execute button)

Type your statement, then click Execute, or just press F5. Either one sends
whatever's in the Query Editor straight to the server. You'll be pressing
F5 hundreds of times over this course — it becomes second nature fast.

## S6 · IMAGE: query-results.png (Results grid)

And here's where the payoff shows up: the Results grid. Run a select
statement, and the rows come back here, with column headers pulled straight
from the table. A Messages tab sits right alongside it, telling you how
many rows came back, or exactly what went wrong if something did.

## S7 · CODE CARD (SVG: SELECT * FROM Person.Person;)

Every lesson from here forward gives you a real script like this one — copy
it straight into a New Query window against AdventureWorks2012, and run it
yourself. This one just pulls every row from the Person table. Don't worry
about the syntax yet; Lesson 3 breaks the select statement apart piece by
piece.

## S8 · OUTRO CARD (SVG: next lesson, LTV seal)

That's SSMS in one lesson: Object Explorer to browse, Query Editor to
write, Results grid to see what happened. In the next lesson we connect for
real and learn the use statement — how T-SQL knows which database you're
actually talking to. See you there.
