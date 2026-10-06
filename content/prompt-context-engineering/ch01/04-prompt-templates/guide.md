# Lesson 4 — Prompt Templates

**Chapter 1 · Prompt Engineering Fundamentals · Lesson 4 of 24**

## What you'll learn

- What a prompt template is, and why hand-writing every prompt from scratch doesn't scale
- How to turn a one-off good prompt into a reusable template with variables
- A worked example: a customer-email responder template, filled in two different ways
- What makes a template variable well-scoped versus too broad

## Why templates exist

Lesson 1 showed that a good prompt is specific — but writing a brand-new,
fully-specific prompt by hand for every single request doesn't scale once
a prompt is going to run dozens or thousands of times in an application. A
**prompt template** is a prompt with the parts that change pulled out into
named variables, so the surrounding structure — role, format, constraints —
stays fixed and tested, while only the variable parts shift per request.

## From one-off prompt to template

```
One-off prompt (written once, for one ticket):
"Write a reply to this customer email:
'My order #4471 hasn't arrived and it's
been 10 days.' Apologize, offer a
refund or reship, keep it under 80 words."
```

```
Template (reusable for every ticket):
"Write a reply to this customer email:
'{{customer_message}}'
Apologize, offer {{resolution_options}},
keep it under {{max_words}} words."
```

The structure — apologize, offer options, respect a length limit — is
identical every time. Only `{{customer_message}}`, `{{resolution_options}}`,
and `{{max_words}}` change per call.

## The same template, filled two ways

```
Fill 1:                          Fill 2:
customer_message:                customer_message:
  "Order #4471 hasn't arrived"     "I was charged twice"
resolution_options:              resolution_options:
  "a refund or reship"             "a refund"
max_words: 80                    max_words: 60
```

One template, two completely different real tickets handled consistently
— same tone, same structure, same guarantees — without anyone hand-writing
either prompt from scratch.

## What makes a good template variable

A variable is well-scoped when it holds exactly one piece of information
that genuinely changes per call — a customer's message, a product name, a
target language. A variable is **too broad** when it tries to hold an
entire instruction inside it (a `{{instructions}}` variable that gets
filled with a different full paragraph of rules each time defeats the
purpose — you're back to writing a new prompt by hand, just with extra
steps). Keep the fixed, tested parts of the prompt — role, tone, format,
constraints — in the template itself, not in a variable.

## Key terms

| Term | Meaning |
|---|---|
| Prompt template | A prompt with its fixed structure separated from named variables that change per call |
| Variable | A named placeholder in a template, filled in at request time |
| Well-scoped variable | A variable holding exactly one changing fact, not an entire instruction |

## Lab

Take a prompt you wrote in an earlier lesson's lab. Identify which parts
of it are fixed (would be identical on every call) and which parts
genuinely change per request. Rewrite it as a template with 2-3 named
variables, then "fill" it with two different sets of values and check
that both results still follow the same structure and rules.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking, the
difference between a well-scoped template variable and one that's too
broad — and why a `{{instructions}}` variable usually defeats the point
of templating in the first place.
