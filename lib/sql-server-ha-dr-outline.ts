// The full SQL Server HA, Backup & Disaster Recovery course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Goes deeper than the HA/DR and Backup
// sections inside Azure Database Administrator, and covers on-prem HA
// technologies (Availability Groups, FCI, log shipping, replication) that
// a cloud-only course only touches at a high level.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/sql-server-ha-dr/
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

export const SQL_SERVER_HA_DR_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Backup Fundamentals, Deep Dive",
    lessons: [
      L(1, "recovery-models-in-depth", "Recovery Models, in Depth", {
        contentDir: "ch01/01-recovery-models-in-depth",
        // videoUrl/durationLabel pending
      }),
      L(2, "backup-strategy-design", "Full/Differential/Log Backup Strategy Design", {
        contentDir: "ch01/02-backup-strategy-design",
      }),
      L(3, "backup-compression-and-encryption", "Backup Compression & Encryption", {
        contentDir: "ch01/03-backup-compression-and-encryption",
      }),
      L(4, "backup-to-multiple-locations", "Backup to Multiple Locations", {
        contentDir: "ch01/04-backup-to-multiple-locations",
      }),
      L(5, "backup-verification", "Backup Verification", {
        contentDir: "ch01/05-backup-verification",
      }),
      L(6, "backup-automation-strategy", "Backup Automation Strategy", {
        contentDir: "ch01/06-backup-automation-strategy",
      }),
    ],
  },
  {
    n: 2,
    title: "Restore Scenarios",
    lessons: [
      L(7, "full-restore", "Full Restore", {
        contentDir: "ch02/07-full-restore",
      }),
      L(8, "differential-restore", "Differential Restore", {
        contentDir: "ch02/08-differential-restore",
      }),
      L(9, "point-in-time-restore", "Point-in-Time Restore", {
        contentDir: "ch02/09-point-in-time-restore",
      }),
      L(10, "restoring-to-a-new-server", "Restoring to a New Server", {
        contentDir: "ch02/10-restoring-to-a-new-server",
      }),
      L(11, "tail-log-backups", "Tail-Log Backups", {
        contentDir: "ch02/11-tail-log-backups",
      }),
      L(12, "restore-troubleshooting", "Restore Troubleshooting", {
        contentDir: "ch02/12-restore-troubleshooting",
      }),
    ],
  },
  {
    n: 3,
    title: "High Availability Concepts",
    lessons: [
      L(13, "ha-vs-dr-revisited", "HA vs. DR, Revisited for On-Prem", {
        contentDir: "ch03/13-ha-vs-dr-revisited",
      }),
      L(14, "uptime-and-sla-math", "Uptime & SLA Math", {
        contentDir: "ch03/14-uptime-and-sla-math",
      }),
      L(15, "ha-technology-comparison", "HA Technology Comparison", {
        contentDir: "ch03/15-ha-technology-comparison",
      }),
      L(16, "choosing-the-right-ha-solution", "Choosing the Right HA Solution", {
        contentDir: "ch03/16-choosing-the-right-ha-solution",
      }),
    ],
  },
  {
    n: 4,
    title: "Always On Availability Groups, Deep Dive",
    lessons: [
      L(17, "ag-architecture", "Availability Group Architecture", {
        contentDir: "ch04/17-ag-architecture",
      }),
      L(18, "creating-an-availability-group", "Creating an Availability Group", {
        contentDir: "ch04/18-creating-an-availability-group",
      }),
      L(19, "sync-vs-async-replicas", "Synchronous vs. Asynchronous Replicas", {
        contentDir: "ch04/19-sync-vs-async-replicas",
      }),
      L(20, "listener-configuration", "Listener Configuration", {
        contentDir: "ch04/20-listener-configuration",
      }),
      L(21, "manual-and-automatic-failover", "Manual & Automatic Failover", {
        contentDir: "ch04/21-manual-and-automatic-failover",
      }),
      L(22, "ag-monitoring", "AG Monitoring", {
        contentDir: "ch04/22-ag-monitoring",
      }),
      L(23, "ag-troubleshooting", "AG Troubleshooting", {
        contentDir: "ch04/23-ag-troubleshooting",
      }),
    ],
  },
  {
    n: 5,
    title: "Failover Clustering",
    lessons: [
      L(24, "fci-architecture", "FCI Architecture", {
        contentDir: "ch05/24-fci-architecture",
      }),
      L(25, "shared-storage-concepts", "Shared Storage Concepts", {
        contentDir: "ch05/25-shared-storage-concepts",
      }),
      L(26, "cluster-quorum", "Cluster Quorum", {
        contentDir: "ch05/26-cluster-quorum",
      }),
      L(27, "fci-setup-overview", "FCI Setup, Overview", {
        contentDir: "ch05/27-fci-setup-overview",
      }),
      L(28, "fci-vs-ag-decision", "FCI vs. AG: Which One?", {
        contentDir: "ch05/28-fci-vs-ag-decision",
      }),
    ],
  },
  {
    n: 6,
    title: "Log Shipping & Database Mirroring",
    lessons: [
      L(29, "log-shipping-setup", "Log Shipping Setup", {
        contentDir: "ch06/29-log-shipping-setup",
      }),
      L(30, "log-shipping-monitoring", "Log Shipping Monitoring", {
        contentDir: "ch06/30-log-shipping-monitoring",
      }),
      L(31, "database-mirroring-legacy-context", "Database Mirroring, in Legacy Context", {
        contentDir: "ch06/31-database-mirroring-legacy-context",
      }),
      L(32, "when-each-still-makes-sense", "When Each Still Makes Sense", {
        contentDir: "ch06/32-when-each-still-makes-sense",
      }),
    ],
  },
  {
    n: 7,
    title: "Replication Fundamentals",
    lessons: [
      L(33, "replication-types-overview", "Replication Types, Overview", {
        contentDir: "ch07/33-replication-types-overview",
      }),
      L(34, "transactional-replication-basics", "Transactional Replication Basics", {
        contentDir: "ch07/34-transactional-replication-basics",
      }),
      L(35, "replication-monitoring", "Replication Monitoring", {
        contentDir: "ch07/35-replication-monitoring",
      }),
      L(36, "replication-troubleshooting", "Replication Troubleshooting", {
        contentDir: "ch07/36-replication-troubleshooting",
      }),
    ],
  },
  {
    n: 8,
    title: "Disaster Recovery Planning",
    lessons: [
      L(37, "dr-plan-components", "DR Plan Components", {
        contentDir: "ch08/37-dr-plan-components",
      }),
      L(38, "rpo-rto-in-a-real-dr-plan", "RPO/RTO in a Real DR Plan", {
        contentDir: "ch08/38-rpo-rto-in-a-real-dr-plan",
      }),
      L(39, "dr-testing-and-runbooks", "DR Testing & Runbooks", {
        contentDir: "ch08/39-dr-testing-and-runbooks",
      }),
      L(40, "geographic-dr-considerations", "Geographic DR Considerations", {
        contentDir: "ch08/40-geographic-dr-considerations",
      }),
      L(41, "communication-during-a-dr-event", "Communication During a DR Event", {
        contentDir: "ch08/41-communication-during-a-dr-event",
      }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(42, "capstone-kickoff", "Capstone Kickoff: Design HA/DR for a Real Scenario", {
        contentDir: "ch09/42-capstone-kickoff",
      }),
      L(43, "capstone-implement-backup-strategy", "Capstone: Implement the Backup Strategy", {
        contentDir: "ch09/43-capstone-implement-backup-strategy",
      }),
      L(44, "capstone-implement-ha-solution", "Capstone: Implement the HA Solution", {
        contentDir: "ch09/44-capstone-implement-ha-solution",
      }),
      L(45, "capstone-simulate-a-failover", "Capstone: Simulate a Failover", {
        contentDir: "ch09/45-capstone-simulate-a-failover",
      }),
      L(46, "capstone-simulate-a-disaster", "Capstone: Simulate a Disaster Recovery", {
        contentDir: "ch09/46-capstone-simulate-a-disaster",
      }),
      L(47, "capstone-document-the-runbook", "Capstone: Document the Runbook", {
        contentDir: "ch09/47-capstone-document-the-runbook",
      }),
      L(48, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch09/48-capstone-wrap-up",
      }),
    ],
  },
];
