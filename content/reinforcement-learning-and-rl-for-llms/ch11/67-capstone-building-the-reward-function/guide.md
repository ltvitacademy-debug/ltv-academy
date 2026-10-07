# Capstone: Building the Reward Function

This is lesson 67, continuing Chapter 11, the Capstone. Lesson 66 picked the task — a math or code-correctness problem with a mechanically checkable answer — and set aside a held-out evaluation slice. This lesson writes the piece that actually does the checking: the reward function PPO will call on every generated response. Get this wrong and nothing downstream matters; a PPO run only ever optimizes exactly what the reward function measures.

## What you'll learn

- How to parse a model's free-form generation down to a comparable answer
- Writing a scalar reward that rewards correctness without over-rewarding format alone
- Why an unparseable response needs an explicit penalty, not a skipped reward
- Concrete reward-hacking failure modes this exact function is vulnerable to, and how to guard against them

## Parsing the generated answer

A model generating a GSM8K-style solution typically reasons in free text and ends with a final answer line. The reward function's first job is pulling that answer out reliably:

```python
import re

def extract_answer(text):
    match = re.search(r"#### (-?\d+(?:\.\d+)?)", text)
    return match.group(1) if match else None
```

This mirrors the GSM8K dataset's own answer format, so both the ground truth and the model's generation parse the same way. For a code-correctness task, the equivalent step is extracting a code block and running it against a fixed set of unit tests in a sandboxed subprocess.

## Writing the scalar reward

```python
def verify_reward(response, ground_truth):
    predicted = extract_answer(response)
    if predicted is None:
        return -1.0  # unparseable — penalize, never return 0 or skip it
    is_correct = abs(float(predicted) - float(ground_truth)) < 1e-4
    length_penalty = -0.0005 * len(response)
    return (2.0 if is_correct else -0.5) + length_penalty
```

Three design choices matter here. First, an unparseable response gets a real negative reward, not zero — zero looks identical to "a parseable, wrong answer scored neutrally," which blurs a signal PPO needs to be sharp. Second, correct and incorrect responses are separated by a wide margin (2.0 vs -0.5), giving PPO's advantage estimates something clear to climb. Third, a small length penalty discourages the model from padding responses to stall, without being large enough to punish genuinely necessary reasoning steps.

## Guarding against reward hacking

Chapter 5 covered reward hacking in toy environments, and chapter 9 covered it in reasoning models specifically — this capstone is exposed to the same risk. A regex like the one above can be gamed: a model could learn to emit `#### 7 #### 7 #### 7` or bury a correct-looking answer tag inside irrelevant text. Guard against this by validating structure, not just presence — check that the `####` line appears exactly once, near the end of the response, and that the text before it isn't degenerate repetition. Run your reward function against a batch of intentionally adversarial or degenerate strings before training starts, not just against real model outputs, so you catch exploits before PPO has 10,000 updates to find them for you.

## Key terms

- **Verifier / reward function** — the deterministic program converting a raw generation into a scalar reward
- **Unparseable penalty** — a real negative reward for a response the checker can't score, distinct from "parseable but wrong"
- **Length penalty** — a small reward shaping term discouraging stalling via padding
- **Reward hacking** — the policy exploiting a loophole in the verifier rather than genuinely solving the task

## Recap

The reward function parses an answer, scores correctness with a clear positive/negative margin, penalizes unparseable output explicitly, and gets stress-tested against adversarial strings before training. Next lesson, this function plugs directly into TRL's PPOTrainer for the actual training run.
