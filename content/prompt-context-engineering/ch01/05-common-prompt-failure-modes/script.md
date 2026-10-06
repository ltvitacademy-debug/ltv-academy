# Lesson 5 — Common Prompt Failure Modes · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

We've spent four lessons building good prompts. Now let's go the other
direction: what does it actually look like when a prompt goes wrong, and
how do you recognize the failure fast enough to fix it?

## S2 · CODE CARD (ambiguous)

Failure one: ambiguous instructions. "Summarize this article" technically
gets answered — but how long, for whom, bullets or prose? The model picks
defaults you never agreed to. The fix is naming the length, audience, and
format explicitly.

## S3 · CODE CARD (conflicting)

Failure two: conflicting instructions. "Be extremely detailed, but keep it
under 50 words" asks for two things that can't both be true. The model
silently picks a winner, often inconsistently. The fix is picking one
priority yourself and saying so.

## S4 · CODE CARD (missing format)

Failure three: missing output format. "List the three biggest risks"
never says what shape the answer takes — a list, a table, plain prose —
so it varies run to run. If something downstream expects structured data,
say exactly what structure you want.

## S5 · CODE CARD (overloading)

Failure four: overloading a single prompt. Extract dates, summarize,
translate, and format — all in one call — and quality drops on every one
of those jobs as the model splits its attention. The fix is often simply
splitting it into separate prompts.

## S6 · OUTRO CARD

All four failures trace back to the same thing: a decision the prompt
left open, that the model had to make for you. Next lesson, we turn
noticing failures into a repeatable process — iterating on a prompt
systematically instead of guessing at fixes.
