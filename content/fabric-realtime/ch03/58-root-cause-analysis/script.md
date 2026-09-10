# Lesson 58 — Root Cause Analysis, Step by Step · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Root cause analysis, step by step — a simple technique for not
stopping at the first answer.

## S2 · CODE CARD (the Five Whys)

The five whys moves one layer deeper each time. The alert fired
repeatedly — why? A window was misconfigured — why? Someone edited
prod directly — why? There was no CI check stopping them. Each
answer gets closer to something actually fixable.

## S3 · CODE CARD (evidence, not guessing)

Logs, metrics, and traces make each why answerable with real
evidence, not a guess — exactly which stage produced the bad
result, and exactly when.

## S4 · STEPS CARD (root cause vs. contributing factor)

The symptom is what got noticed. A contributing factor made it
worse. The root cause is the earliest fixable point that would
have prevented the whole chain — fixing only the symptom leaves
that root cause standing.

## S5 · OUTRO CARD

A blameless writeup asks what allowed this, not who broke it — and
gets the full honest story because nobody's defending themselves.
Next up: disaster recovery and backup strategies.
