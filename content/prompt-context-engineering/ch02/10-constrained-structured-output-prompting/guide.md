# Lesson 10 — Constrained & Structured Output Prompting

**Chapter 2 · Advanced Prompting Techniques · Lesson 10 of 24**

## What you'll learn

- Why free-form text output breaks any system that needs to parse the result programmatically
- How to specify an exact output schema, and what happens when you don't
- A worked JSON example showing a loosely-specified prompt versus a tightly-constrained one
- Where to put format instructions, and the value of giving a concrete output example

## Why structure matters

A prompt that produces a great paragraph is a dead end the moment
something downstream — code, a database, another prompt in a chain —
needs to read a specific field out of the response. **Structured output
prompting** asks the model to return its answer in an exact, parseable
shape (usually JSON) instead of free-form prose, so the response can be
consumed programmatically without a human reading it first.

## Loosely specified vs. tightly constrained

```
Loose prompt:
"Extract the name, email, and order
number from this message."

Typical output (varies run to run):
"The customer's name is Jane Doe, her
email is jane@example.com, and her
order number is 4471."
```

That output is correct, but something trying to parse it with code would
have to guess at a format that keeps changing. Compare:

```
Constrained prompt:
"Extract the name, email, and order
number from this message. Return ONLY
valid JSON matching this exact shape,
no other text:
{\"name\": \"\", \"email\": \"\",
\"order_number\": \"\"}"

Output (every time):
{\"name\": \"Jane Doe\",
\"email\": \"jane@example.com\",
\"order_number\": \"4471\"}"
```

Giving the model a concrete shape to copy — not just a description of the
fields — is what makes the output reliably parseable run after run.

## What a strong structured-output prompt includes

```
1. The exact schema or shape wanted (ideally
   shown, not just described)
2. "Return ONLY [format], no other text" —
   closes off explanations or preamble
3. Field names and types spelled out
   explicitly, matching what the consuming
   system actually expects
```

Leaving any one of these out reopens the same gap Lesson 5 called
"missing output format" — the model fills it with a reasonable guess that
won't match what your code expects.

## Constraints beyond JSON

Structured output isn't only JSON. The same discipline applies to any
exact shape: "respond in exactly 3 bullet points, each under 10 words,"
"return a single word: yes, no, or unclear," "output a markdown table
with exactly these four columns." Any time downstream logic depends on
the shape of the answer, specify the shape explicitly rather than hoping
a plain-language description produces it consistently.

## Key terms

| Term | Meaning |
|---|---|
| Structured output prompting | Asking the model to return output in an exact, parseable shape |
| Schema | The specific fields, names, and types an output must contain |
| Format drift | Inconsistent output shape across runs, caused by an unspecified format |

## Lab

Take a task that extracts or classifies information (pulling fields from
text, categorizing an item). Write it once loosely, then again with an
exact JSON schema shown in the prompt and an explicit "return only JSON"
instruction. Run both a few times and compare how consistent the shape of
the output is.

## Check yourself

You're ready for Lesson 11 when you can explain, without looking, why
showing the model a concrete example of the output shape works better
than just describing the fields in words.
