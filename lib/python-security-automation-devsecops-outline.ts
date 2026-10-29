// Python Security Automation, SOAR & DevSecOps course outline. Lessons without a contentDir
// render as "in production". Course 10 of the Cybersecurity Analyst → Security Engineer path —
// the third course of the Advanced Specialization stage: scripting real security automation and
// folding security into the DevOps pipeline, building on the SIEM/Sentinel and cloud security
// courses already taught rather than re-explaining what Python or a SIEM is.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/python-security-automation-devsecops/
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

export const PYTHON_SECURITY_AUTOMATION_DEVSECOPS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Python for Security Automation Fundamentals",
    lessons: [
      L(1, "why-security-teams-automate-and-what-not-to-automate", "Why Security Teams Automate, and What Not to Automate", { contentDir: "ch01/01-why-security-teams-automate-and-what-not-to-automate" }),
      L(2, "parsing-logs-and-security-data-with-python", "Parsing Logs and Security Data with Python", { contentDir: "ch01/02-parsing-logs-and-security-data-with-python" }),
      L(3, "working-with-stix-taxii-and-common-threat-data-formats", "Working with STIX, TAXII, and Common Threat Data Formats", { contentDir: "ch01/03-working-with-stix-taxii-and-common-threat-data-formats" }),
      L(4, "calling-rest-apis-authentication-pagination-and-rate-limits", "Calling REST APIs: Authentication, Pagination, and Rate Limits", { contentDir: "ch01/04-calling-rest-apis-authentication-pagination-and-rate-limits" }),
    ],
  },
  {
    n: 2,
    title: "Automating with Security APIs",
    lessons: [
      L(5, "microsoft-graph-security-api-fundamentals", "Microsoft Graph Security API Fundamentals", { contentDir: "ch02/05-microsoft-graph-security-api-fundamentals" }),
      L(6, "scripting-against-microsoft-sentinel-with-python", "Scripting Against Microsoft Sentinel with Python", { contentDir: "ch02/06-scripting-against-microsoft-sentinel-with-python" }),
      L(7, "scripting-against-aws-security-hub-and-guardduty-with-python", "Scripting Against AWS Security Hub and GuardDuty with Python", { contentDir: "ch02/07-scripting-against-aws-security-hub-and-guardduty-with-python" }),
      L(8, "a-python-script-that-correlates-findings-across-both-clouds", "A Python Script That Correlates Findings Across Both Clouds", { contentDir: "ch02/08-a-python-script-that-correlates-findings-across-both-clouds" }),
    ],
  },
  {
    n: 3,
    title: "Building SOAR Playbooks",
    lessons: [
      L(9, "what-soar-actually-automates-and-what-it-doesnt", "What SOAR Actually Automates, and What It Doesn't", { contentDir: "ch03/09-what-soar-actually-automates-and-what-it-doesnt" }),
      L(10, "building-a-sentinel-automation-rule-and-logic-app-playbook", "Building a Sentinel Automation Rule and Logic App Playbook", { contentDir: "ch03/10-building-a-sentinel-automation-rule-and-logic-app-playbook" }),
      L(11, "automated-enrichment-adding-context-before-a-human-looks", "Automated Enrichment: Adding Context Before a Human Looks", { contentDir: "ch03/11-automated-enrichment-adding-context-before-a-human-looks" }),
      L(12, "automated-containment-actions-and-the-approval-gate-they-need", "Automated Containment Actions, and the Approval Gate They Need", { contentDir: "ch03/12-automated-containment-actions-and-the-approval-gate-they-need" }),
    ],
  },
  {
    n: 4,
    title: "Threat Intelligence Automation",
    lessons: [
      L(13, "pulling-and-normalizing-ioc-feeds-in-python", "Pulling and Normalizing IOC Feeds in Python", { contentDir: "ch04/13-pulling-and-normalizing-ioc-feeds-in-python" }),
      L(14, "automating-ioc-lookups-against-a-siem", "Automating IOC Lookups Against a SIEM", { contentDir: "ch04/14-automating-ioc-lookups-against-a-siem" }),
      L(15, "scoring-and-prioritizing-threat-intel-so-it-doesnt-become-noise", "Scoring and Prioritizing Threat Intel So It Doesn't Become Noise", { contentDir: "ch04/15-scoring-and-prioritizing-threat-intel-so-it-doesnt-become-noise" }),
      L(16, "feeding-enriched-intel-back-into-detection-rules", "Feeding Enriched Intel Back into Detection Rules", { contentDir: "ch04/16-feeding-enriched-intel-back-into-detection-rules" }),
    ],
  },
  {
    n: 5,
    title: "Security Orchestration Across Tools",
    lessons: [
      L(17, "webhook-driven-automation-between-security-tools", "Webhook-Driven Automation Between Security Tools", { contentDir: "ch05/17-webhook-driven-automation-between-security-tools" }),
      L(18, "automating-ticket-creation-and-updates-from-an-alert", "Automating Ticket Creation and Updates from an Alert", { contentDir: "ch05/18-automating-ticket-creation-and-updates-from-an-alert" }),
      L(19, "chatops-sending-alerts-and-approvals-to-teams-or-slack", "ChatOps: Sending Alerts and Approvals to Teams or Slack", { contentDir: "ch05/19-chatops-sending-alerts-and-approvals-to-teams-or-slack" }),
      L(20, "error-handling-and-idempotency-in-security-automation-scripts", "Error Handling and Idempotency in Security Automation Scripts", { contentDir: "ch05/20-error-handling-and-idempotency-in-security-automation-scripts" }),
    ],
  },
  {
    n: 6,
    title: "DevSecOps Fundamentals",
    lessons: [
      L(21, "shifting-left-why-security-moves-earlier-in-the-pipeline", "Shifting Left: Why Security Moves Earlier in the Pipeline", { contentDir: "ch06/21-shifting-left-why-security-moves-earlier-in-the-pipeline" }),
      L(22, "sast-and-dependency-scanning-in-a-build-pipeline", "SAST and Dependency Scanning in a Build Pipeline", { contentDir: "ch06/22-sast-and-dependency-scanning-in-a-build-pipeline" }),
      L(23, "dast-and-container-image-scanning-before-deployment", "DAST and Container Image Scanning Before Deployment", { contentDir: "ch06/23-dast-and-container-image-scanning-before-deployment" }),
      L(24, "setting-security-gates-that-fail-a-build-without-slowing-every-build", "Setting Security Gates That Fail a Build Without Slowing Every Build", { contentDir: "ch06/24-setting-security-gates-that-fail-a-build-without-slowing-every-build" }),
    ],
  },
  {
    n: 7,
    title: "Securing the Pipeline Itself",
    lessons: [
      L(25, "secrets-scanning-and-preventing-leaked-credentials-in-commits", "Secrets Scanning and Preventing Leaked Credentials in Commits", { contentDir: "ch07/25-secrets-scanning-and-preventing-leaked-credentials-in-commits" }),
      L(26, "least-privilege-for-ci-cd-service-accounts-and-runners", "Least Privilege for CI/CD Service Accounts and Runners", { contentDir: "ch07/26-least-privilege-for-ci-cd-service-accounts-and-runners" }),
      L(27, "software-bill-of-materials-sbom-and-supply-chain-basics", "Software Bill of Materials (SBOM) and Supply Chain Basics", { contentDir: "ch07/27-software-bill-of-materials-sbom-and-supply-chain-basics" }),
      L(28, "a-pipeline-security-checklist-before-it-ships-to-production", "A Pipeline Security Checklist Before It Ships to Production", { contentDir: "ch07/28-a-pipeline-security-checklist-before-it-ships-to-production" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: An Automated Detection-to-Response Pipeline",
    lessons: [
      L(29, "lab-building-an-end-to-end-detection-to-containment-script", "Lab: Building an End-to-End Detection-to-Containment Script", { contentDir: "ch08/29-lab-building-an-end-to-end-detection-to-containment-script" }),
      L(30, "lab-adding-a-security-gate-to-a-real-ci-cd-pipeline", "Lab: Adding a Security Gate to a Real CI/CD Pipeline", { contentDir: "ch08/30-lab-adding-a-security-gate-to-a-real-ci-cd-pipeline" }),
      L(31, "case-study-an-automation-script-that-made-an-incident-worse", "Case Study: An Automation Script That Made an Incident Worse", { contentDir: "ch08/31-case-study-an-automation-script-that-made-an-incident-worse" }),
      L(32, "chapter-capstone-security-automation-and-devsecops-review", "Chapter Capstone: Security Automation and DevSecOps Review", { contentDir: "ch08/32-chapter-capstone-security-automation-and-devsecops-review" }),
    ],
  },
];
