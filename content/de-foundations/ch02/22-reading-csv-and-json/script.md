# Lesson 22 — Reading CSV and JSON · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson 20 read a file manually, line by line. Here's what that
actually looks like in real, professional practice — one line.

## S2 · CODE CARD (read_csv)

Read CSV opens the file, parses every row, infers every column's
type, and hands you back a ready-to-use DataFrame. Everything Lesson
20 built by hand, done properly, in a single call.

## S3 · CODE CARD (read_json)

Read JSON works the same way, when the JSON file is shaped as a list
of objects — exactly Lesson 15's list of dictionaries. Lesson 24 goes
deeper into JSON shapes that aren't quite this simple.

## S4 · CODE CARD (parameters)

Two parameters matter constantly. Parse dates converts a column to a
real date and time type instead of loading it as plain text — without
it, you can't filter by year or month directly. D-type overrides
Pandas's automatic guess for one column — keeping something like
vendor I-D as text, even though it looks numeric, exactly like Lesson
14 warned about.

## S5 · OUTRO CARD

Get the type right at read time, and you avoid debugging it three
lessons later. Next lesson: REST APIs — getting data that has no file
to read at all. See you there.
