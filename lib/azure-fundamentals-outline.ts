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
        // videoUrl/durationLabel pending
      }),
      L(2, "iaas-paas-saas", "IaaS, PaaS & SaaS", {
        contentDir: "ch01/02-iaas-paas-saas",
        // videoUrl/durationLabel pending
      }),
      L(3, "azure-global-infrastructure", "Azure Global Infrastructure: Regions & Availability Zones", {
        contentDir: "ch01/03-azure-global-infrastructure",
        // videoUrl/durationLabel pending
      }),
      L(4, "azure-portal-tour", "Azure Portal Tour", {
        contentDir: "ch01/04-azure-portal-tour",
        // videoUrl/durationLabel pending
      }),
      L(5, "subscriptions-and-resource-groups", "Subscriptions & Resource Groups", {
        contentDir: "ch01/05-subscriptions-and-resource-groups",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 2,
    title: "Core Azure Services",
    lessons: [
      L(6, "azure-compute-overview", "Azure Compute Overview: VMs & App Service", {
        contentDir: "ch02/06-azure-compute-overview",
        // videoUrl/durationLabel pending
      }),
      L(7, "azure-storage-overview", "Azure Storage Overview", {
        contentDir: "ch02/07-azure-storage-overview",
        // videoUrl/durationLabel pending
      }),
      L(8, "azure-networking-basics", "Azure Networking Basics: VNets", {
        contentDir: "ch02/08-azure-networking-basics",
        // videoUrl/durationLabel pending
      }),
      L(9, "entra-id-basics", "Microsoft Entra ID Basics", {
        contentDir: "ch02/09-entra-id-basics",
        // videoUrl/durationLabel pending
      }),
      L(10, "azure-monitor-basics", "Azure Monitor Basics", {
        contentDir: "ch02/10-azure-monitor-basics",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 3,
    title: "Security, Pricing & Governance",
    lessons: [
      L(11, "identity-and-access-management-basics", "Identity & Access Management Basics", {
        contentDir: "ch03/11-identity-and-access-management-basics",
        // videoUrl/durationLabel pending
      }),
      L(12, "azure-pricing-and-cost-management", "Azure Pricing & Cost Management", {
        contentDir: "ch03/12-azure-pricing-and-cost-management",
        // videoUrl/durationLabel pending
      }),
      L(13, "governance-policies-tags-management-groups", "Governance: Policies, Tags & Management Groups", {
        contentDir: "ch03/13-governance-policies-tags-management-groups",
        // videoUrl/durationLabel pending
      }),
      L(14, "compliance-basics", "Compliance Basics", {
        contentDir: "ch03/14-compliance-basics",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 4,
    title: "Working in Azure",
    lessons: [
      L(15, "azure-cli-basics", "Azure CLI Basics", {
        contentDir: "ch04/15-azure-cli-basics",
        // videoUrl/durationLabel pending
      }),
      L(16, "arm-and-bicep-overview", "ARM & Bicep, Overview", {
        contentDir: "ch04/16-arm-and-bicep-overview",
        // videoUrl/durationLabel pending
      }),
      L(17, "deploying-your-first-resource", "Deploying Your First Resource", {
        contentDir: "ch04/17-deploying-your-first-resource",
        // videoUrl/durationLabel pending
      }),
      L(18, "az-900-exam-overview", "AZ-900 Exam Overview", {
        contentDir: "ch04/18-az-900-exam-overview",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
