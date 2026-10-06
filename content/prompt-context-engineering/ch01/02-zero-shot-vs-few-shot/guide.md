# Lesson 2 — Zero-Shot vs. Few-Shot Prompting

**Chapter 1 · Prompt Engineering Fundamentals · Lesson 2 of 24**

## What you'll learn

- The difference between zero-shot (instructions only) and few-shot (instructions + examples) prompting
- Why few-shot examples are often more effective than a longer written description
- How many examples you actually need, and the diminishing returns past that point
- A worked example showing the same task done both ways

## Zero-shot: instructions alone

**Zero-shot prompting** means asking the model to do a task by describing it,
with no worked examples included. It relies entirely on the model's training
to infer what you want from the description.

```
Zero-shot prompt:
"Classify this support ticket as
Billing, Technical, or Account:

'I was charged twice for my
subscription this month.'"
```

This works well for tasks the model already handles reliably — most
general classification, summarization, and translation tasks don't need
examples. It's the simplest prompt to write and the cheapest in tokens.

## Few-shot: instructions plus examples

**Few-shot prompting** adds a small number of worked input/output pairs
before the real request, showing the model the exact pattern, format, or
judgment call you want it to copy.

```
Few-shot prompt:
"Classify each ticket as Billing, Technical, or Account.

Ticket: 'The app crashes every time I open settings.'
Category: Technical

Ticket: 'Please update the email on my profile.'
Category: Account

Ticket: 'I was charged twice for my subscription this month.'
Category:"
```

The examples don't just state the categories — they demonstrate the exact
output format (one word, no punctuation) and resolve edge cases a plain
description can't, like how to classify a ticket that touches two
categories at once.

## When few-shot earns its keep

Few-shot prompting is worth the extra tokens when:

- The output needs a **specific, unusual format** that's hard to describe in words (a particular JSON shape, a house style)
- The task involves **judgment calls** best shown rather than explained (what counts as "urgent," what tone is "on brand")
- **Zero-shot results are inconsistent** — the model gets it right sometimes and wrong other times on the same kind of input

Two to five examples is usually enough. Past that, returns diminish fast —
extra examples mostly just add tokens and cost without further improving
consistency, and a poorly chosen example can actively mislead the model
more than no example at all.

## Key terms

| Term | Meaning |
|---|---|
| Zero-shot prompting | Describing a task with no worked examples |
| Few-shot prompting | Describing a task plus 2-5 worked input/output example pairs |
| In-context learning | The model picking up a pattern from examples in the prompt itself, without retraining |

## Lab

Take a classification or formatting task you'd normally write as a plain
instruction. Write it zero-shot first, then rewrite it few-shot with three
examples. Run both and compare how consistently each one matches the exact
format you wanted.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking, when
you'd reach for few-shot over zero-shot — and why adding ten examples
usually isn't better than adding three.
