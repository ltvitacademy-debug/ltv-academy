# Script — Agentic RL Environments

## Segment 1 (title)

Lesson 62, Chapter 10. Last lesson assumed you already had turn-by-turn rewards. This lesson covers where those come from: the environment. Chapter 5 built custom Gymnasium environments for short-horizon RL; this extends that discipline to full multi-turn agent conversations with tool calls in the middle.

## Segment 2 (code)

The reset and step contract from Chapter 5 is unchanged in shape — only the content changes. The observation becomes the whole conversation history instead of a fixed-size vector, and the action becomes open-ended text instead of a small discrete set. Tool execution happens inside the environment's step function, not inside the policy, keeping the environment the single source of truth for what actually happened.

## Segment 3 (steps)

That's a genuinely different regime from Chapter 5's environments, where the action space was typically a small discrete set or a bounded range. Keeping tool execution inside the environment also makes results reproducible and lets you swap a tool's implementation without touching the policy or training loop at all.

## Segment 4 (steps)

Classic environments usually have a clean termination signal the environment detects on its own. Agent tasks often don't — the policy might reasonably call three tools or thirty. Designers handle this with a max-turn cap that forces termination with a penalty, a done signal the policy itself emits by producing a final answer, or a task-specific success check for goals that are directly detectable.

## Segment 5 (outro)

A loosely specified termination check is itself exploitable, the same lesson Chapter 5's reward shaping already taught, now applied to episode boundaries instead of reward functions. Next, lesson 63 picks this up directly: what happens to training when the reward genuinely only arrives at the very end of a long episode.
