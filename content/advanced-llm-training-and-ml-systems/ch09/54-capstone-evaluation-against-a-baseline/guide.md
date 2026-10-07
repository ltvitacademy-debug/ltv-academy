# Capstone: Evaluation Against a Baseline

The fine-tune ran, the adapter is saved — and none of that tells you whether it actually worked. This lesson applies Chapter 7's evaluation methodology for real: comparing the fine-tuned model against the pre-fine-tune baseline on both the task you built it for and the general-capability check that catches catastrophic forgetting. A capstone that stops at "training completed without errors" has skipped the only step that actually answers the question the whole project was for.

## What you'll learn

- Why "it trained" and "it works" are different claims requiring different evidence
- How to compute task-specific performance on the held-out split from Lesson 52
- How to run a general-capability check to catch forgetting, per Lesson 27
- How to read the two results together rather than in isolation
- What a credible comparison table looks like for the write-up

## Two separate questions, two separate evals

This lesson deliberately runs two checks, not one, because they answer different questions: did the fine-tune improve the target behavior, and did it cost you anything elsewhere. Evaluating only the first is exactly the blind spot Lesson 27 warned about.

```python
from transformers import AutoModelForCausalLM
from peft import PeftModel
import evaluate

base_model = AutoModelForCausalLM.from_pretrained(model_id, device_map="auto")
finetuned_model = PeftModel.from_pretrained(base_model, "./capstone-sft-run/final-adapter")

perplexity = evaluate.load("perplexity", module_type="metric")

baseline_result = perplexity.compute(
    model_id=model_id, predictions=held_out_responses,
)
finetuned_result = perplexity.compute(
    predictions=held_out_responses, model_id="./capstone-sft-run/final-adapter",
)
```

## Task-specific evaluation

On the held-out split set aside in Lesson 52, score both the base model and the fine-tuned model on the behavior you targeted — perplexity on held-out responses is one signal, but for most tasks a direct check (does the output match the intended format, style, or correctness criteria from Lesson 51's task definition) is more informative than perplexity alone. This is where Lesson 45's "building a task-specific eval set" pays off directly: you already have the examples and the judging criteria.

## The general-capability check

```python
# Example using lm-evaluation-harness from the command line, for a quick
# general-capability snapshot on both checkpoints:
#
# lm_eval --model hf --model_args pretrained=<base_model_id> \
#   --tasks mmlu,gsm8k --device cuda:0 --batch_size 8
#
# lm_eval --model hf --model_args pretrained=<base_model_id>,peft=<adapter_path> \
#   --tasks mmlu,gsm8k --device cuda:0 --batch_size 8
```

Run the same general-capability benchmark subset against both the base model and the fine-tuned model, exactly as Lesson 27 recommended. A meaningful drop here, even alongside a task-metric win, is a real result worth reporting honestly — not a reason to quietly discard the comparison.

## Reading the two results together

| | Base model | Fine-tuned |
|---|---|---|
| Task metric (held-out) | baseline value | improved? by how much |
| General-capability (MMLU, etc.) | baseline value | regressed? by how much |

A fine-tune that wins clearly on the task metric with a negligible general-capability delta is an unambiguous success. A fine-tune that wins on the task metric but regresses meaningfully elsewhere is still a result — it's a trade-off to report and reason about in the write-up, not a failure to hide.

## Key terms

- **Task-specific evaluation** — scoring the fine-tuned model against the held-out split and the criteria defined in the task
- **General-capability check** — running a standard benchmark subset against both checkpoints to detect forgetting
- **Baseline comparison** — always reporting fine-tuned results alongside the pre-fine-tune checkpoint's results, never in isolation
- **Honest trade-off reporting** — presenting a regression alongside a win, rather than omitting it
