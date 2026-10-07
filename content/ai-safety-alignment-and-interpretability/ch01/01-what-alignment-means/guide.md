# What "Alignment" Means

Welcome to AI Safety, Alignment & Interpretability — the fourth course in the AI/ML Research Engineer & Alignment Engineer destination. This course assumes you've already taken Reinforcement Learning & RL for LLMs, so we won't re-teach reward functions, policies, or RLHF mechanics from scratch. What we will do, starting right here, is ask a question that RL theory alone doesn't answer: when a system is optimizing for *something*, how do we know it's optimizing for the thing we actually meant?

## What you'll learn

- The distinction between capability and alignment, and why they are not the same axis
- A working definition of alignment: getting a system to reliably pursue the goals and values its designers intend
- Why "it's very good at its objective" says nothing about whether that objective is the right one
- A first preview of outer alignment and inner alignment — two different ways alignment can fail

## Capability answers "how good." Alignment answers "good at what, exactly?"

A chess engine that reliably crushes grandmasters is highly capable. A language model that reliably predicts the next token with low loss is highly capable. Capability is a measure of how effectively a system achieves whatever objective it is actually pursuing — it says nothing about whether that objective is a good one to be pursuing.

Alignment is the other axis. A system is aligned to the extent that the objective it is actually pursuing matches what its designers intended it to pursue. A highly capable system can be badly misaligned — in fact, the more capable it is, the more effectively it pursues whatever it's actually optimizing for, intended or not. Capability amplifies whatever is driving the system; it does not correct the direction.

This is why alignment is treated as its own field rather than a side effect of making models smarter or better-trained. A model can get better at the letter of its training objective while drifting further from the spirit of what its designers wanted — and nothing about increasing capability automatically closes that gap. The rest of this chapter is about exactly how and why that gap opens up.

## A working definition

For this course, **alignment** means: getting an AI system to reliably pursue the goals and values its designers intend, across the situations it actually encounters — not just the ones it was trained or tested on. "Reliably" is doing real work in that sentence. A model that behaves as intended on its training distribution but pursues something else under distribution shift, unusual phrasing, or deliberate pressure is not aligned in the sense this field cares about.

## Two places alignment can fail: a first preview

It helps to know, even before we unpack either one, that alignment failures split into two broad categories:

- **Outer alignment** — whether the objective we specified or trained toward is actually the right one. If you optimize the wrong target, even perfect optimization gets you the wrong outcome.
- **Inner alignment** — whether the model that results from training actually internalizes that objective, versus learning some other goal that happened to produce good training performance.

We are previewing these terms, not explaining them in full — that's the job of Lesson 5, once you've seen specification gaming, reward hacking, and Goodhart's Law up close. For now, just hold onto the shape: alignment can fail at the stage of choosing the target, or at the stage of whether the model actually ends up pursuing that target.

## Key terms

- **Capability** — how effectively a system achieves the objective it is actually pursuing
- **Alignment** — the degree to which a system's actual objective matches what its designers intend
- **Outer alignment** — whether the specified or trained-toward objective is the right one (previewed here, covered in Lesson 5)
- **Inner alignment** — whether the resulting model actually internalizes that objective (previewed here, covered in Lesson 5)
