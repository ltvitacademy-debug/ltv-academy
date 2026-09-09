# Lesson 17 — Loops · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Conditions let you decide about ONE value. Loops let you apply that
decision to every single row you've got — which is most of what a
real data engineering script actually does.

## S2 · CODE CARD (for)

A for loop walks through a list one item at a time, running its body
once per item. This is the loop you'll use constantly.

## S3 · CODE CARD (while)

A while loop keeps running as long as its condition stays true —
useful when you genuinely don't know in advance how many times you'll
need to loop. Reading pages from an API until there's no more data,
coming up in Lesson 23, is exactly this.

## S4 · CODE CARD (loops + conditions)

Now put loops and conditions together, and you get a real pattern:
walk every trip, and continue — skip it — the moment it fails a
validation rule. Break, by contrast, would stop the whole loop
entirely, not just skip one item.

## S5 · OUTRO CARD

One value at a time, every row, filtered by rule. Next lesson:
functions — packaging this logic up so you're not rewriting it every
time. See you there.
