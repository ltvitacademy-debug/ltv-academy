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
      L(1, "what-is-cloud-computing", "What Is Cloud Computing?"),
      L(2, "iaas-paas-saas", "IaaS, PaaS & SaaS"),
      L(3, "azure-global-infrastructure", "Azure Global Infrastructure: Regions & Availability Zones"),
      L(4, "azure-portal-tour", "Azure Portal Tour"),
      L(5, "subscriptions-and-resource-groups", "Subscriptions & Resource Groups"),
    ],
  },
  {
    n: 2,
    title: "Core Azure Services",
    lessons: [
      L(6, "azure-compute-overview", "Azure Compute Overview: VMs & App Service"),
      L(7, "azure-storage-overview", "Azure Storage Overview"),
      L(8, "azure-networking-basics", "Azure Networking Basics: VNets"),
      L(9, "entra-id-basics", "Microsoft Entra ID Basics"),
      L(10, "azure-monitor-basics", "Azure Monitor Basics"),
    ],
  },
  {
    n: 3,
    title: "Security, Pricing & Governance",
    lessons: [
      L(11, "identity-and-access-management-basics", "Identity & Access Management Basics"),
      L(12, "azure-pricing-and-cost-management", "Azure Pricing & Cost Management"),
      L(13, "governance-policies-tags-management-groups", "Governance: Policies, Tags & Management Groups"),
      L(14, "compliance-basics", "Compliance Basics"),
    ],
  },
  {
    n: 4,
    title: "Working in Azure",
    lessons: [
      L(15, "azure-cli-basics", "Azure CLI Basics"),
      L(16, "arm-and-bicep-overview", "ARM & Bicep, Overview"),
      L(17, "deploying-your-first-resource", "Deploying Your First Resource"),
      L(18, "az-900-exam-overview", "AZ-900 Exam Overview"),
    ],
  },
];
