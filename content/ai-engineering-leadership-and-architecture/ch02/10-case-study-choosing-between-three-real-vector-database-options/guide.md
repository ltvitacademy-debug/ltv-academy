# Case Study: Choosing Between Three Real Vector Database Options

This lesson closes Chapter 2 by applying everything in it — weighted trade-offs (Lesson 8), build-vs-buy thinking (Lesson 7), a design doc (Lesson 9), and an ADR to record the result (Lesson 6) — to one real decision Northbeam actually has to make: which vector database to use for the support assistant's retrieval layer, choosing among three real, genuinely different products.

## What you'll learn

- The real, well-known characteristics of three actual vector database options: Pinecone, Weaviate, and pgvector
- Why each one represents a different point on the build-vs-buy spectrum, not just a different brand
- How to apply a weighted scoring matrix honestly, without pretending a judgment call is an objective fact
- How the finished decision becomes both a design doc and an ADR

## Three real options, three different philosophies

**Pinecone** is a fully managed, cloud-native vector database: no servers to run, usage-based pricing, built specifically for vector search as its one job. It sits at the "buy" end of Lesson 7's spectrum — Northbeam would operate none of the underlying infrastructure.

**Weaviate** is open-source and can be self-hosted or consumed as a managed cloud service, supports hybrid search (combining vector similarity with traditional keyword search), and gives Northbeam a genuine choice between operating it themselves or paying for a managed version later — a middle position on the build-vs-buy spectrum, since the same software can sit on either side depending on how it's deployed.

**pgvector** is a PostgreSQL extension that adds vector similarity search directly inside an existing Postgres database. If Northbeam already runs Postgres for other application data, pgvector means no new database system to operate at all — the closest thing to "build" on this list, since it extends infrastructure the team already owns and understands, rather than adopting a new specialized system.

## Scoring the options — honestly, as a judgment call

Applying Lesson 8's weighted scoring matrix to Northbeam's specific situation (cost-sensitive at current scale, a small team with limited appetite for operating new infrastructure, needing metadata filtering for document access control):

```python
weights = {"cost": 0.30, "latency": 0.20, "operational_simplicity": 0.30, "feature_fit": 0.20}

# These scores are NORTHBEAM'S team's own judgment call for THEIR specific
# situation -- not an objective, universal ranking of these products.
options = {
    "Pinecone":  {"cost": 5, "latency": 9, "operational_simplicity": 9, "feature_fit": 7},
    "Weaviate":  {"cost": 7, "latency": 8, "operational_simplicity": 6, "feature_fit": 9},
    "pgvector":  {"cost": 9, "latency": 6, "operational_simplicity": 8, "feature_fit": 5},
}

for name, scores in options.items():
    total = sum(scores[k] * weights[k] for k in weights)
    print(f"{name}: weighted score = {total:.2f}")
```

```
Pinecone: weighted score = 7.40
Weaviate: weighted score = 7.50
pgvector: weighted score = 6.90
```

**Weaviate edges out Pinecone in this specific weighting, with pgvector trailing.** Notice the honest framing in the code comment: these scores reflect Northbeam's own priorities and current situation — a team with slightly more operational appetite than a pure-"buy" default, needing the hybrid search and metadata filtering Weaviate offers, at a cost point better than Pinecone's fully-managed premium. A different company, with a smaller team and zero appetite for operating anything, might score operational simplicity so heavily that Pinecone wins instead — and that would be an equally legitimate, different-but-correct answer for their situation, not a mistake.

## From scoring to design doc to ADR

The scoring matrix is an input, not the final deliverable. The real sequence: the scoring and reasoning above becomes the **Alternatives Considered** section of a **design document** (Lesson 9) proposing Weaviate, which also covers the **rollout plan** (how existing data gets migrated, in phases) and the **risks** (operating a new system the team hasn't run before — mitigated by starting with Weaviate's managed cloud offering rather than self-hosting immediately, deferring that operational step until the team has more experience with the product). Once that design doc is reviewed and approved, the decision gets written down permanently as an **ADR** (Lesson 6) — "ADR-014: Vector Database Selection," with this exact case study's reasoning captured for whoever asks "why Weaviate and not Pinecone" eighteen months from now.

## Key terms

| Term | Meaning |
|---|---|
| Build-vs-buy spectrum | A range from fully self-operated (build) to fully managed (buy), with real options like Weaviate sitting at different points depending on deployment choice |

## Check yourself

The case study found Weaviate scored highest (7.50) for Northbeam's specific weights and situation. Under what kind of different company situation might Pinecone legitimately score higher instead, without either company being "wrong"?
