# Script — RL for Tool Use

## Segment 1 (title)

Lesson 60, opening Chapter 10, Agents & Multi-Step RL. Chapter 9 trained a policy to produce one better reasoning trace and stop. This chapter extends that to agents acting across multiple steps, calling tools, and reacting to what comes back. We start with a single tool call before building up to full trajectories.

## Segment 2 (code)

Every action trained so far ends the policy's turn and waits for a reward. A tool call is different — it ends the turn and waits for an observation first, and that observation gets folded into the context before the policy acts again. The episode keeps going until the policy produces a final answer instead of another tool call.

## Segment 3 (steps)

Tool-use reward typically splits into two parts. A format and validity reward checks whether the tool call itself was well-formed — a verifiable check, in the RLVR sense from Chapter 9. An outcome reward checks whether the full multi-step trajectory actually reached the right answer. A small non-zero reward for a well-formed but unsuccessful attempt keeps "tried correctly and failed" distinct from "never tried," which matters once you start crediting individual steps.

## Segment 4 (steps)

Supervised imitation on tool-use traces gets a policy to roughly the right behavior, but it optimizes for resembling the training traces, not for succeeding at the task. RL on top lets the policy discover strategies that were never in the imitation data — retrying with different arguments after an error, picking a cheaper tool, or recognizing when no tool is needed — because the reward tracks task success, not resemblance.

## Segment 5 (outro)

A tool call's result becomes the next context, reward splits into validity and outcome, and RL on top of imitation finds strategies no training trace ever showed. The open problem is crediting each step of a long trajectory for the final outcome — lesson 61 picks that up directly.
