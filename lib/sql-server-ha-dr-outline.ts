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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792505523/ltv-sql-server-ha-dr/recovery-models-in-depth.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(2, "backup-strategy-design", "Full/Differential/Log Backup Strategy Design", {
        contentDir: "ch01/02-backup-strategy-design",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506667/ltv-sql-server-ha-dr/backup-strategy-design.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(3, "backup-compression-and-encryption", "Backup Compression & Encryption", {
        contentDir: "ch01/03-backup-compression-and-encryption",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507337/ltv-sql-server-ha-dr/backup-compression-and-encryption.mp4",
        durationLabel: "1 min 36 s",
      }),
      L(4, "backup-to-multiple-locations", "Backup to Multiple Locations", {
        contentDir: "ch01/04-backup-to-multiple-locations",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507882/ltv-sql-server-ha-dr/backup-to-multiple-locations.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(5, "backup-verification", "Backup Verification", {
        contentDir: "ch01/05-backup-verification",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508519/ltv-sql-server-ha-dr/backup-verification.mp4",
        durationLabel: "1 min 34 s",
      }),
      L(6, "backup-automation-strategy", "Backup Automation Strategy", {
        contentDir: "ch01/06-backup-automation-strategy",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509195/ltv-sql-server-ha-dr/backup-automation-strategy.mp4",
        durationLabel: "1 min 40 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Restore Scenarios",
    lessons: [
      L(7, "full-restore", "Full Restore", {
        contentDir: "ch02/07-full-restore",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509737/ltv-sql-server-ha-dr/full-restore.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(8, "differential-restore", "Differential Restore", {
        contentDir: "ch02/08-differential-restore",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510241/ltv-sql-server-ha-dr/differential-restore.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(9, "point-in-time-restore", "Point-in-Time Restore", {
        contentDir: "ch02/09-point-in-time-restore",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510856/ltv-sql-server-ha-dr/point-in-time-restore.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(10, "restoring-to-a-new-server", "Restoring to a New Server", {
        contentDir: "ch02/10-restoring-to-a-new-server",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511445/ltv-sql-server-ha-dr/restoring-to-a-new-server.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(11, "tail-log-backups", "Tail-Log Backups", {
        contentDir: "ch02/11-tail-log-backups",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511974/ltv-sql-server-ha-dr/tail-log-backups.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(12, "restore-troubleshooting", "Restore Troubleshooting", {
        contentDir: "ch02/12-restore-troubleshooting",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512483/ltv-sql-server-ha-dr/restore-troubleshooting.mp4",
        durationLabel: "1 min 21 s",
      }),
    ],
  },
  {
    n: 3,
    title: "High Availability Concepts",
    lessons: [
      L(13, "ha-vs-dr-revisited", "HA vs. DR, Revisited for On-Prem", {
        contentDir: "ch03/13-ha-vs-dr-revisited",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512992/ltv-sql-server-ha-dr/ha-vs-dr-revisited.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(14, "uptime-and-sla-math", "Uptime & SLA Math", {
        contentDir: "ch03/14-uptime-and-sla-math",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513552/ltv-sql-server-ha-dr/uptime-and-sla-math.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(15, "ha-technology-comparison", "HA Technology Comparison", {
        contentDir: "ch03/15-ha-technology-comparison",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514012/ltv-sql-server-ha-dr/ha-technology-comparison.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(16, "choosing-the-right-ha-solution", "Choosing the Right HA Solution", {
        contentDir: "ch03/16-choosing-the-right-ha-solution",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514476/ltv-sql-server-ha-dr/choosing-the-right-ha-solution.mp4",
        durationLabel: "1 min 14 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Always On Availability Groups, Deep Dive",
    lessons: [
      L(17, "ag-architecture", "Availability Group Architecture", {
        contentDir: "ch04/17-ag-architecture",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514974/ltv-sql-server-ha-dr/ag-architecture.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(18, "creating-an-availability-group", "Creating an Availability Group", {
        contentDir: "ch04/18-creating-an-availability-group",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515493/ltv-sql-server-ha-dr/creating-an-availability-group.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(19, "sync-vs-async-replicas", "Synchronous vs. Asynchronous Replicas", {
        contentDir: "ch04/19-sync-vs-async-replicas",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515987/ltv-sql-server-ha-dr/sync-vs-async-replicas.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(20, "listener-configuration", "Listener Configuration", {
        contentDir: "ch04/20-listener-configuration",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516485/ltv-sql-server-ha-dr/listener-configuration.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(21, "manual-and-automatic-failover", "Manual & Automatic Failover", {
        contentDir: "ch04/21-manual-and-automatic-failover",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516972/ltv-sql-server-ha-dr/manual-and-automatic-failover.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(22, "ag-monitoring", "AG Monitoring", {
        contentDir: "ch04/22-ag-monitoring",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517493/ltv-sql-server-ha-dr/ag-monitoring.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(23, "ag-troubleshooting", "AG Troubleshooting", {
        contentDir: "ch04/23-ag-troubleshooting",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518026/ltv-sql-server-ha-dr/ag-troubleshooting.mp4",
        durationLabel: "1 min 21 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Failover Clustering",
    lessons: [
      L(24, "fci-architecture", "FCI Architecture", {
        contentDir: "ch05/24-fci-architecture",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518579/ltv-sql-server-ha-dr/fci-architecture.mp4",
        durationLabel: "1 min 20 s",
      }),
      L(25, "shared-storage-concepts", "Shared Storage Concepts", {
        contentDir: "ch05/25-shared-storage-concepts",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519064/ltv-sql-server-ha-dr/shared-storage-concepts.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(26, "cluster-quorum", "Cluster Quorum", {
        contentDir: "ch05/26-cluster-quorum",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519585/ltv-sql-server-ha-dr/cluster-quorum.mp4",
        durationLabel: "1 min 12 s",
      }),
      L(27, "fci-setup-overview", "FCI Setup, Overview", {
        contentDir: "ch05/27-fci-setup-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520130/ltv-sql-server-ha-dr/fci-setup-overview.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(28, "fci-vs-ag-decision", "FCI vs. AG: Which One?", {
        contentDir: "ch05/28-fci-vs-ag-decision",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520614/ltv-sql-server-ha-dr/fci-vs-ag-decision.mp4",
        durationLabel: "1 min 13 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Log Shipping & Database Mirroring",
    lessons: [
      L(29, "log-shipping-setup", "Log Shipping Setup", {
        contentDir: "ch06/29-log-shipping-setup",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521179/ltv-sql-server-ha-dr/log-shipping-setup.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(30, "log-shipping-monitoring", "Log Shipping Monitoring", {
        contentDir: "ch06/30-log-shipping-monitoring",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521701/ltv-sql-server-ha-dr/log-shipping-monitoring.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(31, "database-mirroring-legacy-context", "Database Mirroring, in Legacy Context", {
        contentDir: "ch06/31-database-mirroring-legacy-context",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522192/ltv-sql-server-ha-dr/database-mirroring-legacy-context.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(32, "when-each-still-makes-sense", "When Each Still Makes Sense", {
        contentDir: "ch06/32-when-each-still-makes-sense",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522618/ltv-sql-server-ha-dr/when-each-still-makes-sense.mp4",
        durationLabel: "1 min 10 s",
      }),
    ],
  },
  {
    n: 7,
    title: "Replication Fundamentals",
    lessons: [
      L(33, "replication-types-overview", "Replication Types, Overview", {
        contentDir: "ch07/33-replication-types-overview",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523143/ltv-sql-server-ha-dr/replication-types-overview.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(34, "transactional-replication-basics", "Transactional Replication Basics", {
        contentDir: "ch07/34-transactional-replication-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523650/ltv-sql-server-ha-dr/transactional-replication-basics.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(35, "replication-monitoring", "Replication Monitoring", {
        contentDir: "ch07/35-replication-monitoring",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524163/ltv-sql-server-ha-dr/replication-monitoring.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(36, "replication-troubleshooting", "Replication Troubleshooting", {
        contentDir: "ch07/36-replication-troubleshooting",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524695/ltv-sql-server-ha-dr/replication-troubleshooting.mp4",
        durationLabel: "1 min 15 s",
      }),
    ],
  },
  {
    n: 8,
    title: "Disaster Recovery Planning",
    lessons: [
      L(37, "dr-plan-components", "DR Plan Components", {
        contentDir: "ch08/37-dr-plan-components",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525182/ltv-sql-server-ha-dr/dr-plan-components.mp4",
        durationLabel: "1 min 12 s",
      }),
      L(38, "rpo-rto-in-a-real-dr-plan", "RPO/RTO in a Real DR Plan", {
        contentDir: "ch08/38-rpo-rto-in-a-real-dr-plan",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525635/ltv-sql-server-ha-dr/rpo-rto-in-a-real-dr-plan.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(39, "dr-testing-and-runbooks", "DR Testing & Runbooks", {
        contentDir: "ch08/39-dr-testing-and-runbooks",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526144/ltv-sql-server-ha-dr/dr-testing-and-runbooks.mp4",
        durationLabel: "1 min 12 s",
      }),
      L(40, "geographic-dr-considerations", "Geographic DR Considerations", {
        contentDir: "ch08/40-geographic-dr-considerations",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526701/ltv-sql-server-ha-dr/geographic-dr-considerations.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(41, "communication-during-a-dr-event", "Communication During a DR Event", {
        contentDir: "ch08/41-communication-during-a-dr-event",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527267/ltv-sql-server-ha-dr/communication-during-a-dr-event.mp4",
        durationLabel: "1 min 15 s",
      }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(42, "capstone-kickoff", "Capstone Kickoff: Design HA/DR for a Real Scenario", {
        contentDir: "ch09/42-capstone-kickoff",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527804/ltv-sql-server-ha-dr/capstone-kickoff.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(43, "capstone-implement-backup-strategy", "Capstone: Implement the Backup Strategy", {
        contentDir: "ch09/43-capstone-implement-backup-strategy",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528328/ltv-sql-server-ha-dr/capstone-implement-backup-strategy.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(44, "capstone-implement-ha-solution", "Capstone: Implement the HA Solution", {
        contentDir: "ch09/44-capstone-implement-ha-solution",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528817/ltv-sql-server-ha-dr/capstone-implement-ha-solution.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(45, "capstone-simulate-a-failover", "Capstone: Simulate a Failover", {
        contentDir: "ch09/45-capstone-simulate-a-failover",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529280/ltv-sql-server-ha-dr/capstone-simulate-a-failover.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(46, "capstone-simulate-a-disaster", "Capstone: Simulate a Disaster Recovery", {
        contentDir: "ch09/46-capstone-simulate-a-disaster",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529815/ltv-sql-server-ha-dr/capstone-simulate-a-disaster.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(47, "capstone-document-the-runbook", "Capstone: Document the Runbook", {
        contentDir: "ch09/47-capstone-document-the-runbook",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530279/ltv-sql-server-ha-dr/capstone-document-the-runbook.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(48, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch09/48-capstone-wrap-up",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530795/ltv-sql-server-ha-dr/capstone-wrap-up.mp4",
        durationLabel: "1 min 29 s",
      }),
    ],
  },
];
