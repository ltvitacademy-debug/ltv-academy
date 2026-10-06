# Lesson 5 — Context Windows

**Chapter 1 · How LLMs Actually Work · Lesson 5 of 31**

## What you'll learn

- What a context window actually is, and what counts toward it
- Real context-window sizes across current models, verified against provider documentation
- What happens when a conversation exceeds the window
- Why a bigger context window isn't automatically "better" for every task

## What counts toward the window

A model's **context window** is the maximum number of tokens (Lesson 2) it can process in a
single request — and critically, that's not just "the message you just typed." It's the sum of
everything the model has to read at once to generate a reply:

- The system prompt (instructions set by the application, not the user)
- The entire conversation history sent with the request
- Any tool/function call results fed back into the conversation (Chapter 3)
- Attached documents, retrieved context chunks, or pasted text
- The new message itself

All of that competes for the same budget, measured in tokens, not messages or words.

## Real numbers, checked directly against the source

Context windows vary a lot by model and have grown quickly. As of this course's research
(October 2026), checked directly against each provider's own documentation:

- **Claude Opus 5.5, Sonnet 5.5, and Fable 5.1** (Anthropic's current flagship tier): 1,000,000
  tokens. **Claude Haiku 4.5** (Anthropic's fastest/cheapest tier): 200,000 tokens.
- **Grok 4.7** (xAI's current flagship): 500,000 tokens for its standard context tier.
- **GPT-6 Astra family** (OpenAI's current flagship): just over 1,000,000 tokens per OpenAI's own
  pricing documentation.

These numbers will already be out of date by the time you take this course later — that's the
point of Lesson 12 (model versioning). What's stable is the *concept*: every model has a hard
ceiling, it's measured in tokens, and it keeps growing generation over generation.

## What happens when you exceed it

A request that exceeds the context window doesn't get silently trimmed by magic — it simply
fails, typically with an explicit error from the API telling you the token count was over the
limit. It's the calling application's job to manage this: trimming old conversation turns,
summarizing earlier history, or retrieving only the most relevant chunks of a larger document
(the RAG pattern from Lesson 3) instead of stuffing the whole thing in.

## Bigger isn't automatically better

A huge context window sounds like a pure win, but it comes with real trade-offs. Processing more
tokens costs more (Lesson 11) and takes longer. And in practice, models don't always weight every
part of a very long context equally — information buried in the middle of a massive prompt can
get less attention than information near the start or end, a well-documented pattern sometimes
called "lost in the middle." A bigger window raises the ceiling; it doesn't guarantee the model
will use everything inside it with equal care.

## Key terms

| Term | Meaning |
|---|---|
| Context window | The maximum tokens a model can process in one request, input and output combined |
| System prompt | Application-level instructions that also consume context window budget |
| RAG | Retrieving only the most relevant chunks of a larger source instead of sending everything |
| "Lost in the middle" | The pattern where models can underweight information buried deep in a long context |

## Check yourself

Before Lesson 6, you're ready to move on when you can explain, without looking: why doesn't
simply picking the model with the largest context window always solve a long-document problem?
