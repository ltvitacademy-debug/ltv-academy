# Lesson 33 — DAX Syntax Basics · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~1.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every DAX formula, no matter how complex it eventually gets, is built
from the same handful of pieces. Let's name them.

## S2 · IMAGE: qsdax_1_syntax.png (annotated formula)

Measure name, equals sign, function, parentheses, table, column — six
elements, present in nearly every formula you'll write. Read it out
loud and it's plain English: for the measure Total Sales, calculate the
SUM of the SalesAmount column in the Sales table.

## S3 · CODE: Sales[SalesAmount]

Notice the column is written table-name-then-column, in brackets — a
fully qualified reference. Within the same table you could drop the
table name, but it's good habit to keep it anyway. Long formulas
referencing several tables get much easier to read when every column is
qualified the same way.

## S4 · OUTRO CARD (SVG: next lesson, LTV seal)

Know these six pieces, and you can decode any formula you didn't write —
just find the equals sign and work outward. Next: calculated columns,
the first of two ways DAX adds new information to your model.
