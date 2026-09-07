# Lesson 10 — Cleaning Text Data · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Real data is never as clean as this course's examples have been so far.
This lesson is about the mess that shows up constantly in genuinely real
files: bad spacing, and inconsistent capitalization across the exact same
value.

## S2 · CODE: df["col"].str.strip()

Every single string-cleaning method in Pandas lives behind dot str,
applied to a whole column at once instead of one value at a time. Strip
removes leading and trailing whitespace specifically — not spaces in the
middle of a value, just the invisible padding at the start and end that
quietly breaks exact-match comparisons. A filter looking for West will
silently miss a value stored as space West, because as far as Pandas is
concerned, those are two completely different strings.

## S3 · CODE: .str.strip().str.title()

Lower, upper, and title all standardize case across a whole column in
one line — title specifically capitalizes the first letter of each word.
Chaining strip and then title together, in that exact order, is a
genuinely common real-world pattern: strip first, so that title
correctly capitalizes the actual first letter of the word, instead of
getting confused by a leading space sitting in front of it.

## S4 · CODE: df.rename(columns={"customer name": "Customer Name"})

Column names themselves are exactly the kind of thing worth cleaning too,
and rename is the tool for that. It takes a dictionary — the old column
name as the key, the new name as the value — the exact same
key-and-value dictionary shape Lesson 5 introduced for dictionaries
generally, just applied here to column names instead of customer data.

## S5 · CODE: df["Region"].str.replace("Sotuh", "South")

And if one specific value is simply wrong throughout an entire column —
a misspelling, an outdated product name, a typo from data entry —
replace fixes every single occurrence of it at once, across the whole
column, in exactly one line of code.

## S6 · OUTRO CARD

Strip, the case-changing methods, rename, and replace — four genuinely
practical tools for the mess real data actually arrives in. Lesson 11
tackles a kind of mess that's even more common than any of these: values
that are missing entirely.
