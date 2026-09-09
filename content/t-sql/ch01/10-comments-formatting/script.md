# Lesson 10 — Comments & Query Formatting · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We're closing out Chapter 1 with something less flashy than SELECT or
CASE, but just as important in the real world: comments, and the
formatting habits that keep a script readable months after you wrote it.

## S2 · CODE CARD (-- comment example)

Two dashes start a single-line comment — everything after them, to the end
of that line, gets ignored by SQL Server. You've actually already seen
this. Back in Lesson 1, that sample screenshot had a comment just like
this one, right above its select statement.

## S3 · CODE CARD (/* block comment */ example)

For anything longer, use a block comment: slash-star to open, star-slash
to close, and everything in between is ignored, even across multiple
lines. Great for a header describing what a whole script does, or for
temporarily switching off a chunk of code while you test something else.

## S4 · CODE CARD (WHY vs WHAT comment example)

Here's the real skill, though: a good comment explains WHY, not what.
Writing "select first name and last name" above a line that already
selects first name and last name adds nothing. But explaining that
marketing needs this list for a specific mailer, with a ticket number —
that's the kind of thing future you, or the next developer, actually needs
to know.

## S5 · STEPS CARD (UPPERCASE / ONE CLAUSE / SEMICOLONS / USE+GO)

From here forward, every script in this course follows the same
conventions, so you can focus on the T-SQL itself instead of decoding
formatting. Keywords in uppercase. One clause per line once a query gets
past one or two clauses. A semicolon on every statement. And every single
script opens with USE and GO, exactly like we covered in Lesson 2.

## S6 · OUTRO CARD

That wraps up Chapter 1. You now have the full vocabulary for a basic
query: select, from, column lists, aliases, concatenation, case, distinct,
and how to document what you write. Chapter 2 builds straight on top of
this: filtering rows with WHERE, wildcards, NULL handling, and sorting your
results. See you there.
