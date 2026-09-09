# Lesson 77 — RAISERROR and THROW · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

TRY and CATCH react to errors SQL Server generates on its own. But
sometimes you need to signal a problem SQL Server itself would never
catch — a genuine business rule, not a syntax error. This lesson covers
raising your own error, deliberately.

## S2 · CODE CARD (THROW example)

THROW is the modern way. If not exists, a product with this ID, THROW
50000, product does not exist, 1. Three pieces — an error number, a
message, and a state — and it raises an error exactly as if SQL Server
had generated it itself. This is the recommended way to raise a custom
error in modern T-SQL.

## S3 · CODE CARD (THROW re-throw)

And THROW has a second job, with no arguments at all, used inside a
CATCH block: it re-raises the exact error that was just caught,
completely unmodified. That's genuinely useful when you want to log
something, or react to it somehow, and STILL let the error keep
propagating up to whatever called this code in the first place.

## S4 · CODE CARD (RAISERROR example)

RAISERROR is the older syntax, and it predates THROW. You'll still see
it constantly in existing code — recognize it, but reach for THROW on
anything new. Notice the argument shape is different too: a message
first, then a severity level — 16 is a common one for user-caused
errors — then a state.

## S5 · OUTRO CARD

THROW raises a new error or re-raises a caught one; RAISERROR is the
older syntax you'll still encounter. Next lesson closes out Chapter 8
with SQL Server authentication modes. See you there.
