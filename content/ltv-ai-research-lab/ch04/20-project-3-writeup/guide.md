# Project 3 Write-Up

Five lessons of work — a base model choice, an SFT run, a reward signal, an RLHF run, and an evaluation — need to become something a stranger can read in five minutes and trust. This lesson is about writing that up: claim, method, result, limitation.

## What you'll learn

- The four-part structure every project write-up in this lab uses
- How to write each part for Project 3 specifically, using your own actual numbers
- Why the safety rule and the hallucination finding both belong in the write-up, not just the result
- How this write-up feeds into Chapter 6's portfolio assembly

## The four-part structure

Every project in this research lab gets written up the same way, and Project 3 is no exception:

1. **Claim** — the one sentence someone skims to decide if this is interesting.
2. **Method** — how you'd actually reproduce it: model, data, reward, training.
3. **Result** — the actual numbers, not vibes.
4. **Limitation** — what this result doesn't prove, and what could break it.

A reviewer should be able to read just the claim and know what you did; read claim plus method and know if they trust how you did it; read all four and know exactly how far to trust the number.

## Claim

State what was built and what changed, in one sentence that doesn't oversell:

> RLHF on SQL Pete, a Qwen2.5-Coder-1.5B-Instruct model fine-tuned for natural-language-to-SQL on the Northwind and AdventureWorks2012 schemas, improved held-out execution accuracy over the SFT-only checkpoint, using an execution-correctness reward in place of human feedback.

Notice what the claim does NOT say: it doesn't say "RLHF makes database assistants better" (too broad) and it doesn't say "equivalent to human preference" (not true — say RLAIF, not RLHF, if you're being precise in the body).

## Method

Summarize the pipeline in the order it was actually built, each step traceable to a lesson:

- **Base model** (Lesson 15): Qwen2.5-Coder-1.5B-Instruct, chosen for open weights, code specialization, and single-GPU fit.
- **SFT** (Lesson 16): LoRA fine-tune via `peft`, ~2,000 (question, gold SQL) pairs scoped to the two schemas.
- **Reward** (Lesson 17): execution-correctness reward (+1.0 / +0.3 / -0.3 / -1.0), with a hard pre-execution safety filter rejecting any non-SELECT statement.
- **RLHF** (Lesson 18): TRL `PPOTrainer`, policy initialized from the SFT checkpoint — RLAIF-style, since the reward is programmatic, not human-rated.
- **Evaluation** (Lesson 19): held-out execution accuracy, SFT-only vs. RLHF, plus a schema-hallucination check.

```python
# A write-up's method section should let someone
# reconstruct this call chain without guessing:
sft_model  = sft_train(base_model, nl_to_sql_pairs, lora_config)
reward_fn  = execution_reward  # Lesson 17
rlhf_model = ppo_train(sft_model, questions, reward_fn)
```

## Result

Report the actual before/after numbers from Lesson 19 — both of them, held-out execution accuracy for SFT-only and for RLHF — and the hallucination rate for each, even if the hallucination number is unflattering. A result section with only the flattering number isn't a result section, it's marketing.

## Limitation

This is the section most writers skip, and the one that matters most for a research write-up:

- **The reward is a proxy, not ground truth.** Execution-correctness via result-set matching is RLAIF, not literal human feedback — a human might judge some non-matching queries as "good enough" or some matching queries as poorly written, in ways this reward can't see.
- **The safety rule is a hard constraint, not a learned behavior.** SQL Pete never had the chance to learn to avoid destructive statements through reward, because they were filtered out before reaching the reward function at all. That's good for safety, but it means the write-up shouldn't claim the model "learned" to avoid destructive SQL — it was never allowed to try.
- **The hallucination finding.** Report plainly whether RLHF increased schema hallucination on failing queries relative to SFT-only, and how you caught it (schema validation independent of execution). If it didn't show up, say that plainly too — a clean negative result is still a result.

## Feeding into Chapter 6

This write-up — claim, method, result, limitation — is exactly the unit Chapter 6's portfolio-assembly lesson will slot in alongside Project 1's and Project 2's write-ups. Keep the claim honest and the limitation section real; a three-project portfolio where every limitation section says "none found" reads as unreviewed, not successful.

## Key terms

- **Claim** — the one-sentence summary of what was built and what result followed
- **Method** — the reproducible description of model, data, reward, and training procedure
- **Result** — the actual measured numbers, reported even when unflattering
- **Limitation** — what the result does and doesn't prove, including proxy-reward and safety-constraint caveats

## Recap

Project 3's write-up states the claim precisely (RLHF via RLAIF-style execution-correctness reward improved held-out accuracy over SFT-only), traces the method lesson by lesson, reports both the accuracy numbers and the hallucination-rate numbers from Lesson 19, and names the limitations plainly — including that the safety rule is a hard constraint, not a learned one. This closes Project 3; Chapter 5 picks up SQL Pete again for an interpretability case study.
