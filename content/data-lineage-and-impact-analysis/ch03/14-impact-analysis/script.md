# Lesson 14 — Impact Analysis · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Impact analysis answers one question: if this changes, what breaks?
It's Lesson 12's downstream walk, put to work before a change ships,
instead of after a stakeholder reports something's wrong.

## S2 · STEPS CARD (the process)

Three steps. Identify the change point — the exact column or
transformation about to change. Traverse downstream, following every
dependency, then every dependency of those, until you hit the leaves.
Then classify what you find — not every consumer is affected the same
way.

## S3 · STEPS CARD (CDEs matter most)

Not all impact is equal. Metadata Management, Chapter 4, introduced
Critical Data Elements — the small set whose errors have outsized
consequences. When you traverse downstream, the first thing worth
checking is whether the path touches a CDE anywhere — that matters
more than how many total things get touched.

## S4 · CODE CARD (worked example)

Renaming Orders dot OrderTotal: it feeds RevenueFact, which feeds an
executive revenue dashboard — a CDE — and a nightly commission
calculation job. It also feeds an inventory reorder view's filter
logic. Three consumers, but the dashboard branch is the one to flag
loudest.

## S5 · OUTRO CARD

Next lesson: change impact assessment — turning this walk into a
formal, repeatable process with a document, a risk classification,
and a sign-off, instead of a one-off exercise you do from memory.
