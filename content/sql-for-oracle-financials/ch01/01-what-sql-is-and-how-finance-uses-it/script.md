# Lesson 1 — What SQL Is and How Finance Uses It · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to SQL for Oracle Financials. Every Oracle Fusion screen you click
through is a window onto a database underneath — and in this course, you
learn to query that database directly, to answer the questions the screens
were never built to answer.

## S2 · STEPS CARD (a question no screen answers in one click)

Here's the question we'll come back to again and again: Finance needs every
unpaid supplier invoice over ten thousand dollars that's more than thirty
days old. No standard Payables inquiry screen has one button for that — it
mixes a dollar threshold, an age calculation, and a payment status all at
once. SQL is how you answer it directly, by telling the database exactly
which rows qualify.

## S3 · CODE CARD (a SELECT statement)

This is the shape of almost everything you'll write in this course. Select
invoice number and invoice amount, from the invoices table, where the
invoice amount is over ten thousand. Read it like English — you're
describing the result you want. You're not writing step-by-step instructions
for how to go find it; the database works out the how.

## S4 · STEPS CARD (SELECT vs. the statements this course skips)

This course sticks to one statement almost exclusively: SELECT, for reading
and investigating data. INSERT, UPDATE, and DELETE — the statements that
change data — belong to a different kind of work, data loading, which is
exactly what the FBDI and ADFdi course covers later in this path. Here, your
job is to ask precise questions, not to change the books.

## S5 · OUTRO CARD

A consultant who can write a precise SELECT can investigate almost any
question Finance raises without waiting on a custom report. Next lesson:
SELECT, FROM, and WHERE, applied to your first real Oracle Financials table.
