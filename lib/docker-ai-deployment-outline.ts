// The full Docker & Deployment for AI Applications course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Packaging and shipping an AI application
// like a real production system, not a notebook.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/docker-ai-deployment/
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

export const DOCKER_AI_DEPLOYMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Docker Fundamentals",
    lessons: [
      L(1, "what-is-a-container-and-why", "What Is a Container, and Why?"),
      L(2, "images-vs-containers", "Images vs. Containers"),
      L(3, "writing-a-dockerfile", "Writing a Dockerfile"),
      L(4, "building-and-running-containers", "Building & Running Containers"),
      L(5, "docker-compose-basics", "Docker Compose, Basics"),
      L(6, "container-registries", "Container Registries"),
    ],
  },
  {
    n: 2,
    title: "Containerizing AI Applications",
    lessons: [
      L(7, "packaging-a-python-ai-app", "Packaging a Python AI App"),
      L(8, "managing-dependencies-and-model-weights", "Managing Dependencies & Model Weights"),
      L(9, "environment-variables-and-secrets", "Environment Variables & Secrets in Containers"),
      L(10, "multi-stage-builds", "Multi-Stage Builds for Smaller Images"),
      L(11, "gpu-enabled-containers", "GPU-Enabled Containers"),
    ],
  },
  {
    n: 3,
    title: "Deployment Patterns",
    lessons: [
      L(12, "deploying-to-a-cloud-container-service", "Deploying to a Cloud Container Service"),
      L(13, "api-gateways-and-load-balancing", "API Gateways & Load Balancing"),
      L(14, "blue-green-deployment-for-ai-apps", "Blue-Green Deployment for AI Apps"),
      L(15, "rolling-updates", "Rolling Updates"),
      L(16, "rollback-strategies", "Rollback Strategies"),
    ],
  },
  {
    n: 4,
    title: "Scaling & Reliability",
    lessons: [
      L(17, "autoscaling-ai-workloads", "Autoscaling AI Workloads"),
      L(18, "handling-cold-starts", "Handling Cold Starts"),
      L(19, "caching-strategies-for-ai-apps", "Caching Strategies for AI Apps"),
      L(20, "queueing-and-async-processing", "Queueing & Async Processing"),
      L(21, "cost-aware-scaling", "Cost-Aware Scaling"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff", "Capstone Kickoff"),
      L(23, "capstone-containerizing-and-deploying", "Capstone: Containerizing & Deploying a Real AI App"),
      L(24, "capstone-adding-autoscaling", "Capstone: Adding Autoscaling"),
      L(25, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
