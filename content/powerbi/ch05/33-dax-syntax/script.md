# Lesson 33 — DAX Syntax Basics · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Every DAX formula, no matter how long or complicated it eventually gets,
is built from the exact same handful of pieces. Learn to name them once,
and you can read almost anything written in this language.

## S2 · IMAGE: qsdax_1_syntax.png (annotated formula)

Take last lesson's simplest measure and label every piece: the measure
name, an equals sign, a function, parentheses, a table, and a column —
six elements, present in nearly every formula you'll ever write in this
course. Read it out loud and it's genuinely plain English: for the
measure Total Sales, calculate the sum of the SalesAmount column in the
Sales table. Nothing more mysterious than that sentence, just written in
a different notation.

## S3 · CODE: Sales[SalesAmount]

Notice the column is written as table name, then column name in square
brackets — a fully qualified reference. Within the same table, DAX
technically lets you drop the table name and write just the column, but
it's worth keeping the habit anyway. Long formulas that reference several
different tables get genuinely easier to read when every single column
reference follows the same fully qualified pattern, instead of mixing
qualified and unqualified references throughout the same formula.

## S4 · OUTRO CARD

A few syntax rules worth knowing early: table names with spaces need
single quotes around them, column names always go in square brackets
never parentheses, DAX is case-insensitive once your data loads, and
formulas can nest up to sixty four functions deep — though you'll rarely
need more than three or four in practice. Know these six pieces, and you
can decode any formula you didn't write yourself, just by finding the
equals sign and working outward from there. Next: calculated columns,
the first of two genuinely different ways DAX adds new information to
your model.
