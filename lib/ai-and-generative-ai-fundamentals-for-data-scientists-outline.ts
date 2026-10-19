// The AI & Generative AI Fundamentals for Data Scientists course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 8 of the Data Scientist path. A data-scientist-oriented slice of AI: concepts and working knowledge, deliberately lighter than the full AI Engineer path so it doesn't duplicate it.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-and-generative-ai-fundamentals-for-data-scientists/
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

export const AI_AND_GENERATIVE_AI_FUNDAMENTALS_FOR_DATA_SCIENTISTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Neural Network Concepts",
    lessons: [
      L(1, "from-regression-to-neural-networks", "From Regression to Neural Networks", { contentDir: "ch01/01-from-regression-to-neural-networks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413852/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/from-regression-to-neural-networks.mp4", durationLabel: "2 min 8 s" }),
      L(2, "layers-activations-and-loss", "Layers, Activations & Loss", { contentDir: "ch01/02-layers-activations-and-loss", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414071/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/layers-activations-and-loss.mp4", durationLabel: "2 min 8 s" }),
      L(3, "training-and-backpropagation", "Training & Backpropagation", { contentDir: "ch01/03-training-and-backpropagation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414313/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/training-and-backpropagation.mp4", durationLabel: "2 min 13 s" }),
      L(4, "overfitting-and-regularization-in-neural-networks", "Overfitting & Regularization in Neural Networks", { contentDir: "ch01/04-overfitting-and-regularization-in-neural-networks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414565/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/overfitting-and-regularization-in-neural-networks.mp4", durationLabel: "2 min 22 s" }),
      L(5, "when-neural-networks-beat-classical-ml", "When Neural Networks Beat Classical ML", { contentDir: "ch01/05-when-neural-networks-beat-classical-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414800/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/when-neural-networks-beat-classical-ml.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 2,
    title: "Transformers & LLMs",
    lessons: [
      L(6, "sequence-models-and-attention", "Sequence Models & Attention", { contentDir: "ch02/06-sequence-models-and-attention", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415021/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/sequence-models-and-attention.mp4", durationLabel: "2 min 9 s" }),
      L(7, "the-transformer-architecture", "The Transformer Architecture", { contentDir: "ch02/07-the-transformer-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415318/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/the-transformer-architecture.mp4", durationLabel: "2 min 9 s" }),
      L(8, "how-llms-are-trained", "How LLMs Are Trained", { contentDir: "ch02/08-how-llms-are-trained", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415735/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/how-llms-are-trained.mp4", durationLabel: "2 min 11 s" }),
      L(9, "prompting-fundamentals", "Prompting Fundamentals", { contentDir: "ch02/09-prompting-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416022/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/prompting-fundamentals.mp4", durationLabel: "1 min 48 s" }),
      L(10, "limits-hallucinations-and-evaluation", "Limits, Hallucinations & Evaluation", { contentDir: "ch02/10-limits-hallucinations-and-evaluation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416284/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/limits-hallucinations-and-evaluation.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
  {
    n: 3,
    title: "Embeddings & Vector Databases",
    lessons: [
      L(11, "what-embeddings-are", "What Embeddings Are", { contentDir: "ch03/11-what-embeddings-are", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416635/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/what-embeddings-are.mp4", durationLabel: "1 min 53 s" }),
      L(12, "creating-and-comparing-embeddings", "Creating & Comparing Embeddings", { contentDir: "ch03/12-creating-and-comparing-embeddings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416970/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/creating-and-comparing-embeddings.mp4", durationLabel: "2 min 3 s" }),
      L(13, "vector-databases", "Vector Databases", { contentDir: "ch03/13-vector-databases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417233/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/vector-databases.mp4", durationLabel: "1 min 49 s" }),
      L(14, "semantic-search", "Semantic Search", { contentDir: "ch03/14-semantic-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417515/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/semantic-search.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 4,
    title: "RAG & AI APIs",
    lessons: [
      L(15, "retrieval-augmented-generation-overview", "Retrieval-Augmented Generation Overview", { contentDir: "ch04/15-retrieval-augmented-generation-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417861/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/retrieval-augmented-generation-overview.mp4", durationLabel: "1 min 52 s" }),
      L(16, "building-a-simple-rag-pipeline", "Building a Simple RAG Pipeline", { contentDir: "ch04/16-building-a-simple-rag-pipeline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418135/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/building-a-simple-rag-pipeline.mp4", durationLabel: "1 min 57 s" }),
      L(17, "using-llm-apis-from-python", "Using LLM APIs From Python", { contentDir: "ch04/17-using-llm-apis-from-python", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418423/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/using-llm-apis-from-python.mp4", durationLabel: "1 min 59 s" }),
      L(18, "structured-extraction-with-llms", "Structured Extraction With LLMs", { contentDir: "ch04/18-structured-extraction-with-llms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418794/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/structured-extraction-with-llms.mp4", durationLabel: "1 min 56 s" }),
      L(19, "cost-latency-and-privacy-tradeoffs", "Cost, Latency & Privacy Tradeoffs", { contentDir: "ch04/19-cost-latency-and-privacy-tradeoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419065/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/cost-latency-and-privacy-tradeoffs.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-build-an-ai-powered-data-tool", "Capstone Kickoff: Build an AI-Powered Data Tool", { contentDir: "ch05/20-capstone-kickoff-build-an-ai-powered-data-tool", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419364/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/capstone-kickoff-build-an-ai-powered-data-tool.mp4", durationLabel: "2 min 4 s" }),
      L(21, "capstone-build-it", "Capstone: Build It", { contentDir: "ch05/21-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419658/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/capstone-build-it.mp4", durationLabel: "1 min 57 s" }),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420023/ltv-ai-and-generative-ai-fundamentals-for-data-scientists/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
];
