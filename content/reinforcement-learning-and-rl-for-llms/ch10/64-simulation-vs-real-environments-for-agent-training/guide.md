# Simulation vs. Real Environments for Agent Training

This is lesson 64 of Chapter 10, Agents & Multi-Step RL. Every lesson so far in this chapter has assumed tool calls just happen, fast and free. In practice, each one is a real decision: run against the actual target system (a real API, a real codebase, a real web browser) or a simulation built to stand in for it. This lesson works through that trade-off directly.

## What you'll learn

- Why millions of RL rollouts make real-environment training costly, slow, or simply unsafe
- The sim-to-real gap: where simulation fidelity typically breaks down, and why it matters
- Sandboxing and rate-limiting as partial mitigations when real environments are unavoidable
- A practical hybrid curriculum: simulate first, then validate and fine-tune against the real thing

## Why real environments get expensive fast

RLVR-style training (Chapter 9) and agentic RL both depend on large numbers of rollouts — thousands to millions of episodes, each one potentially many turns long. Running every one of those episodes against a real system multiplies real-world costs by that same factor: real API rate limits and dollar costs, real wall-clock latency per call (compounding across a multi-turn episode), and in some domains, real consequences — an agent training on a real production database, a real financial account, or a real email inbox can cause real damage while it's still bad at the task, which is exactly the period when RL exploration is noisiest and most mistake-prone.

```python
# A real environment call carries real cost and real risk on every single rollout:
def real_env_step(action):
    response = requests.post(real_api_endpoint, json=action, timeout=30)  # $, rate limits, latency
    return response.json()

# A simulated environment trades fidelity for speed and safety:
def sim_env_step(action):
    return simulated_api.handle(action)   # instant, free, sandboxed — but only as good as the simulation
```

## The sim-to-real gap

A simulation is only useful if behavior learned inside it transfers to the real system it's standing in for, and that transfer is never perfect. Typical gaps: a simulated API that doesn't reproduce the real one's rate-limit errors, intermittent failures, or edge-case responses; a simulated web page that doesn't match a real site's actual DOM quirks or dynamic content; a simulated user that answers too predictably compared to how real users actually phrase follow-up requests. A policy that over-specializes to a simulation's specific quirks can look excellent in evaluation and then underperform noticeably once deployed against the real thing — a sim-to-real version of exactly the evaluation-trustworthiness problem lesson 59 raised for benchmark scores.

## Sandboxing and rate control as a middle ground

When a real environment is unavoidable (no simulation captures enough of what matters, or the task is specifically about interacting with the real system), the standard mitigations are the same operational safeguards lesson 56 already introduced for code verifiers, generalized: isolate the agent's real-world actions to a sandboxed account or environment copy wherever one exists (a staging API, a test database, a disposable email account) rather than production; enforce hard rate limits and spending caps independent of anything the policy does; and add a human- or rule-based approval gate for any action class that's irreversible (sending a message, making a purchase, deleting data) until the policy has demonstrated enough reliability in sandboxed training to earn reduced supervision.

## A hybrid curriculum

Most practical agent RL recipes don't choose simulation or reality exclusively — they sequence them. Early training runs almost entirely in simulation, where mistakes are free and rollout volume can be huge, to get the policy past the noisiest, most mistake-prone phase of learning cheaply. Later training stages mix in a smaller number of real-environment episodes (sandboxed where possible) specifically to catch and correct sim-to-real gaps the simulation didn't anticipate, with evaluation on real-environment episodes treated as the trustworthy signal even when training leaned heavily on simulation. This mirrors the staged approach lesson 63 recommended for reward shaping — cheap and approximate first, careful and expensive second, applied here to the environment itself rather than the reward function.

## Key terms

- **Sim-to-real gap** — the mismatch between behavior learned in simulation and behavior required against the real system
- **Sandboxed environment** — an isolated copy or staging version of a real system, safe for an unreliable policy to interact with
- **Approval gate** — a human- or rule-based checkpoint required before an agent can take an irreversible real-world action
- **Hybrid curriculum** — training predominantly in simulation early, then mixing in real (often sandboxed) episodes to catch sim-to-real gaps

## Recap

Real environments carry real cost, latency, and risk at RL training's scale, while simulations trade fidelity for speed and safety and never transfer perfectly. Sandboxing, rate limits, and approval gates manage the risk when real interaction is unavoidable, and most practical recipes sequence simulation first, real validation second. Lesson 65 closes this chapter, and the course's technical content, with a survey of the open problems that cut across everything from Chapter 1 through here.
