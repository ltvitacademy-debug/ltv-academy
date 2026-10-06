# Lesson 20 — When to Fine-Tune vs. Prompt · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 4 — fine-tuning and customization. Before we touch a single training
file, this lesson answers the question that actually matters first: should you fine-tune
at all, or is there a cheaper way to get the behavior you want?

## S2 · STEPS CARD: prompt first

Every major provider's own guidance agrees on this order. Prompting is cheap, it's
instant to iterate on, and it's fully reversible — change the words, get different
behavior, right away. Retrieval grounds the model in your own documents at request time,
which solves "the model doesn't know this" without touching any weights at all.
Fine-tuning is the expensive option at the end: it costs real money, takes real time, and
leaves you with a new artifact you now have to manage and maintain.

## S3 · STEPS CARD: good candidates

So when does fine-tuning actually earn that cost? A narrow style or format that's hard to
describe in words but easy to demonstrate with hundreds of examples. Shrinking a long,
repeated system prompt into the model's weights, so you stop paying its token cost on
every single call. Domain vocabulary that keeps resisting prompting no matter how it's
worded. And notice what's missing from this list: teaching the model new facts. That's a
retrieval problem, not a fine-tuning one.

## S4 · CODE CARD: a current fact

Here's something worth knowing before you plan around either path, verified as of right
now: Anthropic's own Claude API has no self-serve fine-tuning endpoint at all — it's
Bedrock or professional services only. And OpenAI's fine-tuning API, which has existed
for years, is actively being wound down, with new job creation ending in January of 2027.
The self-serve fine-tuning landscape is shrinking, not growing, right as prompting and
retrieval have gotten dramatically more capable.

## S5 · STEPS CARD: decision framework

So here's the order to actually ask these questions in. Can a better prompt fix it? If
yes, stop there. Is it narrow and stable enough that fine-tuning would pay for itself over
time? Maybe. And either way, do you actually have hundreds of good examples to train on —
because that's required no matter which path you take.

## S6 · OUTRO CARD

Prompt first, fine-tune only when it earns its cost, and know the current landscape before
you commit. Next lesson assumes you've made that call, and walks through the real
mechanics: training files, fine-tuning jobs, and what you get back at the end. See you
there.
