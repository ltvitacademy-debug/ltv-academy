# Lesson 2 — Data Quality Dimensions · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 1 defined data quality as fitness for use. Today we break that single idea into the six measurable dimensions you'll use for the rest of this course.

## S2 · STEPS — Accuracy and completeness

Accuracy asks: does this value match the real-world fact? A perfectly formatted address the customer moved out of two years ago is still wrong. Completeness asks a different question: is anything missing that should be there? And "complete" depends on context — a blank middle name is usually fine, a blank order total on a shipped order usually isn't.

## S3 · STEPS — Consistency and validity

Consistency asks whether the same fact agrees with itself across systems — "NY" in billing and "New York" in shipping might both be valid, but together they're inconsistent, and that breaks any report joining the two. Validity asks something narrower: does the value conform to its defined rule? A status column containing "Shipp3d" instead of "Shipped" is a validity failure — exactly what SQL is best at catching directly.

## S4 · STEPS — Uniqueness and timeliness

Uniqueness asks whether one real customer, product, or order is represented by exactly one row — duplicate signups quietly split purchase history and inflate every count built on top. Timeliness asks whether the data is fresh enough for the decision being made right now — a perfectly accurate inventory count from eighteen hours ago can still cause you to oversell something that's already gone.

## S5 · STEPS — They can conflict

Here's the part worth sitting with: these six aren't independent dials you max out separately. A stricter validity rule that rejects any oddly formatted phone number can improve validity while quietly hurting completeness, because legitimate international numbers now get rejected instead of stored. Deciding which dimension matters most for a given use is exactly what Chapter 4's rules work is about.

## S6 · OUTRO

Six dimensions, six different questions about the same data. Next up: Lesson 3 puts a real dollar figure on what happens when all six go unmanaged.
