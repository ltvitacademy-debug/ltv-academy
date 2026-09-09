# Lesson 18 — Functions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Loops repeat logic. Functions package that logic up with a name, so
you never have to rewrite it — just call it.

## S2 · CODE CARD (defining)

Def names the function. The thing in parentheses is a parameter — a
value it expects. Return hands a result back. Define it once, and
call it as many times as you want, on as many different values as
you want.

## S3 · CODE CARD (defaults)

Functions can take multiple parameters, and parameters can have
default values. Min fare equals zero point zero one means callers
can skip it entirely and get that default, or override it explicitly
when they need to.

## S4 · CODE CARD (refactor)

Here's the real payoff. Take Lesson 17's inline validation loop, and
pull the rule out into its own named function. Same logic, exactly —
but now it's reusable, testable on its own, and callable from
anywhere without ever duplicating the rule.

## S5 · OUTRO CARD

And this matters more than it might seem — every single PySpark
transformation in Chapter 4 is fundamentally calling a function and
getting a result back. Next lesson: exception handling — what happens
when something goes wrong. See you there.
