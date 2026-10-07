# Script — Experience Replay & Target Networks

## Segment 1 (title)

Lesson 15 introduced DQN and flagged that training it naively is unstable. This lesson covers the two fixes that actually make it work: experience replay and the target network.

## Segment 2 (steps)

An agent's experience is one long correlated trajectory — each state looks like the one before it. Training a network directly on that sequence breaks the independent-data assumption gradient descent relies on. Worse, the same network appears on both sides of the DQN loss, so every update to theta also moves the target the network is chasing.

## Segment 3 (code)

Experience replay fixes the correlation half of the problem: store every transition in a buffer, then train on randomly sampled minibatches instead of the raw sequence. That decorrelates training steps and lets each transition get reused many times instead of thrown away after one update.

## Segment 4 (code)

The target network fixes the moving-target half: a second copy of the network, theta minus, computes the target side of the loss and isn't trained by gradient descent at all. It's synced in from theta either with a hard copy every so many steps, or with a small continuous blend called a Polyak update.

## Segment 5 (outro)

Replay buffer plus target network: that's the full recipe behind the original DQN paper. Up next, lesson 17, two more refinements — Double DQN and Dueling DQN.
