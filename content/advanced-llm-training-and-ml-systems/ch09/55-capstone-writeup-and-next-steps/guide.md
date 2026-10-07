# Capstone: Write-Up & Next Steps

This is the last lesson of the course. The fine-tune is trained, evaluated against a baseline, and the results are in — this lesson is about turning that into a write-up someone else (a teammate, a hiring manager, future-you six months from now) can actually learn from, and about where to point all of this once the capstone itself is finished.

## What you'll learn

- What a credible fine-tuning write-up includes, beyond "it worked"
- How to present the baseline comparison honestly, wins and regressions both
- How to connect the write-up back to the serving-awareness material from Chapter 8
- Concrete next steps once the capstone is done: larger data, harder eval, real serving
- Where the skills from this course point next, now that the structured material ends here

## What belongs in the write-up

A write-up that's actually useful to someone else covers, in order: the **problem statement** (one sentence — what behavior you were trying to produce); **model and data choices and why** (which base model, why that size and license, how the dataset was built and how big it ended up being); the **training configuration and what happened during the run** (quantization, LoRA rank, learning rate, epochs, and whether you had to stop early on held-out loss); the **evaluation results** (task metric and general-capability delta, both against the named baseline, exactly as computed in Lesson 54); and **known limitations** (what it wasn't tested on, what you'd be nervous about in production).

```python
# A minimal, honest results summary -- the core of the write-up
results = {
    "task": "Summarize support tickets into a fixed two-field format",
    "base_model": "meta-llama/Llama-3.1-8B-Instruct",
    "dataset_size": 850,
    "training": {"method": "QLoRA (4-bit, r=16)", "lr": 2e-4, "epochs": 3},
    "task_metric": {"base": 0.41, "finetuned": 0.78},          # higher is better
    "general_capability_delta": -0.015,                          # vs. base, on MMLU subset
    "limitations": ["English-only", "not evaluated beyond 2k-token tickets"],
}
```

## Present the comparison honestly

The temptation, especially in a write-up meant to showcase a project, is to lead with the task-metric win and bury or omit the general-capability number. Resist it — a write-up with both numbers, even if the regression is real and visible, is more credible and more useful than one with only the flattering number, and it's the discipline Lesson 27 and Lesson 54 both built toward.

## Connecting back to Chapter 8

If this model were going to be served, the write-up is also where the Chapter 8 material becomes directly actionable: a rough estimate of serving cost at this model's size and your target concurrency (Lesson 49), a quantization recommendation suited to a measured accuracy delta (Lesson 48), and the shape of a handoff package (Lesson 50) — even if nobody is actually deploying this particular capstone model to production, writing that section is the proof that the skills from Chapter 8 actually transferred.

## Next steps, for real projects

- **More and better data** — the single highest-leverage change for most narrow fine-tunes, almost always ahead of hyperparameter tuning.
- **A harder or broader eval set** — Lesson 45's methodology, applied again, now that you have a real result to stress-test.
- **Real serving, if the use case warrants it** — vLLM or TGI, with the quantization level you've now actually validated rather than assumed.
- **A second iteration** — using what the general-capability delta and task-metric gap revealed about where this run's data or config fell short.

## This is the end of the course

Tokenization and pretraining, supervised fine-tuning and its failure modes, parallelism and the ML systems that keep a long run alive, evaluation methodology, and now the beginning of serving awareness — all of it converged on this one project, built end to end. The material stops here, but the discipline this course tried to build — justify decisions with evidence, evaluate honestly, know enough about the next stage of the pipeline to hand off well — is exactly what carries forward into any real training or ML systems role.

## Key terms

- **Fine-tuning write-up** — problem statement, model/data choices, training config, baseline-relative results, and known limitations, presented together
- **Honest trade-off reporting** — presenting both the task-metric win and the general-capability delta, not just the flattering number
- **Serving-aware write-up section** — connecting a capstone's results to cost, quantization, and handoff considerations even without a real deployment
- **Second iteration** — using a first result's gaps to directly motivate the next round of data or configuration changes
