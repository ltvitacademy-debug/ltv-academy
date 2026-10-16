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
      L(1, "what-is-kafka", "What Is Kafka & Why Event Streaming?", {
        contentDir: "ch01/01-what-is-kafka",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147977/ltv-kafka/what-is-kafka.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(2, "topics-partitions-offsets", "Topics, Partitions & Offsets", {
        contentDir: "ch01/02-topics-partitions-offsets",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148046/ltv-kafka/topics-partitions-offsets.mp4",
        durationLabel: "1 min 20 s",
      }),
      L(3, "producers-and-consumers", "Producers & Consumers", {
        contentDir: "ch01/03-producers-and-consumers",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148102/ltv-kafka/producers-and-consumers.mp4",
        durationLabel: "1 min 5 s",
      }),
      L(4, "brokers-and-clusters", "Brokers & Clusters", {
        contentDir: "ch01/04-brokers-and-clusters",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148177/ltv-kafka/brokers-and-clusters.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(5, "kafka-vs-other-streaming-tools", "Kafka vs. Other Streaming Tools", {
        contentDir: "ch01/05-kafka-vs-other-streaming-tools",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148238/ltv-kafka/kafka-vs-other-streaming-tools.mp4",
        durationLabel: "1 min 34 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Producing & Consuming",
    lessons: [
      L(6, "producer-basics", "Producer Basics", {
        contentDir: "ch02/06-producer-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148301/ltv-kafka/producer-basics.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(7, "consumer-basics", "Consumer Basics", {
        contentDir: "ch02/07-consumer-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148349/ltv-kafka/consumer-basics.mp4",
        durationLabel: "1 min 14 s",
      }),
      L(8, "consumer-groups", "Consumer Groups", {
        contentDir: "ch02/08-consumer-groups",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148406/ltv-kafka/consumer-groups.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(9, "delivery-semantics", "Delivery Semantics: At-Most/At-Least/Exactly-Once", {
        contentDir: "ch02/09-delivery-semantics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148469/ltv-kafka/delivery-semantics.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(10, "serialization-formats", "Serialization Formats: Avro & JSON", {
        contentDir: "ch02/10-serialization-formats",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148516/ltv-kafka/serialization-formats.mp4",
        durationLabel: "1 min 5 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Kafka Architecture Deep Dive",
    lessons: [
      L(11, "replication-and-fault-tolerance", "Replication & Fault Tolerance", {
        contentDir: "ch03/11-replication-and-fault-tolerance",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148571/ltv-kafka/replication-and-fault-tolerance.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(12, "partitioning-strategy", "Partitioning Strategy", {
        contentDir: "ch03/12-partitioning-strategy",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148622/ltv-kafka/partitioning-strategy.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(13, "retention", "Retention", {
        contentDir: "ch03/13-retention",
        // videoUrl/durationLabel pending
      }),
      L(14, "zookeeper-vs-kraft", "ZooKeeper vs. KRaft", {
        contentDir: "ch03/14-zookeeper-vs-kraft",
        // videoUrl/durationLabel pending
      }),
      L(15, "schema-registry", "Schema Registry", {
        contentDir: "ch03/15-schema-registry",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 4,
    title: "Kafka Connect & Stream Processing",
    lessons: [
      L(16, "kafka-connect-overview", "Kafka Connect Overview", {
        contentDir: "ch04/16-kafka-connect-overview",
        // videoUrl/durationLabel pending
      }),
      L(17, "source-and-sink-connectors", "Source & Sink Connectors", {
        contentDir: "ch04/17-source-and-sink-connectors",
        // videoUrl/durationLabel pending
      }),
      L(18, "kafka-streams-basics", "Kafka Streams Basics", {
        contentDir: "ch04/18-kafka-streams-basics",
        // videoUrl/durationLabel pending
      }),
      L(19, "ksqldb-basics", "ksqlDB Basics", {
        contentDir: "ch04/19-ksqldb-basics",
        // videoUrl/durationLabel pending
      }),
      L(20, "comparing-to-fabric-eventstreams", "Comparing Kafka to Fabric Eventstreams", {
        contentDir: "ch04/20-comparing-to-fabric-eventstreams",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 5,
    title: "Kafka in the Cloud",
    lessons: [
      L(21, "confluent-cloud", "Confluent Cloud", {
        contentDir: "ch05/21-confluent-cloud",
        // videoUrl/durationLabel pending
      }),
      L(22, "azure-event-hubs-kafka-compatibility", "Azure Event Hubs' Kafka Compatibility", {
        contentDir: "ch05/22-azure-event-hubs-kafka-compatibility",
        // videoUrl/durationLabel pending
      }),
      L(23, "managed-vs-self-hosted", "Managed vs. Self-Hosted Kafka", {
        contentDir: "ch05/23-managed-vs-self-hosted",
        // videoUrl/durationLabel pending
      }),
      L(24, "monitoring-kafka", "Monitoring Kafka", {
        contentDir: "ch05/24-monitoring-kafka",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 6,
    title: "Practical Patterns",
    lessons: [
      L(25, "a-real-producer-to-consumer-pipeline", "A Real Producer-to-Kafka-to-Consumer Pipeline", {
        contentDir: "ch06/25-a-real-producer-to-consumer-pipeline",
        // videoUrl/durationLabel pending
      }),
      L(26, "kafka-plus-snowflake-and-databricks", "Kafka + Snowflake & Databricks", {
        contentDir: "ch06/26-kafka-plus-snowflake-and-databricks",
        // videoUrl/durationLabel pending
      }),
      L(27, "error-handling-in-streaming-pipelines", "Error Handling in Streaming Pipelines", {
        contentDir: "ch06/27-error-handling-in-streaming-pipelines",
        // videoUrl/durationLabel pending
      }),
      L(28, "kafka-security-basics", "Kafka Security Basics", {
        contentDir: "ch06/28-kafka-security-basics",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-project", "Capstone: A Real-Time Event Pipeline on Kafka", {
        contentDir: "ch07/29-capstone-project",
        // videoUrl/durationLabel pending
      }),
      L(30, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch07/30-capstone-wrap-up",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
