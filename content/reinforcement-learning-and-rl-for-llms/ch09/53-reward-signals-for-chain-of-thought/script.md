# Script — Reward Signals for Chain-of-Thought

## Segment 1 (title)

Lesson 53, opening Chapter 9, RL for Reasoning. You've got the full toolkit now — PPO's mechanics, the RLHF pipeline, RLAIF. This chapter turns it toward a different target: not "more preferred," but "reasoning correctly." First question: where does the reward even attach to a chain-of-thought trace?

## Segment 2 (code)

Nothing about the RL machinery changes. The policy is still the LLM, actions are still tokens, and the trajectory still runs through the same clipped PPO objective from Chapter 4. What's different is the content of the trajectory — it's now a full reasoning trace plus a final answer. The open question is what that score function actually computes.

## Segment 3 (steps)

A reasoning trace gives you more than one place to attach a reward. You can score the whole trace with one scalar, the way Chapter 7's RLHF pipeline already does. You can check just the final answer against ground truth — an outcome reward. Or you can score each intermediate step on its own — a process reward. Lesson 54 picks that distinction apart in full.

## Segment 4 (steps)

A Chapter 6 preference reward model is a weak fit here. Humans are slow and unreliable at checking a dense page of algebra, so preference labels on reasoning traces get noisy and expensive fast, and they pick up superficial cues — confident, fluent-sounding reasoning gets rewarded whether or not it's actually correct. That's a direct setup for the reward hacking failure modes lesson 57 covers.

## Segment 5 (outro)

Math and code are checkable — a numeric answer can be verified, code can be run against tests. That's the seed of RLVR, which lesson 55 covers. For now: reasoning traces are just longer rollouts, and where the reward attaches is the whole game. Next, lesson 54 draws out outcome reward versus process reward.
