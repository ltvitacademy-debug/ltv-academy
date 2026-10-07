# Script — Markov Decision Processes

## Segment 1 (title)

This is lesson two, still in Chapter One, RL Foundations. Lesson one gave you the agent-environment loop in plain English. Now we give it a rigorous skeleton: the Markov Decision Process.

## Segment 2 (steps)

An MDP is formally a tuple: S and A, the sets of possible states and actions; P of s prime given s and a, the transition probabilities that capture the environment's dynamics, including any randomness; R, the reward function; and gamma, the discount factor that controls how much the agent values future reward versus immediate reward. Those five pieces fully specify an RL problem.

## Segment 3 (code)

The name Markov refers to one load-bearing assumption: the next state depends only on the current state and action, never on the history that led there. If your state representation leaves out something that actually matters for the future, that assumption breaks and the math built on top of it stops holding.

## Segment 4 (code)

Here's that transition function in a real environment. Gymnasium's FrozenLake, with is-slippery set to true, means the agent's chosen action doesn't always produce the move it intended — that randomness is exactly P of s prime given s and a.

## Segment 5 (outro)

Keep that tuple in mind: states, actions, transitions, reward, and a discount factor. Next up, lesson three: reward, policy, and value functions — how we actually describe and judge behavior inside an MDP.
