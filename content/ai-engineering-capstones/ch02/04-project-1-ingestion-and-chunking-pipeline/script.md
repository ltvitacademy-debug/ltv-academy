# Lesson 4 — Ingestion & Chunking Pipeline · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Time to build the step that makes RAG work: turning raw documents into
small, overlapping chunks worth embedding and retrieving.

## S2 · STEPS CARD (why chunking)

RAG doesn't hand a model the whole document set — it retrieves only
the small passages closest to a question. This lesson builds the raw
material for that: documents split into chunks.

## S3 · CODE CARD (loader)

Start with a plain loader: walk a folder of documents and read each
file's text, keeping its path alongside it. That path is what
citations will point back to later, so don't drop it here.

## S4 · CODE CARD (chunker)

RecursiveCharacterTextSplitter, from langchain_text_splitters, tries
paragraph breaks first, then line breaks, then sentence and word
boundaries — only cutting mid-sentence when nothing cleaner fits
inside the chunk size.

## S5 · STEPS CARD (overlap)

Without overlap, a sentence that straddles a chunk boundary gets cut
in half, with neither chunk carrying the full idea. A
hundred-fifty-character overlap means that passage stays whole in at
least one of the two chunks.

## S6 · STEPS CARD (metadata)

Every chunk carries three fields: its text, which gets embedded; its
source file, which Lesson 5's citations read back out; and its chunk
ID, which Lesson 6's evaluation uses to check whether retrieval found
the right chunk.

## S7 · OUTRO CARD

Next: wiring this chunked, embedded data into real retrieval and
generation — pulling back the right chunks and answering with
citations.
