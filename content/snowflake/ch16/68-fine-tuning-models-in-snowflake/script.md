# Script — Fine-Tuning Models in Snowflake with Cortex

## Segment 1 (title)

Fine-tuning is for the narrower case where a general-purpose model keeps underperforming on your specific domain, and you have enough labeled examples to teach it the difference — adapting the model itself, inside Snowflake, instead of the data ever leaving.

## Segment 2 (code: one SQL function, start to finish)

Cortex Fine-Tuning runs through a single function, FINETUNE: pass CREATE, a name for the resulting model, the base model, and two SQL queries — one for training data, one for validation — both pointing at your own Snowflake tables, not an uploaded file. The same function checks status with SHOW and DESCRIBE, or stops a running job with CANCEL.

## Segment 3 (steps: why it's cheap enough to be a SQL call)

Under the hood this uses LoRA — Low-Rank Adaptation — which freezes the base model's weights and trains only small added adapter matrices. That's why it doesn't require retraining a multi-billion-parameter model from scratch, and why Snowflake can offer it as a plain SQL function rather than a specialized ML-engineering project. Jobs run in the background since they can run long, and access requires the SNOWFLAKE.CORTEX_USER role plus CREATE MODEL privilege. Either way, training data never leaves Snowflake's security perimeter.

## Segment 4 (steps: two different depths)

Cortex Fine-Tuning is the lightweight, generally-available, SQL-native path. Cortex Training, announced at Summit 2026 and currently in public preview, is heavier: fully managed GPU compute pools running Snowflake's own ArcticTraining framework, delivering roughly 2x more training runs for the same GPU budget, supporting more model families, and — the real capability gap — reinforcement learning on proprietary data, which basic LoRA fine-tuning doesn't offer.

## Segment 5 (outro)

That closes out Chapter 16. Chapter 17 turns to governance: evaluating, securing, and auditing every Cortex feature covered in this chapter, from observability to guardrails against prompt injection.
