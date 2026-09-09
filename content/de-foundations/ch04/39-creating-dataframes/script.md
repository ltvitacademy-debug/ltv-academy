# Lesson 39 — Creating DataFrames · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Chapters one through three built the concepts. Starting right now,
every lesson is real PySpark code — welcome to Chapter 4.

## S2 · CODE CARD (tuples + schema)

Here's creating a DataFrame from a list of tuples, with an explicit
schema. Unlike Lesson 22's read CSV, where Pandas just guesses types,
here you're stating the schema yourself — string, integer, double.
That matters more in Spark, where a wrong guess across genuinely
distributed data is far more expensive to catch later.

## S3 · CODE CARD (dicts)

You can also build one from a list of dictionaries — Lesson 15's
exact shape, again. Spark infers the schema automatically here, the
same way Pandas did back in Lesson 21.

## S4 · CODE CARD (range)

And for quick testing, spark dot range makes a tiny DataFrame
instantly — one column, I-D, zero through nine. No real data needed
at all, and several labs in this chapter use exactly this.

## S5 · OUTRO CARD

Tuples with an explicit schema, dictionaries with inference, or
range for a quick test. Next lesson: reading the real NYC Taxi file,
in actual PySpark. See you there.
