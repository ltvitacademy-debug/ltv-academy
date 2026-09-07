# Lesson 17 — Conditional Columns & Columns From Examples · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Some columns aren't extracted or merged from what's already there — they
depend on a rule. This lesson covers two ways to build one: spelling the
rule out yourself, or just showing Power Query the answer.

## S2 · IMAGE: add-conditional-column-sample-table-start.png (sample table)

Here's a table with a customer group number and three different price
tiers. The goal: one Final Price column that picks the right tier
automatically, based on each customer's group.

## S3 · IMAGE: add-conditional-column-multiple-clauses.png (dialog)

Conditional Column builds exactly this, no formula required. Read it like
a sentence: if CustomerGroup equals 1, output Tier 1 Price. Else if it
equals 2, output Tier 2 Price. Otherwise, output Tier 3 Price. Add clause
chains as many conditions as you need, tested top to bottom — first match
wins.

## S4 · IMAGE: add-conditional-column-sample-table-final.png (result)

Every row picks the correct tier. One thing to remember: the new column
comes in as the Any data type — set the real type afterward, same as
always.

## S5 · IMAGE: add-column-from-example-from-selection-buckets.png (typing an example)

Now the other approach. Sometimes you know the answer you want, but not
which button gets you there. Column From Examples flips it around: type
what the result should look like — fifteen thousand to twenty thousand,
for this income value — and Power Query infers the pattern, filling in
every other row on its own. Watch the formula above the table — that's
the actual code it just wrote, live.

## S6 · IMAGE: add-column-from-example-from-selection-buckets-final.png (final result, Inserted Range step)

Select OK, and it becomes a real step in your query, right there in
Applied Steps — fully editable, exactly like any transformation you built
by hand.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Know the exact rule? Conditional Column. Know the result but not the
route? Column From Examples. Next lesson: pivoting and unpivoting —
reshaping a table's whole layout, not just one column. See you there.
