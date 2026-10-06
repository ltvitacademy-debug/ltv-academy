# Lesson 6 — Evaluation & Tuning · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every project in this course needs one thing the pipeline alone
doesn't give you: proof. Time to measure this RAG assistant instead of
guessing whether it works.

## S2 · STEPS CARD (why measure)

"I tried a few questions and it looked fine" is a vibe, not an
evaluation. A real one lets you say something specific — recall at
five is eighty percent, judge score averages four point one out of
five — numbers you can re-run and compare after any change.

## S3 · CODE CARD (recall@k)

Recall at k asks one narrow question: of the chunks retrieval
returned, did the one actually containing the answer show up at all?
A low score here means the problem is upstream of generation entirely
— no prompt wording fixes a retrieval miss.

## S4 · CODE CARD (LLM-as-judge)

To score the generated answer itself, ask Claude to grade it against
your expected answer, on a one-to-five scale. It's a cheap proxy for
human grading, not a replacement — spot-check a handful of its scores
by hand before trusting the average.

## S5 · STEPS CARD (tuning levers)

Three places to pull when a number is low: chunk size and overlap, to
keep multi-part answers intact in one chunk; top-k, to give the right
chunk more chances to appear; and re-ranking — retrieving more
candidates than needed, then narrowing to the best few before
generating.

## S6 · OUTRO CARD

Next: containerizing this assistant behind a real API and finishing
the portfolio README.
