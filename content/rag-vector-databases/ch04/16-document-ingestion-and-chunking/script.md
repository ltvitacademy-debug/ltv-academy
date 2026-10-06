# Script — Document Ingestion & Chunking Strategies

## Segment 1 (title)

Before a single vector lands in a vector database, every document passes through five stages: load, clean, split into chunks, embed, and upsert. Get the split step wrong, and nothing downstream recovers.

## Segment 2 (steps: the five stages)

Load pulls the raw content — PDFs, HTML, Markdown, database rows. Clean strips the boilerplate: navigation chrome, repeated headers, broken encoding. Split breaks the cleaned text into pieces small enough to embed and retrieve usefully — that's today's lesson. Then embed and upsert, which you already know from Chapters 2 and 3.

## Segment 3 (steps: three chunking strategies)

Fixed-size chunking splits on a raw character count, with no regard for sentence boundaries — simple, but it'll cut a sentence in half. Recursive chunking tries paragraph breaks first, then sentences, then words, only falling back to a harder split when it has to — that's the practical default. Semantic chunking embeds adjacent sentences and splits where the topic actually shifts — most coherent, but it costs an embedding call per sentence just to decide where to cut.

## Segment 4 (code: RecursiveCharacterTextSplitter)

Here's the real implementation most teams reach for: LangChain's RecursiveCharacterTextSplitter, with a chunk size of 500 characters, 50 characters of overlap, and that same separator order — paragraph, then line, then word, then any character as a last resort. The overlap repeats a trailing slice of one chunk at the start of the next, so a sentence spanning a boundary still appears in full somewhere.

## Segment 5 (steps: chunk metadata)

Every chunk needs more than text and a vector. Store the source document's ID, the chunk's index within that document, and a page number or section heading where the source supports it. Lesson 21 depends on exactly this — there's no citing "page 14" if the chunk never recorded which page it came from.

## Segment 6 (outro)

Getting chunks right isn't just about the splitting method — size matters just as much. Next lesson: chunk size trade-offs, and why there's no single right answer.
