# Current Tools for Interpretability Research

Every technique in this chapter -- head hooking, ablation, patching, SAE training -- was shown as hand-rolled PyTorch so you'd understand exactly what's happening underneath. In practice, the field no longer writes that code from scratch for every project. This closing lesson surveys the shared tooling that replaced it, and how interpretability research matured from one-off scripts into a reusable stack.

## What you'll learn

- What TransformerLens provides that hand-written hooks don't
- What sae_lens adds specifically for sparse-autoencoder work
- Why shared tooling matters for reproducibility, not just convenience
- How the library-based version of this chapter's techniques actually reads

## From bespoke scripts to shared libraries

The earliest circuits-era papers -- the Mathematical Framework paper, the induction-heads paper -- were built on custom analysis code written for that specific project. As the techniques in this chapter (hooking components, caching activations, ablating, patching) turned out to be the same handful of operations over and over, the field converged on shared libraries that implement them once, correctly, with a consistent interface. Neel Nanda's own guidance for newcomers is characteristically hands-on: spend real time writing code and experimenting with actual model internals, not just reading papers -- and the tools below are what that experimentation now runs on.

## TransformerLens: the field's standard library

**TransformerLens** (originally built by Neel Nanda, now maintained as `TransformerLensOrg/TransformerLens` on GitHub) wraps a pretrained model in a `HookedTransformer`, giving named, indexed access to every internal activation -- no manual `nn.Module` hook-juggling required. Running `run_with_cache` returns every component's activations for a given input in one call, replacing the one-off hooks from Lessons 30, 33, 35, and 36 with a standard, reusable interface.

```python
# Illustrative TransformerLens-style usage -- the library's API, not a hand-rolled hook
from transformer_lens import HookedTransformer

model = HookedTransformer.from_pretrained("gpt2-small")
logits, cache = model.run_with_cache("The cat sat on the")

pattern = cache["pattern", 5]              # layer 5's attention patterns, every head at once
head_out = cache["result", 5][:, :, 2, :]  # layer 5, head 2's own output -- no manual hook needed
```

Everything this snippet retrieves -- a full layer's attention patterns, one specific head's isolated output -- is exactly what Lessons 30 and 33 built by hand with `register_forward_hook` and manual tensor reshaping. The library doesn't change the underlying idea; it removes the boilerplate around it, which is what let the field move from "someone's custom analysis script" to code other researchers can actually reuse and check.

## sae_lens: shared infrastructure for Lesson 32's technique

**sae_lens** (maintained as `jbloomAus/SAELens`) does the equivalent for sparse autoencoders: training new SAEs on a model's activations, loading pretrained SAEs other researchers have already published, and generating feature dashboards for inspecting what a given learned feature actually responds to. Instead of every lab re-implementing the reconstruction-plus-L1 loss from Lesson 32 from scratch, sae_lens gives a shared, tested implementation and a way to share and reload the resulting SAEs.

## Why shared tooling matters beyond convenience

A library isn't just less typing. When every researcher's ablation, patching, and caching code goes through the same tested implementation, results are easier to reproduce, easier to check against each other, and easier to build on directly instead of re-deriving. That's a meaningful part of how the field went from a handful of landmark single papers (the ones cited throughout this chapter) to a broader, faster-moving research community working from a shared vocabulary and a shared toolkit.

## Key terms

| Term | Meaning |
|---|---|
| TransformerLens | The field's standard library for hooking, caching, and intervening on transformer internals |
| `HookedTransformer` | TransformerLens's wrapper around a pretrained model exposing named access to every internal activation |
| `run_with_cache` | A TransformerLens call returning every component's activations for an input in one step |
| sae_lens | A shared library for training, loading, and inspecting sparse autoencoders |
| Shared tooling | Common, tested libraries replacing one-off research scripts, improving reproducibility across the field |

## Recap

TransformerLens and sae_lens turn this chapter's hand-written hooks, ablations, patches, and SAE training into standard, reusable library calls -- the same underlying ideas from Lessons 30 through 36, now built on shared, checkable infrastructure instead of bespoke scripts. That closes this chapter on mechanistic interpretability; the course continues from here into applying these tools toward concrete safety problems.
