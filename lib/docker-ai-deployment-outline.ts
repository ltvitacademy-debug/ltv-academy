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
      L(1, "what-is-a-container-and-why", "What Is a Container, and Why?", { contentDir: "ch01/01-what-is-a-container-and-why", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506478/ltv-docker-ai-deployment/01-what-is-a-container-and-why.mp4", durationLabel: "1 min 38 s" }),
      L(2, "images-vs-containers", "Images vs. Containers", { contentDir: "ch01/02-images-vs-containers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507020/ltv-docker-ai-deployment/02-images-vs-containers.mp4", durationLabel: "1 min 35 s" }),
      L(3, "writing-a-dockerfile", "Writing a Dockerfile", { contentDir: "ch01/03-writing-a-dockerfile", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507667/ltv-docker-ai-deployment/03-writing-a-dockerfile.mp4", durationLabel: "1 min 38 s" }),
      L(4, "building-and-running-containers", "Building & Running Containers", { contentDir: "ch01/04-building-and-running-containers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508234/ltv-docker-ai-deployment/04-building-and-running-containers.mp4", durationLabel: "1 min 33 s" }),
      L(5, "docker-compose-basics", "Docker Compose, Basics", { contentDir: "ch01/05-docker-compose-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508851/ltv-docker-ai-deployment/05-docker-compose-basics.mp4", durationLabel: "1 min 31 s" }),
      L(6, "container-registries", "Container Registries", { contentDir: "ch01/06-container-registries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519976/ltv-docker-ai-deployment/06-container-registries.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 2,
    title: "Containerizing AI Applications",
    lessons: [
      L(7, "packaging-a-python-ai-app", "Packaging a Python AI App", { contentDir: "ch02/07-packaging-a-python-ai-app", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510019/ltv-docker-ai-deployment/07-packaging-a-python-ai-app.mp4", durationLabel: "1 min 50 s" }),
      L(8, "managing-dependencies-and-model-weights", "Managing Dependencies & Model Weights", { contentDir: "ch02/08-managing-dependencies-and-model-weights", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600168/ltv-docker-ai-deployment/08-managing-dependencies-and-model-weights.mp4", durationLabel: "1 min 33 s" }),
      L(9, "environment-variables-and-secrets", "Environment Variables & Secrets in Containers", { contentDir: "ch02/09-environment-variables-and-secrets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510714/ltv-docker-ai-deployment/09-environment-variables-and-secrets.mp4", durationLabel: "1 min 34 s" }),
      L(10, "multi-stage-builds", "Multi-Stage Builds for Smaller Images", { contentDir: "ch02/10-multi-stage-builds", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511308/ltv-docker-ai-deployment/10-multi-stage-builds.mp4", durationLabel: "1 min 28 s" }),
      L(11, "gpu-enabled-containers", "GPU-Enabled Containers", { contentDir: "ch02/11-gpu-enabled-containers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511811/ltv-docker-ai-deployment/11-gpu-enabled-containers.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 3,
    title: "Deployment Patterns",
    lessons: [
      L(12, "deploying-to-a-cloud-container-service", "Deploying to a Cloud Container Service", { contentDir: "ch03/12-deploying-to-a-cloud-container-service", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512406/ltv-docker-ai-deployment/12-deploying-to-a-cloud-container-service.mp4", durationLabel: "1 min 29 s" }),
      L(13, "api-gateways-and-load-balancing", "API Gateways & Load Balancing", { contentDir: "ch03/13-api-gateways-and-load-balancing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512949/ltv-docker-ai-deployment/13-api-gateways-and-load-balancing.mp4", durationLabel: "1 min 34 s" }),
      L(14, "blue-green-deployment-for-ai-apps", "Blue-Green Deployment for AI Apps", { contentDir: "ch03/14-blue-green-deployment-for-ai-apps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513492/ltv-docker-ai-deployment/14-blue-green-deployment-for-ai-apps.mp4", durationLabel: "1 min 26 s" }),
      L(15, "rolling-updates", "Rolling Updates", { contentDir: "ch03/15-rolling-updates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514012/ltv-docker-ai-deployment/15-rolling-updates.mp4", durationLabel: "1 min 20 s" }),
      L(16, "rollback-strategies", "Rollback Strategies", { contentDir: "ch03/16-rollback-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514485/ltv-docker-ai-deployment/16-rollback-strategies.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 4,
    title: "Scaling & Reliability",
    lessons: [
      L(17, "autoscaling-ai-workloads", "Autoscaling AI Workloads", { contentDir: "ch04/17-autoscaling-ai-workloads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514981/ltv-docker-ai-deployment/17-autoscaling-ai-workloads.mp4", durationLabel: "1 min 19 s" }),
      L(18, "handling-cold-starts", "Handling Cold Starts", { contentDir: "ch04/18-handling-cold-starts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515516/ltv-docker-ai-deployment/18-handling-cold-starts.mp4", durationLabel: "1 min 16 s" }),
      L(19, "caching-strategies-for-ai-apps", "Caching Strategies for AI Apps", { contentDir: "ch04/19-caching-strategies-for-ai-apps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516062/ltv-docker-ai-deployment/19-caching-strategies-for-ai-apps.mp4", durationLabel: "1 min 23 s" }),
      L(20, "queueing-and-async-processing", "Queueing & Async Processing", { contentDir: "ch04/20-queueing-and-async-processing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516588/ltv-docker-ai-deployment/20-queueing-and-async-processing.mp4", durationLabel: "1 min 16 s" }),
      L(21, "cost-aware-scaling", "Cost-Aware Scaling", { contentDir: "ch04/21-cost-aware-scaling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517067/ltv-docker-ai-deployment/21-cost-aware-scaling.mp4", durationLabel: "1 min 17 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch05/22-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517542/ltv-docker-ai-deployment/22-capstone-kickoff.mp4", durationLabel: "1 min 15 s" }),
      L(23, "capstone-containerizing-and-deploying", "Capstone: Containerizing & Deploying a Real AI App", { contentDir: "ch05/23-capstone-containerizing-and-deploying", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518010/ltv-docker-ai-deployment/23-capstone-containerizing-and-deploying.mp4", durationLabel: "1 min 19 s" }),
      L(24, "capstone-adding-autoscaling", "Capstone: Adding Autoscaling", { contentDir: "ch05/24-capstone-adding-autoscaling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518646/ltv-docker-ai-deployment/24-capstone-adding-autoscaling.mp4", durationLabel: "1 min 31 s" }),
      L(25, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/25-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519206/ltv-docker-ai-deployment/25-capstone-wrap-up.mp4", durationLabel: "1 min 19 s" }),
    ],
  },
];
