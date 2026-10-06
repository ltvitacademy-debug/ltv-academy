# Lesson 25 — Type Narrowing · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

This chapter closes with the flip side of everything we've covered.
Instead of writing a type, narrowing is about proving to the compiler, at
runtime, exactly which part of a broader type a value actually is right
now.

## S2 · CODE CARD (SVG: value.toFixed(2) error on string | number)

Say a value is typed string or number — a real union, genuinely either
one. Try calling toFixed on it directly, and TypeScript refuses: toFixed
exists on number, not on string, and it has no way to know which one you
actually have at this point in the code. It won't let you guess.

## S3 · CODE CARD (SVG: typeof value === "number" narrowing)

A plain typeof check fixes this completely. Inside the if block, where
typeof value equals the string number, TypeScript doesn't just trust you —
it actually proves it, and narrows value down to plainly number for every
line inside that block. Outside it, in the remaining path, value is
narrowed to string instead. No casting, no any, just an ordinary runtime
check the compiler already understands.

## S4 · CODE CARD (SVG: instanceof Error, Array.isArray)

typeof only covers JavaScript's primitives. For a value that might be a
real class instance, instanceof narrows it the same way — here, proving
err is actually an Error before touching dot message. And for arrays
specifically, Array dot isArray does the equivalent job, since typeof an
array just unhelpfully returns object.

## S5 · CODE CARD (SVG: discriminated union TxResult, status field narrowing)

The most powerful pattern combines this with something from two lessons
ago: a union of objects that all share one literal field. Here, every
TxResult has a status field, and checking its specific value — confirmed
versus failed — doesn't just narrow that one field. It narrows the entire
object, so TypeScript knows blockNumber only exists in one branch, and
reason only exists in the other.

## S6 · STEPS CARD (SVG: typeof / instanceof / Array.isArray / Discriminated unions)

Four tools cover the overwhelming majority of real narrowing you'll
write: typeof for primitives, instanceof for class instances, Array dot
isArray specifically for arrays, and discriminated unions — a shared
literal field — for narrowing whole objects at once.

## S7 · OUTRO CARD (SVG: Chapter 4 complete, Chapter 5 ahead, LTV seal)

That's Chapter Four complete: why TypeScript exists, the basic types,
shaping objects, typing functions, generics, and now narrowing broader
types back down safely. Chapter Five takes every one of these tools and
applies them to real on-chain data, contract calls, and the libraries
blockchain developers actually use day to day.
