# Script — Function Approximation for RL

## Segment 1 (title)

This is lesson fourteen, the last lesson of Chapter Two, and of this foundational stretch of the course. Lesson thirteen laid out exactly why tabular methods break down. Function approximation is the fix.

## Segment 2 (steps)

Instead of storing a number for every single state, you represent V or Q as a parameterized function — a smaller set of weights, theta, that take a state as input and produce a value. Learning now means adjusting theta with gradient descent, not updating individual table cells. Because the same parameters are shared across every input, updating theta from one state's experience automatically shifts the estimate for similar states too — generalization, for free.

## Segment 3 (code)

The simplest version is linear: V of s is just a weighted sum of hand-designed features of the state. Update the weights with the same TD error you've seen all chapter, multiplied by the feature vector for the current state, and every weight nudges in proportion to how active that feature was.

## Segment 4 (code)

Swap that linear model for a neural network, and you get something very close to a Deep Q-Network — one network, one Q-value output per action, trained with a Q-learning-style target, with a couple of stabilization tricks layered on because naively mixing TD bootstrapping with a neural network can get unstable.

## Segment 5 (outro)

Every concept in this course — MDPs, Bellman, exploration, TD, Q-learning, SARSA, and now function approximation — is the exact vocabulary the RLHF and RL for LLMs material ahead builds on. In that setting, the language model itself is the function approximator, and training it is just gradient-based updates toward higher expected reward.
