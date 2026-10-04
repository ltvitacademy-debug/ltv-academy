# Lesson 14 — Validity · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Validity is the dimension closest to home for anyone who already knows
SQL, because the database is already partly enforcing it for you —
through the column's own data type.

## S2 · STEPS — Four kinds of rule

Four common kinds of validity rule: type, must be numeric or a valid
date. Format, must match a pattern, like a phone number's digit count.
Range, must fall between bounds, like a quantity that can never go
negative. And domain — must be one of a fixed set of legal values,
like an order status.

## S3 · CODE — Range and domain checks

Two of the most common checks you'll write. A range check flags
quantities outside a sane bound. A domain check flags any status value
that isn't one of the handful your business actually recognizes.

## S4 · CODE — A format check with LIKE

SQL Server doesn't have native regular expressions, but LIKE with
wildcards covers a surprising amount of ground — here, a zip code
pattern that has to be exactly five digits, nothing else.

## S5 · STEPS — Detect vs. prevent

Everything so far detects violations that already exist. A CHECK
constraint goes one step further: it prevents the bad value from ever
being written in the first place, enforced by the database engine
itself.

## S6 · CODE — CHECK constraints

Here's that same quantity and status rule, now written as actual
constraints on the table. Try to insert a negative quantity after
this, and SQL Server rejects it outright.

## S7 · STEPS — Why you still need both

A constraint stops new bad data. It says nothing about bad data
already sitting in the table from before the constraint existed. The
audit query and the constraint do different jobs — you need both.

## S8 · OUTRO

Validity is about rules. Next up: uniqueness — what happens when a
value is perfectly valid, perfectly accurate, and still shows up
twice.
