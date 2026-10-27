// Advanced-tier capstone for the Azure Database Engineer path. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/azure-dba-capstone-advanced/
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

export const AZURE_DBA_CAPSTONE_ADVANCED_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Scoping the Production-Grade Platform",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: A Board-Level HA/DR and Compliance Mandate", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/the-business-ask.mp4", durationLabel: "1 min 32 s" }),
      L(2, "planning-the-architecture", "Planning the Architecture", { contentDir: "ch01/02-planning-the-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/planning-the-architecture.mp4", durationLabel: "1 min 9 s" }),
    ],
  },
  {
    n: 2,
    title: "Provisioning With Bicep",
    lessons: [
      L(3, "iac-fundamentals-for-this-project", "IaC Fundamentals for This Project", { contentDir: "ch02/03-iac-fundamentals-for-this-project", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/iac-fundamentals-for-this-project.mp4", durationLabel: "1 min 18 s" }),
      L(4, "writing-the-bicep-template", "Writing the Bicep Template for Azure SQL", { contentDir: "ch02/04-writing-the-bicep-template", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/writing-the-bicep-template.mp4", durationLabel: "1 min 18 s" }),
      L(5, "parameterizing-for-dev-and-prod", "Parameterizing for Dev and Prod", { contentDir: "ch02/05-parameterizing-for-dev-and-prod", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/parameterizing-for-dev-and-prod.mp4", durationLabel: "1 min 10 s" }),
      L(6, "deploying-with-bicep", "Deploying With Bicep", { contentDir: "ch02/06-deploying-with-bicep", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/deploying-with-bicep.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 3,
    title: "Security & Compliance",
    lessons: [
      L(7, "encryption-at-rest-with-tde", "Encryption at Rest With Transparent Data Encryption", { contentDir: "ch03/07-encryption-at-rest-with-tde", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/encryption-at-rest-with-tde.mp4", durationLabel: "1 min 25 s" }),
      L(8, "column-level-encryption-for-phi", "Column-Level Encryption for Patient Data", { contentDir: "ch03/08-column-level-encryption-for-phi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/column-level-encryption-for-phi.mp4", durationLabel: "1 min 27 s" }),
      L(9, "setting-up-auditing", "Setting Up Auditing", { contentDir: "ch03/09-setting-up-auditing", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/setting-up-auditing.mp4", durationLabel: "1 min 10 s" }),
      L(10, "least-privilege-rbac", "Least-Privilege RBAC", { contentDir: "ch03/10-least-privilege-rbac", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/least-privilege-rbac.mp4", durationLabel: "1 min 12 s" }),
    ],
  },
  {
    n: 4,
    title: "High Availability & Disaster Recovery",
    lessons: [
      L(11, "planning-rpo-and-rto", "Planning RPO and RTO", { contentDir: "ch04/11-planning-rpo-and-rto", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/planning-rpo-and-rto.mp4", durationLabel: "1 min 14 s" }),
      L(12, "setting-up-a-failover-group", "Setting Up a Failover Group", { contentDir: "ch04/12-setting-up-a-failover-group", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/setting-up-a-failover-group.mp4", durationLabel: "1 min 18 s" }),
      L(13, "testing-a-failover", "Testing a Failover", { contentDir: "ch04/13-testing-a-failover", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/testing-a-failover.mp4", durationLabel: "1 min 14 s" }),
      L(14, "geo-replication-considerations", "Geo-Replication Considerations", { contentDir: "ch04/14-geo-replication-considerations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/geo-replication-considerations.mp4", durationLabel: "1 min 23 s" }),
      L(15, "writing-the-dr-runbook", "Writing the DR Runbook", { contentDir: "ch04/15-writing-the-dr-runbook", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/writing-the-dr-runbook.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
  {
    n: 5,
    title: "Automation With PowerShell",
    lessons: [
      L(16, "dbatools-basics", "dbatools Basics", { contentDir: "ch05/16-dbatools-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/dbatools-basics.mp4", durationLabel: "1 min 17 s" }),
      L(17, "scripting-a-health-check", "Scripting a Health Check", { contentDir: "ch05/17-scripting-a-health-check", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/scripting-a-health-check.mp4", durationLabel: "1 min 11 s" }),
      L(18, "scripting-backup-automation", "Scripting Backup Automation", { contentDir: "ch05/18-scripting-backup-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/scripting-backup-automation.mp4", durationLabel: "1 min 10 s" }),
      L(19, "setting-up-alerting", "Setting Up Alerting", { contentDir: "ch05/19-setting-up-alerting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/setting-up-alerting.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 6,
    title: "The ETL Layer With Data Factory",
    lessons: [
      L(20, "why-this-database-needs-data-factory", "Why This Database Needs Data Factory", { contentDir: "ch06/20-why-this-database-needs-data-factory", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/why-this-database-needs-data-factory.mp4", durationLabel: "1 min 15 s" }),
      L(21, "building-the-pipeline", "Building the Pipeline", { contentDir: "ch06/21-building-the-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/building-the-pipeline.mp4", durationLabel: "1 min 11 s" }),
      L(22, "monitoring-the-pipeline", "Monitoring the Pipeline", { contentDir: "ch06/22-monitoring-the-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/monitoring-the-pipeline.mp4", durationLabel: "1 min 14 s" }),
    ],
  },
  {
    n: 7,
    title: "The Incident, Presenting, and Wrap-Up",
    lessons: [
      L(23, "the-dr-drill", "The DR Drill: A Real Failover Under Pressure", { contentDir: "ch07/23-the-dr-drill", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/the-dr-drill.mp4", durationLabel: "1 min 15 s" }),
      L(24, "validating-rpo-and-rto-were-met", "Validating RPO and RTO Were Met", { contentDir: "ch07/24-validating-rpo-and-rto-were-met", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/validating-rpo-and-rto-were-met.mp4", durationLabel: "1 min 8 s" }),
      L(25, "presenting-the-platform", "Presenting the Platform", { contentDir: "ch07/25-presenting-the-platform", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/presenting-the-platform.mp4", durationLabel: "1 min 12 s" }),
      L(26, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch07/26-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-azure-dba-capstone-advanced/wrap-up-and-whats-next.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
];
