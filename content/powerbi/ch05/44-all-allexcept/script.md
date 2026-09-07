# Lesson 44 — ALL & ALLEXCEPT · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~1.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Sometimes you want a formula to deliberately ignore the filters around
it. ALL and ALLEXCEPT are how.

## S2 · CODE: SUMX(ResellerSales, [SalesAmount]) / SUMX(ALL(ResellerSales), [SalesAmount])

The classic use: ratio to grand total. The numerator respects whatever's
filtered. The denominator uses ALL to ignore every filter on that
table entirely — always the full total. Divide one by the other, and
every cell shows its real percentage of the whole.

## S3 · CODE: CALCULATE(SUM(Sales[SalesAmount]), ALLEXCEPT(Customer, Customer[CustomerKey]))

ALLEXCEPT takes the opposite approach: name what to keep, clear
everything else. Convenient when a table has many columns and you only
want to preserve one or two — you saw this exact formula back in the
context transition lesson.

## S4 · OUTRO CARD (SVG: next lesson, LTV seal)

Pick whichever list is shorter — columns to clear, or columns to keep —
and that's usually the more readable formula. Next: ALLSELECTED, for
when you need to respect some filters but not others.
