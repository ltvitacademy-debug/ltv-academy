// The full RAG & Vector Databases course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes Prompt & Context Engineering — this course builds
// the actual retrieval-augmented generation pipeline: embeddings, vector
// databases, chunking, retrieval, and evaluation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/rag-vector-databases/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const RAG_VECTOR_DATABASES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Why RAG Exists",
    lessons: [
      L(1, "the-knowledge-cutoff-and-hallucination-problem", "The Knowledge Cutoff & Hallucination Problem", { contentDir: "ch01/01-the-knowledge-cutoff-and-hallucination-problem" }),
      L(2, "rag-vs-fine-tuning", "RAG vs. Fine-Tuning", { contentDir: "ch01/02-rag-vs-fine-tuning" }),
      L(3, "the-rag-architecture-overview", "The RAG Architecture, Overview", { contentDir: "ch01/03-the-rag-architecture-overview" }),
      L(4, "when-rag-is-the-wrong-answer", "When RAG Is the Wrong Answer", { contentDir: "ch01/04-when-rag-is-the-wrong-answer" }),
    ],
  },
  {
    n: 2,
    title: "Embeddings Deep Dive",
    lessons: [
      L(5, "what-an-embedding-actually-is", "What an Embedding Actually Is", { contentDir: "ch02/05-what-an-embedding-actually-is" }),
      L(6, "embedding-models-overview", "Embedding Models, Overview", { contentDir: "ch02/06-embedding-models-overview" }),
      L(7, "similarity-metrics", "Similarity Metrics: Cosine, Dot Product & Euclidean", { contentDir: "ch02/07-similarity-metrics" }),
      L(8, "embedding-dimensionality-tradeoffs", "Embedding Dimensionality Trade-offs", { contentDir: "ch02/08-embedding-dimensionality-tradeoffs" }),
      L(9, "choosing-an-embedding-model", "Choosing an Embedding Model", { contentDir: "ch02/09-choosing-an-embedding-model" }),
    ],
  },
  {
    n: 3,
    title: "Vector Databases",
    lessons: [
      L(10, "vector-database-concepts", "Vector Database Concepts", { contentDir: "ch03/10-vector-database-concepts" }),
      L(11, "popular-vector-databases-overview", "Popular Vector Databases, Overview", { contentDir: "ch03/11-popular-vector-databases-overview" }),
      L(12, "indexing-strategies", "Indexing Strategies: HNSW & IVF", { contentDir: "ch03/12-indexing-strategies" }),
      L(13, "metadata-filtering", "Metadata Filtering", { contentDir: "ch03/13-metadata-filtering" }),
      L(14, "hybrid-search", "Hybrid Search: Vector + Keyword", { contentDir: "ch03/14-hybrid-search" }),
      L(15, "scaling-a-vector-database", "Scaling a Vector Database", { contentDir: "ch03/15-scaling-a-vector-database" }),
    ],
  },
  {
    n: 4,
    title: "Building a RAG Pipeline",
    lessons: [
      L(16, "document-ingestion-and-chunking", "Document Ingestion & Chunking Strategies"),
      L(17, "chunk-size-tradeoffs", "Chunk Size Trade-offs"),
      L(18, "the-retrieval-step", "The Retrieval Step"),
      L(19, "re-ranking-retrieved-results", "Re-Ranking Retrieved Results"),
      L(20, "prompt-assembly-with-retrieved-context", "Prompt Assembly With Retrieved Context"),
      L(21, "citation-and-source-attribution", "Citation & Source Attribution"),
      L(22, "handling-retrieval-failures", "Handling Retrieval Failures"),
    ],
  },
  {
    n: 5,
    title: "Advanced RAG Patterns",
    lessons: [
      L(23, "multi-query-rag", "Multi-Query RAG"),
      L(24, "hyde", "Hypothetical Document Embeddings (HyDE)"),
      L(25, "agentic-rag", "Agentic RAG"),
      L(26, "graph-based-rag", "Graph-Based RAG"),
      L(27, "evaluating-rag-quality", "Evaluating RAG Quality"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(28, "capstone-kickoff", "Capstone Kickoff"),
      L(29, "capstone-building-a-production-rag-assistant", "Capstone: Building a Production RAG Knowledge Assistant"),
      L(30, "capstone-evaluating-and-tuning", "Capstone: Evaluating & Tuning It"),
      L(31, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
