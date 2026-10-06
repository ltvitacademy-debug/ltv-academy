# Lesson 11 — Prompt Chaining

**Chapter 2 · Advanced Prompting Techniques · Lesson 11 of 24**

## What you'll learn

- What prompt chaining is: breaking one big task into a sequence of smaller prompts
- How this directly solves the "overloading a single prompt" failure from Lesson 5
- A worked three-step chain, with each step's output feeding the next step's input
- How to decide where to split a chain versus keeping steps together

## One prompt, too many jobs

Lesson 5 covered prompt overloading: asking one prompt to extract data,
summarize, translate, and format all at once, with quality dropping on
every task as the model's attention divides. **Prompt chaining** is the
structural fix — breaking that single overloaded prompt into a sequence
of smaller, focused prompts, where each step's output becomes the next
step's input.

## A worked three-step chain

```
Task: turn a long customer interview
transcript into a translated executive
summary.

Step 1 — Extract:
"Pull every direct quote about pricing
from this transcript. Return as a
JSON array of strings."
-> feeds into Step 2

Step 2 — Summarize:
"Summarize these pricing quotes into
3 key themes, one sentence each."
-> feeds into Step 3

Step 3 — Translate:
"Translate this 3-sentence summary
into Spanish, keeping the same
structure."
-> final output
```

Each step does exactly one job, gets the model's full attention, and
produces output in the exact structured shape (Lesson 10) the next step
expects as its input.

## Why this beats one giant prompt

```
One overloaded prompt:        A three-step chain:
- 4 jobs competing for        - each step: 1 job,
  attention                     full attention
- one bad output = start      - one bad step = retry
  completely over               just that step
- hard to debug which          - easy to debug: check
  part went wrong                each step's output
```

If step 2's summary is weak, you fix and re-run step 2 alone — you don't
have to re-extract the quotes or re-run the translation. Each step is
independently testable using the iteration loop from Lesson 6.

## Where to split a chain

Split into a new step when a task changes **kind** (extraction, then
reasoning, then formatting are different kinds of work) or when one
step's output needs to be checked or corrected before the next step runs
on it. Don't split purely for the sake of having more steps — two closely
related instructions that always succeed or fail together (like
"summarize and give it a title") can usually stay in one prompt without
losing reliability.

## Key terms

| Term | Meaning |
|---|---|
| Prompt chaining | Breaking one task into a sequence of smaller prompts, each feeding the next |
| Chain step | One prompt in a chain, with a defined input and output |
| Pipeline | The full sequence of chained steps from raw input to final output |

## Lab

Take the overloaded prompt example from Lesson 5 (extract dates,
summarize, translate, format as a table) and break it into a chain of 3-4
separate prompts. Write out what each step's input and output look like,
and confirm each step's output is shaped correctly to feed the next one.

## Check yourself

You're ready to move on when you can explain, without looking, why
fixing one weak step in a chain is easier than fixing one weak sentence
buried inside a single four-job prompt — and when two instructions are
closely related enough to stay in the same step.
