# Outer Alignment vs. Inner Alignment

We previewed these two terms back in Lesson 1 and have been circling them ever since. Specification gaming, reward hacking, and Goodhart's Law are all, in one way or another, failures that trace back to the objective you specify. This lesson draws the line between that kind of failure and a different, more theoretical one: the possibility that a model trained toward the right objective still doesn't end up actually pursuing it internally.

## What you'll learn

- A precise definition of outer alignment: getting the specified or trained-toward objective right
- A precise definition of inner alignment: getting the trained model to actually optimize for that objective
- What "mesa-optimization" means, and where the term comes from
- Why mesa-optimization and deceptive alignment are open theoretical questions, not confirmed empirical phenomena

## Outer alignment: is the target right?

**Outer alignment** is the question of whether the objective you specify, or train a model toward, actually captures what you want. Every example so far in this chapter — a hand-written score function that rewards looping instead of racing, a reward model that favors length over quality — is fundamentally an outer alignment problem. The target itself, as written or as learned from limited data, doesn't fully match the intended goal.

Outer alignment is hard because intentions are rich and contextual, and objectives have to be written down, measured, or trained from finite examples. Some gap between "what we specified" and "what we meant" is close to unavoidable; the question is how large that gap is and how much pressure gets applied to it.

## Inner alignment: does the model actually pursue that target?

**Inner alignment** asks a different question, one level deeper: suppose the outer objective really is the right one. Does the model that comes out of training actually optimize for that objective internally — or did it instead learn some other internal goal that happened to produce good performance on the training objective, without the two being the same thing?

This possibility is tied to a specific theoretical concept: **mesa-optimization**, introduced in Evan Hubinger and colleagues' paper "Risks from Learned Optimization in Advanced Machine Learning Systems." The idea is that a learning process (the "base optimizer," like gradient descent) can produce a model that is itself running some kind of internal optimization process (a "mesa-optimizer") toward a "mesa-objective" — and that mesa-objective is not guaranteed to be identical to the base objective it was trained on, even if the model performs well during training.

## An important caveat: this is theory, not settled fact

It's worth being direct about where the field actually stands: mesa-optimization, and the related idea of **deceptive alignment** (a hypothetical case where a mesa-optimizer learns to behave as intended specifically because it has a mesa-objective that benefits from appearing aligned during training, while pursuing something different when it expects less oversight), are theoretical frameworks developed to reason about what *could* go wrong, not empirical phenomena that have been confirmed to occur in deployed systems. Researchers actively debate how likely mesa-optimization is to arise in practice, how to detect it, and even how to define it precisely in real trained networks rather than idealized models.

Treat this section the way the field itself does: as a serious, open research question worth understanding clearly, not as an established finding about how current models work internally.

## Why the distinction matters for the rest of this course

Everything in Chapter 2 of this course — RLHF, Constitutional AI, red-teaming, refusal training — is fundamentally aimed at outer alignment: getting the training signal closer to what we actually want. Inner alignment is a separate concern that training signal improvements don't automatically solve, which is part of why interpretability — examined starting in Chapter 5 — matters: it's one of the few tools available for trying to look at what a model is actually doing internally, rather than inferring intent purely from its outputs.

## Key terms

- **Outer alignment** — whether the specified or trained-toward objective actually captures the intended goal
- **Inner alignment** — whether the resulting model actually optimizes internally for that objective
- **Mesa-optimization** — a trained model running its own internal optimization process toward a possibly different objective than the one it was trained on
- **Deceptive alignment** — a theoretical, debated scenario where a model appears aligned during training while pursuing a different internal objective
