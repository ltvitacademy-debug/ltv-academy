# Lesson 39 — CALCULATE Explained · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

One function, described in one sentence: CALCULATE evaluates an
expression inside a deliberately modified filter context. Nearly
everything genuinely advanced anywhere in DAX gets built directly on top
of this single function.

## S2 · CODE: CALCULATE(<expression>, <filter1>, <filter2>, ...)

It takes an expression to calculate first — almost always a measure or a
plain SUM — and then any number of filters after that, each one
narrowing down or actively changing the filter context that expression
ends up seeing. Call it with absolutely no filters at all, and it simply
behaves exactly like the expression alone would, with no change
whatsoever.

## S3 · CODE: Blue Revenue = CALCULATE(SUM(Sales[SalesAmount]), 'Product'[Color] = "Blue")

Here it is doing genuinely real work: summing sales, but restricted only
to rows where the product's color happens to be blue. It's the exact
same underlying SUM you already know, with just one filter layered
directly on top of it — on top of whatever else the report itself is
already filtering by, all at once.

## S4 · CODE: Unfiltered column -> filter is added | Already filtered -> filter overwrites it

Here's the default behavior genuinely worth knowing cold: if a column
isn't already filtered by anything else, CALCULATE's filter simply gets
added on top. But if it's already filtered — say, by a slicer sitting on
the report page — CALCULATE's filter actually overwrites that existing
one entirely. That overwrite behavior specifically is what makes this
function so genuinely powerful.

## S5 · OUTRO CARD

Next: what actually happens when CALCULATE runs inside row context
instead of filter context — a genuinely important bridge between the
two called context transition, and it explains formulas that otherwise
look nearly impossible.
