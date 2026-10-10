# Writing Up an Interpretability Finding

Lessons 22 and 23 ran real experiments against SQL Pete's weights — layer-level patching, then head-level patching, chasing a specific hypothesis about schema hallucination. This lesson turns whatever came out of those experiments into a write-up a stranger can evaluate. An interpretability finding needs a different shape than Project 3's training write-up, because the thing being claimed is different: not "this number went up," but "this component causes this behavior" — a claim that's much easier to overstate.

## What you'll learn

- Why an interpretability finding uses claim, evidence, confidence, falsifier instead of claim, method, result, limitation
- How to write each part for the patching result from Lessons 22 and 23
- Why a single found circuit is suggestive, not a full explanation of the behavior
- Why this finding on a 1.5B model doesn't necessarily say anything about larger models
- How this write-up hands off into Chapter 6

## A different four-part structure for a different kind of claim

Project 1, 2, and 3's write-ups all used claim, method, result, limitation — the right shape for "we trained something and measured a number." An interpretability finding is making a causal claim about a mechanism, not reporting a training metric, and that calls for a structure built around how much to trust a causal story:

1. **Claim** — the specific mechanistic hypothesis, stated at the scope the evidence actually supports.
2. **Evidence** — the patching results that support it: what was swapped, what changed, by how much.
3. **Confidence** — how strongly the evidence actually supports the claim, stated honestly rather than rounded up.
4. **Falsifier** — what result, if you'd seen it instead, would have disproven the claim — and whether anything like that showed up anywhere in the sweep.

That last part is the one training write-ups don't need and interpretability write-ups can't skip: a causal claim about a model's internals is only as credible as the experiment that could have failed to support it but didn't.

## Claim

State the mechanistic hypothesis at the scope your actual patching results support — not broader:

> Patching [the specific layer and head found in Lessons 22–23]'s output from a correct-column generation into a hallucinating generation recovered the correct column name on [N] of [M] tested minimal pairs, and that head's attention pattern on the correct-column runs concentrates on the matching column-name span in the schema text — consistent with a copying mechanism whose failure correlates with schema hallucination in SQL Pete.

Notice the hedges doing real work: "consistent with," not "proves"; "correlates with," not "causes entirely." If your actual sweep found the effect spread across several heads rather than one clean standout, the claim should say that instead — a diffuse result is still a real, reportable finding, just a different one.

## Evidence

Report the patching results from Lessons 22 and 23 concretely, not as a summary adjective:

- **Layer sweep** (Lesson 22): which layer(s), when patched, recovered the correct column name, and on how many of the tested minimal pairs.
- **Head sweep** (Lesson 23): which specific head, at which layer, reproduced that recovery when patched alone, and how it compared to the other heads tested at the same layer.
- **Attention pattern check**: whether the identified head's attention weights, on the correct-column run, actually concentrate on the matching schema span — the qualitative check that the causal result and the mechanistic story agree with each other.

```python
# What evidence should let a reader reconstruct, at minimum:
layer_results = sweep_layer_patch(model, minimal_pairs)       # Lesson 22
head_results  = sweep_head_patch(model, TARGET_LAYER, minimal_pairs)  # Lesson 23
attention_check = inspect_attention_pattern(model, TARGET_LAYER, TARGET_HEAD, correct_pairs)
```

## Confidence

State plainly how far this evidence goes, and no further:

- **A handful of minimal pairs is not a benchmark.** If the patching experiments ran on a dozen or two constructed pairs rather than the full held-out set, say so — the result is a real causal finding on those pairs, not a measured rate across SQL Pete's whole behavior.
- **One circuit is suggestive, not a full explanation.** Even a clean, consistent patching result for one head explains one causal pathway to the hallucination behavior. It doesn't rule out other components contributing on other inputs, and it doesn't mean this head's only function is copying column names — attention heads in a trained model routinely do more than one job.
- **Correlational attention patterns are weaker evidence than the causal patching result.** The attention-pattern check is useful corroboration, but on its own it's the same kind of correlational evidence the induction-head paper is explicit about being weaker than a causal intervention — the patching result is what actually supports the causal claim; the attention pattern supports the *story* about why.

## Falsifier

Name the experiment that could have broken the claim, and say whether it did:

> If patching [the identified layer/head] from a correct run into a hallucinating run had left the hallucination unchanged, or if a different head at a different layer had shown the same or a stronger recovery effect, that would have falsified this specific claim. [State plainly which happened.]

A write-up that doesn't name its own falsifier reads as unfalsifiable by construction — which is a bigger red flag in interpretability than in most other empirical work, because it's unusually easy to find a plausible-looking correlation in a model's internals and call it a mechanism without ever having tried to break it.

## Why this doesn't generalize to larger models

One limitation specific to this finding's scope, separate from the confidence section above: SQL Pete is a 1.5B-parameter model, fine-tuned on a narrow two-schema task. A circuit found here — even a clean, well-evidenced one — says nothing directly about whether a 7B, 70B, or frontier-scale model handles the equivalent "copy a name from context or fall back to a plausible guess" behavior the same way, with the same kind of head, or with any single identifiable component at all. Larger models have more capacity to spread a function like this across more components, to implement it redundantly, or to implement it completely differently. Treat this finding as evidence about SQL Pete, specifically, not as a claim about how database assistants or language models in general resolve this behavior.

## Feeding into Chapter 6

This write-up — claim, evidence, confidence, falsifier — is the fourth and last artifact Chapter 6's portfolio-assembly lesson (Lesson 25) slots in, alongside Project 1's, Project 2's, and Project 3's write-ups. It's also the last technical lesson in this research lab: everything from here is about presenting the four findings you now have, not producing a fifth one. Keep the confidence section honest and the falsifier named plainly — a portfolio where the interpretability finding reads as more certain than the evidence supports is a worse signal to a reviewer than a modest, well-hedged one.

## Key terms

- **Claim** (interpretability) — the specific mechanistic hypothesis, stated at the scope the patching evidence actually supports
- **Evidence** — the concrete patching results: which layer, which head, how many pairs, what the attention pattern showed
- **Confidence** — an honest statement of how far the evidence goes, including sample size and what the finding doesn't rule out
- **Falsifier** — the specific result that would have disproven the claim, and whether it occurred

## Recap

An interpretability finding gets written up as claim, evidence, confidence, and falsifier — not claim, method, result, limitation — because a causal claim about a model's internals needs its own honesty check: what would have disproven it, and whether that happened. SQL Pete's patching result, named plainly with its sample size, its one-circuit scope, and its lack of generalization to larger models, becomes the fourth artifact in the portfolio. This closes Chapter 5 and the lab's technical work; Chapter 6, Lesson 25 picks up here to assemble this write-up alongside the other three into a single portfolio.
