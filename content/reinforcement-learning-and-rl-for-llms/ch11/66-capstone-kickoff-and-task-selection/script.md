# Script — Capstone Kickoff & Task Selection

## Segment 1 (title)

Lesson 66, opening Chapter 11, the Capstone. Everything in this course has been building toward this: training a real model with real PPO on a task where the reward can be checked mechanically, instead of needing a learned reward model at all. This lesson is step one — choosing the task and scoping the project.

## Segment 2 (steps)

A good capstone task needs a verifier that's cheap, deterministic, and hard to satisfy by accident. Math answer-checking and code unit tests both qualify — the checker is a fixed program, not a trained model, so unlike a reward model it can't drift or get overoptimized under RL pressure. Anything that needs a fuzzy "does this sound good" judgment doesn't belong here.

## Segment 3 (code)

Pick a small model in the half-billion to three-billion parameter range, something already instruction-tuned so it isn't relearning basic formatting once RL starts. Load your task dataset, and set aside a held-out slice right now, before training touches any of it — you'll need an untouched set later for evaluation.

## Segment 4 (steps)

Scope the whole project to actually finish: a tractable model size, an instruction-tuned starting checkpoint, and one of the two reliable verifiable-reward families, math or code correctness. That's the entire decision space for this lesson.

## Segment 5 (outro)

Pick the task, pick the model, hold out your eval set. Next lesson, you'll write the verifier itself — the reward function PPO will actually optimize against.
