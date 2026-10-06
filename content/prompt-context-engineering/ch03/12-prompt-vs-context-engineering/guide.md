# Lesson 12 — Prompt Engineering vs. Context Engineering

**Chapter 3 · Context Engineering · Lesson 12 of 24**

## What you'll learn

- Why "prompt engineering" and "context engineering" are two different
  jobs, not two names for the same thing
- What actually gets sent to the model on a real call, beyond the
  user's literal words
- Why context engineering became its own discipline as agents got
  more multi-turn, tool-using, and retrieval-heavy
- How to tell, when a response is wrong, whether the problem is the
  instruction or the context around it

## The instruction is one line

Chapters 1 and 2 of this course were about prompt engineering: wording
a system prompt well, choosing zero-shot vs. few-shot, structuring a
chain-of-thought instruction. All of that is about crafting *one piece
of text* — the instruction itself.

Context engineering is a different question: what else is in the
context window alongside that instruction? On a real call to an LLM
API, the request body is never just the user's words. A typical
agentic call looks like:

```
SYSTEM:      1,400 tokens  (role + rules)
TOOLS:       2,600 tokens  (3 function schemas)
HISTORY:     5,100 tokens  (prior turns)
RETRIEVED:   3,800 tokens  (2 doc chunks)
USER PROMPT:    40 tokens  ("refund this order")
TOTAL:      12,940 tokens sent this call
```

The user's actual prompt — "refund this order" — is 40 tokens out of
nearly 13,000. Everything else is context someone (or something)
assembled before the model ever saw the user's question.

## Two different jobs

| | Prompt engineering | Context engineering |
|---|---|---|
| Unit of work | One instruction | Everything surrounding it |
| Decides | Wording, examples, output format | What's included, what's left out, what order |
| Bounded by | Clarity and specificity | The model's hard context-window token limit |

Context engineering covers the system prompt, the tool definitions
offered to the model, conversation history, retrieved documents, and
memory — and the decisions about which of those to include, how much
of each, and in what order (Lessons 13-17 cover each of these in
turn).

## Why it became its own discipline

In a simple, single-turn question-and-answer system, prompt wording
really was most of the problem — there wasn't much else in the
window. As soon as a system has multiple turns, calls tools, and
retrieves documents (a RAG pipeline, an agent), the assembled context
can dwarf the user's own words, as the example above shows. That
changes where failures come from: a wrong or confused answer can mean
the *instruction* was unclear, or it can mean the instruction was
perfectly clear but got buried under 10,000 tokens of irrelevant
history and documents it had to compete with.

This is the practical reason to keep the two disciplines distinct:
when a prompt stops working reliably, "reword the prompt" and "fix
what's being fed into the context window" are two different fixes,
and only one of them addresses the actual cause.

## Key terms

| Term | Meaning |
|---|---|
| Prompt engineering | Crafting the wording, examples, and format of a single instruction |
| Context engineering | Deciding what else — system, tools, history, retrieval, memory — surrounds that instruction |
| Context window | The model's hard token ceiling that everything above has to fit inside |

## Lab

1. Take a prompt you built in an earlier chapter and estimate, in
   round numbers, how many tokens the system prompt, any few-shot
   examples, and the user's actual question each account for.
2. Write one sentence describing what else a real deployment of that
   prompt would need to add to the context window (history? retrieved
   docs? tool schemas?) that your earlier version never accounted for.

## Check yourself

You're ready for Lesson 13 when you can look at a failing LLM response
and ask, correctly, "is this a prompt problem or a context problem?"
before trying to fix it.
