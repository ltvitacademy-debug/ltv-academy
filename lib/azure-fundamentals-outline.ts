// The full Azure Fundamentals course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". A short, AZ-900-aligned primer on cloud and Azure concepts —
// meant to sit before Azure Database Administrator or any Azure-flavored
// path for students who haven't touched Azure at all yet.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/azure-fundamentals/
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

export const AZURE_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Cloud & Azure Concepts",
    lessons: [
      L(1, "what-is-cloud-computing", "What Is Cloud Computing?", {
        contentDir: "ch01/01-what-is-cloud-computing",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157478/ltv-azure-fundamentals/what-is-cloud-computing.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(2, "iaas-paas-saas", "IaaS, PaaS & SaaS", {
        contentDir: "ch01/02-iaas-paas-saas",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157519/ltv-azure-fundamentals/iaas-paas-saas.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(3, "azure-global-infrastructure", "Azure Global Infrastructure: Regions & Availability Zones", {
        contentDir: "ch01/03-azure-global-infrastructure",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157552/ltv-azure-fundamentals/azure-global-infrastructure.mp4",
        durationLabel: "58 s",
      }),
      L(4, "azure-portal-tour", "Azure Portal Tour", {
        contentDir: "ch01/04-azure-portal-tour",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157588/ltv-azure-fundamentals/azure-portal-tour.mp4",
        durationLabel: "1 min 8 s",
      }),
      L(5, "subscriptions-and-resource-groups", "Subscriptions & Resource Groups", {
        contentDir: "ch01/05-subscriptions-and-resource-groups",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157624/ltv-azure-fundamentals/subscriptions-and-resource-groups.mp4",
        durationLabel: "1 min 4 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Core Azure Services",
    lessons: [
      L(6, "azure-compute-overview", "Azure Compute Overview: VMs & App Service", {
        contentDir: "ch02/06-azure-compute-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157657/ltv-azure-fundamentals/azure-compute-overview.mp4",
        durationLabel: "60 s",
      }),
      L(7, "azure-storage-overview", "Azure Storage Overview", {
        contentDir: "ch02/07-azure-storage-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157690/ltv-azure-fundamentals/azure-storage-overview.mp4",
        durationLabel: "1 min 4 s",
      }),
      L(8, "azure-networking-basics", "Azure Networking Basics: VNets", {
        contentDir: "ch02/08-azure-networking-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157720/ltv-azure-fundamentals/azure-networking-basics.mp4",
        durationLabel: "55 s",
      }),
      L(9, "entra-id-basics", "Microsoft Entra ID Basics", {
        contentDir: "ch02/09-entra-id-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157752/ltv-azure-fundamentals/entra-id-basics.mp4",
        durationLabel: "58 s",
      }),
      L(10, "azure-monitor-basics", "Azure Monitor Basics", {
        contentDir: "ch02/10-azure-monitor-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157785/ltv-azure-fundamentals/azure-monitor-basics.mp4",
        durationLabel: "59 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Security, Pricing & Governance",
    lessons: [
      L(11, "identity-and-access-management-basics", "Identity & Access Management Basics", {
        contentDir: "ch03/11-identity-and-access-management-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157834/ltv-azure-fundamentals/identity-and-access-management-basics.mp4",
        durationLabel: "1 min 30 s",
      }),
      L(12, "azure-pricing-and-cost-management", "Azure Pricing & Cost Management", {
        contentDir: "ch03/12-azure-pricing-and-cost-management",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157883/ltv-azure-fundamentals/azure-pricing-and-cost-management.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(13, "governance-policies-tags-management-groups", "Governance: Policies, Tags & Management Groups", {
        contentDir: "ch03/13-governance-policies-tags-management-groups",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157924/ltv-azure-fundamentals/governance-policies-tags-management-groups.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(14, "compliance-basics", "Compliance Basics", {
        contentDir: "ch03/14-compliance-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792157975/ltv-azure-fundamentals/compliance-basics.mp4",
        durationLabel: "1 min 34 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Working in Azure",
    lessons: [
      L(15, "azure-cli-basics", "Azure CLI Basics", {
        contentDir: "ch04/15-azure-cli-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792158020/ltv-azure-fundamentals/azure-cli-basics.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(16, "arm-and-bicep-overview", "ARM & Bicep, Overview", {
        contentDir: "ch04/16-arm-and-bicep-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792158068/ltv-azure-fundamentals/arm-and-bicep-overview.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(17, "deploying-your-first-resource", "Deploying Your First Resource", {
        contentDir: "ch04/17-deploying-your-first-resource",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792158117/ltv-azure-fundamentals/deploying-your-first-resource.mp4",
        durationLabel: "1 min 30 s",
      }),
      L(18, "az-900-exam-overview", "AZ-900 Exam Overview", {
        contentDir: "ch04/18-az-900-exam-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792158166/ltv-azure-fundamentals/az-900-exam-overview.mp4",
        durationLabel: "1 min 33 s",
      }),
    ],
  },
];
