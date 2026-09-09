# Lesson 49 — Date Functions: GETDATE, DATEADD, DATEDIFF · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now that you know how dates are stored, let's actually work with them.
Three functions do most of the heavy lifting: GETDATE, DATEADD, and
DATEDIFF.

## S2 · CODE CARD (GETDATE example)

GETDATE returns the current date and time straight from the server.
You'll see it constantly for timestamping — created date, modified date —
and anywhere date math needs to reference right now.

## S3 · CODE CARD (DATEADD examples)

DATEADD moves a date forward or backward. It takes an interval — day,
month, year, and more — a number, and a date. Order date, plus 30 days,
gives you thirty days later. And to go backward instead of forward, just
use a negative number: three months ago is DATEADD month, negative
three, GETDATE.

## S4 · CODE CARD (DATEDIFF example)

DATEDIFF measures the gap between two dates. DATEDIFF day, order date,
due date, tells you how many days sit between the two. One detail worth
remembering: order matters here. Swap the start and end dates, and the
sign of the result flips.

## S5 · CODE CARD (combined query)

Put all three together, and you get something genuinely useful. This
finds every order from the last year — DATEADD computing one year ago
from right now — and shows exactly how many days have passed since each
one, using DATEDIFF against GETDATE.

## S6 · OUTRO CARD

GETDATE for right now, DATEADD to shift a date, DATEDIFF to measure
between two — the three tools behind almost every real date calculation
you'll write. Next lesson: converting and formatting data with CAST and
CONVERT. See you there.
