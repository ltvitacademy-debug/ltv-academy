# Setting Up Your NoSQL Lab Environment

Every lesson from here forward assumes you have working MongoDB, Neo4j, and Cosmos DB
environments in front of you — this course is hands-on, and reading about `insertOne` or
Cypher `MATCH` clauses without running them yourself won't build real skill. This lesson,
the finale of Chapter 1, walks through the real, practical setup for all three platforms
using free, local, or free-tier options. No paid infrastructure is required for this
course.

## What you'll learn

- Running MongoDB locally with Docker, the fastest reliable path for this course
- Running Neo4j locally with Docker in the same way
- Your two real options for Cosmos DB: a free Azure account, or the local emulator
- What to verify before moving into Chapter 2

## MongoDB: Docker or Community Server

You have two real, legitimate options for a local MongoDB instance:

1. **Docker** (recommended for this course) — MongoDB publishes an official image on
   Docker Hub. With Docker Desktop installed, running:
   ```
   docker run -d --name mongodb -p 27017:27017 mongo:latest
   ```
   gives you a MongoDB server listening on the default port 27017, isolated from your
   host system, and trivially removable when you're done.
2. **MongoDB Community Server** — a native installer for Windows, macOS, or Linux,
   downloaded directly from MongoDB's own site. This installs MongoDB as a local service
   running the same way it would on a real server. Covered in detail, step by step, in
   Lesson 6.

Either path gets you a working `mongod` process on port 27017. Chapter 2 covers
installing MongoDB Compass, the official GUI, against whichever one you choose.

## Neo4j: Docker is the fastest path

Neo4j also publishes an official Docker image. The equivalent command:
```
docker run -d --name neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/yourpassword neo4j:latest
```
exposes two ports: 7474 for the Neo4j Browser (a web-based query interface you'll use
starting in Chapter 10) and 7687 for the Bolt protocol that drivers and `cypher-shell`
use to connect. The `NEO4J_AUTH` environment variable sets the initial username and
password — Neo4j requires you to set credentials on first run rather than defaulting to
an open instance. Neo4j Desktop, a native application for managing local Neo4j instances
without Docker, is the alternative covered alongside Neo4j Browser in Lesson 55.

## Cosmos DB: free tier account or local emulator

Cosmos DB is fundamentally a cloud service, so your two real options differ from
MongoDB and Neo4j:

1. **Azure free account / Cosmos DB free tier** — Azure offers a free tier that includes
   a certain amount of Cosmos DB request-unit throughput and storage at no cost,
   sufficient for working through this course's exercises. This is the closer-to-real
   option, since you're working against the actual managed service with actual global
   distribution features available (even if you only use one region).
2. **Azure Cosmos DB Emulator** — a free, locally-installable emulator (Windows, or via a
   Docker container for Linux/macOS) that reproduces the Cosmos DB Core (SQL) API on your
   own machine, with no Azure account or internet connection required. It's the right
   choice if you'd rather not create a cloud account yet, though it doesn't reproduce
   multi-region distribution behavior — you'll want the real free-tier account by the
   time you reach Chapter 8 on global distribution.

Provisioning a real Cosmos DB account and container is covered step by step in Lesson 31.

## Verifying your setup before Chapter 2

Before moving on, confirm each piece is actually reachable:

- MongoDB: a `mongosh` connection to `localhost:27017` succeeds (Lesson 9 covers mongosh
  in depth; for now, just confirming the port responds is enough).
- Neo4j: opening `http://localhost:7474` in a browser shows the Neo4j Browser login
  screen, and logging in with the credentials you set works.
- Cosmos DB: either the Azure Portal shows your provisioned account, or the emulator's
  local endpoint (typically `https://localhost:8081`) loads its data explorer.

## Key terms

| Term | Meaning |
|---|---|
| Docker image | A packaged, runnable snapshot of software (e.g. `mongo:latest`) that runs identically across machines |
| Bolt protocol | Neo4j's binary protocol (port 7687) used by drivers and `cypher-shell` to connect |
| Cosmos DB Emulator | A free, local reproduction of the Cosmos DB Core API, requiring no Azure account |
| Free tier | A no-cost allotment of cloud resources (here, Cosmos DB request units and storage) sufficient for learning |

## Check yourself

You'd rather not create an Azure account yet but still want to follow along with Cosmos
DB exercises early in this course. What's your real option, and what real limitation
does it come with?
