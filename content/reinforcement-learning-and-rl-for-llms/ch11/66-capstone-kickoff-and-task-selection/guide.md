# Capstone Kickoff & Task Selection

This is lesson 66, opening Chapter 11, the Capstone. Everything in this course has been building toward one project: training a real model with real PPO, on a task where you don't need a learned reward model at all because the reward can be checked mechanically. Chapter 9 called this a verifiable reward — RLVR, the approach behind DeepSeek-R1-style reasoning training. Chapter 4 gave you PPO's mechanics from the clipped objective through GAE and hyperparameters. This chapter puts both to work end to end: pick a task, write a verifier, run PPO with Hugging Face TRL, evaluate honestly, and write it up. This lesson is the first step — choosing the task and scoping the project before any code runs.

## What you'll learn

- What makes a reward "genuinely verifiable" versus merely plausible to check
- Two solid capstone task families: math word problems and code correctness
- Why a gameable verifier is worse than no verifier at all
- How to scope model size and compute to something that finishes training in hours, not days
- Where to get a starting model and why it should already be instruction-tuned

## What makes a task genuinely verifiable

A verifiable-reward task needs a checker that is cheap, deterministic, and hard to satisfy by accident. GSM8K-style math word problems qualify: the ground-truth answer is a single number, and checking `predicted == ground_truth` is exact. A simple code-correctness task qualifies too: run the generated function against a handful of unit tests and check they all pass. Both are unlike RLHF's reward model (Chapter 6) — no preference data, no Bradley-Terry training, no learned proxy that can be overoptimized the way lesson 39 described. The verifier itself can't drift, because it's a fixed program, not a trained model.

What disqualifies a task is any verifier that's *approximate*. "Does this summary sound good?" has no mechanical check — that's exactly the gap reward models exist to fill. For a capstone, stay on the verifiable side of that line.

## Scoping the project to finish

Pick a model you can run PPO on with a single GPU in a reasonable session — something in the 0.5B–3B parameter range (Qwen2.5-0.5B/1.5B-Instruct and SmolLM2 are common, tractable choices), already instruction-tuned so it can follow a prompt format before RL even starts. Training from a raw base model works but wastes the capstone's limited time relearning formatting that an SFT checkpoint already has.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "Qwen/Qwen2.5-0.5B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
base_model = AutoModelForCausalLM.from_pretrained(model_name)
```

Load your task dataset (GSM8K is on the Hugging Face Hub) and hold out a slice before training even begins — lesson 69 depends on that held-out set never having been seen during PPO.

```python
from datasets import load_dataset

gsm8k = load_dataset("gsm8k", "main")
train_set = gsm8k["train"]
held_out_set = gsm8k["test"]  # never touched until evaluation
```

## Key terms

- **Verifiable reward** — a reward computed by a deterministic checker against ground truth, not a learned model
- **RLVR** — reinforcement learning with verifiable rewards, the approach Chapter 9 introduced for math/code reasoning
- **Scoping** — choosing model size and compute budget so the project actually finishes
- **Held-out set** — data never used during training, reserved entirely for lesson 69's evaluation

## Recap

A good capstone task has a mechanical, ungameable verifier — math answer-checking or unit-test code correctness are the two reliable choices — paired with a small instruction-tuned model and a held-out slice set aside before training starts. Next lesson, you'll write the verifier itself: the reward function PPO will actually optimize against.
