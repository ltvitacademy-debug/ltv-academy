# Script — Policy Gradient Methods

## Segment 1 (title)

Everything so far in this chapter has been value-based: learn Q, act by argmax. This lesson introduces a different family entirely — policy gradient methods, which learn the policy directly.

## Segment 2 (steps)

Instead of deriving a policy from a Q-function, policy gradient methods parameterize the policy itself and improve its weights by gradient ascent on expected return. That matters because policies can be naturally stochastic, they extend cleanly to continuous actions, and — most relevant to where this course is headed — a language model already is a stochastic policy over the next token. This family maps onto LLMs far more directly than value-based methods do.

## Segment 3 (code)

The policy gradient theorem says the gradient of expected return equals the expected value of the gradient of log-probability, weighted by how good the action turned out to be. In plain terms: push up the probability of actions that led to high return, push down the ones that led to low return. No model of the environment's dynamics required.

## Segment 4 (code)

In code, a discrete policy network outputs logits, wraps them in a categorical distribution, and sampling from that distribution both chooses the action and gives built-in exploration. The log probability of the sampled action is exactly the term the policy gradient theorem calls for, and PyTorch's autograd handles the rest.

## Segment 5 (outro)

That's the theory. Up next, lesson 19 turns it into the simplest algorithm you can actually run: REINFORCE.
