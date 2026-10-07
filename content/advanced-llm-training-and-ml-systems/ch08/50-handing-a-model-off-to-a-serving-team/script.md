# Script — Handing a Model Off to a Serving Team

## Segment 1 (title)

This closes the chapter by making the previous four lessons concrete: what, specifically, does a training team hand over when a model is ready to leave training and become a production service? A clean handoff is what turns everything you now know about prefill, decode, KV cache sizing, quantization, and cost estimation into something a serving team can act on.

## Segment 2 (steps)

A complete handoff needs more than a checkpoint directory. It needs the weights and tokenizer together with the chat template used during fine-tuning, since a mismatched template silently underperforms. It needs the exact generation config the model was validated with. It needs eval results against a named baseline, including the general-capability check. And it needs known limitations — untested domains, context lengths, failure modes.

## Segment 3 (code)

In practice that's a small manifest saved alongside the checkpoint: model and base model IDs, where the chat template lives, the validated generation parameters, a summary of the eval results including the general-capability delta, and a recommended quantization level and serving stack.

## Segment 4 (steps)

That recommendation is exactly that — a recommendation, not a mandate. A training team can say a model holds up well at a given quantization level based on its eval delta, and that a given stack supports it out of the box. The serving team still owns latency SLAs, autoscaling, and production monitoring.

## Segment 5 (outro)

A handoff missing any of these pieces doesn't fail loudly — it fails as a model that feels a little off in production, with no easy way to tell why. That's the end of Chapter 8. Everything from Chapter 1 onward now comes together in the capstone: selecting a real open-weight model, building a real dataset, running a real fine-tune, and evaluating it end to end.
