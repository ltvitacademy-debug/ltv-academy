# Lesson 21 — Citation & Source Attribution

**Chapter 4 · Building a RAG Pipeline · Lesson 21 of 31**

## What you'll learn

- Two different real ways to get citations out of a RAG answer
- The manual approach: numbered references tied back to chunk metadata
- A built-in alternative: the Messages API's own Citations feature
- Why citations are what makes a RAG answer actually verifiable, not just plausible-sounding

## Why citations matter more in RAG than anywhere else

A plain LLM answer asks you to simply trust it. A RAG answer doesn't have to — every claim it makes is supposed to trace back to a specific retrieved chunk, which traces back to a specific source document (Lesson 16's metadata). Citations are what make that traceability visible to the user instead of just true in theory. Without them, a RAG system is really just "a chatbot that happens to read some documents first" — citations are the feature that actually lets a user check the work.

## Approach 1: manual numbered references

Lesson 20 showed chunks numbered `[1]`, `[2]` at assembly time. The straightforward way to get citations is to instruct the model to use those same numbers in its answer, then map them back to the stored metadata afterward:

```python
# model answer: "...90 days written notice [1]."
match = re.search(r"\[(\d+)\]", model_answer)
chunk = retrieved_chunks[int(match.group(1)) - 1]
source = f"{chunk['doc_id']}, p.{chunk['page']}"
```

This works with any model and any vector database, because it's just string parsing against metadata you already control. Its weakness: it depends entirely on the model reliably including the right bracket number next to the right claim, which a prompt instruction encourages but doesn't guarantee.

## Approach 2: the Messages API's built-in Citations

The Messages API has a citations feature built for exactly this, which doesn't depend on the model remembering to add bracket numbers at all. Each retrieved chunk is sent as its own `document` content block, with `citations: {"enabled": true}`:

```json
{
  "role": "user",
  "content": [
    { "type": "document",
      "source": { "type": "text", "media_type": "text/plain",
                  "data": "Policy requires 90 days written notice..." },
      "title": "policy-14.pdf, p.3",
      "citations": { "enabled": true } },
    { "type": "text", "text": "What is the cancellation policy?" }
  ]
}
```

The response then comes back split into `text` blocks, and any block whose claim is grounded in a document carries a `citations` array alongside it — each entry includes `cited_text` (the exact source passage), `document_title`, and the character range inside that document it came from. The model isn't asked to *remember* to cite; the API structurally ties each claim to its source document.

## Choosing between them

The manual approach is simpler to retrofit onto an existing pipeline and works with any backend. The built-in Citations feature is more reliable — it doesn't depend on prompt-following — but it requires restructuring prompt assembly around one `document` block per chunk instead of one combined context string, which is a bigger change to an existing Lesson 20-style pipeline. Either way, the underlying requirement from Lesson 16 is the same: a chunk is only citable if it was stored with enough metadata — a source ID, a page or section — to point back to in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Citation | A pointer from a specific claim in an answer back to the specific source chunk that supports it |
| `document` content block | A Messages API content block representing one source document, used for built-in citations |
| `cited_text` | The exact passage from a source document that a citation points to |

## Lab

1. Write the regex-based mapping from Approach 1 for a model answer that cites two different chunks, `[1]` and `[2]`.
2. List two chunk metadata fields from Lesson 16 that a citation in either approach ultimately depends on.
3. Describe one real downside of the manual bracket-number approach that the built-in Citations feature avoids.

## Check yourself

You're ready for Lesson 22 when you can explain why a citation is only as good as the metadata the chunk was stored with back at ingestion.
