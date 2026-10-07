# RL for Math & Code Reasoning

This is lesson 56 of Chapter 9, RL for Reasoning. Lesson 55 introduced RLVR in the abstract — a deterministic verifier standing in for a learned reward model. This lesson gets concrete about the two domains where that idea actually works well: math and code. Both have something most language tasks don't, a mechanically checkable notion of "correct," but building a verifier that's actually trustworthy takes real care in each domain.

## What you'll learn

- How a math verifier handles answer formats, equivalence, and multi-part problems
- How a code verifier uses unit tests, sandboxing, and timeouts to score correctness safely
- Why training on math transfers partial reasoning benefit to code, and vice versa
- The practical training loop: batched rollouts, verifier scoring, and GRPO-style grouped updates

## Building a trustworthy math verifier

A math verifier's job sounds simple — check the final answer — but getting it right requires handling more than exact string matches.

```python
def math_verifier(trace, ground_truth):
    predicted = extract_boxed_answer(trace)       # parse \boxed{...} or "Answer: ..."
    if predicted is None:
        return 0.0                                  # no parseable answer: no partial credit
    return 1.0 if sympy_equivalent(predicted, ground_truth) else 0.0
```

`sympy_equivalent` normalizes both sides symbolically before comparing — simplifying fractions, expanding expressions, handling equivalent forms like `sqrt(2)` versus `2**0.5` — rather than relying on the model to output one exact canonical string. Problems with multiple sub-answers (e.g. "find x and y") typically get a verifier that extracts and checks each part, with reward being the fraction of parts correct rather than strict all-or-nothing, so the gradient signal distinguishes a half-right answer from a fully wrong one.

## Building a trustworthy code verifier

Code verification runs the model's generated code and checks its behavior, which introduces operational concerns math verification doesn't have:

```python
def code_verifier(trace, unit_tests, timeout_s=5):
    code = extract_code_block(trace)
    if code is None:
        return 0.0
    results = []
    for test in unit_tests:
        try:
            output = run_in_sandbox(code, test["input"], timeout=timeout_s)
            results.append(output == test["expected"])
        except (TimeoutError, RuntimeError):
            results.append(False)
    return sum(results) / len(unit_tests)
```

`run_in_sandbox` matters for safety as much as for correctness — generated code is untrusted and must run isolated (no filesystem or network access) with a hard timeout, since an early-training policy will reliably produce infinite loops and import statements you didn't ask for. Using several held-out unit tests per problem (not just one) also closes the most common verifier-gaming path: a one-test verifier can be satisfied by code that special-cases that exact input, which lesson 57 covers as a concrete reward hacking failure.

## Cross-domain transfer

Training with RLVR on math problems tends to improve code reasoning somewhat, and training on code tends to improve math somewhat, even without any shared training examples between the two. The shared mechanism both draw on is general step-by-step decomposition and self-verification behavior — a model that's learned to check its own arithmetic before committing to an answer tends to also check its own code logic before returning it. This transfer is partial, not complete: domain-specific skills (syntax rules, particular algorithms, specific proof techniques) still require in-domain training signal, so most RLVR recipes mix math and code problems in the same training run rather than relying on transfer alone.

## The training loop in practice

Putting RLVR into an actual training loop looks like Chapter 4's PPO loop with the reward model call replaced:

```python
for batch in problem_batches:
    traces = [policy.generate(p, num_samples=k) for p in batch]   # k samples per prompt, for GRPO's group baseline
    rewards = [[verifier(t, gt) for t in group] for group, gt in zip(traces, batch.answers)]
    advantages = [group_relative_advantage(r) for r in rewards]    # GRPO: subtract the group mean
    policy.update(traces, advantages)
```

Sampling several completions per prompt (`num_samples=k`) is what feeds GRPO's group-relative baseline from lesson 55 — it's also useful independent of GRPO, since a verifier call is typically far cheaper than a reward model's forward pass, making extra samples per prompt an easy way to buy a less noisy signal.

## Key terms

- **Symbolic equivalence check** — comparing math answers via algebraic normalization (e.g. sympy) rather than exact string match
- **Sandboxed execution** — running untrusted generated code isolated from the filesystem and network, with a hard timeout
- **Held-out unit tests** — multiple test cases per coding problem, reducing the chance a verifier is satisfied by special-cased code
- **Cross-domain transfer** — reasoning skill gained from training on one domain (math) partially benefiting another (code)

## Recap

A math verifier needs symbolic equivalence and partial-credit handling to be trustworthy; a code verifier needs sandboxing, timeouts, and multiple held-out tests to be both safe and hard to game. Training on either domain partially transfers to the other through shared step-by-step reasoning skill, though most real recipes mix both. The next lesson, 57, looks directly at what happens when these verifiers aren't quite careful enough — the specific ways reasoning models learn to exploit them.
