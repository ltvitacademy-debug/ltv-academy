# Lesson 1 — Why AI Systems Have a Genuinely New Attack Surface

**Chapter 1 · AI and LLM Security Fundamentals · Lesson 1 of 4**

## What you'll learn

- Why natural-language input is an attack vector that traditional
  input-validation thinking doesn't fully cover
- Why an LLM's probabilistic, non-deterministic output breaks
  assumptions your existing security tooling quietly depends on
- Why training data and model weights are assets you now have to
  protect, in addition to the data your systems have always held
- Why this is additive risk layered on top of everything you already
  defend, not a replacement for it

## You already defend software. Now you're defending a reasoning system.

Every system you've secured so far — a web app, an API, a database —
shares one property: its behavior is fixed by code you (or someone on
your team) wrote and can read. Input validation works because you can
enumerate what a field is supposed to contain and reject everything
else. An AI system built around a large language model breaks that
assumption in three specific ways. None of this means your existing
skills stop mattering — API security, access control, and data
protection are still exactly as important. It means there's a new
layer sitting on top of them that those disciplines were never
designed to cover.

## 1. Natural language is now a command channel, not just data

In a traditional application, user input is data — a username, a
search term, a form field — that your code parses according to rules
you defined. An LLM doesn't parse input against a fixed grammar; it
reads everything in its context window, instructions and user content
alike, as the same kind of material, and lets the model's learned
behavior decide what counts as an instruction. That's what makes
**prompt injection** possible: text submitted as "data" (a pasted
email, a scraped web page, a document the model is asked to
summarize) can contain phrasing that the model treats as a new
instruction, because the model has no hard boundary between "content
I was told to process" and "commands I was told to follow." A SQL
injection attack works because a database engine was tricked into
treating data as code. Prompt injection works for a related but
distinct reason: the model was never given a code/data boundary to
blur in the first place. You can't just parameterize your way out of
it the way you would with a prepared statement.

## 2. The same input doesn't reliably produce the same output

Traditional security testing assumes determinism: run the same input
twice, get the same result, so a passing test stays passing. LLMs are
probabilistic — they sample from a distribution over possible next
tokens, so the same prompt can produce different output on different
runs, and a small change in wording can produce a disproportionately
different response. That breaks two things security teams rely on.
First, testing: you can't fully "regression test" an LLM-backed
feature the way you'd test a deterministic function, because passing
once doesn't guarantee passing again. Second, filtering: a keyword
blocklist or a single-pass content filter can be bypassed just by
rephrasing, because there's no fixed set of "bad inputs" to enumerate
— the attack surface is the space of everything that can be phrased,
which is effectively unbounded.

## 3. Training data and model weights are new assets to protect

Every system you've secured has had data worth protecting — customer
records, credentials, intellectual property. AI systems add two more
asset classes that didn't exist before. **Training data** becomes a
security asset because a model can memorize and later reproduce
fragments of what it was trained on, which means sensitive data baked
into training can leak back out through ordinary use of the model —
and because an attacker who can influence training data (data
poisoning) can implant behavior that triggers later, under their
control. **Model weights** are a new kind of intellectual property
and a new kind of attack target: stealing them is stealing the
product itself, and having white-box access to them opens attacks
(crafting adversarial inputs offline, extracting training data) that
aren't possible against a system an attacker can only query as a
black box.

## This is additive, not a replacement

None of this retires API security, identity and access management,
network segmentation, or data classification. An LLM feature still
runs behind an API you must authenticate and rate-limit, still reads
from and writes to databases you must still classify and protect,
still runs in infrastructure you must still patch and segment. What
changes is that there's now an additional layer — the model's own
reasoning over untrusted natural-language input — that those
disciplines were never built to inspect. The rest of this chapter
builds out exactly what that new layer requires: the real, published
risk catalogs (OWASP's LLM Top 10, NIST's AI RMF) that define it, and
where it hands back off to the security fundamentals you already own.

## Key terms

| Term | Meaning |
|---|---|
| Prompt injection | Getting a model to treat attacker-supplied content as an instruction rather than data, because the model has no hard boundary between the two |
| Non-determinism | The property that an LLM's output can vary across runs of the same input, breaking deterministic-testing and keyword-filtering assumptions |
| Training data poisoning | Corrupting or manipulating the data a model is trained or fine-tuned on so it later behaves in an attacker-chosen way |
| Model weights | The learned parameters that define a trained model's behavior — valuable IP and, if exposed, a new class of attack target |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
is prompt injection a genuinely different problem from SQL injection,
rather than just the same idea applied to a new technology — and name
one concrete reason non-determinism breaks a security practice you'd
normally rely on.
