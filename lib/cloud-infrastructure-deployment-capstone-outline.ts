// Cloud Deployment, Monitoring, Backup & Job-Ready Capstone course outline. Lessons without a
// contentDir render as "in production". Course 7 of the Cloud Engineer → Cloud Architect path —
// the final course of the Job-Ready Foundation stage: planning and deploying a real cloud
// environment end to end, monitoring/backup included, closing out the Cloud Engineer foundation
// built across courses 1-6 with a job-ready capstone.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cloud-infrastructure-deployment-capstone/
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

export const CLOUD_INFRASTRUCTURE_DEPLOYMENT_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Planning a Real Deployment",
    lessons: [
      L(1, "gathering-real-requirements-before-you-deploy-anything", "Gathering Real Requirements Before You Deploy Anything", { contentDir: "ch01/01-gathering-real-requirements-before-you-deploy-anything" }),
      L(2, "choosing-azure-aws-or-both-for-a-given-workload", "Choosing Azure, AWS, or Both for a Given Workload", { contentDir: "ch01/02-choosing-azure-aws-or-both-for-a-given-workload" }),
      L(3, "sizing-compute-and-storage-realistically", "Sizing Compute and Storage Realistically", { contentDir: "ch01/03-sizing-compute-and-storage-realistically" }),
      L(4, "designing-the-architecture-diagram-before-you-build", "Designing the Architecture Diagram Before You Build", { contentDir: "ch01/04-designing-the-architecture-diagram-before-you-build" }),
    ],
  },
  {
    n: 2,
    title: "Deploying the Network Layer",
    lessons: [
      L(5, "the-real-deployment-order-network-first", "The Real Deployment Order: Network First", { contentDir: "ch02/05-the-real-deployment-order-network-first" }),
      L(6, "deploying-vnets-vpcs-and-subnets", "Deploying VNets, VPCs, and Subnets", { contentDir: "ch02/06-deploying-vnets-vpcs-and-subnets" }),
      L(7, "deploying-nsgs-and-security-groups-correctly-the-first-time", "Deploying NSGs and Security Groups Correctly the First Time", { contentDir: "ch02/07-deploying-nsgs-and-security-groups-correctly-the-first-time" }),
      L(8, "verifying-network-connectivity-before-moving-on", "Verifying Network Connectivity Before Moving On", { contentDir: "ch02/08-verifying-network-connectivity-before-moving-on" }),
    ],
  },
  {
    n: 3,
    title: "Deploying Compute & Storage",
    lessons: [
      L(9, "deploying-vms-and-ec2-instances-into-the-network", "Deploying VMs and EC2 Instances into the Network", { contentDir: "ch03/09-deploying-vms-and-ec2-instances-into-the-network" }),
      L(10, "deploying-storage-accounts-and-s3-buckets", "Deploying Storage Accounts and S3 Buckets", { contentDir: "ch03/10-deploying-storage-accounts-and-s3-buckets" }),
      L(11, "wiring-compute-to-storage-correctly", "Wiring Compute to Storage Correctly", { contentDir: "ch03/11-wiring-compute-to-storage-correctly" }),
      L(12, "a-smoke-test-confirming-the-environment-actually-works", "A Smoke Test: Confirming the Environment Actually Works", { contentDir: "ch03/12-a-smoke-test-confirming-the-environment-actually-works" }),
    ],
  },
  {
    n: 4,
    title: "Monitoring the Deployed Environment",
    lessons: [
      L(13, "standing-up-monitoring-before-you-need-it", "Standing Up Monitoring Before You Need It", { contentDir: "ch04/13-standing-up-monitoring-before-you-need-it" }),
      L(14, "configuring-the-alerts-that-actually-matter", "Configuring the Alerts That Actually Matter", { contentDir: "ch04/14-configuring-the-alerts-that-actually-matter" }),
      L(15, "avoiding-alert-fatigue-from-day-one", "Avoiding Alert Fatigue from Day One", { contentDir: "ch04/15-avoiding-alert-fatigue-from-day-one" }),
      L(16, "a-monitoring-checklist-for-a-new-environment", "A Monitoring Checklist for a New Environment", { contentDir: "ch04/16-a-monitoring-checklist-for-a-new-environment" }),
    ],
  },
  {
    n: 5,
    title: "Backup & Disaster Recovery Basics",
    lessons: [
      L(17, "rto-and-rpo-what-they-actually-mean-for-a-deployment", "RTO and RPO: What They Actually Mean for a Deployment", { contentDir: "ch05/17-rto-and-rpo-what-they-actually-mean-for-a-deployment" }),
      L(18, "configuring-a-real-backup-policy", "Configuring a Real Backup Policy", { contentDir: "ch05/18-configuring-a-real-backup-policy" }),
      L(19, "testing-a-restore-not-just-taking-backups", "Testing a Restore, Not Just Taking Backups", { contentDir: "ch05/19-testing-a-restore-not-just-taking-backups" }),
      L(20, "basic-disaster-recovery-planning-for-a-small-environment", "Basic Disaster Recovery Planning for a Small Environment", { contentDir: "ch05/20-basic-disaster-recovery-planning-for-a-small-environment" }),
    ],
  },
  {
    n: 6,
    title: "Documentation & Handoff",
    lessons: [
      L(21, "why-a-deployment-isnt-done-until-its-documented", "Why a Deployment Isn't Done Until It's Documented", { contentDir: "ch06/21-why-a-deployment-isnt-done-until-its-documented" }),
      L(22, "writing-an-architecture-diagram-and-runbook-together", "Writing an Architecture Diagram and Runbook Together", { contentDir: "ch06/22-writing-an-architecture-diagram-and-runbook-together" }),
      L(23, "documenting-for-the-next-engineer-not-for-yourself", "Documenting for the Next Engineer, Not for Yourself", { contentDir: "ch06/23-documenting-for-the-next-engineer-not-for-yourself" }),
      L(24, "a-real-handoff-checklist", "A Real Handoff Checklist", { contentDir: "ch06/24-a-real-handoff-checklist" }),
    ],
  },
  {
    n: 7,
    title: "Troubleshooting Common Deployment Issues",
    lessons: [
      L(25, "the-five-places-a-new-deployment-usually-breaks", "The Five Places a New Deployment Usually Breaks", { contentDir: "ch07/25-the-five-places-a-new-deployment-usually-breaks" }),
      L(26, "diagnosing-connectivity-failures-systematically", "Diagnosing Connectivity Failures Systematically", { contentDir: "ch07/26-diagnosing-connectivity-failures-systematically" }),
      L(27, "diagnosing-permission-and-identity-failures", "Diagnosing Permission and Identity Failures", { contentDir: "ch07/27-diagnosing-permission-and-identity-failures" }),
      L(28, "when-to-roll-back-vs-when-to-fix-forward", "When to Roll Back vs. When to Fix Forward", { contentDir: "ch07/28-when-to-roll-back-vs-when-to-fix-forward" }),
    ],
  },
  {
    n: 8,
    title: "Job-Ready Capstone: Full Deployment Project",
    lessons: [
      L(29, "capstone-part-1-planning-and-network-deployment", "Capstone Part 1: Planning and Network Deployment", { contentDir: "ch08/29-capstone-part-1-planning-and-network-deployment" }),
      L(30, "capstone-part-2-compute-storage-and-monitoring", "Capstone Part 2: Compute, Storage, and Monitoring", { contentDir: "ch08/30-capstone-part-2-compute-storage-and-monitoring" }),
      L(31, "capstone-part-3-backup-documentation-and-handoff", "Capstone Part 3: Backup, Documentation, and Handoff", { contentDir: "ch08/31-capstone-part-3-backup-documentation-and-handoff" }),
      L(32, "job-ready-foundation-review-and-whats-next", "Job-Ready Foundation Review and What's Next", { contentDir: "ch08/32-job-ready-foundation-review-and-whats-next" }),
    ],
  },
];
