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
      L(1, "course-introduction-from-relational-to-nosql-thinking", "Course Introduction: From Relational to NoSQL Thinking"),
      L(2, "cap-theorem-base-and-nosql-trade-offs", "CAP Theorem, BASE & NoSQL Trade-offs"),
      L(3, "document-key-value-column-family-graph-models-compared", "Document, Key-Value, Column-Family & Graph Models Compared"),
      L(4, "setting-up-your-nosql-lab-environment", "Setting Up Your NoSQL Lab Environment"),
    ],
  },
  {
    n: 2,
    title: "MongoDB Architecture & Data Modeling",
    lessons: [
      L(5, "mongodb-architecture-documents-collections-databases", "MongoDB Architecture: Documents, Collections & Databases"),
      L(6, "installing-mongodb-and-mongodb-compass", "Installing MongoDB & MongoDB Compass"),
      L(7, "bson-and-the-mongodb-document-model", "BSON & the MongoDB Document Model"),
      L(8, "embedding-vs-referencing-schema-design-patterns", "Embedding vs. Referencing: Schema Design Patterns"),
      L(9, "mongodb-shell-mongosh-and-crud-operations", "MongoDB Shell (mongosh) & CRUD Operations"),
      L(10, "data-modeling-for-real-world-mongodb-applications", "Data Modeling for Real-World MongoDB Applications"),
    ],
  },
  {
    n: 3,
    title: "MongoDB Querying & Aggregation",
    lessons: [
      L(11, "the-mongodb-query-language-filters-and-projections", "The MongoDB Query Language: Filters & Projections"),
      L(12, "aggregation-pipeline-fundamentals", "Aggregation Pipeline Fundamentals"),
      L(13, "advanced-aggregation-lookup-group-facet", "Advanced Aggregation: $lookup, $group & $facet"),
      L(14, "indexing-strategies-in-mongodb", "Indexing Strategies in MongoDB"),
      L(15, "text-search-and-geospatial-queries-in-mongodb", "Text Search & Geospatial Queries in MongoDB"),
      L(16, "query-performance-and-explain-in-mongodb", "Query Performance & explain() in MongoDB"),
    ],
  },
  {
    n: 4,
    title: "MongoDB Security & Administration",
    lessons: [
      L(17, "mongodb-authentication-and-users", "MongoDB Authentication & Users"),
      L(18, "role-based-access-control-in-mongodb", "Role-Based Access Control in MongoDB"),
      L(19, "encryption-at-rest-and-in-transit-in-mongodb", "Encryption at Rest & in Transit in MongoDB"),
      L(20, "auditing-and-mongodb-security-best-practices", "Auditing & MongoDB Security Best Practices"),
      L(21, "mongodb-backup-and-restore-strategies", "MongoDB Backup & Restore Strategies"),
      L(22, "monitoring-mongodb-with-mongostat-and-atlas", "Monitoring MongoDB with mongostat & Atlas"),
    ],
  },
  {
    n: 5,
    title: "MongoDB Distribution & Scaling",
    lessons: [
      L(23, "replica-sets-architecture-and-failover", "Replica Sets: Architecture & Failover"),
      L(24, "configuring-a-mongodb-replica-set", "Configuring a MongoDB Replica Set"),
      L(25, "sharding-fundamentals-and-choosing-a-shard-key", "Sharding Fundamentals & Choosing a Shard Key"),
      L(26, "configuring-a-sharded-cluster", "Configuring a Sharded Cluster"),
      L(27, "mongodb-atlas-managed-mongodb-in-the-cloud", "MongoDB Atlas: Managed MongoDB in the Cloud"),
      L(28, "scaling-strategies-and-capacity-planning-in-mongodb", "Scaling Strategies & Capacity Planning in MongoDB"),
    ],
  },
  {
    n: 6,
    title: "Cosmos DB Fundamentals & Modeling",
    lessons: [
      L(29, "azure-cosmos-db-overview-and-the-multi-model-engine", "Azure Cosmos DB Overview & the Multi-Model Engine"),
      L(30, "cosmos-db-apis-core-mongodb-cassandra-gremlin-table", "Cosmos DB APIs: Core (SQL), MongoDB, Cassandra, Gremlin & Table"),
      L(31, "provisioning-a-cosmos-db-account-and-container", "Provisioning a Cosmos DB Account & Container"),
      L(32, "partitioning-in-cosmos-db-choosing-a-partition-key", "Partitioning in Cosmos DB: Choosing a Partition Key"),
      L(33, "data-modeling-for-cosmos-dbs-core-api", "Data Modeling for Cosmos DB's Core API"),
      L(34, "request-units-and-throughput-provisioning", "Request Units & Throughput Provisioning"),
    ],
  },
  {
    n: 7,
    title: "Cosmos DB Querying & Application Integration",
    lessons: [
      L(35, "the-cosmos-db-sql-query-language", "The Cosmos DB SQL Query Language"),
      L(36, "stored-procedures-triggers-udfs-in-cosmos-db", "Stored Procedures, Triggers & UDFs in Cosmos DB"),
      L(37, "change-feed-in-cosmos-db", "Change Feed in Cosmos DB"),
      L(38, "indexing-policies-in-cosmos-db", "Indexing Policies in Cosmos DB"),
      L(39, "connecting-applications-with-the-cosmos-db-sdk", "Connecting Applications with the Cosmos DB SDK"),
      L(40, "cosmos-db-for-mongodb-and-cassandra-workloads", "Cosmos DB for MongoDB & Cassandra Workloads"),
    ],
  },
  {
    n: 8,
    title: "Cosmos DB Distribution & Consistency",
    lessons: [
      L(41, "global-distribution-and-multi-region-writes", "Global Distribution & Multi-Region Writes"),
      L(42, "consistency-levels-in-cosmos-db", "Consistency Levels in Cosmos DB"),
      L(43, "conflict-resolution-in-multi-region-writes", "Conflict Resolution in Multi-Region Writes"),
      L(44, "autoscale-vs-manual-throughput-and-cost-optimization", "Autoscale vs. Manual Throughput & Cost Optimization"),
      L(45, "cosmos-db-backup-and-restore", "Cosmos DB Backup & Restore"),
      L(46, "designing-for-high-availability-in-cosmos-db", "Designing for High Availability in Cosmos DB"),
    ],
  },
  {
    n: 9,
    title: "Cosmos DB Security & Operations",
    lessons: [
      L(47, "cosmos-db-security-keys-rbac-network-isolation", "Cosmos DB Security: Keys, RBAC & Network Isolation"),
      L(48, "private-endpoints-and-firewall-rules-for-cosmos-db", "Private Endpoints & Firewall Rules for Cosmos DB"),
      L(49, "monitoring-cosmos-db-with-azure-monitor", "Monitoring Cosmos DB with Azure Monitor"),
      L(50, "diagnosing-throttling-and-performance-issues", "Diagnosing Throttling & Performance Issues"),
      L(51, "cosmos-db-well-architected-practices", "Cosmos DB Well-Architected Practices"),
      L(52, "migrating-relational-data-into-cosmos-db", "Migrating Relational Data into Cosmos DB"),
    ],
  },
  {
    n: 10,
    title: "Graph Database Fundamentals & Neo4j Architecture",
    lessons: [
      L(53, "why-graph-databases-nodes-relationships-properties", "Why Graph Databases? Nodes, Relationships & Properties"),
      L(54, "neo4j-architecture-and-installation", "Neo4j Architecture & Installation"),
      L(55, "neo4j-browser-and-neo4j-desktop", "Neo4j Browser & Neo4j Desktop"),
      L(56, "importing-data-into-neo4j-csv-load-csv", "Importing Data into Neo4j (CSV, LOAD CSV)"),
      L(57, "graph-data-modeling-fundamentals", "Graph Data Modeling Fundamentals"),
      L(58, "modeling-relational-data-as-a-graph", "Modeling Relational Data as a Graph"),
    ],
  },
  {
    n: 11,
    title: "Querying with Cypher",
    lessons: [
      L(59, "cypher-query-language-basics-match-and-return", "Cypher Query Language Basics: MATCH & RETURN"),
      L(60, "filtering-sorting-and-aggregating-in-cypher", "Filtering, Sorting & Aggregating in Cypher"),
      L(61, "creating-and-updating-data-with-cypher", "Creating & Updating Data with Cypher"),
      L(62, "pattern-matching-and-variable-length-paths", "Pattern Matching & Variable-Length Paths"),
      L(63, "subqueries-and-advanced-cypher-patterns", "Subqueries & Advanced Cypher Patterns"),
      L(64, "query-tuning-and-the-cypher-query-planner", "Query Tuning & the Cypher Query Planner"),
    ],
  },
  {
    n: 12,
    title: "Graph Algorithms & Data Science",
    lessons: [
      L(65, "the-neo4j-graph-data-science-library", "The Neo4j Graph Data Science Library"),
      L(66, "shortest-path-and-pathfinding-algorithms", "Shortest Path & Pathfinding Algorithms"),
      L(67, "pagerank-and-centrality-algorithms", "PageRank & Centrality Algorithms"),
      L(68, "community-detection-algorithms", "Community Detection Algorithms"),
      L(69, "node-similarity-and-recommendation-patterns", "Node Similarity & Recommendation Patterns"),
      L(70, "real-world-use-cases-fraud-detection-and-recommendations", "Real-World Use Cases: Fraud Detection & Recommendations"),
    ],
  },
  {
    n: 13,
    title: "Neo4j Security & Operations",
    lessons: [
      L(71, "neo4j-authentication-and-role-based-access-control", "Neo4j Authentication & Role-Based Access Control"),
      L(72, "neo4j-backup-and-restore", "Neo4j Backup & Restore"),
      L(73, "causal-clustering-and-high-availability-in-neo4j", "Causal Clustering & High Availability in Neo4j"),
      L(74, "performance-tuning-in-neo4j", "Performance Tuning in Neo4j"),
      L(75, "neo4j-aura-managed-neo4j-in-the-cloud", "Neo4j Aura: Managed Neo4j in the Cloud"),
      L(76, "monitoring-and-operating-neo4j-in-production", "Monitoring & Operating Neo4j in Production"),
    ],
  },
  {
    n: 14,
    title: "Real-World Multi-Model Capstone & Career Prep",
    lessons: [
      L(77, "project-choosing-the-right-model-for-a-real-business-problem", "Project: Choosing the Right Model for a Real Business Problem"),
      L(78, "project-connecting-mongodb-cosmos-db-neo4j-in-one-architecture", "Project: Connecting MongoDB, Cosmos DB & Neo4j in One Architecture"),
      L(79, "nosql-and-graph-database-interview-preparation", "NoSQL & Graph Database Interview Preparation"),
      L(80, "course-wrap-up-where-nosql-fits-in-your-dba-career", "Course Wrap-Up: Where NoSQL Fits in Your DBA Career"),
    ],
  },
];
