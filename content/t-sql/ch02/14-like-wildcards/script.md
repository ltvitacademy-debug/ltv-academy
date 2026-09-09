# Lesson 14 — LIKE and Wildcards · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Equals only matches an exact value. But what if you don't know the exact
value — you just know it starts with something, or contains something?
That's what LIKE is for: pattern matching, with a small set of wildcard
characters.

## S2 · CODE CARD ('Sm%' and '%son%')

The percent sign matches zero or more of any character. Last name LIKE
Sm-percent matches Smith, Smart, or just Sm by itself — anything starting
with those two letters. Put a percent sign on both sides, and you match
anywhere in the string: percent-son-percent finds Johnson, Sondheim,
Wilson — anything containing son at all.

## S3 · CODE CARD ('BK-____')

The underscore is stricter: it matches exactly one character, no more, no
fewer. B-K-dash followed by four underscores matches a BK-dash prefix
followed by precisely four more characters — not three, not five.

## S4 · CODE CARD ('[CK]ing' and '[A-M]%')

Square brackets match one character from a set you define. Bracket C-K,
closing bracket, then ing — that matches Cing or King, and nothing else.
You can also use a range inside the brackets: bracket A-dash-M matches any
single starting letter from A through M.

## S5 · CODE CARD ('[^A-M]%')

And add a caret right after the opening bracket to negate the set. Bracket
caret A-dash-M matches any character that is NOT in that A-through-M
range. Same idea as NOT from last lesson, just scoped to one character
position.

## S6 · OUTRO CARD

Percent for any length, underscore for exactly one character, brackets
for a set, caret to negate that set. Next lesson: IN and BETWEEN, shorter
ways to write what would otherwise take a long chain of OR conditions or
comparisons. See you there.
