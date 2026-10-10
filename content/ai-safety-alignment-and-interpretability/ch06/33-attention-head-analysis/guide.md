# Attention Head Analysis

Sparse autoencoders (Lesson 32) find features bottom-up, from activations. This lesson takes the opposite, top-down route: pick one attention head and study exactly what it does, using the same forward-hook tools from Lesson 30 plus one new technique -- ablation -- to tell a merely interesting pattern from a causally important one.

## What you'll learn

- How attention-pattern visualization reveals a head's apparent function
- The real, specific head categories found by studying BERT's attention
- Why visualizing a pattern isn't enough -- you need ablation to establish causal importance
- How to ablate a head and measure the effect with a logit-difference metric

## Reading attention patterns

For a given head and a given input, the **attention pattern** is the `(seq_len, seq_len)` matrix of attention weights: row `i`, column `j` is how much position `i` attends to position `j`. Plotting this matrix for several prompts is the cheapest way to form a hypothesis about a head's function -- does it mostly attend to the immediately preceding token? To a sentence-ending delimiter? To an earlier occurrence of the same token?

Clark et al.'s "What Does BERT Look At? An Analysis of BERT's Attention" (2019) did exactly this at scale across all 144 heads of base BERT, and found real, consistent structure: some heads attend heavily to delimiter tokens, some to a fixed positional offset, some broadly across the whole sentence, and heads within the same layer tend to behave similarly. More strikingly, some heads line up with specific syntactic relationships with high accuracy -- tracking a verb's direct object, a noun's determiner, or coreferent mentions of the same entity -- without ever being trained to do syntax directly.

## From pattern to causal claim: ablation

A head's attention pattern can look meaningful without actually mattering to the model's output -- the model might ignore that head's contribution entirely. **Ablation** closes that gap: zero out (or otherwise disable) one head's contribution to the residual stream, re-run the forward pass, and measure how much a specific behavior changes. If the behavior survives the ablation essentially unchanged, the head wasn't causally load-bearing for it, whatever its attention pattern suggested.

```python
import torch

def zero_head_hook(head_idx, num_heads, d_head):
    def hook(module, input, output):
        batch, seq, d_model = output.shape
        heads = output.view(batch, seq, num_heads, d_head).clone()
        heads[:, :, head_idx, :] = 0.0        # ablate just this head's contribution
        return heads.view(batch, seq, d_model)
    return hook

logits_clean = model(tokens)

handle = model.blocks[5].attn.register_forward_hook(zero_head_hook(head_idx=2, num_heads=8, d_head=64))
logits_ablated = model(tokens)
handle.remove()

logit_diff_clean = logits_clean[0, -1, correct_token] - logits_clean[0, -1, wrong_token]
logit_diff_ablated = logits_ablated[0, -1, correct_token] - logits_ablated[0, -1, wrong_token]
# a large drop from clean to ablated means this head was causally important for picking the correct token
```

The **logit difference** between a correct and an incorrect candidate token is a standard, clean metric precisely because it isolates the one thing you care about -- does the model still prefer the right answer -- without being muddied by the rest of the output distribution.

## Naming heads by function

Once ablation confirms a head matters, the field has settled on consistent names for recurring functional roles, used throughout this chapter and the circuit-finding literature it draws on: a **previous token head** attends from position `t` to position `t-1`; a **duplicate token head** attends from the current token back to an earlier occurrence of that same token. These categories come directly out of the Mathematical Framework paper's circuit analysis and recur across the induction-head and indirect-object-identification circuits covered in the next few lessons.

## Key terms

| Term | Meaning |
|---|---|
| Attention pattern | The `(seq_len, seq_len)` matrix of attention weights for one head on one input |
| Ablation | Disabling a component (e.g., zeroing a head's output) and re-running the model to test its causal importance |
| Logit difference | The gap between a correct and incorrect candidate token's logits, used as a clean behavioral metric |
| Previous token head | A head that attends from the current position to the immediately preceding position |
| Duplicate token head | A head that attends from the current token back to an earlier occurrence of that same token |

## Recap

Attention-pattern visualization suggests what a head might be doing; ablation and a logit-difference metric tell you whether it's actually causally responsible for a behavior, and recurring head types like previous-token and duplicate-token heads give the field a shared vocabulary for naming what's found. The next lesson applies this exact toolkit to the single most famous circuit discovered this way. Up next, Lesson 34: Induction Heads.
