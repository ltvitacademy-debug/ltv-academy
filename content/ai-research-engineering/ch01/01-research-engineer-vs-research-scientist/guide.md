# Research Engineer vs. Research Scientist

Welcome to AI Research Engineering, the fifth course in the AI/ML Research Engineer & Alignment Engineer path. Every course before this one taught you a subfield — safety, alignment, interpretability. This course steps back and teaches the *job* itself: the craft, habits, and infrastructure that research engineers use regardless of which subfield they work in. We start with the question every new hire asks in their first week at a lab: what's the actual difference between a research engineer and a research scientist, and which title does what?

## What you'll learn

- Where the research engineer and research scientist roles overlap, and where they genuinely diverge
- How labs like OpenAI, Anthropic, DeepMind, and Google DeepMind/Research actually draw this line in practice
- Why the line is blurrier than job titles suggest, and why that's by design
- How to tell, from a job posting or a team's day-to-day work, which flavor of the role you're looking at

## Two titles, one mission

At every major AI lab, the mission is the same: run experiments, learn something true about how models behave, and turn that into published results or shipped capability. Research scientist and research engineer are two titles pointed at that same mission from different angles, not two separate missions. A useful first approximation: the research scientist is more often the person asking "what should we try next, and why," and the research engineer is more often the person asking "how do we build something that lets us try it, at the scale and speed we need." In practice almost everyone on a research team does some of both.

Job postings reflect this directly. Anthropic, OpenAI, and DeepMind all post both "Research Scientist" and "Research Engineer" roles on the same teams — interpretability, alignment, pretraining, evals — with substantially overlapping day-to-day work and, frequently, the same interview loop. The split is a hiring and leveling convenience as much as it's a description of two different jobs.

## Where the roles tend to diverge

- **Origin of ideas.** Research scientists more often come from a PhD track and are evaluated partly on novel ideas and publications — new architectures, new theoretical framings, new empirical phenomena worth writing up. Research engineers more often come from a strong software/ML engineering background and are evaluated partly on whether the team's experiments *run* — reliably, quickly, and at the scale the idea needs to be tested at.
- **What "being stuck" looks like.** A research scientist stuck for a week might be stuck on whether an idea is even right. A research engineer stuck for a week might be stuck on why a distributed training run silently diverges only at 64 GPUs and not at 8.
- **Ownership surface.** Research engineers disproportionately own the shared infrastructure a whole team depends on: the training framework, the eval harness, the data pipeline, the experiment-tracking setup. A research scientist depends on that infrastructure but less often owns it.
- **Output artifact.** A research scientist's primary artifact is often a paper, a report, or a well-supported claim. A research engineer's primary artifact is often a working system — a training run that completed, a benchmark that's reproducible, a pipeline other people can build on.

None of this is a hard rule. Plenty of research engineers propose and lead their own research directions, and plenty of research scientists write excellent, fast, well-tested code. The split describes a center of gravity, not a fence.

## Why the line stays blurry on purpose

Research labs deliberately keep the boundary soft because the work itself doesn't respect it. An idea that sounds promising on a whiteboard is worthless if nobody can run the experiment that tests it; a beautifully engineered training pipeline is worthless if it's not pointed at a question worth asking. Teams that rigidly separated "ideas people" from "build people" tend to produce research that's either untestable or uninteresting. So the healthiest research teams treat the scientist/engineer line as a spectrum of emphasis, not a wall — and many individuals move along that spectrum over a career, or even within a single project.

A small, illustrative contrast — the same underlying question, asked from each side:

```python
# A research-scientist-flavored framing of the question:
# "Does attention sparsity hurt downstream accuracy past 50%?"
# -> design an ablation, read the literature, interpret the curve.

# A research-engineer-flavored framing of the same question:
# "Can I even RUN a sparse-attention sweep across 6 sparsity levels
#  overnight on the cluster we have, without the run silently OOMing
#  at the largest sparsity setting?"
# -> build the sweep harness, add OOM-safe retries, make it finish.
```

Both questions have to get answered for the research to exist at all. That's the core thing to internalize before the rest of this course: you're not learning "the engineer's half" of research as opposed to "the scientist's half" — you're learning the engineering craft that both roles lean on constantly.

## Key terms

- **Research scientist** — role centered on proposing and interpreting experiments, often with a publication or novel-claim track record
- **Research engineer** — role centered on building and operating the systems that make experiments possible at the needed speed and scale
- **Center of gravity** — the idea that these titles describe where someone spends most of their time, not a strict boundary on what they're allowed to do
- **Shared infrastructure** — training frameworks, eval harnesses, data pipelines, and tracking tools that a whole research team depends on, and that research engineers disproportionately own
