# Capstone: Evaluation Against Baseline

This is lesson 69, continuing Chapter 11, the Capstone. Training finished last lesson with a reward curve that (hopefully) climbed. That curve is not the evaluation — it's a training-time diagnostic, measured on the data the policy was actively optimizing against. This lesson covers the separate, rigorous check: did the PPO-trained model actually get better at the task, measured honestly against the baseline it started from.

## What you'll learn

- Why the training reward curve alone is not a valid evaluation
- Running both the baseline and the PPO-trained model on the held-out set from lesson 66
- Pass-rate comparison as the primary evaluation metric
- How to check for reward hacking and degenerate outputs that a pass-rate number alone can hide

## Why the training curve isn't enough

The reward curve from lesson 68 is measured on *training* data, using the exact reward function the policy is being optimized against — of course it tends to rise; that's what PPO is doing. It tells you training is proceeding, not that the model generalized. A model can learn to exploit a quirk specific to the training distribution, or specific to the reward function, in ways that don't transfer. The real question — did the model get better at the *task* — needs a dataset it never saw during training, which is exactly why lesson 66 told you to carve out `held_out_set` before training started.

## Pass-rate comparison

```python
def pass_rate(model, tokenizer, eval_set, verify_fn):
    correct = 0
    for item in eval_set:
        inputs = tokenizer(item["question"], return_tensors="pt")
        output_ids = model.generate(**inputs, max_new_tokens=256, do_sample=False)
        response = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        reward = verify_fn(response, item["answer"])
        correct += reward > 0
    return correct / len(eval_set)

baseline_rate = pass_rate(base_model, tokenizer, held_out_set, verify_reward)
ppo_rate = pass_rate(ppo_trainer.model, tokenizer, held_out_set, verify_reward)
print(f"baseline: {baseline_rate:.2%}  ppo: {ppo_rate:.2%}")
```

Run both models with greedy decoding (`do_sample=False`) so the comparison isn't muddied by sampling variance — any gap you see should come from the policy change, not from random generation differences between runs.

## Checking for reward hacking and degenerate outputs

A pass-rate improvement alone can still hide a problem. Read a sample of the PPO model's actual generations, not just its scores: is it writing shorter, lower-quality reasoning that happens to land on the right number by luck? Is it repeating the answer-format string multiple times to game an imperfectly-guarded verifier (exactly the exploit lesson 67 warned about)? Compare response-length distributions between baseline and PPO model, and spot-check a handful of "correct" PPO responses by eye. A real improvement should come with reasoning that still looks coherent — not a gamed shortcut.

## Key terms

- **Training reward curve** — a diagnostic of optimization progress, not a validity check of generalization
- **Pass rate** — the fraction of held-out examples a model's generated answer passes the verifier on
- **Greedy decoding** — generating with `do_sample=False`, removing sampling variance from a baseline-vs-PPO comparison
- **Degenerate output check** — manually reading generations to catch reward hacking a pass-rate number alone would miss

## Recap

A valid capstone evaluation compares pass rate on a held-out set the model never trained on, using greedy decoding for both baseline and PPO model, and backs that number up with an eyeballed check for reward hacking. Final lesson next: writing up these results and where to go next in RL for LLMs.
