// Microsoft Azure Administration, Compute & Storage course outline. Lessons without a contentDir
// render as "in production". Course 3 of the Cloud Engineer → Cloud Architect path's Job-Ready
// Foundation stage — hands-on Azure administration (portal + CLI), building on course 2's
// vendor-neutral networking/Linux/virtualization/cloud fundamentals. Grounded in real AZ-104
// (Azure Administrator Associate) objectives.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/microsoft-azure-administration/
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

export const MICROSOFT_AZURE_ADMINISTRATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Azure Fundamentals & Governance",
    lessons: [
      L(1, "azure-subscriptions-and-management-groups", "Azure Subscriptions and Management Groups", { contentDir: "ch01/01-azure-subscriptions-and-management-groups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/azure-subscriptions-and-management-groups.mp4", durationLabel: "2 min 36 s" }),
      L(2, "resource-groups-and-azure-resource-manager", "Resource Groups and Azure Resource Manager", { contentDir: "ch01/02-resource-groups-and-azure-resource-manager", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/resource-groups-and-azure-resource-manager.mp4", durationLabel: "2 min 29 s" }),
      L(3, "azure-regions-and-resource-naming-conventions", "Azure Regions and Resource Naming Conventions", { contentDir: "ch01/03-azure-regions-and-resource-naming-conventions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/azure-regions-and-resource-naming-conventions.mp4", durationLabel: "2 min 33 s" }),
      L(4, "tags-policies-and-cost-governance-basics", "Tags, Azure Policy, and Cost Governance Basics", { contentDir: "ch01/04-tags-policies-and-cost-governance-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/tags-policies-and-cost-governance-basics.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 2,
    title: "Azure Identity: Microsoft Entra ID",
    lessons: [
      L(5, "microsoft-entra-id-what-it-actually-is", "Microsoft Entra ID: What It Actually Is", { contentDir: "ch02/05-microsoft-entra-id-what-it-actually-is", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/microsoft-entra-id-what-it-actually-is.mp4", durationLabel: "2 min 33 s" }),
      L(6, "users-groups-and-licenses-in-entra-id", "Users, Groups, and Licenses in Entra ID", { contentDir: "ch02/06-users-groups-and-licenses-in-entra-id", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/users-groups-and-licenses-in-entra-id.mp4", durationLabel: "2 min 30 s" }),
      L(7, "azure-role-based-access-control-rbac", "Azure Role-Based Access Control (RBAC)", { contentDir: "ch02/07-azure-role-based-access-control-rbac", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/azure-role-based-access-control-rbac.mp4", durationLabel: "2 min 26 s" }),
      L(8, "conditional-access-and-mfa-basics", "Conditional Access and MFA Basics", { contentDir: "ch02/08-conditional-access-and-mfa-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/conditional-access-and-mfa-basics.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 3,
    title: "Azure Compute: Virtual Machines",
    lessons: [
      L(9, "creating-and-sizing-an-azure-virtual-machine", "Creating and Sizing an Azure Virtual Machine", { contentDir: "ch03/09-creating-and-sizing-an-azure-virtual-machine", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/creating-and-sizing-an-azure-virtual-machine.mp4", durationLabel: "2 min 29 s" }),
      L(10, "vm-availability-sets-and-availability-zones", "VM Availability Sets and Availability Zones", { contentDir: "ch03/10-vm-availability-sets-and-availability-zones", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/vm-availability-sets-and-availability-zones.mp4", durationLabel: "2 min 17 s" }),
      L(11, "managed-disks-and-vm-storage-options", "Managed Disks and VM Storage Options", { contentDir: "ch03/11-managed-disks-and-vm-storage-options", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/managed-disks-and-vm-storage-options.mp4", durationLabel: "2 min 37 s" }),
      L(12, "virtual-machine-scale-sets-basics", "Virtual Machine Scale Sets Basics", { contentDir: "ch03/12-virtual-machine-scale-sets-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/virtual-machine-scale-sets-basics.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 4,
    title: "Azure Storage",
    lessons: [
      L(13, "storage-accounts-and-performance-tiers", "Storage Accounts and Performance Tiers", { contentDir: "ch04/13-storage-accounts-and-performance-tiers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/storage-accounts-and-performance-tiers.mp4", durationLabel: "2 min 16 s" }),
      L(14, "blob-storage-containers-and-access-tiers", "Blob Storage: Containers and Access Tiers", { contentDir: "ch04/14-blob-storage-containers-and-access-tiers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/blob-storage-containers-and-access-tiers.mp4", durationLabel: "2 min 21 s" }),
      L(15, "azure-files-and-azure-disks-compared-to-blob", "Azure Files and Azure Disks Compared to Blob", { contentDir: "ch04/15-azure-files-and-azure-disks-compared-to-blob", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/azure-files-and-azure-disks-compared-to-blob.mp4", durationLabel: "2 min 17 s" }),
      L(16, "storage-redundancy-lrs-zrs-grs-and-lifecycle-management", "Storage Redundancy (LRS/ZRS/GRS) and Lifecycle Management", { contentDir: "ch04/16-storage-redundancy-lrs-zrs-grs-and-lifecycle-management", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/storage-redundancy-lrs-zrs-grs-and-lifecycle-management.mp4", durationLabel: "2 min 47 s" }),
    ],
  },
  {
    n: 5,
    title: "Azure Networking",
    lessons: [
      L(17, "virtual-networks-and-subnets-in-azure", "Virtual Networks and Subnets in Azure", { contentDir: "ch05/17-virtual-networks-and-subnets-in-azure", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/virtual-networks-and-subnets-in-azure.mp4", durationLabel: "2 min 38 s" }),
      L(18, "network-security-groups-in-practice", "Network Security Groups in Practice", { contentDir: "ch05/18-network-security-groups-in-practice", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/network-security-groups-in-practice.mp4", durationLabel: "2 min 26 s" }),
      L(19, "public-ips-and-azure-load-balancer-basics", "Public IPs and Azure Load Balancer Basics", { contentDir: "ch05/19-public-ips-and-azure-load-balancer-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/public-ips-and-azure-load-balancer-basics.mp4", durationLabel: "2 min 21 s" }),
      L(20, "vnet-peering-and-connecting-azure-networks", "VNet Peering and Connecting Azure Networks", { contentDir: "ch05/20-vnet-peering-and-connecting-azure-networks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/vnet-peering-and-connecting-azure-networks.mp4", durationLabel: "2 min 17 s" }),
    ],
  },
  {
    n: 6,
    title: "Azure CLI & PowerShell Administration",
    lessons: [
      L(21, "getting-started-with-the-azure-cli", "Getting Started with the Azure CLI", { contentDir: "ch06/21-getting-started-with-the-azure-cli", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/getting-started-with-the-azure-cli.mp4", durationLabel: "2 min 4 s" }),
      L(22, "managing-resources-with-az-commands", "Managing Resources with az Commands", { contentDir: "ch06/22-managing-resources-with-az-commands", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/managing-resources-with-az-commands.mp4", durationLabel: "2 min 25 s" }),
      L(23, "azure-powershell-cmdlets-for-administrators", "Azure PowerShell Cmdlets for Administrators", { contentDir: "ch06/23-azure-powershell-cmdlets-for-administrators", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/azure-powershell-cmdlets-for-administrators.mp4", durationLabel: "2 min 11 s" }),
      L(24, "azure-cloud-shell-and-scripting-basics", "Azure Cloud Shell and Scripting Basics", { contentDir: "ch06/24-azure-cloud-shell-and-scripting-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/azure-cloud-shell-and-scripting-basics.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 7,
    title: "Monitoring & Cost Management",
    lessons: [
      L(25, "azure-monitor-and-metrics-basics", "Azure Monitor and Metrics Basics", { contentDir: "ch07/25-azure-monitor-and-metrics-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/azure-monitor-and-metrics-basics.mp4", durationLabel: "2 min 53 s" }),
      L(26, "log-analytics-and-the-activity-log", "Log Analytics and the Activity Log", { contentDir: "ch07/26-log-analytics-and-the-activity-log", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/log-analytics-and-the-activity-log.mp4", durationLabel: "2 min 12 s" }),
      L(27, "alerts-and-action-groups", "Alerts and Action Groups", { contentDir: "ch07/27-alerts-and-action-groups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/alerts-and-action-groups.mp4", durationLabel: "2 min 9 s" }),
      L(28, "cost-management-and-budgets", "Cost Management and Budgets", { contentDir: "ch07/28-cost-management-and-budgets", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/cost-management-and-budgets.mp4", durationLabel: "2 min 11 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Deploying and Administering an Azure Environment",
    lessons: [
      L(29, "lab-deploying-a-small-multi-tier-environment", "Lab: Deploying a Small Multi-Tier Environment", { contentDir: "ch08/29-lab-deploying-a-small-multi-tier-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/lab-deploying-a-small-multi-tier-environment.mp4", durationLabel: "2 min 20 s" }),
      L(30, "lab-securing-and-monitoring-the-environment", "Lab: Securing and Monitoring the Environment", { contentDir: "ch08/30-lab-securing-and-monitoring-the-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/lab-securing-and-monitoring-the-environment.mp4", durationLabel: "2 min 14 s" }),
      L(31, "case-study-troubleshooting-a-cost-spike", "Case Study: Troubleshooting a Cost Spike", { contentDir: "ch08/31-case-study-troubleshooting-a-cost-spike", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/case-study-troubleshooting-a-cost-spike.mp4", durationLabel: "2 min 19 s" }),
      L(32, "chapter-capstone-azure-administration-review", "Chapter Capstone: Azure Administration Review", { contentDir: "ch08/32-chapter-capstone-azure-administration-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-azure-administration/chapter-capstone-azure-administration-review.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
];
