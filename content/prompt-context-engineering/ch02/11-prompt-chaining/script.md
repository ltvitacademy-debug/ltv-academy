# Lesson 11 — Prompt Chaining · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

Back in Lesson 5 we saw what happens when one prompt tries to do too many
jobs at once — quality drops on all of them. This lesson gives you the
structural fix: breaking that single prompt into a chain.

## S2 · CODE CARD (three-step chain)

Here's a three-step chain turning a long transcript into a translated
summary. Step one extracts pricing quotes as a JSON array. Step two
summarizes those quotes into three themes. Step three translates that
summary into Spanish. Each step's output becomes the next step's input.

## S3 · CODE CARD (why it beats one prompt)

Compare that to one overloaded prompt doing all three jobs at once. In
the chain, each step gets full attention, and one weak step means
retrying just that step — not starting completely over. In one giant
prompt, a bad result is hard to even diagnose.

## S4 · CODE CARD (debugging a chain)

If step two's summary comes out weak, you fix and re-run step two alone.
You don't re-extract the quotes, you don't redo the translation. Each
step is independently testable using the same iteration loop from Lesson
6.

## S5 · STEPS CARD (where to split)

So where do you actually split a chain? When the task changes kind —
extraction, then reasoning, then formatting are different kinds of work.
And when a step's output needs checking before the next step runs on it.
Don't split purely for the sake of more steps.

## S6 · OUTRO CARD

Break the overloaded prompt into focused steps, each one testable on its
own. That closes out Chapter 2 — advanced prompting techniques. From
here, this course moves into context engineering: managing everything the
model sees beyond just the prompt itself.
