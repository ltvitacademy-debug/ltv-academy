# Evaluating Query Correctness, Before & After

Training a model and claiming it improved are two different things. This lesson evaluates SQL Pete on a held-out set of questions, comparing the SFT-only checkpoint from Lesson 16 against the RLHF checkpoint from Lesson 18 — and checks for a specific regression RLHF can introduce.

## What you'll learn

- How to measure execution accuracy on a held-out evaluation set
- How to compare SFT-only vs. RLHF checkpoints on the same questions
- The schema-hallucination regression RLHF can introduce, and why
- How to catch it: validating generated SQL against the schema before execution

## The held-out evaluation set

Evaluation reuses the same execution-correctness machinery from Lesson 17, but on questions SQL Pete never trained on — a held-out split carved out of the original pool before SFT or RLHF touched any of it, still scoped to Northwind and AdventureWorks2012. Held-out accuracy is the only honest measure here: scoring on training questions would just tell you how well the model memorized, not how well it generalizes to a new natural-language question against a known schema.

```python
def execution_accuracy(model, held_out_questions, sandbox_db):
    correct = 0
    for item in held_out_questions:
        generated = generate_sql(model, item["question"], item["schema"])
        reward = execution_reward(generated, item["sql"], sandbox_db)
        if reward == 1.0:
            correct += 1
    return correct / len(held_out_questions)
```

## Comparing before and after

The comparison is simple: run `execution_accuracy` twice, once with the Lesson 16 SFT-only checkpoint and once with the Lesson 18 RLHF checkpoint, on the identical held-out set.

```python
sft_only_model = load_checkpoint("sql-pete-sft")
rlhf_model = load_checkpoint("sql-pete-rlhf")

sft_acc = execution_accuracy(sft_only_model, held_out, sandbox_db)
rlhf_acc = execution_accuracy(rlhf_model, held_out, sandbox_db)

print(f"SFT-only accuracy:  {sft_acc:.2%}")
print(f"RLHF accuracy:      {rlhf_acc:.2%}")
```

If RLHF worked as intended, the RLHF accuracy should be meaningfully higher than the SFT-only accuracy — the reward signal pushed the policy toward more exact result-set matches on questions it hadn't seen before.

## The regression to check for: schema hallucination

Raw accuracy isn't the whole story. RLHF optimizes hard for reward, and reward only checks whether the result set matches — it doesn't check whether every table and column name the model used actually exists in the schema until the query is run. That creates a specific failure mode worth checking for directly: RLHF can push the model toward hallucinating a column or table name that doesn't exist, if the model has found that certain plausible-sounding but nonexistent names tend to appear in contexts that happened to correlate with reward during training (for example, a column name that's common in similar schemas elsewhere but doesn't exist in Northwind or AdventureWorks2012).

A query referencing a nonexistent column fails at execution with a syntax/semantic error and would normally just score -0.3, but it's worth distinguishing this specific regression from a plain wrong-answer, because it signals the model drifting away from the schema it's actually supposed to know, not just getting the logic wrong.

## How to catch it

Catch schema hallucination before the query is even executed, by validating every generated query's table and column references against the actual schema metadata:

```python
def validate_against_schema(sql, schema_tables):
    referenced = extract_table_and_column_names(sql)
    unknown = [
        name for name in referenced
        if name not in schema_tables
    ]
    return unknown  # empty list means clean

hallucination_rate = sum(
    bool(validate_against_schema(generate_sql(rlhf_model, q["question"], q["schema"]), SCHEMA_NAMES))
    for q in held_out
) / len(held_out)
```

Running this check across the held-out set, separately for the SFT-only and RLHF checkpoints, tells you directly whether RLHF increased the rate of hallucinated schema references, even on questions where the final accuracy number looked fine. Report both numbers — execution accuracy and hallucination rate — side by side; a model that is more accurate on average but hallucinates schema elements more often on its misses is a real finding, not just noise.

## What this means for Lesson 20

Whatever this evaluation finds — a clean accuracy win, a hallucination regression, or both — becomes the result and limitation sections of Project 3's write-up in Lesson 20. A finding of "RLHF improved accuracy but increased schema hallucination on failures, caught by schema validation" is a complete, honest result, not a failure to report.

## Key terms

- **Held-out evaluation set** — questions excluded from both SFT and RLHF training, used only to measure generalization
- **Execution accuracy** — the fraction of held-out questions where the generated query's result set exactly matches the gold query's
- **Schema hallucination** — the regression where a model references a table or column name that doesn't exist in the target schema, in pursuit of reward
- **Schema validation** — checking a generated query's table/column references against actual schema metadata before (or independent of) execution

## Recap

Evaluation compares SFT-only against RLHF on the same held-out questions using execution accuracy, and separately checks for a schema-hallucination regression by validating generated SQL's table and column names against the real schema — because a reward that only checks result sets can't see a model drifting toward nonexistent column names on its own. Next up, Lesson 20: writing up Project 3 for the portfolio.
