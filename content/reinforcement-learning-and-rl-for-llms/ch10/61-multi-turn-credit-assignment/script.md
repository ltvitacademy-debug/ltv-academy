# Script — Multi-Turn Credit Assignment

## Segment 1 (title)

Lesson 61, Chapter 10. Last lesson deferred a question: in a trajectory with many tool calls and reasoning steps, which ones deserve credit when the outcome is good? That's the credit assignment problem from Chapter 1's MDP formalism, now stretched across a much longer, sparser horizon than any single-turn response ever presented.

## Segment 2 (code)

The Bellman equation's backward-propagation idea doesn't stop being true at turn granularity — it's exactly as valid whether a step is one token or one full turn. What's harder is scale: a multi-turn trajectory can span dozens of full turns, each with its own hundreds of tokens, with the only reward arriving once, at the very end. Turn-level GAE is literally lesson 25's formula, with turn substituted for token.

## Segment 3 (steps)

One real design choice this scale forces: discount per turn, or per token? A single discount applied per token across dozens of turns decays early turns' contribution to almost nothing. Most multi-turn setups discount at the turn level instead, keeping the effective horizon comparable to what classic RL methods were designed around, while tokens inside one turn share that turn's undiscounted credit.

## Segment 4 (steps)

Pure advantage estimation over one sparse terminal reward is a lot to ask of a value function early in training. Reward decomposition helps — attaching partial, well-defined signals to specific turns where possible, like penalizing a tool call that returned a clear error right at that turn, without hand-authoring a dense proxy reward that risks Chapter 5's shaping pitfalls. Even so, a handful of pivotal turns can still get diluted against dozens that didn't matter much either way.

## Segment 5 (outro)

Turn-level GAE and partial reward decomposition help, but long-horizon credit assignment isn't fully solved. Next, lesson 62 turns to the environment side: what an agentic RL environment needs to provide to generate, score, and reset these trajectories at all.
