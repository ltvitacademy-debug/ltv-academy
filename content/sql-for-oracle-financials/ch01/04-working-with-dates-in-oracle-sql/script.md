# Lesson 4 — Working with Dates in Oracle SQL · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Dates are everywhere in Financials — due dates, invoice dates, period
boundaries — and the unpaid-invoice challenge from lesson one depends
entirely on getting date math right. Let's build that foundation.

## S2 · CODE CARD (SYSDATE and TRUNC)

SYSDATE gives you the current date and time on the database server. Dual is
a tiny built-in Oracle table with exactly one row, used whenever you want
to evaluate an expression without touching real data. Because SYSDATE
includes a time component, Financials queries almost always wrap it in
TRUNC first — TRUNC of SYSDATE strips the time off, leaving midnight today.

## S3 · CODE CARD (date subtraction)

Here's the single most useful fact about Oracle dates: subtract one from
another, and you get back a plain number of days. TRUNC of SYSDATE, minus
invoice date, aliased days old. If the invoice is 45 days old, that
expression just returns 45. This one piece of arithmetic is the engine
behind every aging calculation in this course.

## S4 · CODE CARD (ADD_MONTHS and MONTHS_BETWEEN)

Two more date functions you'll use constantly. ADD_MONTHS shifts a date
forward or backward by whole months, correctly handling month-end edge
cases that plain day arithmetic gets wrong. MONTHS_BETWEEN returns the
number of months — with a fractional part — between two dates.

## S5 · CODE CARD (TO_CHAR and TO_DATE)

And formatting. TO_CHAR turns a date into text for a report, using a format
mask like year-month-day. TO_DATE does the reverse, parsing text back into
a real date. Always supply that format mask explicitly — relying on
Oracle's default can quietly break a report running on a differently
configured server.

## S6 · OUTRO CARD

SYSDATE, TRUNC, date subtraction, ADD_MONTHS, MONTHS_BETWEEN, TO_CHAR,
TO_DATE — that's the full toolkit for date math in Oracle. Next lesson:
NULLs, and the data-quality checks every consultant runs before trusting a
number.
