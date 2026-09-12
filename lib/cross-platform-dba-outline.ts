// The full Cross-Platform Relational Database Administration course outline.
// Only lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". Assumes SQL Server DBA knowledge from earlier
// in the catalog (SQL Server Database Administration, Performance Tuning,
// HA/Backup/DR) and applies that same DBA thinking to Oracle, MySQL, and
// PostgreSQL — architecture, security, backup, recovery, performance,
// replication, and migration on each platform, closing with a cross-platform
// migration chapter and a real-world project spanning all three.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cross-platform-dba/
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

export const CROSS_PLATFORM_DBA_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Foundations: Thinking Cross-Platform",
    lessons: [
      L(1, "course-introduction-from-sql-server-dba-to-cross-platform-dba", "Course Introduction: From SQL Server DBA to Cross-Platform DBA"),
      L(2, "why-organizations-run-multiple-database-platforms", "Why Organizations Run Multiple Database Platforms"),
      L(3, "relational-concepts-that-transfer-vs-what-doesnt", "Relational Concepts That Transfer vs. What Doesn't"),
      L(4, "comparing-sql-server-oracle-mysql-postgresql", "Comparing SQL Server, Oracle, MySQL & PostgreSQL at a Glance"),
      L(5, "setting-up-your-cross-platform-lab-environment", "Setting Up Your Cross-Platform Lab Environment"),
    ],
  },
  {
    n: 2,
    title: "Oracle Architecture & Installation",
    lessons: [
      L(6, "oracle-database-architecture-instance-vs-database", "Oracle Database Architecture: Instance vs. Database"),
      L(7, "oracle-processes-memory-structures-sga-pga", "Oracle Processes, Memory Structures & the SGA/PGA"),
      L(8, "installing-oracle-database-and-creating-your-first-database", "Installing Oracle Database & Creating Your First Database"),
      L(9, "oracle-net-services-and-listener-configuration", "Oracle Net Services & Listener Configuration"),
      L(10, "tablespaces-datafiles-oracle-storage-structures", "Tablespaces, Datafiles & Oracle Storage Structures"),
      L(11, "sqlplus-sql-developer-oracle-enterprise-manager", "SQL*Plus, SQL Developer & Oracle Enterprise Manager"),
    ],
  },
  {
    n: 3,
    title: "Oracle Security & User Management",
    lessons: [
      L(12, "oracle-authentication-and-user-accounts", "Oracle Authentication & User Accounts"),
      L(13, "roles-privileges-and-grants-in-oracle", "Roles, Privileges & Grants in Oracle"),
      L(14, "profiles-password-policies-resource-limits", "Profiles, Password Policies & Resource Limits"),
      L(15, "oracle-auditing-and-fine-grained-access-control", "Oracle Auditing & Fine-Grained Access Control"),
      L(16, "transparent-data-encryption-in-oracle", "Transparent Data Encryption in Oracle"),
    ],
  },
  {
    n: 4,
    title: "Oracle Backup & Recovery",
    lessons: [
      L(17, "oracle-backup-fundamentals-logical-vs-physical", "Oracle Backup Fundamentals: Logical vs. Physical"),
      L(18, "rman-architecture-and-configuration", "RMAN Architecture & Configuration"),
      L(19, "full-and-incremental-backups-with-rman", "Full & Incremental Backups with RMAN"),
      L(20, "restore-and-recovery-scenarios-with-rman", "Restore & Recovery Scenarios with RMAN"),
      L(21, "oracle-flashback-technology", "Oracle Flashback Technology"),
      L(22, "data-pump-export-and-import", "Data Pump: Export & Import"),
    ],
  },
  {
    n: 5,
    title: "Oracle Performance Tuning",
    lessons: [
      L(23, "oracle-performance-tuning-methodology", "Oracle Performance Tuning Methodology"),
      L(24, "reading-oracle-execution-plans", "Reading Oracle Execution Plans"),
      L(25, "oracle-optimizer-statistics-cost-based-optimizer", "Oracle Optimizer Statistics & the Cost-Based Optimizer"),
      L(26, "awr-ash-oracle-diagnostic-tools", "AWR, ASH & Oracle Diagnostic Tools"),
      L(27, "indexing-strategies-in-oracle", "Indexing Strategies in Oracle"),
    ],
  },
  {
    n: 6,
    title: "Oracle Replication & High Availability",
    lessons: [
      L(28, "oracle-data-guard-fundamentals", "Oracle Data Guard Fundamentals"),
      L(29, "configuring-physical-and-logical-standby-databases", "Configuring Physical & Logical Standby Databases"),
      L(30, "oracle-rac-real-application-clusters-overview", "Oracle RAC: Real Application Clusters Overview"),
      L(31, "oracle-goldengate-for-replication", "Oracle GoldenGate for Replication"),
      L(32, "oracle-migration-and-upgrade-strategies", "Oracle Migration & Upgrade Strategies"),
    ],
  },
  {
    n: 7,
    title: "MySQL Architecture & Installation",
    lessons: [
      L(33, "mysql-architecture-server-layer-vs-storage-engine-layer", "MySQL Architecture: Server Layer vs. Storage Engine Layer"),
      L(34, "innodb-vs-myisam-choosing-a-storage-engine", "InnoDB vs. MyISAM & Choosing a Storage Engine"),
      L(35, "installing-mysql-and-initial-configuration", "Installing MySQL & Initial Configuration"),
      L(36, "mysql-configuration-files-and-system-variables", "MySQL Configuration Files & System Variables"),
      L(37, "mysql-workbench-and-command-line-tools", "MySQL Workbench & Command-Line Tools"),
    ],
  },
  {
    n: 8,
    title: "MySQL Security & User Management",
    lessons: [
      L(38, "mysql-authentication-and-user-accounts", "MySQL Authentication & User Accounts"),
      L(39, "privileges-grant-revoke-in-mysql", "Privileges, GRANT & REVOKE in MySQL"),
      L(40, "roles-in-mysql-8", "Roles in MySQL 8"),
      L(41, "mysql-security-best-practices-and-hardening", "MySQL Security Best Practices & Hardening"),
      L(42, "encryption-at-rest-and-in-transit-in-mysql", "Encryption at Rest & in Transit in MySQL"),
    ],
  },
  {
    n: 9,
    title: "MySQL Backup & Recovery",
    lessons: [
      L(43, "mysql-backup-strategies-logical-vs-physical", "MySQL Backup Strategies: Logical vs. Physical"),
      L(44, "mysqldump-and-logical-backups", "mysqldump & Logical Backups"),
      L(45, "percona-xtrabackup-and-physical-backups", "Percona XtraBackup & Physical Backups"),
      L(46, "point-in-time-recovery-with-binary-logs", "Point-in-Time Recovery with Binary Logs"),
      L(47, "mysql-disaster-recovery-planning", "MySQL Disaster Recovery Planning"),
    ],
  },
  {
    n: 10,
    title: "MySQL Performance Tuning",
    lessons: [
      L(48, "mysql-performance-tuning-methodology", "MySQL Performance Tuning Methodology"),
      L(49, "reading-mysql-explain-plans", "Reading MySQL EXPLAIN Plans"),
      L(50, "indexing-strategies-in-mysql", "Indexing Strategies in MySQL"),
      L(51, "mysql-performance-schema-and-sys-schema", "The MySQL Performance Schema & sys Schema"),
      L(52, "configuration-tuning-buffer-pool-and-key-variables", "Configuration Tuning: Buffer Pool & Key Variables"),
    ],
  },
  {
    n: 11,
    title: "MySQL Replication & High Availability",
    lessons: [
      L(53, "mysql-replication-fundamentals", "MySQL Replication Fundamentals"),
      L(54, "configuring-source-replica-replication", "Configuring Source-Replica Replication"),
      L(55, "group-replication-and-mysql-innodb-cluster", "Group Replication & MySQL InnoDB Cluster"),
      L(56, "mysql-router-and-read-write-splitting", "MySQL Router & Read/Write Splitting"),
      L(57, "mysql-migration-and-upgrade-strategies", "MySQL Migration & Upgrade Strategies"),
    ],
  },
  {
    n: 12,
    title: "PostgreSQL Architecture & Installation",
    lessons: [
      L(58, "postgresql-architecture-processes-and-memory", "PostgreSQL Architecture: Processes & Memory"),
      L(59, "installing-postgresql-and-initial-configuration", "Installing PostgreSQL & Initial Configuration"),
      L(60, "postgresql-conf-and-pg-hba-conf", "PostgreSQL Configuration Files: postgresql.conf & pg_hba.conf"),
      L(61, "databases-schemas-tablespaces-in-postgresql", "Databases, Schemas & Tablespaces in PostgreSQL"),
      L(62, "psql-pgadmin-postgresql-tooling", "psql, pgAdmin & PostgreSQL Tooling"),
      L(63, "postgresql-extensions-ecosystem", "PostgreSQL Extensions Ecosystem"),
    ],
  },
  {
    n: 13,
    title: "PostgreSQL Security & User Management",
    lessons: [
      L(64, "postgresql-roles-and-authentication", "PostgreSQL Roles & Authentication"),
      L(65, "privileges-and-grant-revoke-in-postgresql", "Privileges & GRANT/REVOKE in PostgreSQL"),
      L(66, "row-level-security-in-postgresql", "Row-Level Security in PostgreSQL"),
      L(67, "postgresql-auditing-and-pgaudit", "PostgreSQL Auditing & pgAudit"),
      L(68, "encryption-in-postgresql", "Encryption in PostgreSQL"),
    ],
  },
  {
    n: 14,
    title: "PostgreSQL Backup & Recovery",
    lessons: [
      L(69, "postgresql-backup-strategies-pg-dump-vs-physical", "PostgreSQL Backup Strategies: pg_dump vs. Physical Backups"),
      L(70, "pg-dump-pg-dumpall-logical-backups", "pg_dump, pg_dumpall & Logical Backups"),
      L(71, "physical-backups-with-pg-basebackup", "Physical Backups with pg_basebackup"),
      L(72, "point-in-time-recovery-with-wal-archiving", "Point-in-Time Recovery with WAL Archiving"),
      L(73, "postgresql-disaster-recovery-planning", "PostgreSQL Disaster Recovery Planning"),
    ],
  },
  {
    n: 15,
    title: "PostgreSQL Performance Tuning",
    lessons: [
      L(74, "postgresql-performance-tuning-methodology", "PostgreSQL Performance Tuning Methodology"),
      L(75, "reading-postgresql-explain-analyze-plans", "Reading PostgreSQL EXPLAIN ANALYZE Plans"),
      L(76, "indexing-strategies-in-postgresql", "Indexing Strategies in PostgreSQL"),
      L(77, "vacuum-autovacuum-and-table-bloat", "VACUUM, Autovacuum & Table Bloat"),
      L(78, "pg-stat-statements-and-query-performance-monitoring", "pg_stat_statements & Query Performance Monitoring"),
      L(79, "configuration-tuning-shared-buffers-and-key-parameters", "Configuration Tuning: shared_buffers & Key Parameters"),
    ],
  },
  {
    n: 16,
    title: "PostgreSQL Replication & High Availability",
    lessons: [
      L(80, "postgresql-streaming-replication-fundamentals", "PostgreSQL Streaming Replication Fundamentals"),
      L(81, "configuring-physical-streaming-replication", "Configuring Physical Streaming Replication"),
      L(82, "logical-replication-in-postgresql", "Logical Replication in PostgreSQL"),
      L(83, "connection-pooling-with-pgbouncer", "Connection Pooling with PgBouncer"),
      L(84, "postgresql-migration-and-upgrade-strategies", "PostgreSQL Migration & Upgrade Strategies"),
    ],
  },
  {
    n: 17,
    title: "Cross-Platform Migration",
    lessons: [
      L(85, "assessing-a-cross-platform-migration-project", "Assessing a Cross-Platform Migration Project"),
      L(86, "migrating-sql-server-to-oracle-key-differences", "Migrating SQL Server to Oracle: Key Differences"),
      L(87, "migrating-sql-server-to-postgresql-key-differences", "Migrating SQL Server to PostgreSQL: Key Differences"),
      L(88, "migrating-sql-server-to-mysql-key-differences", "Migrating SQL Server to MySQL: Key Differences"),
      L(89, "data-type-mapping-and-schema-conversion-across-platforms", "Data Type Mapping & Schema Conversion Across Platforms"),
      L(90, "etl-and-data-migration-tools-for-cross-platform-moves", "ETL & Data Migration Tools for Cross-Platform Moves"),
    ],
  },
  {
    n: 18,
    title: "Real-World Cross-Platform Project & Interview Prep",
    lessons: [
      L(91, "project-introduction-youre-the-cross-platform-dba", "Project Introduction — You're the Cross-Platform DBA"),
      L(92, "project-standing-up-oracle-mysql-postgresql-side-by-side", "Project — Standing Up Oracle, MySQL & PostgreSQL Side by Side"),
      L(93, "project-securing-and-backing-up-all-three-platforms", "Project — Securing & Backing Up All Three Platforms"),
      L(94, "project-performance-tuning-across-platforms", "Project — Performance Tuning Across Platforms"),
      L(95, "cross-platform-dba-interview-preparation", "Cross-Platform DBA Interview Preparation"),
      L(96, "course-wrap-up-choosing-where-to-specialize-next", "Course Wrap-Up: Choosing Where to Specialize Next"),
    ],
  },
];
