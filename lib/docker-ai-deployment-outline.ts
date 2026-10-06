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
      L(1, "what-is-a-container-and-why", "What Is a Container, and Why?", { contentDir: "ch01/01-what-is-a-container-and-why" }),
      L(2, "images-vs-containers", "Images vs. Containers", { contentDir: "ch01/02-images-vs-containers" }),
      L(3, "writing-a-dockerfile", "Writing a Dockerfile", { contentDir: "ch01/03-writing-a-dockerfile" }),
      L(4, "building-and-running-containers", "Building & Running Containers", { contentDir: "ch01/04-building-and-running-containers" }),
      L(5, "docker-compose-basics", "Docker Compose, Basics", { contentDir: "ch01/05-docker-compose-basics" }),
      L(6, "container-registries", "Container Registries", { contentDir: "ch01/06-container-registries" }),
    ],
  },
  {
    n: 2,
    title: "Containerizing AI Applications",
    lessons: [
      L(7, "packaging-a-python-ai-app", "Packaging a Python AI App", { contentDir: "ch02/07-packaging-a-python-ai-app" }),
      L(8, "managing-dependencies-and-model-weights", "Managing Dependencies & Model Weights", { contentDir: "ch02/08-managing-dependencies-and-model-weights" }),
      L(9, "environment-variables-and-secrets", "Environment Variables & Secrets in Containers", { contentDir: "ch02/09-environment-variables-and-secrets" }),
      L(10, "multi-stage-builds", "Multi-Stage Builds for Smaller Images", { contentDir: "ch02/10-multi-stage-builds" }),
      L(11, "gpu-enabled-containers", "GPU-Enabled Containers", { contentDir: "ch02/11-gpu-enabled-containers" }),
    ],
  },
  {
    n: 3,
    title: "Deployment Patterns",
    lessons: [
      L(12, "deploying-to-a-cloud-container-service", "Deploying to a Cloud Container Service", { contentDir: "ch03/12-deploying-to-a-cloud-container-service" }),
      L(13, "api-gateways-and-load-balancing", "API Gateways & Load Balancing", { contentDir: "ch03/13-api-gateways-and-load-balancing" }),
      L(14, "blue-green-deployment-for-ai-apps", "Blue-Green Deployment for AI Apps", { contentDir: "ch03/14-blue-green-deployment-for-ai-apps" }),
      L(15, "rolling-updates", "Rolling Updates", { contentDir: "ch03/15-rolling-updates" }),
      L(16, "rollback-strategies", "Rollback Strategies", { contentDir: "ch03/16-rollback-strategies" }),
    ],
  },
  {
    n: 4,
    title: "Scaling & Reliability",
    lessons: [
      L(17, "autoscaling-ai-workloads", "Autoscaling AI Workloads", { contentDir: "ch04/17-autoscaling-ai-workloads" }),
      L(18, "handling-cold-starts", "Handling Cold Starts", { contentDir: "ch04/18-handling-cold-starts" }),
      L(19, "caching-strategies-for-ai-apps", "Caching Strategies for AI Apps", { contentDir: "ch04/19-caching-strategies-for-ai-apps" }),
      L(20, "queueing-and-async-processing", "Queueing & Async Processing", { contentDir: "ch04/20-queueing-and-async-processing" }),
      L(21, "cost-aware-scaling", "Cost-Aware Scaling", { contentDir: "ch04/21-cost-aware-scaling" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch05/22-capstone-kickoff" }),
      L(23, "capstone-containerizing-and-deploying", "Capstone: Containerizing & Deploying a Real AI App", { contentDir: "ch05/23-capstone-containerizing-and-deploying" }),
      L(24, "capstone-adding-autoscaling", "Capstone: Adding Autoscaling", { contentDir: "ch05/24-capstone-adding-autoscaling" }),
      L(25, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/25-capstone-wrap-up" }),
    ],
  },
];
