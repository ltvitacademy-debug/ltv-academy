# Lesson 80 — ROW_NUMBER · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

The first real ranking function, and it's the simplest one: ROW_NUMBER,
which assigns every row a unique, sequential number.

## S2 · CODE CARD (ROW_NUMBER OVER ORDER BY)

Name, list price, ROW_NUMBER, OVER, order by list price descending, as
price rank. The most expensive product gets 1, the second most
expensive gets 2, and so on down the line. And here's a real
requirement, different from last lesson's AVG and COUNT examples:
ROW_NUMBER needs an ORDER BY inside OVER. Without an order, there's
simply no way to define which row counts as first.

## S3 · CODE CARD (ROW_NUMBER with PARTITION BY)

Add PARTITION BY color into the same OVER clause, and the numbering
restarts at 1 for every single color. Now you're finding the most
expensive product WITHIN each color, not across the whole table.
Partition defines the groups; order defines the sequence inside each
one — working together, in the same clause.

## S4 · CODE CARD (Lesson 51 revisited)

And this is exactly the pattern Lesson 51 used to find duplicate rows,
now that you understand every piece of it properly. Partition by first
name, last name, email setting, order by business entity ID. Each group
of genuine duplicates gets numbered 1, 2, 3 — and anything past 1 is, by
definition, a repeat.

## S5 · OUTRO CARD

One thing worth remembering: ROW_NUMBER always produces unique numbers,
even for rows that are genuinely tied on the ORDER BY column — one of
them just arbitrarily gets the lower number. If you need tied rows to
actually share the same number, that's exactly what RANK and DENSE_RANK
solve, next lesson. See you there.
