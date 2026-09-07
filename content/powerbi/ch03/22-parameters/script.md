# Lesson 22 — Parameters · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every filter, every threshold you've typed directly into a step so far is
locked in place — change your mind, and you have to go find that exact
step and edit it by hand. Parameters fix that.

## S2 · IMAGE: manage-parameters.png (Manage Parameters dialog)

Every parameter you create lives in one place: Manage Parameters, on the
Home ribbon. A parameter is just a named, reusable value — set it once,
reference it anywhere.

## S3 · IMAGE: step-argument-sample-table.png (Orders table)

Here's an Orders table with a Margin column. The goal: filter it down to
just the orders above some minimum margin — and make that minimum easy to
change later, without digging back through Applied Steps.

## S4 · IMAGE: step-argument-sample-parameter.png (creating Minimum Margin)

Name it, set its type — same reasoning as data types back in Lesson 13 —
and give it a starting value. Minimum Margin, a decimal number, starting
at 0.2.

## S5 · IMAGE: step-argument-sample-parameter-select-parameter.png (Filter Rows, Select a parameter)

Now use it. Instead of typing a number straight into the filter, most
filter dialogs offer Select a Parameter right next to Enter a Value. Pick
Minimum Margin here instead.

## S6 · IMAGE: step-argument-sample-parameter-updated.png (updated result)

And here's the payoff. Change the parameter's value from 0.2 to 0.3, and
every step referencing it updates immediately — the Orders query
re-filters on its own. No hunting through steps, no retyping a number in
five different places.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

One value, named once, reused everywhere — and one edit changes it
everywhere it's used. Parameters also power reusable file paths and custom
function arguments, for when you're ready to go further. Last lesson of
the chapter: Power Query best practices and performance. See you there.
