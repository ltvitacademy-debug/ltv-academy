# Lesson 5 — Common Prompt Failure Modes

**Chapter 1 · Prompt Engineering Fundamentals · Lesson 5 of 24**

## What you'll learn

- Four prompt failure modes that show up constantly in real applications
- How to recognize each one from the output it produces
- A worked fix for each failure, not just a diagnosis
- Why most prompt failures are the prompt's fault, not the model's

## Failure #1: Ambiguous instructions

The prompt technically answers the question asked, but "the question
asked" was underspecified, so the model picks a reasonable interpretation
that isn't the one you wanted.

```
Prompt:  "Summarize this article."
Problem: How long? For whom? Bullet points or
         prose? The model picks defaults you
         never agreed to.
Fix:     "Summarize this article in 3 bullet
         points, for a reader who hasn't read
         the original."
```

## Failure #2: Conflicting instructions

Two parts of the same prompt ask for incompatible things, and the model
has to silently pick a winner — often inconsistently from one run to the
next.

```
Prompt:  "Be extremely detailed, but keep your
         answer under 50 words."
Problem: "Extremely detailed" and "under 50
         words" can't both be true for most
         real topics.
Fix:     Pick one priority explicitly: "Keep
         it under 50 words — favor brevity
         over completeness."
```

## Failure #3: Missing output format

The task is clear, but the prompt never says what shape the answer should
take — so a downstream system expecting structured data gets a paragraph
instead, or vice versa.

```
Prompt:  "List the three biggest risks in this
         contract."
Problem: Returns as a numbered list? A table?
         Plain prose? Unspecified — and it will
         vary run to run.
Fix:     "Return exactly a JSON array of three
         strings, no other text."
```

## Failure #4: Overloading a single prompt

One prompt tries to do too many unrelated things at once — extract data,
summarize, translate, and format — and quality drops on all of them as the
model splits its attention.

```
Prompt:  "Extract all dates, summarize the
         document, translate the summary to
         Spanish, and format everything as
         a table."
Problem: Four different jobs in one call — each
         one gets less careful attention.
Fix:     Split into separate prompts (or a
         prompt chain — covered in Lesson 11)
         so each step gets full attention.
```

## The pattern behind all four

Every one of these failures traces back to the same root cause: the
prompt left a decision open that the model had to make for you, and it
made a different one than you expected. Fixing a failing prompt almost
always means finding the specific sentence (or missing sentence) where
that decision got left open, not rewriting the whole prompt from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Ambiguous instruction | A request with more than one reasonable interpretation |
| Conflicting instruction | Two requirements in the same prompt that can't both be satisfied |
| Output format drift | Inconsistent output shape because the format was never specified |
| Prompt overloading | Asking one prompt to perform several unrelated tasks at once |

## Lab

Take three prompts you've written in earlier lessons' labs (or three real
ones you've used before). For each, check it against these four failure
modes. If you find one, write the specific fix — not a full rewrite, just
the sentence that closes the gap.

## Check yourself

You're ready for Lesson 6 when you can look at a prompt that's producing
inconsistent output and name which of the four failure modes is most
likely responsible, before even testing it.
