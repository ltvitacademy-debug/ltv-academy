# Lesson 70 — Dynamic SQL with sp_executesql · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every query in this course so far has been static — written out in
full, known in advance. Dynamic SQL is different: you build a query as a
string, at runtime, and then execute that string. This matters when part
of the query itself — a table name, a column name — isn't known until the
code actually runs.

## S2 · CODE CARD (dangerous concatenation example)

And here's how NOT to do it. Take user input and glue it directly into
your SQL string with plus signs. If that input came from somewhere
untrusted — a web form, an API call — and someone passed in something
like semicolon, drop table, semicolon, dash dash, that malicious text
gets glued straight into the SQL that actually runs. This is called SQL
injection, and it's one of the most well-known, most dangerous
vulnerabilities in all of software.

## S3 · CODE CARD (sp_executesql safe example)

The safe way is a built-in procedure called sp_executesql. Build your
query string with a placeholder, at-sign Color, instead of gluing the
value straight in. Then call sp_executesql with three things: the query
string, a declaration of what parameters it expects, and the actual
values. SQL Server treats at-sign ColorInput's value strictly as data,
never as executable code — which closes off the injection risk
completely. Reach for dynamic SQL only when a normal parameter genuinely
can't do the job — most often when the table name, column name, or sort
order itself has to vary at runtime, since regular parameters can only
substitute values, never identifiers.

## S4 · OUTRO CARD

Dynamic SQL builds a query as text; sp_executesql runs it safely, with
real parameters instead of dangerous string gluing. Next lesson closes
out Chapter 7 with MERGE — insert, update, and delete, all in one
statement. See you there.
