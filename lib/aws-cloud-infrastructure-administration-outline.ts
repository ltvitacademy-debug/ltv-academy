// AWS Cloud Infrastructure & Administration course outline. Lessons without a contentDir render
// as "in production". Course 4 of the Cloud Engineer → Cloud Architect path's Job-Ready
// Foundation stage — hands-on AWS administration (console + CLI), building on course 2's
// vendor-neutral cloud fundamentals and course 3's Azure administration. Grounded in real AWS
// Certified SysOps Administrator – Associate objectives.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/aws-cloud-infrastructure-administration/
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

export const AWS_CLOUD_INFRASTRUCTURE_ADMINISTRATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "AWS Account & IAM Fundamentals",
    lessons: [
      L(1, "the-aws-root-account-and-why-you-stop-using-it", "The AWS Root Account and Why You Stop Using It", { contentDir: "ch01/01-the-aws-root-account-and-why-you-stop-using-it" }),
      L(2, "iam-users-groups-and-policies", "IAM Users, Groups, and Policies", { contentDir: "ch01/02-iam-users-groups-and-policies" }),
      L(3, "iam-roles-and-why-they-beat-long-lived-keys", "IAM Roles and Why They Beat Long-Lived Keys", { contentDir: "ch01/03-iam-roles-and-why-they-beat-long-lived-keys" }),
      L(4, "the-aws-organizations-and-account-hierarchy-basics", "AWS Organizations and Account Hierarchy Basics", { contentDir: "ch01/04-the-aws-organizations-and-account-hierarchy-basics" }),
    ],
  },
  {
    n: 2,
    title: "AWS Compute: EC2",
    lessons: [
      L(5, "launching-and-sizing-an-ec2-instance", "Launching and Sizing an EC2 Instance", { contentDir: "ch02/05-launching-and-sizing-an-ec2-instance" }),
      L(6, "amazon-machine-images-and-the-ec2-lifecycle", "Amazon Machine Images (AMIs) and the EC2 Lifecycle", { contentDir: "ch02/06-amazon-machine-images-and-the-ec2-lifecycle" }),
      L(7, "ec2-instance-types-and-choosing-the-right-family", "EC2 Instance Types and Choosing the Right Family", { contentDir: "ch02/07-ec2-instance-types-and-choosing-the-right-family" }),
      L(8, "key-pairs-security-groups-and-connecting-to-an-instance", "Key Pairs, Security Groups, and Connecting to an Instance", { contentDir: "ch02/08-key-pairs-security-groups-and-connecting-to-an-instance" }),
    ],
  },
  {
    n: 3,
    title: "AWS Storage: S3 and EBS",
    lessons: [
      L(9, "s3-buckets-objects-and-storage-classes", "S3 Buckets, Objects, and Storage Classes", { contentDir: "ch03/09-s3-buckets-objects-and-storage-classes" }),
      L(10, "s3-versioning-lifecycle-rules-and-access-control", "S3 Versioning, Lifecycle Rules, and Access Control", { contentDir: "ch03/10-s3-versioning-lifecycle-rules-and-access-control" }),
      L(11, "ebs-volumes-and-how-they-attach-to-ec2", "EBS Volumes and How They Attach to EC2", { contentDir: "ch03/11-ebs-volumes-and-how-they-attach-to-ec2" }),
      L(12, "ebs-snapshots-and-backup-strategy", "EBS Snapshots and Backup Strategy", { contentDir: "ch03/12-ebs-snapshots-and-backup-strategy" }),
    ],
  },
  {
    n: 4,
    title: "AWS Networking: VPC",
    lessons: [
      L(13, "vpc-fundamentals-and-cidr-planning", "VPC Fundamentals and CIDR Planning", { contentDir: "ch04/13-vpc-fundamentals-and-cidr-planning" }),
      L(14, "public-vs-private-subnets-and-internet-gateways", "Public vs. Private Subnets and Internet Gateways", { contentDir: "ch04/14-public-vs-private-subnets-and-internet-gateways" }),
      L(15, "route-tables-nat-gateways-and-outbound-internet-access", "Route Tables, NAT Gateways, and Outbound Internet Access", { contentDir: "ch04/15-route-tables-nat-gateways-and-outbound-internet-access" }),
      L(16, "security-groups-vs-network-acls-in-aws", "Security Groups vs. Network ACLs in AWS", { contentDir: "ch04/16-security-groups-vs-network-acls-in-aws" }),
    ],
  },
  {
    n: 5,
    title: "AWS CLI & Automation Basics",
    lessons: [
      L(17, "configuring-and-using-the-aws-cli", "Configuring and Using the AWS CLI", { contentDir: "ch05/17-configuring-and-using-the-aws-cli" }),
      L(18, "managing-resources-with-aws-cli-commands", "Managing Resources with AWS CLI Commands", { contentDir: "ch05/18-managing-resources-with-aws-cli-commands" }),
      L(19, "aws-cloudshell-and-scripting-basics", "AWS CloudShell and Scripting Basics", { contentDir: "ch05/19-aws-cloudshell-and-scripting-basics" }),
      L(20, "tagging-resources-for-organization-and-cost-tracking", "Tagging Resources for Organization and Cost Tracking", { contentDir: "ch05/20-tagging-resources-for-organization-and-cost-tracking" }),
    ],
  },
  {
    n: 6,
    title: "Monitoring: CloudWatch",
    lessons: [
      L(21, "cloudwatch-metrics-and-dashboards", "CloudWatch Metrics and Dashboards", { contentDir: "ch06/21-cloudwatch-metrics-and-dashboards" }),
      L(22, "cloudwatch-alarms-and-notifications", "CloudWatch Alarms and Notifications", { contentDir: "ch06/22-cloudwatch-alarms-and-notifications" }),
      L(23, "cloudwatch-logs-and-log-groups", "CloudWatch Logs and Log Groups", { contentDir: "ch06/23-cloudwatch-logs-and-log-groups" }),
      L(24, "cloudtrail-and-tracking-who-did-what", "CloudTrail and Tracking Who Did What", { contentDir: "ch06/24-cloudtrail-and-tracking-who-did-what" }),
    ],
  },
  {
    n: 7,
    title: "AWS Cost Management",
    lessons: [
      L(25, "understanding-the-aws-bill-and-cost-explorer", "Understanding the AWS Bill and Cost Explorer", { contentDir: "ch07/25-understanding-the-aws-bill-and-cost-explorer" }),
      L(26, "aws-budgets-and-cost-alerts", "AWS Budgets and Cost Alerts", { contentDir: "ch07/26-aws-budgets-and-cost-alerts" }),
      L(27, "right-sizing-and-common-cost-optimization-levers", "Right-Sizing and Common Cost Optimization Levers", { contentDir: "ch07/27-right-sizing-and-common-cost-optimization-levers" }),
      L(28, "reserved-instances-savings-plans-and-spot-instances", "Reserved Instances, Savings Plans, and Spot Instances", { contentDir: "ch07/28-reserved-instances-savings-plans-and-spot-instances" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Deploying and Administering an AWS Environment",
    lessons: [
      L(29, "lab-deploying-a-small-multi-tier-environment-in-aws", "Lab: Deploying a Small Multi-Tier Environment in AWS", { contentDir: "ch08/29-lab-deploying-a-small-multi-tier-environment-in-aws" }),
      L(30, "lab-securing-and-monitoring-the-environment", "Lab: Securing and Monitoring the Environment", { contentDir: "ch08/30-lab-securing-and-monitoring-the-environment" }),
      L(31, "case-study-troubleshooting-an-unreachable-instance", "Case Study: Troubleshooting an Unreachable Instance", { contentDir: "ch08/31-case-study-troubleshooting-an-unreachable-instance" }),
      L(32, "chapter-capstone-aws-administration-review", "Chapter Capstone: AWS Administration Review", { contentDir: "ch08/32-chapter-capstone-aws-administration-review" }),
    ],
  },
];
