# Lesson 23 — Multi-Query RAG

**Chapter 5 · Advanced RAG Patterns · Lesson 23 of 31**

## What you'll learn

- The specific retrieval failure multi-query RAG is built to recover from
- How one query becomes several, and how their results get combined
- A real LLM call that generates query reformulations
- What multi-query RAG costs, and why that cost is usually worth paying selectively

## The failure this pattern targets

Lesson 22 named it directly: the content exists, but the phrasing doesn't match. A user might ask "how do I get my money back," while the actual policy document says "refund eligibility" and never uses the word "money" at all. Semantic search tolerates *some* paraphrasing, but a single query embedding is still one specific point in vector space — if the real answer's vocabulary sits far enough from that one point, a single retrieval pass can miss it even though the answer is genuinely there.

## One query becomes several

**Multi-query RAG** asks an LLM to generate several different phrasings of the same underlying question — different enough in wording to land in different regions of vector space, but aiming at the same intent. Each reformulation is embedded and retrieved separately (repeating Lesson 18's retrieval step once per reformulation), and the results are combined — typically deduplicated by chunk ID, since the same genuinely relevant chunk often gets retrieved by more than one reformulation.

## A real reformulation call

```json
{
  "model": "claude-opus-5-5",
  "max_tokens": 300,
  "system": "Generate 3 different phrasings of the user's\nquestion. One per line. No numbering, no extra text.",
  "messages": [
    { "role": "user", "content": "How do I get my money back?" }
  ]
}
```

A model given this instruction might return something like "What is the refund eligibility policy?", "How do I request a reimbursement?", and "Under what conditions can I cancel for a refund?" — three queries that share the user's intent but use enough different vocabulary to reach different, overlapping neighborhoods of the vector space.

## What this costs, and when it's worth it

Multi-query RAG multiplies retrieval's cost directly: three reformulations means three embedding calls and three vector database searches instead of one, plus the LLM call to generate the reformulations in the first place. It's not something to run on every query by default — it earns its cost on queries where retrieval's confidence is already in doubt (Lesson 22's territory: low or borderline similarity scores on the first pass), or on collections where users are known to phrase questions very differently from the source documents' own vocabulary.

## Key terms

| Term | Meaning |
|---|---|
| Query reformulation | An alternative phrasing of the same underlying question, generated to retrieve from a different angle |
| Deduplication | Combining multiple reformulations' results while keeping each distinct chunk only once |

## Lab

1. Write two alternative phrasings, by hand, for the question "What's the warranty on this?" that use noticeably different vocabulary while keeping the same intent.
2. Explain why deduplicating by chunk ID matters once multiple reformulations' results are combined.
3. Describe a retrieval scenario where generating reformulations would almost certainly be a wasted LLM call.

## Check yourself

You're ready for Lesson 24 when you can explain how multi-query RAG and HyDE both attack the same underlying "one query embedding isn't enough" problem, from two different angles.
