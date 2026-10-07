# Script — Reward, Policy & Value Functions

## Segment 1 (title)

This is lesson three, still in Chapter One, RL Foundations. Now that you know what an MDP is, this lesson gives you the vocabulary for describing and judging behavior inside one: policy, return, and value function.

## Segment 2 (steps)

A policy is the agent's strategy. A deterministic policy always picks the same action in a given state. A stochastic policy instead gives a probability distribution over actions. That second form matters a lot in practice — it's what lets an agent explore, and it's exactly the shape of a language model's output distribution when the model itself is treated as a policy.

## Segment 3 (code)

A single reward only tells you about one step. What the agent actually wants to maximize is the return: the discounted sum of all future reward from this point on. The discount factor does two jobs — it keeps that infinite sum finite, and it says reward sooner is worth more than the same reward much later.

## Segment 4 (steps)

Value functions turn that return into something reusable. V of s is the expected return if you're in state s and follow policy pi from here. Q of s and a is the expected return if you take action a right now, then follow pi afterward. Q is the one you'll see most, because comparing Q for two different actions tells you immediately which one is better, without simulating anything.

## Segment 5 (outro)

Policy decides how you act, return sums up reward, value functions estimate it in advance. Next up, lesson four: the Bellman equation, which gives V and Q a recursive definition almost every algorithm in this course relies on.
