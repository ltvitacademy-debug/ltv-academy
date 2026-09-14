# Lesson 52 — A RAG Pipeline Over Fabric Metadata

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 52 of 81**

## What you'll learn

- How Lessons 50 and 51 combine into one working RAG pipeline
- A full worked trace: a real question, through all four stages, to an answer
- Why the generated answer has to cite where it came from
- How this closes the chapter's Copilot-and-RAG arc before Lesson 53's testing arc begins

## The question this pipeline answers

"Which table has customer churn data?" is exactly the kind of question a
data engineer gets asked constantly — by a new teammate, an analyst, a
manager — and answering it by memory or by grepping through every
workspace doesn't scale as the catalog grows. This lesson traces that
question through the full pipeline Lessons 50 and 51 built up.

## The full trace

```
1. EMBED (index time, done once)
   Every table's chunk — name, description, columns, from
   Lesson 51 — is embedded and stored with its metadata.

2. EMBED (query time)
   "Which table has customer churn data?" gets embedded with
   the SAME model used to embed the chunks.

3. RETRIEVE
   The index returns the closest-matching chunk:
     table: DimCustomer, workspace: Sales Analytics
     (matched on "churn" appearing in both the description
      and the churn_risk_score column)

4. GENERATE
   The LLM receives the question PLUS the retrieved chunk,
   and is told to answer using only that retrieved content.
```

## The generated answer

```
"The DimCustomer table (Sales Analytics workspace) contains
customer churn data — specifically the churn_risk_score
column, a model-predicted churn probability. Source: the
DimCustomer catalog entry."
```

Notice the answer names its source table and workspace explicitly. That's
not a stylistic choice — it's the direct payoff of storing metadata
alongside each vector in Lesson 51. Without it, the answer would be an
unverifiable claim; with it, the person asking can go open `DimCustomer`
themselves and confirm.

## Why the citation still matters, even here

This closes the loop on the review habit that's run through the whole
chapter — Lesson 45's generated PySpark, Lesson 46's KQL fix, Lesson 48's
documentation draft — the same idea, one more time: a RAG answer is
grounded in retrieved content, which makes it far more reliable than an
ungrounded guess, but "more reliable" is not "verified." If the catalog
entry for `DimCustomer` is itself stale or wrong, the RAG pipeline will
confidently retrieve and repeat that staleness. Grounding fixes
hallucination; it doesn't fix bad source data.

## Closing this arc

Lessons 44–52 traced one arc: from Copilot inside Fabric notebooks and KQL,
through AI-assisted quality and documentation, to a working RAG pipeline
over the workspace's own metadata. Lesson 53 shifts into the chapter's next
arc — using AI to generate test cases for pipelines, continuing the same
"generate, then verify" discipline in a new setting.

## Key terms

| Term | Meaning |
|---|---|
| Query-time embedding | Embedding the user's question with the same model used for indexed chunks |
| Grounded answer | An LLM response built from retrieved content, with its source named |
| Grounding vs. verification | RAG prevents hallucination; it doesn't guarantee the retrieved source itself was accurate |

## Check yourself

You're ready for Lesson 53 when you can explain, without looking: why does
naming the source table in a RAG-generated answer matter even when the
answer sounds confident and complete?
