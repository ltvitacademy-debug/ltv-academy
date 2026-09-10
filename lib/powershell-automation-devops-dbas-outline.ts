// The full PowerShell, Automation & DevOps for DBAs course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Distinct from the generic PowerShell
// Fundamentals course — this one assumes basic PowerShell and goes straight
// into dbatools, CI/CD for databases, infrastructure as code, and DevOps
// practice, all aimed specifically at DBA work.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/powershell-automation-devops-dbas/
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

export const POWERSHELL_AUTOMATION_DEVOPS_DBAS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "PowerShell for DBAs, Beyond the Basics",
    lessons: [
      L(1, "dbatools-deep-dive", "dbatools, Deep Dive"),
      L(2, "powershell-remoting-for-sql-server", "PowerShell Remoting for SQL Server"),
      L(3, "working-with-sql-server-via-smo", "Working With SQL Server via SMO"),
      L(4, "scripting-patterns-for-dba-work", "Scripting Patterns for DBA Work"),
      L(5, "error-handling-in-dba-scripts", "Error Handling in DBA Scripts"),
    ],
  },
  {
    n: 2,
    title: "Automating Routine DBA Tasks",
    lessons: [
      L(6, "automating-backups-with-powershell", "Automating Backups With PowerShell"),
      L(7, "automating-health-checks", "Automating Health Checks"),
      L(8, "automating-index-and-statistics-maintenance", "Automating Index & Statistics Maintenance"),
      L(9, "automating-security-audits", "Automating Security Audits"),
      L(10, "scheduling-powershell-scripts", "Scheduling PowerShell Scripts"),
      L(11, "error-handling-in-automation", "Error Handling in Automation"),
    ],
  },
  {
    n: 3,
    title: "Source Control for Database Objects",
    lessons: [
      L(12, "why-version-control-for-databases", "Why Version Control for Databases"),
      L(13, "database-projects-and-schema-comparison", "Database Projects & Schema Comparison Tools"),
      L(14, "versioning-stored-procedures-and-views", "Versioning Stored Procedures & Views"),
      L(15, "branching-strategies-for-database-code", "Branching Strategies for Database Code"),
      L(16, "code-review-for-database-changes", "Code Review for Database Changes"),
    ],
  },
  {
    n: 4,
    title: "CI/CD for Databases",
    lessons: [
      L(17, "ci-cd-concepts-for-databases", "CI/CD Concepts for Databases"),
      L(18, "automated-deployment-of-database-changes", "Automated Deployment of Database Changes"),
      L(19, "database-migrations-as-code", "Database Migrations as Code"),
      L(20, "testing-database-changes-in-a-pipeline", "Testing Database Changes in a Pipeline"),
      L(21, "rollback-strategies-for-database-deployments", "Rollback Strategies for Database Deployments"),
      L(22, "a-real-pipeline-walkthrough", "A Real Pipeline Walkthrough"),
    ],
  },
  {
    n: 5,
    title: "Infrastructure as Code for DBAs",
    lessons: [
      L(23, "iac-concepts-for-dbas", "IaC Concepts, Revisited for DBAs"),
      L(24, "provisioning-sql-server-with-iac", "Provisioning SQL Server With IaC"),
      L(25, "configuration-as-code", "Configuration as Code"),
      L(26, "environment-consistency", "Environment Consistency"),
      L(27, "iac-plus-powershell-together", "IaC + PowerShell Together"),
    ],
  },
  {
    n: 6,
    title: "Monitoring & Alerting Automation",
    lessons: [
      L(28, "building-automated-alerting", "Building Automated Alerting"),
      L(29, "integrating-with-teams-slack-email", "Integrating With Teams, Slack & Email"),
      L(30, "custom-monitoring-dashboards-from-scripts", "Custom Monitoring Dashboards From Scripts"),
      L(31, "automated-incident-creation", "Automated Incident Creation"),
      L(32, "reducing-alert-fatigue-through-automation", "Reducing Alert Fatigue Through Automation"),
    ],
  },
  {
    n: 7,
    title: "DevOps Culture for DBAs",
    lessons: [
      L(33, "what-devops-changes-for-a-dba", "What DevOps Actually Changes for a DBA"),
      L(34, "working-with-development-teams", "Working With Development Teams"),
      L(35, "shift-left-database-practices", "Shift-Left Database Practices"),
      L(36, "blameless-postmortems-for-database-incidents", "Blameless Postmortems for Database Incidents"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(37, "capstone-kickoff", "Capstone Kickoff: Automate a DBA's Entire Routine"),
      L(38, "capstone-build-the-automation-suite", "Capstone: Build the Automation Suite"),
      L(39, "capstone-add-ci-cd", "Capstone: Add CI/CD for a Database Change"),
      L(40, "capstone-add-monitoring-and-alerting", "Capstone: Add Monitoring & Alerting"),
      L(41, "capstone-present-the-devops-toolkit", "Capstone: Present the DevOps Toolkit"),
      L(42, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
