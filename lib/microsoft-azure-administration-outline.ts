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
      L(1, "azure-subscriptions-and-management-groups", "Azure Subscriptions and Management Groups", { contentDir: "ch01/01-azure-subscriptions-and-management-groups" }),
      L(2, "resource-groups-and-azure-resource-manager", "Resource Groups and Azure Resource Manager", { contentDir: "ch01/02-resource-groups-and-azure-resource-manager" }),
      L(3, "azure-regions-and-resource-naming-conventions", "Azure Regions and Resource Naming Conventions", { contentDir: "ch01/03-azure-regions-and-resource-naming-conventions" }),
      L(4, "tags-policies-and-cost-governance-basics", "Tags, Azure Policy, and Cost Governance Basics", { contentDir: "ch01/04-tags-policies-and-cost-governance-basics" }),
    ],
  },
  {
    n: 2,
    title: "Azure Identity: Microsoft Entra ID",
    lessons: [
      L(5, "microsoft-entra-id-what-it-actually-is", "Microsoft Entra ID: What It Actually Is", { contentDir: "ch02/05-microsoft-entra-id-what-it-actually-is" }),
      L(6, "users-groups-and-licenses-in-entra-id", "Users, Groups, and Licenses in Entra ID", { contentDir: "ch02/06-users-groups-and-licenses-in-entra-id" }),
      L(7, "azure-role-based-access-control-rbac", "Azure Role-Based Access Control (RBAC)", { contentDir: "ch02/07-azure-role-based-access-control-rbac" }),
      L(8, "conditional-access-and-mfa-basics", "Conditional Access and MFA Basics", { contentDir: "ch02/08-conditional-access-and-mfa-basics" }),
    ],
  },
  {
    n: 3,
    title: "Azure Compute: Virtual Machines",
    lessons: [
      L(9, "creating-and-sizing-an-azure-virtual-machine", "Creating and Sizing an Azure Virtual Machine", { contentDir: "ch03/09-creating-and-sizing-an-azure-virtual-machine" }),
      L(10, "vm-availability-sets-and-availability-zones", "VM Availability Sets and Availability Zones", { contentDir: "ch03/10-vm-availability-sets-and-availability-zones" }),
      L(11, "managed-disks-and-vm-storage-options", "Managed Disks and VM Storage Options", { contentDir: "ch03/11-managed-disks-and-vm-storage-options" }),
      L(12, "virtual-machine-scale-sets-basics", "Virtual Machine Scale Sets Basics", { contentDir: "ch03/12-virtual-machine-scale-sets-basics" }),
    ],
  },
  {
    n: 4,
    title: "Azure Storage",
    lessons: [
      L(13, "storage-accounts-and-performance-tiers", "Storage Accounts and Performance Tiers", { contentDir: "ch04/13-storage-accounts-and-performance-tiers" }),
      L(14, "blob-storage-containers-and-access-tiers", "Blob Storage: Containers and Access Tiers", { contentDir: "ch04/14-blob-storage-containers-and-access-tiers" }),
      L(15, "azure-files-and-azure-disks-compared-to-blob", "Azure Files and Azure Disks Compared to Blob", { contentDir: "ch04/15-azure-files-and-azure-disks-compared-to-blob" }),
      L(16, "storage-redundancy-lrs-zrs-grs-and-lifecycle-management", "Storage Redundancy (LRS/ZRS/GRS) and Lifecycle Management", { contentDir: "ch04/16-storage-redundancy-lrs-zrs-grs-and-lifecycle-management" }),
    ],
  },
  {
    n: 5,
    title: "Azure Networking",
    lessons: [
      L(17, "virtual-networks-and-subnets-in-azure", "Virtual Networks and Subnets in Azure", { contentDir: "ch05/17-virtual-networks-and-subnets-in-azure" }),
      L(18, "network-security-groups-in-practice", "Network Security Groups in Practice", { contentDir: "ch05/18-network-security-groups-in-practice" }),
      L(19, "public-ips-and-azure-load-balancer-basics", "Public IPs and Azure Load Balancer Basics", { contentDir: "ch05/19-public-ips-and-azure-load-balancer-basics" }),
      L(20, "vnet-peering-and-connecting-azure-networks", "VNet Peering and Connecting Azure Networks", { contentDir: "ch05/20-vnet-peering-and-connecting-azure-networks" }),
    ],
  },
  {
    n: 6,
    title: "Azure CLI & PowerShell Administration",
    lessons: [
      L(21, "getting-started-with-the-azure-cli", "Getting Started with the Azure CLI", { contentDir: "ch06/21-getting-started-with-the-azure-cli" }),
      L(22, "managing-resources-with-az-commands", "Managing Resources with az Commands", { contentDir: "ch06/22-managing-resources-with-az-commands" }),
      L(23, "azure-powershell-cmdlets-for-administrators", "Azure PowerShell Cmdlets for Administrators", { contentDir: "ch06/23-azure-powershell-cmdlets-for-administrators" }),
      L(24, "azure-cloud-shell-and-scripting-basics", "Azure Cloud Shell and Scripting Basics", { contentDir: "ch06/24-azure-cloud-shell-and-scripting-basics" }),
    ],
  },
  {
    n: 7,
    title: "Monitoring & Cost Management",
    lessons: [
      L(25, "azure-monitor-and-metrics-basics", "Azure Monitor and Metrics Basics", { contentDir: "ch07/25-azure-monitor-and-metrics-basics" }),
      L(26, "log-analytics-and-the-activity-log", "Log Analytics and the Activity Log", { contentDir: "ch07/26-log-analytics-and-the-activity-log" }),
      L(27, "alerts-and-action-groups", "Alerts and Action Groups", { contentDir: "ch07/27-alerts-and-action-groups" }),
      L(28, "cost-management-and-budgets", "Cost Management and Budgets", { contentDir: "ch07/28-cost-management-and-budgets" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Deploying and Administering an Azure Environment",
    lessons: [
      L(29, "lab-deploying-a-small-multi-tier-environment", "Lab: Deploying a Small Multi-Tier Environment", { contentDir: "ch08/29-lab-deploying-a-small-multi-tier-environment" }),
      L(30, "lab-securing-and-monitoring-the-environment", "Lab: Securing and Monitoring the Environment", { contentDir: "ch08/30-lab-securing-and-monitoring-the-environment" }),
      L(31, "case-study-troubleshooting-a-cost-spike", "Case Study: Troubleshooting a Cost Spike", { contentDir: "ch08/31-case-study-troubleshooting-a-cost-spike" }),
      L(32, "chapter-capstone-azure-administration-review", "Chapter Capstone: Azure Administration Review", { contentDir: "ch08/32-chapter-capstone-azure-administration-review" }),
    ],
  },
];
