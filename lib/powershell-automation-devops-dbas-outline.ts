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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792505884/ltv-powershell-automation-devops-dbas/dbatools-deep-dive.mp4",
        durationLabel: "1 min 12 s",
      }),
      L(2, "powershell-remoting-for-sql-server", "PowerShell Remoting for SQL Server", {
        contentDir: "ch01/02-powershell-remoting-for-sql-server",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506634/ltv-powershell-automation-devops-dbas/powershell-remoting-for-sql-server.mp4",
        durationLabel: "1 min 36 s",
      }),
      L(3, "working-with-sql-server-via-smo", "Working With SQL Server via SMO", {
        contentDir: "ch01/03-working-with-sql-server-via-smo",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507448/ltv-powershell-automation-devops-dbas/working-with-sql-server-via-smo.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(4, "scripting-patterns-for-dba-work", "Scripting Patterns for DBA Work", {
        contentDir: "ch01/04-scripting-patterns-for-dba-work",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508046/ltv-powershell-automation-devops-dbas/scripting-patterns-for-dba-work.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(5, "error-handling-in-dba-scripts", "Error Handling in DBA Scripts", {
        contentDir: "ch01/05-error-handling-in-dba-scripts",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508733/ltv-powershell-automation-devops-dbas/error-handling-in-dba-scripts.mp4",
        durationLabel: "1 min 30 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Automating Routine DBA Tasks",
    lessons: [
      L(6, "automating-backups-with-powershell", "Automating Backups With PowerShell", {
        contentDir: "ch02/06-automating-backups-with-powershell",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509395/ltv-powershell-automation-devops-dbas/automating-backups-with-powershell.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(7, "automating-health-checks", "Automating Health Checks", {
        contentDir: "ch02/07-automating-health-checks",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510061/ltv-powershell-automation-devops-dbas/automating-health-checks.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(8, "automating-index-and-statistics-maintenance", "Automating Index & Statistics Maintenance", {
        contentDir: "ch02/08-automating-index-and-statistics-maintenance",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510735/ltv-powershell-automation-devops-dbas/automating-index-and-statistics-maintenance.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(9, "automating-security-audits", "Automating Security Audits", {
        contentDir: "ch02/09-automating-security-audits",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511407/ltv-powershell-automation-devops-dbas/automating-security-audits.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(10, "scheduling-powershell-scripts", "Scheduling PowerShell Scripts", {
        contentDir: "ch02/10-scheduling-powershell-scripts",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512017/ltv-powershell-automation-devops-dbas/scheduling-powershell-scripts.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(11, "error-handling-in-automation", "Error Handling in Automation", {
        contentDir: "ch02/11-error-handling-in-automation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513945/ltv-powershell-automation-devops-dbas/error-handling-in-automation.mp4",
        durationLabel: "1 min 28 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Source Control for Database Objects",
    lessons: [
      L(12, "why-version-control-for-databases", "Why Version Control for Databases", {
        contentDir: "ch03/12-why-version-control-for-databases",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514643/ltv-powershell-automation-devops-dbas/why-version-control-for-databases.mp4",
        durationLabel: "1 min 30 s",
      }),
      L(13, "database-projects-and-schema-comparison", "Database Projects & Schema Comparison Tools", {
        contentDir: "ch03/13-database-projects-and-schema-comparison",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515285/ltv-powershell-automation-devops-dbas/database-projects-and-schema-comparison.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(14, "versioning-stored-procedures-and-views", "Versioning Stored Procedures & Views", {
        contentDir: "ch03/14-versioning-stored-procedures-and-views",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515978/ltv-powershell-automation-devops-dbas/versioning-stored-procedures-and-views.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(15, "branching-strategies-for-database-code", "Branching Strategies for Database Code", {
        contentDir: "ch03/15-branching-strategies-for-database-code",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516652/ltv-powershell-automation-devops-dbas/branching-strategies-for-database-code.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(16, "code-review-for-database-changes", "Code Review for Database Changes", {
        contentDir: "ch03/16-code-review-for-database-changes",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517345/ltv-powershell-automation-devops-dbas/code-review-for-database-changes.mp4",
        durationLabel: "1 min 28 s",
      }),
    ],
  },
  {
    n: 4,
    title: "CI/CD for Databases",
    lessons: [
      L(17, "ci-cd-concepts-for-databases", "CI/CD Concepts for Databases", {
        contentDir: "ch04/17-ci-cd-concepts-for-databases",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518825/ltv-powershell-automation-devops-dbas/ci-cd-concepts-for-databases.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(18, "automated-deployment-of-database-changes", "Automated Deployment of Database Changes", {
        contentDir: "ch04/18-automated-deployment-of-database-changes",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519508/ltv-powershell-automation-devops-dbas/automated-deployment-of-database-changes.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(19, "database-migrations-as-code", "Database Migrations as Code", {
        contentDir: "ch04/19-database-migrations-as-code",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520118/ltv-powershell-automation-devops-dbas/database-migrations-as-code.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(20, "testing-database-changes-in-a-pipeline", "Testing Database Changes in a Pipeline", {
        contentDir: "ch04/20-testing-database-changes-in-a-pipeline",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520815/ltv-powershell-automation-devops-dbas/testing-database-changes-in-a-pipeline.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(21, "rollback-strategies-for-database-deployments", "Rollback Strategies for Database Deployments", {
        contentDir: "ch04/21-rollback-strategies-for-database-deployments",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521494/ltv-powershell-automation-devops-dbas/rollback-strategies-for-database-deployments.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(22, "a-real-pipeline-walkthrough", "A Real Pipeline Walkthrough", {
        contentDir: "ch04/22-a-real-pipeline-walkthrough",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522209/ltv-powershell-automation-devops-dbas/a-real-pipeline-walkthrough.mp4",
        durationLabel: "1 min 31 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Infrastructure as Code for DBAs",
    lessons: [
      L(23, "iac-concepts-for-dbas", "IaC Concepts, Revisited for DBAs", {
        contentDir: "ch05/23-iac-concepts-for-dbas",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522844/ltv-powershell-automation-devops-dbas/iac-concepts-for-dbas.mp4",
        durationLabel: "1 min 6 s",
      }),
      L(24, "provisioning-sql-server-with-iac", "Provisioning SQL Server With IaC", {
        contentDir: "ch05/24-provisioning-sql-server-with-iac",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523457/ltv-powershell-automation-devops-dbas/provisioning-sql-server-with-iac.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(25, "configuration-as-code", "Configuration as Code", {
        contentDir: "ch05/25-configuration-as-code",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524065/ltv-powershell-automation-devops-dbas/configuration-as-code.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(26, "environment-consistency", "Environment Consistency", {
        contentDir: "ch05/26-environment-consistency",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524737/ltv-powershell-automation-devops-dbas/environment-consistency.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(27, "iac-plus-powershell-together", "IaC + PowerShell Together", {
        contentDir: "ch05/27-iac-plus-powershell-together",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525435/ltv-powershell-automation-devops-dbas/iac-plus-powershell-together.mp4",
        durationLabel: "1 min 20 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Monitoring & Alerting Automation",
    lessons: [
      L(28, "building-automated-alerting", "Building Automated Alerting", {
        contentDir: "ch06/28-building-automated-alerting",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526074/ltv-powershell-automation-devops-dbas/building-automated-alerting.mp4",
        durationLabel: "1 min 4 s",
      }),
      L(29, "integrating-with-teams-slack-email", "Integrating With Teams, Slack & Email", {
        contentDir: "ch06/29-integrating-with-teams-slack-email",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526645/ltv-powershell-automation-devops-dbas/integrating-with-teams-slack-email.mp4",
        durationLabel: "1 min 4 s",
      }),
      L(30, "custom-monitoring-dashboards-from-scripts", "Custom Monitoring Dashboards From Scripts", {
        contentDir: "ch06/30-custom-monitoring-dashboards-from-scripts",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527118/ltv-powershell-automation-devops-dbas/custom-monitoring-dashboards-from-scripts.mp4",
        durationLabel: "56 s",
      }),
      L(31, "automated-incident-creation", "Automated Incident Creation", {
        contentDir: "ch06/31-automated-incident-creation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527850/ltv-powershell-automation-devops-dbas/automated-incident-creation.mp4",
        durationLabel: "1 min 7 s",
      }),
      L(32, "reducing-alert-fatigue-through-automation", "Reducing Alert Fatigue Through Automation", {
        contentDir: "ch06/32-reducing-alert-fatigue-through-automation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528509/ltv-powershell-automation-devops-dbas/reducing-alert-fatigue-through-automation.mp4",
        durationLabel: "1 min 13 s",
      }),
    ],
  },
  {
    n: 7,
    title: "DevOps Culture for DBAs",
    lessons: [
      L(33, "what-devops-changes-for-a-dba", "What DevOps Actually Changes for a DBA", {
        contentDir: "ch07/33-what-devops-changes-for-a-dba",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529502/ltv-powershell-automation-devops-dbas/what-devops-changes-for-a-dba.mp4",
        durationLabel: "1 min 36 s",
      }),
      L(34, "working-with-development-teams", "Working With Development Teams", {
        contentDir: "ch07/34-working-with-development-teams",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530341/ltv-powershell-automation-devops-dbas/working-with-development-teams.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(35, "shift-left-database-practices", "Shift-Left Database Practices", {
        contentDir: "ch07/35-shift-left-database-practices",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531098/ltv-powershell-automation-devops-dbas/shift-left-database-practices.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(36, "blameless-postmortems-for-database-incidents", "Blameless Postmortems for Database Incidents", {
        contentDir: "ch07/36-blameless-postmortems-for-database-incidents",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532075/ltv-powershell-automation-devops-dbas/blameless-postmortems-for-database-incidents.mp4",
        durationLabel: "1 min 41 s",
      }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(37, "capstone-kickoff", "Capstone Kickoff: Automate a DBA's Entire Routine", {
        contentDir: "ch08/37-capstone-kickoff",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600143/ltv-powershell-automation-devops-dbas/capstone-kickoff.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(38, "capstone-build-the-automation-suite", "Capstone: Build the Automation Suite", {
        contentDir: "ch08/38-capstone-build-the-automation-suite",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600675/ltv-powershell-automation-devops-dbas/capstone-build-the-automation-suite.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(39, "capstone-add-ci-cd", "Capstone: Add CI/CD for a Database Change", {
        contentDir: "ch08/39-capstone-add-ci-cd",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601132/ltv-powershell-automation-devops-dbas/capstone-add-ci-cd.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(40, "capstone-add-monitoring-and-alerting", "Capstone: Add Monitoring & Alerting", {
        contentDir: "ch08/40-capstone-add-monitoring-and-alerting",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601657/ltv-powershell-automation-devops-dbas/capstone-add-monitoring-and-alerting.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(41, "capstone-present-the-devops-toolkit", "Capstone: Present the DevOps Toolkit", {
        contentDir: "ch08/41-capstone-present-the-devops-toolkit",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602126/ltv-powershell-automation-devops-dbas/capstone-present-the-devops-toolkit.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(42, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch08/42-capstone-wrap-up",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602610/ltv-powershell-automation-devops-dbas/capstone-wrap-up.mp4",
        durationLabel: "1 min 37 s",
      }),
    ],
  },
];
