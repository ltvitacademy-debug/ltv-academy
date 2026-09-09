# Lesson 27 — Building a Simple Python ETL Process · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total. Chapter 2 finale.

---

## S1 · TITLE CARD

Fifteen lessons of individual pieces. Time to put every single one of
them into one real, working ETL script.

## S2 · CODE CARD (extract)

Extract reads the raw file exactly as it arrived, with the parse
dates and D-type settings from Lesson 22 — this is Chapter 1's raw
zone, expressed in actual code.

## S3 · CODE CARD (transform)

Transform is every cleaning technique from last lesson, combined in
one place — drop N-A, boolean filtering, drop duplicates, and a
genuinely new computed column. This is Chapter 1's cleansed zone.

## S4 · CODE CARD (load + run)

Load writes the cleaned result as Parquet — Lesson 8's format
choice, made real. And run ETL wraps the whole thing in a try
except, so a missing source file gets reported cleanly instead of
crashing everything.

## S5 · STEPS CARD (chapter recap)

And that's Chapter 2, complete. Language basics, resilience, and real
data work — Pandas, files, APIs, SQL, cleaning — all the way through
to one genuine script. This three-function shape is close to how
real, small-scale ETL actually looks in production.

## S6 · OUTRO CARD

Fifteen lessons, one real script. Next chapter: Apache Spark — the
exact same extract, transform, load thinking, but distributed across
an entire cluster instead of running on one machine. See you there.
