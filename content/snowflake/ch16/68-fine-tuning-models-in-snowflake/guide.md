# Lesson 68 — Fine-Tuning Models in Snowflake with Cortex

**Chapter 16 · Cortex AI & Agents on Snowflake · Lesson 68 of 76**

## What you'll learn

- Why you'd fine-tune a model at all, instead of just prompting a general-purpose one
- The exact SQL function used to launch a Cortex fine-tuning job
- How training data stays inside Snowflake's security perimeter instead of being shipped to a third party
- How the newer Cortex Training service (built on ArcticTraining) differs from Cortex Fine-Tuning

## Why fine-tune instead of just prompting?

Everything in Lessons 61-67 uses general-purpose hosted models as-is —
you give them a good prompt, a semantic model, or retrieved context, and
they perform well on a wide range of tasks. Fine-tuning is for the
narrower case where a general model consistently underperforms on your
specific domain or format — a particular document layout, a specialized
vocabulary, a house style — and you have enough labeled examples to teach
it the difference. Rather than engineering an ever-longer prompt, you
adapt the model itself on your own data.

## Cortex Fine-Tuning: the GA path

**Cortex Fine-Tuning** is Snowflake's general-availability feature for
this, built around a single SQL function:

```sql
SELECT SNOWFLAKE.CORTEX.FINETUNE(
  'CREATE',
  'my_tuned_support_model',
  'llama3.1-8b',
  'SELECT prompt, completion FROM training_data',
  'SELECT prompt, completion FROM validation_data'
);

-- Check on it later
SELECT SNOWFLAKE.CORTEX.FINETUNE('SHOW');
SELECT SNOWFLAKE.CORTEX.FINETUNE('DESCRIBE', 'my_tuned_support_model');
```

The same `FINETUNE` function also accepts `'CANCEL'` to stop a running job.
Under the hood, Cortex Fine-Tuning uses **LoRA (Low-Rank Adaptation)** — a
parameter-efficient technique that freezes the base model's weights and
trains only small, added adapter matrices. That's why fine-tuning doesn't
require retraining a multi-billion-parameter model from scratch, and why
it's economical enough to offer as a managed SQL function rather than a
specialized ML-engineering project.

Training and validation data must come from **tables or views already
inside your Snowflake account** — the function points at SQL queries, not
an uploaded file. Fine-tuning jobs run as background jobs (not tied to a
worksheet session, since they can run long), and access requires the
`SNOWFLAKE.CORTEX_USER` database role plus `CREATE MODEL` privilege on the
target schema. There's also a narrower, related capability — fine-tuning
`arctic-extract` models specifically for document-extraction accuracy on
your own document formats, in preview since January 2026.

## Data never leaves the perimeter

This is the point worth repeating from the governance chapters earlier in
this course: whichever fine-tuning path you use, **training data never
leaves Snowflake's security perimeter.** It's read from your own tables,
processed by Snowflake-managed compute, and the resulting model artifact
stays inside your account — the same trust boundary that already governs
every other table, view, and query here.

## Cortex Training: the newer, deeper option

Announced at Snowflake Summit 2026 and currently in public preview,
**Cortex Training** is a separate, more powerful service layered above
basic fine-tuning. It uses fully managed GPU compute pools and
Snowflake's own open-source **ArcticTraining** framework to deliver, per
Snowflake's own figures, up to roughly 2x more training runs for the same
GPU budget. The meaningful capability gap: Cortex Training supports
**reinforcement learning on proprietary data**, which plain LoRA-based
Cortex Fine-Tuning does not offer, and it supports a broader set of
open-weight model families (including Qwen and Mistral) rather than the
narrower model list available to `FINETUNE`.

In short: Cortex Fine-Tuning is the lightweight, SQL-native, GA path for
adapting a supported model to your data with LoRA. Cortex Training is the
heavier, public-preview path for teams that need reinforcement learning or
a wider choice of base models, with Snowflake managing the GPU
infrastructure either way.

## Key terms

| Term | Meaning |
|---|---|
| Cortex Fine-Tuning | Snowflake's GA feature for adapting a supported foundation model to your own data via `SNOWFLAKE.CORTEX.FINETUNE`, using LoRA |
| LoRA (Low-Rank Adaptation) | A parameter-efficient technique that trains small adapter matrices instead of the full model, keeping the base model's weights frozen |
| Cortex Training | Snowflake's newer, public-preview managed GPU service for deeper training, including reinforcement learning, built on the ArcticTraining framework |
| ArcticTraining | Snowflake's open-source training framework underlying Cortex Training |

## Lab

1. Write out, in your own words, the difference between "fine-tuning"
   (adapting an existing model to your data) and "prompting" (giving a
   general model better instructions at query time) — and describe one
   scenario from a domain you know where fine-tuning would actually be
   worth the effort.
2. List the four arguments the `SNOWFLAKE.CORTEX.FINETUNE('CREATE', ...)`
   call takes, in order, and what each one specifies.

## Check yourself

You're ready to move on when you can name the SQL function used to launch
a Cortex fine-tuning job, explain why LoRA makes fine-tuning
cost-effective, and describe the one capability gap (reinforcement
learning on proprietary data) that separates Cortex Training from basic
Cortex Fine-Tuning.
