# Lesson 39 — VAR and Statistical Aggregates · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

AVG tells you the center of a set of numbers. It says nothing about how
spread out they are. Two products could both average 100 dollars — one
set ranging tightly from 95 to 105, another swinging wildly from 10 to
500. VAR and STDEV measure that spread.

## S2 · CODE CARD (VAR example)

VAR of list price, as price variance. Variance measures, on average, how
far each value sits from the mean — squared, so bigger deviations count
disproportionately more. The tricky part: the result is in squared units.
If list price is in dollars, variance comes out in dollars squared, which
is genuinely hard to reason about directly.

## S3 · CODE CARD (STDEV example)

That's why STDEV exists — standard deviation is simply the square root of
variance, and that square root brings the units right back to normal. A
variance of twenty-two thousand five hundred means almost nothing at a
glance. A standard deviation of 150 dollars is immediately
understandable. That's why STDEV gets reported far more often than raw
variance in practice.

## S4 · CODE CARD (STDEV + GROUP BY + HAVING)

And structurally, there's nothing new to learn here. VAR and STDEV skip
NULL, work fine with GROUP BY, and can be filtered with HAVING, exactly
like every other aggregate function this chapter. This finds colors where
prices vary widely — not just colors that are expensive on average, but
ones that are genuinely inconsistent.

## S5 · OUTRO CARD

VAR measures spread, STDEV makes it interpretable, and both follow every
rule you already know about aggregate functions. Next lesson wraps up
Chapter 4 by pulling everything together into one real summary report.
See you there.
