# Lesson 23 — Functions With Types · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

We've typed variables and objects. Functions get typed too — on three
separate parts: each parameter, the value it returns, and sometimes the
function itself as a value being passed around.

## S2 · CODE CARD (SVG: function add(a: number, b: number): number)

Parameters are annotated exactly like variables — a colon and a type after
each name. The return type goes after the closing parenthesis of the
parameter list, before the function body even starts. Call add with two
numbers, and the result is guaranteed to be typed number too.

## S3 · CODE CARD (SVG: add() with inferred return type)

In practice, you'll skip that return-type annotation most of the time.
TypeScript is perfectly capable of looking at what a function actually
returns and inferring the type on its own — here it figures out number
without being told. Annotating it explicitly is still common on functions
you export from a module, purely for readability.

## S4 · CODE CARD (SVG: optional vs default parameter)

Parameters can be optional two ways. A question mark after the name means
the caller may simply leave it out, and it comes through as undefined if
they do. A default value accomplishes something similar, but actually
fills in a real value — five thousand milliseconds here — whenever the
caller omits it.

## S5 · CODE CARD (SVG: onConfirm function type, mismatched assignment error)

Functions themselves can be typed as values, not just declared. This
syntax — parameter types, an arrow, a return type — describes what any
function assigned to onConfirm must look like. Assign one with the wrong
shape, like one that takes an extra parameter, and the compiler catches it
immediately, at the assignment, not whenever it eventually gets called.

## S6 · STEPS CARD (SVG: Event handlers / Array methods / Contract listeners)

This shows up constantly once you're writing real code. Event handlers are
typed functions. Array methods like map hand you an already-typed callback
matching the array's element type. And in blockchain code specifically,
listening for a smart contract event gives you a callback whose arguments
are typed to match that exact event's ABI definition.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

That's typing functions: parameters, return types, inference, optional and
default parameters, and function types for callbacks. Next lesson tackles
a problem all of this still has — writing one function that works
correctly for more than one specific type — with generics.
