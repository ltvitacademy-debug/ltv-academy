# Lesson 68 — Stored Procedures: Creating · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

A view, from back in Chapter 6, saves one SELECT statement. This lesson
introduces something more powerful: a stored procedure, which saves an
entire script — every tool from this whole chapter, bundled together
under one name.

## S2 · CODE CARD (CREATE PROCEDURE example)

Create procedure, u-s-p underscore GetExpensiveProducts, as, begin, then
the query, end. That u-s-p prefix is a common convention — user stored
procedure — mirroring the v-w prefix we used for views. Everything
between AS and the matching END is the procedure's actual body.

## S3 · CODE CARD (EXEC example)

And running it is exactly one word: EXEC, followed by the procedure's
name. The entire body executes as if you'd pasted it in and run it
yourself — except now it's a single, reusable call.

## S4 · CODE CARD (procedure with logic)

But here's the real power, and the real difference from a view: a
procedure's body can contain absolutely anything. Declare a variable,
capture a count with SELECT, branch with IF-ELSE — all of it, bundled
together, saved, and callable with one line.

## S5 · OUTRO CARD

And just like a view, you can change or remove a procedure afterward —
ALTER PROCEDURE redefines it, DROP PROCEDURE removes it permanently.
Next lesson: passing values INTO a stored procedure when you call it,
using parameters. See you there.
