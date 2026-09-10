// The full Kafka / Event Streaming course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes the windowing/watermark/streaming concepts already
// taught in Microsoft Fabric & Real-Time Analytics — this course teaches
// Kafka's own architecture and where it fits alongside what students
// already know about real-time data.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/kafka/
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

export const KAFKA_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Event Streaming Fundamentals",
    lessons: [
      L(1, "what-is-kafka", "What Is Kafka & Why Event Streaming?"),
      L(2, "topics-partitions-offsets", "Topics, Partitions & Offsets"),
      L(3, "producers-and-consumers", "Producers & Consumers"),
      L(4, "brokers-and-clusters", "Brokers & Clusters"),
      L(5, "kafka-vs-other-streaming-tools", "Kafka vs. Other Streaming Tools"),
    ],
  },
  {
    n: 2,
    title: "Producing & Consuming",
    lessons: [
      L(6, "producer-basics", "Producer Basics"),
      L(7, "consumer-basics", "Consumer Basics"),
      L(8, "consumer-groups", "Consumer Groups"),
      L(9, "delivery-semantics", "Delivery Semantics: At-Most/At-Least/Exactly-Once"),
      L(10, "serialization-formats", "Serialization Formats: Avro & JSON"),
    ],
  },
  {
    n: 3,
    title: "Kafka Architecture Deep Dive",
    lessons: [
      L(11, "replication-and-fault-tolerance", "Replication & Fault Tolerance"),
      L(12, "partitioning-strategy", "Partitioning Strategy"),
      L(13, "retention", "Retention"),
      L(14, "zookeeper-vs-kraft", "ZooKeeper vs. KRaft"),
      L(15, "schema-registry", "Schema Registry"),
    ],
  },
  {
    n: 4,
    title: "Kafka Connect & Stream Processing",
    lessons: [
      L(16, "kafka-connect-overview", "Kafka Connect Overview"),
      L(17, "source-and-sink-connectors", "Source & Sink Connectors"),
      L(18, "kafka-streams-basics", "Kafka Streams Basics"),
      L(19, "ksqldb-basics", "ksqlDB Basics"),
      L(20, "comparing-to-fabric-eventstreams", "Comparing Kafka to Fabric Eventstreams"),
    ],
  },
  {
    n: 5,
    title: "Kafka in the Cloud",
    lessons: [
      L(21, "confluent-cloud", "Confluent Cloud"),
      L(22, "azure-event-hubs-kafka-compatibility", "Azure Event Hubs' Kafka Compatibility"),
      L(23, "managed-vs-self-hosted", "Managed vs. Self-Hosted Kafka"),
      L(24, "monitoring-kafka", "Monitoring Kafka"),
    ],
  },
  {
    n: 6,
    title: "Practical Patterns",
    lessons: [
      L(25, "a-real-producer-to-consumer-pipeline", "A Real Producer-to-Kafka-to-Consumer Pipeline"),
      L(26, "kafka-plus-snowflake-and-databricks", "Kafka + Snowflake & Databricks"),
      L(27, "error-handling-in-streaming-pipelines", "Error Handling in Streaming Pipelines"),
      L(28, "kafka-security-basics", "Kafka Security Basics"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-project", "Capstone: A Real-Time Event Pipeline on Kafka"),
      L(30, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
