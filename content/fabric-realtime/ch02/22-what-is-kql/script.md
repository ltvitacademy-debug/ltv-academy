# Lesson 22 — What Is KQL? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's learn the actual language that queries a KQL database —
what is KQL?

## S2 · CODE CARD (pipe operator)

Every KQL query starts with a table name, then pipes through a
sequence of operators — where, project, take, and dozens more —
each one transforming the result before it. That's genuinely
closer to a PySpark method chain than to T-SQL's select, from,
where structure.

## S3 · CODE CARD (family resemblance)

There's a real family resemblance to T-SQL — where matches where,
project matches select, take matches top. Familiar in spirit to
this track's own T-SQL course.

## S4 · CODE CARD (the real difference)

But here's the real, substantive difference. T-SQL's clauses have
a fixed logical order no matter how you type them. KQL's pipe
steps run in the exact literal order written, top to bottom —
like a method chain, not like T-SQL clauses.

## S5 · OUTRO CARD

Its own language, familiar but genuinely different. Next lesson:
KQL's basic queries with where and project, the real syntax, in
depth.
