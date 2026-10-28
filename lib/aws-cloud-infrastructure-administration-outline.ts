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
      L(1, "the-aws-root-account-and-why-you-stop-using-it", "The AWS Root Account and Why You Stop Using It", { contentDir: "ch01/01-the-aws-root-account-and-why-you-stop-using-it", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/the-aws-root-account-and-why-you-stop-using-it.mp4", durationLabel: "2 min 15 s" }),
      L(2, "iam-users-groups-and-policies", "IAM Users, Groups, and Policies", { contentDir: "ch01/02-iam-users-groups-and-policies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/iam-users-groups-and-policies.mp4", durationLabel: "2 min 27 s" }),
      L(3, "iam-roles-and-why-they-beat-long-lived-keys", "IAM Roles and Why They Beat Long-Lived Keys", { contentDir: "ch01/03-iam-roles-and-why-they-beat-long-lived-keys", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/iam-roles-and-why-they-beat-long-lived-keys.mp4", durationLabel: "2 min 25 s" }),
      L(4, "the-aws-organizations-and-account-hierarchy-basics", "AWS Organizations and Account Hierarchy Basics", { contentDir: "ch01/04-the-aws-organizations-and-account-hierarchy-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/the-aws-organizations-and-account-hierarchy-basics.mp4", durationLabel: "2 min 23 s" }),
    ],
  },
  {
    n: 2,
    title: "AWS Compute: EC2",
    lessons: [
      L(5, "launching-and-sizing-an-ec2-instance", "Launching and Sizing an EC2 Instance", { contentDir: "ch02/05-launching-and-sizing-an-ec2-instance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/launching-and-sizing-an-ec2-instance.mp4", durationLabel: "2 min 25 s" }),
      L(6, "amazon-machine-images-and-the-ec2-lifecycle", "Amazon Machine Images (AMIs) and the EC2 Lifecycle", { contentDir: "ch02/06-amazon-machine-images-and-the-ec2-lifecycle", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/amazon-machine-images-and-the-ec2-lifecycle.mp4", durationLabel: "2 min 10 s" }),
      L(7, "ec2-instance-types-and-choosing-the-right-family", "EC2 Instance Types and Choosing the Right Family", { contentDir: "ch02/07-ec2-instance-types-and-choosing-the-right-family", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/ec2-instance-types-and-choosing-the-right-family.mp4", durationLabel: "2 min 16 s" }),
      L(8, "key-pairs-security-groups-and-connecting-to-an-instance", "Key Pairs, Security Groups, and Connecting to an Instance", { contentDir: "ch02/08-key-pairs-security-groups-and-connecting-to-an-instance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/key-pairs-security-groups-and-connecting-to-an-instance.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 3,
    title: "AWS Storage: S3 and EBS",
    lessons: [
      L(9, "s3-buckets-objects-and-storage-classes", "S3 Buckets, Objects, and Storage Classes", { contentDir: "ch03/09-s3-buckets-objects-and-storage-classes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/s3-buckets-objects-and-storage-classes.mp4", durationLabel: "2 min 21 s" }),
      L(10, "s3-versioning-lifecycle-rules-and-access-control", "S3 Versioning, Lifecycle Rules, and Access Control", { contentDir: "ch03/10-s3-versioning-lifecycle-rules-and-access-control", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/s3-versioning-lifecycle-rules-and-access-control.mp4", durationLabel: "2 min 15 s" }),
      L(11, "ebs-volumes-and-how-they-attach-to-ec2", "EBS Volumes and How They Attach to EC2", { contentDir: "ch03/11-ebs-volumes-and-how-they-attach-to-ec2", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/ebs-volumes-and-how-they-attach-to-ec2.mp4", durationLabel: "2 min 25 s" }),
      L(12, "ebs-snapshots-and-backup-strategy", "EBS Snapshots and Backup Strategy", { contentDir: "ch03/12-ebs-snapshots-and-backup-strategy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/ebs-snapshots-and-backup-strategy.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
  {
    n: 4,
    title: "AWS Networking: VPC",
    lessons: [
      L(13, "vpc-fundamentals-and-cidr-planning", "VPC Fundamentals and CIDR Planning", { contentDir: "ch04/13-vpc-fundamentals-and-cidr-planning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/vpc-fundamentals-and-cidr-planning.mp4", durationLabel: "2 min 47 s" }),
      L(14, "public-vs-private-subnets-and-internet-gateways", "Public vs. Private Subnets and Internet Gateways", { contentDir: "ch04/14-public-vs-private-subnets-and-internet-gateways", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/public-vs-private-subnets-and-internet-gateways.mp4", durationLabel: "2 min 20 s" }),
      L(15, "route-tables-nat-gateways-and-outbound-internet-access", "Route Tables, NAT Gateways, and Outbound Internet Access", { contentDir: "ch04/15-route-tables-nat-gateways-and-outbound-internet-access", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/route-tables-nat-gateways-and-outbound-internet-access.mp4", durationLabel: "2 min 21 s" }),
      L(16, "security-groups-vs-network-acls-in-aws", "Security Groups vs. Network ACLs in AWS", { contentDir: "ch04/16-security-groups-vs-network-acls-in-aws", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/security-groups-vs-network-acls-in-aws.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 5,
    title: "AWS CLI & Automation Basics",
    lessons: [
      L(17, "configuring-and-using-the-aws-cli", "Configuring and Using the AWS CLI", { contentDir: "ch05/17-configuring-and-using-the-aws-cli", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/configuring-and-using-the-aws-cli.mp4", durationLabel: "2 min 28 s" }),
      L(18, "managing-resources-with-aws-cli-commands", "Managing Resources with AWS CLI Commands", { contentDir: "ch05/18-managing-resources-with-aws-cli-commands", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/managing-resources-with-aws-cli-commands.mp4", durationLabel: "2 min 25 s" }),
      L(19, "aws-cloudshell-and-scripting-basics", "AWS CloudShell and Scripting Basics", { contentDir: "ch05/19-aws-cloudshell-and-scripting-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/aws-cloudshell-and-scripting-basics.mp4", durationLabel: "2 min 17 s" }),
      L(20, "tagging-resources-for-organization-and-cost-tracking", "Tagging Resources for Organization and Cost Tracking", { contentDir: "ch05/20-tagging-resources-for-organization-and-cost-tracking", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/tagging-resources-for-organization-and-cost-tracking.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 6,
    title: "Monitoring: CloudWatch",
    lessons: [
      L(21, "cloudwatch-metrics-and-dashboards", "CloudWatch Metrics and Dashboards", { contentDir: "ch06/21-cloudwatch-metrics-and-dashboards", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/cloudwatch-metrics-and-dashboards.mp4", durationLabel: "2 min 28 s" }),
      L(22, "cloudwatch-alarms-and-notifications", "CloudWatch Alarms and Notifications", { contentDir: "ch06/22-cloudwatch-alarms-and-notifications", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/cloudwatch-alarms-and-notifications.mp4", durationLabel: "2 min 10 s" }),
      L(23, "cloudwatch-logs-and-log-groups", "CloudWatch Logs and Log Groups", { contentDir: "ch06/23-cloudwatch-logs-and-log-groups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/cloudwatch-logs-and-log-groups.mp4", durationLabel: "2 min 18 s" }),
      L(24, "cloudtrail-and-tracking-who-did-what", "CloudTrail and Tracking Who Did What", { contentDir: "ch06/24-cloudtrail-and-tracking-who-did-what", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/cloudtrail-and-tracking-who-did-what.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 7,
    title: "AWS Cost Management",
    lessons: [
      L(25, "understanding-the-aws-bill-and-cost-explorer", "Understanding the AWS Bill and Cost Explorer", { contentDir: "ch07/25-understanding-the-aws-bill-and-cost-explorer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/understanding-the-aws-bill-and-cost-explorer.mp4", durationLabel: "2 min 27 s" }),
      L(26, "aws-budgets-and-cost-alerts", "AWS Budgets and Cost Alerts", { contentDir: "ch07/26-aws-budgets-and-cost-alerts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/aws-budgets-and-cost-alerts.mp4", durationLabel: "2 min 21 s" }),
      L(27, "right-sizing-and-common-cost-optimization-levers", "Right-Sizing and Common Cost Optimization Levers", { contentDir: "ch07/27-right-sizing-and-common-cost-optimization-levers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/right-sizing-and-common-cost-optimization-levers.mp4", durationLabel: "2 min 19 s" }),
      L(28, "reserved-instances-savings-plans-and-spot-instances", "Reserved Instances, Savings Plans, and Spot Instances", { contentDir: "ch07/28-reserved-instances-savings-plans-and-spot-instances", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/reserved-instances-savings-plans-and-spot-instances.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Deploying and Administering an AWS Environment",
    lessons: [
      L(29, "lab-deploying-a-small-multi-tier-environment-in-aws", "Lab: Deploying a Small Multi-Tier Environment in AWS", { contentDir: "ch08/29-lab-deploying-a-small-multi-tier-environment-in-aws", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/lab-deploying-a-small-multi-tier-environment-in-aws.mp4", durationLabel: "2 min 59 s" }),
      L(30, "lab-securing-and-monitoring-the-environment", "Lab: Securing and Monitoring the Environment", { contentDir: "ch08/30-lab-securing-and-monitoring-the-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/lab-securing-and-monitoring-the-environment.mp4", durationLabel: "2 min 32 s" }),
      L(31, "case-study-troubleshooting-an-unreachable-instance", "Case Study: Troubleshooting an Unreachable Instance", { contentDir: "ch08/31-case-study-troubleshooting-an-unreachable-instance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/case-study-troubleshooting-an-unreachable-instance.mp4", durationLabel: "2 min 15 s" }),
      L(32, "chapter-capstone-aws-administration-review", "Chapter Capstone: AWS Administration Review", { contentDir: "ch08/32-chapter-capstone-aws-administration-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-aws-cloud-infrastructure-administration/chapter-capstone-aws-administration-review.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
];
