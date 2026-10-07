# AI-Assisted Human Oversight

Debate, recursive reward modeling, and weak-to-strong generalization are not three competing answers to the scalable oversight problem — they're three specific instances of a broader strategy. This closing lesson names that strategy directly, looks at a few more concrete tools inside it, and takes stock of where the whole chapter leaves the field.

## What you'll learn

- Why debate, recursive reward modeling, and weak-to-strong generalization are instances of one broader category
- How AI critique models help a human catch flaws they'd otherwise miss
- What the "sandwiching" experimental method is trying to measure
- Why this chapter doesn't claim scalable oversight is a solved problem

## The broader category these techniques sit inside

AI-assisted human oversight is the general strategy of using AI systems as tools that extend what a human evaluator can reliably judge, rather than either replacing the human or asking the human to judge unaided. Debate extends human judgment by having two systems expose each other's flaws. Recursive reward modeling extends it by handing the human assistants for specific sub-tasks. Weak-to-strong generalization studies how much a strong system's own knowledge can substitute for supervision quality the human can't fully provide. All three are answers to the same underlying question: how do you keep a human meaningfully in the loop on a task that's outgrown what the human can check alone?

## A direct tool: self-critiquing models

One of the most literal versions of this idea is a critique model: a separate model trained specifically to point out flaws, omissions, or questionable claims in another model's output, which a human evaluator then reads alongside the original output before making a judgment. OpenAI's work on self-critiquing models for assisting human evaluators found that showing a human a model-generated critique alongside an answer helped human evaluators catch more flaws than they caught when just reading the answer alone — a direct, measurable instance of AI assistance expanding what a human overseer could reliably notice.

## Sandwiching: measuring whether assistance actually helps

A recurring methodological challenge in this research area is that a convincing-looking technique needs to be tested against a real gap in capability, not just a hypothetical one. The "sandwiching" method addresses this directly: take a task where genuine domain experts exist, and a group of qualified but non-expert humans who can't fully judge the task alone, then see whether AI assistance lets the non-expert group's judgments approach the expert group's judgments. If assisted non-experts close a meaningful fraction of that gap, that's real evidence the assistance technique is doing something, rather than just looking plausible on paper.

## Where this leaves the field

Nothing in this chapter should be read as "scalable oversight is now a solved problem." Debate has an unresolved obfuscated-argument concern. Recursive reward modeling depends on assistant reliability that itself needs checking. Weak-to-strong generalization shows partial, not complete, recovery, in an admittedly imperfect analogy for the real future problem. What this chapter does establish is that the field has moved from merely naming the scalability ceiling to actively building and empirically testing concrete techniques meant to extend oversight past it — real progress, honestly reported as partial rather than finished.

## Key terms

- **AI-assisted human oversight** — the general strategy of using AI systems as tools to extend what a human evaluator can reliably judge, rather than replacing human judgment or leaving it unaided
- **Critique model** — a model trained to point out flaws, omissions, or questionable claims in another model's output, shown to a human evaluator to improve their judgment
- **Sandwiching** — an experimental method that measures whether AI assistance helps non-expert humans approach genuine expert-level judgment on a task
- **Capability gap** — the measurable difference between a non-expert or weak supervisor's unaided judgment and a true expert's judgment, used to evaluate whether an assistance technique is actually closing real ground
- **Partial progress** — the honest characterization this chapter gives to the current state of scalable oversight research: real, measurable gains, without a claim that the underlying problem is fully solved
