# Script — The Bradley-Terry Model

## Segment 1 (title)

Lesson 37, Chapter 6. You now have a dataset of preference pairs. This lesson covers the piece of statistics that turns it into an actual training objective: the Bradley-Terry model.

## Segment 2 (steps)

Bradley-Terry dates back to 1952, built originally for ranking competitors, like chess players, purely from match outcomes, without ever observing an absolute skill score. Each item gets a latent strength, and the probability one beats the other depends only on the difference in strengths. For reward modeling, the items are responses and the strength is exactly the scalar reward the model is learning to assign.

## Segment 3 (code)

The formula says the probability that the chosen response beats the rejected response, given the prompt, is the logistic sigmoid of the difference in their rewards. If the chosen response scores much higher, the sigmoid pushes that probability close to one. If the two scores are close, it predicts something close to a coin flip — which matches how a human would see two nearly-identical responses too.

## Segment 4 (code)

Training means choosing parameters that make the observed human preferences as likely as possible under that formula. That's a maximum likelihood setup, and it becomes this loss: for every prompt, chosen, rejected triple, take the difference in the model's two scores, pass it through the sigmoid, and penalize the negative log of that probability. Minimizing this is exactly what pushes the reward model to score chosen responses above rejected ones, consistently.

## Segment 5 (outro)

This loss is what TRL's RewardTrainer actually implements. Next lesson: training a real reward model with it.
