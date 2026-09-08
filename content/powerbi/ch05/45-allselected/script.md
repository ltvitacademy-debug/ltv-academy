# Lesson 45 — ALLSELECTED · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words.

---

## S1 · TITLE CARD

ALL ignores every single filter it encounters, no exceptions — even the
ones a real user deliberately chose on purpose themselves. That turns
out to be a genuine problem for one extremely common, everyday report
pattern.

## S2 · CODE: ALLSELECTED example

Picture a table broken out by Category and Year, already filtered down
to Europe by a report-level filter someone applied on purpose. ALLSELECTED
specifically keeps that Europe filter in place — because a real user
chose it deliberately, and undoing that would be genuinely wrong — but it
does ignore only the Category and Year breakdown that the visual itself
automatically created on its own, without anyone asking for it.

## S3 · CODE: ALL(Sales) -> full dataset | ALLSELECTED(Sales) -> user's selection

ALL throws away the Europe filter too, giving you the entire dataset's
true grand total regardless of any selection a user actually made. 
ALLSELECTED instead gives you the total for everything the user actually,
deliberately selected — a genuinely true visual total, matching exactly
what someone looking at the report would honestly expect to see when
they glance at a subtotal row. Same underlying shape of formula in both
cases, but each one answers a meaningfully different question.

## S4 · OUTRO CARD

Respect the user's own deliberate selections, but ignore only the
visual's own internal breakdown — that's specifically what ALLSELECTED
does for you. Ignore absolutely everything, selections included — that's
what plain ALL does instead. Next, the final lesson of this entire
chapter: variables, and the habits that keep your formulas genuinely
readable for the next person who opens them up.
