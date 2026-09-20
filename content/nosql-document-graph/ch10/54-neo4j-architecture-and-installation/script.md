# Script — Neo4j Architecture & Installation

## Segment 1 (title)

Before writing a single Cypher query, it's worth understanding what Neo4j actually is under the hood, and getting an instance running. This lesson covers native graph storage and the three real ways to install Neo4j today.

## Segment 2 (code: native graph storage)

Neo4j uses native graph storage — nodes and relationships are physically persisted as graph structures on disk, not simulated on top of a relational or key-value engine. That's the storage-level foundation behind index-free adjacency. It runs on the JVM and exposes Bolt on port 7687 for drivers and Cypher clients, and HTTP on 7474 for Neo4j Browser.

## Segment 3 (steps: three install paths)

Neo4j Desktop is a free local app for managing database instances — the natural choice for learning, and what this chapter's labs use. Docker offers an official neo4j image, good for disposable environments or CI. And Neo4j Aura is the fully managed cloud service, with a free tier, conceptually the Neo4j equivalent of choosing Cosmos DB over self-hosting SQL Server.

## Segment 4 (code: Docker in practice)

Running the official image means mapping both ports, 7474 and 7687, and setting the initial auth with an environment variable. Mount a volume for the /data directory if the database needs to survive a container restart, then browse to localhost:7474 once it's up.

## Segment 5 (outro)

That's an instance running one of three real ways. Next up: actually working with Neo4j Browser and Neo4j Desktop, the tools you'll use for the rest of this chapter's labs.
