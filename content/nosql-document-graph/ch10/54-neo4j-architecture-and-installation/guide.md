# Neo4j Architecture & Installation

Before writing a single Cypher query, it's worth understanding what Neo4j actually is
under the hood, and getting an instance running to work against for the rest of this
chapter. This lesson covers Neo4j's storage architecture — what "native graph storage"
really means — and the three real, current ways to install it, whether that's a local
desktop app, a container, or a fully managed cloud instance.

## What you'll learn

- What "native graph storage" means, and why it's different from a graph API layered on
  top of a relational or key-value engine
- The three real installation paths for Neo4j: Desktop, Docker, and Aura
- Which option fits a lab environment versus a production deployment

## Native graph storage

Some products offer a "graph API" on top of a different underlying storage engine — a
relational or key-value store with a query layer that presents relationships as a graph.
Neo4j is not that. It uses **native graph storage**, meaning nodes and relationships are
physically persisted on disk as graph structures from the ground up, with relationships
stored as direct references between node records — this is the storage-level foundation
that makes the index-free adjacency from the previous lesson possible. There's no JOIN
being simulated underneath; the graph *is* the storage model, not a view on top of one.

Neo4j runs on the **JVM** (Java Virtual Machine), and a running instance exposes two ports
by default: the **Bolt** protocol (port 7687), the efficient binary protocol drivers and
Cypher clients use to actually query the database, and an **HTTP** port (7474) that serves
Neo4j Browser, the web-based query and visualization tool covered in the next lesson.

## Three real ways to install Neo4j

1. **Neo4j Desktop** — a free desktop application (Windows, macOS, Linux) that manages one
   or more local database instances, lets you create and switch between projects, and
   opens Neo4j Browser against them with one click. This is the natural choice for local
   learning and development, and the one used for the rest of this chapter's lab work.
   - Download and install Neo4j Desktop from the official Neo4j site
   - Create a new Project, then add a new local DBMS (database instance) inside it,
     choosing a Neo4j version and setting an initial password
   - Start the DBMS from Desktop; once it shows **Active**, open it in Neo4j Browser

2. **Docker** — Neo4j publishes an official `neo4j` image on Docker Hub, the practical
   choice for a disposable lab environment, CI pipelines, or running alongside other
   containerized services.
   - Pull and run the official image, mapping both ports: `docker run -p 7474:7474 -p
     7687:7687 -e NEO4J_AUTH=neo4j/<password> neo4j`
   - Mount a volume for `/data` if the database needs to persist across container restarts
   - Browse to `http://localhost:7474` once the container is running

3. **Neo4j Aura** — Neo4j's fully managed, cloud-hosted DBaaS offering (with a free tier for
   learning), the production-equivalent choice when you don't want to operate the
   infrastructure yourself — conceptually the Neo4j equivalent of choosing Cosmos DB over
   self-hosting SQL Server on a VM. Aura is covered in more depth later in this course; it's
   introduced here because it's a legitimate way to get a working instance without a local
   install at all.
   - Sign up and create a free or paid Aura instance from the Neo4j Aura console
   - Aura generates and displays connection credentials once at instance creation — save
     them immediately, since the password isn't retrievable afterward
   - Connect via the provided connection URI in Neo4j Browser or any Bolt-compatible driver

## Key terms

| Term | Meaning |
|---|---|
| Native graph storage | Nodes and relationships physically persisted as graph structures on disk, not simulated via a relational or key-value layer |
| Bolt protocol | Neo4j's efficient binary protocol (port 7687) used by drivers and Cypher clients to query the database |
| Neo4j Desktop | Free local application for managing and running Neo4j database instances during development |
| Neo4j Aura | Neo4j's fully managed cloud database service |

## Check yourself

What does it mean that Neo4j uses "native graph storage," and why does that matter for
the traversal performance discussed in the previous lesson?
