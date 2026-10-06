# Lesson 24 — Hypothetical Document Embeddings (HyDE)

**Chapter 5 · Advanced RAG Patterns · Lesson 24 of 31**

## What you'll learn

- The core idea behind HyDE, and why it sounds backwards at first
- Why a hypothetical, possibly-wrong answer can still improve retrieval
- A real LLM call that generates the hypothetical document
- When HyDE helps, and when it's the wrong tool

## An idea that sounds backwards

**HyDE (Hypothetical Document Embeddings)** asks an LLM to write a fake answer to the user's question — an answer it isn't even checking for accuracy — and then embeds *that fake answer* instead of the original question, using the hypothetical document's embedding as the query vector for retrieval. It sounds like it shouldn't work: why search using an answer you already know might be wrong?

## Why it works anyway

The reason comes back to what an embedding actually captures (Chapter 2): a short question and a detailed answer paragraph often sit in noticeably different regions of embedding space, simply because questions and answers are written differently — different length, different structure, different vocabulary density — even when they're about the exact same topic. A real answer chunk sitting in the vector database was written in *answer* style, not *question* style. HyDE's hypothetical document is also written in answer style, even though its specific facts might be wrong — so its embedding tends to land much closer to the real answer chunk's embedding than the original terse question's embedding ever would. The retrieval match is won on *style and structure*, not on whether HyDE's generated facts happen to be correct.

## A real HyDE call

```json
{
  "model": "claude-opus-5-5",
  "max_tokens": 300,
  "system": "Write a short, plausible-sounding paragraph\nanswering the question. Do not say you're unsure.",
  "messages": [
    { "role": "user", "content": "What is the cancellation policy?" }
  ]
}
```

The model might return something like: "Cancellations are generally accepted within a set notice period, and early termination may carry a fee depending on the service agreement." That paragraph is never shown to the user and never trusted for its facts — it exists purely to be embedded and used as the retrieval query, in place of the original question.

## Where HyDE fits, and where it doesn't

HyDE helps most on exactly the case Lesson 23 also targets — a short, terse query whose phrasing is far from the source documents' own style — but it attacks that problem from the opposite direction: instead of generating several reformulated *questions*, it generates one hypothetical *answer*. HyDE tends to work less well on queries that are already detailed and answer-shaped, where there's little style gap left to close, and on domains where a plausible-sounding but fabricated answer could drift toward a very different topic than the real one — a risk worth weighing against the benefit before reaching for it by default.

## Key terms

| Term | Meaning |
|---|---|
| HyDE | Hypothetical Document Embeddings — embedding a generated hypothetical answer instead of the query itself |
| Style gap | The embedding-space distance between how questions and answers are typically written, even on the same topic |

## Lab

1. Write a hypothetical-answer paragraph, by hand, for the question "How long does shipping take?" — don't worry about it being accurate.
2. Explain in your own words why HyDE's retrieval improvement doesn't depend on the hypothetical answer being factually correct.
3. Describe one query where HyDE would likely add little value over just embedding the question directly.

## Check yourself

You're ready for Lesson 25 when you can explain, specifically, what HyDE and multi-query RAG have in common and how they differ in approach.
