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
      L(1, "from-regression-to-neural-networks", "From Regression to Neural Networks"),
      L(2, "layers-activations-and-loss", "Layers, Activations & Loss"),
      L(3, "training-and-backpropagation", "Training & Backpropagation"),
      L(4, "overfitting-and-regularization-in-neural-networks", "Overfitting & Regularization in Neural Networks"),
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
      L(9, "prompting-fundamentals", "Prompting Fundamentals"),
      L(10, "limits-hallucinations-and-evaluation", "Limits, Hallucinations & Evaluation"),
    ],
  },
  {
    n: 3,
    title: "Embeddings & Vector Databases",
    lessons: [
      L(11, "what-embeddings-are", "What Embeddings Are"),
      L(12, "creating-and-comparing-embeddings", "Creating & Comparing Embeddings"),
      L(13, "vector-databases", "Vector Databases"),
      L(14, "semantic-search", "Semantic Search"),
    ],
  },
  {
    n: 4,
    title: "RAG & AI APIs",
    lessons: [
      L(15, "retrieval-augmented-generation-overview", "Retrieval-Augmented Generation Overview"),
      L(16, "building-a-simple-rag-pipeline", "Building a Simple RAG Pipeline"),
      L(17, "using-llm-apis-from-python", "Using LLM APIs From Python"),
      L(18, "structured-extraction-with-llms", "Structured Extraction With LLMs"),
      L(19, "cost-latency-and-privacy-tradeoffs", "Cost, Latency & Privacy Tradeoffs"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-build-an-ai-powered-data-tool", "Capstone Kickoff: Build an AI-Powered Data Tool"),
      L(21, "capstone-build-it", "Capstone: Build It"),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
