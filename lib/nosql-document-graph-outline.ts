// The full NoSQL, Document & Graph Databases course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Assumes SQL Server DBA knowledge from earlier in the
// catalog and applies that same DBA thinking to non-relational platforms —
// MongoDB (document), Azure Cosmos DB (multi-model, globally distributed),
// and Neo4j (graph) — covering how each stores, distributes, secures, and
// queries data when traditional relational modeling isn't the best fit.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/nosql-document-graph/
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

export const NOSQL_DOCUMENT_GRAPH_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Foundations: Why NoSQL?",
    lessons: [
      L(1, "course-introduction-from-relational-to-nosql-thinking", "Course Introduction: From Relational to NoSQL Thinking", { contentDir: "ch01/01-course-introduction-from-relational-to-nosql-thinking", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/course-introduction-from-relational-to-nosql-thinking.mp4", durationLabel: "1 min 15 s" }),
      L(2, "cap-theorem-base-and-nosql-trade-offs", "CAP Theorem, BASE & NoSQL Trade-offs", { contentDir: "ch01/02-cap-theorem-base-and-nosql-trade-offs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/cap-theorem-base-and-nosql-trade-offs.mp4", durationLabel: "1 min 38 s" }),
      L(3, "document-key-value-column-family-graph-models-compared", "Document, Key-Value, Column-Family & Graph Models Compared", { contentDir: "ch01/03-document-key-value-column-family-graph-models-compared", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/document-key-value-column-family-graph-models-compared.mp4", durationLabel: "1 min 43 s" }),
      L(4, "setting-up-your-nosql-lab-environment", "Setting Up Your NoSQL Lab Environment", { contentDir: "ch01/04-setting-up-your-nosql-lab-environment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/setting-up-your-nosql-lab-environment.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
  {
    n: 2,
    title: "MongoDB Architecture & Data Modeling",
    lessons: [
      L(5, "mongodb-architecture-documents-collections-databases", "MongoDB Architecture: Documents, Collections & Databases", { contentDir: "ch02/05-mongodb-architecture-documents-collections-databases", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/mongodb-architecture-documents-collections-databases.mp4", durationLabel: "1 min 35 s" }),
      L(6, "installing-mongodb-and-mongodb-compass", "Installing MongoDB & MongoDB Compass", { contentDir: "ch02/06-installing-mongodb-and-mongodb-compass", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/installing-mongodb-and-mongodb-compass.mp4", durationLabel: "1 min 25 s" }),
      L(7, "bson-and-the-mongodb-document-model", "BSON & the MongoDB Document Model", { contentDir: "ch02/07-bson-and-the-mongodb-document-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/bson-and-the-mongodb-document-model.mp4", durationLabel: "1 min 20 s" }),
      L(8, "embedding-vs-referencing-schema-design-patterns", "Embedding vs. Referencing: Schema Design Patterns", { contentDir: "ch02/08-embedding-vs-referencing-schema-design-patterns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/embedding-vs-referencing-schema-design-patterns.mp4", durationLabel: "1 min 11 s" }),
      L(9, "mongodb-shell-mongosh-and-crud-operations", "MongoDB Shell (mongosh) & CRUD Operations", { contentDir: "ch02/09-mongodb-shell-mongosh-and-crud-operations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/mongodb-shell-mongosh-and-crud-operations.mp4", durationLabel: "1 min 17 s" }),
      L(10, "data-modeling-for-real-world-mongodb-applications", "Data Modeling for Real-World MongoDB Applications", { contentDir: "ch02/10-data-modeling-for-real-world-mongodb-applications", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/data-modeling-for-real-world-mongodb-applications.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 3,
    title: "MongoDB Querying & Aggregation",
    lessons: [
      L(11, "the-mongodb-query-language-filters-and-projections", "The MongoDB Query Language: Filters & Projections", { contentDir: "ch03/11-the-mongodb-query-language-filters-and-projections", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/the-mongodb-query-language-filters-and-projections.mp4", durationLabel: "1 min 32 s" }),
      L(12, "aggregation-pipeline-fundamentals", "Aggregation Pipeline Fundamentals", { contentDir: "ch03/12-aggregation-pipeline-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/aggregation-pipeline-fundamentals.mp4", durationLabel: "1 min 38 s" }),
      L(13, "advanced-aggregation-lookup-group-facet", "Advanced Aggregation: $lookup, $group & $facet", { contentDir: "ch03/13-advanced-aggregation-lookup-group-facet", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/advanced-aggregation-lookup-group-facet.mp4", durationLabel: "1 min 31 s" }),
      L(14, "indexing-strategies-in-mongodb", "Indexing Strategies in MongoDB", { contentDir: "ch03/14-indexing-strategies-in-mongodb", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/indexing-strategies-in-mongodb.mp4", durationLabel: "1 min 30 s" }),
      L(15, "text-search-and-geospatial-queries-in-mongodb", "Text Search & Geospatial Queries in MongoDB", { contentDir: "ch03/15-text-search-and-geospatial-queries-in-mongodb", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/text-search-and-geospatial-queries-in-mongodb.mp4", durationLabel: "1 min 41 s" }),
      L(16, "query-performance-and-explain-in-mongodb", "Query Performance & explain() in MongoDB", { contentDir: "ch03/16-query-performance-and-explain-in-mongodb", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/query-performance-and-explain-in-mongodb.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 4,
    title: "MongoDB Security & Administration",
    lessons: [
      L(17, "mongodb-authentication-and-users", "MongoDB Authentication & Users", { contentDir: "ch04/17-mongodb-authentication-and-users", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/mongodb-authentication-and-users.mp4", durationLabel: "1 min 36 s" }),
      L(18, "role-based-access-control-in-mongodb", "Role-Based Access Control in MongoDB", { contentDir: "ch04/18-role-based-access-control-in-mongodb", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/role-based-access-control-in-mongodb.mp4", durationLabel: "1 min 24 s" }),
      L(19, "encryption-at-rest-and-in-transit-in-mongodb", "Encryption at Rest & in Transit in MongoDB", { contentDir: "ch04/19-encryption-at-rest-and-in-transit-in-mongodb", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/encryption-at-rest-and-in-transit-in-mongodb.mp4", durationLabel: "1 min 26 s" }),
      L(20, "auditing-and-mongodb-security-best-practices", "Auditing & MongoDB Security Best Practices", { contentDir: "ch04/20-auditing-and-mongodb-security-best-practices", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/auditing-and-mongodb-security-best-practices.mp4", durationLabel: "1 min 38 s" }),
      L(21, "mongodb-backup-and-restore-strategies", "MongoDB Backup & Restore Strategies", { contentDir: "ch04/21-mongodb-backup-and-restore-strategies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/mongodb-backup-and-restore-strategies.mp4", durationLabel: "1 min 35 s" }),
      L(22, "monitoring-mongodb-with-mongostat-and-atlas", "Monitoring MongoDB with mongostat & Atlas", { contentDir: "ch04/22-monitoring-mongodb-with-mongostat-and-atlas", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/monitoring-mongodb-with-mongostat-and-atlas.mp4", durationLabel: "1 min 27 s" }),
    ],
  },
  {
    n: 5,
    title: "MongoDB Distribution & Scaling",
    lessons: [
      L(23, "replica-sets-architecture-and-failover", "Replica Sets: Architecture & Failover", { contentDir: "ch05/23-replica-sets-architecture-and-failover", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/replica-sets-architecture-and-failover.mp4", durationLabel: "1 min 16 s" }),
      L(24, "configuring-a-mongodb-replica-set", "Configuring a MongoDB Replica Set", { contentDir: "ch05/24-configuring-a-mongodb-replica-set", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/configuring-a-mongodb-replica-set.mp4", durationLabel: "1 min 4 s" }),
      L(25, "sharding-fundamentals-and-choosing-a-shard-key", "Sharding Fundamentals & Choosing a Shard Key", { contentDir: "ch05/25-sharding-fundamentals-and-choosing-a-shard-key", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/sharding-fundamentals-and-choosing-a-shard-key.mp4", durationLabel: "1 min 12 s" }),
      L(26, "configuring-a-sharded-cluster", "Configuring a Sharded Cluster", { contentDir: "ch05/26-configuring-a-sharded-cluster", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/configuring-a-sharded-cluster.mp4", durationLabel: "1 min 10 s" }),
      L(27, "mongodb-atlas-managed-mongodb-in-the-cloud", "MongoDB Atlas: Managed MongoDB in the Cloud", { contentDir: "ch05/27-mongodb-atlas-managed-mongodb-in-the-cloud", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/mongodb-atlas-managed-mongodb-in-the-cloud.mp4", durationLabel: "1 min 22 s" }),
      L(28, "scaling-strategies-and-capacity-planning-in-mongodb", "Scaling Strategies & Capacity Planning in MongoDB", { contentDir: "ch05/28-scaling-strategies-and-capacity-planning-in-mongodb", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/scaling-strategies-and-capacity-planning-in-mongodb.mp4", durationLabel: "1 min 21 s" }),
    ],
  },
  {
    n: 6,
    title: "Cosmos DB Fundamentals & Modeling",
    lessons: [
      L(29, "azure-cosmos-db-overview-and-the-multi-model-engine", "Azure Cosmos DB Overview & the Multi-Model Engine", { contentDir: "ch06/29-azure-cosmos-db-overview-and-the-multi-model-engine", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/azure-cosmos-db-overview-and-the-multi-model-engine.mp4", durationLabel: "1 min 17 s" }),
      L(30, "cosmos-db-apis-core-mongodb-cassandra-gremlin-table", "Cosmos DB APIs: Core (SQL), MongoDB, Cassandra, Gremlin & Table", { contentDir: "ch06/30-cosmos-db-apis-core-mongodb-cassandra-gremlin-table", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/cosmos-db-apis-core-mongodb-cassandra-gremlin-table.mp4", durationLabel: "1 min 15 s" }),
      L(31, "provisioning-a-cosmos-db-account-and-container", "Provisioning a Cosmos DB Account & Container", { contentDir: "ch06/31-provisioning-a-cosmos-db-account-and-container", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/provisioning-a-cosmos-db-account-and-container.mp4", durationLabel: "1 min 14 s" }),
      L(32, "partitioning-in-cosmos-db-choosing-a-partition-key", "Partitioning in Cosmos DB: Choosing a Partition Key", { contentDir: "ch06/32-partitioning-in-cosmos-db-choosing-a-partition-key", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/partitioning-in-cosmos-db-choosing-a-partition-key.mp4", durationLabel: "1 min 19 s" }),
      L(33, "data-modeling-for-cosmos-dbs-core-api", "Data Modeling for Cosmos DB's Core API", { contentDir: "ch06/33-data-modeling-for-cosmos-dbs-core-api", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/data-modeling-for-cosmos-dbs-core-api.mp4", durationLabel: "1 min 26 s" }),
      L(34, "request-units-and-throughput-provisioning", "Request Units & Throughput Provisioning", { contentDir: "ch06/34-request-units-and-throughput-provisioning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/request-units-and-throughput-provisioning.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 7,
    title: "Cosmos DB Querying & Application Integration",
    lessons: [
      L(35, "the-cosmos-db-sql-query-language", "The Cosmos DB SQL Query Language", { contentDir: "ch07/35-the-cosmos-db-sql-query-language", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/the-cosmos-db-sql-query-language.mp4", durationLabel: "1 min 28 s" }),
      L(36, "stored-procedures-triggers-udfs-in-cosmos-db", "Stored Procedures, Triggers & UDFs in Cosmos DB", { contentDir: "ch07/36-stored-procedures-triggers-udfs-in-cosmos-db", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/stored-procedures-triggers-udfs-in-cosmos-db.mp4", durationLabel: "1 min 15 s" }),
      L(37, "change-feed-in-cosmos-db", "Change Feed in Cosmos DB", { contentDir: "ch07/37-change-feed-in-cosmos-db", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/change-feed-in-cosmos-db.mp4", durationLabel: "1 min 13 s" }),
      L(38, "indexing-policies-in-cosmos-db", "Indexing Policies in Cosmos DB", { contentDir: "ch07/38-indexing-policies-in-cosmos-db", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/indexing-policies-in-cosmos-db.mp4", durationLabel: "1 min 7 s" }),
      L(39, "connecting-applications-with-the-cosmos-db-sdk", "Connecting Applications with the Cosmos DB SDK", { contentDir: "ch07/39-connecting-applications-with-the-cosmos-db-sdk", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/connecting-applications-with-the-cosmos-db-sdk.mp4", durationLabel: "1 min 13 s" }),
      L(40, "cosmos-db-for-mongodb-and-cassandra-workloads", "Cosmos DB for MongoDB & Cassandra Workloads", { contentDir: "ch07/40-cosmos-db-for-mongodb-and-cassandra-workloads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/cosmos-db-for-mongodb-and-cassandra-workloads.mp4", durationLabel: "1 min 13 s" }),
    ],
  },
  {
    n: 8,
    title: "Cosmos DB Distribution & Consistency",
    lessons: [
      L(41, "global-distribution-and-multi-region-writes", "Global Distribution & Multi-Region Writes", { contentDir: "ch08/41-global-distribution-and-multi-region-writes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/global-distribution-and-multi-region-writes.mp4", durationLabel: "1 min 7 s" }),
      L(42, "consistency-levels-in-cosmos-db", "Consistency Levels in Cosmos DB", { contentDir: "ch08/42-consistency-levels-in-cosmos-db", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/consistency-levels-in-cosmos-db.mp4", durationLabel: "1 min 18 s" }),
      L(43, "conflict-resolution-in-multi-region-writes", "Conflict Resolution in Multi-Region Writes", { contentDir: "ch08/43-conflict-resolution-in-multi-region-writes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/conflict-resolution-in-multi-region-writes.mp4", durationLabel: "1 min 8 s" }),
      L(44, "autoscale-vs-manual-throughput-and-cost-optimization", "Autoscale vs. Manual Throughput & Cost Optimization", { contentDir: "ch08/44-autoscale-vs-manual-throughput-and-cost-optimization", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/autoscale-vs-manual-throughput-and-cost-optimization.mp4", durationLabel: "1 min 15 s" }),
      L(45, "cosmos-db-backup-and-restore", "Cosmos DB Backup & Restore", { contentDir: "ch08/45-cosmos-db-backup-and-restore", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/cosmos-db-backup-and-restore.mp4", durationLabel: "1 min 16 s" }),
      L(46, "designing-for-high-availability-in-cosmos-db", "Designing for High Availability in Cosmos DB", { contentDir: "ch08/46-designing-for-high-availability-in-cosmos-db", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/designing-for-high-availability-in-cosmos-db.mp4", durationLabel: "1 min 17 s" }),
    ],
  },
  {
    n: 9,
    title: "Cosmos DB Security & Operations",
    lessons: [
      L(47, "cosmos-db-security-keys-rbac-network-isolation", "Cosmos DB Security: Keys, RBAC & Network Isolation", { contentDir: "ch09/47-cosmos-db-security-keys-rbac-network-isolation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/cosmos-db-security-keys-rbac-network-isolation.mp4", durationLabel: "1 min 24 s" }),
      L(48, "private-endpoints-and-firewall-rules-for-cosmos-db", "Private Endpoints & Firewall Rules for Cosmos DB", { contentDir: "ch09/48-private-endpoints-and-firewall-rules-for-cosmos-db", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/private-endpoints-and-firewall-rules-for-cosmos-db.mp4", durationLabel: "1 min 20 s" }),
      L(49, "monitoring-cosmos-db-with-azure-monitor", "Monitoring Cosmos DB with Azure Monitor", { contentDir: "ch09/49-monitoring-cosmos-db-with-azure-monitor", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/monitoring-cosmos-db-with-azure-monitor.mp4", durationLabel: "1 min 20 s" }),
      L(50, "diagnosing-throttling-and-performance-issues", "Diagnosing Throttling & Performance Issues", { contentDir: "ch09/50-diagnosing-throttling-and-performance-issues", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/diagnosing-throttling-and-performance-issues.mp4", durationLabel: "2 min 1 s" }),
      L(51, "cosmos-db-well-architected-practices", "Cosmos DB Well-Architected Practices", { contentDir: "ch09/51-cosmos-db-well-architected-practices", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/cosmos-db-well-architected-practices.mp4", durationLabel: "1 min 55 s" }),
      L(52, "migrating-relational-data-into-cosmos-db", "Migrating Relational Data into Cosmos DB", { contentDir: "ch09/52-migrating-relational-data-into-cosmos-db", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/migrating-relational-data-into-cosmos-db.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 10,
    title: "Graph Database Fundamentals & Neo4j Architecture",
    lessons: [
      L(53, "why-graph-databases-nodes-relationships-properties", "Why Graph Databases? Nodes, Relationships & Properties", { contentDir: "ch10/53-why-graph-databases-nodes-relationships-properties", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/why-graph-databases-nodes-relationships-properties.mp4", durationLabel: "1 min 58 s" }),
      L(54, "neo4j-architecture-and-installation", "Neo4j Architecture & Installation", { contentDir: "ch10/54-neo4j-architecture-and-installation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/neo4j-architecture-and-installation.mp4", durationLabel: "1 min 49 s" }),
      L(55, "neo4j-browser-and-neo4j-desktop", "Neo4j Browser & Neo4j Desktop", { contentDir: "ch10/55-neo4j-browser-and-neo4j-desktop", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/neo4j-browser-and-neo4j-desktop.mp4", durationLabel: "1 min 23 s" }),
      L(56, "importing-data-into-neo4j-csv-load-csv", "Importing Data into Neo4j (CSV, LOAD CSV)", { contentDir: "ch10/56-importing-data-into-neo4j-csv-load-csv", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/importing-data-into-neo4j-csv-load-csv.mp4", durationLabel: "1 min 29 s" }),
      L(57, "graph-data-modeling-fundamentals", "Graph Data Modeling Fundamentals", { contentDir: "ch10/57-graph-data-modeling-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/graph-data-modeling-fundamentals.mp4", durationLabel: "1 min 38 s" }),
      L(58, "modeling-relational-data-as-a-graph", "Modeling Relational Data as a Graph", { contentDir: "ch10/58-modeling-relational-data-as-a-graph", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/modeling-relational-data-as-a-graph.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
  {
    n: 11,
    title: "Querying with Cypher",
    lessons: [
      L(59, "cypher-query-language-basics-match-and-return", "Cypher Query Language Basics: MATCH & RETURN", { contentDir: "ch11/59-cypher-query-language-basics-match-and-return", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/cypher-query-language-basics-match-and-return.mp4", durationLabel: "1 min 30 s" }),
      L(60, "filtering-sorting-and-aggregating-in-cypher", "Filtering, Sorting & Aggregating in Cypher", { contentDir: "ch11/60-filtering-sorting-and-aggregating-in-cypher", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/filtering-sorting-and-aggregating-in-cypher.mp4", durationLabel: "1 min 12 s" }),
      L(61, "creating-and-updating-data-with-cypher", "Creating & Updating Data with Cypher", { contentDir: "ch11/61-creating-and-updating-data-with-cypher", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/creating-and-updating-data-with-cypher.mp4", durationLabel: "1 min 23 s" }),
      L(62, "pattern-matching-and-variable-length-paths", "Pattern Matching & Variable-Length Paths", { contentDir: "ch11/62-pattern-matching-and-variable-length-paths", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/pattern-matching-and-variable-length-paths.mp4", durationLabel: "1 min 27 s" }),
      L(63, "subqueries-and-advanced-cypher-patterns", "Subqueries & Advanced Cypher Patterns", { contentDir: "ch11/63-subqueries-and-advanced-cypher-patterns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/subqueries-and-advanced-cypher-patterns.mp4", durationLabel: "1 min 13 s" }),
      L(64, "query-tuning-and-the-cypher-query-planner", "Query Tuning & the Cypher Query Planner", { contentDir: "ch11/64-query-tuning-and-the-cypher-query-planner", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/query-tuning-and-the-cypher-query-planner.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 12,
    title: "Graph Algorithms & Data Science",
    lessons: [
      L(65, "the-neo4j-graph-data-science-library", "The Neo4j Graph Data Science Library", { contentDir: "ch12/65-the-neo4j-graph-data-science-library", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/the-neo4j-graph-data-science-library.mp4", durationLabel: "1 min 32 s" }),
      L(66, "shortest-path-and-pathfinding-algorithms", "Shortest Path & Pathfinding Algorithms", { contentDir: "ch12/66-shortest-path-and-pathfinding-algorithms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/shortest-path-and-pathfinding-algorithms.mp4", durationLabel: "1 min 19 s" }),
      L(67, "pagerank-and-centrality-algorithms", "PageRank & Centrality Algorithms", { contentDir: "ch12/67-pagerank-and-centrality-algorithms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/pagerank-and-centrality-algorithms.mp4", durationLabel: "1 min 19 s" }),
      L(68, "community-detection-algorithms", "Community Detection Algorithms", { contentDir: "ch12/68-community-detection-algorithms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/community-detection-algorithms.mp4", durationLabel: "1 min 18 s" }),
      L(69, "node-similarity-and-recommendation-patterns", "Node Similarity & Recommendation Patterns", { contentDir: "ch12/69-node-similarity-and-recommendation-patterns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/node-similarity-and-recommendation-patterns.mp4", durationLabel: "1 min 17 s" }),
      L(70, "real-world-use-cases-fraud-detection-and-recommendations", "Real-World Use Cases: Fraud Detection & Recommendations", { contentDir: "ch12/70-real-world-use-cases-fraud-detection-and-recommendations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/real-world-use-cases-fraud-detection-and-recommendations.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
  {
    n: 13,
    title: "Neo4j Security & Operations",
    lessons: [
      L(71, "neo4j-authentication-and-role-based-access-control", "Neo4j Authentication & Role-Based Access Control", { contentDir: "ch13/71-neo4j-authentication-and-role-based-access-control", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/neo4j-authentication-and-role-based-access-control.mp4", durationLabel: "1 min 16 s" }),
      L(72, "neo4j-backup-and-restore", "Neo4j Backup & Restore", { contentDir: "ch13/72-neo4j-backup-and-restore", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/neo4j-backup-and-restore.mp4", durationLabel: "1 min 35 s" }),
      L(73, "causal-clustering-and-high-availability-in-neo4j", "Causal Clustering & High Availability in Neo4j", { contentDir: "ch13/73-causal-clustering-and-high-availability-in-neo4j", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/causal-clustering-and-high-availability-in-neo4j.mp4", durationLabel: "1 min 28 s" }),
      L(74, "performance-tuning-in-neo4j", "Performance Tuning in Neo4j", { contentDir: "ch13/74-performance-tuning-in-neo4j", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/performance-tuning-in-neo4j.mp4", durationLabel: "1 min 27 s" }),
      L(75, "neo4j-aura-managed-neo4j-in-the-cloud", "Neo4j Aura: Managed Neo4j in the Cloud", { contentDir: "ch13/75-neo4j-aura-managed-neo4j-in-the-cloud", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/neo4j-aura-managed-neo4j-in-the-cloud.mp4", durationLabel: "1 min 25 s" }),
      L(76, "monitoring-and-operating-neo4j-in-production", "Monitoring & Operating Neo4j in Production", { contentDir: "ch13/76-monitoring-and-operating-neo4j-in-production", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/monitoring-and-operating-neo4j-in-production.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 14,
    title: "Real-World Multi-Model Capstone & Career Prep",
    lessons: [
      L(77, "project-choosing-the-right-model-for-a-real-business-problem", "Project: Choosing the Right Model for a Real Business Problem", { contentDir: "ch14/77-project-choosing-the-right-model-for-a-real-business-problem", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/project-choosing-the-right-model-for-a-real-business-problem.mp4", durationLabel: "1 min 38 s" }),
      L(78, "project-connecting-mongodb-cosmos-db-neo4j-in-one-architecture", "Project: Connecting MongoDB, Cosmos DB & Neo4j in One Architecture", { contentDir: "ch14/78-project-connecting-mongodb-cosmos-db-neo4j-in-one-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/project-connecting-mongodb-cosmos-db-neo4j-in-one-architecture.mp4", durationLabel: "1 min 36 s" }),
      L(79, "nosql-and-graph-database-interview-preparation", "NoSQL & Graph Database Interview Preparation", { contentDir: "ch14/79-nosql-and-graph-database-interview-preparation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/nosql-and-graph-database-interview-preparation.mp4", durationLabel: "1 min 53 s" }),
      L(80, "course-wrap-up-where-nosql-fits-in-your-dba-career", "Course Wrap-Up: Where NoSQL Fits in Your DBA Career", { contentDir: "ch14/80-course-wrap-up-where-nosql-fits-in-your-dba-career", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-nosql-document-graph/course-wrap-up-where-nosql-fits-in-your-dba-career.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
];
