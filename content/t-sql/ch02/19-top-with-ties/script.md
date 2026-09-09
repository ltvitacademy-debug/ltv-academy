# Lesson 19 — TOP WITH TIES · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

TOP has a subtle problem: what happens when the row right at your cutoff
is tied with the next one? Plain TOP just picks one and drops the other,
arbitrarily. This lesson fixes that.

## S2 · CODE CARD (TOP 5 ... ORDER BY ListPrice DESC;)

Top 5, ordered by list price descending. Now imagine the 5th and 6th most
expensive products happen to be priced at the exact same amount — a
genuine tie. Plain TOP 5 keeps one of them and silently drops the other.
If you're reporting "the top 5 most expensive products," that's not
really an honest answer.

## S3 · CODE CARD (TOP 5 WITH TIES ...)

Add WITH TIES right after your row count, and now you get the top 5, PLUS
any additional rows that tie with whatever value landed at position 5. If
three products are tied for that spot, all three come back — which means
this query can return more rows than the number you asked for.

## S4 · STEPS CARD (NO ORDER BY errors / WITH ORDER BY works)

And WITH TIES absolutely requires ORDER BY — SQL Server will actually
throw an error if you leave it out. Makes sense once you think about it: a
tie only means something relative to a sort order. No sort, no meaningful
cutoff, no ties to speak of.

## S5 · OUTRO CARD

Use WITH TIES whenever top-N represents a genuine ranking — a leaderboard,
highest-paid employees, anything where arbitrarily dropping a tied value
would misrepresent the truth. For a query that just needs roughly N sample
rows, plain TOP is perfectly fine. That wraps up TOP. Next lesson closes
out Chapter 2 with predicates — how SQL Server actually filters data under
the hood. See you there.
