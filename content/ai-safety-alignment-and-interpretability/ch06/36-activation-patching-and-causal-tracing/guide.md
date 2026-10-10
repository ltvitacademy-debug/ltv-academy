# Activation Patching & Causal Tracing

Lesson 35 used patching as one step inside a larger circuit-finding workflow. This lesson formalizes activation patching as its own standalone method and walks through its best-known application: causal tracing, used in GPT models to locate exactly where a specific fact lives.

## What you'll learn

- The general definition of activation patching, independent of any one circuit
- How causal tracing (Meng et al.'s ROME) sweeps patching across every layer and position
- Why this is a causal method, in contrast to the correlational probing classifiers from Chapter 5
- How to run a minimal causal-tracing sweep and read the resulting heatmap

## Activation patching, defined generally

**Activation patching** runs a model twice on two related inputs -- a "clean" run and a "corrupted" run that differs in one specific detail -- then takes an activation from one run and splices it into the corresponding position of the other run's forward pass, before letting the forward pass continue. Whatever changes in the output as a result is attributable to that one patched activation, because everything else about the computation stayed the same. This directly isolates which single component, at which position, is causally responsible for carrying a particular piece of information.

## Causal tracing: sweeping patches to localize a fact

Meng et al.'s "Locating and Editing Factual Associations in GPT" (2022), which introduced the ROME editing method, uses exactly this idea to localize where a model stores a specific fact. The procedure: take a factual prompt ("The Eiffel Tower is located in ___"), corrupt the subject tokens' embeddings with noise so the model loses the information needed to answer correctly, then **selectively restore** (patch back in) the clean, uncorrupted activation of just one component -- one specific layer, at one specific token position -- and measure how much of the correct answer's probability comes back. Repeating this for every (layer, position) pair and plotting the results produces a heatmap showing exactly where the fact's information is concentrated. The paper's central finding, using this method, is that factual recall is concentrated in middle-layer MLP modules, specifically at the subject token's last position -- a surprisingly localized result that directly motivated ROME's targeted weight-editing approach.

## Causal, not correlational

Chapter 5's probing classifiers ask a correlational question: does a linear direction in some layer's activations correlate with a property of interest? A probe can succeed at that and still tell you nothing about whether the model's own forward computation actually *uses* that direction to produce its output -- the direction could be a byproduct, not a cause. Activation patching answers a different, stronger question: if you directly intervene on this one activation and nothing else, does the model's behavior change? That's a causal claim, not a correlational one, and it's the reason patching (not probing) is the method behind nearly every verified circuit in this chapter.

## A minimal causal-tracing sweep

```python
import torch

def causal_trace(model, corrupted_tokens, clean_cache, layers, positions, correct_token_id):
    results = torch.zeros(len(layers), len(positions))
    for i, layer_idx in enumerate(layers):
        for j, pos in enumerate(positions):
            clean_activation = clean_cache[layer_idx][:, pos, :]

            def patch_hook(module, input, output, pos=pos, clean_activation=clean_activation):
                output = output.clone()
                output[:, pos, :] = clean_activation   # restore just this one position's clean value
                return output

            handle = model.blocks[layer_idx].register_forward_hook(patch_hook)
            logits = model(corrupted_tokens)
            handle.remove()

            results[i, j] = logits[0, -1].softmax(-1)[correct_token_id]
    return results  # (layers, positions) -- brighter cells mark where restoring the fact mattered most
```

Each cell in `results` answers the same narrow causal question -- "if only this one layer, at this one position, had its clean activation back, how much correct-answer probability returns?" -- and sweeping every cell is what turns a single patch into a full localization map.

## Key terms

| Term | Meaning |
|---|---|
| Activation patching | Splicing an activation from one run into the corresponding position of a different run to test its causal role |
| Clean run / corrupted run | The two paired forward passes activation patching compares -- one intact, one missing or altered information |
| Causal tracing | Sweeping restoration-patches across every (layer, position) pair to localize where a model stores specific information |
| ROME | "Rank-One Model Editing," the weight-editing method causal tracing's localization result directly motivated |
| Correlational vs. causal method | Probing shows what correlates with a property; patching shows what the model's computation actually depends on |

## Recap

Activation patching is the general causal tool behind this chapter's circuit-finding work, and causal tracing applies it as a systematic sweep that located GPT's factual recall in middle-layer MLPs at the subject's last token -- a genuinely causal result that correlational probing alone couldn't establish. The final lesson surveys the shared tooling that makes running analyses like this one practical at scale. Up next, Lesson 37: Current Tools for Interpretability Research.
