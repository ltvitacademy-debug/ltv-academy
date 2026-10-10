# The Scalable Oversight Problem

Every alignment technique covered so far — RLHF, Constitutional AI, red teaming, evaluations — ultimately depends on something judging whether an output is good: usually a human. This lesson opens Chapter 4 by naming the problem that breaks that dependency as models get more capable, and introducing the research agenda built to address it: scalable oversight.

## What you'll learn

- Why human feedback quietly assumes the human can tell good outputs from bad ones
- What happens to that assumption once a model's outputs exceed human expertise
- The formal definition of scalable oversight as a research problem
- Why this is a distinct problem from capability evaluation or ordinary alignment
- How the rest of this chapter's techniques are all attempts to solve it

## The hidden assumption behind RLHF

Reinforcement learning from human feedback, as covered earlier in this course, trains a reward model on human preference judgments and then optimizes a policy against that reward model. The entire pipeline rests on one unstated premise: that a human comparing two outputs can reliably tell which one is actually better. For a chatbot response or a simple coding task, that premise mostly holds — most people can tell a helpful answer from a confusing one. The premise quietly breaks down as the task gets harder than the evaluator. A human who doesn't know advanced mathematics can't rank two attempted proofs of a difficult theorem by correctness. A human unfamiliar with a large, unfamiliar codebase can't reliably spot a subtle logic bug a model introduced while refactoring it. In both cases, the human can still form an opinion and give it a score — but that score no longer tracks truth. It tracks what looks convincing.

## Why this gets worse, not better, as models improve

The obvious response is "get better human evaluators" — domain experts instead of generalist crowdworkers. That helps, but it doesn't solve the underlying trend. As frontier models are pushed toward and past the top of human expertise in a given domain, the pool of humans who can out-evaluate the model shrinks toward zero, no matter how carefully they're selected. This is the crux of the problem: oversight quality is currently bottlenecked on human capability, while model capability is the thing actively being scaled up. A supervision method that works today because the model is still within human reach will stop working at exactly the moment it matters most — when the model starts producing outputs a human cannot fully check.

## Defining scalable oversight

Scalable oversight is the research problem of developing methods to effectively supervise AI systems on tasks where human judgment alone does not reliably scale to the task's difficulty. It does not mean "fewer humans in the loop" — it means getting useful, trustworthy supervisory signal on exactly the tasks where unaided human judgment runs out, typically by giving humans better tools, better decompositions of the task, or help from other AI systems. Anthropic's 2022 paper "Measuring Progress on Scalable Oversight for Large Language Models" gave the field one of its first empirical testbeds: tasks deliberately chosen so that specialists succeed but unaided humans and current models both fail, letting researchers measure whether a proposed oversight method actually closes that gap rather than just assuming it does.

## How this differs from capability evaluation and ordinary alignment

Chapter 3's evaluations ask "what can this model do, and is any of it dangerous?" — a question that can, in principle, be answered without the evaluator doing the task better than the model. Scalable oversight asks a harder question: "can we actually tell if the model did this specific task well, when we ourselves can't do it well?" Ordinary alignment techniques like RLHF assume that question is already answered — they assume the feedback signal is trustworthy and just focus on optimizing against it. Scalable oversight is the layer underneath that assumption, and the rest of this chapter — debate, recursive reward modeling, weak-to-strong generalization, and AI-assisted human oversight — covers the leading proposals for building that layer.

## Key terms

| Term | Meaning |
|---|---|
| Scalable oversight | The research problem of supervising AI systems on tasks where unaided human judgment doesn't reliably scale to the task's difficulty |
| Evaluator-task gap | The gap between what a task requires to judge correctly and what the available human evaluator actually knows or can verify |
| Sandwiching | An experimental design where a task is chosen so specialists succeed but unaided humans and current models both fail, isolating whether an oversight method closes the gap |
| Oversight bottleneck | The dynamic where supervision quality is capped by human capability while model capability keeps increasing |

## Recap

Human feedback works only as long as the human can tell a good output from a bad one, and that condition is exactly what frontier capability growth threatens. Scalable oversight is the name for the research agenda built to keep supervision trustworthy once that condition fails. The next lesson, 20, "Debate as an Oversight Method," covers the first concrete proposal: putting two models against each other in an argument a weaker judge can referee.
