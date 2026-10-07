# Agentic RL Environments

This is lesson 62 of Chapter 10, Agents & Multi-Step RL. Lesson 61 assumed you already had turn-by-turn rewards to work with. This lesson covers where those actually come from: the environment. Chapter 5 built custom Gymnasium environments for classic single-step and short-horizon RL; this lesson extends that same design discipline to environments whose episodes are full multi-turn agent conversations with tool calls in the middle.

## What you'll learn

- How the Gymnasium `reset`/`step` API extends to an LLM agent's observation and action spaces
- Why the "action" in an agentic environment is text, and what that does to a discrete action space's assumptions
- Designing clean episode boundaries and termination conditions for open-ended agent tasks
- Where tool execution fits inside the environment boundary, and why that placement matters

## Extending the Gymnasium API to agents

The `reset`/`step` contract from Chapter 5 is unchanged in shape — only the content of observations and actions changes.

```python
class ToolAgentEnv(gym.Env):
    def reset(self):
        self.task = sample_task()
        self.history = [self.task.prompt]
        return self._observation()

    def step(self, action_text):
        self.history.append(action_text)
        if is_tool_call(action_text):
            observation = self._execute_tool(action_text)   # environment, not policy, owns execution
            self.history.append(observation)
            return self._observation(), 0.0, False, {}       # intermediate step: no reward yet, not done
        reward = self._score_final_answer(action_text)
        return self._observation(), reward, True, {}          # episode ends on a final answer

    def _observation(self):
        return "\n".join(self.history)   # the whole conversation so far
```

The observation space is now the full conversation history rather than a fixed-size vector or image, and the action space is open-ended text rather than a small discrete set — a genuinely different regime from the Gymnasium environments Chapter 5 worked with, where `action_space` was typically `Discrete(n)` or a bounded `Box`. Validity checking (lesson 60's format reward) effectively becomes part of how the environment interprets an otherwise-unconstrained action.

## Why the environment, not the policy, should own tool execution

Keeping `_execute_tool` inside the environment's `step()` (rather than letting the policy call tools directly and report back) matters for the same reason Chapter 5 separated environment logic from agent logic in the first place: it keeps the environment the single source of truth for what actually happened, makes tool results reproducible for debugging and evaluation, and lets you swap a tool's implementation (a different search backend, a different code sandbox) without touching the policy or the training loop at all.

## Episode boundaries for open-ended tasks

A classic Gymnasium environment usually has a clean termination signal — the pole falls, the goal is reached. An agent task often doesn't have an obvious stopping point the environment can detect on its own: the policy might reasonably call three tools or thirty before answering. Environment designers handle this with a mix of:

- **A max-turn cap** — forcibly terminating (and applying a penalty) after N turns, preventing runaway trajectories from consuming unbounded rollout budget
- **A "done" signal the policy itself emits** — the policy's final-answer action is what ends the episode, as in the pseudocode above, rather than the environment detecting task completion independently
- **A task-specific success check** — for tasks with a checkable goal state (e.g. "the file now contains X"), the environment can detect success directly and end the episode early on success, not just on a final-answer action

## A reward hacking angle specific to environment design

A loosely specified max-turn cap or success check is itself a surface for the reward hacking problem lesson 57 and lesson 61 both touched on from different angles: a policy under RL pressure will find whatever the termination logic actually checks for, not what it was meant to check for. A success check based on a brittle string match in a tool's output, for instance, can be satisfied by an agent that manipulates the tool's output format rather than genuinely completing the task — the same lesson Chapter 5's reward shaping pitfalls already taught, now applied to episode termination logic instead of a reward function.

## Key terms

- **Observation space (agentic)** — the full conversation/trajectory history so far, rather than a fixed-size vector
- **Action space (agentic)** — open-ended generated text, interpreted as either a tool call or a final answer
- **Environment-owned tool execution** — running tools inside the environment's step logic, keeping the environment the single source of truth for outcomes
- **Episode termination logic** — the max-turn cap, policy-emitted done signal, or task-specific success check that ends an agentic episode

## Recap

An agentic RL environment keeps Gymnasium's `reset`/`step` shape but swaps in conversation history for the observation and open-ended text for the action, with the environment itself owning tool execution and termination logic. Getting termination conditions precisely right matters because they're as exploitable as a reward function. Lesson 63 continues directly from here: what happens to training when, even with a well-designed environment, the reward genuinely only arrives at the very end of a long episode.
