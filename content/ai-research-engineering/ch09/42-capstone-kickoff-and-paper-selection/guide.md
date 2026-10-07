# Capstone Kickoff & Paper Selection

This is the capstone: one project, spanning the rest of the course, where you reproduce a real published result and then extend it. Every skill from the previous eight chapters — reading a paper for its load-bearing claim, structuring a repo, managing configs, tracking experiments, debugging a run that won't improve, writing up what you found — gets used for real here, on a result you choose yourself. This lesson is entirely about that choice: picking a paper you can actually finish.

## What you'll learn

- The three filters that rule out most candidate papers before you waste a week on the wrong one
- Why "released code and checkpoints" matters more than how famous or recent the paper is
- Three real, well-known results that are genuinely approachable to reproduce on modest compute
- How to scope a capstone proposal against the time you actually have left in the course

## Why this decision matters more than it looks like

Most capstone projects don't fail because the student can't code. They fail because the paper was the wrong paper — compute the student doesn't have, a result that was never fully specified, or code that was never released and has to be reconstructed from prose alone. Lesson 7 covered reproduction mechanics; this lesson covers the decision that determines whether those mechanics even have a chance to work. Spend real time here. An afternoon spent rejecting three candidate papers is cheaper than a week spent discovering the first one was unreproducible.

## The three filters

Apply these in order. A paper that fails any one of them is not a good capstone choice, no matter how interesting the result is.

1. **Released code and checkpoints.** You want the authors' actual training code, and ideally a checkpoint you can load and verify before you train anything yourself. A paper with no code means reimplementing from the prose — exactly the backwards workflow Lesson 7 warned against. Check the paper's GitHub link and cross-reference it on paperswithcode.com, which tracks whether code exists and whether anyone else has already reproduced it.
2. **Modest compute requirement.** You're not reproducing frontier LLM pretraining on a student budget. Favor results that run on a single GPU in hours to a couple of days: small vision or NLP benchmarks, classic RL control tasks, small-scale language modeling. If the original paper itself warns about multi-week, multi-hundred-GPU runs, it's not a capstone candidate.
3. **One clear headline number.** The paper should reduce to a single, unambiguous claim — "this model gets X% error on this benchmark" — not a sprawling table of twelve results across six datasets. A single headline number gives you a crisp definition of done: you either land near it or you don't.

## Three real papers that fit all three filters

These are well-known, specifically because many students and researchers before you have already reproduced them — which means tooling, baselines, and known gotchas all exist.

- **Deep Residual Learning for Image Recognition** (He et al., 2015 — the ResNet paper). Training a small ResNet (e.g. ResNet-20) on CIFAR-10 reproduces a clean, specific test error number in a few GPU-hours, with dozens of public reference implementations to cross-check against.
- **Human-level control through deep reinforcement learning** (Mnih et al., 2015, *Nature* — the DQN paper). Reproducing DQN on a single cheap Atari game like Pong, rather than the full 57-game suite, is a well-trodden, modest-compute slice of a famous result.
- **nanoGPT** (Karpathy) reproducing GPT-2-scale language modeling. Training a small GPT on a modest corpus and matching a known validation-loss ballpark is a well-documented, single-GPU-friendly way to reproduce a transformer-scale result without needing a cluster.

Pick one of these, or something structurally similar that passes all three filters above — the point isn't these exact three papers, it's the shape of paper they represent.

## Scoping your capstone proposal

Before you write any code, write a short proposal: the paper, the exact headline number you're targeting, the compute you have access to, and a rough week-by-week split between Lesson 43's reproduction work and Lesson 44's extension work. A capstone repo typically starts like this:

```text
capstone/
  README.md          # paper link, headline claim, target number, status
  PROPOSAL.md         # one page: paper, scope, compute budget, timeline
  configs/            # Hydra configs, ch3-style
  src/
    data.py
    model.py
    train.py
  scripts/
    run_baseline.sh    # the official code's own command, run first
  outputs/             # Hydra's per-run output dirs
```

Leave the extension undecided for now — Lesson 44 covers designing it properly, after you know what reproducing actually looks like.

## Key terms

- **Headline claim** — the single number or result a paper is actually known for, as distinct from every secondary result in its tables
- **Released code and checkpoints** — the authors' own training code and trained weights, the strongest starting point for any reproduction attempt
- **Modest compute** — a project scoped to run on access a student or small team actually has, not the budget the original paper used
- **Capstone proposal** — a short written scope document fixing the paper, the target number, and the timeline before any code is written
