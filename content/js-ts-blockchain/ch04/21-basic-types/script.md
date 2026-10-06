# Lesson 21 — Basic Types · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Last lesson sold you on why types matter. This lesson is the actual
vocabulary — the specific type names you'll be writing constantly, starting
with the ones you'll use most.

## S2 · CODE CARD (SVG: string/number/boolean/null/undefined)

Five primitives cover most everyday variables. string for text, number for
literally every numeric value — TypeScript doesn't separate integers from
floats the way some languages do. boolean for true or false. And null and
undefined each get their own exact type, matching JavaScript's own
distinction between the two.

## S3 · CODE CARD (SVG: number[], Array<string>, tuple)

Beyond single values, number brackets, or Array of number written out,
describes an array that can hold any number of elements, all of that
type. A tuple is stricter: square brackets with a fixed list of types,
locking in both the exact length and what type belongs at each position.
Here, a trading pair is always exactly a string, then a number — never
three elements, never swapped.

## S4 · CODE CARD (SVG: MAX_SAFE_INTEGER vs bigint for wei)

Here's a detail blockchain code runs into constantly. JavaScript's number
type can't safely represent integers past about nine quadrillion — Number
dot MAX underscore SAFE underscore INTEGER. Wei values — the smallest unit
of ether — blow past that routinely for any real token amount. bigint,
written with a trailing lowercase n, is built specifically to hold
integers of arbitrary size precisely, with no rounding error.

## S5 · CODE CARD (SVG: any vs unknown)

Two types look similar but behave very differently. any turns off type
checking completely for that value — it compiles no matter what you do
with it, correct or not, which quietly defeats the entire point of using
TypeScript. unknown is the safer alternative: it also accepts anything, but
TypeScript refuses to let you use it at all until you've proven what it
actually is. Prefer unknown almost every time you're tempted to reach for
any.

## S6 · STEPS CARD (SVG: void / never)

Two more worth knowing exist. void describes a function that doesn't
return anything meaningful — most functions that just log or mutate
something use it. never describes a function that doesn't return at all,
because it always throws, or loops forever — rarer, but it shows up in
error-handling helpers.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

That's the basic vocabulary: primitives, arrays, tuples, bigint, any
versus unknown, void and never. Next lesson, we move beyond single values
entirely and give shape to whole objects, with interfaces and type
aliases.
