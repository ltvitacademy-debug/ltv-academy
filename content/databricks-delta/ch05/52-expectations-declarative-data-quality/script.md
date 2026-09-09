# Lesson 52 — Expectations — Declarative Data Quality · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's turn Lesson 36's quarantine logic into a one-line
decorator — expectations.

## S2 · CODE CARD (the decorator)

At dlt dot expect declares a named rule and a condition rows must
satisfy. Compare this to Lesson 36's manual valid rows and
quarantined rows split, built from two separate filter calls —
here, the framework handles the actual enforcement.

## S3 · CODE CARD (three levels)

There are three levels. Plain expect warns — keeps the row, just
logs the violation. Expect or drop is Lesson 36's quarantine
behavior, directly — bad rows never reach the table. Expect or
fail is different again — one violation stops the entire pipeline
run.

## S4 · CODE CARD (less code)

And this is genuinely less code for the same outcome. Lesson 36
needed two filter calls, a separate quarantine table write, and a
separate metrics query. Here, three one-line decorators replace
all of that.

## S5 · OUTRO CARD

And the pass-fail counts show up automatically in the pipeline
UI — the same number Lesson 36 tracked by hand, now built into
the platform. Next lesson: pipeline modes, triggered versus
continuous.
