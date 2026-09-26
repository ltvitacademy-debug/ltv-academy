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
      L(1, "from-regression-to-neural-networks", "From Regression to Neural Networks", { contentDir: "ch01/01-from-regression-to-neural-networks" }),
      L(2, "layers-activations-and-loss", "Layers, Activations & Loss", { contentDir: "ch01/02-layers-activations-and-loss" }),
      L(3, "training-and-backpropagation", "Training & Backpropagation", { contentDir: "ch01/03-training-and-backpropagation" }),
      L(4, "overfitting-and-regularization-in-neural-networks", "Overfitting & Regularization in Neural Networks", { contentDir: "ch01/04-overfitting-and-regularization-in-neural-networks" }),
      L(5, "when-neural-networks-beat-classical-ml", "When Neural Networks Beat Classical ML"),
    ],
  },
  {
    n: 2,
    title: "Transformers & LLMs",
    lessons: [
      L(6, "sequence-models-and-attention", "Sequence Models & Attention"),
      L(7, "the-transformer-architecture", "The Transformer Architecture"),
      L(8, "how-llms-are-trained", "How LLMs Are Trained"),
      L(9, "prompting-fundamentals", "Prompting Fundamentals", { contentDir: "ch02/09-prompting-fundamentals" }),
      L(10, "limits-hallucinations-and-evaluation", "Limits, Hallucinations & Evaluation", { contentDir: "ch02/10-limits-hallucinations-and-evaluation" }),
    ],
  },
  {
    n: 3,
    title: "Embeddings & Vector Databases",
    lessons: [
      L(11, "what-embeddings-are", "What Embeddings Are", { contentDir: "ch03/11-what-embeddings-are" }),
      L(12, "creating-and-comparing-embeddings", "Creating & Comparing Embeddings", { contentDir: "ch03/12-creating-and-comparing-embeddings" }),
      L(13, "vector-databases", "Vector Databases", { contentDir: "ch03/13-vector-databases" }),
      L(14, "semantic-search", "Semantic Search", { contentDir: "ch03/14-semantic-search" }),
    ],
  },
  {
    n: 4,
    title: "RAG & AI APIs",
    lessons: [
      L(15, "retrieval-augmented-generation-overview", "Retrieval-Augmented Generation Overview", { contentDir: "ch04/15-retrieval-augmented-generation-overview" }),
      L(16, "building-a-simple-rag-pipeline", "Building a Simple RAG Pipeline", { contentDir: "ch04/16-building-a-simple-rag-pipeline" }),
      L(17, "using-llm-apis-from-python", "Using LLM APIs From Python", { contentDir: "ch04/17-using-llm-apis-from-python" }),
      L(18, "structured-extraction-with-llms", "Structured Extraction With LLMs", { contentDir: "ch04/18-structured-extraction-with-llms" }),
      L(19, "cost-latency-and-privacy-tradeoffs", "Cost, Latency & Privacy Tradeoffs", { contentDir: "ch04/19-cost-latency-and-privacy-tradeoffs" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-build-an-ai-powered-data-tool", "Capstone Kickoff: Build an AI-Powered Data Tool", { contentDir: "ch05/20-capstone-kickoff-build-an-ai-powered-data-tool" }),
      L(21, "capstone-build-it", "Capstone: Build It", { contentDir: "ch05/21-capstone-build-it" }),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
