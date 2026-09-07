# Lesson 46 — Variables & DAX Best Practices · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Fifteen lessons in. Let's close the chapter with the habits that keep
your formulas fast, readable, and trustworthy.

## S2 · CODE: Sales YoY Growth % = DIVIDE(([Sales] - CALCULATE([Sales], PARALLELPERIOD(...))), CALCULATE([Sales], PARALLELPERIOD(...)))

Here's the problem: the same expression, sales for the same period last
year, appears twice. Power BI calculates it twice, too — the same work,
done over again for nothing.

## S3 · CODE: VAR SalesPriorYear = CALCULATE([Sales], PARALLELPERIOD('Date'[Date], -12, MONTH)) RETURN DIVIDE(([Sales] - SalesPriorYear), SalesPriorYear)

VAR names it once. RETURN uses it twice. Same result, roughly half the
query time — and SalesPriorYear reads like plain English instead of a
repeated wall of CALCULATE.

## S4 · CODE: Conversion Rate = DIVIDE([Conversions], [Visits])

One more habit: DIVIDE instead of the plain slash. Ordinary division
throws an error the moment a denominator hits zero. DIVIDE just returns
blank instead — quietly correct, instead of loudly broken.

## S5 · OUTRO CARD (SVG: chapter complete, LTV seal)

Syntax, calculated columns, measures, context, CALCULATE, iterators,
filter modifiers, and now variables — that's the whole foundation. Next
up: Chapter Six, Dates and Time Intelligence, where all of this gets put
to work.
