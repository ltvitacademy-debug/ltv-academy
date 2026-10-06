# Lesson 4 — When RAG Is the Wrong Answer

**Chapter 1 · Why RAG Exists · Lesson 4 of 31**

## What you'll learn

- Why RAG is not a default you should reach for on every LLM project
- Four concrete situations where RAG adds complexity without adding value
- How to recognize these situations before you've built (and have to unwind) a retrieval pipeline
- A short checklist to run before committing to a RAG architecture

## RAG is not free

Everything in Lesson 3's diagram is real engineering work: a chunking strategy, an embedding model, a vector database to stand up and operate, a retrieval step to tune, and an evaluation process to confirm it's actually working (covered in Chapter 5). That's a meaningful amount of infrastructure and ongoing maintenance. It's worth it when the problem genuinely requires grounding answers in a large, changing body of external knowledge. It's wasted effort when it doesn't.

## Case 1: the knowledge fits in the prompt anyway

If everything the model needs to answer correctly is small enough to paste directly into the prompt — a single policy document, a short reference table, one week's worth of meeting notes — just put it in the prompt. Modern LLMs have context windows large enough to hold tens of thousands of words. Standing up embeddings and a vector database to retrieve from a document that would fit in the prompt anyway is solving a problem you don't have.

## Case 2: the task is about style, not facts

If what you actually want to change is how the model writes — a specific tone, a consistent structure, matching a brand voice — that's not a knowledge problem at all. Retrieving "examples of our tone" into a prompt is a weaker, more roundabout version of just fine-tuning the model on examples of that tone (Lesson 2), or simply writing clear style instructions directly into the system prompt.

## Case 3: the knowledge is static and small

If the knowledge base is small and barely ever changes — a handful of FAQ answers, a fixed product spec — the ongoing cost of maintaining a vector database (re-embedding, re-indexing, monitoring retrieval quality) can outweigh the benefit. A well-written system prompt containing that static knowledge, refreshed by hand on the rare occasion it changes, is simpler and has fewer moving parts to break.

## Case 4: the task needs computation, not retrieval

If the question is really "calculate this" or "look up a live, structured value" — today's exchange rate, a row in a SQL database, the result of a formula — that's a job for a tool call or a direct API/database query, not similarity search over embedded text. Vector search finds text that's semantically *similar* to a query; it does not compute or look up exact structured values. Forcing that kind of problem through a RAG pipeline gets you an approximate, unreliable answer to a question that has one exact correct answer.

## A short checklist

Before building a RAG pipeline, ask: Does the knowledge base exceed what reasonably fits in a prompt? Does it change often enough that re-pasting it by hand isn't practical? Is the problem really about facts and grounding, not style or tone? Is the answer something that needs to be *found* in text, rather than *computed* or looked up as a structured value? If most of these are "yes," RAG is doing real work. If most are "no," there's a simpler architecture waiting.

## Key terms

| Term | Meaning |
|---|---|
| Context window | The maximum amount of text an LLM can process in a single prompt |
| Style vs. facts | Whether a task needs the model to sound a certain way (style) or know something it doesn't (facts) |
| Tool call | Having the model invoke a function/API/database query directly, rather than retrieving text |
| Static knowledge | Information that rarely or never changes |

## Lab

1. Think of an LLM-powered feature idea (real or hypothetical).
2. Run it through the four-question checklist above.
3. Decide honestly: does it actually need RAG, or would a well-written prompt, a fine-tune, or a tool call solve it more simply?

## Check yourself

You're ready to move to Chapter 2 when you can name, from memory, at least three situations where RAG is the wrong tool.
