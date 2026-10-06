# Lesson 16 — Document Ingestion & Chunking Strategies

**Chapter 4 · Building a RAG Pipeline · Lesson 16 of 31**

## What you'll learn

- The five stages every document has to pass through before it's searchable
- The three chunking strategies you'll actually choose between, and how each one works
- A real, runnable chunking example using LangChain's `RecursiveCharacterTextSplitter`
- What metadata to store alongside each chunk, and why it matters later

## The ingestion pipeline

Before a single vector lands in a vector database, every source document passes through the same five stages:

1. **Load** — pull the raw content from its source: PDFs, HTML pages, Markdown files, Notion pages, database rows, support tickets.
2. **Clean** — strip what isn't content: navigation chrome, repeated headers/footers, boilerplate, broken encoding.
3. **Split into chunks** — break the cleaned text into pieces small enough to embed and retrieve usefully (this lesson).
4. **Embed** — run each chunk through an embedding model (Chapter 2).
5. **Upsert** — store the vector, the original chunk text, and its metadata in the vector database (Chapter 3).

Get the split step wrong and nothing downstream recovers: a chunk that's too big drowns the one relevant sentence in noise; a chunk that's too small loses the context that sentence needed.

## Three chunking strategies

**Fixed-size chunking** splits on a raw character or token count, with no regard for sentence or paragraph boundaries. It's the simplest to implement and the easiest to reason about the cost of, but it will happily cut a sentence in half.

**Recursive / structure-aware chunking** tries a list of separators in order — paragraph breaks first, then sentence breaks, then word breaks — only falling back to a harder split when a piece still doesn't fit. This is the practical default for most RAG pipelines, because it respects the document's own structure as much as possible while still guaranteeing a maximum size.

**Semantic chunking** embeds adjacent sentences and looks for a drop in similarity between them — a "topic shift" — and splits there instead of at a fixed size. It produces the most coherent chunks but costs an embedding call per sentence just to decide where to cut, so it's usually reserved for higher-value document sets.

## A real chunking example

Here's `RecursiveCharacterTextSplitter` from LangChain's `langchain-text-splitters` package — the real, widely used implementation of the recursive strategy described above:

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", " ", ""],
)

chunks = splitter.split_text(document_text)
```

`chunk_size=500` is a target in characters, not a hard cutoff — the splitter tries each separator in `separators` until a piece fits. `chunk_overlap=50` repeats the trailing 50 characters of one chunk at the start of the next, so a sentence that spans a chunk boundary still appears in full at least once. The empty string `""` at the end of the separator list is the final fallback: split on literally any character, so no piece ever exceeds `chunk_size` even if it finds no natural break.

## What to store with every chunk

Each chunk needs more than its text and its vector. At minimum, store: a source document ID, a chunk index (its position within that document), and — where the source supports it — a page number or section heading. Lesson 21 depends directly on this metadata: there's no way to cite "page 14 of the vendor contract" if the chunk never recorded which page it came from.

## Key terms

| Term | Meaning |
|---|---|
| Chunking | Splitting a cleaned document into pieces small enough to embed and retrieve |
| Chunk overlap | Repeating a small trailing slice of one chunk at the start of the next, so boundary content isn't lost |
| Separator list | An ordered list of split points a recursive splitter tries, largest structural unit first |
| Semantic chunking | Splitting where adjacent-sentence similarity drops, rather than at a fixed size |

## Lab

1. Take a three-paragraph piece of text and manually fixed-size chunk it at 100 characters. Note every sentence it cuts in half.
2. Chunk the same text by hand following the recursive strategy's separator order. Compare how many sentences survive intact.
3. For one of your chunks, write out the minimum metadata you'd want stored alongside it, and explain why each field earns its place.

## Check yourself

You're ready for Lesson 17 when you can explain, in your own words, why `chunk_overlap` exists and what specific failure it prevents.
