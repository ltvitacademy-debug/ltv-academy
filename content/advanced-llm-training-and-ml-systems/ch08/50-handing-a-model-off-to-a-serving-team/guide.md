# Handing a Model Off to a Serving Team

This closes the chapter by making the previous four lessons concrete: what, specifically, does a training team hand over when a model is ready to leave training and become a production service? A clean handoff package is what turns everything you now know about prefill/decode, KV cache sizing, quantization, and cost estimation into something a serving team can act on without a dozen follow-up meetings.

## What you'll learn

- The core artifact every handoff needs beyond the raw weights
- Why eval results and known limitations belong in the handoff, not just in a separate report
- How to state a quantization and serving-stack recommendation without overstepping into the serving team's job
- What a minimal handoff config looks like in practice
- Why this chapter sets up the capstone that follows

## The core handoff package

A serving team needs more than a checkpoint directory. At minimum, a complete handoff includes:

- **Weights and tokenizer**, saved with `save_pretrained()`, including the chat template used during fine-tuning — a model served with a different template than it was trained on will silently underperform.
- **The exact generation config** it was validated with: recommended `max_new_tokens`, `temperature`, `top_p`, and any stop sequences the chat template depends on.
- **Eval results**, from Chapter 7's methodology: task-specific metrics and a general-capability check, both against a named baseline, so the serving team knows what "working correctly" looks like after deployment.
- **Known limitations** — domains it wasn't trained or evaluated on, context lengths beyond which quality is unverified, any known failure modes surfaced during evaluation.

```python
# A minimal handoff manifest, saved alongside the checkpoint
handoff = {
    "model_id": "org/model-sft-v3",
    "base_model": "org/base-model-7b",
    "chat_template_source": "tokenizer_config.json",  # must travel with the model
    "validated_generation_config": {
        "max_new_tokens": 512,
        "temperature": 0.7,
        "top_p": 0.9,
    },
    "eval_summary": {"task_metric": 0.84, "general_capability_delta": -0.01},
    "recommended_quantization": "AWQ 4-bit",
    "recommended_stack": "vLLM",
    "known_limitations": ["not evaluated beyond 8k context", "English-only eval set"],
}
```

## Recommend, don't dictate

The cost-estimation and quantization lessons in this chapter equip a training engineer to make a *recommendation* — "this model holds up well at AWQ 4-bit based on our eval delta, and vLLM supports it out of the box" — not a unilateral decision. The serving team owns latency SLAs, autoscaling, multi-tenant GPU allocation, and production monitoring; a training team handing over a well-justified recommendation plus the eval evidence behind it is far more useful than either silence or an unexamined mandate.

## Why this matters more than it looks like it should

A handoff missing the chat template, the validated generation config, or the eval baseline doesn't fail loudly — it fails as a model that "feels a little off" in production, with no easy way to tell whether that's a serving bug, a prompt formatting mismatch, or a genuine model limitation. Most of the painful post-launch debugging sessions this kind of handoff prevents are exactly the silent, hard-to-diagnose kind.

## Where this leads

This is the end of Chapter 8 and the end of the conceptual material in this course. Everything from Chapter 1 through this lesson — data, pretraining, SFT, parallelism, evaluation, and now serving awareness — comes together in the capstone that follows: selecting a real open-weight model, building a real SFT dataset, running a real fine-tune, and evaluating it against a baseline, end to end.

## Key terms

- **Handoff package** — weights, tokenizer, chat template, validated generation config, eval results, and known limitations, delivered together
- **Validated generation config** — the specific sampling parameters a model was evaluated with, which should travel with it to serving
- **Recommendation vs. decision** — a training team proposes a quantization/stack based on evidence; the serving team owns the production decision
- **General-capability delta** — the forgetting check from Lesson 27, reported alongside task metrics in the handoff
