# Script — RL for Math & Code Reasoning

## Segment 1 (title)

Lesson 56, Chapter 9. Lesson 55 introduced RLVR in the abstract. This lesson gets concrete about the two domains where it actually works: math and code — both mechanically checkable, but each needs real care to verify trustworthily.

## Segment 2 (code)

A math verifier parses out the final answer and checks it with symbolic equivalence, not a plain string match — so different but equal forms of the same answer still verify. A code verifier runs the generated code in a sandbox against several held-out unit tests, with a hard timeout, and rewards the fraction passed.

## Segment 3 (steps)

Getting this right takes more than exact matching. Symbolic normalization handles equivalent forms. Multi-part problems get partial credit — the fraction of sub-answers correct, not strict all-or-nothing — so the gradient signal distinguishes half-right from fully wrong. And generated code is untrusted, so sandboxing and a timeout aren't optional; early-training policies reliably produce infinite loops.

## Segment 4 (steps)

The training loop looks like Chapter 4's PPO loop with the reward model swapped for the verifier — sampling several completions per prompt feeds GRPO's group-relative baseline, and since a verifier call is far cheaper than a reward model's forward pass, those extra samples are easy to afford. Training on math partially transfers to code and back, through shared step-by-step self-verification skill, though most recipes still mix both domains rather than relying on transfer alone.

## Segment 5 (outro)

Symbolic equivalence and partial credit for math; sandboxing, timeouts, and multiple tests for code — that's what makes these verifiers trustworthy. Next, lesson 57 looks at what happens when they aren't careful enough.
