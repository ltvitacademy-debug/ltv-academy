# Lesson 4 — Ingestion & Chunking Pipeline

**Chapter 2 · Project 1 — Production RAG Knowledge Assistant · Lesson 4 of 23**

## What you'll learn

- Why a RAG pipeline retrieves small chunks instead of handing whole
  documents to the model
- Real code for loading a folder of documents and splitting them with
  `RecursiveCharacterTextSplitter`
- Why chunk overlap exists, and what it protects against
- What metadata each chunk needs to carry so Lesson 5 can cite it
  correctly

## Why chunking, not whole documents

A long document rarely fits — or belongs — entirely inside one prompt.
Retrieval-augmented generation works by finding the few passages that
actually answer a question and handing the model only those, instead
of the whole document set. That's the "retrieval" half of RAG you
covered earlier in this path: embed small pieces of text, store them,
and pull back only the pieces closest to a question. This lesson builds
the step that makes those "small pieces" exist in the first place —
turning your raw documents into chunks worth embedding.

## Loading your documents

Start with a plain loader. For a folder of Markdown or text files, this
is as simple as walking the directory and reading each file:

```python
from pathlib import Path

def load_documents(folder: str) -> list[dict]:
    docs = []
    for path in Path(folder).rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        docs.append({"source": str(path), "text": text})
    return docs
```

Each entry keeps the file's path alongside its text — that path is
what Lesson 5's citations will point back to, so don't drop it here.

## Splitting with overlap

`RecursiveCharacterTextSplitter`, from the `langchain_text_splitters`
package, tries a list of separators in order — paragraph breaks first,
then line breaks, then sentence and word boundaries — so it only falls
back to cutting mid-sentence when nothing cleaner fits inside
`chunk_size`:

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150,
    separators=["\n\n", "\n", ". ", " ", ""],
)

chunks = []
for doc in docs:
    for i, piece in enumerate(splitter.split_text(doc["text"])):
        chunks.append({"text": piece, "source": doc["source"], "chunk_id": i})
```

`chunk_size=800` characters and `chunk_overlap=150` are a reasonable
starting point for prose — Lesson 6 will tune both against real
measurements, not guesswork.

## Why overlap matters

Without overlap, a sentence that straddles exactly where one chunk ends
and the next begins gets cut in half, and neither chunk alone carries
the full idea. A 150-character overlap means the last chunk's tail
reappears as the next chunk's head, so a passage near a cut point is
still retrievable whole from at least one of the two chunks. The cost
is some duplicated text across your vector database — a small price for
not silently losing meaning at every chunk boundary.

## Metadata: what citations need later

Every chunk this pipeline produces carries three things: its `text`
(what gets embedded and shown to the model), its `source` (the file it
came from), and a `chunk_id` (its position within that file). Lesson 5
reads `source` back out to build citations, and Lesson 6 reads it to
check whether retrieval pulled the *correct* chunk for a given
question — neither works if this step drops the metadata on the floor.

## Key terms

| Term | Meaning |
|---|---|
| Chunk | A small, overlap-aware slice of a document, sized to be embedded and retrieved on its own |
| Chunk overlap | Characters repeated between consecutive chunks, so a passage near a boundary stays whole in at least one chunk |
| Chunk metadata | The source file and position carried alongside each chunk's text, needed for citations and evaluation |

## Lab

Run the loader and chunker above over your own chosen document set.
Print the total chunk count, then read through five consecutive chunks
from one file and check: does the overlap actually prevent any
sentence from being cut off with no whole copy anywhere? Note anything
that looks wrong before moving to Lesson 5.

## Check yourself

- Why does RAG retrieve chunks instead of handing an entire document to
  the model?
- What problem does chunk overlap solve, and what does it cost you?
- Which three fields does each chunk need, and which lesson reads each
  one back out?
