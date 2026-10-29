// PowerShell, Python, Azure CLI & Infrastructure Automation course outline. Lessons without a
// contentDir render as "in production". Course 6 of the Cloud Engineer → Cloud Architect path's
// Job-Ready Foundation stage — real scripted infrastructure automation across both major clouds,
// building on the PowerShell Fundamentals course and the Azure/AWS CLI basics already taught in
// courses 3-4, not re-teaching basic syntax.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/python-powershell-infrastructure-automation/
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

export const PYTHON_POWERSHELL_INFRASTRUCTURE_AUTOMATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Scripted Infrastructure: Why and How",
    lessons: [
      L(1, "why-infrastructure-automation-matters-at-scale", "Why Infrastructure Automation Matters at Scale", { contentDir: "ch01/01-why-infrastructure-automation-matters-at-scale", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/why-infrastructure-automation-matters-at-scale.mp4", durationLabel: "2 min 4 s" }),
      L(2, "choosing-the-right-tool-powershell-python-or-cli", "Choosing the Right Tool: PowerShell, Python, or CLI", { contentDir: "ch01/02-choosing-the-right-tool-powershell-python-or-cli", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/choosing-the-right-tool-powershell-python-or-cli.mp4", durationLabel: "2 min 7 s" }),
      L(3, "idempotency-why-a-script-should-be-safe-to-rerun", "Idempotency: Why a Script Should Be Safe to Rerun", { contentDir: "ch01/03-idempotency-why-a-script-should-be-safe-to-rerun", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/idempotency-why-a-script-should-be-safe-to-rerun.mp4", durationLabel: "2 min 15 s" }),
      L(4, "error-handling-in-automation-scripts", "Error Handling in Automation Scripts", { contentDir: "ch01/04-error-handling-in-automation-scripts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/error-handling-in-automation-scripts.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 2,
    title: "PowerShell for Azure Automation",
    lessons: [
      L(5, "the-az-powershell-module-in-depth", "The Az PowerShell Module in Depth", { contentDir: "ch02/05-the-az-powershell-module-in-depth", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/the-az-powershell-module-in-depth.mp4", durationLabel: "2 min 26 s" }),
      L(6, "looping-over-azure-resources-with-powershell", "Looping Over Azure Resources with PowerShell", { contentDir: "ch02/06-looping-over-azure-resources-with-powershell", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/looping-over-azure-resources-with-powershell.mp4", durationLabel: "2 min 26 s" }),
      L(7, "powershell-functions-for-reusable-automation", "PowerShell Functions for Reusable Automation", { contentDir: "ch02/07-powershell-functions-for-reusable-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/powershell-functions-for-reusable-automation.mp4", durationLabel: "2 min 13 s" }),
      L(8, "scheduling-powershell-scripts-with-azure-automation", "Scheduling PowerShell Scripts with Azure Automation", { contentDir: "ch02/08-scheduling-powershell-scripts-with-azure-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/scheduling-powershell-scripts-with-azure-automation.mp4", durationLabel: "2 min 43 s" }),
    ],
  },
  {
    n: 3,
    title: "Python for Cloud Automation",
    lessons: [
      L(9, "why-python-for-cloud-automation", "Why Python for Cloud Automation", { contentDir: "ch03/09-why-python-for-cloud-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/why-python-for-cloud-automation.mp4", durationLabel: "2 min 32 s" }),
      L(10, "the-azure-sdk-for-python-and-boto3-for-aws", "The Azure SDK for Python and Boto3 for AWS", { contentDir: "ch03/10-the-azure-sdk-for-python-and-boto3-for-aws", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/the-azure-sdk-for-python-and-boto3-for-aws.mp4", durationLabel: "2 min 39 s" }),
      L(11, "authenticating-python-scripts-to-azure-and-aws", "Authenticating Python Scripts to Azure and AWS", { contentDir: "ch03/11-authenticating-python-scripts-to-azure-and-aws", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/authenticating-python-scripts-to-azure-and-aws.mp4", durationLabel: "2 min 27 s" }),
      L(12, "a-real-python-script-to-provision-a-resource", "A Real Python Script to Provision a Resource", { contentDir: "ch03/12-a-real-python-script-to-provision-a-resource", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/a-real-python-script-to-provision-a-resource.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 4,
    title: "Multi-Cloud CLI Scripting",
    lessons: [
      L(13, "writing-a-bash-script-with-the-az-cli", "Writing a Bash Script with the az CLI", { contentDir: "ch04/13-writing-a-bash-script-with-the-az-cli", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/writing-a-bash-script-with-the-az-cli.mp4", durationLabel: "2 min 11 s" }),
      L(14, "writing-a-bash-script-with-the-aws-cli", "Writing a Bash Script with the AWS CLI", { contentDir: "ch04/14-writing-a-bash-script-with-the-aws-cli", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/writing-a-bash-script-with-the-aws-cli.mp4", durationLabel: "2 min 35 s" }),
      L(15, "parsing-cli-json-output-with-jq", "Parsing CLI JSON Output with jq", { contentDir: "ch04/15-parsing-cli-json-output-with-jq", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/parsing-cli-json-output-with-jq.mp4", durationLabel: "2 min 20 s" }),
      L(16, "a-script-that-reconciles-resources-across-both-clouds", "A Script That Reconciles Resources Across Both Clouds", { contentDir: "ch04/16-a-script-that-reconciles-resources-across-both-clouds", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/a-script-that-reconciles-resources-across-both-clouds.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
  {
    n: 5,
    title: "Infrastructure as Code Previews",
    lessons: [
      L(17, "what-ground-truth-infrastructure-as-code-solves", "What \"Ground Truth\" Infrastructure as Code Solves", { contentDir: "ch05/17-what-ground-truth-infrastructure-as-code-solves", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/what-ground-truth-infrastructure-as-code-solves.mp4", durationLabel: "2 min 23 s" }),
      L(18, "arm-templates-and-bicep-a-first-look", "ARM Templates and Bicep: A First Look", { contentDir: "ch05/18-arm-templates-and-bicep-a-first-look", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/arm-templates-and-bicep-a-first-look.mp4", durationLabel: "2 min 22 s" }),
      L(19, "aws-cloudformation-a-first-look", "AWS CloudFormation: A First Look", { contentDir: "ch05/19-aws-cloudformation-a-first-look", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/aws-cloudformation-a-first-look.mp4", durationLabel: "2 min 27 s" }),
      L(20, "why-this-path-goes-deeper-on-terraform-next", "Why This Path Goes Deeper on Terraform Next", { contentDir: "ch05/20-why-this-path-goes-deeper-on-terraform-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/why-this-path-goes-deeper-on-terraform-next.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 6,
    title: "Automating Operational Tasks",
    lessons: [
      L(21, "automating-vm-start-stop-schedules-for-cost-savings", "Automating VM Start/Stop Schedules for Cost Savings", { contentDir: "ch06/21-automating-vm-start-stop-schedules-for-cost-savings", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/automating-vm-start-stop-schedules-for-cost-savings.mp4", durationLabel: "2 min 28 s" }),
      L(22, "automating-tag-compliance-checks", "Automating Tag Compliance Checks", { contentDir: "ch06/22-automating-tag-compliance-checks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/automating-tag-compliance-checks.mp4", durationLabel: "2 min 20 s" }),
      L(23, "automating-backup-verification", "Automating Backup Verification", { contentDir: "ch06/23-automating-backup-verification", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/automating-backup-verification.mp4", durationLabel: "2 min 12 s" }),
      L(24, "automating-a-simple-incident-response-action", "Automating a Simple Incident Response Action", { contentDir: "ch06/24-automating-a-simple-incident-response-action", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/automating-a-simple-incident-response-action.mp4", durationLabel: "2 min 33 s" }),
    ],
  },
  {
    n: 7,
    title: "CI/CD for Infrastructure Scripts",
    lessons: [
      L(25, "why-automation-scripts-belong-in-source-control", "Why Automation Scripts Belong in Source Control", { contentDir: "ch07/25-why-automation-scripts-belong-in-source-control", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/why-automation-scripts-belong-in-source-control.mp4", durationLabel: "2 min 4 s" }),
      L(26, "running-a-script-from-a-pipeline-not-a-laptop", "Running a Script from a Pipeline, Not a Laptop", { contentDir: "ch07/26-running-a-script-from-a-pipeline-not-a-laptop", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/running-a-script-from-a-pipeline-not-a-laptop.mp4", durationLabel: "2 min 18 s" }),
      L(27, "secrets-in-pipelines-not-hardcoded-not-in-logs", "Secrets in Pipelines: Not Hardcoded, Not in Logs", { contentDir: "ch07/27-secrets-in-pipelines-not-hardcoded-not-in-logs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/secrets-in-pipelines-not-hardcoded-not-in-logs.mp4", durationLabel: "2 min 24 s" }),
      L(28, "a-real-pipeline-that-runs-a-provisioning-script", "A Real Pipeline That Runs a Provisioning Script", { contentDir: "ch07/28-a-real-pipeline-that-runs-a-provisioning-script", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/a-real-pipeline-that-runs-a-provisioning-script.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: An Automated Operations Toolkit",
    lessons: [
      L(29, "lab-building-a-cost-savings-automation-script", "Lab: Building a Cost-Savings Automation Script", { contentDir: "ch08/29-lab-building-a-cost-savings-automation-script", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/lab-building-a-cost-savings-automation-script.mp4", durationLabel: "2 min 23 s" }),
      L(30, "lab-building-a-compliance-checking-script", "Lab: Building a Compliance-Checking Script", { contentDir: "ch08/30-lab-building-a-compliance-checking-script", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/lab-building-a-compliance-checking-script.mp4", durationLabel: "2 min 21 s" }),
      L(31, "case-study-a-script-that-prevented-an-outage", "Case Study: A Script That Prevented an Outage", { contentDir: "ch08/31-case-study-a-script-that-prevented-an-outage", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/case-study-a-script-that-prevented-an-outage.mp4", durationLabel: "2 min 29 s" }),
      L(32, "chapter-capstone-infrastructure-automation-review", "Chapter Capstone: Infrastructure Automation Review", { contentDir: "ch08/32-chapter-capstone-infrastructure-automation-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-python-powershell-infrastructure-automation/chapter-capstone-infrastructure-automation-review.mp4", durationLabel: "2 min 51 s" }),
    ],
  },
];
