# Script — What Reinforcement Learning Is

## Segment 1 (title)

Welcome to Reinforcement Learning and RL for LLMs. This is lesson one, the start of Chapter One, RL Foundations. Before we touch any algorithm, we need a clear answer to one question: what problem is reinforcement learning actually solving?

## Segment 2 (steps)

Machine learning splits into three families. Supervised learning trains on labeled examples, input paired with the correct output. Unsupervised learning finds structure in data that has no labels at all. Reinforcement learning is different from both: there's no correct answer provided anywhere. An agent takes actions in an environment and only gets back a reward number saying how good that action was.

## Segment 3 (steps)

Every RL problem reduces to one loop. The agent observes the current state, picks an action, and the environment responds with a reward and a new state. That's it — repeated over and over. The tricky part is that the reward is often delayed, so figuring out which earlier action actually deserved credit for a later win is what we call the credit assignment problem.

## Segment 4 (steps)

This loop isn't just for games. In RLHF, reinforcement learning from human feedback, and RLVR, reinforcement learning from verifiable rewards, the agent is a language model, its action is generating a response, and the reward comes from a human preference or an automatic check like a passing unit test. Same loop, new application.

## Segment 5 (outro)

Hold onto that loop — state, action, reward, repeat. Next up, lesson two: Markov Decision Processes, where we make that loop mathematically precise.
