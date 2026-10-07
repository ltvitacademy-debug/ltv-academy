# The Bradley-Terry Model

This is lesson 37 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 6, Reward Modeling. You now have a dataset of preference pairs — a chosen response and a rejected response for each prompt. This lesson covers the piece of statistics that turns that dataset into an actual training objective: the Bradley-Terry model, which relates a scalar reward to the probability that one item is preferred over another.

## What you'll learn

- The origin of the Bradley-Terry model as a general model of pairwise comparisons
- The exact formula connecting a reward function to a preference probability
- How that formula becomes the training loss used in lesson 38
- Why this specific functional form (the logistic sigmoid) is the natural choice here

## A general model of pairwise comparisons

The Bradley-Terry model dates back to 1952, originally developed for ranking competitors (think chess players or sports teams) from a record of pairwise match outcomes, without ever observing an absolute "skill score" directly. The core idea: assign each item a latent strength value, and say the probability that item A beats item B is a function of the difference between their strengths. Applied to reward modeling, the "items" are responses, and "strength" is exactly the scalar reward r(x, y) a reward model is learning to assign.

## The formula

Given a reward function r and a prompt x, the Bradley-Terry model says the probability that response y_w (the "winner," i.e. the chosen response) is preferred over y_l (the "loser," i.e. the rejected response) is:

```
P(y_w ≻ y_l | x) = σ(r(x, y_w) − r(x, y_l))
```

where σ is the logistic sigmoid function, σ(z) = 1 / (1 + e^(−z)). Notice what this says intuitively: if the chosen response's reward is much higher than the rejected response's reward, the sigmoid pushes the predicted preference probability close to 1. If the two rewards are close, the model predicts something close to a coin flip — which matches intuition, since a human would find those two responses hard to tell apart too.

## From probability to training loss

Training a reward model means choosing parameters θ for r_θ that make the observed human preferences as likely as possible under this formula. That's a direct maximum-likelihood setup, and it turns into a loss you minimize over the preference dataset:

```
L(θ) = −E_(x, y_w, y_l)[ log σ(r_θ(x, y_w) − r_θ(x, y_l)) ]
```

In words: for every (prompt, chosen, rejected) triple in the dataset, compute the reward model's score for both the chosen and rejected response, take their difference, pass it through the sigmoid, and penalize the negative log of that probability. Minimizing this loss is exactly what pushes r_θ to assign higher scores to chosen responses than to rejected ones, consistently across the whole dataset. This is the loss `RewardTrainer` implements and minimizes in lesson 38's training code.

## Why the sigmoid, specifically

The logistic sigmoid isn't an arbitrary modeling choice — it falls directly out of assuming each response's "true quality" is a reward plus independent noise from a logistic distribution, and taking the probability that one noisy quantity exceeds another. The practical upshot is simpler than the derivation: the sigmoid guarantees the predicted preference probability is always between 0 and 1, it's smooth and differentiable everywhere (so gradient descent works cleanly), and it only depends on the *difference* in rewards, not their absolute scale — which is exactly the right invariance, since nothing in human preference judgments tells you what the zero point or units of "reward" should be, only which of two things is bigger.

## Key terms

- **Bradley-Terry model** — a 1952 statistical model relating the probability of a pairwise comparison outcome to the difference in latent strengths of the two items
- **Logistic sigmoid σ(z)** — 1 / (1 + e^(−z)); maps any real number to a probability between 0 and 1
- **y_w / y_l** — the winner (chosen) and loser (rejected) response in a preference pair
- **Maximum likelihood** — choosing model parameters that make the observed data as probable as possible under the model

## Recap

The Bradley-Terry model gives reward modeling its training objective: P(y_w ≻ y_l | x) = σ(r(x,y_w) − r(x,y_l)), minimized as a negative log-likelihood loss over the preference dataset. Next lesson: putting this loss to work training an actual reward model with TRL's `RewardTrainer`.
