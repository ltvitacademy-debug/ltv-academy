# Finding & Patching a Circuit

Induction heads (Lesson 34) are one fully-verified circuit. This lesson generalizes the workflow that found it into a repeatable process, grounded in the field's largest end-to-end circuit discovery to date: Wang et al.'s reverse-engineering of how GPT-2 small picks the correct name in a sentence.

## What you'll learn

- The five-step hypothesis-driven workflow for finding a circuit
- The real task and result from "Interpretability in the Wild" (indirect object identification)
- The difference between testing necessity and testing sufficiency
- How to patch a candidate circuit's activations into a corrupted run as a sufficiency test

## The task: indirect object identification

"Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small" (Wang et al., 2022) studies a specific, well-defined behavior: given "When Mary and John went to the store, John gave a drink to ___", the model should complete the sentence with "Mary" -- the indirect object, not the subject that was just mentioned again. This task has a clean quantitative metric built in: the **logit difference** between the correct name ("Mary") and the incorrect one ("John"), the same metric introduced in Lesson 33.

## The five-step workflow

1. **Pick a behavior with a clean metric.** IOI's logit difference between the two candidate names is exactly this kind of metric -- a single number that goes up when the model gets it right.
2. **Form a hypothesis** about which components matter, using attention-pattern inspection and direct attribution (Chapter 5's logit lens, applied per-component) to shortlist candidate heads.
3. **Test necessity.** Ablate the candidate heads (Lesson 33's technique) and check whether the logit difference collapses. If removing them tanks the metric, they're necessary.
4. **Test sufficiency.** Patch only the candidate heads' activations into an otherwise different or corrupted run, and check whether the behavior is restored. If it is, the candidate circuit is sufficient on its own to produce it.
5. **Check completeness and minimality.** Completeness asks whether you've accounted for the *whole* effect, not just part of it; minimality asks whether every component you've included is actually needed, or whether the circuit could be made smaller without losing the behavior.

Wang et al. ran exactly this process and identified roughly 26-28 attention heads across seven functional classes -- including duplicate token heads and previous token heads from Lesson 33's vocabulary, plus new roles specific to this task like "S-inhibition heads" (suppressing attention to the repeated subject) and "name mover heads" (actually writing the correct name into the output). They explicitly judged their own result against faithfulness, completeness, and minimality criteria, and reported that some gaps remained -- an honest, falsifiable circuit claim rather than a tidy final answer.

## Testing sufficiency by patching

Necessity (step 3) just reuses ablation. Sufficiency (step 4) needs a new move: run the model on a *different* input, but force specific heads to use the activations they had on the *original* input, and see if that's enough to recover the original behavior.

```python
import torch

def run_with_patch(model, corrupted_tokens, clean_cache, heads_to_patch, num_heads, d_head):
    """Run on a corrupted prompt, but patch specific heads' outputs back to their clean values."""
    handles = []
    for layer_idx, head_idx in heads_to_patch:
        clean_head_output = clean_cache[(layer_idx, head_idx)]

        def hook(module, input, output, head_idx=head_idx, clean_head_output=clean_head_output):
            batch, seq, d_model = output.shape
            heads = output.view(batch, seq, num_heads, d_head).clone()
            heads[:, :, head_idx, :] = clean_head_output
            return heads.view(batch, seq, d_model)

        handles.append(model.blocks[layer_idx].attn.register_forward_hook(hook))

    logits = model(corrupted_tokens)
    for h in handles:
        h.remove()
    return logits
```

If patching just the hypothesized heads from the clean run into the corrupted run restores most of the clean logit difference, that's real evidence those heads are sufficient for the behavior -- not merely correlated with it. Running both the ablation test (necessity) and this patching test (sufficiency) on the same candidate circuit is what turns "this looks like the right heads" into a defensible, falsifiable claim.

## Key terms

| Term | Meaning |
|---|---|
| Necessity | Whether removing/ablating a candidate circuit collapses the behavior it's hypothesized to cause |
| Sufficiency | Whether patching only the candidate circuit's activations into a different run is enough to restore the behavior |
| Faithfulness | Whether a proposed circuit explanation actually matches what the model is doing, not just a plausible story |
| Completeness | Whether a circuit explanation accounts for the whole effect, not just part of it |
| Minimality | Whether every component included in a circuit is actually needed, with nothing extraneous |

## Recap

Finding a real circuit means forming a hypothesis, then testing it from both directions -- ablating to check necessity, patching to check sufficiency -- and judging the result against faithfulness, completeness, and minimality, exactly as Wang et al. did for GPT-2 small's indirect-object circuit. The next lesson formalizes and generalizes the patching technique you just used into its own standalone method. Up next, Lesson 36: Activation Patching & Causal Tracing.
