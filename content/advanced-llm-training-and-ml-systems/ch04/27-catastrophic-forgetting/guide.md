# Catastrophic Forgetting

This chapter has covered how to fine-tune a model — formatting data, masking prompts, choosing full fine-tuning vs. LoRA vs. QLoRA. This closing lesson covers the failure mode that can undo all of it if left unchecked: a model that gets measurably better at the task it was just fine-tuned on while measurably worse at everything it could already do before. That's catastrophic forgetting, and it's a direct consequence of how neural networks learn, not a bug in any particular training run.

## What you'll learn

- What catastrophic forgetting is and why gradient descent causes it structurally
- How it shows up concretely in LLM fine-tuning (not just older continual-learning research)
- The main mitigations: lower learning rate, fewer epochs, data mixing, and PEFT's structural advantage
- Why evaluating only on the fine-tuning task hides this problem
- How this connects back to the full-fine-tuning-vs-PEFT trade-off from Lesson 24

## What catastrophic forgetting is

Catastrophic forgetting is the tendency of a neural network, when trained on a new task or distribution, to overwrite the weight configurations that encoded performance on previously learned tasks — because gradient descent has no explicit mechanism protecting old capabilities; it only ever reduces loss on the data currently in front of it. The term predates LLMs by decades (it's a long-studied problem in continual-learning research), but it applies directly and concretely to SFT: a model fine-tuned heavily on, say, customer-support conversations can become measurably worse at general reasoning, coding, or following instructions outside that narrow domain — capabilities it demonstrably had right before fine-tuning started.

## How it shows up in practice

The failure pattern is specific and worth recognizing: task-specific metrics (how well the model now performs the fine-tuning task) go up, while general-capability benchmarks the model was never fine-tuned on (general instruction-following evals, coding benchmarks, broad knowledge QA) go down relative to the base or SFT checkpoint before this fine-tuning stage. A team that only evaluates on their target task after fine-tuning can completely miss this — the number they're watching looks great, while the model has quietly become a worse general assistant.

## Why it's structurally more of a risk with small, narrow datasets

Forgetting tends to get worse with: a higher learning rate (bigger weight updates per step, more aggressively overwriting existing structure), more epochs over a small dataset (repeated exposure to the same narrow distribution with no counterbalancing diversity), and a training set that's narrow in topic and style relative to the model's original pretraining and instruction-tuning distribution. All three of these are exactly the conditions a well-intentioned "make the model great at this one specific thing" fine-tuning run tends to create, which is why forgetting is a routine hazard in practice, not a rare edge case.

## Mitigations

- **Lower learning rate and fewer epochs** — the single most direct lever; SFT learning rates are typically much lower than pretraining peak rates (often in the `1e-5` to `2e-5` range for full fine-tuning, somewhat higher for LoRA), and 2-4 epochs over the fine-tuning set is a common ceiling before forgetting risk rises sharply.
- **Mixing in general-purpose data** alongside the task-specific data, so the model continues seeing examples from its original broad distribution during fine-tuning rather than only the narrow target distribution.
- **Parameter-efficient methods (LoRA/QLoRA) as a structural mitigation** — because the base weights are frozen and untouched, the pretrained knowledge encoded in them is mechanically protected from being overwritten; only the small adapter is being fit to the new task. This doesn't make forgetting impossible (a large enough or badly tuned adapter can still shift behavior substantially), but it meaningfully reduces the risk compared to full fine-tuning, which is a second reason (beyond the memory savings from Lesson 24) that PEFT is often preferred for narrow fine-tuning tasks.

```python
# A simple, concrete lever: cap epochs and keep LR conservative
from trl import SFTConfig

config = SFTConfig(
    output_dir="./sft-run",
    learning_rate=2e-5,       # modest relative to pretraining peak rates
    num_train_epochs=3,       # avoid excessive repeated exposure
    max_seq_length=2048,
)
```

## Evaluating for forgetting, not just task success

The practical discipline this lesson argues for: always evaluate a fine-tuned model on a general-capability benchmark suite *in addition to* the target task, comparing against the pre-fine-tuning checkpoint. A fine-tune that wins on the target metric but loses meaningfully on general capability isn't an unambiguous success — it's a trade-off that should be made deliberately, with the size of the regression visible, rather than discovered later by users.

## Key terms

- **Catastrophic forgetting** — a neural network overwriting previously learned capability while learning a new, narrower task
- **General-capability regression** — a drop in performance on tasks outside the fine-tuning distribution, often invisible if only the target task is measured
- **Data mixing (anti-forgetting)** — including general-purpose examples alongside task-specific data during fine-tuning
- **PEFT's structural protection** — frozen base weights mechanically limit how much pretrained knowledge can be overwritten, compared to full fine-tuning
