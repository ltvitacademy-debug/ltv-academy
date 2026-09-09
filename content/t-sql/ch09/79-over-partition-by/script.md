# Lesson 79 — OVER() and PARTITION BY · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 9. GROUP BY, from Chapter 4, collapses many rows down
into one summary row per group. This chapter introduces something
genuinely different: a window function, which computes a value using a
group of rows, but keeps every single original row in the output.
Nothing collapses.

## S2 · CODE CARD (AVG OVER PARTITION BY example)

Average of list price, OVER, partition by color, as average price for
color. That OVER clause is what turns AVG — an aggregate you already
know — into a window function right here. Every individual product row
still shows up, but each one also carries the average price for its own
color, sitting right alongside it.

## S3 · STEPS CARD (GROUP BY collapse / OVER keeps every row)

Compare that side by side with GROUP BY. GROUP BY gives you one row per
group — everything else disappears. OVER with PARTITION BY keeps every
single row, and just attaches the group's computed value to each one.

## S4 · CODE CARD (COUNT OVER PARTITION BY example)

And PARTITION BY itself isn't new — you actually used it back in
Lesson 51 to solve the duplicate-rows problem, without a full explanation
at the time. Here it is properly: it divides rows into groups purely for
the window function's math. Count star, partition by color, tells every
single row how many products share its own color — a number computed
across the whole group, attached individually to each row.

## S5 · OUTRO CARD

OVER turns an aggregate into a window function; PARTITION BY defines
the groups it calculates within, without ever collapsing your result
set. Next lesson: ROW_NUMBER, the first real ranking function built on
exactly this foundation. See you there.
