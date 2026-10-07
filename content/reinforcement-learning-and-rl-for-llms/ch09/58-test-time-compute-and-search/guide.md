# Test-Time Compute & Search

This is lesson 58 of Chapter 9, RL for Reasoning. Every lesson so far in this chapter has been about changing the policy through training. This lesson is about a different lever entirely: spending more compute at *inference* time, after training is done, to get a better answer out of a fixed model. It's a complement to RLVR training, not a replacement for it, and it's where the process reward models from lesson 54 earn back their cost.

## What you'll learn

- Best-of-n sampling and how a verifier or reward model picks the winner
- Self-consistency: majority voting across independent reasoning paths
- Search guided by a process reward model, in the style of tree search
- Why test-time compute and RL training are complementary, not competing, levers

## Best-of-n

The simplest test-time method: sample multiple independent completions for the same prompt, score each one, and keep the best.

```python
def best_of_n(prompt, policy, scorer, n=16):
    candidates = [policy.generate(prompt) for _ in range(n)]
    scores = [scorer(prompt, c) for c in candidates]
    return candidates[argmax(scores)]
```

The `scorer` can be an outcome verifier (lesson 55) when ground truth is checkable, or a learned reward/process model when it isn't. Quality improves with n, but with diminishing returns, and cost scales linearly with n — this is literally trading inference compute for accuracy, with no change to the underlying policy at all.

## Self-consistency

A specific, cheaper variant of best-of-n that needs no separate scorer: sample n reasoning paths, extract each one's final answer, and take a majority vote.

```python
def self_consistency(prompt, policy, n=16):
    answers = [extract_answer(policy.generate(prompt)) for _ in range(n)]
    return Counter(answers).most_common(1)[0][0]   # the most frequent final answer
```

This works because independent reasoning errors tend not to agree with each other, while correct reasoning across diverse paths tends to converge on the same answer — so the mode of the answer distribution is often more reliable than any single sample. It needs no reward model or verifier at inference time, only a way to extract and compare final answers, which makes it the cheapest search-like method available.

## Search guided by a process reward model

Best-of-n and self-consistency only look at completed traces. A PRM (lesson 54) can instead guide search *while generating*, pruning bad partial paths before they're finished — closer to classic tree search (as in MCTS from earlier RL literature) than to simple resampling.

```python
def prm_guided_search(prompt, policy, prm, beam_width=4, max_steps=10):
    beams = [[prompt]]
    for _ in range(max_steps):
        candidates = [beam + [step] for beam in beams for step in policy.propose_next_steps(beam)]
        scores = [prm(c) for c in candidates]             # score each partial trace so far
        beams = top_k(candidates, scores, beam_width)      # keep only the most promising partial paths
    return beams[0]
```

This is more expensive per answer than plain best-of-n (every intermediate step gets scored, not just the final trace), but it spends that extra compute more intelligently, abandoning unpromising lines of reasoning early rather than generating them to completion and discarding them afterward.

## A complement, not a substitute, for RL training

Test-time methods and RLVR training (lesson 55) target the same outcome — better final answers — through entirely different mechanisms, and they stack rather than compete. RLVR training improves the policy's *base rate* of producing a good trace on a single try; test-time search then improves the odds further by exploring multiple tries from that improved base rate. A better-trained policy also makes best-of-n and self-consistency cheaper in practice, since you need fewer samples to find (or converge on) a correct answer when the policy's single-shot accuracy is already higher. This is also the practical reasoning behind spending PRM-labeling effort in the first place, from lesson 54: a PRM that's too expensive to use as a dense RL training signal across millions of rollouts can still be affordable as a search guide used only at inference time, on the much smaller number of queries that actually reach a user.

## Key terms

- **Best-of-n** — sampling n completions and keeping the one a scorer ranks highest
- **Self-consistency** — majority voting over final answers extracted from n independent reasoning paths, needing no separate scorer
- **PRM-guided search** — using a process reward model to score and prune partial reasoning paths during generation, not just completed traces
- **Test-time compute** — additional inference-time computation spent to improve answer quality from a fixed, already-trained policy

## Recap

Test-time compute — best-of-n, self-consistency, and PRM-guided search — buys better answers from a fixed policy by spending more inference compute, and stacks with RLVR training rather than replacing it. This closes the loop on the "how do we get better reasoning" half of the chapter. Lesson 59 turns to the harder question: how do you know any of this chapter's techniques actually improved reasoning, rather than just inflating a benchmark score?
