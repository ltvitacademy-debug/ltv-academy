# Data Catalog Chunk & RAG Trace Reference

A compiled reference for the RAG pipeline built in Lessons 50-52: what a
catalog chunk actually looks like, what the index stores alongside it, and
a full worked trace you can pattern-match a new question against.

## Chunk shape (Lesson 51) — one table's full profile, not one chunk per column

```json
{
  "chunk_text": "Table: DimCustomer\nWorkspace: Sales Analytics\nDescription: Customer dimension table, includes churn risk.\nColumns:\n  customer_id (int) - unique customer identifier\n  churn_risk_score (float) - model-predicted churn probability\n  signup_date (date) - account creation date\n  region (string) - sales region",
  "metadata": {
    "table": "DimCustomer",
    "workspace": "Sales Analytics"
  }
}
```

**Why whole-table chunks:** a question like "which table has customer churn
data?" needs enough context in one retrieved unit to confirm the match.
Per-column chunks force retrieval to reassemble fragments — more moving
parts, more chances to retrieve an incomplete picture.

**The one rule that breaks everything if skipped:** every chunk, and every
question at query time, must be embedded with the *same* embedding model.
Mixing models makes the resulting vectors incomparable.

## Index entry shape (Lesson 51)

```json
{
  "vector": [0.021, -0.114, 0.087],
  "chunk_text": "Table: DimCustomer ...",
  "metadata": { "table": "DimCustomer", "workspace": "Sales Analytics" }
}
```

Storing metadata alongside the vector is what lets a generated answer name
its source — without it, a RAG answer is just a confident, unverifiable
claim.

## Full trace template (Lesson 52's shape)

```
1. EMBED (index time, once)
   Every table's chunk is embedded and stored with its metadata.

2. EMBED (query time)
   The incoming question gets embedded with the SAME model.

3. RETRIEVE
   The index returns the closest-matching chunk(s) by vector similarity.

4. GENERATE
   The LLM receives the question PLUS the retrieved chunk(s), and is
   told to answer using ONLY that retrieved content, citing the source
   table/workspace by name.
```

## Worked trace: "Which table has customer churn data?"

```
RETRIEVE -> table: DimCustomer, workspace: Sales Analytics
            (matched on "churn" in both the description and the
             churn_risk_score column)

GENERATE -> "The DimCustomer table (Sales Analytics workspace) contains
            customer churn data -- specifically the churn_risk_score
            column, a model-predicted churn probability.
            Source: the DimCustomer catalog entry."
```

## Before you trust any generated answer

Grounding fixes hallucination — it does not fix bad source data. If the
catalog entry itself is stale or wrong, the pipeline will confidently
retrieve and repeat that staleness. Always be able to open the cited
table/workspace yourself and confirm the answer against it.
