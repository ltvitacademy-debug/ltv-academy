# Constitutional AI: the Approach

This is lesson 49 of Chapter 8. Last lesson introduced RLAIF generically — an AI judge standing in for a human annotator. This lesson covers Anthropic's specific, published method for generating that AI feedback: Constitutional AI, from the 2022 paper "Constitutional AI: Harmlessness from AI Feedback." It's RLAIF with the judge's criteria written down explicitly as a set of principles, rather than left implicit in a one-off prompt.

## What you'll learn

- The two-phase structure of Constitutional AI: supervised, then RL
- What a "constitution" actually is in this context
- How each phase's output feeds the next, mirroring Chapter 7's SFT-then-RM-then-PPO structure
- Why writing principles down explicitly matters, versus an unconstrained judge prompt

## The constitution

A constitution, in this context, is a written list of principles the model should follow — things like favoring responses that avoid being harmful, discriminatory, or dangerous, while still being genuinely helpful. It's not a single rule but a curated set, often drawn in part from sources like the UN Declaration of Human Rights and other articulated ethical principles, adapted into instructions a model can apply when judging or revising a specific response. The constitution is the one new artifact this method introduces beyond what lesson 48's generic RLAIF needed — it's what makes the AI feedback's criteria explicit and auditable instead of baked into an opaque judge prompt.

## Phase 1: supervised — critique and revision

The first phase (covered in full mechanical detail next lesson) has the model generate an initial response, critique that response against a principle drawn from the constitution, then revise the response based on its own critique. The revised responses become a new supervised fine-tuning dataset, producing a model Anthropic's paper calls SL-CAI (supervised-learning Constitutional AI).

```
initial response → self-critique (against a constitutional principle) → revision → SFT data
```

## Phase 2: RL — AI comparisons against the constitution

The second phase is RLAIF as covered last lesson, with one specific detail: the AI judge comparing response pairs is instructed to judge according to the constitution's principles, not an unconstrained preference. Those AI-generated preference labels train a reward model exactly as in Chapter 6, and PPO then fine-tunes the SL-CAI model from phase 1 against that reward model, exactly as in Chapter 7 — producing the paper's RL-CAI model.

```
SL-CAI model → AI preference labels (judged against the constitution) → reward model → PPO → RL-CAI model
```

## Why write principles down explicitly

An unconstrained judge prompt ("which response is better?") leaves the actual criteria implicit and inconsistent across invocations — different phrasing of the same question can shift what the judge effectively optimizes for. A written constitution makes the criteria an explicit, inspectable, editable artifact: principles can be added, removed, or reworded without retraining anything from scratch, and the same principles apply consistently whether they're used for self-critique in phase 1 or preference judging in phase 2. This also means the constitution itself is auditable — someone can read exactly what the model was trained to prefer, rather than inferring it from training data alone.

## Key terms

- **Constitution** — the written, curated set of principles the model is trained to follow, used in both phases
- **SL-CAI** — the model produced by phase 1's supervised critique-and-revision process
- **RL-CAI** — the final model produced by phase 2's RL fine-tuning against a constitution-guided reward model
- **Constitution-guided judging** — an AI judge comparing responses specifically against written principles, rather than an unconstrained preference

## Recap

Constitutional AI is RLAIF made explicit and auditable: a written constitution drives both a supervised self-critique-and-revision phase (producing SL-CAI) and an RL phase where AI preference labels are judged against those same principles (producing RL-CAI), mirroring Chapter 7's SFT-then-RM-then-PPO structure throughout. Next lesson goes deep into phase 1's mechanics — exactly how a model critiques and revises its own output.
