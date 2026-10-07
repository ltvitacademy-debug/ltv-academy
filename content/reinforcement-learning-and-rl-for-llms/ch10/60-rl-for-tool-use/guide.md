# RL for Tool Use

This is lesson 60, opening Chapter 10, Agents & Multi-Step RL. Chapter 9 trained a policy to produce a single better chain-of-thought and stop. This chapter extends that to agents: policies that act across multiple steps, call tools, and receive outcomes back before deciding what to do next. This lesson starts with the simplest version — a single tool call — before lesson 61 builds up to crediting an entire multi-turn trajectory.

## What you'll learn

- Why a tool call is a new kind of action, with its own observation returned to the policy
- How reward decomposes into format correctness and task outcome for tool use
- A concrete ReAct-style loop: reason, act, observe, repeat
- Why naive imitation of tool-use examples isn't enough, and what RL adds on top

## Tool calls as actions with return values

Every action you've trained so far — a token, a full response, a reasoning step — ends the policy's turn and waits for a reward. A tool call is different: it ends the policy's turn and waits for an *observation* first, which gets appended to the context before the policy acts again.

```python
def tool_use_step(policy, context, tools):
    action = policy.generate(context)              # may be a tool call or a final answer
    if is_tool_call(action):
        tool_name, args = parse_tool_call(action)
        observation = tools[tool_name](**args)       # execute the tool, get a result back
        context = context + action + observation      # observation becomes part of the next context
        return tool_use_step(policy, context, tools)  # recurse: the episode continues
    return action, context                             # final answer: episode ends
```

This is the same action space expansion Chapter 5's environment design lessons discussed in the abstract — the policy's action set now includes calls into an external, possibly stochastic, possibly failing system, and the environment's response to that call becomes part of the state the policy conditions on next.

## Decomposing the reward

Tool-use reward typically splits into two parts, scored separately:

- **Format/validity reward** — did the policy emit a well-formed tool call (correct syntax, valid tool name, arguments matching the tool's schema)? This is a verifiable reward in the RLVR sense from Chapter 9 — a parser either succeeds or it doesn't.
- **Outcome reward** — did using the tool (or sequence of tools) actually lead to a correct final answer? This is the same outcome-correctness signal from lesson 54, now evaluated at the end of a multi-step trajectory instead of a single-turn one.

```python
def tool_use_reward(trace, ground_truth):
    format_ok = all(is_valid_call(c) for c in extract_tool_calls(trace))
    if not format_ok:
        return -0.5                                   # penalize malformed calls directly
    outcome_ok = extract_final_answer(trace) == ground_truth
    return 1.0 if outcome_ok else 0.1                   # small credit for a well-formed, unsuccessful attempt
```

A small non-zero reward for well-formed-but-unsuccessful attempts (rather than zero) keeps the gradient from treating "tried correctly and failed" identically to "didn't try at all" — a distinction that matters once you get to crediting individual steps in lesson 61.

## The ReAct loop

The `tool_use_step` function above is a simplified version of the ReAct pattern (Reason + Act): the policy alternates between producing reasoning text and producing an action (a tool call or a final answer), with each tool call's result folded back into context before the next reasoning step. RL training over this loop optimizes the *whole trajectory* — every reasoning segment and every tool call the policy chose — against the final (or format-decomposed) reward, exactly the credit-assignment problem lesson 61 covers next.

## Why RL, not just imitation

Supervised fine-tuning on human- or stronger-model-written tool-use traces (imitation) gets a policy to roughly the right behavior, but it optimizes for matching the training traces, not for succeeding at the task. RL training on top lets the policy discover tool-use strategies that weren't in the imitation data at all — retrying with different arguments after a tool error, choosing a cheaper tool when multiple tools could answer the same query, or recognizing when a tool isn't needed — because the reward is tied to task success rather than resemblance to a reference trace. This mirrors exactly why Chapter 7 layered PPO on top of SFT rather than stopping at SFT alone, now applied to multi-step tool use instead of single-turn responses.

## Key terms

- **Tool call** — an action that invokes an external function or system and receives an observation back before the episode continues
- **Format/validity reward** — a verifiable reward checking that a tool call is syntactically and semantically well-formed
- **ReAct loop** — alternating reasoning and acting, folding each tool observation back into context before the next step
- **Imitation vs. RL for tool use** — SFT on traces teaches resemblance; RL on top teaches task success, including strategies absent from the training traces

## Recap

A tool call is an action whose result becomes part of the next observation, reward splits into format validity and task outcome, and RL on top of imitation lets a policy discover tool-use strategies no training trace ever showed it. The open problem this lesson deferred is how to credit each step in a long ReAct trajectory for the final outcome — lesson 61, multi-turn credit assignment, picks that up directly.
