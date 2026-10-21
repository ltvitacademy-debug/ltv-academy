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
      L(1, "the-knowledge-cutoff-and-hallucination-problem", "The Knowledge Cutoff & Hallucination Problem", { contentDir: "ch01/01-the-knowledge-cutoff-and-hallucination-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610237/ltv-rag-vector-databases/the-knowledge-cutoff-and-hallucination-problem.mp4", durationLabel: "1 min 37 s" }),
      L(2, "rag-vs-fine-tuning", "RAG vs. Fine-Tuning", { contentDir: "ch01/02-rag-vs-fine-tuning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610567/ltv-rag-vector-databases/rag-vs-fine-tuning.mp4", durationLabel: "1 min 26 s" }),
      L(3, "the-rag-architecture-overview", "The RAG Architecture, Overview", { contentDir: "ch01/03-the-rag-architecture-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610935/ltv-rag-vector-databases/the-rag-architecture-overview.mp4", durationLabel: "1 min 23 s" }),
      L(4, "when-rag-is-the-wrong-answer", "When RAG Is the Wrong Answer", { contentDir: "ch01/04-when-rag-is-the-wrong-answer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611622/ltv-rag-vector-databases/when-rag-is-the-wrong-answer.mp4", durationLabel: "1 min 35 s" }),
    ],
  },
  {
    n: 2,
    title: "Embeddings Deep Dive",
    lessons: [
      L(5, "what-an-embedding-actually-is", "What an Embedding Actually Is", { contentDir: "ch02/05-what-an-embedding-actually-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612104/ltv-rag-vector-databases/what-an-embedding-actually-is.mp4", durationLabel: "1 min 32 s" }),
      L(6, "embedding-models-overview", "Embedding Models, Overview", { contentDir: "ch02/06-embedding-models-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612626/ltv-rag-vector-databases/embedding-models-overview.mp4", durationLabel: "1 min 31 s" }),
      L(7, "similarity-metrics", "Similarity Metrics: Cosine, Dot Product & Euclidean", { contentDir: "ch02/07-similarity-metrics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613264/ltv-rag-vector-databases/similarity-metrics.mp4", durationLabel: "1 min 55 s" }),
      L(8, "embedding-dimensionality-tradeoffs", "Embedding Dimensionality Trade-offs", { contentDir: "ch02/08-embedding-dimensionality-tradeoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613739/ltv-rag-vector-databases/embedding-dimensionality-tradeoffs.mp4", durationLabel: "1 min 48 s" }),
      L(9, "choosing-an-embedding-model", "Choosing an Embedding Model", { contentDir: "ch02/09-choosing-an-embedding-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614038/ltv-rag-vector-databases/choosing-an-embedding-model.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 3,
    title: "Vector Databases",
    lessons: [
      L(10, "vector-database-concepts", "Vector Database Concepts", { contentDir: "ch03/10-vector-database-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614298/ltv-rag-vector-databases/vector-database-concepts.mp4", durationLabel: "1 min 29 s" }),
      L(11, "popular-vector-databases-overview", "Popular Vector Databases, Overview", { contentDir: "ch03/11-popular-vector-databases-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614690/ltv-rag-vector-databases/popular-vector-databases-overview.mp4", durationLabel: "2 min 2 s" }),
      L(12, "indexing-strategies", "Indexing Strategies: HNSW & IVF", { contentDir: "ch03/12-indexing-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615078/ltv-rag-vector-databases/indexing-strategies.mp4", durationLabel: "2 min 8 s" }),
      L(13, "metadata-filtering", "Metadata Filtering", { contentDir: "ch03/13-metadata-filtering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615345/ltv-rag-vector-databases/metadata-filtering.mp4", durationLabel: "1 min 51 s" }),
      L(14, "hybrid-search", "Hybrid Search: Vector + Keyword", { contentDir: "ch03/14-hybrid-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615601/ltv-rag-vector-databases/hybrid-search.mp4", durationLabel: "1 min 56 s" }),
      L(15, "scaling-a-vector-database", "Scaling a Vector Database", { contentDir: "ch03/15-scaling-a-vector-database", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615862/ltv-rag-vector-databases/scaling-a-vector-database.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 4,
    title: "Building a RAG Pipeline",
    lessons: [
      L(16, "document-ingestion-and-chunking", "Document Ingestion & Chunking Strategies", { contentDir: "ch04/16-document-ingestion-and-chunking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616071/ltv-rag-vector-databases/document-ingestion-and-chunking.mp4", durationLabel: "2 min 7 s" }),
      L(17, "chunk-size-tradeoffs", "Chunk Size Trade-offs", { contentDir: "ch04/17-chunk-size-tradeoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616269/ltv-rag-vector-databases/chunk-size-tradeoffs.mp4", durationLabel: "2 min 14 s" }),
      L(18, "the-retrieval-step", "The Retrieval Step", { contentDir: "ch04/18-the-retrieval-step", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616429/ltv-rag-vector-databases/the-retrieval-step.mp4", durationLabel: "2 min 2 s" }),
      L(19, "re-ranking-retrieved-results", "Re-Ranking Retrieved Results", { contentDir: "ch04/19-re-ranking-retrieved-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616570/ltv-rag-vector-databases/re-ranking-retrieved-results.mp4", durationLabel: "1 min 52 s" }),
      L(20, "prompt-assembly-with-retrieved-context", "Prompt Assembly With Retrieved Context", { contentDir: "ch04/20-prompt-assembly-with-retrieved-context", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616692/ltv-rag-vector-databases/prompt-assembly-with-retrieved-context.mp4", durationLabel: "1 min 30 s" }),
      L(21, "citation-and-source-attribution", "Citation & Source Attribution", { contentDir: "ch04/21-citation-and-source-attribution", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616802/ltv-rag-vector-databases/citation-and-source-attribution.mp4", durationLabel: "1 min 34 s" }),
      L(22, "handling-retrieval-failures", "Handling Retrieval Failures", { contentDir: "ch04/22-handling-retrieval-failures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616947/ltv-rag-vector-databases/handling-retrieval-failures.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 5,
    title: "Advanced RAG Patterns",
    lessons: [
      L(23, "multi-query-rag", "Multi-Query RAG", { contentDir: "ch05/23-multi-query-rag", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617071/ltv-rag-vector-databases/multi-query-rag.mp4", durationLabel: "1 min 49 s" }),
      L(24, "hyde", "Hypothetical Document Embeddings (HyDE)", { contentDir: "ch05/24-hyde", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617175/ltv-rag-vector-databases/hyde.mp4", durationLabel: "1 min 36 s" }),
      L(25, "agentic-rag", "Agentic RAG", { contentDir: "ch05/25-agentic-rag", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617294/ltv-rag-vector-databases/agentic-rag.mp4", durationLabel: "1 min 54 s" }),
      L(26, "graph-based-rag", "Graph-Based RAG", { contentDir: "ch05/26-graph-based-rag", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617422/ltv-rag-vector-databases/graph-based-rag.mp4", durationLabel: "2 min 3 s" }),
      L(27, "evaluating-rag-quality", "Evaluating RAG Quality", { contentDir: "ch05/27-evaluating-rag-quality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617541/ltv-rag-vector-databases/evaluating-rag-quality.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(28, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch06/28-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617646/ltv-rag-vector-databases/capstone-kickoff.mp4", durationLabel: "1 min 39 s" }),
      L(29, "capstone-building-a-production-rag-assistant", "Capstone: Building a Production RAG Knowledge Assistant", { contentDir: "ch06/29-capstone-building-a-production-rag-assistant", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617737/ltv-rag-vector-databases/capstone-building-a-production-rag-assistant.mp4", durationLabel: "1 min 37 s" }),
      L(30, "capstone-evaluating-and-tuning", "Capstone: Evaluating & Tuning It", { contentDir: "ch06/30-capstone-evaluating-and-tuning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617841/ltv-rag-vector-databases/capstone-evaluating-and-tuning.mp4", durationLabel: "1 min 39 s" }),
      L(31, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/31-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617929/ltv-rag-vector-databases/capstone-wrap-up.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
];
