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
      L(1, "dbatools-deep-dive", "dbatools, Deep Dive", {
        contentDir: "ch01/01-dbatools-deep-dive",
        // videoUrl/durationLabel pending
      }),
      L(2, "powershell-remoting-for-sql-server", "PowerShell Remoting for SQL Server", {
        contentDir: "ch01/02-powershell-remoting-for-sql-server",
      }),
      L(3, "working-with-sql-server-via-smo", "Working With SQL Server via SMO", {
        contentDir: "ch01/03-working-with-sql-server-via-smo",
      }),
      L(4, "scripting-patterns-for-dba-work", "Scripting Patterns for DBA Work", {
        contentDir: "ch01/04-scripting-patterns-for-dba-work",
      }),
      L(5, "error-handling-in-dba-scripts", "Error Handling in DBA Scripts", {
        contentDir: "ch01/05-error-handling-in-dba-scripts",
      }),
    ],
  },
  {
    n: 2,
    title: "Automating Routine DBA Tasks",
    lessons: [
      L(6, "automating-backups-with-powershell", "Automating Backups With PowerShell", {
        contentDir: "ch02/06-automating-backups-with-powershell",
      }),
      L(7, "automating-health-checks", "Automating Health Checks", {
        contentDir: "ch02/07-automating-health-checks",
      }),
      L(8, "automating-index-and-statistics-maintenance", "Automating Index & Statistics Maintenance", {
        contentDir: "ch02/08-automating-index-and-statistics-maintenance",
      }),
      L(9, "automating-security-audits", "Automating Security Audits", {
        contentDir: "ch02/09-automating-security-audits",
      }),
      L(10, "scheduling-powershell-scripts", "Scheduling PowerShell Scripts", {
        contentDir: "ch02/10-scheduling-powershell-scripts",
      }),
      L(11, "error-handling-in-automation", "Error Handling in Automation", {
        contentDir: "ch02/11-error-handling-in-automation",
      }),
    ],
  },
  {
    n: 3,
    title: "Source Control for Database Objects",
    lessons: [
      L(12, "why-version-control-for-databases", "Why Version Control for Databases", {
        contentDir: "ch03/12-why-version-control-for-databases",
      }),
      L(13, "database-projects-and-schema-comparison", "Database Projects & Schema Comparison Tools", {
        contentDir: "ch03/13-database-projects-and-schema-comparison",
      }),
      L(14, "versioning-stored-procedures-and-views", "Versioning Stored Procedures & Views", {
        contentDir: "ch03/14-versioning-stored-procedures-and-views",
      }),
      L(15, "branching-strategies-for-database-code", "Branching Strategies for Database Code", {
        contentDir: "ch03/15-branching-strategies-for-database-code",
      }),
      L(16, "code-review-for-database-changes", "Code Review for Database Changes", {
        contentDir: "ch03/16-code-review-for-database-changes",
      }),
    ],
  },
  {
    n: 4,
    title: "CI/CD for Databases",
    lessons: [
      L(17, "ci-cd-concepts-for-databases", "CI/CD Concepts for Databases", {
        contentDir: "ch04/17-ci-cd-concepts-for-databases",
      }),
      L(18, "automated-deployment-of-database-changes", "Automated Deployment of Database Changes", {
        contentDir: "ch04/18-automated-deployment-of-database-changes",
      }),
      L(19, "database-migrations-as-code", "Database Migrations as Code", {
        contentDir: "ch04/19-database-migrations-as-code",
      }),
      L(20, "testing-database-changes-in-a-pipeline", "Testing Database Changes in a Pipeline", {
        contentDir: "ch04/20-testing-database-changes-in-a-pipeline",
      }),
      L(21, "rollback-strategies-for-database-deployments", "Rollback Strategies for Database Deployments", {
        contentDir: "ch04/21-rollback-strategies-for-database-deployments",
      }),
      L(22, "a-real-pipeline-walkthrough", "A Real Pipeline Walkthrough", {
        contentDir: "ch04/22-a-real-pipeline-walkthrough",
      }),
    ],
  },
  {
    n: 5,
    title: "Infrastructure as Code for DBAs",
    lessons: [
      L(23, "iac-concepts-for-dbas", "IaC Concepts, Revisited for DBAs", {
        contentDir: "ch05/23-iac-concepts-for-dbas",
      }),
      L(24, "provisioning-sql-server-with-iac", "Provisioning SQL Server With IaC", {
        contentDir: "ch05/24-provisioning-sql-server-with-iac",
      }),
      L(25, "configuration-as-code", "Configuration as Code", {
        contentDir: "ch05/25-configuration-as-code",
      }),
      L(26, "environment-consistency", "Environment Consistency", {
        contentDir: "ch05/26-environment-consistency",
      }),
      L(27, "iac-plus-powershell-together", "IaC + PowerShell Together", {
        contentDir: "ch05/27-iac-plus-powershell-together",
      }),
    ],
  },
  {
    n: 6,
    title: "Monitoring & Alerting Automation",
    lessons: [
      L(28, "building-automated-alerting", "Building Automated Alerting", {
        contentDir: "ch06/28-building-automated-alerting",
      }),
      L(29, "integrating-with-teams-slack-email", "Integrating With Teams, Slack & Email", {
        contentDir: "ch06/29-integrating-with-teams-slack-email",
      }),
      L(30, "custom-monitoring-dashboards-from-scripts", "Custom Monitoring Dashboards From Scripts", {
        contentDir: "ch06/30-custom-monitoring-dashboards-from-scripts",
      }),
      L(31, "automated-incident-creation", "Automated Incident Creation", {
        contentDir: "ch06/31-automated-incident-creation",
      }),
      L(32, "reducing-alert-fatigue-through-automation", "Reducing Alert Fatigue Through Automation", {
        contentDir: "ch06/32-reducing-alert-fatigue-through-automation",
      }),
    ],
  },
  {
    n: 7,
    title: "DevOps Culture for DBAs",
    lessons: [
      L(33, "what-devops-changes-for-a-dba", "What DevOps Actually Changes for a DBA", {
        contentDir: "ch07/33-what-devops-changes-for-a-dba",
      }),
      L(34, "working-with-development-teams", "Working With Development Teams", {
        contentDir: "ch07/34-working-with-development-teams",
      }),
      L(35, "shift-left-database-practices", "Shift-Left Database Practices", {
        contentDir: "ch07/35-shift-left-database-practices",
      }),
      L(36, "blameless-postmortems-for-database-incidents", "Blameless Postmortems for Database Incidents", {
        contentDir: "ch07/36-blameless-postmortems-for-database-incidents",
      }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(37, "capstone-kickoff", "Capstone Kickoff: Automate a DBA's Entire Routine", {
        contentDir: "ch08/37-capstone-kickoff",
      }),
      L(38, "capstone-build-the-automation-suite", "Capstone: Build the Automation Suite", {
        contentDir: "ch08/38-capstone-build-the-automation-suite",
      }),
      L(39, "capstone-add-ci-cd", "Capstone: Add CI/CD for a Database Change", {
        contentDir: "ch08/39-capstone-add-ci-cd",
      }),
      L(40, "capstone-add-monitoring-and-alerting", "Capstone: Add Monitoring & Alerting", {
        contentDir: "ch08/40-capstone-add-monitoring-and-alerting",
      }),
      L(41, "capstone-present-the-devops-toolkit", "Capstone: Present the DevOps Toolkit", {
        contentDir: "ch08/41-capstone-present-the-devops-toolkit",
      }),
      L(42, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch08/42-capstone-wrap-up",
      }),
    ],
  },
];
