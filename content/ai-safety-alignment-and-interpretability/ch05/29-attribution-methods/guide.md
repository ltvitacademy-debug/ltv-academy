# Attribution Methods

This closing lesson of the chapter covers attribution: gradient-based techniques that try to answer "which input features, or which internal components, actually drove this specific output?" It's the natural next step after the logit lens — instead of asking what the model predicts at a given layer, attribution asks what caused the prediction in the first place. It's also where this chapter gets most honest about a method's limits, because attribution methods have a well-documented track record of looking convincing while being wrong.

## What you'll learn

- What gradient-based attribution is trying to measure, and the simplest version: saliency maps
- How Integrated Gradients improves on raw saliency by satisfying two concrete axioms
- How to implement a basic attribution method against a toy transformer in PyTorch
- The real, documented failure modes of attribution methods — not hypothetical concerns
- How to use attribution responsibly alongside the other techniques in this chapter

## The basic idea: gradients as attribution

The simplest attribution method, sometimes called a **saliency map**, computes the gradient of a model's output (say, the logit for the correct next token) with respect to the input embeddings. The intuition: a large gradient at an input position means a small change there would meaningfully change the output, so that position is "important" to the prediction. Simonyan, Vedaldi, and Zisserman introduced this for image classifiers in 2013, and the same idea transfers directly to transformer input embeddings.

```python
import torch

def saliency_map(model, input_ids, target_token_idx):
    embeddings = model.embed(input_ids).clone().requires_grad_(True)
    logits = model.forward_from_embeddings(embeddings)  # skips re-embedding
    target_logit = logits[0, -1, target_token_idx]       # logit for the token we care about

    target_logit.backward()
    grads = embeddings.grad[0]              # (seq_len, d_model)
    saliency = grads.norm(dim=-1)           # one scalar per input token
    return saliency
```

A high saliency value at a given token position says: a small perturbation there would most steeply change this particular logit. That's a real, computable signal — but it is a local, linear approximation around one specific input, not a complete causal story.

## Integrated Gradients: a principled improvement

Raw saliency has a known weakness: gradients can saturate. If the model's function is already flat in some region (common once a feature has clearly pushed the prediction one way), the gradient there can be near zero even though that feature mattered enormously to the final output. Integrated Gradients, from Sundararajan, Taly, and Yan's 2017 paper, fixes this by integrating the gradient along a straight-line path from a baseline input (often an all-zero or all-padding embedding) to the actual input, rather than taking the gradient at just one point.

```python
def integrated_gradients(model, input_ids, baseline_ids, target_token_idx, steps=50):
    embed_input = model.embed(input_ids)
    embed_baseline = model.embed(baseline_ids)

    total_grads = torch.zeros_like(embed_input)
    for step in range(1, steps + 1):
        alpha = step / steps
        interpolated = embed_baseline + alpha * (embed_input - embed_baseline)
        interpolated = interpolated.clone().requires_grad_(True)

        logits = model.forward_from_embeddings(interpolated)
        target_logit = logits[0, -1, target_token_idx]
        target_logit.backward()

        total_grads += interpolated.grad
        model.zero_grad()

    avg_grads = total_grads / steps
    attributions = (embed_input - embed_baseline) * avg_grads
    return attributions.norm(dim=-1)[0]   # one scalar per input token
```

The paper justifies this construction with two axioms an attribution method should satisfy: **Sensitivity** (if changing one feature changes the prediction, that feature should get nonzero attribution) and **Implementation Invariance** (two functionally identical networks, even if implemented differently, should yield identical attributions). The paper shows that several earlier, simpler methods violate one or both axioms, which is the actual argument for why Integrated Gradients' extra integration step is worth the added compute.

## The real failure modes — not hypothetical

This is where attribution methods need the most caution, and the caution comes from actual published results rather than abstract worry. Adebayo and colleagues' "Sanity Checks for Saliency Maps" ran basic sanity tests against popular saliency methods — for instance, randomizing the model's weights entirely, or randomizing the data labels — and found that several widely used methods produced visually similar-looking attribution maps regardless of whether the model or the data was actually meaningful. A method that gives you basically the same output whether the model is trained or randomly initialized is not actually measuring something tied to what the model learned; it is closer to a fixed function of the raw input, similar to classical edge detection. This is a genuinely uncomfortable finding: attribution maps can look specific and convincing to a human eye while carrying very little real information about the model's learned behavior.

## Using attribution responsibly

Given that failure mode, treat any single attribution map as a hypothesis, not a conclusion. Cross-check it: does a saliency map survive the kind of randomization test Adebayo's paper describes? Does Integrated Gradients' result on the same input agree with what a probing or logit-lens analysis (Lessons 26 and 28) already suggested about where relevant information lives? Attribution is most trustworthy when it's one line of evidence among several converging on the same answer, and least trustworthy when it's the only check you've run, especially for a high-stakes claim like "this component is responsible for this specific unsafe output."

## Key terms

| Term | Meaning |
|---|---|
| Saliency map | The simplest gradient-based attribution method: the gradient of an output with respect to input features, used as a measure of local importance |
| Gradient saturation | A failure mode where a feature's gradient is near zero despite that feature mattering a great deal, because the model's function is locally flat near the input |
| Integrated Gradients | An attribution method that integrates gradients along a path from a baseline input to the actual input, designed to satisfy the Sensitivity and Implementation Invariance axioms |
| Sanity check (for attribution) | A test, such as randomizing model weights or data labels, used to check whether an attribution method's output actually depends on what the model learned |
| Attribution as hypothesis | The responsible framing this lesson recommends: treat any single attribution result as a lead to cross-check, not a standalone, conclusive explanation |

## Recap

Gradient-based attribution — from simple saliency maps to the more principled Integrated Gradients — gives you a concrete, computable way to ask which inputs drove a specific output, but documented sanity-check failures mean a convincing-looking attribution map can be nearly independent of what the model actually learned, so it earns trust only alongside other evidence. That closes Chapter 5's tour of interpretability foundations — probing, visualization, the logit lens, and attribution together form the diagnostic toolkit the rest of this course builds on. Next up, Chapter 6 opens with Lesson 30: Circuits: What They Are, where this diagnostic toolkit starts getting pointed at real, named computational structures inside a model.
