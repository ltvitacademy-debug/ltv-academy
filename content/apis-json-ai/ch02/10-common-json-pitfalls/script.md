# Lesson 10 — Common JSON Pitfalls · Voiceover script

Segments map 1:1 to slides. Target: ~2.75 minutes total.

---

## S1 · TITLE CARD

Five mistakes trip up even experienced developers working with JSON.
None of them are exotic — they're all things that look fine at a glance
and fail the moment you actually try to parse them.

## S2 · CODE CARD (trailing comma + single quotes)

The two most common ones. A trailing comma after the last item — JSON
doesn't allow that, even though it looks harmless. And single quotes
instead of double — valid in Python and JavaScript source code, which
is exactly why it's so easy to type by accident inside either one.

## S3 · CODE CARD (large number precision)

Here's a subtler one. Many languages parse JSON numbers into a 64-bit
float, which can only represent integers exactly up to about 9
quadrillion. Past that, a large ID can silently round to the wrong
value. The fix APIs actually use: send exact large integers as strings,
not numbers.

## S4 · CODE CARD (null vs missing)

Null and a missing key are not the same thing. One means "we checked,
there genuinely isn't a value." The other means "this field was never
sent at all." A lot of parsing code treats them identically and hides a
real distinction the API was trying to tell you.

## S5 · STEPS CARD (type assumptions)

And last: don't assume a field is always the same type. A field
documented as a string can arrive as null when it's optional and
unset. Code that assumes it's always a string crashes the moment that
happens — handle the documented optional case, not just the common one.

## S6 · OUTRO CARD

Trailing commas, quote style, number precision, null versus missing,
type assumptions — five specific things to check. That's chapter two,
and Chapter 1 together: everything this course needs before chapter
three opens up real AI provider APIs.
