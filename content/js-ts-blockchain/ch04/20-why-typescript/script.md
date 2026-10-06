# Lesson 20 — Why TypeScript? · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Welcome to Chapter Four. Everything so far has been plain JavaScript.
Starting now, we add TypeScript on top of it — and this first lesson is
about why that's worth doing at all, before we touch a single new keyword.

## S2 · CODE CARD (SVG: plain JS sendTokens with swapped arguments)

Here's a bug plain JavaScript genuinely cannot catch for you. sendTokens
expects an address and an amount, in that order. Swap them by accident,
pass a number where a string belongs, and nothing complains — not when you
save the file, not when the function is defined. It only breaks once this
code actually runs, possibly deep inside a wallet library, possibly in
production.

## S3 · CODE CARD (SVG: typed sendTokens, compiler error shown)

Add two type annotations to the exact same function, and everything
changes. The moment you save this file, TypeScript's compiler flags it
directly: argument of type number is not assignable to type string. Same
bug, same swapped arguments — but caught instantly, by your editor, before
the code has run even once.

## S4 · STEPS CARD (SVG: Write .ts files / Compiler checks types / Compiles to .js)

And that's really all TypeScript is: a superset of JavaScript. You write
dot-ts files using the exact same syntax you already know, plus optional
type annotations. A compiler called tsc checks those types for mismatches.
And then it compiles down to plain dot-js — the types are completely
erased, because browsers and Node only ever run ordinary JavaScript
underneath.

## S5 · CODE CARD (SVG: provider. autocomplete suggestion)

There's a second benefit beyond just catching bugs early: your editor gets
dramatically smarter. Once a value has a known type, typing a dot after it
brings up autocomplete listing exactly what's actually available — not a
guess, a fact, checked against the real shape of that type.

## S6 · STEPS CARD (SVG: Money is on the line / ABIs are complex / Caught before deploy)

This matters more in blockchain development than almost anywhere else.
Real money moves through this code, so a wrong-type bug isn't cosmetic —
it can mean funds sent to the wrong place. Smart contract ABIs often have
many parameters, each with a specific type, and getting one wrong by hand
is easy. TypeScript catches that mismatch on your machine, before
deployment — not after it's already live on mainnet.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

That's the pitch for TypeScript. Next lesson, we actually learn the
vocabulary — the basic types you'll annotate variables and functions with
constantly: string, number, boolean, arrays, and a few more.
