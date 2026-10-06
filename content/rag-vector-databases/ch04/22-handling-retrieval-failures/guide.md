# Lesson 22 — Handling Retrieval Failures

**Chapter 4 · Building a RAG Pipeline · Lesson 22 of 31**

## What you'll learn

- The three distinct ways retrieval can fail, and how each one looks different
- How a similarity score threshold catches the clearest failure case
- Why a confident-sounding answer is sometimes the actual failure
- What a well-built pipeline does once it detects a failure, instead of guessing

## Retrieval doesn't always work

Every lesson so far has assumed retrieval finds something useful. It doesn't always. A production RAG pipeline has to plan for retrieval failing, because when it fails silently, the result is a confident-sounding answer built on irrelevant context — often worse than no answer at all.

## Three ways retrieval fails

**No relevant content exists.** The user asked about something the knowledge base genuinely doesn't cover. Vector search still returns a `top_k` list — a nearest-neighbor search always returns *something* if `top_k > 0`, even when nothing is actually close — but every score is low.

**The question is ambiguous or underspecified.** "What's the deadline?" with no further context can match dozens of equally plausible, mutually irrelevant chunks across different documents, and retrieval has no way to know which deadline the user meant.

**The content exists but the phrasing doesn't match.** The right answer is sitting in the collection, but it uses different vocabulary than the query, and even semantic search's tolerance for paraphrasing has limits — this is also the situation Lesson 23's multi-query reformulation is built to recover from.

## Catching the clearest case: a score threshold

The first failure mode — nothing relevant exists — is the most mechanically catchable one, using the `score_threshold` from Lesson 18's search request:

```python
results = search(query_vector, limit=5, score_threshold=0.5)

if not results:
    return "I don't have information about that in my knowledge base."
```

Below a minimum similarity score, a result isn't a weak match — it's effectively not a match, and returning nothing lets the pipeline respond honestly instead of forcing a weak chunk into the prompt and hoping the model notices it's irrelevant.

## The harder failure: a confident wrong answer

A threshold alone doesn't catch everything. A moderately-scored chunk can still get retrieved, get handed to the model, and produce a fluent, confident-sounding answer that's subtly wrong — because the chunk was related enough to pass the threshold without being the chunk that actually answers the question. This is exactly why Lesson 20's grounding instruction matters as much as it does, and why Lesson 27's evaluation metrics exist: a pipeline needs a way to measure whether the model's confidence is actually earned, not just assume it.

## What to do once a failure is detected

Three honest responses, worth more than a confident guess: **abstain** — "I don't have information about that" — is always safer than fabricating. **Ask a clarifying question** when the failure looks like ambiguity rather than a true gap: "Do you mean the project deadline or the payment deadline?" **Widen the search** — drop a metadata filter, or raise `top_k` — when the failure might be an overly narrow query rather than a true gap. None of these require the model to be smarter; they require the pipeline around it to notice when it's in a failure case at all.

## Key terms

| Term | Meaning |
|---|---|
| Score threshold | A minimum similarity score below which a result is treated as no match |
| Silent failure | Retrieval returning low-relevance chunks that get used anyway, without the pipeline noticing |
| Abstention | The pipeline choosing to say "I don't know" instead of answering from weak context |

## Lab

1. Write the threshold check from the example for `score_threshold=0.6` instead of `0.5`, and explain what trade-off raising that number makes.
2. Describe a real query that would hit each of the three failure modes listed in this lesson.
3. For one of those three queries, decide which response — abstain, clarify, or widen — fits best, and justify it.

## Check yourself

You're ready for Lesson 23 when you can explain why a fluent, confident answer isn't proof that retrieval actually succeeded.
