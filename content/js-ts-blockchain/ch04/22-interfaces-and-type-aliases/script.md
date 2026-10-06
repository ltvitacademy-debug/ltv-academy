# Lesson 22 — Interfaces & Type Aliases · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Everything so far has typed single values. Real code is full of objects —
a wallet, a transaction, a user — and this lesson covers the two ways
TypeScript lets you name the shape of one: interfaces, and type aliases.

## S2 · CODE CARD (SVG: interface Wallet with address/balance/isConnected)

An interface names a shape: a list of property names, each with its own
required type. Here, Wallet requires exactly an address string, a balance
number, and an isConnected boolean. Assign an object missing one of those,
or with the wrong type on one, and the compiler rejects it immediately.

## S3 · CODE CARD (SVG: optional nickname?, readonly chainId)

Two modifiers come up constantly. A question mark after a property name
makes it optional — nickname can simply be left out entirely. readonly
allows reading the property freely, but blocks reassigning it after the
object is created — perfect for something like a chain ID that should
never silently change underneath you.

## S4 · CODE CARD (SVG: type Wallet, type Address, type TxStatus union)

type aliases can describe an object shape too, with nearly identical
syntax to an interface. But type can also name things an interface flatly
cannot: a primitive like Address as just a renamed string, or — genuinely
useful — a union of specific allowed string values, like TxStatus being
only ever pending, confirmed, or failed.

## S5 · CODE CARD (SVG: interface merging vs type duplicate-identifier error)

Here's the one real structural difference between them. Declare the same
interface name twice, and TypeScript merges the two declarations' members
together automatically — genuinely useful when extending a type from a
library you don't control. Try that same trick with type, and it's simply
a compiler error: duplicate identifier.

## S6 · STEPS CARD (SVG: Shaping an object? / Union, primitive, or tuple?)

So which do you actually reach for? If you're just shaping a plain object,
either works fine, and plenty of teams default to interface out of habit
or house style. But the moment you need a union of specific values, a
primitive alias, or a tuple, type is your only option — interface simply
cannot express those.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

That's shaping objects: interfaces, type aliases, optional and readonly
properties, and the declaration-merging difference between them. Next
lesson, we type the other half of nearly every program — functions
themselves, their parameters, and their return values.
