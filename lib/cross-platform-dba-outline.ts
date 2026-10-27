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
      L(1, "course-introduction-from-sql-server-dba-to-cross-platform-dba", "Course Introduction: From SQL Server DBA to Cross-Platform DBA", { contentDir: "ch01/01-course-introduction-from-sql-server-dba-to-cross-platform-dba", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/course-introduction-from-sql-server-dba-to-cross-platform-dba.mp4", durationLabel: "1 min 12 s" }),
      L(2, "why-organizations-run-multiple-database-platforms", "Why Organizations Run Multiple Database Platforms", { contentDir: "ch01/02-why-organizations-run-multiple-database-platforms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/why-organizations-run-multiple-database-platforms.mp4", durationLabel: "33 s" }),
      L(3, "relational-concepts-that-transfer-vs-what-doesnt", "Relational Concepts That Transfer vs. What Doesn't", { contentDir: "ch01/03-relational-concepts-that-transfer-vs-what-doesnt", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/relational-concepts-that-transfer-vs-what-doesnt.mp4", durationLabel: "0 s" }),
      L(4, "comparing-sql-server-oracle-mysql-postgresql", "Comparing SQL Server, Oracle, MySQL & PostgreSQL at a Glance", { contentDir: "ch01/04-comparing-sql-server-oracle-mysql-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/comparing-sql-server-oracle-mysql-postgresql.mp4", durationLabel: "0 s" }),
      L(5, "setting-up-your-cross-platform-lab-environment", "Setting Up Your Cross-Platform Lab Environment", { contentDir: "ch01/05-setting-up-your-cross-platform-lab-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/setting-up-your-cross-platform-lab-environment.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 2,
    title: "Oracle Architecture & Installation",
    lessons: [
      L(6, "oracle-database-architecture-instance-vs-database", "Oracle Database Architecture: Instance vs. Database", { contentDir: "ch02/06-oracle-database-architecture-instance-vs-database", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-database-architecture-instance-vs-database.mp4", durationLabel: "0 s" }),
      L(7, "oracle-processes-memory-structures-sga-pga", "Oracle Processes, Memory Structures & the SGA/PGA", { contentDir: "ch02/07-oracle-processes-memory-structures-sga-pga", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-processes-memory-structures-sga-pga.mp4", durationLabel: "14 s" }),
      L(8, "installing-oracle-database-and-creating-your-first-database", "Installing Oracle Database & Creating Your First Database", { contentDir: "ch02/08-installing-oracle-database-and-creating-your-first-database", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/installing-oracle-database-and-creating-your-first-database.mp4", durationLabel: "14 s" }),
      L(9, "oracle-net-services-and-listener-configuration", "Oracle Net Services & Listener Configuration", { contentDir: "ch02/09-oracle-net-services-and-listener-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-net-services-and-listener-configuration.mp4", durationLabel: "34 s" }),
      L(10, "tablespaces-datafiles-oracle-storage-structures", "Tablespaces, Datafiles & Oracle Storage Structures", { contentDir: "ch02/10-tablespaces-datafiles-oracle-storage-structures", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/tablespaces-datafiles-oracle-storage-structures.mp4", durationLabel: "14 s" }),
      L(11, "sqlplus-sql-developer-oracle-enterprise-manager", "SQL*Plus, SQL Developer & Oracle Enterprise Manager", { contentDir: "ch02/11-sqlplus-sql-developer-oracle-enterprise-manager", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/sqlplus-sql-developer-oracle-enterprise-manager.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 3,
    title: "Oracle Security & User Management",
    lessons: [
      L(12, "oracle-authentication-and-user-accounts", "Oracle Authentication & User Accounts", { contentDir: "ch03/12-oracle-authentication-and-user-accounts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-authentication-and-user-accounts.mp4", durationLabel: "0 s" }),
      L(13, "roles-privileges-and-grants-in-oracle", "Roles, Privileges & Grants in Oracle", { contentDir: "ch03/13-roles-privileges-and-grants-in-oracle", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/roles-privileges-and-grants-in-oracle.mp4", durationLabel: "0 s" }),
      L(14, "profiles-password-policies-resource-limits", "Profiles, Password Policies & Resource Limits", { contentDir: "ch03/14-profiles-password-policies-resource-limits", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/profiles-password-policies-resource-limits.mp4", durationLabel: "29 s" }),
      L(15, "oracle-auditing-and-fine-grained-access-control", "Oracle Auditing & Fine-Grained Access Control", { contentDir: "ch03/15-oracle-auditing-and-fine-grained-access-control", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-auditing-and-fine-grained-access-control.mp4", durationLabel: "0 s" }),
      L(16, "transparent-data-encryption-in-oracle", "Transparent Data Encryption in Oracle", { contentDir: "ch03/16-transparent-data-encryption-in-oracle", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/transparent-data-encryption-in-oracle.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
  {
    n: 4,
    title: "Oracle Backup & Recovery",
    lessons: [
      L(17, "oracle-backup-fundamentals-logical-vs-physical", "Oracle Backup Fundamentals: Logical vs. Physical", { contentDir: "ch04/17-oracle-backup-fundamentals-logical-vs-physical", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-backup-fundamentals-logical-vs-physical.mp4", durationLabel: "1 min 13 s" }),
      L(18, "rman-architecture-and-configuration", "RMAN Architecture & Configuration", { contentDir: "ch04/18-rman-architecture-and-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/rman-architecture-and-configuration.mp4", durationLabel: "0 s" }),
      L(19, "full-and-incremental-backups-with-rman", "Full & Incremental Backups with RMAN", { contentDir: "ch04/19-full-and-incremental-backups-with-rman", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/full-and-incremental-backups-with-rman.mp4", durationLabel: "1 min 13 s" }),
      L(20, "restore-and-recovery-scenarios-with-rman", "Restore & Recovery Scenarios with RMAN", { contentDir: "ch04/20-restore-and-recovery-scenarios-with-rman", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/restore-and-recovery-scenarios-with-rman.mp4", durationLabel: "0 s" }),
      L(21, "oracle-flashback-technology", "Oracle Flashback Technology", { contentDir: "ch04/21-oracle-flashback-technology", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-flashback-technology.mp4", durationLabel: "15 s" }),
      L(22, "data-pump-export-and-import", "Data Pump: Export & Import", { contentDir: "ch04/22-data-pump-export-and-import", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/data-pump-export-and-import.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 5,
    title: "Oracle Performance Tuning",
    lessons: [
      L(23, "oracle-performance-tuning-methodology", "Oracle Performance Tuning Methodology", { contentDir: "ch05/23-oracle-performance-tuning-methodology", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-performance-tuning-methodology.mp4", durationLabel: "0 s" }),
      L(24, "reading-oracle-execution-plans", "Reading Oracle Execution Plans", { contentDir: "ch05/24-reading-oracle-execution-plans", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/reading-oracle-execution-plans.mp4", durationLabel: "0 s" }),
      L(25, "oracle-optimizer-statistics-cost-based-optimizer", "Oracle Optimizer Statistics & the Cost-Based Optimizer", { contentDir: "ch05/25-oracle-optimizer-statistics-cost-based-optimizer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-optimizer-statistics-cost-based-optimizer.mp4", durationLabel: "12 s" }),
      L(26, "awr-ash-oracle-diagnostic-tools", "AWR, ASH & Oracle Diagnostic Tools", { contentDir: "ch05/26-awr-ash-oracle-diagnostic-tools", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/awr-ash-oracle-diagnostic-tools.mp4", durationLabel: "18 s" }),
      L(27, "indexing-strategies-in-oracle", "Indexing Strategies in Oracle", { contentDir: "ch05/27-indexing-strategies-in-oracle", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/indexing-strategies-in-oracle.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 6,
    title: "Oracle Replication & High Availability",
    lessons: [
      L(28, "oracle-data-guard-fundamentals", "Oracle Data Guard Fundamentals", { contentDir: "ch06/28-oracle-data-guard-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-data-guard-fundamentals.mp4", durationLabel: "0 s" }),
      L(29, "configuring-physical-and-logical-standby-databases", "Configuring Physical & Logical Standby Databases", { contentDir: "ch06/29-configuring-physical-and-logical-standby-databases", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/configuring-physical-and-logical-standby-databases.mp4", durationLabel: "0 s" }),
      L(30, "oracle-rac-real-application-clusters-overview", "Oracle RAC: Real Application Clusters Overview", { contentDir: "ch06/30-oracle-rac-real-application-clusters-overview", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-rac-real-application-clusters-overview.mp4", durationLabel: "39 s" }),
      L(31, "oracle-goldengate-for-replication", "Oracle GoldenGate for Replication", { contentDir: "ch06/31-oracle-goldengate-for-replication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-goldengate-for-replication.mp4", durationLabel: "0 s" }),
      L(32, "oracle-migration-and-upgrade-strategies", "Oracle Migration & Upgrade Strategies", { contentDir: "ch06/32-oracle-migration-and-upgrade-strategies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/oracle-migration-and-upgrade-strategies.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 7,
    title: "MySQL Architecture & Installation",
    lessons: [
      L(33, "mysql-architecture-server-layer-vs-storage-engine-layer", "MySQL Architecture: Server Layer vs. Storage Engine Layer", { contentDir: "ch07/33-mysql-architecture-server-layer-vs-storage-engine-layer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-architecture-server-layer-vs-storage-engine-layer.mp4", durationLabel: "0 s" }),
      L(34, "innodb-vs-myisam-choosing-a-storage-engine", "InnoDB vs. MyISAM & Choosing a Storage Engine", { contentDir: "ch07/34-innodb-vs-myisam-choosing-a-storage-engine", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/innodb-vs-myisam-choosing-a-storage-engine.mp4", durationLabel: "14 s" }),
      L(35, "installing-mysql-and-initial-configuration", "Installing MySQL & Initial Configuration", { contentDir: "ch07/35-installing-mysql-and-initial-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/installing-mysql-and-initial-configuration.mp4", durationLabel: "0 s" }),
      L(36, "mysql-configuration-files-and-system-variables", "MySQL Configuration Files & System Variables", { contentDir: "ch07/36-mysql-configuration-files-and-system-variables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-configuration-files-and-system-variables.mp4", durationLabel: "14 s" }),
      L(37, "mysql-workbench-and-command-line-tools", "MySQL Workbench & Command-Line Tools", { contentDir: "ch07/37-mysql-workbench-and-command-line-tools", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-workbench-and-command-line-tools.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 8,
    title: "MySQL Security & User Management",
    lessons: [
      L(38, "mysql-authentication-and-user-accounts", "MySQL Authentication & User Accounts", { contentDir: "ch08/38-mysql-authentication-and-user-accounts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-authentication-and-user-accounts.mp4", durationLabel: "14 s" }),
      L(39, "privileges-grant-revoke-in-mysql", "Privileges, GRANT & REVOKE in MySQL", { contentDir: "ch08/39-privileges-grant-revoke-in-mysql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/privileges-grant-revoke-in-mysql.mp4", durationLabel: "0 s" }),
      L(40, "roles-in-mysql-8", "Roles in MySQL 8", { contentDir: "ch08/40-roles-in-mysql-8", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/roles-in-mysql-8.mp4", durationLabel: "0 s" }),
      L(41, "mysql-security-best-practices-and-hardening", "MySQL Security Best Practices & Hardening", { contentDir: "ch08/41-mysql-security-best-practices-and-hardening", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-security-best-practices-and-hardening.mp4", durationLabel: "1 min 22 s" }),
      L(42, "encryption-at-rest-and-in-transit-in-mysql", "Encryption at Rest & in Transit in MySQL", { contentDir: "ch08/42-encryption-at-rest-and-in-transit-in-mysql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/encryption-at-rest-and-in-transit-in-mysql.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 9,
    title: "MySQL Backup & Recovery",
    lessons: [
      L(43, "mysql-backup-strategies-logical-vs-physical", "MySQL Backup Strategies: Logical vs. Physical", { contentDir: "ch09/43-mysql-backup-strategies-logical-vs-physical", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-backup-strategies-logical-vs-physical.mp4", durationLabel: "0 s" }),
      L(44, "mysqldump-and-logical-backups", "mysqldump & Logical Backups", { contentDir: "ch09/44-mysqldump-and-logical-backups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysqldump-and-logical-backups.mp4", durationLabel: "0 s" }),
      L(45, "percona-xtrabackup-and-physical-backups", "Percona XtraBackup & Physical Backups", { contentDir: "ch09/45-percona-xtrabackup-and-physical-backups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/percona-xtrabackup-and-physical-backups.mp4", durationLabel: "0 s" }),
      L(46, "point-in-time-recovery-with-binary-logs", "Point-in-Time Recovery with Binary Logs", { contentDir: "ch09/46-point-in-time-recovery-with-binary-logs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/point-in-time-recovery-with-binary-logs.mp4", durationLabel: "1 min 9 s" }),
      L(47, "mysql-disaster-recovery-planning", "MySQL Disaster Recovery Planning", { contentDir: "ch09/47-mysql-disaster-recovery-planning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-disaster-recovery-planning.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 10,
    title: "MySQL Performance Tuning",
    lessons: [
      L(48, "mysql-performance-tuning-methodology", "MySQL Performance Tuning Methodology", { contentDir: "ch10/48-mysql-performance-tuning-methodology", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-performance-tuning-methodology.mp4", durationLabel: "0 s" }),
      L(49, "reading-mysql-explain-plans", "Reading MySQL EXPLAIN Plans", { contentDir: "ch10/49-reading-mysql-explain-plans", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/reading-mysql-explain-plans.mp4", durationLabel: "0 s" }),
      L(50, "indexing-strategies-in-mysql", "Indexing Strategies in MySQL", { contentDir: "ch10/50-indexing-strategies-in-mysql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/indexing-strategies-in-mysql.mp4", durationLabel: "60 s" }),
      L(51, "mysql-performance-schema-and-sys-schema", "The MySQL Performance Schema & sys Schema", { contentDir: "ch10/51-mysql-performance-schema-and-sys-schema", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-performance-schema-and-sys-schema.mp4", durationLabel: "18 s" }),
      L(52, "configuration-tuning-buffer-pool-and-key-variables", "Configuration Tuning: Buffer Pool & Key Variables", { contentDir: "ch10/52-configuration-tuning-buffer-pool-and-key-variables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/configuration-tuning-buffer-pool-and-key-variables.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 11,
    title: "MySQL Replication & High Availability",
    lessons: [
      L(53, "mysql-replication-fundamentals", "MySQL Replication Fundamentals", { contentDir: "ch11/53-mysql-replication-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-replication-fundamentals.mp4", durationLabel: "0 s" }),
      L(54, "configuring-source-replica-replication", "Configuring Source-Replica Replication", { contentDir: "ch11/54-configuring-source-replica-replication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/configuring-source-replica-replication.mp4", durationLabel: "0 s" }),
      L(55, "group-replication-and-mysql-innodb-cluster", "Group Replication & MySQL InnoDB Cluster", { contentDir: "ch11/55-group-replication-and-mysql-innodb-cluster", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/group-replication-and-mysql-innodb-cluster.mp4", durationLabel: "16 s" }),
      L(56, "mysql-router-and-read-write-splitting", "MySQL Router & Read/Write Splitting", { contentDir: "ch11/56-mysql-router-and-read-write-splitting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-router-and-read-write-splitting.mp4", durationLabel: "0 s" }),
      L(57, "mysql-migration-and-upgrade-strategies", "MySQL Migration & Upgrade Strategies", { contentDir: "ch11/57-mysql-migration-and-upgrade-strategies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/mysql-migration-and-upgrade-strategies.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 12,
    title: "PostgreSQL Architecture & Installation",
    lessons: [
      L(58, "postgresql-architecture-processes-and-memory", "PostgreSQL Architecture: Processes & Memory", { contentDir: "ch12/58-postgresql-architecture-processes-and-memory", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-architecture-processes-and-memory.mp4", durationLabel: "13 s" }),
      L(59, "installing-postgresql-and-initial-configuration", "Installing PostgreSQL & Initial Configuration", { contentDir: "ch12/59-installing-postgresql-and-initial-configuration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/installing-postgresql-and-initial-configuration.mp4", durationLabel: "0 s" }),
      L(60, "postgresql-conf-and-pg-hba-conf", "PostgreSQL Configuration Files: postgresql.conf & pg_hba.conf", { contentDir: "ch12/60-postgresql-conf-and-pg-hba-conf", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-conf-and-pg-hba-conf.mp4", durationLabel: "37 s" }),
      L(61, "databases-schemas-tablespaces-in-postgresql", "Databases, Schemas & Tablespaces in PostgreSQL", { contentDir: "ch12/61-databases-schemas-tablespaces-in-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/databases-schemas-tablespaces-in-postgresql.mp4", durationLabel: "0 s" }),
      L(62, "psql-pgadmin-postgresql-tooling", "psql, pgAdmin & PostgreSQL Tooling", { contentDir: "ch12/62-psql-pgadmin-postgresql-tooling", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/psql-pgadmin-postgresql-tooling.mp4", durationLabel: "0 s" }),
      L(63, "postgresql-extensions-ecosystem", "PostgreSQL Extensions Ecosystem", { contentDir: "ch12/63-postgresql-extensions-ecosystem", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-extensions-ecosystem.mp4", durationLabel: "15 s" }),
    ],
  },
  {
    n: 13,
    title: "PostgreSQL Security & User Management",
    lessons: [
      L(64, "postgresql-roles-and-authentication", "PostgreSQL Roles & Authentication", { contentDir: "ch13/64-postgresql-roles-and-authentication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-roles-and-authentication.mp4", durationLabel: "0 s" }),
      L(65, "privileges-and-grant-revoke-in-postgresql", "Privileges & GRANT/REVOKE in PostgreSQL", { contentDir: "ch13/65-privileges-and-grant-revoke-in-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/privileges-and-grant-revoke-in-postgresql.mp4", durationLabel: "0 s" }),
      L(66, "row-level-security-in-postgresql", "Row-Level Security in PostgreSQL", { contentDir: "ch13/66-row-level-security-in-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/row-level-security-in-postgresql.mp4", durationLabel: "16 s" }),
      L(67, "postgresql-auditing-and-pgaudit", "PostgreSQL Auditing & pgAudit", { contentDir: "ch13/67-postgresql-auditing-and-pgaudit", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-auditing-and-pgaudit.mp4", durationLabel: "32 s" }),
      L(68, "encryption-in-postgresql", "Encryption in PostgreSQL", { contentDir: "ch13/68-encryption-in-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/encryption-in-postgresql.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 14,
    title: "PostgreSQL Backup & Recovery",
    lessons: [
      L(69, "postgresql-backup-strategies-pg-dump-vs-physical", "PostgreSQL Backup Strategies: pg_dump vs. Physical Backups", { contentDir: "ch14/69-postgresql-backup-strategies-pg-dump-vs-physical", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-backup-strategies-pg-dump-vs-physical.mp4", durationLabel: "15 s" }),
      L(70, "pg-dump-pg-dumpall-logical-backups", "pg_dump, pg_dumpall & Logical Backups", { contentDir: "ch14/70-pg-dump-pg-dumpall-logical-backups", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/pg-dump-pg-dumpall-logical-backups.mp4", durationLabel: "0 s" }),
      L(71, "physical-backups-with-pg-basebackup", "Physical Backups with pg_basebackup", { contentDir: "ch14/71-physical-backups-with-pg-basebackup", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/physical-backups-with-pg-basebackup.mp4", durationLabel: "0 s" }),
      L(72, "point-in-time-recovery-with-wal-archiving", "Point-in-Time Recovery with WAL Archiving", { contentDir: "ch14/72-point-in-time-recovery-with-wal-archiving", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/point-in-time-recovery-with-wal-archiving.mp4", durationLabel: "0 s" }),
      L(73, "postgresql-disaster-recovery-planning", "PostgreSQL Disaster Recovery Planning", { contentDir: "ch14/73-postgresql-disaster-recovery-planning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-disaster-recovery-planning.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 15,
    title: "PostgreSQL Performance Tuning",
    lessons: [
      L(74, "postgresql-performance-tuning-methodology", "PostgreSQL Performance Tuning Methodology", { contentDir: "ch15/74-postgresql-performance-tuning-methodology", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-performance-tuning-methodology.mp4", durationLabel: "31 s" }),
      L(75, "reading-postgresql-explain-analyze-plans", "Reading PostgreSQL EXPLAIN ANALYZE Plans", { contentDir: "ch15/75-reading-postgresql-explain-analyze-plans", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/reading-postgresql-explain-analyze-plans.mp4", durationLabel: "0 s" }),
      L(76, "indexing-strategies-in-postgresql", "Indexing Strategies in PostgreSQL", { contentDir: "ch15/76-indexing-strategies-in-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/indexing-strategies-in-postgresql.mp4", durationLabel: "0 s" }),
      L(77, "vacuum-autovacuum-and-table-bloat", "VACUUM, Autovacuum & Table Bloat", { contentDir: "ch15/77-vacuum-autovacuum-and-table-bloat", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/vacuum-autovacuum-and-table-bloat.mp4", durationLabel: "14 s" }),
      L(78, "pg-stat-statements-and-query-performance-monitoring", "pg_stat_statements & Query Performance Monitoring", { contentDir: "ch15/78-pg-stat-statements-and-query-performance-monitoring", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/pg-stat-statements-and-query-performance-monitoring.mp4", durationLabel: "0 s" }),
      L(79, "configuration-tuning-shared-buffers-and-key-parameters", "Configuration Tuning: shared_buffers & Key Parameters", { contentDir: "ch15/79-configuration-tuning-shared-buffers-and-key-parameters", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/configuration-tuning-shared-buffers-and-key-parameters.mp4", durationLabel: "15 s" }),
    ],
  },
  {
    n: 16,
    title: "PostgreSQL Replication & High Availability",
    lessons: [
      L(80, "postgresql-streaming-replication-fundamentals", "PostgreSQL Streaming Replication Fundamentals", { contentDir: "ch16/80-postgresql-streaming-replication-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-streaming-replication-fundamentals.mp4", durationLabel: "19 s" }),
      L(81, "configuring-physical-streaming-replication", "Configuring Physical Streaming Replication", { contentDir: "ch16/81-configuring-physical-streaming-replication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/configuring-physical-streaming-replication.mp4", durationLabel: "18 s" }),
      L(82, "logical-replication-in-postgresql", "Logical Replication in PostgreSQL", { contentDir: "ch16/82-logical-replication-in-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/logical-replication-in-postgresql.mp4", durationLabel: "0 s" }),
      L(83, "connection-pooling-with-pgbouncer", "Connection Pooling with PgBouncer", { contentDir: "ch16/83-connection-pooling-with-pgbouncer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/connection-pooling-with-pgbouncer.mp4", durationLabel: "0 s" }),
      L(84, "postgresql-migration-and-upgrade-strategies", "PostgreSQL Migration & Upgrade Strategies", { contentDir: "ch16/84-postgresql-migration-and-upgrade-strategies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/postgresql-migration-and-upgrade-strategies.mp4", durationLabel: "16 s" }),
    ],
  },
  {
    n: 17,
    title: "Cross-Platform Migration",
    lessons: [
      L(85, "assessing-a-cross-platform-migration-project", "Assessing a Cross-Platform Migration Project", { contentDir: "ch17/85-assessing-a-cross-platform-migration-project", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/assessing-a-cross-platform-migration-project.mp4", durationLabel: "18 s" }),
      L(86, "migrating-sql-server-to-oracle-key-differences", "Migrating SQL Server to Oracle: Key Differences", { contentDir: "ch17/86-migrating-sql-server-to-oracle-key-differences", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/migrating-sql-server-to-oracle-key-differences.mp4", durationLabel: "16 s" }),
      L(87, "migrating-sql-server-to-postgresql-key-differences", "Migrating SQL Server to PostgreSQL: Key Differences", { contentDir: "ch17/87-migrating-sql-server-to-postgresql-key-differences", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/migrating-sql-server-to-postgresql-key-differences.mp4", durationLabel: "38 s" }),
      L(88, "migrating-sql-server-to-mysql-key-differences", "Migrating SQL Server to MySQL: Key Differences", { contentDir: "ch17/88-migrating-sql-server-to-mysql-key-differences", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/migrating-sql-server-to-mysql-key-differences.mp4", durationLabel: "0 s" }),
      L(89, "data-type-mapping-and-schema-conversion-across-platforms", "Data Type Mapping & Schema Conversion Across Platforms", { contentDir: "ch17/89-data-type-mapping-and-schema-conversion-across-platforms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/data-type-mapping-and-schema-conversion-across-platforms.mp4", durationLabel: "18 s" }),
      L(90, "etl-and-data-migration-tools-for-cross-platform-moves", "ETL & Data Migration Tools for Cross-Platform Moves", { contentDir: "ch17/90-etl-and-data-migration-tools-for-cross-platform-moves", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/etl-and-data-migration-tools-for-cross-platform-moves.mp4", durationLabel: "0 s" }),
    ],
  },
  {
    n: 18,
    title: "Real-World Cross-Platform Project & Interview Prep",
    lessons: [
      L(91, "project-introduction-youre-the-cross-platform-dba", "Project Introduction — You're the Cross-Platform DBA", { contentDir: "ch18/91-project-introduction-youre-the-cross-platform-dba", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/project-introduction-youre-the-cross-platform-dba.mp4", durationLabel: "16 s" }),
      L(92, "project-standing-up-oracle-mysql-postgresql-side-by-side", "Project — Standing Up Oracle, MySQL & PostgreSQL Side by Side", { contentDir: "ch18/92-project-standing-up-oracle-mysql-postgresql-side-by-side", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/project-standing-up-oracle-mysql-postgresql-side-by-side.mp4", durationLabel: "18 s" }),
      L(93, "project-securing-and-backing-up-all-three-platforms", "Project — Securing & Backing Up All Three Platforms", { contentDir: "ch18/93-project-securing-and-backing-up-all-three-platforms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/project-securing-and-backing-up-all-three-platforms.mp4", durationLabel: "11 s" }),
      L(94, "project-performance-tuning-across-platforms", "Project — Performance Tuning Across Platforms", { contentDir: "ch18/94-project-performance-tuning-across-platforms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/project-performance-tuning-across-platforms.mp4", durationLabel: "0 s" }),
      L(95, "cross-platform-dba-interview-preparation", "Cross-Platform DBA Interview Preparation", { contentDir: "ch18/95-cross-platform-dba-interview-preparation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/cross-platform-dba-interview-preparation.mp4", durationLabel: "0 s" }),
      L(96, "course-wrap-up-choosing-where-to-specialize-next", "Course Wrap-Up: Choosing Where to Specialize Next", { contentDir: "ch18/96-course-wrap-up-choosing-where-to-specialize-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cross-platform-dba/course-wrap-up-choosing-where-to-specialize-next.mp4", durationLabel: "20 s" }),
    ],
  },
];
