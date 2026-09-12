# Script — String Calculations

## Segment 1 (title)

String Calculations. Tableau's calculation language includes a full set of string functions for concatenating, extracting, searching, and cleaning up text fields — this lesson covers the ones you'll reach for constantly.

## Segment 2 (code: concatenation)

Tableau treats the plus sign as string concatenation whenever both sides are text. Full Name equals First Name, plus a literal space in quotes, plus Last Name. That builds one combined text field out of two others, with a space in between.

## Segment 3 (code: extracting a substring)

Three functions cover most "give me part of this text" needs: LEFT, RIGHT, and MID. Order Year equals LEFT of Order ID, comma, 4 — that pulls the first four characters. RIGHT pulls from the end instead, and MID pulls from the middle starting at a given position.

## Segment 4 (code: search and replace)

CONTAINS answers a yes-or-no question about whether a substring appears anywhere inside a string. Is Furniture Order equals CONTAINS, Category, comma, "Furniture" — that returns true or false, which is genuinely useful inside an IF statement. REPLACE goes further and actually swaps one substring for another wherever it's found.

## Segment 5 (code: cleaning up text)

Real-world text data is rarely consistent — the same category might show up capitalized differently, or with stray whitespace, across different rows. Clean Category equals TRIM of UPPER of Category — UPPER forces capitals, TRIM strips leading and trailing whitespace, and wrapping one inside another like this is completely normal.

## Segment 6 (outro)

Next lesson, date calculations — DATEDIFF, DATEADD, and the functions you'll use to work with dates throughout the rest of this course.
