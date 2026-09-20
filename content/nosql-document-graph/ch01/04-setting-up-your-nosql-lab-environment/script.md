# Script — Setting Up Your NoSQL Lab Environment

## Segment 1 (title)

Every lesson from here forward assumes working MongoDB, Neo4j, and Cosmos DB environments in front of you. This lesson, the finale of Chapter 1, walks through real setup for all three, using free and local options — no paid infrastructure required.

## Segment 2 (code: MongoDB via Docker)

MongoDB publishes an official Docker image. One command gets you a MongoDB server listening on port 27017, isolated from your host system and trivially removable. If you'd rather install natively, MongoDB Community Server is covered step by step in Lesson 6.

## Segment 3 (code: Neo4j via Docker)

Neo4j's official image exposes two ports: 7474 for the Neo4j Browser, and 7687 for the Bolt protocol that drivers use to connect. The NEO4J_AUTH variable sets your initial username and password — Neo4j requires you to set credentials on first run.

## Segment 4 (steps: Cosmos DB options)

Cosmos DB is a cloud service, so your options differ. Azure's free tier gives you the real managed service at no cost. The Cosmos DB Emulator runs locally with no Azure account needed, though it won't reproduce multi-region behavior. Before moving on, confirm mongosh connects, the Neo4j Browser loads, and your Cosmos DB option responds.

## Segment 5 (outro)

With all three environments verified, you're ready for Chapter 2. Next up: MongoDB's real architecture — how databases, collections, and documents actually relate to each other.
