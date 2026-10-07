# Knowledge Distillation

Quantization and pruning both start from a trained model and compress it in place. Knowledge distillation takes a different path entirely: train a brand-new, smaller model from scratch to imitate a larger one's behavior. It's more expensive up front than either technique in this chapter, but it can produce a smaller model that quantization or pruning alone couldn't reach without destroying quality.

## What you'll learn

- The teacher/student framing that defines distillation
- Why distillation trains on soft probabilities, not just the final answer
- What temperature does in the distillation loss, and why it matters
- How distillation compares to quantization and pruning as a compression strategy

## Teacher, student, and soft targets

Distillation starts with a large, already-trained **teacher** model and a smaller **student** model, usually with fewer layers, a smaller hidden dimension, or both. Instead of training the student only on the ground-truth labels a normal training run would use, distillation also trains it to match the teacher's full output probability distribution over the vocabulary — not just which token the teacher picked, but how confident it was across every alternative. Those probabilities are called **soft targets**, or soft labels, and they carry far more information than a single correct answer: a teacher's probability distribution implicitly encodes which wrong answers were "almost right," and training the student to reproduce that pattern transfers more of the teacher's learned behavior than hard labels alone ever could.

## Temperature: making the soft targets softer

A teacher model's raw output probabilities (after softmax) are often extremely peaked — one token near 100%, everything else near zero — which hides most of the useful signal in those near-zero probabilities. Distillation applies a **temperature** parameter inside the softmax to flatten the distribution before computing the loss: a higher temperature spreads probability mass out across more tokens, making the teacher's relative confidence between alternatives easier for the student to learn from. The student is trained on a combination of two losses — typically a KL-divergence term matching the (temperature-softened) teacher distribution, plus the ordinary cross-entropy loss against the real ground-truth label — weighted against each other so the student learns from both the teacher's behavior and the actual correct answer.

## Where distillation fits next to quantization and pruning

- **Different lever entirely.** Quantization and pruning take an existing architecture and compress it. Distillation changes the architecture — the student can have a genuinely different (usually shallower or narrower) design than the teacher, which is a degree of freedom neither other technique has.
- **Much more expensive.** Distillation is a real training run, requiring GPU time, a training pipeline, and often a meaningful dataset of prompts to distill over — closer in cost to fine-tuning than to the minutes-to-hours calibration pass GPTQ or AWQ need.
- **Often combined anyway.** A distilled student model is itself a normal model afterward, which means it can *also* be quantized and pruned on top of the distillation — the three techniques stack rather than substitute for each other. Open-weight "mini" or "small" model variants you've likely already encountered are frequently produced this way, then further quantized for deployment.

## Key terms

| Term | Meaning |
|---|---|
| Teacher model | The larger, already-trained model whose behavior is being transferred |
| Student model | The smaller model being trained to imitate the teacher |
| Soft targets | The teacher's full output probability distribution, used as a richer training signal than hard labels |
| Temperature | A softmax parameter that flattens the teacher's distribution so more signal survives |
| KL divergence | The loss term measuring how far the student's distribution is from the teacher's |

## Recap

Distillation trains a new, smaller student model to reproduce a teacher's soft output distribution rather than compressing the teacher's existing weights directly — a more expensive but more flexible lever than quantization or pruning, and one that's often stacked on top of them rather than used instead. That raises an obvious next question: given three different compression levers, how do you actually decide which one (or which combination) is worth it for a given deployment? Lesson 16 gives you the framework.
