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
      L(1, "why-cloud-ai-platforms", "Why Cloud AI Platforms?", { contentDir: "ch01/01-why-cloud-ai-platforms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522099/ltv-azure-ai-cloud/why-cloud-ai-platforms.mp4", durationLabel: "1 min 23 s" }),
      L(2, "azure-ai-foundry-overview", "Azure AI Foundry, Overview", { contentDir: "ch01/02-azure-ai-foundry-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522742/ltv-azure-ai-cloud/azure-ai-foundry-overview.mp4", durationLabel: "1 min 45 s" }),
      L(3, "azure-openai-service", "Azure OpenAI Service", { contentDir: "ch01/03-azure-openai-service", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523330/ltv-azure-ai-cloud/azure-openai-service.mp4", durationLabel: "1 min 33 s" }),
      L(4, "model-deployment-options", "Model Deployment Options", { contentDir: "ch01/04-model-deployment-options", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524019/ltv-azure-ai-cloud/model-deployment-options.mp4", durationLabel: "1 min 44 s" }),
      L(5, "cloud-vs-self-hosted-models", "Cloud vs. Self-Hosted Models", { contentDir: "ch01/05-cloud-vs-self-hosted-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524583/ltv-azure-ai-cloud/cloud-vs-self-hosted-models.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 2,
    title: "Working With Azure AI Services",
    lessons: [
      L(6, "azure-ai-foundry-sdk-basics", "Azure AI Foundry SDK, Basics", { contentDir: "ch02/06-azure-ai-foundry-sdk-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525280/ltv-azure-ai-cloud/azure-ai-foundry-sdk-basics.mp4", durationLabel: "1 min 44 s" }),
      L(7, "deploying-a-model-endpoint", "Deploying a Model Endpoint", { contentDir: "ch02/07-deploying-a-model-endpoint", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525866/ltv-azure-ai-cloud/deploying-a-model-endpoint.mp4", durationLabel: "1 min 35 s" }),
      L(8, "azure-ai-search-for-rag", "Azure AI Search for RAG", { contentDir: "ch02/08-azure-ai-search-for-rag", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526483/ltv-azure-ai-cloud/azure-ai-search-for-rag.mp4", durationLabel: "1 min 39 s" }),
      L(9, "content-safety-and-moderation-apis", "Content Safety & Moderation APIs", { contentDir: "ch02/09-content-safety-and-moderation-apis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527096/ltv-azure-ai-cloud/content-safety-and-moderation-apis.mp4", durationLabel: "1 min 36 s" }),
      L(10, "cost-management-for-ai-services", "Cost Management for AI Services", { contentDir: "ch02/10-cost-management-for-ai-services", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527746/ltv-azure-ai-cloud/cost-management-for-ai-services.mp4", durationLabel: "1 min 45 s" }),
      L(11, "monitoring-ai-service-usage", "Monitoring AI Service Usage", { contentDir: "ch02/11-monitoring-ai-service-usage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528422/ltv-azure-ai-cloud/monitoring-ai-service-usage.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 3,
    title: "Cloud Infrastructure Basics for AI",
    lessons: [
      L(12, "compute-options-for-ai-workloads", "Compute Options for AI Workloads: CPU vs. GPU", { contentDir: "ch03/12-compute-options-for-ai-workloads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529105/ltv-azure-ai-cloud/compute-options-for-ai-workloads.mp4", durationLabel: "1 min 53 s" }),
      L(13, "storage-for-ai-data-and-embeddings", "Storage for AI Data & Embeddings", { contentDir: "ch03/13-storage-for-ai-data-and-embeddings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529732/ltv-azure-ai-cloud/storage-for-ai-data-and-embeddings.mp4", durationLabel: "1 min 35 s" }),
      L(14, "networking-and-endpoint-security", "Networking & Endpoint Security", { contentDir: "ch03/14-networking-and-endpoint-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530271/ltv-azure-ai-cloud/networking-and-endpoint-security.mp4", durationLabel: "1 min 27 s" }),
      L(15, "scaling-ai-inference", "Scaling AI Inference", { contentDir: "ch03/15-scaling-ai-inference", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530781/ltv-azure-ai-cloud/scaling-ai-inference.mp4", durationLabel: "1 min 31 s" }),
      L(16, "managed-identities-and-key-vault", "Managed Identities & Key Vault for AI Apps", { contentDir: "ch03/16-managed-identities-and-key-vault", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531337/ltv-azure-ai-cloud/managed-identities-and-key-vault.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 4,
    title: "Multi-Cloud AI Awareness",
    lessons: [
      L(17, "aws-bedrock-overview", "AWS Bedrock, Overview", { contentDir: "ch04/17-aws-bedrock-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532044/ltv-azure-ai-cloud/aws-bedrock-overview.mp4", durationLabel: "1 min 38 s" }),
      L(18, "google-vertex-ai-overview", "Google Vertex AI, Overview", { contentDir: "ch04/18-google-vertex-ai-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532538/ltv-azure-ai-cloud/google-vertex-ai-overview.mp4", durationLabel: "1 min 38 s" }),
      L(19, "choosing-a-cloud-ai-platform", "Choosing a Cloud AI Platform", { contentDir: "ch04/19-choosing-a-cloud-ai-platform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532857/ltv-azure-ai-cloud/choosing-a-cloud-ai-platform.mp4", durationLabel: "1 min 20 s" }),
      L(20, "portability-considerations", "Portability Considerations", { contentDir: "ch04/20-portability-considerations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533190/ltv-azure-ai-cloud/portability-considerations.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch05/21-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533525/ltv-azure-ai-cloud/capstone-kickoff.mp4", durationLabel: "1 min 45 s" }),
      L(22, "capstone-deploying-a-model-endpoint", "Capstone: Deploying a Model Endpoint on Azure", { contentDir: "ch05/22-capstone-deploying-a-model-endpoint", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533738/ltv-azure-ai-cloud/capstone-deploying-a-model-endpoint.mp4", durationLabel: "1 min 57 s" }),
      L(23, "capstone-securing-and-monitoring", "Capstone: Securing & Monitoring It", { contentDir: "ch05/23-capstone-securing-and-monitoring", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533899/ltv-azure-ai-cloud/capstone-securing-and-monitoring.mp4", durationLabel: "1 min 52 s" }),
      L(24, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/24-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534053/ltv-azure-ai-cloud/capstone-wrap-up.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
];
