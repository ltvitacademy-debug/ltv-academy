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
      L(1, "recovery-models-in-depth", "Recovery Models, in Depth"),
      L(2, "backup-strategy-design", "Full/Differential/Log Backup Strategy Design"),
      L(3, "backup-compression-and-encryption", "Backup Compression & Encryption"),
      L(4, "backup-to-multiple-locations", "Backup to Multiple Locations"),
      L(5, "backup-verification", "Backup Verification"),
      L(6, "backup-automation-strategy", "Backup Automation Strategy"),
    ],
  },
  {
    n: 2,
    title: "Restore Scenarios",
    lessons: [
      L(7, "full-restore", "Full Restore"),
      L(8, "differential-restore", "Differential Restore"),
      L(9, "point-in-time-restore", "Point-in-Time Restore"),
      L(10, "restoring-to-a-new-server", "Restoring to a New Server"),
      L(11, "tail-log-backups", "Tail-Log Backups"),
      L(12, "restore-troubleshooting", "Restore Troubleshooting"),
    ],
  },
  {
    n: 3,
    title: "High Availability Concepts",
    lessons: [
      L(13, "ha-vs-dr-revisited", "HA vs. DR, Revisited for On-Prem"),
      L(14, "uptime-and-sla-math", "Uptime & SLA Math"),
      L(15, "ha-technology-comparison", "HA Technology Comparison"),
      L(16, "choosing-the-right-ha-solution", "Choosing the Right HA Solution"),
    ],
  },
  {
    n: 4,
    title: "Always On Availability Groups, Deep Dive",
    lessons: [
      L(17, "ag-architecture", "Availability Group Architecture"),
      L(18, "creating-an-availability-group", "Creating an Availability Group"),
      L(19, "sync-vs-async-replicas", "Synchronous vs. Asynchronous Replicas"),
      L(20, "listener-configuration", "Listener Configuration"),
      L(21, "manual-and-automatic-failover", "Manual & Automatic Failover"),
      L(22, "ag-monitoring", "AG Monitoring"),
      L(23, "ag-troubleshooting", "AG Troubleshooting"),
    ],
  },
  {
    n: 5,
    title: "Failover Clustering",
    lessons: [
      L(24, "fci-architecture", "FCI Architecture"),
      L(25, "shared-storage-concepts", "Shared Storage Concepts"),
      L(26, "cluster-quorum", "Cluster Quorum"),
      L(27, "fci-setup-overview", "FCI Setup, Overview"),
      L(28, "fci-vs-ag-decision", "FCI vs. AG: Which One?"),
    ],
  },
  {
    n: 6,
    title: "Log Shipping & Database Mirroring",
    lessons: [
      L(29, "log-shipping-setup", "Log Shipping Setup"),
      L(30, "log-shipping-monitoring", "Log Shipping Monitoring"),
      L(31, "database-mirroring-legacy-context", "Database Mirroring, in Legacy Context"),
      L(32, "when-each-still-makes-sense", "When Each Still Makes Sense"),
    ],
  },
  {
    n: 7,
    title: "Replication Fundamentals",
    lessons: [
      L(33, "replication-types-overview", "Replication Types, Overview"),
      L(34, "transactional-replication-basics", "Transactional Replication Basics"),
      L(35, "replication-monitoring", "Replication Monitoring"),
      L(36, "replication-troubleshooting", "Replication Troubleshooting"),
    ],
  },
  {
    n: 8,
    title: "Disaster Recovery Planning",
    lessons: [
      L(37, "dr-plan-components", "DR Plan Components"),
      L(38, "rpo-rto-in-a-real-dr-plan", "RPO/RTO in a Real DR Plan"),
      L(39, "dr-testing-and-runbooks", "DR Testing & Runbooks"),
      L(40, "geographic-dr-considerations", "Geographic DR Considerations"),
      L(41, "communication-during-a-dr-event", "Communication During a DR Event"),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(42, "capstone-kickoff", "Capstone Kickoff: Design HA/DR for a Real Scenario"),
      L(43, "capstone-implement-backup-strategy", "Capstone: Implement the Backup Strategy"),
      L(44, "capstone-implement-ha-solution", "Capstone: Implement the HA Solution"),
      L(45, "capstone-simulate-a-failover", "Capstone: Simulate a Failover"),
      L(46, "capstone-simulate-a-disaster", "Capstone: Simulate a Disaster Recovery"),
      L(47, "capstone-document-the-runbook", "Capstone: Document the Runbook"),
      L(48, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
