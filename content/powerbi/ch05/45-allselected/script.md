# Lesson 45 — ALLSELECTED · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~1.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

ALL ignores every filter — even ones a user chose on purpose. That's a
problem for one very common report pattern.

## S2 · CODE: ALLSELECTED([<table> | <column>, ...])

Picture a table broken out by Category and Year, filtered to Europe by
a report-level filter. ALLSELECTED keeps that Europe filter — because
the user chose it — but ignores only the Category and Year breakdown
the visual itself created.

## S3 · CODE: CALCULATE([Sales], ALL(Sales))  vs  CALCULATE([Sales], ALLSELECTED())

ALL throws away the Europe filter too, giving you the entire dataset's
grand total. ALLSELECTED gives you the total for everything the user
actually selected — a true visual total. Same shape, different question
answered.

## S4 · OUTRO CARD (SVG: next lesson, LTV seal)

Respect the user's selections, ignore only the visual's own breakdown —
that's ALLSELECTED. Ignore everything — that's ALL. Next, the final
lesson of the chapter: variables and the habits that keep formulas
readable.
