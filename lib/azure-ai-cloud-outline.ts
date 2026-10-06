// The full Azure AI & Cloud for AI Engineers course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Where AI engineering meets cloud infrastructure —
// deploying, securing, and monitoring AI services in Azure, with a
// deliberate glance at the other major clouds.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/azure-ai-cloud/
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

export const AZURE_AI_CLOUD_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Azure AI Foundry & Cloud AI Concepts",
    lessons: [
      L(1, "why-cloud-ai-platforms", "Why Cloud AI Platforms?", { contentDir: "ch01/01-why-cloud-ai-platforms" }),
      L(2, "azure-ai-foundry-overview", "Azure AI Foundry, Overview", { contentDir: "ch01/02-azure-ai-foundry-overview" }),
      L(3, "azure-openai-service", "Azure OpenAI Service", { contentDir: "ch01/03-azure-openai-service" }),
      L(4, "model-deployment-options", "Model Deployment Options", { contentDir: "ch01/04-model-deployment-options" }),
      L(5, "cloud-vs-self-hosted-models", "Cloud vs. Self-Hosted Models", { contentDir: "ch01/05-cloud-vs-self-hosted-models" }),
    ],
  },
  {
    n: 2,
    title: "Working With Azure AI Services",
    lessons: [
      L(6, "azure-ai-foundry-sdk-basics", "Azure AI Foundry SDK, Basics", { contentDir: "ch02/06-azure-ai-foundry-sdk-basics" }),
      L(7, "deploying-a-model-endpoint", "Deploying a Model Endpoint", { contentDir: "ch02/07-deploying-a-model-endpoint" }),
      L(8, "azure-ai-search-for-rag", "Azure AI Search for RAG", { contentDir: "ch02/08-azure-ai-search-for-rag" }),
      L(9, "content-safety-and-moderation-apis", "Content Safety & Moderation APIs", { contentDir: "ch02/09-content-safety-and-moderation-apis" }),
      L(10, "cost-management-for-ai-services", "Cost Management for AI Services", { contentDir: "ch02/10-cost-management-for-ai-services" }),
      L(11, "monitoring-ai-service-usage", "Monitoring AI Service Usage", { contentDir: "ch02/11-monitoring-ai-service-usage" }),
    ],
  },
  {
    n: 3,
    title: "Cloud Infrastructure Basics for AI",
    lessons: [
      L(12, "compute-options-for-ai-workloads", "Compute Options for AI Workloads: CPU vs. GPU", { contentDir: "ch03/12-compute-options-for-ai-workloads" }),
      L(13, "storage-for-ai-data-and-embeddings", "Storage for AI Data & Embeddings", { contentDir: "ch03/13-storage-for-ai-data-and-embeddings" }),
      L(14, "networking-and-endpoint-security", "Networking & Endpoint Security", { contentDir: "ch03/14-networking-and-endpoint-security" }),
      L(15, "scaling-ai-inference", "Scaling AI Inference", { contentDir: "ch03/15-scaling-ai-inference" }),
      L(16, "managed-identities-and-key-vault", "Managed Identities & Key Vault for AI Apps", { contentDir: "ch03/16-managed-identities-and-key-vault" }),
    ],
  },
  {
    n: 4,
    title: "Multi-Cloud AI Awareness",
    lessons: [
      L(17, "aws-bedrock-overview", "AWS Bedrock, Overview", { contentDir: "ch04/17-aws-bedrock-overview" }),
      L(18, "google-vertex-ai-overview", "Google Vertex AI, Overview", { contentDir: "ch04/18-google-vertex-ai-overview" }),
      L(19, "choosing-a-cloud-ai-platform", "Choosing a Cloud AI Platform", { contentDir: "ch04/19-choosing-a-cloud-ai-platform" }),
      L(20, "portability-considerations", "Portability Considerations", { contentDir: "ch04/20-portability-considerations" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-kickoff", "Capstone Kickoff"),
      L(22, "capstone-deploying-a-model-endpoint", "Capstone: Deploying a Model Endpoint on Azure"),
      L(23, "capstone-securing-and-monitoring", "Capstone: Securing & Monitoring It"),
      L(24, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
