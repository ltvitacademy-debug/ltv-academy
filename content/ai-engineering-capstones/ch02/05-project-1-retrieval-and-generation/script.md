# Lesson 5 — Retrieval & Generation · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

With chunks embedded and stored, it's time to wire together the rest
of the chain: a question comes in, the closest chunks come back out,
and Claude answers from only that material.

## S2 · STEPS CARD (pipeline)

A question gets embedded with the same model used at ingestion time,
the closest chunks are retrieved from Qdrant along with their source
metadata, and Claude generates an answer from only those chunks, with
citations.

## S3 · CODE CARD (retrieval)

Qdrant's current client uses query_points — its older search method is
deprecated and being removed. Embed the question, query, and read the
payload each point carries: the text, source, and chunk ID stored at
ingestion.

## S4 · CODE CARD (context block)

Number the retrieved chunks and keep their source attached, so the
model has something concrete to cite. The instruction to say so if the
answer isn't in context matters as much as retrieval itself — it gives
the model permission to admit it doesn't know.

## S5 · CODE CARD (generation)

The Anthropic SDK's Messages API takes a model, a max tokens cap, a
system prompt, and a messages list. Anthropic with no arguments reads
the API key from an environment variable — never hardcode a key in
source. The answer text comes back as the first content block's text
field.

## S6 · STEPS CARD (why citations matter)

A citation is a debugging tool. If the wrong chunks came back, that's
a retrieval problem. If the right chunks came back but the answer is
still wrong, that's a generation problem — and citations are what let
you tell the two apart.

## S7 · OUTRO CARD

Next: building a real evaluation set and measuring retrieval and
answer quality with actual numbers, instead of guessing whether it's
working.
