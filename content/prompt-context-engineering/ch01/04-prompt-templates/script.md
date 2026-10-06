# Lesson 4 — Prompt Templates · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

We've written several specific, well-structured prompts so far. But what
happens when the same kind of prompt needs to run hundreds of times, with
only a few details changing each time? That's what prompt templates solve.

## S2 · CODE CARD (one-off prompt)

Here's a prompt written for exactly one customer ticket: order 4471,
apologize, offer a refund or reship, under 80 words. It's specific and it
works. But it's also useless for the next ticket without rewriting it from
scratch.

## S3 · CODE CARD (template version)

Pull the parts that change into named variables, and the same prompt
becomes reusable: the customer's message, the resolution options, and the
word limit all become variables, while the structure — apologize, offer
options, respect the limit — stays fixed and tested.

## S4 · CODE CARD (two fills)

Fill that one template two different ways — a late order, or a double
charge — and you get two fully appropriate replies, same tone, same
structure, same guarantees, without hand-writing either prompt from
scratch.

## S5 · CODE CARD (well-scoped vs too broad)

Not every variable belongs in a template. A well-scoped variable holds one
fact that actually changes — a customer message, a word limit. A variable
that tries to hold an entire instruction inside it just defeats the
purpose — you're back to writing a new prompt by hand, with extra steps.

## S6 · OUTRO CARD

Templates keep your structure consistent while only the real variables
change. Next lesson, we flip this around and look at the failure modes
that show up when a prompt — templated or not — goes wrong.
